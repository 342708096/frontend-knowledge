export default function(url, body, headers) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onerror = function() {};
    xhr.timeout = 10 * 1000;
    xhr.withCredentials = true;
    if (body === undefined) {
        body = null;
    } else {
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    }
    if (headers) {
        for (var h in headers) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }
    xhr.send(body);
}