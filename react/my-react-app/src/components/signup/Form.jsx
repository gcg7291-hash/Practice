import React from "react";
import { useState } from "react";

export default function SignupForm() {
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    level: "",
  });

 
  const [selectedLevel, setSelectedLevel] = useState("");

  const levels = [
    { id: 1, value: "신입" },
    { id: 2, value: "주니어" },
    { id: 3, value: "시니어" },
  ];

 
  const validateField = (name, value, currentData) => {
    let errorMsg = "";

    switch (name) {
      case "email":
        if (!value) {
          errorMsg = " 이메일을 입력하세요.";
        } 
        // 이메일 형식 검사 (간단한 검사)
        else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = "올바른 이메일 형식이 아닙니다.";
        }
        break;

      case "password":
        // 빈칸 검사
        if (!value) {
          errorMsg = " 비밀번호를 입력하세요.";
        } 
        // 길이 검사 (8자 이상)
        else if (value.length < 8) {
          errorMsg = " 비밀번호는 8자 이상이어야 합니다.";
        }
        break;

      case "confirmPassword":
        // 빈칸 검사
        if (!value) {
          errorMsg = " 비밀번호 확인을 입력하세요.";
        } 
        // 일치 여부 검사: 항상 최신 formData의 password와 비교해야 합니다.
        else if (value !== currentData.password) {
          errorMsg = " 비밀번호가 일치하지 않습니다.";
        }
        break;
      
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    return errorMsg === "";
  };


  // 텍스트 필드 변경 핸들러 (실시간 유효성 검사 포함)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // 1. 상태 업데이트 (새로운 값으로)
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // 2. 실시간 유효성 검사
    validateField(name, value, newFormData);
  };

  // 라디오 버튼 변경 핸들러
  function handleRadioChange(e) {
    setSelectedLevel(e.target.value);
    // 레벨 선택 시 오류 메시지 초기화
    setErrors((prevErrors) => ({ ...prevErrors, level: "" }));
  }

  // 전체 폼 유효성 검사 및 제출
  function handleSubmit(e) {
    e.preventDefault(); // 기본 폼 제출 방지


    // 2. 레벨 선택 검사
    if (!selectedLevel) {
      newErrors.level = " 레벨을 선택해 주세요.";
      formIsValid = false;
    }

    // 레벨 오류 상태 업데이트
    setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));

  }
  return (
   <div className="p-8">
      <h1 className="text-xl font-bold mb-6 text-center">회원가입</h1>
      <form onSubmit={handleSubmit} id="signupForm" className="max-w-md mx-auto">
        
       
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">이메일</label>
          <input
            type="email" // type="text"에서 "email"로 변경하는 것을 권장합니다.
            id="email"
            name="email"
            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            placeholder="이메일"
            value={formData.email}
            onChange={handleInputChange} 
          />
          {/* 오류 메시지 표시 */}
          {errors.email && <div className="text-red-500 text-sm mt-1 flex items-center">
            {errors.email}
          </div>}
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleInputChange}
          />
          {/* 오류 메시지 표시 */}
          {errors.password && <div className="text-red-500 text-sm mt-1 flex items-center">
            {errors.password}
          </div>}
        </div>

        {/* 비밀번호 확인 입력 필드 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {/* 오류 메시지 표시 */}
          {errors.confirmPassword && <div className="text-red-500 text-sm mt-1 flex items-center">
            {errors.confirmPassword}
          </div>}
        </div>

        {/* 레벨 선택 라디오 버튼 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">레벨</label>
          <div className="flex space-x-4">
            {levels.map((level) => (
              <label key={level.id} className="inline-flex items-center">
                <input
                  type="radio"
                  name="level"
                  value={level.value}
                  checked={selectedLevel === level.value}
                  onChange={handleRadioChange}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">{level.value}</span>
              </label>
            ))}
          </div>
          {/* 레벨 오류 메시지 표시 */}
          {errors.level && <div className="text-red-500 text-sm mt-1 flex items-center">
            {errors.level}
          </div>}
        </div>
        
        {/* 회원가입 버튼 */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}