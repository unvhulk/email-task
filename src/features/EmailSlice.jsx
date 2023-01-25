import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMails = createAsyncThunk(
	"mails/get",
	async (page, thunkAPI) => {
		try {
			const response = await axios.get(
				`https://flipkart-email-mock.now.sh/?page=${page}`
			);
			return { mails: response.data.list };
		} catch (error) {
			const { rejectWithValue } = thunkAPI;
			return rejectWithValue(error.response.data);
		}
	}
);

export const getMailBody = createAsyncThunk(
	"mailsBody/get",
	async (id, thunkAPI) => {
		try {
			const response = await axios.get(
				`https://flipkart-email-mock.now.sh/?id=${id}`
			);
			return { body: response.data.body, id };
		} catch (error) {
			const { rejectWithValue } = thunkAPI;
			return rejectWithValue(error.response.data);
		}
	}
);

export const EmailSlice = createSlice({
	name: "email",
	initialState: {
		mails: [],
		favorite: [],
		read: [],
		selectedMail: {},
		open: false,
		page: 1,
	},

	reducers: {
		selectFilter(state, action) {
			state.selectedFilter = action.payload;
			state.open = false;
			state.selectedMail = {};
		},
		markRead(state, action) {
			state.read.includes(action.payload)
				? state
				: state.read.push(action.payload);
		},
		toggleFavorite(state, action) {
			if (state.favorite.includes(action.payload)) {
				state.favorite = state.favorite.filter((id) => id !== action.payload);
				if (state.selectedFilter === "Favorites") {
					state.open = false;
					state.selectedMail = {};
				}
			} else state.favorite.push(action.payload);
		},
		toggleEmailBody(state, action) {
			if (action.payload.id !== state.selectedMail.id) {
				state.selectedMail = action.payload;
				state.open = true;
			} else {
				state.open = false;
				state.selectedMail = {};
			}
		},
		incrementPage(state) {
			state.page += 1;
			state.read.includes(state.selectedMail.id)
				? state
				: state.read.push(state.selectedMail.id);
		},
		decrementPage(state) {
			state.page -= 1;
			state.read.includes(state.selectedMail.id)
				? state
				: state.read.push(state.selectedMail.id);
		},
	},

	extraReducers(builder) {
		builder
			.addCase(getMails.pending, (state) => {
				state.statusMail = "loading";
			})
			.addCase(getMails.fulfilled, (state, action) => {
				state.mails = action.payload.mails;
				state.statusMail = "success";
			})
			.addCase(getMails.rejected, (state, action) => {
				state.statusMail = "rejected";
				state.error = action.error;
			})
			.addCase(getMailBody.pending, (state) => {
				state.statusBody = "loading";
			})
			.addCase(getMailBody.fulfilled, (state, action) => {
				state.mailBody = action.payload.body;
				state.statusBody = "success";
			})
			.addCase(getMailBody.rejected, (state, action) => {
				state.statusBody = "rejected";
				state.error = action.error;
			});
	},
});

export const {
	selectFilter,
	markRead,
	toggleFavorite,
	unmarkFavorite,
	toggleEmailBody,
	incrementPage,
	decrementPage,
} = EmailSlice.actions;

export default EmailSlice.reducer;
