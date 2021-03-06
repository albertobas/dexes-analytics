import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlocksState, BlocksStateData } from 'src/features/shared/state/core/entities/Blocks';

// initial state
const initialState: BlocksState = {
  loading: null,
  error: null,
  data: null,
};

// slice
const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    setBlocks(state, { payload: { loading, error, data } }: PayloadAction<BlocksState>) {
      state.loading = loading;
      state.error = error;
      if (data != null) {
        const dataChain = Object.keys(data)[0];
        if (state.data != null) {
          // if state includes data blockchain, merge first objects with same blockchain index and then merge
          // resulting object into state.
          if (Object.keys(state.data).includes(dataChain)) {
            const mergedData: BlocksStateData = {};
            mergedData[dataChain] = {};
            mergedData[dataChain] = { ...state.data[dataChain], ...data[dataChain] };
            state.data = { ...state.data, ...mergedData };
          }
          // if state does not include data blockchain, merge state with data prop
          else state.data = { ...state.data, ...data };
        } else state.data = data;
      }
    },
  },
});

export const { setBlocks } = blocksSlice.actions;
export default blocksSlice.reducer;
