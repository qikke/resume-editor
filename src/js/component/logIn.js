{
  window.Login = {
    template: `
    <div class="logInWrapper">
      <div class="logIn">
        <h2 class="title">Log in your account</h2>
        <form @submit.prevent="onLogIn">
        <div class="logInRow">
           <div class="row">
            <span class="account">Account </span>
            <input type="text" v-model="logInInfo.username">
          </div> 
          <div class="row">
            <span class="password">Password</span>
            <input type="text" v-model="logInInfo.password">
          </div> 
          <div class="row">
            <button type="submit" class="submit">log in</button>
          </div>
         </div>
         <div class="signUpRow">
            <router-link to="/register" class="signUp">sign up</router-link>
         </div>
        </form>
      </div>
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
      onLogIn() {
        AV.User.logIn(this.logInInfo.username, this.logInInfo.password).then((loggedInUser) => {
          // this.currentUser = AV.User.current()
          this.$store.commit('updateCurrentUser',AV.User.current())
          this.getResume(this.currentUser.id)
          alert('登录成功')
          this.$router.replace('/')
        }, function (error) {
          if (error.code === 211) {
            alert("用户名不存在")
          } else if (error.code === 210) {
            alert("用户名密码不匹配")
          }
        })
      },
      getResume(id) {
        if (id) {
          var query = new AV.Query('User')
          query.get(id).then((user) => {
            let resume = this.resume
            Object.assign(resume, JSON.parse(user.attributes.resume))
            this.$store.commit('downloadResume',resume)
          }, function (error) {
            console.log(error)
          })
        }
      },
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

  Vue.component('log-in', window.Login)
}


