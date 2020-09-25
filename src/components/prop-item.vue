<template>
  <div class="prop-item-container">
    <div class="input-container w-50">
      <div class="input-label">Property Name</div>
      <b-form-input v-model="propName"></b-form-input>
    </div>
    <div class="ml-3 input-container w-50">
      <div class="input-label">
        <div style="width: 55%;">Property Value</div>
        <div style="flex-basis: 45%;">
          <b-form-radio-group
            v-model="valueTypeSelected"
            :options="valueTypeOptions"
            class="test"
            buttons
          ></b-form-radio-group>
        </div>
      </div>
      <div class="input-value-container d-flex align-items-center">
        <b-form-input :type="inputType" v-model="boolParse"></b-form-input>
        <b-form-checkbox
          v-if="valueTypeSelected == 'I/O'"
          v-model="valueData['I/O'].value"
          name="check-button"
          switch
          class="ml-2"
        ></b-form-checkbox>
      </div>
    </div>
    <span @click="handleDelete" style="align-self: flex-end">
      <ionicon width="calc(1.5em + 0.75rem + 2px)" iconName="closeCircleOutline"></ionicon>
    </span>
  </div>
</template>

<script>

import ionicon from 'components/ionicon.vue'

export default {
  name: 'PropItem',
  data () {
    return {
      propName: "",
      valueTypeOptions: ['""', "#", '[]', '{}', 'I/O'],
      valueTypeSelected: '""',
      valueData: {
        '""': {value: "", type: "string"},
        '#': {value: 0, type: "number"},
        '[]': {value: "[]", type: "array"},
        '{}': {value: "{}", type: "object"},
        'I/O': {value: true, type: "boolean"}
      }
    }
  },
  computed: {
    inputType () {
      return this.valueTypeSelected == "#" ? 'number' : 'text'
    },
    boolParse () {
      return this.valueTypeSelected == 'I/O' ? `${this.valueData['I/O'].value}` : this.valueData[this.valueTypeSelected].value
    }
    // valueData () {
    //   return {
    //     '""': {value: "", type: "string"},
    //     '#': {value: 0, type: "number"},
    //     '[]': {value: "[]", type: "array"},
    //     '{}': {value: "{}", type: "object"},
    //     'I/O': {value: this.boolState, type: "boolean"}
    //   }
    // }
  },
  mounted () {
  },
  methods: {
    handleDelete () {
      this.$emit('delete', this)
    }
  },
  components: {
    ionicon
  },

}
</script>

<style scoped>

  .test {
    width: 100%;
  }

  .input-label {
    display: flex;
    flex-direction: row;
  }

  .test >>> label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: 100%;
    font-size: 60%;
  }

  .prop-item-container {
    display: flex;
  }

</style>
