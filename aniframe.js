(function(root){
    function getStyle(el) {
    　 　if(window.getComputedStyle) {
    　 　    return window.getComputedStyle(el, null)
    　 　}else{
    　 　 　 return el.currentStyle
    　 　}
    }
    function extend(dest, src){
        for(var k in src){
            if(src.hasOwnProperty(k)){
                dest[k] = src[k]
            }
        }
        return dest
    }
    function AniFrame(options){
        var style = getStyle(options.target)
        this.options = {
            width: parseInt(style.width),
            height: parseInt(style.height),
            speed: 100,
            direction: 'x',
            loop: true,
            onPlaying: function(){},
            onPlayEnd: function(){}
        }
        extend(this.options, options)
        this.init()
        return this
    }
    AniFrame.prototype.init = function(){
        var o = this.options
        this.index = 0
        this.timer = null
        this.status = 'stopped'
        if(o.direction === 'y'){
            o.target.style.backgroundSize = o.width + 'px ' + (o.totalFrame * o.height) + 'px'
        }else{
            o.target.style.backgroundSize = (o.totalFrame * o.width) + 'px ' + o.height + 'px'
        }
        o.target.style.backgroundImage = 'url(' + o.url + ')'
    }
    AniFrame.prototype._play = function(){
        var o = this.options
        this.index++
        if(this.index >= this.options.totalFrame){
            o.onPlayEnd()
            if(this.options.loop){
                this.index = 0
            }else{
                this.stop()
                return
            }
        }
        if(o.direction === 'y'){
            o.target.style.backgroundPosition = "0px -" + (o.height * this.index) + "px";
        }else{
            o.target.style.backgroundPosition = "-" + (o.width * this.index) + "px 0px";
        }
        o.onPlaying(this.index, o.totalFrame)
    }
    AniFrame.prototype.play = function(){
        this.timer = setInterval(this._play.bind(this), this.options.speed)
        this.status = 'playing'
    }
    AniFrame.prototype.pause = function(){
        clearInterval(this.timer)
        this.timer = null
        this.status = 'paused'
    }
    AniFrame.prototype.stop = function(){
        this.pause()
        this.index = 0
        this.status = 'stopped'
    }
    AniFrame.prototype.toggle = function(status){
        if(this.status !== 'playing'){
            this.play()
        }else if(status === 'stop'){
            this.stop()
        }else{
            this.pause()
        }
    }
    root.AniFrame = AniFrame
})(window)