import request from '@/utils/request'

/**
 * load tables from the API
 */
export function getTables() {
  return request()({
    url: '/tables/',
    method: 'get'
  })
}

/**
 * POST a new table to the API
 * @param { object } data: new table data
 */
export function postTable(data) {
  console.log('I am here with ', data)
  return request()({
    url: '/tables/',
    method: 'post',
    data
  })
}

/**
 * get table details with dataset from the API
 * @param { string } uuid: table unique identifier
 */
export function getTableDetails(uuid) {
  return request()({
    url: `/tables/${uuid}/`,
    method: 'get'
  })
}

/**
 * update table
 * @param { string } uuid: table unique identifier
 */
export function editTable(data, uuid) {
  return request()({
    url: `/tables/${uuid}/`,
    method: 'patch',
    data
  })
}

/**
 * delete table
 * @param { string } uuid: table unique identifier
 */
export function deleteTable(uuid) {
  return request()({
    url: `/tables/${uuid}/`,
    method: 'delete'
  })
}

/**
 * get table's GeoJson Data
 * @param { string } uuid: table uuid identifier
 */
export function getGeoJsonData(uuid) {
  return request()({
    url: `/tables/geojson/${uuid}/`,
    method: 'get'
  })
}

/**
 * Get 3rd party forms
 * @param source
 */
export function getThirdPartyForms(source) {
  return request()({
    url: `/tables/data/forms/?source=${source}`,
    method: 'get'
  })
}
