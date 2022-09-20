import { Pokemon } from "./pokemon";

/**
 * ポケモン選出プールを生成する
 */
export interface PoolRestriction {
    isBanned(target: Pokemon): boolean
}