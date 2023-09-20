// formDataSlice.js
import { createSlice } from "@reduxjs/toolkit";

const formDataSlice = createSlice({
  name: "formData",
  initialState: {
    name: "",
    email: "",
    mobileNumber: "",
    difficultyLevel: "Easy",
  },
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
