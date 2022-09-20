import { createSlice } from "@reduxjs/toolkit";
import { PokemonListItem } from "../../app/store";
import { PokemonRandomizer } from "../../core/pokemonRandomizer";

const initialState: PokemonRandomizer = new PokemonRandomizer(null)

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
