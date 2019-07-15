var vm = {}
var data= {
    name: 'zjangsan',
    age: 12

}

var key,value

for( key in data) {
    (function(key) {
        Object.defineProperty(vm, key, {
            get: function() {
                console.log('get', data[key])
                return data[key]
            },
            set: function(val) {
                console.log('set', val)
                data[key] = val
            }
        })
    })(key)
}