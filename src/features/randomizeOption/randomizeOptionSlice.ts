import { createSlice } from "@reduxjs/toolkit";
import { PokemonListItem } from "../../app/store";
import { PokemonDatabase } from "../../core/pokemonDatabase";

type randomizeOptionState = {
    numberOfSlots: number
}

const initialState: randomizeOptionState = { numberOfSlots: 30 }

const randomizeOptionSlice = createSlice({
    name: "randomizeOption",
    initialState,
    reducers: {
        setNumberOfSlots(state, action) {
            state.numberOfSlots = action.payload
        }
    }
})

export const { setNumberOfSlots } = randomizeOptionSlice.actions

export default randomizeOptionSlice.reducer
