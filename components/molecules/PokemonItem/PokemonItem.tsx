import React, { ReactEventHandler } from "react";
import { List, Button } from "semantic-ui-react";

type Props = {
  name: string;
  handleClick: ReactEventHandler;
};
const PokemonItem = ({ name, handleClick }: Props) => (
  <List.Item>
    <List.Content floated="right">
      <Button onClick={handleClick}>View</Button>
    </List.Content>
    <List.Content>{name}</List.Content>
  </List.Item>
);

export default PokemonItem;
