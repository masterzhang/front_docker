export default function convertKey(arr, key) {
  const newArr = []
  arr.forEach((item) => {
    const newObj = {}
    for (let i = 0; i < key.length; i++) {
      newObj[key[i]] = item[Object.keys(item)[i]]
    }
    newArr.push(newObj)
  })
  return newArr
}
