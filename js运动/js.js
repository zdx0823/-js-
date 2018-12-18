


function startMove(obj,json,fn){

	clearInterval(obj.iTimer);

	var iSpeed = 0;
	var iCur = 0;
		
	obj.iTimer = setInterval(function() {
		
		var tBtn = true;	// 用来判断所有属性是否都运动完成

		// 用for in循环来实现同时运动多项属性的功能，定时器每走一下就要把所有要运动的属性都推进一次
		for( var attr in json ){

			var iTarget = json[attr];



			/*

				这里处理一下运动属性的值，
					若是透明度最后处理成百分制来运算避免出现精度问题，
					若是宽高，left、top值这些就要去掉单位，因为currentStyle和getComputedStyle都是返回带单位的值
				**仅仅是对这两项进行判断就足以满足大部分2D运动了

			*/
			if( attr == 'opacity' ){
				iCur = Math.round( css( obj , 'opacity' ) * 100 );
			}else{
				iCur = parseInt( css(obj,attr) );
			}
			

			// 动态计算速度值:取一部分当前元素距离终点的距离值作为速度，实现缓冲的效果
			iSpeed = ( iTarget - iCur ) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);


			/*
				iCur表示当前的距离值，cur:current当前的意思
				如果当前属性还未到达终点则继续执行“累加”的动作，并且tBtn设为false
				如果当前属性到达终点则，则无动作tBtn为true
			*/
			if (iCur != iTarget) {
				tBtn = false;

				if( attr == 'opacity' ){
					obj.style.opacity = (iCur + iSpeed) / 100;
					obj.style.filter = 'alpha(opacity='+ (iCur+iSpeed) +')';
				}else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}

			}

		}




		/*

			若所有属性都到达终点，则上面的if判断不会通过，表示可以结束定时器了，同时判断是否有回调函数
			通过回调函数实现“链式运动”的效果

		*/
		if( tBtn ){
			clearInterval( obj.iTimer );
			fn && fn.call(obj);
		}

		
	}, 30);

}



