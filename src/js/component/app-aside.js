Vue.component('app-aside',{
  props:['mode'],
  template:`
    <div class="sidebar" v-if="mode === 'edit'">
      <div class="top">
        <button @click="$emit('onclicksave')">保存</button>
        <button @click="$emit('share')">分享</button>
        <button @click="window.print()">打印</button>
        <button @click="$emit('skinchange')">换肤</button>
      </div>
      <div class="bottom">
        <button @click="$emit('onlogout')">登出</button>
      </div>
    </div>
  `,
})