import React, { useState, useEffect } from "react";
import QuestionPoke from "./QuestionPoke";

export default function Dnd() {
  const [randomPokemon, setRandomPokemon] = useState([]);

  //fetch pokemon
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
    console.log(pokemonData);
  };
  
  useEffect(() => {
    const randomPK = pokemon.sort(() => 0.5 - Math.random()).slice(0, 5);
    setRandomPokemon(randomPK);
    console.log(randomPK);
  }, [pokemon]);

  const [dragData, setDragData] = useState({});

  const handleDragStart = (e, id) => {
    console.log("drag start");
  };

  const handleDragEnter = (e, group) => {};

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, group) => {};

  return (
    <>
      <div className="groups">
        {randomPokemon.map((item) => (
          <div key={item.id} className="pokemon">
            <div className="img-container">
              <img
                src={item.sprites.front_default}
                alt=""
                draggable
                // event handler
                onDragStart={(e) => handleDragStart(e, item.id)}
              />
            </div>
          </div>
        ))}
        {randomPokemon?.length && <QuestionPoke randomPokemon={randomPokemon}  /> }
      </div>
    </>
  );
}
