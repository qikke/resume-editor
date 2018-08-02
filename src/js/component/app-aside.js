Vue.component('app-aside',{
  props:['mode'],
  template:`
    <div class="sidebar" v-if="mode === 'edit'">
      <div class="top">
        <button @click="onClickSave">保存</button>
        <button @click="share">分享</button>
        <button @click="print">打印</button>
        <button @click="skinChange">换肤</button>
      </div>
      <div class="bottom">
        <button @click="onLogOut">登出</button>
      </div>
    </div>
  `,
  methods:{
    onClickSave(){
      this.$emit('onclicksave')
    },
    share(){
      this.$emit('share')
    },
    print() {
      window.print()
    },
    skinChange(){
      this.$emit('skinchange')
    },
    onLogOut(){
      this.$emit('onlogout')
    }
  }
})