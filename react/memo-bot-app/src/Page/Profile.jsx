import React from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

export default function Profile() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [decodeToken, setDecodeToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // 토큰 복호화 및 사용자 정보 저장
      try {
        setDecodeToken(jwtDecode(token));
      } catch (e) {
        console.error("Invalid token:", e);
        setDecodeToken(null);
      }
    }
    // 로그인 상태가 아니라면 토큰이 없으므로 decodeToken은 null로 유지됩니다.
  }, [token, navigate]);

  function handelLogout() {
    dispatch(logout());
    // 로그아웃 후 홈으로 리다이렉션 (사용자 경험 개선)
    navigate("/");
  }

  return (
    // ⭐️ 전체 컨테이너: h-screen으로 뷰포트 높이 채우기, 다크 배경
    <div className="min-h-screen bg-slate-900 text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6">
      {/* ⭐️ 프로필 카드: max-w-md로 크기 제한, 더 큰 그림자와 둥근 모서리 */}
      <div className="bg-gray-800 p-8 md:p-12 rounded-2xl shadow-2xl shadow-blue-500/10 w-full max-w-md border border-gray-700 text-center transform transition duration-500 hover:shadow-blue-500/20">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-6 border-b border-gray-700 pb-3">
          👤 사용자 정보
        </h1>

        {/* 사용자 정보 출력 영역 */}
        {decodeToken ? (
          <div className="space-y-6">
            {/* ⭐️ 환영 메시지 */}
            <p className="text-xl sm:text-2xl text-gray-200 font-light">
              <span className="font-semibold text-blue-300">
                {decodeToken.email}
              </span>
              님 환영합니다!
            </p>

            {/* ⭐️ 이메일 정보 카드: 정보 강조 디자인 */}
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow-inner shadow-gray-900/50">
              <strong className="text-gray-400 block mb-1 text-sm">
                이메일 주소 (ID)
              </strong>
              <span className="text-lg font-medium text-gray-100 break-all sm:text-xl">
                {decodeToken.email}
              </span>
            </div>

            {/* ⭐️ 추가 정보 (예시: Role, Expire Date) */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <strong className="text-gray-400 block mb-1">
                  사용자 역할
                </strong>
                <span className="text-sm font-medium text-green-400">
                  {decodeToken.role || "User"}
                </span>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
                <strong className="text-gray-400 block mb-1">
                  토큰 만료일
                </strong>
                {/* 토큰 만료 시간 (Unix timestamp)을 날짜 형식으로 변환 */}
                <span className="text-sm font-medium text-gray-300">
                  {new Date(decodeToken.exp * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ) : (
          // ⭐️ 로그인 필요 메시지
          <div className="text-xl text-red-400 font-semibold p-4 border border-red-500 rounded-lg bg-gray-700/50">
            🚨 로그인이 필요합니다.
          </div>
        )}

        {/* 액션 버튼 및 링크 */}
        <div className="flex flex-col gap-4 mt-8">
          <Link
            to="/"
            className="w-full bg-gray-600 text-white font-bold py-3 rounded-lg cursor-pointer 
                        hover:bg-gray-700 transition duration-200 shadow-md shadow-gray-500/50 transform hover:scale-[1.01]"
          >
            🏠 홈으로 돌아가기
          </Link>

          {decodeToken && (
            // ⭐️ 로그아웃 버튼: 빨간색 강조, 애니메이션 추가
            <button
              className="cursor-pointer text-white font-bold py-3 bg-red-600 hover:bg-red-700 transition duration-200 shadow-lg shadow-red-500/50 rounded-lg transform hover:scale-[1.01]"
              onClick={() => {
                handelLogout();
              }}
            >
              🚪 로그아웃
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
