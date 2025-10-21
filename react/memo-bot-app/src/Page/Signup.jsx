import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, resetIsSignup } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 💡 참고: 실제 앱에서는 비밀번호 확인을 위한 별도 상태를 사용해야 합니다.
  const [confirmPassword, setConfirmPassword] = useState(""); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignup = useSelector((state) => state.auth.isSignup);
  const error = useSelector((state) => state.auth.error); // 에러 메시지 상태를 활용하기 위해 유지

  function handleSubmit(e) {
    e.preventDefault();
    
    // 💡 실제로는 여기서 비밀번호 일치 여부 확인 로직이 필요합니다.
    if (password !== confirmPassword) {
        alert("비밀번호와 비밀번호 확인 값이 일치하지 않습니다.");
        return;
    }

    dispatch(signup({ email: email, password: password }));
  }

  useEffect(() => {
    if (isSignup === true) {
      alert("회원가입을 성공했습니다. 메일함을 이용해주세요");
      dispatch(resetIsSignup()); // dispatch(resetIsSignup) -> dispatch(resetIsSignup()) 로 수정했습니다.
      navigate("/"); // /home 대신 보통 메인 페이지로 이동하므로 /로 수정했습니다.
    }
  }, [isSignup, dispatch, navigate]);

  return (
    // ⭐️ 전체 컨테이너: 화면 꽉 채우기, 다크 배경, 중앙 정렬
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      
      {/* ⭐️ 회원가입 카드: 어두운 배경, 둥근 모서리, 그림자, 최대 너비 설정 */}
      <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700">
        
        {/* 로고/헤더 */}
        <div className="text-center mb-8">
          <span className="text-4xl font-extrabold text-blue-400">
            Memo AI
          </span>
          <h1 className="text-xl text-gray-300 mt-2">
            회원가입
          </h1>
          {/* ⭐️ 에러 메시지 출력 */}
          {error && (
            <p className="text-red-400 text-sm mt-3 bg-gray-700 p-2 rounded-md border border-red-500">
              {error}
            </p>
          )}
        </div>

        {/* 회원가입 폼 */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4" // 입력 필드 간격을 4로 설정
        >
          {/* 이메일 입력 필드 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600"
            type="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          
          {/* 비밀번호 입력 필드 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600"
            type="password"
            value={password}
            placeholder="비밀번호 (6자 이상)"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            minLength="6"
          />
          
          {/* 비밀번호 확인 입력 필드 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600"
            type="password"
            value={confirmPassword}
            placeholder="비밀번호 확인"
            onChange={(e) => {
              setConfirmPassword(e.target.value); // ⭐️ 별도의 상태에 저장하도록 수정
            }}
            required
          />
          
          {/* 회원가입 버튼 */}
          <input
            className="w-full bg-blue-600 text-white font-bold p-3 rounded-lg cursor-pointer mt-6
                       hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            type="submit"
            value="회원가입"
          />
        </form>

        {/* 로그인 링크 */}
        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="text-gray-400 text-sm hover:text-blue-400 transition duration-200"
          >
            이미 계정이 있으신가요? 로그인으로 돌아가기
          </Link>
        </div>

        {/* 처음으로 링크 (별도로 배치) */}
        <div className="mt-4 text-center">
            <Link to="/" className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition duration-200">
                처음으로
            </Link>
        </div>
        
      </div>
    </div>
  );
}