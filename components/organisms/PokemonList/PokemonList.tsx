import React from "react";
import { Divider, List, Pagination } from "semantic-ui-react";
import PokemonItem from "@pokedex/components/molecules/PokemonItem";
import { Poke } from "@pokedex/typings/pokemon";

type Props = {
  totalPages: number;
  pokemons: Poke[];
  handleItemClick: (id: string) => void;
  handleMoreClick: any;
};

const PokemonList = ({
  totalPages,
  pokemons,
  handleItemClick,
  handleMoreClick
}: Props) => (
  <div>
    <List divided>
      {pokemons.map(({ name, id }) => (
        <PokemonItem
          key={id}
          name={name}
          handleClick={() => handleItemClick(id)}
        />
      ))}
    </List>
    <Divider />
    <Pagination
      boundaryRange={3}
      defaultActivePage={1}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      onPageChange={handleMoreClick}
      totalPages={totalPages}
    />
  </div>
);

export default PokemonList;
