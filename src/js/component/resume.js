{
  Vue.component('resume', {
    template: `
    <main>
      <div class="introduction">
        <editable-span :value="resume.name" @edit="onEdit('name',$event)"></editable-span>
        <p>
          <editable-span :value="resume.birthday" @edit="onEdit('birthday',$event)"></editable-span>
          |
          <editable-span :value="resume.jobTittle" @edit="onEdit('jobTittle',$event)"></editable-span>
          |
          <editable-span  :value="resume.gender" @edit="onEdit('gender',$event)"></editable-span>
          |
          <editable-span :value="resume.email" @edit="onEdit('email',$event)"></editable-span>
          |
          <editable-span :value="resume.phone" @edit="onEdit('phone',$event)"></editable-span>
        </p>
      </div>
      <div class="skills">
        <h2>技能</h2>
        <ol>
          <li v-for="(skill,index) in resume.skills">
            <div>
              <editable-span  :value="resume.skills[index].name" @edit="onEdit('skills['+index+'].name',$event)"></editable-span>
            </div>
            <div>
              <editable-span     :value="resume.skills[index].description" @edit="onEdit('skills['+index+'].description',$event)"></editable-span>
            </div>
            <span class="del" @click="delSkills(index)" v-if="mode === 'edit'">x</span>
          </li>
          <li @click="addSkills" v-if="mode === 'edit'" class="add">+</li>
        </ol>
      </div>
      <div class="projects">
        <h2>项目经历</h2>
        <ol>
          <li v-for="(project,index) in resume.projects">
            <h3>
              <editable-span :value="resume.projects[index].name" 
                             @edit="onEdit('projects['+index+'].name',$event)"></editable-span>
            </h3>
            <p>
              <editable-span :value="resume.projects[index].url" 
                             @edit="onEdit('projects['+index+'].url',$event)"></editable-span>
            </p>
            <p class="intro">
              <editable-span :value="resume.projects[index].skills" 
                             @edit="onEdit('projects['+index+'].skills',$event)"></editable-span>
            </p>
            <p class="description">
              <editable-span :value="resume.projects[index].description" 
                             @edit="onEdit('projects['+index+'].description',$event)"></editable-span>
            </p>
            <span class="del" @click="delProjects(index)" v-if="mode === 'edit'">x</span>
          </li>
          <li @click="addProjects" v-if="mode === 'edit'" class="add">+</li>
        </ol>
      </div>
    </main>
  `,
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
              // this.$store.commit('updateResume',{key:keys[i],value:value})
            } else {
              result = result[keys[i]]
            }
          }
        } else {
          // this.resume[key] = value
          this.$store.commit('updateResume',{key:key,value:value})
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
      }
    }
  })
}