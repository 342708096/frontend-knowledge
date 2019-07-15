function waitHandle() {
    var dtd = $.Deferred()
    var wait = function(dtd) {
        var task = function() {
            console.log('执行完成')
            dtd.resolve()
        }
        setTimeout(task, 2000)
        return dtd.promise()
    }
    return wait(dtd)
}