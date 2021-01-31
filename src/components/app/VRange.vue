<template>
  <div :class="`sort-range filter-${filterBy.value}`">
    <div class="sort-range__header"
         @click="$emit('hideFilters', filterBy.name, filterBy.show)"
    >
      <p class="arrow">{{filterBy.name}}</p>
    </div>
    <div class="sort-range__wrap" v-show="filterBy.show">
      <div class="sort-range__inputs-number-wrap">
        <input type="number"
               v-model.number="min"
               @change="setNewRange"
        >
        <input type="number"
               v-model.number="max"
               @change="setNewRange"
        >
      </div>
      <div class="sort-range__data-wrap">
        <p>{{min}} {{this.filterBy.prop}}</p>
        <p>{{max}} {{this.filterBy.prop}}</p>
      </div>
      <div class="sort-range__inputs-range-wrap">
        <input
            type="range"
            :min="minDefault"
            :max="maxDefault"
            step="1"
            v-model.number="min"
            @change="setNewRange"
        >
        <input
            type="range"
            :min="minDefault"
            :max="maxDefault"
            step="1"
            v-model.number="max"
            @change="setNewRange"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VRange",
  props: {
    dataFromRange: {
      type: Array,
      required: true
    },
    filterBy: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      min: null,
      max: null
    }
  },
  computed:{
    peopleSort: function (){
      return this.dataFromRange.map(item => {
        return parseFloat(item[this.filterBy.value])
      }).filter(item => item > 0)
    },
    minDefault: function (){
      return Math.min(...this.peopleSort)
    },
    maxDefault: function (){
      return Math.max(...this.peopleSort)
    }
  },
  watch: {
    minDefault: function (val){
      this.min = val
    },
    maxDefault: function (val){
      this.max = val
    }
  },
  methods:{
    setNewRange(){
      if(this.min > this.max){
        let temp = this.max
        this.max = this.min
        this.min = temp
      }
      this.$emit('change', this.min, this.max, this.filterBy.value)
    }
  }
}
</script>