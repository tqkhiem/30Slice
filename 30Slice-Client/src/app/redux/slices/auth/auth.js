import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setMessage } from './message';

// import adminService from '../../services/admin/admin.service';
import AuthService from '../../../services/auth/auth.service';


const user = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
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

const initialState = user
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
      state.isLoggedIn = true;
      state.user = action.payload.user;
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

export const selectUser = (state) => state.auth.isLoggedIn;

export const { refresh } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
