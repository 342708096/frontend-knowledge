function Hex2Rgb(str) {
    let reg = /^#([0-9A-F]{2,2})([0-9A-F]{2,2})([0-9A-F]{2,2})$/
    return str.replace(reg,(_, $1, $2, $3) => {
        return `rgb(${parseInt('0x' + $1)},${parseInt('0x' + $2)},${parseInt('0x' + $3)})`
    })
}


console.log(Hex2Rgb('#FFFFFF'))