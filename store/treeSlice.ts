import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tree } from '../types';

interface TreeState {
  trees: Tree[];
  selectedTree: Tree | null;
  isLoading: boolean;
  error: string | null;
  filter: {
    status: string | null;
    species: string | null;
    eventId: string | null;
  };
}

const initialState: TreeState = {
  trees: [],
  selectedTree: null,
  isLoading: false,
  error: null,
  filter: {
    status: null,
    species: null,
    eventId: null,
  },
};

export const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    setTrees: (state, action: PayloadAction<Tree[]>) => {
      state.trees = action.payload;
      state.isLoading = false;
    },
    selectTree: (state, action: PayloadAction<Tree | null>) => {
      state.selectedTree = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<Partial<TreeState['filter']>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { setTrees, selectTree, setLoading, setError, setFilter } = treeSlice.actions;
export default treeSlice.reducer;