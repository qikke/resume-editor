{
  window.Register = {
    template: ` 
  <div class="registerWrapper">
      <div class="logIn">
        <h2 class="title">Register your account</h2>
         <form @submit.prevent="onSubmitRegister">
        <div class="logInRow">
           <div class="row">
            <span class="account">Account </span>
            <input type="text" v-model="registerInfo.username">
          </div> 
          <div class="row">
            <span class="password">Password</span>
            <input type="text" v-model="registerInfo.password">
          </div> 
          <div class="row">
            <button type="submit" class="submit">Confirm</button>
          </div>
         </div>
         <div class="signUpRow">
             <span @click="$router.replace('/')" class="signUp">Close</span>
         </div>
        </form>
      </div>
    </div>
 
 
 
 <!---->
    <!--<div class="register">-->
      <!--<h2>注册</h2>-->
      <!--<form @submit.prevent="onSubmitRegister">-->
        <!--<div class="row">-->
          <!--<label>用户名 <input type="text" v-model="registerInfo.username"></label>-->
        <!--</div>-->
        <!--<div class="row">-->
          <!--<label>密码 <input type="text" v-model="registerInfo.password"></label>-->
        <!--</div>-->
        <!--<div class="row">-->
          <!--<label>邮箱 <input type="text" v-model="registerInfo.email"></label>-->
        <!--</div>-->
        <!--<button type="submit">确认注册</button>-->
        <!--<button type="button" @click="$router.replace('/')">关闭</button>-->
      <!--</form>-->
    <!--</div>-->
  `,
    data() {
      return {
        registerInfo: {
          username: '',
          password: '',
          email: ''
        },
      }
    },
    methods: {
      onSubmitRegister() {
        // 新建 AVUser 对象实例
        let user = new AV.User()
        // 设置用户名
        user.setUsername(this.registerInfo.username)
        // 设置密码
        user.setPassword(this.registerInfo.password)
        // 设置邮箱
        user.setEmail(this.registerInfo.email)
        user.signUp().then((loggedInUser) => {
          alert('注册成功')
          this.$router.replace('/')
        }, function (error) {
          if (error.code === 202) {
            alert('用户名已存在，请重新填写')
          } else if (error.code === 125) {
            alert('邮箱格式不正确')
          }
        })
      },
    }
  }

  Vue.component('register', window.Register)
}