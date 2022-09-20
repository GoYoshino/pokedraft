import { createSlice } from "@reduxjs/toolkit";
import { PokemonListItem } from "../../app/store";
import { PokemonDatabase } from "../../core/pokemonDatabase";
import { RandomizeOptions } from "../../core/pokemonRandomizer";

// TODO: オプションの型を流用する
type randomizeOptionState = {
    options: RandomizeOptions
}

const initialState: randomizeOptionState = { options: {
        numberOfSlots: 30, allowsUncommon: false, allowsLegendary: false, allowsMythical: false,
        combineFamily: true, omitUnevolved: true, restrictToSwSh: true
    }
}

const randomizeOptionSlice = createSlice({
    name: "randomizeOption",
    initialState,
    reducers: {
        setNumberOfSlots(state, action) {
            state.options.numberOfSlots = action.payload
        },
        setAllowsUncommon(state, action) {
            state.options.allowsUncommon = action.payload
        },
        setAllowsLegendary(state, action) {
            state.options.allowsLegendary = action.payload
        },
        setAllowsMythical(state, action) {
            state.options.allowsMythical = action.payload
        }
    }
})

export const { setNumberOfSlots } = randomizeOptionSlice.actions

export default randomizeOptionSlice.reducer
