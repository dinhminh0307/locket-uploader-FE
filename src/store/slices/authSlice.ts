import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { secureStorage } from '../../services/secure-ls.service';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    name: string;
    email?: string;
  } | null;
  token: string | null;
}

// Initialize state by checking storage for existing tokens
const getInitialState = (): AuthState => {
    const accessToken: { token: string; expires: string } | null = secureStorage.getItem('accessToken');
    const userData = secureStorage.getItem('user');
    
    // Check if userData has the required name property
    const user = userData && typeof userData === 'object' && 'name' in userData 
        ? userData as { name: string; email?: string } 
        : null;
    
    return {
        isAuthenticated: !!accessToken,
        user,
        token: accessToken?.token || null
    };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    loginSuccess: (state, action: PayloadAction<{
      user: { name: string; email?: string };
      tokens: {
        access: { token: string; expires: string };
        refresh: { token: string; expires: string };
      }
    }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.tokens.access.token;
      
      // Store in secure storage
      secureStorage.setItem('accessToken', {
        token: action.payload.tokens.access.token,
        expires: action.payload.tokens.access.expires
      });
      
      secureStorage.setItem('refreshToken', {
        token: action.payload.tokens.refresh.token,
        expires: action.payload.tokens.refresh.expires
      });
      
      secureStorage.setItem('user', action.payload.user);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      
      // Clear storage
      secureStorage.removeItem('accessToken');
      secureStorage.removeItem('refreshToken');
      secureStorage.removeItem('user');
    },
    checkAuthState: (state) => {
      const accessToken: { token: string; expires: string } | null = secureStorage.getItem('accessToken');
      const userData = secureStorage.getItem('user');
      
      // Check if userData has the required name property
      const user = userData && typeof userData === 'object' && 'name' in userData 
        ? userData as { name: string; email?: string } 
        : null;
      
      state.isAuthenticated = !!accessToken;
      state.user = user;
      state.token = accessToken?.token || null;
    }
  }
});

export const { loginSuccess, logout, checkAuthState } = authSlice.actions;
export default authSlice.reducer;