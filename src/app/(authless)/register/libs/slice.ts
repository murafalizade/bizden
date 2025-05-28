import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BusinessProfilePayload,
  RegisterStep,
  StudentProfilePayload,
  VeteranProfilePayload,
} from '@app/(authless)/register/libs/models';
import { UserRole } from '@shared/libs/models';

interface IRegisterState {
  studentInfoPayload?: StudentProfilePayload;
  veteranInfoPayload?: VeteranProfilePayload;
  businessInfoPayload?: BusinessProfilePayload;
  step: RegisterStep;
  selectedRole?: UserRole;
}

const initialState: IRegisterState = {
  step: RegisterStep.RegisterAccount,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setStudentInfoPayload: (state, action: PayloadAction<StudentProfilePayload>) => {
      state.studentInfoPayload = action.payload;
    },
    setVeteranInfoPayload: (state, action: PayloadAction<VeteranProfilePayload>) => {
      state.veteranInfoPayload = action.payload;
    },
    setBusinessInfoPayload: (state, action: PayloadAction<BusinessProfilePayload>) => {
      state.businessInfoPayload = action.payload;
    },
    setStep: (state, action: PayloadAction<RegisterStep>) => {
      state.step = action.payload;
    },
    setSelectedRole: (state, action: PayloadAction<UserRole>) => {
      state.selectedRole = action.payload;
    },
  },
});

export const {
  setStudentInfoPayload,
  setVeteranInfoPayload,
  setBusinessInfoPayload,
  setStep,
  setSelectedRole,
} = registerSlice.actions;
export default registerSlice.reducer;
