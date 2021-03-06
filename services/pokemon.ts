import fetch from "isomorphic-unfetch";
import _ from "lodash";
import { Pokemon, Poke } from "@pokedex/typings/pokemon";
import { baseUrl } from "@pokedex/configurations/domains";

class PokemonService {
  baseUrl = baseUrl;
  async listPokemons(): Promise<Poke[]> {
    try {
      let url = this.baseUrl + "/pokemon?offset=0&limit=960";
      let r = await fetch(url);
      let ro: { results: { name: string; url: string }[] } = await r.json();
      let y: Poke[] = ro.results.map(r => {
        let l = r.url.split("/");
        let idx = l.length - 2;
        let id = l[idx];
        return { name: cap(r.name), id };
      });
      return y;
    } catch (error) {
      return [];
    }
  }
  async getPokemon(id: string): Promise<Pokemon> {
    try {
      let url = this.baseUrl + `/pokemon/${id}`;
      let r = await fetch(url);
      const p: Omit<Pokemon, "types" | "abilities"> & {
        base_experience: number;
        sprites: { front_default: string };
        types: { type: { name: string } }[];
        abilities: { ability: { name: string } }[];
      } = await r.json();
      const {
        height,
        weight,
        name,
        types,
        id: pokemonId,
        base_experience: baseExperience,
        sprites: { front_default: imgUrl },
        abilities
      } = p;
      const pokemon = {
        height,
        weight,
        name: cap(name),
        id: pokemonId,
        baseExperience,
        imgUrl: imgUrl || "",
        types: types.map(i => cap(i.type.name)),
        abilities: abilities.map(i => cap(i.ability.name))
      };
      return pokemon;
    } catch (error) {
      return {
        baseExperience: 0,
        height: 0,
        weight: 0,
        name: "",
        abilities: [],
        types: [],
        id: "",
        imgUrl: ""
      };
    }
  }
}

export default PokemonService;

function cap(str: string): string {
  return _.startCase(_.toLower(str));
}
