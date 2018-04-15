<template>
  <div id="app">
    <h3>{{title}}</h3>

    <div class="container">
      <div class="row">
          <Character
            v-for='id in initial_ids'
            :id="id"
            :key="id"
          />
    </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';

  import Character from './components/Character';
  export default {
    name: 'app',
    components: {
      Character
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
