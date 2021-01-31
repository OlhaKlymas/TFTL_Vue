<template>
  <div class="select-wrap">

    <div class="select arrow"
         @click="$emit('hideFilters', filterBy.name, filterBy.show)"
         :class="{'active': filterBy.show}"
    >{{filterBy.name}}</div>

    <div class="option-wrap">
      <div class="option"
           v-show="filterBy.show"
           v-for="(val, key) in dataFromSelect"
           :key="key"
           @click="selected(val, key)"
      >{{ val }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "VSelect",
  props: {
    dataFromSelect: {
      type: Object,
      required: true
    },
    select: {
      default: false
    },
    value: {
      default: false
    },
    filterBy: {
      type: Object,
      required: true
    }
  },
  methods: {
    selected(newVal, newKey) {
      this.$emit('hideFilters', this.filterBy.name, this.filterBy.show)
      newKey = !isNaN(newKey) ? newVal : newKey
      this.$emit('change', newKey )
    }
  }
}
</script>