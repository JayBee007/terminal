<template>
  <div id="app">
    <h3>Got Jokes?</h3>
    <button class="btn btn-success" @click="initJokes">Add 10 Random Jokes</button> |
    <button class="btn btn-info" @click="addJoke">Add A Random Jokes</button>
    <div>
      <span v-for="(type,index) in types" :key=index>
        <input  type="checkbox"
                :value="type"
                v-model="checkedTypes"
                checked />
        <label>{{type}}</label>&nbsp;
      </span>
    </div>
    <div class="container">
        <div class="row">
          <Joke
             v-for="(joke,index) in $store.state.jokes"
             v-if="checkedTypes.includes(joke.type)"
             :joke="joke"
             :key="index"
             :index="index"
          />
        </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Joke from './components/Joke';

export default {
  components: {
    Joke,
  },
  data() {
    return {
      types: ['general', 'knock-knock', 'programming'],
      checkedTypes: ['general', 'knock-knock', 'programming'],
    }
  },
  methods: mapActions([
    'initJokes',
    'addJoke'
  ])
}
</script>

