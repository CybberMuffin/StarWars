<template>
  <div id="app">
    <div id="background"></div>
    <div id="nav">
      <router-link to="/">
        <h5>Star Wars Films</h5>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: "StarWarsFont";
  src: url("assets/Starjedi.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-family: "StarWarsFont";
  font-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dc143c;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #4169e1;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #4169e1, 0 0 30px #4169e1,
      0 0 40px #4169e1, 0 0 55px #4169e1, 0 0 75px #4169e1;
    &.router-link-exact-active {
      color: #dc143c;
      text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #e34234,
        0 0 30px #e34234, 0 0 40px #e34234, 0 0 55px #e34234, 0 0 75px #e34234;
    }
  }
}
ul {
  list-style-type: none;
}

.neon-red {
  color: #dc143c;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #e34234, 0 0 30px #e34234,
    0 0 40px #e34234, 0 0 55px #e34234, 0 0 75px #e34234;
}
.neon-blue {
  color: #4169e1;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px #4169e1, 0 0 30px #4169e1,
    0 0 40px #4169e1, 0 0 55px #4169e1, 0 0 75px #4169e1;
}
.under {
  margin-top: 35px;
}
.left-bar {
  text-align: left;
  padding-left: 50px;
}
#background {
  position: fixed;
  min-height: 100%;
  width: 100%;
  height: auto;
  z-index: -1;
  top: 0;
  left: 0;
  background: url(assets/background.jpg) no-repeat center center;
  -webkit-background-size: cover; /* Add in these */
  -moz-background-size: cover; /* four lines to */
  -o-background-size: cover; /* remove the white space*/
  background-size: cover; /* around images */
}
</style>
