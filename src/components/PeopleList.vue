<template>
  <div class="people-list">

    <h1>People</h1>

    <div class="people-list__sort-wrap">

      <div class="people-list__sort-left">

        <div class="people-list__sort-eye">
          <VSelect
              :dataFromSelect="peopleEyeColor"
              :filterBy="filterBy.eyeColor"
              @change="sortByEyeColor"
              @hideFilters="hideFilters"
          />
        </div>
        <div class="people-list__sort-age">
          <VRange
              :dataFromRange="PEOPLE_LIST"
              :filterBy="filterBy.Age"
              @change="setRange"
              @hideFilters="hideFilters"
          />
        </div>
        <div class="people-list__sort-height">
          <VRange
              :dataFromRange="PEOPLE_LIST"
              :filterBy="filterBy.Height"
              @change="setRange"
              @hideFilters="hideFilters"
          />
        </div>
      </div>

      <div class="people-list__sort-right">
        <div class="people-list__sort-by">
          <VSelect
              :dataFromSelect="sortBy"
              :filterBy="filterBy.sortBy"
              @change="peopleListFilter"
              @hideFilters="hideFilters"
          />
        </div>
      </div>
      
    </div>

    <ul class="people-list__wrap">
      <PeopleListItem
          v-for="(item, key) in sortedPeopleList"
          :key="key"
          :item="item"
          :imgUrl="imgUrls[item.name]"
      />
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import PeopleListItem from "@/components/PeopleListItem";
import VSelect from "@/components/app/VSelect";
import VRange from "@/components/app/VRange";

export default {
  name: "PeopleList",
  data: ()=> {
    return{
      imgUrls: {
        'Beru Whitesun lars': 'Beru Whitesun lars.jpg',
        'Biggs Darklighter':  'Biggs Darklighter.jpg',
        'C-3PO':              'C-3PO.png',
        'Darth Vader':        'Darth Vader.jpg',
        'Leia Organa':        'Leia Organa.jpg',
        'Luke Skywalker':     'Luke Skywalker.jpg',
        'Obi-Wan Kenobi':     'Obi-Wan Kenobi.jpg',
        'Owen Lars':          'Owen Lars.jpg',
        'R2-D2':              'R2-D2.jpg',
        'R5-D4':              'R5-D4.jpeg',
      },
      peopleListAfterSort: [],
      sortBy: {
        birth_year : 'age',
        mass : 'mass',
        height : 'height'
      },
      filterBy: {
        eyeColor: {
          name: 'Eye color',
          show: false
        },
        sortBy: {
          name: 'Sort by',
          show: false
        },
        Age: {
          name: 'Age',
          show: false,
          value: 'birth_year',
          prop: 'BBY'
        },
        Height: {
          name: 'Height',
          show: false,
          value: 'height',
          prop: 'cm'
        }
      }
    }
  },
  components: {PeopleListItem, VSelect, VRange},
  computed:{
    ...mapGetters(["IS_LOADED", "IS_ERROR", "PEOPLE_LIST"]),
    peopleEyeColor: function(){
      return {...[...new Set(this.PEOPLE_LIST.map(item => item.eye_color))].sort()}
    },
    sortedPeopleList: function (){
      return this.peopleListAfterSort.length !== 0 ? this.peopleListAfterSort : this.PEOPLE_LIST
    }
  },
  mounted() {
    this.GET_PEOPLE_LIST_FROM_API()
  },
  methods: {
    ...mapActions([
      "GET_PEOPLE_LIST_FROM_API"
    ]),
    sortByEyeColor(key){
      this.peopleListAfterSort.length = 0
      this.PEOPLE_LIST.map(item => {
        if(item.eye_color === key){
          return this.peopleListAfterSort.push(item)
        }
      })
      this.addFilterByRoute(key)
    },
    peopleListFilter(key){
      this.addSortByRoute(key)
      return this.sortedPeopleList.sort((a, b) => parseInt(a[key]) > parseInt(b[key]) ? 1 : -1)
    },
    setRange(min, max, range){
      this.peopleListAfterSort = [...this.PEOPLE_LIST]
      this.peopleListAfterSort = this.peopleListAfterSort.filter( item => {
        return parseFloat(item[range]) <= max && parseFloat(item[range]) >= min
      })
      this.addFilterByRoute(range)
    },
    hideFilters(name, show){
      for(let key in this.filterBy){
        if(show){
          this.filterBy[key].show = false
        }
        else{
          this.filterBy[key].show = this.filterBy[key].name === name ? true : false
        }
      }
    },
    addFilterByRoute(val){
      this.$router.push('?filtered_by_' + val)
    },
    addSortByRoute(val){
      this.$router.push('?sort_by_' + val)
    }
  }
}
</script>