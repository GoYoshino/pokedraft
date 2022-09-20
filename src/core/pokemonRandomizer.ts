import { generateEvolutionBranchwisePool } from "./generateEvolutionBranchwisePool";
import { Pokemon } from "./pokemon";
import { PokemonDatabase } from "./pokemonDatabase";

export type RandomizeOptions = {
    combineFamily: boolean,
    numberOfSlots: number
}

export interface PokemonRandomizer {
    randomize(randomizeOptions: RandomizeOptions, database: PokemonDatabase): Pokemon[]
}

class StanadrdPokemonRandamizer implements PokemonRandomizer {
    randomize(options: RandomizeOptions, database: PokemonDatabase): Pokemon[] {
        if (options.combineFamily) {
            const pool = generateB(database)
        }
    }
    return []
}