import { login, getInfo, activateUser, resendActivationEmail } from '@/api/user'

import { getToken, setToken, removeToken, getRefreshToken, removeRefreshToken, setRefreshToken } from '@/utils/auth'

function initialState() {
  return {
    token: getToken(),
    refreshToken: getRefreshToken(),
    user: {}
  }
}

const state = initialState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_REFRESH_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  RESET: state => {
    Object.assign(state, initialState())
  }
}

const actions = {
  login({ commit }, credentials) {
    const { username, password } = credentials
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { access, refresh } = response
        commit('SET_TOKEN', access)
        commit('SET_REFRESH_TOKEN', refresh)
        setToken(access)
        setRefreshToken(refresh)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        if (!response) {
          reject('Verification failed, please Login again.')
        }

        commit('SET_USER', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      commit('workspace/RESET', null, { root: true })
      commit('user/RESET', null, { root: true })
      commit('tables/RESET', null, { root: true })
      removeToken()
      removeRefreshToken()

      resolve()
    })
  },

  setToken({ commit }, token) {
    return new Promise(resolve => {
      commit('SET_TOKEN', token)
      setToken(token)
      resolve()
    })
  },

  activateUser({}, activation_key) { // eslint-disable-line no-empty-pattern
    return new Promise((resolve, reject) => {
      activateUser(activation_key).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_REFRESH_TOKEN', '')
      removeToken()
      removeRefreshToken()
      resolve()
    })
  },

  resendActivationEmail({}, username) { // eslint-disable-line no-empty-pattern
    return new Promise((resolve, reject) => {
      resendActivationEmail({ username }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
