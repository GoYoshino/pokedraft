import { Pokemon } from "./pokemon";

export function shuffle<T>(array: Array<T>): Array<T> {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export function isFullyEvolved(pokemon: Pokemon, family: Array<Pokemon>): boolean {
  for (let i = 0; i < family.length; i++) {
      const targetPokemon = family[i]
      if (targetPokemon.evolves_from == pokemon.id) {
          return false
      }
  }
  return true
}