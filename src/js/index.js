let vm = new Vue({
  el: '#app',
  data: {
    isEdited: false,
    registerVisible: false,
    logInVisible: false,
    registerInfo: {
      username: '',
      password: '',
      email: ''
    },
    logInInfo: {
      username: '',
      password: ''
    },
    resume: {
      name: '姓名',
      gender: '男',
      birthday: '1990年1月',
      jobTittle: '前端工程师',
      phone: '13552211231',
      email: 'xxxxxx@qq.com'
    }
  },
  methods: {
    onEdit(name, value) {
      this.resume[name] = value
    },
    onClickSave() {
      let currentUser = AV.User.current()
      if (currentUser) {
        var user = AV.Object.createWithoutData('User', currentUser.id)
        // 修改属性
        user.set('resume', JSON.stringify(this.resume))
        // 保存到云端
        user.save()
        alert('简历保存成功')
      }
      else {
        this.logInVisible = true
      }
    },
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
        alert('注册成功，请登录')
        AV.User.logOut()
        this.triggerState()
      }, function (error) {
        if (error.code === 202) {
          alert('用户名已存在，请重新填写')
        } else if (error.code === 125) {
          alert('邮箱格式不正确')
        }
      })
    },
    onSubmitLogIn() {
      AV.User.logIn(this.logInInfo.username, this.logInInfo.password).then((loggedInUser) => {
        alert('登录成功')
        this.logInVisible = false
      }, function (error) {
        if (error.code === 211) {
          alert("用户名不存在")
        } else if (error.code === 210) {
          alert("用户名密码不匹配")
        }
      })
    },
    triggerState() {
      this.registerVisible = !this.registerVisible
      this.logInVisible = !this.logInVisible
    }
  }
})