import React from "react";

function ListPokemon({ pokemon }) {
  console.log(pokemon);
  return (
    <div className="pokemon">
      <div className="img-container">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className="info">
        <span className="number">#{pokemon.id}</span>
        <h3 className="name">{pokemon.name}</h3>
        <small className="type"> Type: 
        {pokemon.types.map((item,index) => (
            <span key={index}>{item.type.name}</span>
            ))}
            </small>
      </div>
    </div>
  );
}

export default ListPokemon;
