import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import { map } from "p-iteration";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    films: [],
    characters: [],
    planets: []
  },
  getters: {
    getRightOrderFilms: state =>
      state.films.sort(
        (a, b) =>
          a.url.substring(27, a.url.length - 1) -
          b.url.substring(27, b.url.length - 1)
      ),

    getFilm: state => id =>
      state.films.find(
        film => film.url.substring(27, film.url.length - 1) == id
      ),

    getCharacter: state => id =>
      state.characters.find(
        character => character.url.substring(28, character.url.length - 1) == id
      ),

    getPlanet: state => id =>
      state.planets.find(
        planet => planet.url.substring(29, planet.url.length - 1) == id
      ),

    getIdFromAllCharacters: state =>
      state.characters.map(character =>
        Number(character.url.substring(28, character.url.length - 1))
      ),

    getIdFromAllPlanets: state =>
      state.planets.map(planet =>
        Number(planet.url.substring(29, planet.url.length - 1))
      ),

    filmUrlToId: state => url => url.substring(27, url.length - 1),
    charactersUrlToId: state => url => url.substring(28, url.length - 1),
    planetUrlToId: state => url => url.substring(29, url.length - 1)
  },
  mutations: {
    setFilms: (state, payload) => (state.films = payload),
    setCharacters: (state, payload) =>
      (state.characters = [...state.characters, ...payload]),
    setPlanets: (state, payload) =>
      (state.planets = [...state.planets, ...payload])
  },
  actions: {
    async getFilms({ commit }) {
      const {
        data: { results }
      } = await Axios.get("https://swapi.co/api/films/");
      commit("setFilms", results);
    },

    async getCharacters({ commit }, characterIds) {
      const characters = await map(characterIds, async id => {
        const response = await fetch(`https://swapi.co/api/people/${id}/`);
        return response.json();
      });
      commit("setCharacters", characters);
    },

    async getPlanets({ commit }, planetIds) {
      const planets = await map(planetIds, async id => {
        const response = await fetch(`https://swapi.co/api/planets/${id}/`);
        return response.json();
      });
      commit("setPlanets", planets);
    }
  }
});
