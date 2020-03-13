import React from "react";
import { Card, Image, Placeholder } from "semantic-ui-react";
import { Pokemon as Props } from "@pokedex/typings/pokemon";

const PokemonCard = ({
  baseExperience,
  height,
  weight,
  name,
  abilities,
  types,
  imgUrl = "",
  id
}: Props) => (
    <Card.Group>
      <Card>
        {!Boolean(imgUrl) ? (
          <Placeholder>
            <Placeholder.Image square />
          </Placeholder>
        ) : (
            <Image size="medium" src={imgUrl} />
          )}
        {!Boolean(id) ? (
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="very short" />
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        ) : (
            <>
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta> Height: {height} </Card.Meta>
                <Card.Meta> Weight: {weight} </Card.Meta>
                <Card.Meta> Base Experience: {baseExperience} </Card.Meta>
                <Card.Meta>
                  Abilities: {abilities.map(ability => ability + ", ")}
                </Card.Meta>
                <Card.Meta> Types: {types.map(type => type)} </Card.Meta>
              </Card.Content>
              <Card.Content extra textAlign="center"></Card.Content>
            </>
          )}
      </Card>
    </Card.Group>
  );

export default PokemonCard;
