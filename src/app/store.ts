import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { Pokemon } from '../core/pokemon';
import pokemonListReducer from '../features/pokemonList/pokemonListSlice';
import randomizeOptionReducer from "../features/randomizeOption/randomizeOptionSlice"

export type PokemonListItem = {
  id: string,
  pokemon: Pokemon
}

export const store = configureStore({
  reducer: {
    pokemonList: pokemonListReducer,
    randomizeOptions: randomizeOptionReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
