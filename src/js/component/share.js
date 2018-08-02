Vue.component('share', {
  props: ['shareVisible', 'shareUrl'],
  template: `
    <div class="share" v-show="shareVisible" v-cloak>
      <h2>分享链接</h2>
      <textarea cols="60" rows="10" readonly>{{shareUrl}}</textarea>
      <button @click="stateChange">关闭</button>
    </div>
  `,
  methods:{
    stateChange(){
      this.shareVisible = !this.shareVisible
      this.$emit('change',this.shareVisible)
    }
  }
})