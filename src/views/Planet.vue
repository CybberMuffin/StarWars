<template>
  <div>
    <div class="row left-bar">
      <div class="col-md-6">
        <h1 class="neon-red">{{ currentPlanet.name }}</h1>
        <div class="neon-red">
          <h5>Rotation period: {{ currentPlanet.rotation_period }}</h5>
          <h5>Orbital period: {{ currentPlanet.orbital_period }}</h5>
          <h5>Diameter: {{ currentPlanet.diameter }}</h5>
          <h5>Climate: {{ currentPlanet.climate }}</h5>
          <h5>Gravity: {{ currentPlanet.gravity }}</h5>
          <h5>Terrain: {{ currentPlanet.terrain }}</h5>
          <h5>Surface water: {{ currentPlanet.surface_water }}</h5>
          <h5>Population: {{ currentPlanet.population }}</h5>
        </div>
      </div>
    </div>
    <div class="row under left-bar">
      <div class="col-md-4">
        <h3 class="neon-blue">Residents:</h3>
        <ul>
          <li v-for="(item, index) in currentResidents" :key="index">
            <router-link :to="'../characters/' + charactersUrlToId(item.url)">{{ item.name }}</router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-3 left-bar">
        <h3 class="neon-blue">Films:</h3>
        <ul>
          <li v-for="(item, index) in currentFilms" :key="index">
            <router-link :to="'../films/' + filmUrlToId(item.url)">{{ item.title }}</router-link>
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
      "getPlanet",
      "planetUrlToId",
      "filmUrlToId",
      "charactersUrlToId",
      "getIdFromAllPlanets"
    ]),

    currentPlanet() {
      return this.getPlanet(this.$route.params.id);
    },

    currentFilms() {
      return this.films.filter(film =>
        this.currentPlanet.films.includes(film.url)
      );
    },

    isResidentsExist() {
      return this.currentPlanet.residents.length !== 0;
    },

    currentResidents() {
      return this.characters.filter(character =>
        this.currentPlanet.residents.includes(character.url)
      );
    },

    currentResidentsId() {
      return this.currentResidents.map(resident =>
        Number(this.charactersUrlToId(resident.url))
      );
    },

    newResidentsId() {
      const allIds = this.characters.map(character =>
        Number(this.charactersUrlToId(character.url))
      );
      return this.currentResidentsId.filter(id => !allIds.includes(id));
    }
  },

  async created() {
    if (
      this.planets.length === 0 ||
      !this.planets.some(
        planet => this.planetUrlToId(planet.url) == this.$route.params.id
      )
    )
      await this.$store.dispatch("getPlanets", [this.$route.params.id]);

    if (this.films.length === 0) await this.$store.dispatch("getFilms");

    if (this.isResidentsExist)
      await this.$store.dispatch("getCharacters", this.newResidentsId);
  }
};
</script>

<style lang="scss" scoped>
* {
  max-width: 100%;
}
</style>