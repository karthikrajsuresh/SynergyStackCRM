import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface Interaction {
    interactionId: number;
    date: string;
    type: string;
    notes: string;
    salesRep: string;
}

export interface Lead {
    id: number;
    name: string;
    company: string;
    contactInfo: {
        email: string;
        phone: string;
    };
    leadScore: number;
    status: string;
    assignedTo: string;
    industry: string;
    location: string;
    badges: string[];
    profilePicture: string | null;
    interactions: Interaction[];
    createdAt: string;
    updatedAt: string;
}

interface LeadsState {
    leads: Lead[];
    loading: boolean;
    error: string | null;
}

const initialState: LeadsState = {
    leads: [],
    loading: false,
    error: null,
};

// Async thunk to fetch leads from JSON file
export const fetchLeads = createAsyncThunk('leads/fetchLeads', async (_, thunkAPI) => {
    try {
        const response = await fetch('/data/leads.json');
        if (!response.ok) {
            throw new Error('Failed to fetch leads data');
        }
        const data = await response.json();
        return data as Lead[];
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

const leadsSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLeads.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchLeads.fulfilled, (state, action: PayloadAction<Lead[]>) => {
            state.loading = false;
            state.leads = action.payload;
        });
        builder.addCase(fetchLeads.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default leadsSlice.reducer;
