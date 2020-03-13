import { useReducer, useEffect, useState } from "react";
import PokemonService from "../services/pokemon";
import { Pokemon } from "../typings/pokemon";

enum ActionType {
  UPDATE_STATE = 0
}

type State = {
  pokemons: any[]; //{ [pokemonId: string]: Pokemon };
  pokemonIds: string[];
};

type Action = {
  type: ActionType;
  payload: Partial<State>;
};

const reducer: Reducer<State, Action> = (state, { type, payload }) => {
  switch (type) {
    default:
      return state;
    case ActionType.UPDATE_STATE:
      return {
        ...state,
        ...payload
      };
  }
};

const defaultState = {
  pokemons: [],
  chunk: [],
  totalPages: 0,
  pokemonIds: [],
  pageLimit: 10
};

type IUsePokemons = {
  pokemons: any[];
  getPokemon: () => Pokemon;
};

const d = {
  baseExperience: 0,
  height: 0,
  weight: 0,
  name: "",
  abilities: [],
  types: [],
  id: "",
  imgUrl: ""
};

const usePokemon: IUsePokemons = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [currentPokemon, setCurrentPokemon] = useState(d);

  const pks = new PokemonService();

  useEffect(() => {
    listPokemons();
  }, []);

  const listPokemons = async () => {
    const results = await pks.listPokemons();
    const totalPages = results.length / state.pageLimit;
    const chunk = results.slice(0, state.pageLimit);
    dispatch({
      type: ActionType.UPDATE_STATE,
      payload: {
        pokemons: results,
        chunk,
        totalPages
      }
    });
  };
  const getPokemon = async (id: string) => {
    let pokemon = await pks.getPokemon(id);
    setCurrentPokemon(pokemon);
  };
  const morePokemons = (cursor: number) => {
    let offset = state.pageLimit * (cursor - 1);
    let limit = state.pageLimit + offset;
    let chunk = state.pokemons.slice(offset, limit);
    dispatch({
      type: ActionType.UPDATE_STATE,
      payload: {
        chunk
      }
    });
  };
  return {
    pokemons: state.chunk,
    totalPages: state.totalPages,
    getPokemon,
    morePokemons,
    currentPokemon
  };
};

export default usePokemon;
