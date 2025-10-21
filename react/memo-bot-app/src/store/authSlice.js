import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        url: `${SUPABASE_URL}/auth/v1/signup`,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          apikey: SUPABASE_ANON_KEY,
        },
        data: {
          email: data.email,
          password: data.password,
        },
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      // Supabase 에러 메시지 추출
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "알 수 없는 회원가입 오류가 발생했습니다.";
      return rejectWithValue(errorMessage);
    }
  }
);

const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        url: `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          apikey: SUPABASE_ANON_KEY,
        },
        data: {
          email: data.email,
          password: data.password,
        },
      };
      const res = await axios(config);
      return res.data;
    } catch (error) {
      // ⭐️ 로그인 에러 메시지 추출 로직 개선
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.";
      return rejectWithValue(errorMessage);
    }
  }
);

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const config = {
        url: `${SUPABASE_URL}/auth/v1/logout`,
        method: "POST",
        headers: {
          "Content-type": "application/json",
          // 🚨 403 에러 해결: 인증된 요청에는 apikey를 제거하고 Authorization 토큰만 사용합니다.
          // apikey: SUPABASE_ANON_KEY, // 이 줄을 제거했습니다!
          Authorization: `Bearer ${getState().auth.token}`,
        },
      };
      const res = await axios(config);
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "로그아웃 처리 중 오류가 발생했습니다. (클라이언트 상태는 초기화합니다.)";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  token: null,
  error: null,
  isSignup: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    resetIsSignup: (state) => {
      state.isSignup = false;
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
    },
    // 로그아웃 실패 시 강제로 클라이언트 상태를 초기화하는 리듀서 (UX 개선)
    clientLogout: (state) => {
      state.token = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state) => {
        state.isSignup = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
        state.isSignup = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.token = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload; 
        // 403이 발생해도 클라이언트 상태는 로그아웃으로 만듭니다.
        state.token = null; 
      });
  },
});

export const { resetIsSignup, resetError, clientLogout } = authSlice.actions;
export default authSlice.reducer;
export { signup, login, logout };