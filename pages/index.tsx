import React, { ReactChild } from "react";
import constate from "constate";
import IndexTemplate from "@pokedex/templates/index";

import Search from "@pokedex/components/molecules/Search";
import PokemonList from "@pokedex/components/organisms/PokemonList";
import PokemonCard from "@pokedex/components/molecules/PokemonCard";
import usePokemonC from "@pokedex/reducers/pokemon";

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
const Providers = ({ children }: { children: ReactChild }) => (
  <PokemonProv>{children}</PokemonProv>
);

//Connected components
const ConnectedSearch = () => {
  const { pokemons, getPokemon } = usePokemon();
  return <Search pokemons={pokemons} handleSubmit={getPokemon} />;
};
const ConnectedList = () => {
  const { chunk, getPokemon, totalPages, morePokemons } = usePokemon();
  const handleMore = (e: Event, a: { activePage: number }) => {
    return morePokemons(a.activePage);
  };
  return (
    <PokemonList
      handleItemClick={getPokemon}
      pokemons={chunk}
      totalPages={totalPages}
      handleMoreClick={handleMore}
    />
  );
};
const ConnectedPokemonCard = () => {
  const { currentPokemon } = usePokemon();
  return <PokemonCard {...currentPokemon} />;
};
