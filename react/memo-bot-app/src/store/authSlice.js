import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Vite 환경 변수 로딩 (VITE_ 접두사 유지)
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
          apikey: SUPABASE_ANON_KEY, // Supabase 키 전달
        },
        data: {
          email: data.email,
          password: data.password,
        },
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      // 🚨 Supabase 에러 메시지를 추출하여 반환 (디버깅 용이)
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        error.response?.data ||
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
      return rejectWithValue(error.response.data);
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
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${getState().auth.token}`,
        },
      };
      const res = await axios(config);
      return res.data;
    } catch (error) {
      // ⭐️ 오타 수정: error.res.data -> error.response.data
      return rejectWithValue(error.response.data);
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
      state.error = null; // ⭐️ 에러 상태도 초기화
    },
    resetError: (state) => {
      // ⭐️ 에러 메시지 초기화 리듀서 추가
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
        state.error = action.payload; // payload에는 에러 메시지가 담겨 있습니다.
        state.isSignup = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.token = null;
      });
  },
});

export const { resetIsSignup, resetError } = authSlice.actions;
export default authSlice.reducer;
export { signup, login, logout };
