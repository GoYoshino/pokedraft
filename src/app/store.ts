import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { Pokemon } from '../core/pokemon';
import pokemonListReducer from '../features/pokemonList/pokemonListSlice';

export type PokemonListItem = {
  id: string,
  pokemon: Pokemon
}

export const store = configureStore({
  reducer: {
    pokemonList: pokemonListReducer,
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
