Vue.component('log-in', {
  props:['logInState'],
  template: `
    <div class="logIn" v-show="logInState" >
      <h2>登录</h2>
      <form @submit.prevent="onSubmitLogIn">
        <div class="row">
          <label>账号 <input type="text" v-model="logInInfo.username"></label>
        </div>
        <div class="row">
          <label>密码 <input type="text" v-model="logInInfo.password"></label>
        </div>
        <button type="submit">登录</button>
        <button type="button" @click="openRegester">注册</button>
        <button type="button" @click="logStateChange">关闭</button>
      </form>
    </div>
  `,
  data() {
    return {
      logInInfo: {
        username: '',
        password: ''
      },
    }
  },
  methods: {
    onSubmitLogIn() {
      this.$emit('login', this.logInInfo)
    },
    logStateChange() {
      this.logInState = !this.logInState
      this.$emit('login-change', this.logInState)
    },
    openRegester(){
      this.logStateChange()
      this.$emit('open-register', this.logInState)
    }
  }
})


