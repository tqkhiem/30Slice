import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setMessage } from './message';
import { ROLE } from '../../../services/role/role';

// import adminService from '../../services/admin/admin.service';
import AuthService from '../../../services/auth/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      if (ROLE.includes(data.role)) {
        return { user: data };
      }
      throw new Error('Hãy đăng nhập bằng tài khoản hệ thống.');
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getInfo = createAsyncThunk('auth/getInfo', async (thunkAPI) => {
  // try {
  //   const data = await adminService.getAdminBoard();
  //   console.log(data);
  //   return { user: data };
  // } catch (error) {
  //   const message =
  //     (error.response && error.response.data && error.response.data.message) ||
  //     error.message ||
  //     error.toString();
  //   // thunkAPI.dispatch(setMessage(message));
  //   // return thunkAPI.rejectWithValue();
  // }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthService.logout();
});

const initialState =
  user && ROLE.includes(user.role)
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refresh: (state, action) => {
      state.user.accessToken = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [login.fulfilled]: (state, action) => {
      if (ROLE.includes(action.payload.user.role)) {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      } else {
        state.isLoggedIn = false;
        state.user = null;
      }
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const selectLoginState = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export const { refresh } = authSlice.actions;
export default authSlice.reducer;
