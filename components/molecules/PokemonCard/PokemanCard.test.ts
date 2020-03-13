import React from "react";
import { shallow, mount, render } from "enzyme";

import PokemonCard from "./PokemonCard";

describe("<PokemonCard />", () => {
  it("<PokemonCard /> renders", () => {
    const handleClick = () => {};
    const name = "";
    const pokemon = {
      baseExperience: 0,
      height: 0,
      weight: 0,
      name: "",
      abilities: [],
      types: [],
      imgUrl: "",
      id: ""
    };
    shallow(<PokemonCard {...pokemon} />);
  });
});
