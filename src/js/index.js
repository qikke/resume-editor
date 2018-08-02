{
  let app = new Vue({
    el: '#app',
    data: {
      isEdited: false,
      logInVisible: false,
      registerVisible: false,
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
      currentUser: null,
      shareWindowVisible: false,
      shareUrl: undefined,
      mode: 'edit',  //'preview',
      skinVisible: false,
      skin: 'default',
    },
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
          this.logInVisible = true
        }
      },
      onLogIn(user) {
        AV.User.logIn(user.username, user.password).then((loggedInUser) => {
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
      share() {
        if (!this.currentUser) {
          alert('请先登陆！')
          return
        }
        this.shareWindowVisible = true
        this.shareUrl = window.location.host + window.location.pathname + '?_id=' + this.currentUser.id
      },
      onExitPreview() {
        window.location.href = window.location.href.replace(/\?_id=.+/, '')
      },
      changeSkin(name) {
        this.skin = name
      },
    }
  })

  //初始化一下
  app.initState()
}
