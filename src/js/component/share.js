{
  window.Share = {
    template: `
    <div class="share"  v-cloak>
      <h2>分享链接</h2>
      <textarea cols="60" rows="10" readonly>{{shareUrl}}</textarea>
      <button @click="$router.replace('/')">关闭</button>
    </div>
  `,
    computed: {
      shareUrl(){
        return this.$store.state.shareUrl
      }
    },
    mounted(){
      console.log(this.shareUrl)
    }
  }
  Vue.component('share', window.Share)
}