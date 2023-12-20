
new Vue({
    el:"#app",//vue接管范围
    data:{
        num: " ",
        },
})
// import Vue from 'vue'  
// import ElementUI from 'element-ui'  
// import 'element-ui/lib/theme-chalk/index.css'  
  
// Vue.use(ElementUI)
var Model = {};  
Model.isVideo = 1;
Model.UI = document.getElementById("UI"); 
Model.app = document.getElementById("app");  
Model.info = document.getElementById("info");
Model.media = document.getElementById("media");
Model.mediaDiv = document.getElementById("mediaDiv");
Model.logoDom = document.getElementById("logo") ;
Model.currentTimeDom = document.getElementById("currentTime") ;

Model.Dom = {};
Model.Dom.play = document.getElementById('play');
Model.Dom.stop = document.getElementById('stop');
Model.Dom.pre = document.getElementById('pre');
Model.Dom.next = document.getElementById('next');
Model.Dom.zhuan = document.getElementById('zhuan');
Model.Dom.switch = document.getElementById('switch');

Model.Vid = {};
Model.Vid.vino = 0;//定义视频数
Model.Vid.auno = 0;//定义音频数
Model.Vid.nowvideo = document.getElementById('video');
Model.Vid.nowaudio = document.getElementById('audio');
Model.Vid.ns = document.getElementById('nszhuan');//获取输入框内的数，实现跳转

Model.Mem = {};
Model.Mem.img = document.getElementById('mumberImg');

//更改logo,设置NO数
Model.showMediaNum = function(i){
    if(Model.isVideo){
        Model.logoDom.textContent = 'NO.' +  (i+1) + '/' + mediaData.videoFiles.length ;
    }
    else{
        Model.logoDom.textContent = 'NO.' +  (i+1) + '/' + mediaData.audioFiles.length ;
    }
} 

//创建作者信息
Model.createAutors = function(){
    let pDom ;
    for(let i=0;i<mediaData.authorspicUrl.length;i++){
       pDom = document.createElement("img") ;
       pDom.src = mediaData.authorPath + mediaData.authorspicUrl[i];
       Model.info.appendChild(pDom);
       pDom.style.width = Model.info.width*15% + 'px';
       pDom.onclick = function(){
            window.location.href = mediaData.authorsUrl[i];
       }
    }


}
Model.createAutors();

//改变视频路径
Model.Vid.getUrl = function(i){
    Model.Vid.ns.value = " ";
    console.log(i);
    if(Model.isVideo){
        Model.Vid.nowvideo.src=mediaData.videoPath+mediaData.videoFiles[i];
    }
    else{
        Model.Vid.nowaudio.src=mediaData.audioPath+mediaData.audioFiles[i].fileName;
    }
}

//判断视频输入框输入
function sVideoNs(nsv){
    if(!(Model.Vid.ns.value%1 === 0) || Model.Vid.ns.value == " "){
        Model.Vid.ns.value = " ";
        alert("输入框不能为整数或空格！");
    }//输错变成原本视频数  
    else if(Model.Vid.ns.value > mediaData.videoFiles.length || Model.Vid.ns.value <= 0){
        Model.Vid.ns.value = " ";
        alert("输入框不能大于视频总数！");
    }//输错变成原本视频数  
    else if(Model.Vid.ns.value != nsv){
        nsv=Model.Vid.ns.value-1;
        console.log('页面数不等于视频数');
        Model.Vid.getUrl(nsv);  
    } //证明输入了一个数
    return nsv;
}

//判断音频输入框输入
function sAudioNs(nsv){
    if(!(Model.Vid.ns.value%1 === 0) || Model.Vid.ns.value == " "){
        Model.Vid.ns.value = " ";
        alert("输入框不能为整数或空格！");
    }//输错变成原本视频数  
    else if(Model.Vid.ns.value > mediaData.audioFiles.length || Model.Vid.ns.value <= 0){
        Model.Vid.ns.value = " ";
        alert("输入框不能大于视频总数！");
    }//输错变成原本视频数  
    else if(Model.Vid.ns.value != nsv){
        nsv=Model.Vid.ns.value-1;
        console.log('页面数不等于视频数');
        Model.Vid.getUrl(nsv);  
    } //证明输入了一个数
    return nsv;
}

//跳转按钮
Model.Dom.zhuan.onclick=function(){
    if(Model.isVideo){
        Model.Vid.vino = sVideoNs(Model.Vid.vino);
    }
    else{
        Model.Vid.auno = sAudioNs(Model.Vid.auno)
    }
}

//play按钮
Model.Dom.play.onclick=function(){
    if(Model.isVideo){
        Model.Vid.getUrl(Model.Vid.vino);
        Model.Vid.nowvideo.play();
    }
    else{
        Model.Vid.getUrl(Model.Vid.auno);
        Model.Vid.nowaudio.play();
    }
}

//stop按钮
Model.Dom.stop.onclick=function(){
    if(Model.isVideo){
        Model.Vid.nowvideo.pause();
    }
    else{
        Model.Vid.nowaudio.pause();
    }
}

//next按钮
Model.Dom.next.onclick=function(){
    if(Model.isVideo){
        if(Model.Vid.vino==mediaData.videoFiles.length-1){
            Model.Vid.vino=0;
        }
        else{
            Model.Vid.vino++;
        }
        Model.Vid.getUrl(Model.Vid.vino);
    }
    else{
        if(Model.Vid.auno==mediaData.audioFiles.length-1){
            Model.Vid.auno=0;
        }
        else{
            Model.Vid.auno++;
        }
        Model.Vid.getUrl(Model.Vid.auno);
    }
}

//pre按钮
Model.Dom.pre.onclick=function(){
    if(Model.isVideo){
        if(Model.Vid.vino==0){
            Model.Vid.vino=mediaData.videoFiles.length-1;
        }
        else{
            Model.Vid.vino--;
        }
        Model.Vid.getUrl(Model.Vid.vino);
    }
    else{
        if(Model.Vid.auno==0){
            Model.Vid.auno=mediaData.audioFiles.length-1;
        }
        else{
            Model.Vid.auno--;
        }
        Model.Vid.getUrl(Model.Vid.auno);
    }
}

Model.createAudioMenu = function(){
    // let pDom ;
    // for(let i=0;i<mediaData.audioFiles.length;i++){
    //    pDom = document.createElement("button") ;
    //    pDom.textContent = "Menu " +(i+1) ;
    //    pDom.onclick = function(){
    //         Model.Vid.getUrl(i) ;
    //         Model.Vid.nowaudio.play();
    //         Model.Vid.auno = i;
    //    }
    //    Model.menuDiv.appendChild(pDom);
    //    pDom.style.width = document.body.clientWidth/2 + 20 + 'px';
    //    pDom.style.height = (document.body.clientHeight -Model.info.style.height)/mediaData.audioFiles.length + 'px';
    //}
    let pDom ;
    let titles = mediaData.audioFiles[Model.Vid.auno].titles ;
    let time = mediaData.audioFiles[Model.Vid.auno].time ;
    console.log(titles) ;
    for(let i=0 ;i< titles.length ; i++){
       pDom = document.createElement("p") ;
       pDom.textContent = titles[i]  ;
       pDom.onclick = function(){
         Model.Vid.nowaudio.currentTime =  time[i][0] ;
         console.log(Model.Vid.nowaudio.currentTime) ;
         Model.Vid.nowaudio.play();
         window.setTimeout(function(){
           Model.Vid.nowaudio.pause();
         } , (time[i][1] - time[i][0])*1000) ;
        
       };
       Model.media.appendChild(pDom);
    }
}

Model.removeAudioMenu = function(){
    let pDom ;
        pDom = document.querySelectorAll("div#media p");
    while(Model.media.children.length>1){
       Model.media.removeChild(Model.media.lastElementChild);
    }
}

//切换媒体
Model.Dom.switch.onclick=function(){
    if(Model.isVideo){
        Model.Vid.nowvideo.pause();
        document.getElementById('video').style.display="none";// hidden隐藏视频，但是会占据页面的空间
        Model.createAudioMenu();
    }
    else{
        Model.Vid.nowaudio.pause();
        Model.removeAudioMenu();        
        document.getElementById('video').style.display="inline";
    }
    Model.isVideo = !Model.isVideo;
}

//每隔500调整视频宽度和媒体播放进度
window.setInterval(function(){
    Model.media.style.height = document.body.clientHeight/2 + 'px'; 
    if(Model.isVideo){
        Model.showMediaNum(Model.Vid.vino) ;
        Model.currentTimeDom.textContent = parseInt(Model.Vid.nowvideo.currentTime) + ' s' + '/' + parseInt(Model.Vid.nowvideo.duration) + ' s'
    }
    else{
        Model.showMediaNum(Model.Vid.auno) ;
        Model.currentTimeDom.textContent = parseInt(Model.Vid.nowaudio.currentTime) + ' s' + '/' + parseInt(Model.Vid.nowaudio.duration) + ' s'
    }
} , 100);