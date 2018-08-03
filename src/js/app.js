{
  const routes = [
    {path: '/', component: window.Index},
    {path: '/register', component: window.Register},
    {path: '/login', component: window.Login},
    {path: '/share', component: window.Share},
    {path: '/skin', component: window.Skin},
  ]
  const router = new VueRouter({
    routes
  })

  const store = new Vuex.Store({
    state: {
      mode: 'edit',
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
      skin: 'default',
      shareUrl:''
    },
    mutations: {
      updateMode(state, value) {
        state.mode = value
      },
      updateResume(state, data) {
        state.resume[data.key] = data.value
      },
      updateCurrentUser(state, value) {
        state.currentUser = value
      },
      updateSkin(state, value) {
        state.skin = value
      },
      downloadResume(state,value){
        state.resume = value
      },
      createShareUrl(state,value){
        state.shareUrl = value
      },
      changeSkin(state,value){
        state.skin = value
      },
    },
  })

  let app = new Vue({
    el: '#app',
    router,
    store,
    data: {
      isEdited: false,
      shareUrl: undefined,
    },
    methods: {
      initState() {
        //判断是预览模式还是编辑模式
        let url = window.location.href
        let reg = /\?_id=(.+)/
        if (reg.test(url)) {
          this.$store.commit('updateMode', 'preview')
          this.getResume(reg.exec(url)[1])
        } else {
          this.$store.commit('updateMode', 'edit')
          this.$store.commit('updateCurrentUser',AV.User.current())
          this.currentUser && this.getResume(this.currentUser.id)
        }
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
      skin() {
        return store.state.skin
      },
      resume() {
        return this.$store.state.resume
      },
      mode() {
        return this.$store.state.mode
      },
      currentUser() {
        return this.$store.state.currentUser
      },
    }
  }).$mount('#app')

  //初始化一下
  app.initState()
}
