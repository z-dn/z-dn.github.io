  	var deviceWidth = document.body.clientWidth ;
    var deviceHeight = document.body.clientHeight ;
    var fontBase = parseInt(deviceWidth / 20);
	
    console.log('AppWidth:'+ deviceWidth);
    console.log('AppHeight:'+ deviceHeight);
	console.log('fontBase:'+ fontBase + 'px');
	document.body.style.fontSize = fontBase + "px" ;

	var lessonNameDom = document.getElementById("lessonName") ;
	var footerInfoDom = document.getElementById("footerInfo") ;