{
  Vue.component('app-aside', {
    template: `
      <div class="sidebar" v-if="mode === 'edit'">
        <div class="top">
          <!--<button @click="onClickSave">保存</button>-->
          <!--<button @click="share">分享</button>-->
          <!--<button @click="window.print()">打印</button>-->
          <!--<button @click="$router.replace('/skin')">换肤</button>-->
          
          
          <svg class="icon shake-little" aria-hidden="true" @click="onClickSave">
            <use xlink:href="#icon-baocun"></use>
          </svg> 
          <svg class="icon shake-little" aria-hidden="true" @click="share">
            <use xlink:href="#icon-fenxiang"></use>
          </svg>   
          <svg class="icon shake-little" aria-hidden="true" @click="window.print()">
            <use xlink:href="#icon-dayin"></use>
          </svg>
          <svg class="icon shake-little" aria-hidden="true">
            <use xlink:href="#icon-pifu"></use>
          </svg>   
          
          <svg class="icon login shake-little" aria-hidden="true" @click="onLogIn">
            <use xlink:href="#icon-login"></use>
          </svg>   
          
          <svg class="icon exit shake-little" aria-hidden="true" @click="onLogOut">
            <use xlink:href="#icon-tuichudenglu"></use>
          </svg> 
        </div>
      </div>
  `,
    methods: {
      onClickSave() {
        if (this.currentUser) {
          let user = AV.Object.createWithoutData('User', this.currentUser.id)
          // 修改属性
          user.set('resume', JSON.stringify(this.resume))
          // 保存到云端
          user.save()
          alert('简历保存成功')
        }
        else {
          alert('请先登录')
          this.$router.push('/login')
        }
      },
      onLogOut() {
        if(!this.currentUser){
          alert("您没有登录")
          return
        }
        AV.User.logOut()
        this.currentUser = null
        alert('登出成功')
        window.location.reload()
      },
      share() {
        if (!this.currentUser) {
          alert('请先登陆！')
          return
        }
        this.$router.replace('/share')
        this.$store.commit('createShareUrl', window.location.host + window.location.pathname + '?_id=' + this.currentUser.id)
      },
      onLogIn(){
        if(this.currentUser){
          alert("您已经登录了")
          return
        }
        this.$router.replace('/logIn')
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
      shareUrl() {
        return this.$store.state.shareUrl
      }
    },
  })
}