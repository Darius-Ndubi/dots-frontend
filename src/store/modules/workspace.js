import { getWorkspaces } from '@/api/workspace'

function initialState() {
  return {
    workspaces: [],
    defaultWorkspace: {},
    workspacesLoaded: false
  }
}

const state = initialState()

const mutationTypes = {
  SET_WORKSPACES: '[Workspaces] Set Workspaces',
  SET_DEFAULT_WORKSPACE: '[Workspace] Set Default Workspace'
}

const mutations = {
  [mutationTypes.SET_WORKSPACES]: (state, payload) => {
    state.workspaces = payload
    state.workspacesLoaded = true
  },
  [mutationTypes.SET_DEFAULT_WORKSPACE]: (state, payload) => {
    state.defaultWorkspace = payload
  },
  // https://github.com/vuejs/vuex/issues/1118#issuecomment-356286218
  RESET: (state, payload) => {
    console.log('Workspace reseting state')
    const s = initialState()
    Object.keys(s).forEach(key => {
      state[key] = s[key]
    })
  }
}

export const workspaceActions = {
  GET_WORKSPACES: '[Workspaces] Get Workspaces'
}

const actions = {
  async [workspaceActions.GET_WORKSPACES]({ commit }) {
    try {
      const workspaces = await getWorkspaces()
      if (workspaces.length !== 0) {
        const defaultWorkspace = workspaces.filter(ws => ws.is_default)[0]
        commit(mutationTypes.SET_DEFAULT_WORKSPACE, defaultWorkspace)
      }
      commit(mutationTypes.SET_WORKSPACES, workspaces)
    } catch (e) {
      throw new Error(`${workspaceActions.GET_WORKSPACES} failed with ${e}`)
    }
  }
}

const getters = {
  getDefaultWorkspace: state => state.defaultWorkspace,
  getOtherWorkspaces: state => state.workspaces.filter(ws => !ws.is_default)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
