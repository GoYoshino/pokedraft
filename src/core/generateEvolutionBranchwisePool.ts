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
        if (family.length == 1) {
            pool.push([ family[0] ])
            return
        }
        for (let i = 0; i < family.length; i++ ) {
            const pokemon = family[i]
            if (isFullyEvolved(pokemon, family)) {
                const newBranch = new Array<Pokemon>();
                let child = pokemon
                while (true) {
                    newBranch.push(child)
                    if (!child.evolves_from) {
                        break
                    }
                    child = database.get(child.evolves_from)
                }
                newBranch.sort((a, b) => (a.id - b.id))
                pool.push(newBranch)
            }
        }
    })

    return pool
}