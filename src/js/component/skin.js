{
  window.Skin = {
    template: `
    <div class="skinWindow">
      <button @click="changeSkin('default')">默认</button>
      <button @click="changeSkin('black')">黑色</button>
      <button @click="$router.replace('/')">关闭</button>
    </div>
  `,
    methods: {
      changeSkin(name){
        this.$store.commit('changeSkin',name)
        this.$router.replace('/')
      }
    },
    computed: {
      skin() {
        return this.$store.state.skin
      },
    },
  }
  Vue.component('skin', window.Skin)
}