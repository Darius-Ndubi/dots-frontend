export const toBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = () => {
      reject(reader.error)
    }
  })
}

export const mapArrayEntities = array =>
  array.reduce((obj, item) => {
    obj[item.table_uuid] = item
    return obj
  }, {})
