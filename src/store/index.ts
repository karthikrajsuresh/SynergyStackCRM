import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        leads: leadsReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
