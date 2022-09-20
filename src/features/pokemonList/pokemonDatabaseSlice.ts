import { createSlice } from "@reduxjs/toolkit";
import { PokemonListItem } from "../../app/store";
import { PokemonDatabase } from "../../core/pokemonDatabase";

const initialState: PokemonDatabase = new PokemonDatabase(null)

const pokemonDatabaseSlice = createSlice({
    name: "pokemonDatabase",
    initialState,
    reducers: {
        setRootDB(state, action) {
            state = action.payload
        }
    }
})

export const { setRootDB } = pokemonDatabaseSlice.actions

export default pokemonDatabaseSlice.reducer
