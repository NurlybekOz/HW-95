import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import {CocktailMutation, ICocktail} from "../../types";

export const fetchAllCocktails = createAsyncThunk<ICocktail[], string | null>(
    'cocktails/fetchAllCocktails',
    async (userId) => {
        let url = '/cocktails';
        if (userId) {
            url = `/cocktails?user=${userId}`;
        }
        const response = await axiosApi<ICocktail[]>(url)
        return response.data || [];
    }
)

export const fetchCocktailById = createAsyncThunk<ICocktail, string>(
    'cocktails/fetchCocktailById',
    async (cocktailId) => {
        const response = await axiosApi<ICocktail>(`/cocktails/${cocktailId}`)
        return response.data || null;
    }
)

export const createCocktail = createAsyncThunk<void, CocktailMutation>(
    'cocktails/createCocktails',
    async (cocktailToAdd) => {
        const formData = new FormData();

        const keys = Object.keys(cocktailToAdd) as (keyof CocktailMutation)[];
        keys.forEach(key => {
            const value = cocktailToAdd[key];
            if (value !== null && value !== undefined) {
                if (key === 'ingredients') {
                    formData.append('ingredients', JSON.stringify(value));
                } else {
                    formData.append(key, value as string);
                }
            }
        });

        await axiosApi.post('/cocktails', formData);
    }
);

export const patchCocktail = createAsyncThunk<
    void,
    string
>(
    'cocktails/patchCocktails',
    async (cocktailId) => {
        const response = await axiosApi.patch(`/admin/cocktails/${cocktailId}`)
        return response.data;
    }
)
export const deleteCocktail = createAsyncThunk<
    void,
    string
>(
    'cocktails/deleteCocktails',
    async (cocktailId) => {
        const response = await axiosApi.delete(`/admin/cocktails/${cocktailId}`)
        return response.data;
    }
)

