function thousandThFormat(num) {
    return String(num).replace(/-?\d{1,3}(?=(\d{3})+$)/g, '$&,')
}

console.log(thousandThFormat(-10000000))