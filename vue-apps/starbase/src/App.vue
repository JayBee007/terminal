<template>
  <div id="app">
    <h3>Starbase</h3>
    <h4>
      <router-link class="link" to='/data/people'>Meet the Characters</router-link> |
      <router-link class="link" to='/data/planets'>Explore the Planets</router-link>
    </h4>


    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios';

  // import Character from './components/Character';
  // import Data from './components/Data';

  export default {
    name: 'app',
    components: {
      // Character,
      // Data
    },
    data() {
      return {
        title: 'Genreate Your Team',
        initial_ids: [1, 13, 14]
      }
    },
    methods: {

    }
  }
</script>
