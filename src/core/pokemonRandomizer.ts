import internal from "stream"
import { Pokemon } from "./pokemon"
const d3 = require("d3")

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
  
  // Used like so
  var arr = [2, 11, 37, 42];
  shuffle(arr);
  console.log(arr);

export class PokemonRandomizer {

    pokemons: Map<number, Pokemon>

    constructor(initialList: Map<number, Pokemon> | null) {
        this.pokemons = (initialList) ? initialList : new Map<number, Pokemon>()
    }

    static async fromFile(dataPath: string): Promise<PokemonRandomizer> {
        const pokemons = new Map<number, Pokemon>()
        
        const data = await d3.csv(dataPath + "/pokemon_species.csv")
        data.forEach((row: any) => {
            pokemons.set(parseInt(row["id"]), {
                id: parseInt(row["id"]),
                identifier: row["identifier"],
                evolves_from: parseInt(row["evolves_from_species_id"]),
                is_uncommon: false,
                is_legendary: (row["is_legendary"]) ? true : false,
                is_mythical: (row["is_mythical"]) ? true : false,
                name: row["identifier"],
                types: ["ノーマル", "ひこう"]
            })
        })

        console.log(pokemons)
        return new PokemonRandomizer(pokemons)
    }

    randomize(limit: number): Array<Pokemon> {
        const allIDs = Array.from(this.pokemons.keys())
        const shuffledIDs = shuffle(allIDs)

        const chosenIDs = shuffledIDs.slice(0, limit)

        return chosenIDs.map(id => this.pokemons.get(id)!)

    }
}