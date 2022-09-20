import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PokemonList } from './features/pokemonList/PokemonList';

function App() {
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
              <PokemonList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
