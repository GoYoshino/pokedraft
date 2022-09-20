import { IDS_ALLOWED_IN_SWSH } from "./versions/swsh";
import { generateEvolutionBranchwisePool } from "./generateEvolutionBranchwisePool";
import { LegendaryRestriction, MythicalRestriction, UncommonRestriction } from "./legendaryRestriction";
import { Pokemon } from "./pokemon";
import { PokemonDatabase } from "./pokemonDatabase";
import { isFullyEvolved, shuffle } from "./utils";
import { WhitelistRestriction } from "./whitelistRestriction";

export type RandomizeOptions = {
    combineFamily: boolean,
    omitUnevolved: boolean,
    numberOfSlots: number,
    restrictToSwSh: boolean,
    allowsMythical: boolean,
    allowsLegendary: boolean,
    allowsUncommon: boolean
}

export function randomize(options: RandomizeOptions, originalDatabase: PokemonDatabase): Pokemon[] {
    let database = (options.restrictToSwSh) ? originalDatabase.restrict(new WhitelistRestriction(IDS_ALLOWED_IN_SWSH)) : originalDatabase
    database = (options.allowsMythical) ? database : database.restrict(new MythicalRestriction())
    database = (options.allowsLegendary) ? database : database.restrict(new LegendaryRestriction())
    database = (options.allowsUncommon) ? database : database.restrict(new UncommonRestriction())

    if (options.combineFamily) {
        const pool = generateEvolutionBranchwisePool(database)
        const shuffled = shuffle<Pokemon[]>(pool)
        // 重複しないようにする->Mapのsetを使うので重複は自動排除
        const chosenBranches = shuffled.slice(0, options.numberOfSlots)
        const result = new Map<number, Pokemon>()
        chosenBranches.forEach(branch => {
            if (options.omitUnevolved) {
                branch.forEach(pokemon => {
                    if (!isFullyEvolved(pokemon, branch)) {
                        return
                    }
                    result.set(pokemon.id, pokemon)
                })
            } else {
                branch.forEach(pokemon => {
                    result.set(pokemon.id, pokemon)
                })
            }
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