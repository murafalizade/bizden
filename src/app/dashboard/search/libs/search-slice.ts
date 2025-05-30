import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterPayload } from '@app/dashboard/search/libs/models';

interface ISearchState {
  filter?: IFilterPayload;
}

const initialState: ISearchState = {};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<IFilterPayload>) => {
      state.filter = action.payload;
    },
    resetFilter: state => {
      state.filter = undefined;
    },
  },
});

export const { setFilter, resetFilter } = searchSlice.actions;
export default searchSlice.reducer;
