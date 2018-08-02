{
  let app = new Vue({
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
        email: 'xxxxxx@qq.com',
        skills: [{name: '技能名称', description: '技能描述'}, {name: '技能名称', description: '技能描述'}, {
          name: '技能名称',
          description: '技能描述'
        }, {name: '技能名称', description: '技能描述'}],
        projects: [{name: '项目名称', url: 'http://xxxxxx.com', skills: 'CSS3 H5 ES6', description: '项目描述'}, {
          name: '项目名称',
          url: 'http://xxxxxx.com',
          skills: 'CSS3 H5 ES6',
          description: '项目描述'
        }],
      },
      previewResume: {
        name: '姓名',
        gender: '男',
        birthday: '1990年1月',
        jobTittle: '前端工程师',
        phone: '13552211231',
        email: 'xxxxxx@qq.com',
        skills: [{name: '技能名称', description: '技能描述'}, {name: '技能名称', description: '技能描述'}, {
          name: '技能名称',
          description: '技能描述'
        }, {name: '技能名称', description: '技能描述'}],
        projects: [{name: '项目名称', url: 'http://xxxxxx.com', skills: 'CSS3 H5 ES6', description: '项目描述'}, {
          name: '项目名称',
          url: 'http://xxxxxx.com',
          skills: 'CSS3 H5 ES6',
          description: '项目描述'
        }],
      },
      currentUser: null,
      shareWindowVisible: false,
      shareUrl: undefined,
      mode: 'edit',  //'preview',
      skinVisible: false,
      skin: 'default',
    },
    methods: {
      onEdit(key, value) {
        let reg = /\[(\d+)\]/g
        //如果参数是带[]的
        if (reg.test(key)) {
          //提取参数name中的index
          key = key.replace(reg, (match, number) => `.${number}`)
          let keys = key.split('.')
          let result = this.resume
          for (let i = 0; i < keys.length; i++) {
            if (i === keys.length - 1) {
              result[keys[i]] = value
            } else {
              result = result[keys[i]]
            }
          }
        } else {
          this.resume[key] = value
        }
      },
      onClickSave() {
        if (this.currentUser) {
          let user = AV.Object.createWithoutData('User', this.currentUser.id)
          // 修改属性
          user.set('resume', JSON.stringify(this.resume))
          // 保存到云端
          user.save()
          alert('简历保存成功')
          // window.location.reload()
        }
        else {
          alert('请先登录')
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
          this.currentUser = AV.User.current()
          this.getResume(this.currentUser.id)
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
      },
      onLogOut() {
        AV.User.logOut()
        this.currentUser = null
        alert('登出成功')
        window.location.reload()
      },
      initState() {
        //判断是预览模式还是编辑模式
        let url = window.location.href
        let reg = /\?_id=(.+)/
        if (reg.test(url)) {
          this.mode = 'preview'
          this.getResume(reg.exec(url)[1])
        } else {
          this.mode = 'edit'
          this.currentUser = AV.User.current()
          this.currentUser && this.getResume(this.currentUser.id)
        }
      },
      getResume(id) {
        if (id) {
          var query = new AV.Query('User')
          query.get(id).then((user) => {
            Object.assign(this.resume, JSON.parse(user.attributes.resume))
          }, function (error) {
            console.log(error)
          })
        }
      },
      addSkills() {
        this.resume.skills.push({name: '名称', description: '描述'})
      },
      delSkills(index) {
        this.resume.skills.splice(index, 1)
      },
      addProjects() {
        this.resume.projects.push({name: '项目名称', url: 'http://xxxxxx.com', skills: 'CSS3 H5 ES6', description: '项目描述'})
      },
      delProjects(index) {
        this.resume.projects.splice(index, 1)
      },
      share() {
        if (!this.currentUser) {
          alert('请先登陆！')
          return
        }
        this.shareWindowVisible = true
        this.shareUrl = window.location.host + window.location.pathname + '?_id=' + this.currentUser.id
      },
      onExitPreview() {
        let newUrl = window.location.href.replace(/\?_id=.+/, '')
        window.location.href = newUrl
      },
      print() {
        window.print()
      },
      changeSkin(name) {
        this.skin = name
      },
    }
  })

  //初始化一下
  app.initState()
}
