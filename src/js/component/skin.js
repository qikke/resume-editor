Vue.component('skin',{
  props:['skinVisible'],
  template:`
    <div v-show="skinVisible" class="skinWindow">
      <button @click="changeSkin('default')">默认</button>
      <button @click="changeSkin('black')">黑色</button>
      <button @click="changeState">关闭</button>
    </div>
  `,
  methods:{
    changeSkin(name){
      this.$emit('change-skin',name)
    },
    changeState(){
      this.skinVisible = !this.skinVisible
      this.$emit('change-state',this.skinVisible)
    }
  }
})