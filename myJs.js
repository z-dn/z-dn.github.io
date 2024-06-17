Plan.responsiveUI() ;
httpLoader.request("myData.json") ;
setTimeout(function(){
 //  按httpLoader模型的设计，textContent存放了获取的文本的字符串
   if(httpLoader._textContent.length > 1 ){
       loadData() ;
     }else{
     setTimeout(loadData(),3000); //针对极差的网络环境，再给第2次处理调入的数据的机会，若这次还无法调入，则说明用户网络状态无法运行本系统
    }
   function loadData(){
		let s = httpLoader._textContent ;
		Model.books = JSON.parse(s) ;
         let imgArr = [] ;
	  for (let book of Model.books ){
		imgArr.push(book.bookPage) ;
	   }
	  //console.log(imgArr);
	  Plan.loadImgOneByOne(imgArr) ;
	  Plan.addBookButtons() ;
   }
 },3000) ; //发出request("myData.json") 后，3s后第一次处理调入的数据

 

 
  document.body.onclick =document.body.ontouchstart = function(){
	UI.log($('book'), Model.books[0].name);
	
	$('main').replaceChild(UI.bookFace[0],$('bookFace')) ;
	$('bookFace').style.opacity = 0 ;
	setTimeout(function(){
		$('bookFace').style.opacity = 0.9 ;
	},200);
	
	Model.bookIndex = 0 ; //设置当前书的指针
	document.body.onclick = document.body.ontouchstart = null ; 
    Plan.createMyUI() ;
  }; //第一次点击软件，进入选择书本

Plan.createMyUI = function(){

  Model.mouse = {
	isDown: false ,
	x : 0 ,
	deltaX : 0 ,
	 } ;

  $('main').addEventListener("mousedown", function(ev){
    ev.preventDefault() ;
	console.log("mouse is down! ");
    Model.mouse.isDown = true ;
	Model.mouse.x = ev.pageX ;
   }) ;
  $('main').addEventListener("mousemove", function(ev){
	ev.preventDefault() ;
   let mouse = Model.mouse ;
   if (mouse.isDown && Math.abs($('bookFace').offsetLeft) < UI.deviceWidth / 5){
	   console.log("认可的 mouse事件： down and moving");
	   mouse.deltaX = ev.pageX - mouse.x ;
	   $('bookFace').style.left = $('bookFace').offsetLeft + mouse.deltaX + 'px' ;
	   mouse.deltaX = 0 ;
   } //end if mouse.isDown
  }) ; //'main'.addEventListener("mousemove")
  
  $('main').addEventListener("mouseup",function(ev){
	ev.preventDefault() ;
   	let mouse = Model.mouse ;
	    mouse.isDown = false ;
	let mini = parseInt(UI.deviceWidth/5) ;
	let offsetLeft =  $('bookFace').offsetLeft ;
	 if( Math.abs(offsetLeft) > mini){
 		if( offsetLeft > mini){
			 Model.prevBook();
		}else{
			if( offsetLeft < - mini ){
             Model.nextBook() ;
			}
		}
        mouse.x = 0 ;
      //下面的if逻辑，保障了在13张书页图全部加载完成前，不作书的切换。代码在慢速网络环境下，若遇到用户的快速滑动，就不会出现书的逻辑和封面的匹配问题！
		if(Model.books.length >1 && UI.bookFace.length == Model.books.length){ 
		 this.removeChild($('bookFace')) ;
		 this.appendChild(UI.bookFace[Model.bookIndex]) ;
		}

		bookFace.style.opacity =  '0.1' ;
      setTimeout(function(){ 
		$('bookFace').style.left =  '0px' ;
		$('bookFace').style.opacity =  '0.9' ;
      },200); 
	}else{ //end if Math.abs(mouse.deltaX) > mini,else 则需要书图回归原位
		setTimeout(function(){ 
			$('bookFace').style.left =  '0px' ;
	    },200); 
	 }
   }) ;       //'main'.addEventListener("mouseup")


//------触屏模型定义和处理函数---------
    Model.touch = {
	target: null ,
	x0: 0 ,
	deltaX : 0 ,
	} ; //Model.touch定义完毕

	   $('main').addEventListener("touchstart",function(e){
	       	   e.preventDefault();
	          let touch = Model.touch ;
	           touch.target = e.touches[0].target ;
	           touch.x0 = e.touches[0].pageX ;
	           console.log("touch start at:("+ touch.x0 + ', ' + e.touches[0].pageY + ")")  ;
	    }); //$('main').addEventListener("touchstart"...

	   $('main').addEventListener("touchend", function(e){
	     e.preventDefault();
	   let eTouch = e.changedTouches ;
       let touch = Model.touch ;
	       touch.x0 = 0 ;
	   let mini = UI.deviceWidth / 3 ;
        //需要书图回归原位的条件
	   if (touch.deltaX <= mini && touch.deltaX >= -mini ){
		  $('bookFace').style.opacity =  '0.9' ;
          setTimeout(function(){ 
			 $('bookFace').style.left =  '0px' ;
	      },200);
		  return ;
	    }
	      if (touch.deltaX > mini){
			  Model.nextBook() ;
	      }
          if (touch.deltaX < -mini ){
			  Model.prevBook() ;
          }
		 //下面的if逻辑，保障了在13张书页图全部加载完成前，不作书的切换。代码在慢速网络环境下，若遇到用户的快速滑动，就不会出现书的逻辑和封面的匹配问题！
         if(Model.books.length >1 && UI.bookFace.length == Model.books.length){
		  this.removeChild($('bookFace')) ;
		  this.appendChild(UI.bookFace[Model.bookIndex]) ;
		 }
		
		 $('bookFace').style.opacity =  '0.1' ;
        setTimeout(function(){ 
		  $('bookFace').style.left =  '0px' ;
		  $('bookFace').style.opacity =  '0.9' ;
        },200); 
	    touch.deltaX = 0 ;
	  }); //$('main').addEventListener("touchend",...

	   $('main').addEventListener("touchmove",  function (e){
	     e.preventDefault();
	    let eTouch = e.changedTouches[0] ;
	    let touch = Model.touch ;
	   	let x = parseInt(eTouch.pageX);
		touch.deltaX = x - touch.x0 ;
		if (Math.abs(touch.deltaX) < UI.deviceWidth / 2 ) {
		    $('bookFace').style.left =  touch.deltaX + 'px' ;
		  }
       }); //$('main').addEventListener("touchmove", ...

	
	



//“打开本书”按钮发生的事件，编写代码如下：
 $('handleBook').addEventListener("click",  function (e){
	e.preventDefault();
	if( !Model.bookIsOpen){
		 setTimeout(() => {
			$('bookFace').style.display = 'none' ;
			$('handleBook').textContent = "关闭本书" ;
		 }, 200);

  let book = Model.books[Model.bookIndex] ;
		Model.bookIsOpen = true ;
		$('mediaUI').style.display = 'block' ;
     
  if(book.type === 'video'){ 
	playVideoBook() ;
  }  //视频书结束。

  if(book.type === "audio"){
	playAudioBook() ;
  }//音频书结束。

function playVideoBook(){
	let videos = book ;
	let i = Model.fileIndex ;
	UI.log($('book'),"播放NO."+(i+1)+" / "+videos.files.length+"号视频！") ;
 //本版代码把mp3和mp4资源文件全部上传至远程服务器，需要对接远程，作必要的改动和调试代码的响应！
    let url = videos.remote + videos.URL  + videos.files[i] ;
	mediaPlayer($('myV') , url) ;
  } //end of function playVideo()

function playAudioBook(){
	let audios = book ; 
	let i = Model.fileIndex ;
	UI.log($('book'),"进入 Part "+(i+1)+" / "+audios.files.length+"的学习！") ;
	let url = audios.remote + audios.URL + audios.files[i] ;
	 mediaPlayer($('myA') , url) ;
	 
	 let chapters =  audios.chapters[i] ? audios.chapters[i] : [];
	 $('bookMenu').style.display = 'block' ;  
	let dadDom = $("bookMenu") ;
		dadDom.textContent = "" ;
	if( chapters.length){
		for(let chapter of chapters){
		 liDom = document.createElement('li') ;
		 let duration = chapter.end - chapter.begin ;
		 liDom.textContent = chapter.title + ' 【'+duration+'秒】';
         liDom.onclick = liDom.ontouchstart = function(){
			console.log('click '+chapter.title + '!');
			$('myA').currentTime = chapter.begin ;
			this.className = "choice" ;
		 };
		 dadDom.appendChild(liDom);
	  }
	 }else{
		dadDom.textContent = "遗憾，本书暂无教学音频 ！" ;
	 }
  }//end of function playAudio()

  function mediaPlayer(mediaDom , url){  
		mediaDom.style.display = 'block' ;     
		mediaDom.src = url ; //这条语句将开启音视频漫长的加载过程
	 //为计算和反馈音视频的响应时间，在此我们使用新建立的timer模型
	     timer.begin('mediaLoad:' + url)
	     //timer.begin('mediaMeta') ;
	     mediaDom.addEventListener('loadedmetadata',function(){
		  //console.log("读取media元数据时间：" + 	timer.end('mediaMeta') +'ms!' );
		  let m = Math.floor(this.duration/60) ;
		  let s = Math.ceil(this.duration - parseInt(this.duration/60)*60) ;
		  let bak = $('statusInfo').textContent ;
		  UI.log($('statusInfo'),'本教学音/视频长度为: '+ m +' 分钟 '+ s + ' 秒 ！');
		  setTimeout(() => {
			  UI.log($('statusInfo'), bak) ; 
		  }, 20000);
	
		}); //获取了视频的元数据信息
	   
		mediaDom.addEventListener('canplaythrough',function(){
		  let costTime =  timer.end('mediaLoad:' + url)  ;
		//在console后台调试时，timer.end只有在读第一次视频时不会报错，而随着媒体文件跳转增多，报错的次数也依次增加，这通过timer.history属性可以很清楚的到结论：调用每次切换媒体时，调用timer.end次数与跳转媒体的次数相同。或许这点非常让人困惑，我们在逻辑上只能推断系统对系统缓存过的媒体文件都会产生 canplaythrough 事件。
		  UI.log($('statusInfo'), '您等了 ' + costTime + ' 毫秒完成教学音/视频加载，可点Play播放了！');
		  
		  this.style.width = UI.deviceWidth + 'px' ;
		 
		  Model.clock = setInterval(() => {
			  let leftTime  = 0 ;
			  if(mediaDom.duration && mediaDom.currentTime){ //加上这个条件，是适应低网速和大尺寸的媒体，避免频繁输出NaN信息间隔时间，造成duration输出造成用户困惑的问题
			    leftTime = parseInt(mediaDom.duration - mediaDom.currentTime) ;
			   }
			  UI.log($('duration'), leftTime + ' s ');
			 }, 1000);
		}); //End canplaythrough
  	  } //end of mediaPlayer function
	
	$('playPause').onclick = $('playPause').ontouchstart = function(){
		let mediaDom = null ;
		if(book.type === "video"){
			mediaDom = $("myV") ;
		}
		if(book.type === "audio"){
			mediaDom = $("myA") ;
		}
		if(!Model.videoIsPlaying){
		 	  mediaDom.play() ;
			  this.textContent = "暂 停" ;
			  Model.videoIsPlaying = true;
			  UI.log($('statusInfo'),  '教学音/视频正在播放！');
			 }else{
			  mediaDom.pause() ;
			  this.textContent = "播 放" ;
			  Model.videoIsPlaying = false;
			  UI.log($('statusInfo'),  '教学音/视频已经暂停！');
			}
		 $('duration').textContent = parseInt(mediaDom.duration) + ' s' ;
		} ; //按移动互联网节省流量的标准，把确定播放/暂停视频的权力交给用户

     $("prevMedia").onclick = $("prevMedia").ontouchstart = function(){
       //上一级的变量book已经存放了当前的书对象
	   let files = book.files ;
	    if(Model.fileIndex > 0 ){
			Model.fileIndex -- ;
		  }else{
			  Model.fileIndex = files.length - 1 ;
		  }
		 console.log("Prev Media Button clicked!") ;
		 if(book.type =="video"){
			playVideoBook();
		 }
		 if(book.type == "audio"){
			playAudioBook();
		 }
		 $('playPause').textContent = "播 放" ; 
	 };
	 $("nextMedia").onclick = $("nextMedia").ontouchstart = function(){
		console.log("Next  Media Button clicked!") ;
		let files = book.files ;
		   if(Model.fileIndex < files.length -1){
              Model.fileIndex ++ ;
			}else{
				Model.fileIndex = 0 ;
			}
		  if(book.type =="video"){
				playVideoBook();
			 }
		  if(book.type == "audio"){
				playAudioBook();
			 }
		  $('playPause').textContent = "播 放" ;
	 };

	} else//end if !Model.bookIsOpen
	      { //下面的代码模块处理关闭本书的逻辑
			setTimeout(() => {
				$('bookFace').style.display = 'block' ;
				$('handleBook').textContent = "打开本书" ;
			 }, 200);
			Model.bookIsOpen = false ;
			$('myV').src = "" ;
			$('myA').src = "" ;
			Model.fileIndex = 0 ;
			$('playPause').textContent = "Play | Pause" ;
			$('myV').style.display = 'none' ;
			$('bookMenu').textContent = '' ;
			$('mediaUI').style.display = 'none' ;
			//离开本书，关闭显示 duration的动态显示
			clearInterval(Model.clock);
			Model.clock = null ;

			setTimeout(function(){
				UI.log($('statusInfo'), " CopyRight from 李健宏 江西科技师范大学 2022--2025" );
			},5000);
		  } //end  if Model.bookIsOpen
   },true); //$('handleBook').addEventListener("click" 。。。 最后这个true参数很重要，让该click事件不再传递到父元素main上
   
   $('downloadBook').addEventListener("click",function(){
  	  let book = Model.books[Model.bookIndex] ;
	if(book.type=="audio" ){
	 let url = book.URL + book.pdf ;
	 window.open(url,target="_BLANK") ;
	 UI.log($('statusInfo'),"系统在另一个窗口打开了本书PDF版！");
	}else{
	  UI.log($('statusInfo'),"抱歉，系统无法提供本书的PDF文件！");
	}
   });
   $('aboutBook').addEventListener("click",function(){
		console.log("介绍本书内容！");
		UI.log($('statusInfo'),"请打开本书，听听第一段音频即可！");
   });   
}//最大的函数createMyUI结束，该函数把所有增加用户交互功能的代码打包