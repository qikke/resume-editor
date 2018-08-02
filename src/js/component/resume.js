Vue.component('resume', {
  props: ['resume','mode'],
  template: `
    <main>
      <div class="introduction">
        <editable-span :value="resume.name" :mode="mode" @edit="onEdit('name',$event)"></editable-span>
        <p>
          <editable-span :value="resume.birthday" :mode="mode" @edit="onEdit('birthday',$event)"></editable-span>
          |
          <editable-span :value="resume.jobTittle" :mode="mode" @edit="onEdit('jobTittle',$event)"></editable-span>
          |
          <editable-span :value="resume.gender" :mode="mode" @edit="onEdit('gender',$event)"></editable-span>
          |
          <editable-span :value="resume.email" :mode="mode" @edit="onEdit('email',$event)"></editable-span>
          |
          <editable-span :value="resume.phone" :mode="mode" @edit="onEdit('phone',$event)"></editable-span>
        </p>
      </div>
      <div class="skills">
        <h2>技能</h2>
        <ol>
          <li v-for="(skill,index) in resume.skills">
            <div>
              <editable-span :value="skill.name" :mode="mode"
                             @edit="onEdit('skills['+index+'].name',$event)"></editable-span>
            </div>
            <div>
              <editable-span :value="skill.description" :mode="mode"
                             @edit="onEdit('skills['+index+'].description',$event)"></editable-span>
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
              <editable-span :value="project.name" :mode="mode"
                             @edit="onEdit('projects['+index+'].name',$event)"></editable-span>
            </h3>
            <p>
              <editable-span :value="project.url" :mode="mode"
                             @edit="onEdit('projects['+index+'].url',$event)"></editable-span>
            </p>
            <p class="intro">
              <editable-span :value="project.skills" :mode="mode"
                             @edit="onEdit('projects['+index+'].skills',$event)"></editable-span>
            </p>
            <p class="description">
              <editable-span :value="project.description" :mode="mode"
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
          } else {
            result = result[keys[i]]
          }
        }
      } else {
        this.resume[key] = value
      }
      this.$emit('updateResume',this.resume)
    },
    addSkills() {
      this.resume.skills.push({name: '名称', description: '描述'})
      this.$emit('updateResume',this.resume)
    },
    delSkills(index) {
      this.resume.skills.splice(index, 1)
      this.$emit('updateResume',this.resume)
    },
    addProjects() {
      this.resume.projects.push({name: '项目名称', url: 'http://xxxxxx.com', skills: 'CSS3 H5 ES6', description: '项目描述'})
      this.$emit('updateResume',this.resume)
    },
    delProjects(index) {
      this.resume.projects.splice(index, 1)
      this.$emit('updateResume',this.resume)
    },
  }
})