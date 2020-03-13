import fetch from "isomorphic-unfetch";
import _ from "lodash";
import { Pokemon } from "../typings/pokemon";
import { baseUrl } from "../configurations/domains";

class PokemonService {
  constructor() {
    this.baseUrl = baseUrl;
  }
  async listPokemons(): Promise<{ name: string; url: string }[]> {
    try {
      let url = this.baseUrl + "/pokemon?offset=0&limit=960";
      let r = await fetch(url);
      let ro = await r.json();
      return ro.results.map(r => {
        let l = r.url.split("/");
        let idx = l.length - 2;
        let id = l[idx];
        return { name: cap(r.name), id };
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getPokemon(id: string): Promise<Pokemon> {
    try {
      let url = this.baseUrl + `/pokemon/${id}`;
      let r = await fetch(url);
      const p = await r.json();
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
      console.log(error);
    }
  }
}

export default PokemonService;

function cap(str: string): string {
  return _.startCase(_.toLower(str));
}
