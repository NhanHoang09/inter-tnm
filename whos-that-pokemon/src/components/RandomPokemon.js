import React, { useState } from "react";

function RandomPokemon({
  pokemon,
  handleDragEnter,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleDragStart,
}) {
  console.log(pokemon);

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
