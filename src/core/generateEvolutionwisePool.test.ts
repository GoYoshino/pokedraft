import { generateEvolutionBranchwisePool } from "./generateEvolutionBranchwisePool"
import { Pokemon } from "./pokemon"
import { PokemonDatabase } from "./pokemonDatabase"

const fabricate = (id: number, evolution_chain_id: number, evolves_from: number | null): Pokemon => {
    return {
        id: id, identifier: "hoge",
        evolution_chain_id: evolution_chain_id, evolves_from: evolves_from,
        is_legendary: false, is_mythical: false, is_uncommon: false,
        name: "hoge", types: ["ノーマル"]
    }
}

describe("generateFamilywisePoolのテスト", () => {
    test("正しい一族ごと抽選プールが生成される: 並び順が連続しているとき", () => {
        const testData = new Map<number, Pokemon>()
        testData.set(1, fabricate(1, 1, null))
        testData.set(2, fabricate(2, 1, 1))
        testData.set(3, fabricate(3, 1, 2))
    
        testData.set(4, fabricate(4, 2, null))
        testData.set(5, fabricate(5, 2, 4))
        testData.set(6, fabricate(6, 2, 5))
        
        testData.set(7, fabricate(7, 3, null))
        testData.set(8, fabricate(8, 3, 7))
    
        const database = new PokemonDatabase(testData)
        const pool = generateEvolutionBranchwisePool(database)
    
        expect(pool.length).toBe(3)
        
        expect(pool[0].length).toBe(3)
        expect(pool[0][0].id).toBe(1)
        expect(pool[0][1].id).toBe(2)
        expect(pool[0][2].id).toBe(3)
    
        expect(pool[1].length).toBe(3)
        expect(pool[1][0].id).toBe(4)
        expect(pool[1][1].id).toBe(5)
        expect(pool[1][2].id).toBe(6)
    
        expect(pool[2].length).toBe(2)
        expect(pool[2][0].id).toBe(7)
        expect(pool[2][1].id).toBe(8)
    })
    
    test("正しい一族ごと抽選プールが生成される: 逆順になるとき", () => {
        const testData = new Map<number, Pokemon>()
        testData.set(25, fabricate(25, 10, 172))
        testData.set(172, fabricate(172, 10, null))
    
        const database = new PokemonDatabase(testData)
        const pool = generateEvolutionBranchwisePool(database)
    
        expect(pool.length).toBe(1)
    
        expect(pool[0].length).toBe(2)
        expect(pool[0][0].id).toBe(25)
        expect(pool[0][1].id).toBe(172)
    })
    
    test("正しい一族ごと抽選プールが生成される: 進化先が複数あるとき", () => {
        const testData = new Map<number, Pokemon>()
    
        testData.set(133, fabricate(133, 67, null))
        testData.set(134, fabricate(134, 67, 133))
        testData.set(135, fabricate(135, 67, 133))
        testData.set(136, fabricate(136, 67, 133))
        testData.set(471, fabricate(471, 67, 133))
      
        const database = new PokemonDatabase(testData)
        const pool = generateEvolutionBranchwisePool(database)
    
        expect(pool.length).toBe(4)
        
    
        expect(pool[0].length).toBe(2)
        expect(pool[0][0].id).toBe(133)
        expect(pool[0][1].id).toBe(134)
    
        expect(pool[1].length).toBe(2)
        expect(pool[1][0].id).toBe(133)
        expect(pool[1][1].id).toBe(135)
    
        expect(pool[2].length).toBe(2)
        expect(pool[2][0].id).toBe(133)
        expect(pool[2][1].id).toBe(136)
    
        expect(pool[3].length).toBe(2)
        expect(pool[3][0].id).toBe(133)
        expect(pool[3][1].id).toBe(471)
    
    })
})
