import React, { useState, useEffect } from "react";
import "./App.css";
import RandomPokemon from "./components/RandomPokemon";

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

  // const randomPokemon = (pokemon) => {
  //   pokemon.slide(0, 1).map((pokemon, i) => {
  //     const random = Math.floor(Math.random() * 151);
  //     let Url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random}.png`;
  //     return Url;
  //   });
  // };

  // const onDragStart = (e) => {
  //   e.dataTransfer.setData("text", e.target.id);
  // };

  // const onDrop = (e) => {
  //   e.preventDefault();

  //   e.target.appendChild(
  //     document.getElementById(e.dataTransfer.getData("text"))
  //   );

  //   e.target.setAttribute("class", "items");
  // };

  // const onDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const onDragLeave = (e) => {
  //   e.target.setAttribute("class", "items");
  // };

  // const onDragEnter = (e) => {
  //   e.target.setAttribute("class", "items hovered");
  // };

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
            return <RandomPokemon key={pokemon.id} pokemon={pokemon} />;
          })}
      </div>
    </div>
  );
}

export default App;
