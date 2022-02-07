import React from 'react';

function QuestionPoke({randomPokemon}) {
  return    <div className="pokemon">
  <div className="img-container"></div>
  <div className="info">
    <span className="number">#{randomPokemon[1].id}</span>
    <h3 className="name">{randomPokemon[1].name}</h3>
    <small className="type">
      Type:
      {randomPokemon[1].types.map((item, index) => (
        <span key={index}>{item.type.name}</span>
      ))}
    </small>
  </div>
</div>;
}

export default QuestionPoke;
