import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LicenseState {
  licenseText: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LicenseState = {
  licenseText: null,
  status: 'idle',
  error: null,
};

export const fetchLicenseText = createAsyncThunk('license/fetchLicenseText', async () => {
  const response = await axios.get<string>(
    'https://static.footballay.com/footballay/licenses/footballay-desktop/license.txt',
  );
  return response.data;
});

const licenseSlice = createSlice({
  name: 'license',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLicenseText.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLicenseText.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.licenseText = action.payload;
      })
      .addCase(fetchLicenseText.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '라이센스 정보를 가져오는데 실패했습니다.';
      });
  },
});

export default licenseSlice.reducer;
