import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'

function initialState() {
  return {
    language: getLanguage()
  }
}

const state = initialState()

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  RESET: state => {
    Object.assign(state, initialState())
  }
}

const actions = {
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
