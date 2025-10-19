import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
("");

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
          email: data["email"],
          password: data["password"],
        },
      };
      const response = await axios(config);

      return response["data"];
    } catch (error) {
      return rejectWithValue(error["response"]["data"]);
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
      return rejectWithValue(error.res.data);
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
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state) => {
        state.isSignup = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload["access_token"];
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetIsSignup } = authSlice.actions;
export default authSlice.reducer; 
export { signup, login, logout };
