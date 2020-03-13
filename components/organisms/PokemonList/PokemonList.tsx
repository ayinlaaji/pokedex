import React from "react";
import { Divider, Grid, List, Pagination } from "semantic-ui-react";
import PokemonItem from "../../molecules/PokemonItem";
import { Pokemon } from "../../../typings/pokemon";

type Props = {
  totalPages: number;
  pokemons: Pokemon[];
  handleItemClick: any;
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
