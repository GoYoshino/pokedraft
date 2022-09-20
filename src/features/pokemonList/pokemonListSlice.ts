import { createSlice } from "@reduxjs/toolkit";
import { PokemonListItem } from "../../app/store";

const initialState: { pokemonList: Array<PokemonListItem> }  = { pokemonList: [
    {
        id: "11111", pokemon: {
            id: 1, identifier: "bulbasaur", name: "フシギダネ", evolves_from: null, types: ["くさ", "どく"],
            is_uncommon: false, is_legendary: false, is_mythical: false
        }
    },
    {
        id: "11111fff", pokemon: {
            id: 898, identifier: "calyrex", name: "バドレックス", evolves_from: null, types: ["ゴースト", "エスパー"],
            is_uncommon: false, is_legendary: false, is_mythical: false
        }
    },
    {
        id: "dd111", pokemon: {
            id: 898, identifier: "calyrex", name: "バドレックス", evolves_from: null, types: ["ゴースト", "エスパー"],
            is_uncommon: false, is_legendary: false, is_mythical: false
        }
    },
    {
        id: "11ddddd111", pokemon: {
            id: 898, identifier: "calyrex", name: "バドレックス", evolves_from: null, types: ["ゴースト", "エスパー"],
            is_uncommon: false, is_legendary: false, is_mythical: false
        }
    }
]}

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
