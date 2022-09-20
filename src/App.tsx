import React, { useEffect, useState } from 'react';
import './App.css';
import { PokemonList } from './features/pokemonList/PokemonList';
import { useAppDispatch } from './app/hooks';
import { randomized } from './features/pokemonList/pokemonListSlice';
import { PokemonListItem } from './app/store';
import { nanoid } from '@reduxjs/toolkit'
import { PokemonDatabase } from "./core/pokemonDatabase"
import { Pokemon } from './core/pokemon';

type PokemonDBResult = {
  id: number,
  identifier: string,
  evolves_from: number,
  is_uncommon: number,
  is_legendary: number,
  is_mythical: number,
  name: string
}

function App() {
  const [ rootPokemonDB, setRootPokemonDB ] = useState(new PokemonDatabase(null))
  const [ numberOfSlots, setNumberOfSlots ] = useState(30)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("useeffect")
    const loadDB = async () => {
      const rootPokemonDB = await PokemonDatabase.fromFile("data")
      setRootPokemonDB(rootPokemonDB)
      console.log("callback")
    }
    loadDB()
  }, [])
  
  const onRandomizeClicked = () => {
    const randomizeResult = rootPokemonDB.randomize(numberOfSlots)
    const listItems = new Array<PokemonListItem>()

    randomizeResult.forEach((record: Pokemon) => {
      listItems.push({
        id: nanoid(),
        pokemon: record
      })
          
    })
    console.log(listItems)
    dispatch(
      randomized(listItems)
    )
  }

  const onSlotChanged = (e: any) => {
    setNumberOfSlots(e.target.value)
  }

  return (
    <div className="App">
      <script
          src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true"></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="css/brazil-standard.css"
      />
      <div className="container">
        <div id="div-header" className="row bg-dark text-light">
            <h1>ブラジルスタンジェネレータ</h1>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="row" id="div-pokemon-list">
              <React.Fragment>
                <PokemonList />
              </React.Fragment>
            </div>
          </div>
          <div className="col-4">
            <h2 className="bg-info">オプション</h2>
            <div className="row">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">選出枠数</span>
                <input type="text" className="form-control" aria-label="選出枠数" aria-describedby="basic-addon1" value={numberOfSlots} onChange={onSlotChanged} />
              </div>
              <button type="button" className="btn btn-primary" onClick={onRandomizeClicked}>抽選</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
