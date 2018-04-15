import Vue from 'vue';

import App from './App';
import store from './store';
import './styles.css';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
