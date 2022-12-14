import React, { useEffect, useState } from 'react';
import './App.css';
import { PokemonList } from './features/pokemonList/PokemonList';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { randomized } from './features/pokemonList/pokemonListSlice';
import { PokemonListItem } from './app/store';
import { nanoid } from '@reduxjs/toolkit'
import { PokemonDatabase } from "./core/pokemonDatabase"
import { Pokemon } from './core/pokemon';
import { randomize } from './core/pokemonRandomizer';

function App() {
  const [ rootPokemonDB, setRootPokemonDB ] = useState(new PokemonDatabase(null))
  const [ numberOfSlots, setNumberOfSlots ] = useState(30)
  const [ allowsUncommon, setAllowsUncommon ] = useState(false)
  const [ allowsLegendary, setAllowsLegendary ] = useState(false)
  const [ allowsMythical, setAllowsMythical ] = useState(false)
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
    const randomizeResult = randomize({
      combineFamily: true,
      omitUnevolved: true,
      numberOfSlots: numberOfSlots,
      restrictToSwSh: true,
      allowsMythical: allowsMythical,
      allowsLegendary: allowsLegendary,
      allowsUncommon: allowsUncommon
    }, rootPokemonDB)
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

  const onNumberOfSlotChanged = (e: any) => {
    setNumberOfSlots(e.target.value)
  }

  const onAllowsUncommonChanged = (e: any) => {
    setAllowsUncommon(e.target.checked)
  }

  const onAllowsLegendaryChanged = (e: any) => {
    setAllowsLegendary(e.target.checked)
  }

  const onAllowsMythicalChanged = (e: any) => {
    setAllowsMythical(e.target.checked)
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
            <h1>???????????????????????????????????????</h1>
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
            <h2 className="bg-info">???????????????</h2>
            <div className="row">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">????????????</span>
                <input type="text" className="form-control" aria-label="????????????" aria-describedby="basic-addon1" value={numberOfSlots} onChange={onNumberOfSlotChanged} />
              </div>
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="allowsUncommon" checked={allowsUncommon} onChange={onAllowsUncommonChanged} />
                  <label className="form-check-label" htmlFor="allowsUncommon">????????????</label>
              </div>
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="allowsLegendary" checked={allowsLegendary} onChange={onAllowsLegendaryChanged} />
                  <label className="form-check-label" htmlFor="allowsLegendary">????????????</label>
              </div>
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="allowsMythical" checked={allowsMythical} onChange={onAllowsMythicalChanged}/>
                  <label className="form-check-label" htmlFor="allowsMythical">?????????</label>
              </div>
              <button type="button" className="btn btn-primary" onClick={onRandomizeClicked}>??????</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
