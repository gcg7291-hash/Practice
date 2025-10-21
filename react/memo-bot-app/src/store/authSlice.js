// 📁 authSlice.js (logout 부분)

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const config = {
        url: `${SUPABASE_URL}/auth/v1/logout`,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      };
      const res = await axios(config);
      return res.data;
    } catch (error) {
      // ⭐️ 핵심 수정: Supabase 내부 오류 메시지 필터링
      let errorMessage =
        error.response?.data?.msg || error.response?.data?.message;

      if (
        typeof errorMessage === "string" &&
        errorMessage.includes("API key")
      ) {
        // 'No API key found in request' 오류를 사용자 친화적인 메시지로 대체
        errorMessage = "로그아웃 처리 중 인증 오류가 발생했습니다. 다시 로그인해주세요.";
      } else {
        errorMessage =
          errorMessage ||
          "로그아웃 처리 중 오류가 발생했습니다. (클라이언트 상태는 초기화합니다.)";
      }

      return rejectWithValue(errorMessage);
    }
  }
);