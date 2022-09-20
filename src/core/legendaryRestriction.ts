import { Pokemon } from "./pokemon";
import { PoolRestriction } from "./poolRestriction";

export class LegendaryRestriction implements PoolRestriction {
    
    isBanned(target: Pokemon) {
        return target.is_legendary
    }
}

export class MythicalRestriction implements PoolRestriction {
    
    isBanned(target: Pokemon) {
        return target.is_mythical
    }
}

export class UncommonRestriction implements PoolRestriction {
    
    isBanned(target: Pokemon) {
        return target.is_uncommon
    }

}