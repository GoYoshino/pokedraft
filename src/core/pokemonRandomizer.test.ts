import { Pokemon } from "./pokemon"
import { PokemonDatabase } from "./pokemonDatabase"
import { randomize } from "./pokemonRandomizer"

const fabricate = (id: number, evolution_chain_id: number, evolves_from: number | null): Pokemon => {
    return {
        id: id, identifier: "hoge",
        evolution_chain_id: evolution_chain_id, evolves_from: evolves_from,
        is_legendary: false, is_mythical: false, is_uncommon: false,
        name: "hoge", types: ["ノーマル"]
    }
}

describe("PokemonRandomizerのテスト", () => {
    test("進化系まとめ抽選が機能する", () => {
        const testData = new Map<number, Pokemon>()

        testData.set(1, fabricate(1, 1, null))
        testData.set(2, fabricate(2, 1, 1))
        testData.set(3, fabricate(3, 1, 2))
        testData.set(4, fabricate(4, 2, null))
        testData.set(5, fabricate(5, 2, 4))
        testData.set(6, fabricate(6, 2, 5))
        testData.set(7, fabricate(7, 3, null))
        testData.set(8, fabricate(8, 3, 7))
        testData.set(25, fabricate(25, 10, 172))
        testData.set(133, fabricate(133, 67, null))
        testData.set(134, fabricate(134, 67, 133))
        testData.set(135, fabricate(135, 67, 133))
        testData.set(136, fabricate(136, 67, 133))
        testData.set(172, fabricate(172, 10, null))
        testData.set(471, fabricate(471, 67, 133))

        const database = new PokemonDatabase(testData)

        const result = randomize({combineFamily: true, omitUnevolved: false, numberOfSlots: 8}, database)

        expect(result.length).toBe(15)
        expect(result).toEqual(Array.from(testData.values()))
    })

    test("進化系まとめ＋最終進化のみ抽選が機能する", () => {
        const testData = new Map<number, Pokemon>()

        testData.set(1, fabricate(1, 1, null))
        testData.set(2, fabricate(2, 1, 1))
        testData.set(3, fabricate(3, 1, 2))
        testData.set(4, fabricate(4, 2, null))
        testData.set(5, fabricate(5, 2, 4))
        testData.set(6, fabricate(6, 2, 5))
        testData.set(7, fabricate(7, 3, null))
        testData.set(8, fabricate(8, 3, 7))
        testData.set(25, fabricate(25, 10, 172))
        testData.set(133, fabricate(133, 67, null))
        testData.set(134, fabricate(134, 67, 133))
        testData.set(135, fabricate(135, 67, 133))
        testData.set(136, fabricate(136, 67, 133))
        testData.set(172, fabricate(172, 10, null))
        testData.set(471, fabricate(471, 67, 133))

        const database = new PokemonDatabase(testData)

        const result = randomize({combineFamily: true, omitUnevolved: true, numberOfSlots: 8}, database)

        expect(result.length).toBe(8)
        expect(result).toContain(testData.get(3))
        expect(result).toContain(testData.get(6))
        expect(result).toContain(testData.get(8))
        expect(result).toContain(testData.get(25))
        expect(result).toContain(testData.get(134))
        expect(result).toContain(testData.get(135))
        expect(result).toContain(testData.get(136))
        expect(result).toContain(testData.get(471))
    })

    test("進化系まとめない抽選が機能する", () => {
        const testData = new Map<number, Pokemon>()

        testData.set(1, fabricate(1, 1, null))
        testData.set(2, fabricate(2, 1, 1))
        testData.set(3, fabricate(3, 1, 2))
        testData.set(4, fabricate(4, 2, null))
        testData.set(5, fabricate(5, 2, 4))
        testData.set(6, fabricate(6, 2, 5))
        testData.set(7, fabricate(7, 3, null))
        testData.set(8, fabricate(8, 3, 7))
        testData.set(25, fabricate(25, 10, 172))
        testData.set(133, fabricate(133, 67, null))
        testData.set(134, fabricate(134, 67, 133))
        testData.set(135, fabricate(135, 67, 133))
        testData.set(136, fabricate(136, 67, 133))
        testData.set(172, fabricate(172, 10, null))
        testData.set(471, fabricate(471, 67, 133))

        const database = new PokemonDatabase(testData)

        const result = randomize({combineFamily: false, omitUnevolved: false, numberOfSlots: 10}, database)

        expect(result.length).toBe(10)
    })
})