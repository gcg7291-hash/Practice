import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, resetIsSignup, resetError } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSignup = useSelector((state) => state.auth.isSignup);
  const error = useSelector((state) => state.auth.error);

  function handleSubmit(e) {
    e.preventDefault();
    if (isLoading) return; // 로딩 중 중복 클릭 방지

    // 비밀번호 일치 확인 (스타일링과 무관하지만 중요한 로직)
    if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인 값이 일치하지 않습니다.");
      dispatch(resetError());
      return;
    }

    setIsLoading(true); // 로딩 시작
    dispatch(signup({ email: email, password: password }));
  }

  useEffect(() => {
    if (isSignup === true) {
      alert("회원가입을 성공했습니다. 메일함을 확인해주세요.");
      dispatch(resetIsSignup());
      navigate("/login"); // 로그인 페이지로 이동
    }

    // isSignup 상태가 변경되거나 에러가 발생하면 로딩 종료
    if (isSignup || error) {
      setIsLoading(false);
    }
  }, [isSignup, error, dispatch, navigate]);

  return (
    // ⭐️ 전체 컨테이너: 배경색을 bg-slate-900으로 변경하여 더 세련된 다크톤 사용
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6">
      {/* ⭐️ 회원가입 카드: max-w-sm으로 너비 제한, 더 큰 그림자와 둥근 모서리 */}
      <div className="bg-gray-800 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700 transform transition duration-500 hover:shadow-blue-500/20">
        <div className="text-center mb-8">
          {/* ⭐️ 로고/타이틀 크기 조정 */}
          <span className="text-4xl sm:text-5xl font-extrabold text-blue-400">
            Memo AI
          </span>
          <h1 className="text-xl text-gray-300 mt-2 font-light">회원가입</h1>

          {/* ⭐️ 에러 메시지 출력: 애니메이션 추가 및 스타일 조정 */}
          {error && (
            <p className="text-red-400 text-sm mt-4 p-3 rounded-lg border border-red-500 bg-gray-700/50 animate-pulse">
              {typeof error === "string" &&
              (error.includes("API key") || error.includes("No API key"))
                ? "인증 시스템 연결에 실패했습니다. 다시 시도해 주세요."
                : typeof error === "string"
                ? error
                : "회원가입에 실패했습니다."}
            </p>
          )}
        </div>

        {/* ⭐️ 폼: 입력 필드 간 간격 조정 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 입력 필드 스타일 통일 및 개선 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600 focus:border-blue-500"
            type="email"
            value={email}
            placeholder="이메일을 입력하세요"
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          {/* 비밀번호 입력 필드 */}
          <input
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600 focus:border-blue-500"
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
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 border border-gray-600 focus:border-blue-500"
            type="password"
            value={confirmPassword}
            placeholder="비밀번호 확인"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          {/* ⭐️ 회원가입 버튼: 로딩 상태에 따른 색상/그림자 및 애니메이션 추가 */}
          <input
            className={`w-full text-white font-bold p-3 rounded-lg mt-6 transition duration-300 shadow-lg 
              ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed shadow-gray-700/50"
                  : "bg-blue-600 cursor-pointer hover:bg-blue-700 shadow-blue-500/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-[1.01]"
              }`}
            type="submit"
            value={isLoading ? "처리 중..." : "회원가입"}
            disabled={isLoading}
          />
        </form>

        {/* ⭐️ 링크 컨테이너: 간격 조정 */}
        <div className="mt-8 text-center space-y-3">
          {/* 로그인 링크 */}
          <Link
            to="/login"
            className="inline-block text-gray-400 text-sm hover:text-blue-400 transition duration-200 underline hover:no-underline"
          >
            이미 계정이 있으신가요? 로그인으로 돌아가기
          </Link>

          {/* 처음으로 링크: 버튼 형태로 변경하여 가시성 높임 */}
          <Link
            to="/"
            className="inline-block w-full px-4 py-2 bg-gray-700 text-gray-300 font-semibold rounded-lg shadow-md hover:bg-gray-600 hover:text-white transition duration-200 text-sm"
          >
            🏠 처음으로
          </Link>
        </div>
      </div>
    </div>
  );
}
