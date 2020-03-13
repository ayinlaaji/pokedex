import React, { useState } from "react";
import constate from "constate";
import IndexTemplate from "../templates/index";

import Search from "../components/molecules/Search";
import PokemonList from "../components/organisms/PokemonList";
import PokemonCard from "../components/molecules/PokemonCard";
import usePokemonC from "../reducers/pokemon";

const Index = () => (
  <Providers>
    <IndexTemplate
      Search={ConnectedSearch}
      PokemonList={ConnectedList}
      PokemonCard={ConnectedPokemonCard}
    />
  </Providers>
);

export default Index;

const [PokemonProv, usePokemon] = constate(usePokemonC);
const Providers = props => <PokemonProv>{props.children}</PokemonProv>;

//Connected components
const ConnectedSearch = () => {
  const { pokemons, getPokemon } = usePokemon();
  return <Search pokemons={pokemons} handleSubmit={getPokemon} />;
};
const ConnectedList = () => {
  const { pokemons, getPokemon, totalPages, morePokemons } = usePokemon();
  return (
    <PokemonList
      handleItemClick={getPokemon}
      pokemons={pokemons}
      totalPages={totalPages}
      handleMoreClick={(e, a) => morePokemons(a.activePage)}
    />
  );
};
const ConnectedPokemonCard = () => {
  const { currentPokemon } = usePokemon();
  return <PokemonCard {...currentPokemon} />;
};