
function $( v ){
	if(typeof v === 'function'){
		window.onload = v;
	}else if(typeof v === 'string'){
		return document.getElementById( v );
	}else if(typeof v === 'object'){
		return v;
	}
}



function getStyle( obj,attr,int ){
	var arr = '';
	for(var i=0; i<attr.length; i++){
		if(attr[i] != ' ')
			arr += attr[i];
	}

	var outCome = obj.currentStyle ? obj.currentStyle[arr] : getComputedStyle(obj)[arr];
	if( int ){
		outCome = parseInt(outCome);
	}

	return outCome;
} 



function $class(typeEle,attr){
	var oChild = document.getElementsByTagName(typeEle);
	var arr = [];
	for(var i=0; i<oChild.length; i++){
		if( oChild[i].className == attr ){
			arr.push(oChild[i]);
		}

	}


	return arr;

}




function getAttrEle( eleType , parentEle , attrType , attr ){

	var eles = null,
		arr = [];

	if( parentEle ){
		eles = parentEle.getElementsByTagName(eleType);
	}else{
		eles = document.getElementsByTagName(eleType);
	}


	for(var i=0; i<eles.length; i++){
		if( eles[i].getAttribute(attrType) === attr ){
			arr.push(eles[i]);
		}
	}

	return arr;

}





function getSiEle( ele , v ){


	//-1代表查找前一个兄弟元素，1代表查找后一个兄弟元素
	//开始查找前判断本元素是不是第一个元素或最后一个元素，如果是返回false
	//开始查找

	if( v === -1 ){
		v = 'previousSibling'; 

		if( ele.parentNode.children[0] == ele ){
			return false;
		}

	}

	if( v === 1 ){
		v = 'nextSibling';

		if( ele == ele.parentNode.children[ ele.parentNode.children.length-1 ] ){
			return false;
		}

	}


	
	var theParent = ele[v];
	while( theParent.nodeType != 1 ){
		theParent = theParent[v];
	}
	return theParent;
	


	
}


//重新包装一下
function insertBefore( newEle , targetEle ){

	targetEle.parentNode.insertBefore( newEle , targetEle );

}


//向targetEle后面插入一个元素节点
function insertAfter( newEle , targetEle ){

	var tNextSibling = targetEle.nextSibling;
	var targetEleParent = targetEle.parentNode;

	if( tNextSibling ){
		targetEleParent.insertBefore( newEle , tNextSibling );
	}else{
		targetEleParent.appendChild( newEle );
	}

}



//上移
function moveUp( ele ){
	var tSiEle = getSiEle( ele , -1 );

	if( !tSiEle ){
		return false;
	}

	ele.parentNode.insertBefore( ele , tSiEle );
	return true;

}


//下移
function moveDown( ele ){
	var tSiEle = getSiEle( ele , 1 );

	if( !tSiEle ){
		return false;
	}

	insertAfter( ele , tSiEle );
	return true;

}








function createDOMstruct(json,onOff,pUl,i){
//这个函数还是有点问题，例如，i++ i--,这些动作太多了
//onOff设置要不要缩进

	if( i == null ){
		var i = -2;
	}

	if( pUl == null ){
		var pUl = document.createElement('ul');
	}

	i++;

	for(var attr in json){

		if(typeof json[attr] === 'string' ){

			if( attr === 'h2' ){
				var eH2 = document.createElement('h2');
				var eSpan = document.createElement('span');
				eSpan.setAttribute('class','eSpan');
				eSpan.innerHTML = json[attr];
				eH2.appendChild(eSpan);
				( onOff ) && ( eH2.style.paddingLeft = 10*i + 'px' );
				pUl.appendChild(eH2);
			}else{
				var eLi = document.createElement('li'),
					eA = document.createElement('a');
					eA.setAttribute('href','javascript:;');
					eLi.appendChild(eA);
					eLi.style.display = 'none';
				eA.innerHTML = json[attr];
				( onOff ) && ( eLi.style.paddingLeft = 10*i + 'px' );
				pUl.appendChild(eLi);
			}


		}


		if(typeof json[attr] === 'object'){
			var pLi = document.createElement('li');
				pLi.style.display = 'none';
			pUl.appendChild(pLi);
			var eUl = document.createElement('ul');
				eUl.setAttribute('grade',++i);
				i--;
			pLi.appendChild(eUl);
			createDOMstruct(json[attr],onOff,eUl,i);

		}
	}	
	i--;
	return pUl;
}





//找父级函数

function getParentByAttr( preEle , eleType , attrType , attr ){


	var parentEle = preEle.parentNode;
	

	while( true ){

		if( parentEle.nodeName == 'BODY' ){ return false; }


		if( parentEle.getAttribute( attrType ) == attr && parentEle.nodeName == eleType ){
			return parentEle;
		}

		parentEle = parentEle.parentNode;

	}

}










function getRandomNum( minS , maxS ){
	var choices = maxS - minS + 1;
	return Math.floor( Math.random() * choices + minS );
}








function getRGB(v,str){

	v = v.slice(1,7);


	var R = v.slice(0,2),
		G = v.slice(2,4),
		B = v.slice(4,6),
		rgb = '';


	R = parseInt( R , 16 );
	G = parseInt( G , 16 );
	B = parseInt( B , 16 );
	rgb = 'rgb('+R+','+G+','+B+')';


	var returnStr = null;


	switch(str){
		case 'R':
			returnStr = R+'';
			break;
		case 'G':
			returnStr = G+'';
			break;
		case 'B':
			returnStr = B+'';
			break;
		default:
			returnStr = rgb;
	}

	return returnStr;


}





//数组打乱方法



if( typeof Array.prototype.shuffle !== 'function' ){


	Array.prototype.shuffle = function(){
		//shuffle:洗牌
		//这个函数用来打乱数组


		var k = null,
			cArr = [],
			newArr = [];

		for(var i=0,len=this.length; i<len; i++){
			cArr[i] = this[i];
		}

		var cArrLen = cArr.length;

		while( cArrLen > 1 ){
			k = Math.floor( Math.random()*cArrLen );
			newArr.push( cArr.splice( k,1 )[0] );
			cArrLen = cArr.length;
		}

		newArr.push( cArr[0] );

		return newArr;

	}

}




function occupyHeight(ele){
	var h = getStyle(ele,'height',true) + 
			getStyle(ele,'paddingTop',true) + 
			getStyle(ele,'paddingBottom',true) +
			getStyle(ele,'borderTop',true) +
			getStyle(ele,'borderBottom',true) +
			getStyle(ele,'marginTop',true) +
			getStyle(ele,'marginBottom',true);
	return h;
}




function offsetToBODY(ele,TL){

	//计算指定元素到窗口顶部的距离
	
	if( TL != 'Left' && TL != 'Top' ){
		console.log('只能输入Top或Left');
		return;
	}


	var offset = 'offset' + TL;


	var cnt = ele[offset];
		outParent = ele.offsetParent;


	while( outParent ){

		//-------防止outParent是body，outParent.offsetParent为null的情况-----------//
		if( outParent.offsetParent && outParent.offsetParent.nodeName !== 'BODY' ){

			cnt += outParent[offset];
			outParent = outParent.offsetParent;

		}else{

			//-----当outParent有定位的父节点为null，outParent[offset]的值为0------------//
			cnt += outParent[offset];
			break;

		}

	}


	return cnt;

}










function deepCopy(v){

	var arr = null,
		obj = null,
		str = null;

	if( Array.isArray(v) ){
		//如果是数组



		arr = [];
		//遍历数组每一项
		for(var i=0,len=v.length; i<len; i++){


			//如果是数组
			if( Array.isArray(v[i]) ){
				arr[i] = copyData(v[i]);	//递归


			//如果是对象
			}else if( typeof v[i] === 'object' ){
				arr[i] = copyData(v[i]);	//递归


			//如果是字符串
			}else{
				arr[i] = v[i];				//简单赋值
			}



		}
		//返回数组，终止
		return arr;




	//如果是对象
	}else if( typeof v === 'object' ){

		obj = {};
		//枚举对象每一项
		for(var attr in v){


			//如果是数组
			if( Array.isArray(v[attr]) ){
				obj[attr] = copyData(v[attr]);		//递归


			//如果算是对象
			}else if( typeof v[attr] === 'object' ){
				obj[attr] = copyData(v[attr]);		//递归


			//如果是字符串
			}else{
				obj[attr] = v[attr];				//简单赋值



			}
		}
		//返回对象，终止
		return obj;




	//如果是字符串
	}else{
		//简单赋值
		str = v;
		return str;

	}




}



























function getParent(ele,eleType){


	var parent = ele.parentNode;

	while(parent && parent.nodeName !== eleType){
		parent = parent.parentNode;
	}

	return parent;

}









// 判断ele的父级是不是otherEle
function contains(ele,otherEle){

	var parent = ele.parentNode;
	var bool = false;

	while(parent){

		if( parent === otherEle ){
			bool = true;
			break;
		}else{
			parent = parent.parentNode;
		}

	}


	return bool;


}









function bindEvent(obj,eventName,fn,stopBubble){
	if(obj.addEventListener){
		obj.addEventListener(eventName,function(e){

			var e = e || event;
			fn.call(obj);
			if( stopBubble ){
				e.stopPropagation();
			} 
			

		},false);

	}else{

		obj.attachEvent('on'+eventName,function(e){

			var e = e || event;
			fn.call(obj);
			if( stopBubble ){
				e.cancelBubble = true;
			} 
			

		});

	}
}









function reEvent(obj,eventName,fn){

	if(obj.removeEventListener){
		obj.removeEventListener( eventName , fn , false );
	}else{
		obj.detachEvent( eventName , fn );
	}

}




function preventDefault(e,obj){


	if( e.preventDefault ){
		e.preventDefault();
	}else{
		obj.setCapture();
	}

}



function allowDefault(e,obj){

	if( obj.releaseCapture ){
		obj.releaseCapture();
	}

}





function getDocScroll(dir){

	if( dir === 'Top' || dir === 'Left' )
	var scroll = document.documentElement['scroll'+dir] || document.body['scroll'+dir];

	return scroll;

}










/* 过拽函数，传入待拖拽的元素，传入其父级表示限制在父级内拖动
   传入回调函数表示要调用碰撞检测函数，检测结果为true则执行回调函数*/
function drag( obj1 , obj1Parent , fn ){


	obj1.onmousedown = function(e){


		var e = e || event;

		var disX = e.clientX - obj1.offsetLeft,
			disY = e.clientY - obj1.offsetTop;

		var minX = null,
			maxX = null,
			minY = null,
			maxY = null;

		var collisionValue = false;


		var L = null,
			T = null;



		if( obj1Parent ){
			minX = 0;
			minY = 0;
			maxX = obj1Parent.clientWidth - obj1.offsetWidth;
			maxY = obj1Parent.clientHeight - obj1.offsetHeight;
		}



		document.onmousemove = function(e){

			var e = e || event;

			L = e.clientX - disX;
			T = e.clientY - disY;



			// 边缘检测
			if( obj1Parent ){

				if( L < minX ){
					L = minX;
				}else if( L > maxX ){
					L = maxX;
				}



				if( T < minY ){
					T = minY;
				}else if( T > maxY ){
					T = maxY;
				}

			}


			obj1.style.left =  L + 'px';
			obj1.style.top =  T + 'px';


			if( fn ){
				collisionValue = deCollision( obj1 , div1 , L , T );
			}


		}



		document.onmouseup = function(){

			// 恢复默认
			if( obj1.releaseCapture ){
				obj1.releaseCapture();
			}
			document.onmousemove = document.onmouseup = null;


			if( fn && collisionValue){
				fn();
			}
		}



		// 阻止浏览器默认拖拽行为
		if( obj1.setCapture ){
			// IE下
			obj1.setCapture();
		}else{
			// 标准下
			e.preventDefault();
		}

	}


}








/* 碰撞检测函数，要求传入被拖动的元素，被撞的元素，拖动元素的top值和left值
   一般要求两个元素有同一个定位父级*/
function deCollision( mainObj , minorObj , mainL , mainT ){

	var L1 = minorObj.offsetLeft,
		L2 = L1 + minorObj.offsetWidth;

	var T1 = minorObj.offsetTop,
		T2 = T1 + minorObj.offsetHeight;

	var returnValue = null;


	// 九宫格排除法
	if( mainL+mainObj.offsetWidth > L1 && mainL < L2 && mainT+mainObj.offsetHeight > T1 && mainT < T2 ){
		returnValue = true;
	}else{
		returnValue = false;
	}


	return returnValue;
}





var DOC = document;



function createNode(str){
	return document.createElement(str);
}


function createTextNode(str){
	return document.createTextNode(str);
}









function ajax(obj){

	var xhr = null;

	if( window.XMLHttpRequest ){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP')
	}


	var method = 'get',
		data = obj.data,
		url = obj.url,
		success = obj.success;

	( obj.type ) && ( method = obj.type );

	if(method == 'get' && data){

		url += '?' + data;

	}

	xhr.open(method,url,true);

	if( method == 'get' ){
		xhr.send();
	}else{
		xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		xhr.send(data);
	}


	xhr.onreadystatechange = function(){

		if( xhr.readyState == 4 ){

			if( xhr.status === 200 ){
				success && success( xhr.responseText );
			}else if( xhr.status === 404 ){
				alert( '出错了,Err:'+xhr.status );
			}
			
		}
	}

}




function css(obj,attr){

	if(obj.currentStyle){

		return obj.currentStyle[attr];

	}else{

		return getComputedStyle(obj,false)[attr];

	}

}