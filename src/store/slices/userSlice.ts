import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/lib/types/auth.types';

/**
 * User State Interface
 * Defines the shape of the user state in Redux store
 */
export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiresAt: string | null;
    refreshTokenExpiresAt: string | null;
  };
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial State
 * Default values for user state
 */
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  tokens: {
    accessToken: null,
    refreshToken: null,
    accessTokenExpiresAt: null,
    refreshTokenExpiresAt: null,
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setTokens(state, action: PayloadAction<Partial<UserState['tokens']>>) {
      state.tokens = { ...state.tokens, ...action.payload };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.tokens = {
        accessToken: null,
        refreshToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
      };
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setUser, setTokens, setLoading, setError, logout } = userSlice.actions;
export default userSlice.reducer;
