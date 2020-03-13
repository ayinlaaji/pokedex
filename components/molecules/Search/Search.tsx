import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import Autocomplete from "react-autocomplete";
import * as styles from "./styles";
import { Pokemons } from "../../typings/pokemon";

type Props = {
  handleSubmit: any;
  pokemons: Pokemons[];
};
const Search = ({ handleSubmit, pokemons }: Props) => {
  const [name, setPokemon] = useState<string>("");
  const [pokemonId, setPokemonId] = useState<number>();
  return (
    <Form
      style={styles.form}
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(pokemonId);
      }}
    >
      <Form.Group>
        <Autocomplete
          shouldItemRender={(item, value) =>
            item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          getItemValue={pokemon => {
            setPokemonId(pokemon.id);
            return pokemon.name;
          }}
          items={pokemons}
          renderItem={({ id, name }, isHighlighted) => {
            return (
              <div key={id} style={styles.inputDropDown(isHighlighted)}>
                {name}
              </div>
            );
          }}
          value={name}
          onChange={e => {
            setPokemon(e.target.value);
          }}
          onSelect={name => {
            setPokemon(name);
          }}
        />
        <Form.Button content="Search" />
      </Form.Group>
    </Form>
  );
};

export default Search;
