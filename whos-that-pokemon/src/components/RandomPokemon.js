import React, { useState } from "react";

function RandomPokemon({ pokemon }) {
  console.log(pokemon);
  // const randomPokemon = () => {
  //   const random = Math.floor(Math.random() * 151);
  //   let Url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random}.png`;
  //   return Url;
  // };
  const [dragData, setDragData] = useState({});
  const [noDrop, setNoDrop] = useState("");

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
    <>
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
          src={pokemon.sprites.front_default}
          draggable
          // event handler
          onDragStart={(e) => handleDragStart(e, pokemon.id, pokemon.name)}
        />
      </div>
    </>
  );
}

export default RandomPokemon;
