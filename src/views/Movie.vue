<template>
  <div>
    <div class="row left-bar">
      <div class="col-md-6">
        <h1 class="neon-red">{{currentFilm.title}}</h1>
        <div class="neon-red">
          <h4>Director: {{currentFilm.director}}</h4>
          <h4>Producer: {{currentFilm.producer}}</h4>
          <h4>Release date: {{currentFilm.release_date}}</h4>
          <h4>Description:</h4>
        </div>
        <h6>{{currentFilm.opening_crawl}}</h6>
      </div>
    </div>
    <div class="row under left-bar">
      <div class="col-md-4">
        <h3 class="neon-blue">Main characters:</h3>
        <ul>
          <li v-for="(item, index) in currentCharacters" :key="index">
            <router-link :to="'../characters/' + charactersUrlToId(item.url)">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-3 left-bar">
        <h3 class="neon-blue">Planets:</h3>
        <ul>
          <li v-for="(item, index) in currentPlanets" :key="index">
            <router-link :to="'../planets/' + planetUrlToId(item.url)">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["films", "characters", "planets"]),
    ...mapGetters([
      "getFilm",
      "getIdFromAllCharacters",
      "getIdFromAllPlanets",
      "charactersUrlToId",
      "planetUrlToId"
    ]),

    currentFilm() {
      return this.getFilm(this.$route.params.id);
    },

    // персонажи которые присутствуют только в данном фильме
    currentCharacters() {
      return this.characters.filter(character =>
        this.currentFilm.characters.includes(character.url)
      );
    },

    // id всех персонажей данного фильма
    currentCharacterIds() {
      return this.currentFilm.characters.map(url =>
        Number(url.substring(28, url.length - 1))
      );
    },

    // id персонажей из данного фильма которых еще нет в store и нужно подгрузить
    newCharacterIds() {
      return this.currentCharacterIds.filter(
        id => !this.getIdFromAllCharacters.includes(id)
      );
    },

    // планеты которые присутствуют только в данном фильме
    currentPlanets() {
      return this.planets.filter(planet =>
        this.currentFilm.planets.includes(planet.url)
      );
    },

    // id всех планет в данном фильме
    currentPlanetIds() {
      return this.currentFilm.planets.map(url =>
        Number(url.substring(29, url.length - 1))
      );
    },

    // id планет из данного фильма которых еще нет в store и нужно подгрузить
    newPlanetIds() {
      return this.currentPlanetIds.filter(
        id => !this.getIdFromAllPlanets.includes(id)
      );
    }
  },

  methods: {
    ...mapMutations(["setFilms"])
  },

  async created() {
    if (this.films.length === 0) await this.$store.dispatch("getFilms");
    await this.$store.dispatch("getCharacters", this.newCharacterIds);
    await this.$store.dispatch("getPlanets", this.newPlanetIds);
  }
};
</script>

<style lang="scss" scoped>
* {
  max-width: 100%;
}
</style>