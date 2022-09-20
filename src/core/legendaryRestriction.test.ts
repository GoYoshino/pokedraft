import { LegendaryRestriction, MythicalRestriction, UncommonRestriction } from "./legendaryRestriction"
import { Pokemon } from "./pokemon"

describe("legendaryRestrictionのテスト", () => {
    const fabricate = (id: number, is_legendary: boolean): Pokemon => {
        return {
            id: id, identifier: "hoge",
            evolution_chain_id: 1, evolves_from: 1,
            is_legendary: is_legendary, is_mythical: false, is_uncommon: false,
            name: "hoge", types: ["ノーマル"]
        }
    }
    
    test("伝説のみをBANできる", () => {
        const r = new LegendaryRestriction()
        expect(r.isBanned(fabricate(1, true))).toBeTruthy
        expect(r.isBanned(fabricate(1, false))).toBeFalsy
    })
})

describe("mythicalRestrictionのテスト", () => {
    const fabricate = (id: number, is_mythical: boolean): Pokemon => {
        return {
            id: id, identifier: "hoge",
            evolution_chain_id: 1, evolves_from: 1,
            is_legendary: true, is_mythical: is_mythical, is_uncommon: false,
            name: "hoge", types: ["ノーマル"]
        }
    }
    
    test("幻のみをBANできる", () => {
        const r = new MythicalRestriction()
        expect(r.isBanned(fabricate(1, true))).toBeTruthy
        expect(r.isBanned(fabricate(1, false))).toBeFalsy
    })
})

describe("mythicalRestrictionのテスト", () => {
    const fabricate = (id: number, is_uncommon: boolean): Pokemon => {
        return {
            id: id, identifier: "hoge",
            evolution_chain_id: 1, evolves_from: 1,
            is_legendary: false, is_mythical: false, is_uncommon: is_uncommon,
            name: "hoge", types: ["ノーマル"]
        }
    }
    
    test("準伝のみをBANできる", () => {
        const r = new UncommonRestriction()
        expect(r.isBanned(fabricate(1, true))).toBeTruthy
        expect(r.isBanned(fabricate(1, false))).toBeFalsy
    })
})