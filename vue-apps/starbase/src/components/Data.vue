<template>
  <div class="container">
    <div class="row">
      <Item
        v-for="(item,index) in items"
        :key="index"
        :passed-item="item"
        :type="type"
      />
    </div>
  </div>

</template>

<script>
  import axios from 'axios';

  import Item from './Item';
  export default {
    components: {
      Item
    },
    data() {
      return {
        items: [],
        type: this.$route.params.type
      }
    },
    watch: {
      $route: 'fetchItems'
    },
    methods: {
      fetchItems() {
        this.items = [];
        this.type = this.$route.params.type;
        let initial_ids = [1,13, 14];

        for( let i in initial_ids) {
          let id = initial_ids[i];
          axios.get(`https://swapi.co/api/${this.type}/${id}`)
            .then(res => this.items.push(res.data))
        }
      }
    },
    created() {
      this.fetchItems();
    }
  }
</script>

