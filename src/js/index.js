let vm = new Vue({
  el: '#app',
  data: {
    isEdited: false,
    resume: {
      name: '姓名',
      gender: '男',
      birthday: '1990年1月',
      jobTittle: '前端工程师',
      phone: '13552211231',
      email: 'xxxxxx@qq.com'
    }
  },
  methods:{
    onEdit(name,value){
      this.resume[name] = value
    }
  }
})