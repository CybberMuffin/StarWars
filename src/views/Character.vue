<template>
  <div>
    <div class="row left-bar">
      <div class="col-md-6">
        <h1 class="neon-red">{{ currentCharacter.name }}</h1>
        <div class="neon-red">
          <h5>Height: {{ currentCharacter.height }} cm</h5>
          <h5>Mass: {{ currentCharacter.mass }}</h5>
          <h5>Hair colour: {{ currentCharacter.hair_color }}</h5>
          <h5>Skin colour: {{ currentCharacter.skin_color }}</h5>
          <h5>Eye color: {{ currentCharacter.eye_color }}</h5>
          <h5>Birth year: {{ currentCharacter.birth_year }}</h5>
          <h5>Gender: {{ currentCharacter.gender }}</h5>
        </div>
        <h4 class="neon-blue">
          Homeworld:
          <router-link
            :to="'../planets/' + planetUrlToId(currentCharacter.homeworld)"
            >{{ homeworld.name }}</router-link
          >
        </h4>
        <h4 class="neon-blue">Films:</h4>
        <ul>
          <li v-for="(item, index) in currentFilms" :key="index">
            <router-link :to="'../films/' + filmUrlToId(item.url)">{{
              item.title
            }}</router-link>
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
      "getCharacter",
      "getPlanet",
      "charactersUrlToId",
      "filmUrlToId",
      "planetUrlToId",
      "getIdFromAllPlanets"
    ]),

    currentCharacter() {
      return this.getCharacter(this.$route.params.id);
    },

    currentFilms() {
      return this.films.filter(film =>
        this.currentCharacter.films.includes(film.url)
      );
    },

    isHomeworldExists() {
      return !!this.planets.find(
        planet => planet.url === this.currentCharacter.homeworld
      );
    },

    homeworld() {
      return this.getPlanet(
        this.planetUrlToId(this.currentCharacter.homeworld)
      );
    }
  },

  async created() {
    if (
      this.characters.length === 0 ||
      !this.characters.some(
        character =>
          this.charactersUrlToId(character.url) == this.$route.params.id
      )
    )
      await this.$store.dispatch("getCharacters", [this.$route.params.id]);

    if (this.films.length === 0) await this.$store.dispatch("getFilms");

    if (!this.isHomeworldExists)
      await this.$store.dispatch("getPlanets", [
        this.planetUrlToId(this.currentCharacter.homeworld)
      ]);
  }
};
</script>

<style lang="scss" scoped>
* {
  max-width: 100%;
}
</style>
