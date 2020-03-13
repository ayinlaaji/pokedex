import { useReducer, useEffect, useState, Reducer } from "react";
import PokemonService from "@pokedex/services/pokemon";
import { Pokemon, Poke } from "@pokedex/typings/pokemon";

enum ActionType {
  UPDATE_STATE = 0
}

type State = {
  pokemons: Poke[];
  chunk: Poke[];
  totalPages: number;
  pageLimit: number;
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

const defaultState: State = {
  pokemons: [],
  chunk: [],
  totalPages: 0,
  pageLimit: 10
};

const defaultPokemon: Pokemon = {
  baseExperience: 0,
  height: 0,
  weight: 0,
  name: "",
  abilities: [],
  types: [],
  id: "",
  imgUrl: ""
};

type IUsePokemons = () => {
  totalPages: number;
  chunk: Poke[];
  pokemons: Poke[];
  getPokemon: (id: string) => void;
  morePokemons: (cursor: number) => void;
  currentPokemon: Pokemon;
};
const usePokemon: IUsePokemons = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>(defaultPokemon);

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
  return {
    chunk: state.chunk,
    pokemons: state.pokemons,
    totalPages: state.totalPages,
    currentPokemon,
    getPokemon: async (id: string) => {
      let pokemon = await pks.getPokemon(id);
      setCurrentPokemon(pokemon);
    },
    morePokemons: (cursor: number) => {
      let offset = state.pageLimit * (cursor - 1);
      let limit = state.pageLimit + offset;
      let chunk = state.pokemons.slice(offset, limit);
      dispatch({
        type: ActionType.UPDATE_STATE,
        payload: {
          chunk
        }
      });
    }
  };
};

export default usePokemon;
