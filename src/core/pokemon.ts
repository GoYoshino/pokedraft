export type Pokemon = {
    id: number,
    identifier: string,
    name: string,
    evolves_from: number | null,
    evolution_chain_id: number,
    types: Array<string>,    // あとで専用のタイプ型を作る
    is_uncommon: boolean,
    is_legendary: boolean,
    is_mythical: boolean
}