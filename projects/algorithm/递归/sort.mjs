
function sortZero(arr) {
  for (let i=0, j = 1; j < arr.length; j++) {
    // i 指向第一个为0 的数
    while(arr[i] !== 0) {
      i++;
      j++;
    }
    if (j<arr.length && arr[j] !== 0) {
      swap(arr, i, j)
      i++
    }
  }
}

export function swap(arr, i, j) {
  // 这里最好加上这个判断
  if (i !== j) { 
    arr[i] = arr[i] ^ arr[j]
    arr[j] = arr[i] ^ arr[j]
    arr[i] = arr[i] ^ arr[j]
  }
}

const arr = [0,1,0,0,3,0,5,0]


sortZero(arr)
console.log(arr)