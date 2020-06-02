import Browser from './browser';
import request from './ajax';


function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
function reportError(message, source, lineno, colno, error) {
    let prefix = window.reportDomain || 'https://proxy.jdwl.com';
    request(prefix + '/report/reportData',
        JSON.stringify([{
            "appKey":"logistic_web",
            "businessType":1,
            "detailStr":{
                "appKey":"logistic_web",
                "channel":"5",
                "clientIp":"",
                "event":"",
                "eventId":guid(),
                "eventName":"",
                "inParamStr": JSON.stringify(new Browser()),
                "localClazzName":"",
                "outParamStr": `message: ${message}, source: ${source}, lineno: ${lineno}, colno: ${colno}, error: ${error}`,
                "recordTime":Date.now(),
                "reportTime":Date.now(),
                "success":false,
                "traceId": window.traceId || guid(),
                "userPin":"",
                "version":"1.0.0",
                "reserved1":  window.navigator.userAgent
            }
        }]),
        {
            'LOP-DN': 'jdwl.com', // 使用创建的域名，否则调用不通过
            'ClientInfo': JSON.stringify({
                'appName': 'c2c', // 此处本人使用的是创建的分组名
                'client': 'm' // 客户端类型：如：apple（苹果手机），android（安卓手机），m(m页)等
            }),
            'AppParams': JSON.stringify({
                'appid': '158', // 无线登录appid
                'ticket_type': 'pc' // app(只使用app的登录态),m(只使用m的登录态),pc(只使用pc的登录态),wq(只使用wq的登录态),mix(混用方式，按app/m/pc/wq的顺序，若前者为空，则依次验证下一种登录态)
            })
        }
    )
}

window.onerror = reportError;
export default reportError;