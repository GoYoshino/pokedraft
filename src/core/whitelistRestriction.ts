import { Pokemon } from "./pokemon";
import { PoolRestriction } from "./poolRestriction";

export class WhitelistRestriction implements PoolRestriction {

    __list: number[]

    constructor(list: number[]) {
        this.__list = list
    }

    isBanned(target: Pokemon): boolean {
        return !(this.__list.includes(target.id))
    }
}