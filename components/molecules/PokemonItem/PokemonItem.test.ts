import React from "react";
import { shallow, mount, render } from "enzyme";

import PokemonItem from "./PokemonItem";

describe("<PokemonItem />", () => {
  it("<PokemonItem /> renders", () => {
    const handleClick = () => {};
    const name = "";
    shallow(<PokemonItem handleClick={handleClick} name={name} />);
  });
});
