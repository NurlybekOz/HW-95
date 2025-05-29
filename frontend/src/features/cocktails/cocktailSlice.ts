import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {ICocktail} from "../../types";
import {fetchAllCocktails, fetchCocktailById} from "./cocktailThunk.ts";

interface CocktailState {
    items: ICocktail[];
    item: ICocktail | null;
    fetchLoading: boolean;
}

const initialState: CocktailState = {
    items: [],
    item: null,
    fetchLoading: false,
}

export const cocktailSlice = createSlice({
    name: "cocktails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCocktails.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllCocktails.fulfilled, (state, {payload: cocktails}) => {
                state.items = cocktails;
                state.fetchLoading = false;
            })
            .addCase(fetchAllCocktails.rejected, (state) => {
                state.fetchLoading = false;
            })


            .addCase(fetchCocktailById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchCocktailById.fulfilled, (state, {payload: cocktail}) => {
                state.fetchLoading = false;
                state.item = cocktail
            })
            .addCase(fetchCocktailById.rejected, (state) => {
                state.fetchLoading = false;
            })
    }
})

export const cocktailsReducer = cocktailSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktailById = (state: RootState) => state.cocktails.item;
export const selectCocktailsLoading = (state: RootState) => state.cocktails.fetchLoading;
