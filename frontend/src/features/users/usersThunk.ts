import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, LoginMutation, RegisterMutation, User, ValidationError} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";
import {RootState} from "../../app/store.ts";

export interface RegisterAndLoginResponse {
    user: User;
    message: string;
}

export const register = createAsyncThunk<
    RegisterAndLoginResponse,
    RegisterMutation,
    { rejectValue: ValidationError }
>(
    'users/register',
    async (registerForm, {rejectWithValue}) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(registerForm) as (keyof RegisterMutation)[];

            keys.forEach(key => {
                const value = registerForm[key] as string;
                if (value !== null) {
                    formData.append(key, value);
                }
            });

            const response = await axiosApi.post<RegisterAndLoginResponse>('/users', formData)
            return response.data;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }

            throw error;
        }
    }
);

export const login = createAsyncThunk<
    User,
    LoginMutation,
    { rejectValue: GlobalError }
>(
    'users/login',
    async (loginForm, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterAndLoginResponse>('/users/sessions', loginForm);
            return response.data.user;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }

            throw error;
        }
    }
)

export const logout = createAsyncThunk<
    void,
    void,
    { state: RootState }
>(
    'users/logout',
    async (_, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.delete('/users/sessions', {headers: {Authorization: token}});
    }
)
