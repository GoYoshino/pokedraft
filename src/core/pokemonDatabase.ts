import internal from "stream"
import { Pokemon } from "./pokemon"
import * as d3 from "d3"

function shuffle(array: Array<any>) {
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

export class PokemonDatabase {

    __pokemons: Map<number, Pokemon>
    __families: Map<number, Pokemon[]>

    constructor(initialList: Map<number, Pokemon> | null) {
        this.__pokemons = (initialList) ? initialList : new Map<number, Pokemon>()
        this.__families = new Map<number, Pokemon[]>()
        this.__makeBucketsForEachFamily()
    }

    __makeBucketsForEachFamily() {
        this.__pokemons.forEach((pokemon) => {
            if (this.__families.has(pokemon.evolution_chain_id)) {
                this.__families.get(pokemon.evolution_chain_id)?.push(pokemon)
            } else {
                this.__families.set(pokemon.evolution_chain_id, [ pokemon ])
            }
        })
    }

    static async fromFile(dataPath: string): Promise<PokemonDatabase> {
        const pokemons = new Map<number, Pokemon>()
        
        const baseData = await d3.csv(dataPath + "/pokemon_species.csv")
        baseData.forEach((row: any) => {
            pokemons.set(parseInt(row["id"]), {
                id: parseInt(row["id"]),
                identifier: row["identifier"],
                evolves_from: parseInt(row["evolves_from_species_id"]),
                evolution_chain_id: parseInt(row["evolution_chain_id"]),
                is_uncommon: false,
                is_legendary: (row["is_legendary"]) ? true : false,
                is_mythical: (row["is_mythical"]) ? true : false,
                name: row["identifier"],
                types: ["ノーマル", "ひこう"]
            })
        })

        const nameData = await d3.csv(dataPath + "/pokemon_species_names.csv")
        nameData.forEach((row: any) => {
            if (row["local_language_id"] != "1") {
                return
            }
            const targetPokemon = pokemons.get(parseInt(row["pokemon_species_id"]))!
            targetPokemon.name = row["name"]
        })

        return new PokemonDatabase(pokemons)
    }

    randomize(limit: number): Array<Pokemon> {
        const allIDs = Array.from(this.__pokemons.keys())
        const shuffledIDs = shuffle(allIDs)

        const chosenIDs = shuffledIDs.slice(0, limit)

        return chosenIDs.map(id => this.__pokemons.get(id)!)
    }

    get(id: number): Pokemon {
        return this.__pokemons.get(id)!
    }

    getAll(): Map<number, Pokemon> {
        return new Map(this.__pokemons)
    }

    getFamilyBuckets(): Map<number, Pokemon[]> {
        return new Map(this.__families)
    }
}