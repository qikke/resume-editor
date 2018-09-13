{
  Vue.component('editable-span', {
    props: ['value'],
    template: ` 
      <span class="editableSpan " @click="triggerEditable">
        <span v-show="!isEditable">{{value}}</span>
        <textarea v-show="isEditable"  :value="value" @input="inputChange" :rows="textRow" :cols="textCol" :xxx="value.length"></textarea>
        <!--<button  v-if="mode === 'edit'" class="edit">-->
          <!--<span>{{tip}}</span>-->
        <!--</button>-->
      </span>`,
    data: function () {
      return {
        isEditable: false,
        tip: 'edit',
      }
    },
    methods: {
      inputChange(e) {
        this.$emit('edit', e.currentTarget.value)
      },
      triggerEditable() {
        this.isEditable = true
        this.$nextTick(()=>{
          document.onclick = (e)=>{
            if(!this.$el.contains(e.target)){
              this.isEditable = false
            }
          }
        })

        // if (this.isEditable) {
        //   this.tip = 'confirm'
        // } else {
        //   this.tip = 'edit'
        // }
      }
    },
    computed: {
      mode() {
        return this.$store.state.mode
      },
      textRow(){
        return (this.value.length / 60 >> 0) + 1
      },
      textCol(){
        return (this.value.length > 60) ? 60 : this.value.trim().length
      }
    },
  })
}