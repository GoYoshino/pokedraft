import { generateEvolutionBranchwisePool } from "./generateEvolutionBranchwisePool";
import { Pokemon } from "./pokemon";
import { PokemonDatabase } from "./pokemonDatabase";
import { shuffle } from "./shuffle";

export type RandomizeOptions = {
    combineFamily: boolean,
    numberOfSlots: number
}

export function randomize(options: RandomizeOptions, database: PokemonDatabase): Pokemon[] {
    if (options.combineFamily) {
        const pool = generateEvolutionBranchwisePool(database)
        const shuffled = shuffle<Pokemon[]>(pool)
        // 重複しないようにする->Mapのsetを使うので重複は自動排除
        const chosenBranches = shuffled.slice(0, options.numberOfSlots)
        const result = new Map<number, Pokemon>()
        chosenBranches.forEach(branch => {
            branch.forEach(pokemon => {
                if (pokemon == undefined) {
                    console.log(chosenBranches)
                }
                result.set(pokemon.id, pokemon)
            })
        })
        const output = Array.from(result.values())
        output.sort((a, b) => a.id - b.id)
        return output
    } else {
        const all = Array.from(database.getAll().values())
        const shuffled = shuffle<Pokemon>(all)

        const chosen = shuffled.slice(0, options.numberOfSlots)
        chosen.sort((a, b) => a.id - b.id)

        return chosen
    }
}