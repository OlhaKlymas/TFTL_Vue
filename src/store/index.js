import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoaded: false,
    isError: false,
    peopleList: []
  },
  mutations: {
    SET_IS_LOADED: (state, isLoaded) => {
      state.isLoaded = isLoaded
    },
    SET_IS_ERROR: (state, isError) => {
      state.isError = isError
    },
    SET_PEOPLE_LIST_TO_STATE: (state, peopleList)=>{
      state.peopleList = peopleList
    }
  },
  actions: {
    GET_PEOPLE_LIST_FROM_API({commit}){
      commit("SET_IS_LOADED", true)
      return axios(`https://swapi.dev/api/people/`, {
        method: "GET"
      }).then((peopleList)=>{
        commit("SET_PEOPLE_LIST_TO_STATE", peopleList.data.results);
        commit("SET_IS_LOADED", false)
        return peopleList
      }).catch((error)=>{
        commit("SET_IS_LOADED", false)
        commit("SET_IS_ERROR", true)
        console.log(error)
        return error
      })
    }
  },
  getters:{
    IS_LOADED(state){
      return state.isLoaded;
    },
    IS_ERROR(state){
      return state.isError;
    },
    PEOPLE_LIST(state){
      return state.peopleList;
    }
  }
})
