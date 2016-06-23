#### 用法
###### html
```html
<script type="text/javascript" src="..path/aniframe.js"></script>
```
###### javscript
```javascript
let frame = new AniFrame({
    target: document.getElementById('ani-frame'),
    url: '..images/sprite.jpg',
    totalFrame: 20
})
```

#### 选项
* target: *必需，执行帧动画的元素
* url: *必需，背景图片地址，图片必需为横排或竖排拼接的雪碧图
* totalFrame: *必需，总的帧数
* width: 单帧背景图宽度，默认为target元素宽度
* height: 单帧背景图高度，默认为target元素高度
* speed: 播放速度,即每帧停留时间，单位为ms毫秒，默认100
* direction: 雪碧图的排列方向，默认为'x'(横排), 'y'则表示竖排
* loop: 是否循环播放，默认为true

###### 回调
* onPlaying(current, total): 每帧播放回调，current为当前帧数(第一帧为0)，total为总帧数
* onPlayEnd(): 播放结束的回调，若loop为true，则每个循环回调一次

###### 示例
```javascript
let frame = new AniFrame({
    target: document.getElementById('ani-frame'),
    url: '..images/sprite_vertical.jpg',
    totalFrame: 10,
    width: 320,
    height: 504,
    speed: 50,
    direction: 'y',
    loop: false,
    onPlaying: function(current, total){
        console.log((current/total)*100+'percent')
    },
    onPlayEnd: function(){
        console.log('end')
    }
})
```

#### 方法
* play(): 开始播放
* pause(): 暂停播放，下次播放从暂停位置开始
* stop(): 停止播放，下次播放从第一帧开始
* toggle(status): 切换播放状态，若当前为暂停或停止状态，则开始播放；若当前正在播放，则根据传入的status('pause'或'stop')执行相应动作

