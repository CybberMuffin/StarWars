<template>
  <div class="container">
    <h2></h2>
    <div class="card-deck d-flex justify-content-around flex-wrap">
      <div v-for="(item, index) in getRightOrderFilms" :key="index">
        <router-link class="card card_one" :to="'films/' + getCorrectId(item.url)" tag="div">
          <img
            class="card-img-top picture mask flex-center"
            :src="require('@/assets/' + getCorrectId(item.url) + '.jpg')"
            alt="Card image cap"
          >
          <div class="card-body">
            <h4 class="card-title">{{ item.title }}</h4>
            <p class="card-text">Release date: {{ item.release_date }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["films"]),
    ...mapGetters(["getCorrectId", "getRightOrderFilms"]),

    getCorrectId: state => url => url.substring(27, url.length - 1)
  },

  methods: {
    ...mapMutations(["setFilms"]),

    correctId(url) {
      let some = url.substring(url.length - 2, url.length - 1);
      return some;
    }
  },

  async created() {
    if (this.films.length !== 0) return;
    this.$store.dispatch("getFilms");
  }
};
</script>

<style lang="scss" scoped>
.films {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
}
.card {
  width: 300px;
  margin: 30px;
  color: black;
  cursor: pointer;
}
.card:hover {
}
.picture {
  width: 100%;
  height: 350px;
}
.card_one {
  transition: transform 0.5s;
  &:hover,
  &:focus {
    transform: scale3d(1.05, 1.05, 1);

    &::after {
      opacity: 1;
    }
  }
}
</style>