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
    } else {
      // 로그인 상태가 아니라면 로그인 페이지로 리다이렉트 (필요시 주석 해제)
      // navigate("/login");
    }
  }, [token, navigate]);

  function handelLogout() {
    dispatch(logout());
    // 로그아웃 후 홈으로 리다이렉션 (사용자 경험 개선)
    navigate("/");
  }

  return (
    // ⭐️ 전체 컨테이너: h-full (부모 영역 채우기), 다크 배경, 중앙 정렬
    <div className="h-full bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
      {/* 프로필 카드 */}
      <div className="bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700 text-center">
        <h1 className="text-3xl font-extrabold text-blue-400 mb-6 border-b border-gray-700 pb-3">
          사용자 정보
        </h1>

        {/* 사용자 정보 출력 영역 */}
        {decodeToken ? (
          <div className="space-y-4">
            <p className="text-xl text-gray-200">
              <span className="font-semibold text-blue-300">
                {decodeToken.email}
              </span>
              님 환영합니다!
            </p>

            {/* 이메일 정보 */}
            <div className="bg-gray-700 p-3 rounded-lg border border-gray-600">
              <strong className="text-gray-400 block mb-1">이메일 주소</strong>
              <span className="text-lg font-medium text-gray-100 break-all">
                {decodeToken.email}
              </span>
            </div>

            {/* 토큰 출력 방지: token ? token : "로그인을 해주세요" 부분이 삭제되었습니다. */}
          </div>
        ) : (
          <div className="text-xl text-red-400 font-semibold p-4 border border-red-500 rounded-lg">
            로그인이 필요합니다.
          </div>
        )}

        {/* 액션 버튼 및 링크 */}
        <div className="flex flex-col gap-4 mt-8">
          <Link
            to="/"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg cursor-pointer 
                         hover:bg-blue-700 transition duration-200 shadow-md shadow-blue-500/50"
          >
            홈으로 돌아가기
          </Link>

          {decodeToken && (
            // ⭐️ 로그아웃 버튼: 파란색 강조

            <button
              className="cursor-pointer text-white font-bold py-3 bg-red-600 hover:bg-red-700 transition duration-200 shadow-md shadow-red-500/50 rounded-lg"
              onClick={() => {
                handelLogout();
              }}
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
