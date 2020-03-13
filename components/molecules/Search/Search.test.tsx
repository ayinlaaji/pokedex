import React from "react";
import { shallow } from "enzyme";

import Search from "./Search";

describe("<Search />", () => {
  it("<Search /> renders", () => {
    const handleSubmit = () => {};
    const pokemons = [];
    shallow(<Search handleSubmit={handleSubmit} pokemons={pokemons} />);
  });
});
