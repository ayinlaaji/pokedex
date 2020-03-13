import React, { FunctionComponent, createRef } from "react";
import { Grid, Divider } from "semantic-ui-react";

type Props = {
  Search: FunctionComponent;
  PokemonList: FunctionComponent;
  PokemonCard: FunctionComponent;
};

const IndexTemplate = ({ Search, PokemonList, PokemonCard }: Props) => (
  <Grid centered padded style={{ paddingTop: "3em" }}>
    <Grid.Row>
      <Search />
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width="6">
        <PokemonList />
      </Grid.Column>
      <Grid.Column width="5">
        <PokemonCard />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default IndexTemplate;
