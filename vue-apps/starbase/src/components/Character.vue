<template>
  <div class="col" @click="switchCharacter">

    <div class="character-card">
      <div class="card-block">
        <h4 class="card-title">{{character.name}}</h4>
        <p class="card-text">Height: {{character.height}}cm</p>
        <p class="card-text">Mass: {{character.mass}}kg</p>
        <p class="card-text">Hair Color: {{character.hair_color}}</p>
        <p class="card-text">Eye Color: {{character.eye_color}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
  export default {
    props: ['id'],
    data() {
      return {
        character: {}
      }
    },
    methods: {
      fetchCharacter(id) {
        axios.get(`https://swapi.co/api/people/${id}`)
          .then(res => this.character = res.data)
      },
      switchCharacter() {
        const randomId = Math.floor(Math.random() * 83 + 1);
        this.fetchCharacter(randomId);
      }
    },
    created() {
      this.fetchCharacter(this.id);
    }
  }
</script>
