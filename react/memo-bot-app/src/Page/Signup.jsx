import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, resetIsSignup, resetError } from "../store/authSlice"; // ⭐️ resetError import
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ⭐️ 로딩 상태 추가

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignup = useSelector((state) => state.auth.isSignup);
  const error = useSelector((state) => state.auth.error);

  function handleSubmit(e) {
    e.preventDefault();
    if (isLoading) return; // 로딩 중 중복 클릭 방지

    // 비밀번호 일치 확인
    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인 값이 일치하지 않습니다.");
      dispatch(resetError()); // 에러 메시지 초기화 (선택 사항)
      return;
    }

    setIsLoading(true); // 로딩 시작
    dispatch(signup({ email: email, password: password }));
  }

  useEffect(() => {
    if (isSignup === true) {
      alert("회원가입을 성공했습니다. 메일함을 확인해주세요.");
      dispatch(resetIsSignup());
      navigate("/login"); // 로그인 페이지로 이동하는 것이 일반적
    }

    // ⭐️ isSignup 상태가 변경되거나 에러가 발생하면 로딩 종료
    if (isSignup || error) {
      setIsLoading(false);
    }

    // ⭐️ 에러 발생 시 사용자에게 피드백 후, 에러 메시지 초기화 (선택 사항)
    if (error) {
      // alert(`회원가입 실패: ${error}`);
      // dispatch(resetError());
    }
  }, [isSignup, error, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-sm border border-gray-700">
        <div className="text-center mb-8">
          <span className="text-4xl font-extrabold text-blue-400">Memo AI</span>
          <h1 className="text-xl text-gray-300 mt-2">회원가입</h1>
          {/* 에러 메시지 출력 */}
          {error && (
            <p className="text-red-400 text-sm mt-3 p-3 rounded-lg border border-red-600 bg-gray-700/50">
              {typeof error === "string" ? error : "회원가입에 실패했습니다."}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 입력 필드 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600"
            type="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          {/* 비밀번호 입력 필드 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600"
            type="password"
            value={password}
            placeholder="비밀번호 (6자 이상)"
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            disabled={isLoading}
          />
          {/* 비밀번호 확인 입력 필드 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600"
            type="password"
            value={confirmPassword}
            placeholder="비밀번호 확인"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
          {/* 회원가입 버튼 */}
          <input
            className={`w-full text-white font-bold p-3 rounded-lg mt-6 transition duration-200 shadow-md ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 cursor-pointer hover:bg-blue-700 shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
            }`}
            type="submit"
            value={isLoading ? "처리 중..." : "회원가입"}
            disabled={isLoading}
          />
        </form>

        {/* 로그인 링크 */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-gray-400 text-sm hover:text-blue-400 transition duration-200 underline"
          >
            이미 계정이 있으신가요? 로그인으로 돌아가기
          </Link>
        </div>

        {/* 처음으로 링크 */}
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-blue-400 text-sm font-semibold hover:text-blue-300 transition duration-200"
          >
            처음으로
          </Link>
        </div>
      </div>
    </div>
  );
}
