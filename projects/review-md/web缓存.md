## 什么是 HTTP Cache
* 我们知道通过网络获取资源缓慢且耗时，需要三次握手等协议与远程服务器建立通信，对于大点的数据需要多次往返通信大大增加了时间开销，并且当今流量依旧没有理想的快速与便宜。对于开发者来说，长久缓存复用重复不变的资源是性能优化的重要组成部分。
* HTTP 缓存机制就是，配置服务器响应头来告诉浏览器是否应该缓存资源、是否强制校验缓存、缓存多长时间；浏览器非首次请求根据响应头是否应该取缓存、缓存过期发送请求头验证缓存是否可用还是重新获取资源的过程。下面我们就来结合简单的 node 服务器代码(文末)来介绍其中原理。


## 关键字
|响应头	| (常用)值	 | 说明 |
| -------------------- | -------------------  | ------------------ |
| Cache-Control |	no-cache, no-store, must-revalidate, max-age, public, private | 	控制浏览器是否可以缓存资源、强制缓存校验、缓存时间 |
| ETag |	文件指纹（hash码、时间戳等可以标识文件是否更新）| 	强校验，根据文件内容生成精确 |
| Last-Modified | 请求的资源最近更新时间 | 弱校验， 根据文件修改时间，可能内容未变，不精确 |
| Expires |	资源缓存过期时间  |	与响应头中的 Date 对比

| 请求头 |	值 |	说明 |
| -------------------- | -------------------  | ------------------ |
|If-None-Match|	缓存响应头中的 ETag 值	| 发送给服务器比对文件是否更新（精确）|
|If-Modified-Since|	缓存响应头中的 Last-Modified值 |	发送给服务器比对文件是否更新（不精确）

## 简单流程图
![MacDown Screenshot](https://img-blog.csdn.net/20180818175055500?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2d1ZHV5aWJlaXpp/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## private与public

![MacDown Sceenshot](https://img-blog.csdnimg.cn/20181112191545240.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2d1ZHV5aWJlaXpp,size_16,color_FFFFFF,t_70)

* `Cache-Control: public` 表示一些中间代理、CDN等可以缓存资源，即便是带有一些敏感 HTTP 验证身份信息甚至响应状态代码通常无法缓存的也可以缓存。通常 public 是非必须的，因为响应头 max-age 信息已经明确告知可以缓存了。
* `Cache-Control: private` 明确告知此资源只能单个用户可以缓存，其他中间代理不能缓存。原始发起的浏览器可以缓存，中间代理不能缓存。例如：百度搜索时，特定搜索信息只能被发起请求的浏览器缓存。


## 缓存过期策略

### 1. 三种方式设置服务器告知浏览器缓存过期时间
设置响应头（注意浏览器有自己的缓存替换策略，即便资源过期，不一定被浏览器删除。同样资源未过期，可能由于缓存空间不足而被其他网页新的缓存资源所替换而被删除。）

1. 设置 Cache-Control: max-age=1000 //响应头中的 Date 经过 1000s 过期
2. 设置 Expires //此时间与本地时间(响应头中的 Date )对比，小于本地时间表示过期，由于本地时钟与服务器时钟无法保持一致，导致比较不精确
3. 如果以上均未设置，却设置了 Last-Modified ，浏览器隐式的设置资源过期时间为 (Date - Last-Modified) * 10% 缓存过期时间。

### 2. 两种方式校验资源过期
设置请求头：

1. `If-None-Match` 如果缓存资源过期，浏览器发起请求会自动把原来缓存响应头里的 ETag 值设置为请求头 If-None-Match 的值发送给服务器用于比较。一般设置为文件的 hash 码或其他标识能够精确判断文件是否被更新，为强校验。
2. `If-Modified-Since` 同样对应缓存响应头里的 Last-Modified 的值。此值可能取得 ctime 的值，该值可能被修改但文件内容未变，导致对比不准确，为弱校验。


## 强制校验缓存
有时我们既想享受缓存带来的性能优势，可有时又不确认资源内容的更新频度或是其他资源的入口，我们想此服务器资源一旦更新能立马更新浏览器的缓存，这时我们可以设置

```
Cache-Control: no-cache
```


