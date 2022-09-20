import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PokemonList } from './features/pokemonList/PokemonList';
import { useAppDispatch, useAppSelector } from './app/hooks';
import pokemonListSlice, { randomized } from './features/pokemonList/pokemonListSlice';
import { PokemonListItem } from './app/store';
import { nanoid } from '@reduxjs/toolkit'
import { PokemonRandomizer } from "./core/pokemonRandomizer"
import { setConstantValue } from 'typescript';
import { useSelector } from 'react-redux';
import { setRootDB } from './features/pokemonList/pokemonDatabaseSlice';

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
  const [ rootPokemonDB, setRootPokemonDB ] = useState(new PokemonRandomizer(null))
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log("useeffect")
    const loadDB = async () => {
      const rootPokemonDB = await PokemonRandomizer.fromFile("data")
      setRootPokemonDB(rootPokemonDB)
      console.log("callback")
    }
    loadDB()
  }, [])
  
  const onRandomizeClicked = () => {
    const randomizeResult = rootPokemonDB.randomize(10)
    const listItems = new Array<PokemonListItem>()

    randomizeResult.forEach((record) => {
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
          <div className="row"><button type="button" className="btn btn-primary" onClick={onRandomizeClicked}>抽選</button></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
