function bubbleSort (arr) {
  let length = arr.length
  var temp
  for (let i = 0; i < length; i++) {
    for (let j = i; j < length; j++) {
      if (arr[i] < arr[j]) {
        temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
      }
    }
  }
  return arr
}

function selectSort (arr) {
  let length = arr.length
  let max
  let temp
  for (let i = 0; i < length - 1; i++) {
    max = i
    for (let j = i; j < length; j++) {
      if (arr[j] > arr[i]) {
        max = j
      }
    }
    temp = arr[max]
    arr[max] = arr[i]
    arr[i] = temp
  }
  return arr
}
function quickSort (arr) {
  if (arr.length <= 1) {
    return arr
  }
  let left = []
  let right = []
  let temp = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < temp) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(temp, quickSort(right))
}
console.log(bubbleSort([1, 5, 6, 8, 0, 9]))
console.log(selectSort([1, 5, 6, 8, 0, 9]))
console.log(quickSort([1, 5, 6, 8, 0, 9]))

function deepClone (obj) {
  if (typeof obj !== 'object') {
    return obj
  } else {
    let newObj = Array.isArray(obj) ? [] : {}
    for (var key in obj) {
      if (typeof obj[key] === 'object') {
        newObj[key] = deepClone(obj[key])
      } else {
        newObj[key] = obj[key]
      }
    }
    return newObj
  }
}
var obj = {
  name: '小花',
  age: 20,
  skill: {
    frondEnd: 'js',
    backEnd: 'node',
    web: {
      css: 'good'
    }
  },
  aa: function () {
    return 1
  }
}
console.log(deepClone(obj))
