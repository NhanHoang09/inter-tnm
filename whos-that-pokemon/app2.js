import React, { useState, useEffect } from "react";
import "./App.css";
import RandomPokemon from "./components/RandomPokemon";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false);
  const [dragData, setDragData] = useState({});
  const [noDrop, setNoDrop] = useState("");
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=151";

  useEffect(() => {
    async function fetchData() {
      let response = await pokeAPICall(apiURL);
      loadingPokemon(response.results);
    }
    fetchData();
  }, []);

  function pokeAPICall(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          setError(true);
          console.error("Error occured", error);
        });
    });
  }

  const loadingPokemon = async (data) => {
    let pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        pokemon = await pokeAPICall(pokemon.url);
        return pokemon;
      })
    );
    setPokemon(pokemonData);
  };

  const handleDragStart = (e, id, group) => {
    setDragData({ id: id, initialGroup: group });
  };

  const handleDragEnter = (e, group) => {};

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setNoDrop("");
  };

  const handleDrop = (e) => {};



  return (
    <div className="App">
      <div className="title">
        <h1>Who's that Pokemon ?</h1>
      </div>
      <div className="container">
        {pokemon
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)
          .map((pokemon, i) => {
            return <RandomPokemon key={pokemon.id} pokemon={pokemon} handleDragEnter={handleDragEnter} handleDragOver={handleDragOver} handleDragLeave={handleDragLeave} handleDrop={handleDrop} handleDragStart={handleDragStart}/>;
          })}
      </div>
      <div
        className="items"
        onDragEnter={(e) => handleDragEnter(e, pokemon.name)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, pokemon)}
      >
        <img
          id="dragImg"
          alt="drag images"
          draggable
          // event handler
          onDragStart={(e) => handleDragStart(e, pokemon.id, pokemon.name)}
        />
      </div>
    </div>
  );
}

export default App;
