import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// <https://vite.dev/config/>
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        // 🚨 로컬에서 서버리스 함수를 실행하는 포트(일반적으로 5173 또는 3000)를 지정해야 합니다.
        //    Vercel CLI(vercel dev)를 사용 중이라면 3000 포트를 사용합니다.
        //    일반 Vite 개발 서버라면 자기 자신(5173)으로 설정합니다.
        target: "http://localhost:5173",
        changeOrigin: true,
        secure: false, // HTTPS 환경이 아닐 경우
      },
    },
  },
});
