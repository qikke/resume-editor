{
  Vue.component('editable-span', {
    props: ['value'],
    template: ` <span class="editableSpan">
        <span v-show="!isEditable">{{value}}</span>
        <input v-show="isEditable" type="text" :value="value" @input="inputChange">
        <button @click="triggerEditable" v-if="mode === 'edit'">{{tip}}</button>
      </span>`,
    data: function () {
      return {
        isEditable: false,
        tip: '编辑'
      }
    },
    methods: {
      inputChange(e) {
        this.$emit('edit', e.currentTarget.value)
      },
      triggerEditable() {
        this.isEditable = !this.isEditable
        if (this.isEditable) {
          this.tip = '确定'
        } else {
          this.tip = '编辑'
        }
      }
    },
    computed: {
      mode() {
        return this.$store.state.mode
      }
    },
  })
}