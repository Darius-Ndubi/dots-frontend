import {
  getTables,
  getTableDetails,
  postTable,
  editTable,
  deleteTable,
  getGeoJsonData,
  getThirdPartyForms
} from '@/api/table'
import { mapArrayEntities } from '@/utils/data.utils'

function initialState() {
  return {
    tables: {},
    dataset: {},
    geoJsonData: {},
    thirdPartyForms: []
  }
}

const state = initialState()

const mutationTypes = {
  SET_TABLES: '[Tables] Set Tables',
  SET_TABLE: '[Tables] Add Table',
  SET_TABLE_DETAILS: '[Tables] Set Table Details',
  DELETE_TABLE: '[Tables] Delete Table',
  SET_MAP_DATA: '[Tables] Set Map Data',
  SET_THIRD_PARTY_FORMS: '[Tables] Third Party Forms'
}

const mutations = {
  [mutationTypes.SET_TABLES]: (state, payload) => {
    state.tables = payload
  },
  [mutationTypes.SET_TABLE]: (state, payload) => {
    state.tables[payload.table_uuid] = payload
    state.tables = { ...state.tables }
  },
  [mutationTypes.SET_TABLE_DETAILS]: (state, payload) => {
    state.dataset = payload
  },
  [mutationTypes.DELETE_TABLE]: (state, tableUuid) => {
    delete state.tables[tableUuid]
    state.tables = { ...state.tables }
  },
  [mutationTypes.SET_MAP_DATA]: (state, payload) => {
    state.geoJsonData = payload
  },
  [mutationTypes.SET_THIRD_PARTY_FORMS]: (state, payload) => {
    state.thirdPartyForms = payload
  },
  RESET: state => {
    Object.assign(state, initialState())
  }
}

export const tableActions = {
  GET_TABLES: '[Tables] Get Tables',
  CREATE_TABLE: '[Tables] Create Table',
  GET_TABLE_DETAILS: '[Tables] Get Table Details',
  EDIT_TABLE: '[Tables] Edit Table',
  DELETE_TABLE: '[Tables] Delete Table',
  GET_MAP_DATA: '[Tables] Get Map Data',
  GET_THIRD_PARTY_FORMS: '[Tables] Get Third Party Forms'
}

const actions = {
  /**
   * Get tables
   * @param commit
   * @returns {Promise<*>}
   */
  async [tableActions.GET_TABLES]({ commit }) {
    try {
      const tables = await getTables()
      commit(mutationTypes.SET_TABLES, mapArrayEntities(tables))
      return tables
    } catch (e) {
      throw new Error(`${tableActions.GET_TABLES} failed with ${e}`)
    }
  },

  /**
   * Create table
   * @param commit
   * @param payload
   * @returns {Promise<*>}
   */
  async [tableActions.CREATE_TABLE]({ commit }, payload) {
    try {
      const table = await postTable(payload)
      commit(mutationTypes.SET_TABLE, table)
      return table
    } catch (e) {
      throw new Error(`${tableActions.CREATE_TABLE} failed with ${e}`)
    }
  },

  /**
   * Get table details with dataset
   * @param commit
   * @param payload
   * @returns {Promise<*>}
   */
  async [tableActions.GET_TABLE_DETAILS]({ commit }, payload) {
    commit(mutationTypes.SET_TABLE_DETAILS, [])
    try {
      const response = await getTableDetails(payload)
      commit(mutationTypes.SET_TABLE_DETAILS, response)

      return response
    } catch (e) {
      throw new Error(`${tableActions.GET_TABLE_DETAILS} failed with ${e}`)
    }
  },

  /**
   * Delete table
   * @param commit
   * @param payload
   * @returns {Promise<*>}
   */
  async [tableActions.EDIT_TABLE]({ commit }, payload) {
    try {
      const response = await editTable(payload.changes, payload.uuid)
      commit(mutationTypes.SET_TABLE, response)
      return response
    } catch (e) {
      throw new Error(`${tableActions.EDIT_TABLE} failed with ${e}`)
    }
  },

  [tableActions.DELETE_TABLE]: ({ commit }, uuid) => {
    deleteTable(uuid).then(() => {
      commit(mutationTypes.DELETE_TABLE, uuid)
    })
  },

  async [tableActions.GET_MAP_DATA]({ commit }, tableUuid) {
    try {
      const response = await getGeoJsonData(tableUuid)
      commit(mutationTypes.SET_MAP_DATA, response)
      return response
    } catch (e) {
      throw new Error(`${tableActions.GET_MAP_DATA} failed with ${e}`)
    }
  },
  async [tableActions.GET_THIRD_PARTY_FORMS]({ commit }, source) {
    try {
      const response = await getThirdPartyForms(source)
      commit(mutationTypes.SET_THIRD_PARTY_FORMS, response)
      return response
    } catch (e) {
      throw new Error(`${tableActions.GET_THIRD_PARTY_FORMS} failed with ${e}`)
    }
  }
}

const getters = {
  getAllTables: state => Object.values(state.tables).sort((a, b) => a - b),
  getTableDetails: state => state.dataset,
  getMapData: state => state.geoJsonData,
  getThirdPartyForms: state => state.thirdPartyForms
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
