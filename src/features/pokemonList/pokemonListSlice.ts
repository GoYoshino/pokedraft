import { createSlice } from "@reduxjs/toolkit";
import { PokemonListItem } from "../../app/store";

const initialState: { pokemonList: Array<PokemonListItem> }  = { pokemonList: []}

const pokemonListSlice = createSlice({
    name: "pokemonList",
    initialState,
    reducers: {
        randomized(state, action) {
            state.pokemonList = action.payload
        }
    }
})

export const { randomized } = pokemonListSlice.actions

export default pokemonListSlice.reducer
