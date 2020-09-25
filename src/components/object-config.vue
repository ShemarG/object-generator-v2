<template>
  <div class="config-component">
    <div class="mode-select">
      <b-form-group>
        <b-form-radio-group
          v-model="modeSelected"
          :options="modeOptions"
          buttons
        ></b-form-radio-group>
      </b-form-group>
      <div class="input-container">
        <div class="input-label">Key/Varible Name</div>
        <b-form-input class="key-name" v-model="keyName"></b-form-input>
      </div>
      <div class="mode-display d-flex align-items-center">
        <span>{{modeDisplay[this.modeSelected]}}</span>
        <div class="quote-select d-flex justify-content-center align-items-center">
          <span class="quote-type-label">Quote Type</span>
            <b-form-radio-group
              v-model="quoteSelected"
              :options="quoteOptions"
              buttons
            ></b-form-radio-group>
        </div>
      </div>
    </div>
    <div class="result">
      {{ renderedObj }}
    </div>
    <PropList :propCount="propertyCount"></PropList>
    <b-button @click="triggerRead()" variant="primary">Create Object</b-button>
  </div>
</template>

<script>

import PropList from 'components/prop-list.vue'
import EventBus from 'components/event-bus.js'

export default {
  name: 'ObjectConfig',
  data () {
    return {
      keyName: '',
      quoteSelected: `"`,
      quoteOptions: [`"`, `'`],
      modeSelected: 'Object Property',
      modeOptions: ['JSON Property', 'Object Property', 'const', 'let', 'var'],
      propertyCount: 3,
      outputObjects: {
        'JSON Property': '',
        'Object Property': '',
        'const': '',
        'let': '',
        'var': ''
      }
    }
  },
  mounted () {
    EventBus.$on('list-read', (payload) => {
      console.log(payload)
      let rawData = Object.keys(payload)

      // for JSON Property
      this.outputObjects['JSON Property'] = rawData.map((item, index) => {
        let current = payload[item]
        if (index != rawData.length-1) {
          if (index == 0) {
            switch (current.type) {
              case "string":
              return `"${this.keyName}": {"${item}":"${current.value}",`
              default:
              return `"${this.keyName}": {"${item}":${current.value},`
            }
          } else {
            switch (current.type) {
              case "string":
              return `"${item}":"${current.value}",`
              default:
              return `"${item}":${current.value},`
            }
          }
        } else {
          switch (current.type) {
            case "string":
            return `"${item}":"${current.value}"}`
            default:
            return `"${item}":${current.value}}`
          }
        }
      }).join(" ")
      // console.log(this.outputObjects['JSON Property'])

      let quote = this.quoteSelected

      // for Object Property
      this.outputObjects['Object Property'] = rawData.map((item, index) => {
        let current = payload[item]
        // If not the last item:
        if (index != rawData.length-1) {
          // If it's the first item:
          if (index == 0) {
            switch (current.type) {
              case "string":
              return `${quote}${this.keyName}${quote}: {${quote}${item}${quote}:${quote}${current.value}${quote},`
              default:
              return `${quote}${this.keyName}${quote}: {${quote}${item}${quote}:${current.value},`
            }
            // Everything in the middle:
          } else {
            switch (current.type) {
              case "string":
              return `${quote}${item}${quote}:${quote}${current.value}${quote},`
              default:
              return `${quote}${item}${quote}:${current.value},`
            }
          }
          // The last item:
        } else {
          switch (current.type) {
            case "string":
            return `${quote}${item}${quote}:${quote}${current.value}${quote}}`
            default:
            return `${quote}${item}${quote}:${current.value}}`
          }
        }
      }).join(" ")

      let varObjects = (varType) => {
        return rawData.map((item, index) => {
          let current = payload[item]
          if (index != rawData.length-1) {
            if (index == 0) {
              switch (current.type) {
                case "string":
                return `${varType} ${this.keyName} = {${quote}${item}${quote}:${quote}${current.value}${quote},`
                default:
                return `${varType} ${this.keyName} = {${quote}${item}${quote}:${current.value},`
              }
            } else {
              switch (current.type) {
                case "string":
                return `${quote}${item}${quote}:${quote}${current.value}${quote},`
                default:
                return `${quote}${item}${quote}:${current.value},`
              }
            }
          } else {
            switch (current.type) {
              case "string":
              return `${quote}${item}${quote}:${quote}${current.value}${quote}}`
              default:
              return `${quote}${item}${quote}:${current.value}}`
            }
          }
        }).join(" ")
      }

      this.outputObjects['const'] = varObjects('const')
      this.outputObjects['let'] = varObjects('let')
      this.outputObjects['var'] = varObjects('var')

    })
  },
  computed: {
    renderedObj () {
      return this.outputObjects[this.modeSelected]
    },
    modeDisplay () {
      let displayObj = {
        'JSON Property': `"key_name": { "property_name": "value" }`,
        'Object Property': `key_name: { property_name: ${this.quoteSelected}value${this.quoteSelected} }`,
        'const': `const key_name = { property_name: ${this.quoteSelected}value${this.quoteSelected} }`,
        'let': `let key_name = { property_name: ${this.quoteSelected}value${this.quoteSelected} }`,
        'var': `var key_name = { property_name: ${this.quoteSelected}value${this.quoteSelected} }`
      }
      return displayObj
    }
  },
  props: {

  },
  methods:{
    triggerRead () {
      EventBus.$emit('read-list')
    },
    rawToJSON () {

    },
    rawToObjectProp() {

    },
  },
  components: {
    PropList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.config-component {
  width: 40%;
}

.key-name {
  width: 75%;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
