{
  window.Share = {
    template: `
    <div class="shareWrapper" v-cloak>
       <div class="share">
        <h2 class="title">分享链接</h2>
        <textarea cols="60" rows="5" readonly ref="url">{{shareUrl}}</textarea>
        <div class="buttonWrapper">
          <span class="copy" @click="copyContent()" :style="copyStyle">{{copyTip}}</span>
          <span @click="$router.replace('/')" class="close">关闭</span>
        </div>
       
      </div>
    </div>
   
  `,
    data(){
      return {
        copyTip:'复制',
        copyStyle:''
      }
    },
    computed: {
      shareUrl(){
        return this.$store.state.shareUrl
      }
    },
    methods:{
      copyContent(){
        // let url = this.$refs.url.$el
        // url.select()
        this.$refs.url.select()
        document.execCommand('copy', false)
        this.copyTip = "复制成功"
        this.copyStyle = 'color:green'
      }
    }
  }
  Vue.component('share', window.Share)
}