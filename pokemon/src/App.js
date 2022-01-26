import React, { useState, useEffect } from "react";
import ListPokemon from "./components/ListPokemon";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false);
  const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=151";

  useEffect(() => {
    async function fetchData() {
      let response = await pokeAPICall(apiURL);
      loadingPokemon(response.results);
    }
    fetchData();
  });

  //Purpose: This function makes calls to the pokemon API with the url passed in as a parameter
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

  //Displaying the pokemon on the page
  return error ? (
    <div>Error occured</div>
  ) : (
    <>
      <header>
        <h1>Pokedex</h1>
      </header>
      <div className="poke-container">
        {pokemon.map((pokemon, i) => {
          return <ListPokemon key={i} pokemon={pokemon} />;
        })}
      </div>
    </>
  );
}

export default App;
