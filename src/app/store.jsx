import { configureStore } from "@reduxjs/toolkit";
import EmailSlice from "../features/EmailSlice";

export default configureStore({
	reducer: { email: EmailSlice },
	devTools: true,
});
