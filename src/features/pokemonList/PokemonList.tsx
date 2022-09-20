import { useAppSelector } from "../../app/hooks"

export const PokemonList = () => {
    const pokemons = useAppSelector(state => state.pokemonList);

    const renderedPokemons = pokemons.map(listItem => (
        <div className="col-xs-1 pokemon-icon" key={listItem.id}>
            <img src={`img/icons/${listItem.pokemon.identifier}.png`} title={listItem.pokemon.name}></img>
        </div>
    ))

    return (
        <div className="row" id="div-pokemon-list">
            { renderedPokemons }
        </div>
    )
}

