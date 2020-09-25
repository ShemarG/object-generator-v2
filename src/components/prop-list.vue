<template>
  <div class="prop-list-container">
    <PropItem @delete="(e) => {close(e)}" v-for="n in propCount" :key="n"></PropItem>
  </div>
</template>

<script>
import PropItem from 'components/prop-item.vue'
import EventBus from 'components/event-bus.js'

export default {
  name: 'PropList',
  data () {
    return {

    }
  },
  mounted () {
    EventBus.$on('read-list', () => { this.readData() })
  },
  methods: {
    readData () {
      let payload = {}
      this.$children.forEach((child) => {
        payload[child.propName] = child.valueData[child.valueTypeSelected]
      })
      EventBus.$emit('list-read', payload)
    },

    close (component) {
      component.$destroy();
      this.$el.removeChild(component.$el);
    }
  },
  components: {
    PropItem
  },
  props: ['propCount']
}

</script>

<style scoped>


</style>
