import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import yaml from 'js-yaml';
import AppConfig from '@src/config/AppConfig';

interface DownloadState {
  downloadUrl: string | null;
  version: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DownloadState = {
  downloadUrl: null,
  version: null,
  status: 'idle',
  error: null,
};

export const fetchLatestYml = createAsyncThunk(
  'download/fetchLatest',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(AppConfig.DOWNLOAD_LATEST_YML);
      const parsed = yaml.load(response.data) as {
        path?: string;
        version?: string;
      };
      if (parsed.path && parsed.version) {
        return {
          downloadUrl: AppConfig.DOWNLOAD_LATEST_BASE + parsed.path,
          version: parsed.version,
        };
      } else {
        return rejectWithValue('불러온 데이터에 path 또는 version이 없습니다.');
      }
    } catch {
      return rejectWithValue('최신 다운로드 정보를 불러올 수 없습니다.');
    }
  },
);

const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestYml.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchLatestYml.fulfilled,
        (state, action: PayloadAction<{ downloadUrl: string; version: string }>) => {
          state.status = 'succeeded';
          state.downloadUrl = action.payload.downloadUrl;
          state.version = action.payload.version;
        },
      )
      .addCase(fetchLatestYml.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default downloadSlice.reducer;
