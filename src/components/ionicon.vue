<template lang="html">
  <!-- <div class="iconWrapper"> -->
    <span class="iconWrapper" :style="styleObject"></span>
  <!-- </div> -->
</template>

<script>
export default {
  data () {
    return {
      styleObject: {
        background: `url(${this.$ionicons[this.iconName].ios})`,
        float: 'left',
        width: this.width
      }
    }
  },
  mounted () {
    // console.log(this.$ionicons['closeCircleOutline'])
  },
  computed: {

  },
  props: ['iconName', 'width']
}
</script>

<style lang="css" scoped>

.iconWrapper {
  position: relative;
  width: 4%;
  place-self: flex-end;
}

.iconWrapper:before {
  content: "";
  float: left;
  padding-top: 100%;
}

</style>
