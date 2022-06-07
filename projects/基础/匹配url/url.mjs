/**
 * 注意编译字符串时, 需要将\转义
 * @param {*} url 
 * @param {*} name 
 * @returns 
 */

function getRequestParams(url, name) {
    let reg = new RegExp(`(?<=\\?|&)(${encodeURIComponent(name)})\\=([^&#]+)(?=&|$)`)

    let group = url.match(reg)
    console.log(group)
    if (group && group[2]) {
        return decodeURIComponent(group[2])
    }
    return null
}


console.log(getRequestParams('?ccc=123123&ddd=bbb', 'ddd'))