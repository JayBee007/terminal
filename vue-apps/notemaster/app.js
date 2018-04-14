const app = new Vue({
  el: '#app',
  data: {
    title: 'Note Master',
    note: {
      title: '',
      text: '',
    },
    notes: [
      {
        title: 'Hello Vue',
        text: 'Have fun with vue',
        date: new Date(Date.now()).toLocaleString(),
      }
    ]
  },
  methods: {
    addNote() {
      let { text, title } = this.note;
      this.notes.push({text, title, date: new Date(Date.now()).toLocaleString()})
    },
    removeNote(index) {
      this.notes.splice(index,1);
    }
  }
})
