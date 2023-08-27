import http from "@helpers/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export type TLeadObj = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
};

export const getLeadsContent = createAsyncThunk("/leads/Content", async () => {
    const response = await http.get("/api/users?page=2", 200);
    return response.data.data as TLeadObj[];
});

type TInitialState = {
    isLoading: boolean;
    leads: TLeadObj[];
};

const initialState: TInitialState = {
    isLoading: false,
    leads: [],
};

export const leadsSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        addNewLead: (state, action) => {
            let { newLeadObj } = action.payload;
            state.leads = [...state.leads, newLeadObj];
        },

        deleteLead: (state, action) => {
            let { index } = action.payload;
            state.leads.splice(index, 1);
        },
    },
    extraReducers: builder => {
        builder.addCase(getLeadsContent.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(getLeadsContent.fulfilled, (state, action) => {
            state.leads = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getLeadsContent.rejected, state => {
            state.isLoading = false;
        });
    },
});

export const { addNewLead, deleteLead } = leadsSlice.actions;

export default leadsSlice.reducer;
