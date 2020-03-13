import React from "react";
import { shallow, mount, render } from "enzyme";

import PokemonList from "./PokemonList";

describe("<PokemonList />", () => {
  it("<PokemonList /> renders", () => {
    const state = {
      totalPages: 10,
      pokemons: [],
      handleItemClick: () => {},
      handleMoreClick: () => {}
    };
    shallow(<PokemonList {...state} />);
  });
});
