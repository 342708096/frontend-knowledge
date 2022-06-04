export function getType(val) {
   const rawType = Object.prototype.toString.call(val) 
   return rawType.replace(/^\[object\s(\w+)\]$/, (_, $1) => $1.toLowerCase()) 
}

console.log(getType())