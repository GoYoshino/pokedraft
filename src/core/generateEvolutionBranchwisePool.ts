import { Pokemon } from "./pokemon";
import { PokemonDatabase } from "./pokemonDatabase";

const isFullyEvolved = (pokemon: Pokemon, family: Array<Pokemon>): boolean => {
    for (let i = 0; i < family.length; i++) {
        const targetPokemon = family[i]
        if (targetPokemon.evolves_from == pokemon.id) {
            return false
        }
    }
    return true
}

export const generateEvolutionBranchwisePool = (database: PokemonDatabase): Pokemon[][] => {
    const families = database.getFamilyBuckets()
    const pool = new Array<Array<Pokemon>>();

    families.forEach(family => {
        for (let i = 0; i < family.length; i++ ) {
            const pokemon = family[i]
            if (isFullyEvolved(pokemon, family)) {
                const newBranch = new Array<Pokemon>();
                newBranch.push(pokemon)
                let child = pokemon
                while (true) {
                    if (child.evolves_from == null) {
                        break
                    }
                    child = database.get(child.evolves_from)
                    newBranch.push(child)
                }
                newBranch.sort((a, b) => (a.id - b.id))
                pool.push(newBranch)
            }
        }
    })

    return pool
}