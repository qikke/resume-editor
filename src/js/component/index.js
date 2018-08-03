{
  window.Index = {
    template: `
    <div class="index">
      <!--边栏-->
      <app-aside></app-aside>
      
      <!--简历-->
      <resume></resume>
      
      <!--退出预览按钮-->
      <button v-if="mode === 'preview'" class="exitPreview" @click="onExitPreview">退出预览</button>
    </div>
  `,
    methods: {
      onExitPreview() {
        window.location.href = window.location.href.replace(/\?_id=.+/, '')
      }
    },
    computed: {
      resume() {
        return this.$store.state.resume
      },
      mode() {
        return this.$store.state.mode
      },
      currentUser() {
        return this.$store.state.currentUser
      },
    },
  }
  Vue.component('index', window.Index)
}