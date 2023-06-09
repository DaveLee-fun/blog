/**
* @fileOverview Javascript Utility 모음
* @author AjaxUI Lab.
*/

/**
* 전달인자로 받은 elOldElement와 동일한 엘리먼트를 생성 후 그 내용을 sNewHTML로 채워서 반환
* 새로 생성된 엘리먼트는 elOldElement의 id와 class 속성값을 그대로 유지한다.
* @name		replaceHTML
* @function
* @param 	{HTML Element} 	elOldElement 	변경 이전 대상 엘리먼트
* @param 	{String} 			sNewHTML 	변경 시 사용할 HTML 문자열
* @returns 	{HTML Element} 				새로운 HTML로 변경된 엘리먼트 
* @example
* <style>.sample_position {position:absolute; top:200px; left:-500px; width:200px; height:100px; border:1px solid #00FF00;}</style>
*
* <div id="sample_code" style="border:1px solid #FF0000;" class="sample_position"></div>
*
* <script type="text/javascript">
* 	var elOldElement = document.getElementById("sample_code");
* 	var sNewHTML = "<div style=\"position: relative; top:10px; left:10px; width:100px; height:50px; border:1px solid #0000FF;\"></div>";
* 	var elNewElement = replaceHTML(elOldElement, sNewHTML);
* </script>
*
* // 결과: elNewElement는 아래와 같습니다.
* // <div id="sample_code" class="sample_position">
* // 	  <div style=\"position: relative; top:10px; left:10px; width:100px; height:50px; border:1px solid #0000FF;\"></div>
* // </div>
*/
function replaceHTML(elOldElement, sNewHTML){
	if(!elOldElement || !elOldElement.nodeName){
		return;
	}
	var elNewElement = document.createElement(elOldElement.nodeName);
	if(elOldElement.id){
		elNewElement.id = elOldElement.id;
	}
	if(elOldElement.className){
		elNewElement.className = elOldElement.className;
	}
	elNewElement.innerHTML = sNewHTML || "";
	elOldElement.parentNode.replaceChild(elNewElement, elOldElement);
	
	return elNewElement;
}

/**
* sString 내 공백(2개 이상)을 <a href="http://www.w3schools.com/tags/ref_entities.asp" target="entitycode">HTML Entity Code</a>로 변경하여 반환
* @name		replaceWhiteSpace
* @function
* @param 	{String} 	sString 	원본 문자열
* @returns 	{String} 			변경된 문자열
* @see		restoreWhiteSpace
* @see		restoreAllSpecialChar
* @example
* replaceWhiteSpace() or replaceWhiteSpace(123)
* // 결과: ""
*
* //공백이 하나인 경우
* replaceWhiteSpace("example code") 
* // 결과: example code
*
* //공백이 두개인 경우
* replaceWhiteSpace("example  code") 
* // 결과: example&amp;nbsp;&amp;nbsp;code
*
* //공백이 세개인 경우
* replaceWhiteSpace("example   code")
* // 결과: example&amp;nbsp;&amp;nbsp; code
*/
function replaceWhiteSpace(sString){
	return (typeof(sString) == "string") ? sString.replace(/\s{2}/g, "&nbsp;&nbsp;") : "";
}

/**
* sString 내 <a href="http://www.w3schools.com/tags/ref_entities.asp" target="entitycode">HTML Entity Code</a>로 된 공백문자를 일반 공백으로 변경하여 반환
* @name 		restoreWhiteSpace
* @function
* @param 	{String} 	sString 	원본 문자열
* @returns 	{String} 			변경된 문자열
* @see		restoreAllSpecialChar
* @see 		replaceWhiteSpace
* @example
* restoreWhiteSpace() or restoreWhiteSpace(123)
* // 결과: ""
*
* restoreWhiteSpace("example&amp;nbsp;code") 
* // 결과: example code
*/
function restoreWhiteSpace(sString){
	return (typeof(sString) == "string") ? sString.replace(/\&nbsp\;/g, " ") : "";
}

/**
* sString 내 달러($) 문자를 <a href="http://www.w3schools.com/tags/ref_entities.asp" target="entitycode">HTML Entity Code</a>로 변경하여 반환
* @name		replaceDollarSign
* @function
* @param 	{String} 	sString 	원본 문자열
* @returns 	{String} 			변경된 문자열
* @see		restoreAllSpecialChar
* @example
* replaceDollarSign() or replaceDollarSign(123)
* // 결과: ""
*
* replaceDollarSign("It's $100")
* // 결과: It's &amp;#36;100
*/
function replaceDollarSign(sString){
	return (typeof(sString) == "string") ? sString.replace(/\$/g, "&#36;") : "";
}

/**
* 문자열(sString) 내 5개의 특수문자(", ', &, <, >)를 <a href="http://www.w3schools.com/tags/ref_entities.asp" target="entitycode">HTML Entity Code</a>로 변경하여 반환
* @name		replaceSpecialChar
* @function
* @param 	{String} 	sString 	원본 문자열
* @returns 	{String} 			변경된 문자열
* @see		restoreSpecialChar
* @see		restoreAllSpecialChar
* @example
* replaceSpecialChar() or replaceSpecialChar(123)
* // 결과: ""
*
* replaceSpecialChar("&quot;, ', &, <, >")
* // 결과: &amp;quot;, &amp;#39;, &amp;amp;, &amp;lt;, &amp;gt;
*/
function replaceSpecialChar(sString){
	return (typeof(sString) == "string") ? (sString.replace(/\&/g, "&amp;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/</g, "&lt;").replace(/\>/g, "&gt;")) : "";
}

/**
* 문자열(sString) 내 <a href="http://www.w3schools.com/tags/ref_entities.asp" target="entitycode">HTML Entity Code</a>로 된 특수문자 5개를 원래의 문자(", ', &, <, >)로 변경하여 반환
* @name		restoreSpecialChar
* @function
* @param 	{String} 	sString 	원본 문자열
* @returns 	{String} 			변경된 문자열
* @see		replaceSpecialChar
* @see		restoreAllSpecialChar
* @example
* restoreSpecialChar() or restoreSpecialChar(123)
* // 결과: ""
*
* restoreSpecialChar("&amp;quot;, &amp;#39;, &amp;amp;, &amp;lt;, &amp;gt;")
* // 결과: ", ', &, <, >
*/
function restoreSpecialChar(sString){
	return (typeof(sString) == "string") ? (sString.replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">")) : "";
}

/**
* 전달인자로 받은 문자열(sString) 내 모든 <a href="http://www.w3schools.com/tags/ref_entities.asp" target="entitycode">HTML Entity Code</a>를  innerHTML/innerText 의 상호작용을 이용하여 원래의 문자로 변경 후 반환
* 전달인자로 HTML을 넣을 경우 innerText로 인해 HTML을 제외한 Text만 반환한다. 
* @name		restoreAllSpecialChar
* @function
* @param 	{String} 	sString 	HTML Entity Code가 포함된 문자열
* @returns 	{String} 			원래의 문자로 변경된 Text 문자열(HTML 제외)
* @see		replaceSpecialChar
* @see		restoreSpecialChar
* @see		replaceDollarSign
* @see		replaceWhiteSpace
* @see		restoreWhiteSpace
* @example
* restoreAllSpecialChar("&amp;quot;, &amp;#39;, &amp;amp;, &amp;lt;, &amp;gt;, &amp;nbsp;, more...")
* // 결과: ", ', &, <, >, , more...
*
* restoreAllSpecialChar("&amp;#34;, &amp;#39;, &amp;#38;, &amp;#60;, &amp;#62;, &amp;#160;, more...")
* // 결과: ", ', &, <, >, , more...
*/
function restoreAllSpecialChar(sString){
	var elDummy = document.createElement('div');
	elDummy.innerHTML = sString;
	
	try{
		return elDummy.textContent || elDummy.innerText;
	}finally{
		elDummy = null;
	}
}
	
/**
* sString 내 모든 스크립트 블록을 제거하여 반환
* @name		stripScripts
* @function
* @param 	{String} 	sText  	원본 문자열
* @returns 	{String} 			스크립트가 제거된 문자열
* @see		extractScripts
* @see		evaluateScripts
* @see		stripHTML
* @example
* stripScripts() or stripScripts(123) 
* // 결과: ""
*
* stripScripts("<div><script>alert(1);</script></div>")
* // 결과: "<div></div>"
*
* stripScripts("<div><script type='text/javascript'>alert(2);</script></div>")
* // 결과: "<div></div>"
*/
function stripScripts(sString){
	return (typeof sString == "string") ? sString.replace(/<script[^>]*>([\S\s]*?)<\/script>/img, '') : "";
}

/**
* sString 내 모든 스크립트 블록을 추출하여 배열로 반환
* @name		extractScripts
* @function
* @param 	{String} 	sString 	원본 문자열
* @returns 	{Array} 			추출된 스크립트 블록이 담긴 배열
* @see 		stripScripts
* @see		evaluateScripts
* @example
* extractScripts()  or extractScripts(123) 
* // 결과: []
*
* extractScripts("<div><script>alert(1);</script></div>")
* // 결과: ["<script>alert(1);</script>"]
*
* extractScripts("<div><script type='text/javascript'>alert(2);</script></div>")
* // 결과: ["<script type='text/javascript'>alert(2);</script>"]
*
* extractScripts("<div><script>alert(3);</script><script type='text/javascript'>alert(4);</script></div>")
* // 결과: ["<script>alert(3);</script>", "<script type='text/javascript'>alert(4);</script>"]
*/
function extractScripts(sString){
	return (typeof sString == "string") ? (sString.match(/<script[^>]*>([\S\s]*?)<\/script>/img) || []) : [];
}

/**
* sString 내 모든 스크립트 블록을 추출하여 추출된 순서대로 그 내용을 실행
* @name		evaluateScripts
* @function
* @param 	{String} 	sString 	원본 문자열
* @requires 	extractScripts
* @see		stripScripts
* @see		extractScripts
* @example
* evaluateScripts("<div><script>alert(1);</script></div>")
* // 결과: alert(1) 실행
*
* evaluateScripts("<div><script type='text/javascript'>alert(2);</script></div>")
* // 결과: alert(2) 실행
*
* evaluateScripts("<div><script>alert(3);</script><script type='text/javascript'>alert(4);</script></div>")
* // 결과: alert(3) 실행 후 alert(4) 실행
*/
function evaluateScripts(sString){
	var arr = extractScripts(sString);
    var i = 0, nLen = arr.length;

    while(i < nLen){
        eval(arr[i].replace(/<(\/)?script[^>]*>/img,""));
        i++;
    }
}

/**
* sString 내 HTML 태그를 제거 
* @name 		stripHTML
* @function
* @param 	{String} 	sString 	원본 문자열
* @returns 	{String} 			원본 문자열에서 HTML태그를 제거한 문자열
* @see 		stripScripts
* @example
* stripHTML() or stripHTML(123)
* // 결과: ""
*
* stripHTML("<div>This is <strong>stripHTML</strong> Function</div>")
* // 결과: "This is stripHTML Function"
*/
function stripHTML(sString){
	return (typeof sString == "string") ? sString.replace(/<(?:.|\s)*?>/g, "") : "";
}

/**
* elRemoveElement 내 strong 태그를 삭제하고, elAddElement 내 strong 태그를 추가
* @name		addStrongTag
* @function
* @param 	{HTML Element} 	elAddElement strong 	태그를 추가할 엘리먼트
* @param 	{HTML Element} 	[elRemoveElement] 	strong 태그를 삭제할 엘리먼트
* @example
* <span id="text1">Text 1</span> : <span id="text2">Text 2</span>
*
* <script type="text/javascript">
* 	var elText1 = document.getElementById("text1");
* 	var elText2 = document.getElementById("text2");
*
*	// elText1 에 strong 태그 삽입
* 	addStrongTag(elText1);
* 	// 결과: <span id="text1"><strong>Text 1</strong></span> : <span id="text2">Text 2</span>
*
* 	// elText1 에 strong 태그 삭제 후 elText2 에 strong 태그 삽입
* 	addStrongTag(elText2, elText1);
* 	// 결과: <span id="text1">Text 1</span> : <span id="text2"><strong>Text 2</strong></span>
* </script>
*/
function addStrongTag(elAddElement, elRemoveElement){
	if(!!elRemoveElement && elRemoveElement.nodeName){
		elRemoveElement.innerHTML = elRemoveElement.innerHTML.replace(/<\/?strong>/gi, "");
	}
	if(elAddElement){
		var sNoStrongAddElement = elAddElement.innerHTML.replace(/<\/?strong>/gi, "");
		elAddElement.innerHTML = "<strong>" + sNoStrongAddElement + "</strong>";
	}
}

/**
* 지정한 selectbox에 option 항목 추가
* @name		addSelectboxOption
* @function
* @param 	{HTML Element} 	elSelectbox 		셀렉트박스 엘리먼트
* @param 	{String} 			sOptionText 		추가할 옵션의 text 값
* @param 	{String} 			sOptionValue 		추가할 옵션의 value 값
* @param 	{Boolean} 		[bOptionSelected] 	추가할 옵션을 선택된 상태로 할지 여부 (default: false, true: 선택, false: 선택 안함)
* @see		removeSelectboxOption
* @example
* <select id="sel"></select>
*
* <script type="text/javascript">
* 	var elSelect = document.getElementById("sel");
*
* 	// options[0]에 <option value="value1" selected="false">text1</option> 생성
*	addSelectboxOption(elSelect, "text1", "value1");		
*
*	// options[1]에 <option value="value2" selected="false">text2</option> 생성
*	addSelectboxOption(elSelect, "text2", "value2", false);
*
* 	// options[2]에 <option value="value3" selected="true">text3</option> 생성
*	addSelectboxOption(elSelect, "text3", "value3", true);
* </script>
*/
function addSelectboxOption(elSelectbox, sOptionText, sOptionValue, bOptionSelected){
	var elNewOption = new Option(sOptionText, sOptionValue, bOptionSelected || false);
	elSelectbox.options[elSelectbox.options.length] = elNewOption;
	elNewOption = null;
}

/**
* 지정한 selectbox에 option 항목 삭제
* @name		removeSelectboxOption
* @function
* @param 	{Element} 	elSelectbox 		셀렉트박스 엘리먼트
* @param 	{Number} 	[nOptionIndex] 	삭제할 옵션의 인덱스 값(선언하지 않을 경우 전체 삭제)
* @see		addSelectboxOption
* @example
* <select id="sel">
* 	<option value="value1">text1</option>	// options[0]
*	<option value="value2">text2</option>	// options[1]
*	<option value="value3">text3</option>	// options[2]
* </select>
*
* <script type="text/javascript">
*	var elSelect = document.getElementById("sel");
*
*	// options[1] 을 삭제
*	removeSelectboxOption(elSelect, 1); 
*
*	// 모든 options 를 삭제 => options.length = 0
*	removeSelectboxOption(elSelect); 
* </script>
*/
function removeSelectboxOption(elSelectbox, nOptionIndex){
    if(nOptionIndex){
		elSelectbox.options[nOptionIndex] = null;
	}else{
		elSelectbox.options.length = 0;
	}
}

/**
* sString을 nLength 만큼의 글자 수로 자른 후 끝에 sTail을 붙여 반환
* @name		cutString
* @function
* @param 	{String} 		sString 		원본 문자열
* @param 	{Number} 	nMaxLength 	수정할 최대 length 글자 수
* @param 	{String} 		[sTail] 		수정 후 끝에 붙일 문자열 (default : "")
* @returns 	{String} 					수정된 문자열
* @see		cutStringByByte
* @see		cutStringByPixel
* @example
* cutString("abcde 가나다라마 12345", 10);
* // 결과: "abcde 가나다라"
*
* cutString("abcde 가나다라마 12345", 10, "...");
* // 결과: "abcde 가나다라..."
*/
function cutString(sString, nMaxLength, sTail){
	var sSource = (typeof sString != "String") ? sString.toString() : sString;
	var nLimit = parseInt(nMaxLength, 10);
	var sAdd = sTail || "";
	
	return (sSource.length > nLimit) ? sSource.substring(0, nLimit) + sAdd : sSource;
}

/**
* sString을 nMaxByte 만큼의 크기로 자른 후 끝에 sTail을 붙여 반환
* @name 		cutStringByByte
* @function
* @param 	{String} 		sString 		원본 문자열
* @param 	{Number} 	nMaxByte 	수정할 최대 byte 크기
* @param 	{String} 		[sTail] 		수정 후 끝에 붙일 문자열
* @returns 	{String} 					수정된 문자열
* @see		cutString
* @see		cutStringByPixel
* @see		cutFilenameByByte
* @example
* cutStringByByte("abcde 가나다라마 12345", 10);
* // 결과: "abcde 가나"
* 
* cutStringByByte("abcde 가나다라마 12345", 10, "...");
* // 결과: "abcde 가나..."
*
* cutStringByByte("abcde 가나다라마 12345", 9, "..."); 	// 2byte 문자 중간에 짤리는 경우
* // 결과: "abcde 가..."
*/
function cutStringByByte(sString, nMaxByte, sTail){
	var sSource = (typeof sString != "String") ? sString.toString() : sString;
	var nLimit = parseInt(nMaxByte, 10);
	var sAdd = sTail || "";
	
	for(var i = 0, nLen = sSource.length, nCurrentByte = 0; i < nLen; i++){
		nCurrentByte += (sSource.charCodeAt(i) > 128) ? 2 : 1;
		if (nCurrentByte > nLimit){
			return sSource.substring(0, i) + sAdd;
		}
	}
	
	return sSource;
}

/**
* sString  + sTail을 nMaxPixel 만큼의 넓이로 자른 후 반환
* @name		cutStringByPixel
* @function
* @param 	{String} 		sString 		원본 문자열
* @param 	{Number} 	nMaxPixel 	수정할 최대 pixel 크기
* @param 	{String} 		[sTail] 		수정 후 끝에 붙일 문자열 (default : "")
* @returns 	{String} 					수정된 문자열
* @requires 	Jindo.$Element
* @see		cutString
* @see		cutStringByByte
* @example
* cutStringByPixel("abcde 가나다라마 12345", 100)
* // 결과: "abcde 가나다"
*
* cutStringByPixel("abcde 가나다라마 12345", 100, "...")
* // 결과: "abcde 가나..."
*/
function cutStringByPixel(sString, nMaxPixel, sTail){
	var sSource = (typeof sString != "String") ? sString.toString() : sString;
	var nLimit = parseInt(nMaxPixel, 10);
	var sAdd = sTail || "";
	var aResultString = [];
	var sTmpChat = "";
	
	if(!this.welMeasure){
		this.welMeasure = jindo.$Element("<span>");
		this.welMeasure.css({"position":"absolute", "top" : "-1000px", "left":"-1000px"});
		this.welMeasure.prependTo(document.body);
	}else{
		this.welMeasure.empty();
	}
	
	sSource = sSource.replace(/\r?\n/gim, " "); 
	
	for(var i = 0, nLen = sSource.length; i < nLen; i++){
		sTmpChat = sSource.charAt(i);				
		
		if(sTmpChat === " "){
			aResultString.push(";");
		}else{
			aResultString.push(sTmpChat);
		}
		
		this.welMeasure.text(aResultString.join("") + sAdd);
		
		if(this.welMeasure.width() > nLimit){
			return sSource.substring(0,(aResultString.length-1)) + sAdd;
		}
		
	}
	
	return sSource;
}

/**
* oObject의 생성자 이름을 반환
* @name		getConstructorName
* @function
* @param 	{Object} 	oObject 	생성자 명을 추출할 객체
* @returns 	{String} 			생성자 이름 (없을 경우: null )
* @example
* getConstructorName(true);
* // 결과: null
*
* getConstructorName(true);
* // 결과: "Boolean"
*
* getConstructorName(100);
* // 결과: "Number"
*
* getConstructorName("aaa");
* // 결과: "String"
*
* getConstructorName(["a","b", 1]);
* // 결과: "Array"
*
* getConstructorName({a:"a", b:"b", c:1});
* // 결과: "Object"
*
* getConstructorName(function(){});
* // 결과: "Function"
*/
function getConstructorName(oObject){
	if(oObject && oObject.constructor){
		var sCode = oObject.constructor.toString();
		var aMatch = sCode.match(/function ([^\(]*)/);
		return (aMatch && aMatch[1]) || null;
	}
	return null;
}

/**
* oObject 객체를 복제한 새로운 객체를 반환
* @name		cloneObject
* @function
* @param 	{Object} 	oObject 	복제할 대상 객체
* @returns 	{Object} 			복제된 새로운 객체
* @requires 	getConstructorName
* @example
* // 리터럴 객체를 복제
* var oSource = {
*	aa : 100,
*	bb : true,
* 	cc : [1, 2, 3],
*	dd : {dda : 1, ddb : "2"},
*	ee : function(){ alert(1); } 
* }
* var oClone = cloneObject(oSource);
* oClone.ee();		//alert(1)이 실행됨
*
* // Function의 인스턴스 복제
* var fSource = function(){
* 	this.aa = "a";
* 	this.bb = function(){ alert(1); }
* }
* fSource.prototype.cc = function(){ alert(2); }
* var insClone = cloneObject(new fSource());
* insClone.bb();  	// alert(1)이 실행됨
* insClone.cc();  	// alert(2)이 실행됨
*
* // 주의: 복제는 구성이 같아질 뿐 두 객체가 동일한 것은 아니다.(oSource != oClone)
*/
function cloneObject(oObject){
	var sConstructor;
    var oDestinationTarget;
			
    if(oObject && typeof oObject == "object" && (sConstructor = getConstructorName(oObject))){
		oDestinationTarget = eval("new " + sConstructor + "()");
		for(var key in oObject){
			oDestinationTarget[key] = arguments.callee(oObject[key]);
		}
    }else{
		oDestinationTarget = oObject;
	}
	
    return oDestinationTarget;
}

/**
* aMaybeArray가  실제 배열인지 여부를 반환
* @name		isArray
* @function
* @param 	{Object} 		oMaybeArray 		배열 여부를 체크할 객체
* @returns 	{Boolean} 					배열인지 여부 (true: 배열, false: 배열 아님)
* @example
* isArray({a:1, b:2});		//전달인자가 Object인 경우
* isArray(elSelectbox.options); 	// 전달인자가 Collection 인 경우
* // 결과: false
*
* isArray([1, 2, 3]);
* isArray(new Array(1, 2, 3));
* // 결과: true
*/
function isArray(oMaybeArray){   
    return Object.prototype.toString.call(oMaybeArray) == '[object Array]';   
}

/**
* 전달인자로 받은 두 객체의 구성 요소가 같거나 두번재 전달인자가 첫번째 전달인자를 모두 포함하고 있는지 여부를 반환
* @name isEqualObject
* @function
* @param {Object} oBase 기준 객체
* @param {Object} oComparison 비교 객체
* @returns {Boolean} 비교 결과 (true: 동일, false: 상이)
* @example
* var oBase = {a:1, b:{ba:1, bb:2}};
* var oComparison = {a:1,  {ba:1, bb:2}};
* var oComparison2 = {a:1, {ba:1, bb:2}, c:2};
* var oComparison3 = {a:2, {ba:1, bb:2}};
*
* isEqualObject(undefined, oComparison)
* isEqualObject(oBase, undefined) 
* // 결과: false
*
* isEqualObject(oBase, oComparison)
* isEqualObject(oBase, oComparison2)
* // 결과: true
*
* isEqualObject(oBase, oComparison3)
* // 결과: fasle
*/
function isEqualObject(oBase, oComparison){
	if(!oBase || !oComparison){
		return false;
	}
	for(var x in oBase){
		if(oBase[x] instanceof Object){
			if(!this.isEqualObject(oBase[x], oComparison[x])){
				return false;
			}
		}else{
			if(oBase[x] != oComparison[x]){
				return false;
			}
		}
	}
	return true;
}

/**
* sTemplate 내 템플릿 문자(/temp/)가 있다면 htObject의 구성요소 중 동일한 키에 해당하는 값으로 변경하여 반환
* @name		makeTemplate
* @function
* @param 	{String} 		sTemplate 	템플릿 문자(/temp/)가 포함된 문자열
* @param 	{Hash Table} 	htObject 		템플릿 문자들이 키로 구성된 "키:값" 형태의 오브젝트
* @returns 	{String} 					변경된 문자열
* @example
* var sHTML = "<span id='{tmp_id}'>{tmp_name}</span>";
* var htData = {tmp_id : "span_1", tmp_name : "AjaxUI Lab", tmp_desc : "UI Development"};
* var htData2 = {tmp_id : "span_1"};
*
* makeTemplate(sHTML, htData);
* // 결과: "<span id='span_1'>AjaxUI Lab</span>"
*
* makeTemplate(sHTML, htData2);
* // 결과: "<span id='span_1'></span>"
*/
function makeTemplate(sTemplate, htObject){
	return sTemplate.replace(/{([^{}]*)}/g, 
		function (a, b){
			var r = htObject[b] || "";
			return r; 
		}
	);
}

/**
* 표준 Date Format(yyyy-mm-dd 또는 yyyy-mm-dd hh:mm:ss)을 Javascript의 Date 객체로 변경하여 반환
* @name		changeJavascriptDate
* @function
* @param 	{String} 	sNormalDate 	"yyyy-mm-dd" 또는 "yyyy-mm-dd hh:mm:ss" 형식의 문자열
* @returns 	{Date} 				Javascript의 Date 객체
* @see		changeDateFormat
* @example
* var dDate = changeJavascriptDate("2009/11/04");	//전달인자 포멧이 맞지 않은 경우
* // 결과: null
*
* var dDate = changeJavascriptDate("2009-11-04");
* //결과: (IE)Wed Nov 04 00:00:00 UTC+0900 2009 / (FF)Wed Nov 04 2009 00:00:00 GMT+0900
*
* var dDate = changeJavascriptDate("2009-11-04 12:30:00");
* // 결과: (IE)Wed Nov 04 12:30:00 UTC+0900 2009  / (FF)Wed Nov 04 2009 12:30:00 GMT+0900 
*
* // 참고: dDate.constructor == Date
*/
function changeJavascriptDate(sNormalDate){
	var dReturnDate = null;
	var aValue = sNormalDate.match(/^([0-9]{4,})-([01][0-9])-([0-3][0-9]) ([0-2][0-9]):([0-5][0-9]):([0-5][0-9])/);
	
	if(aValue === null){
		aValue = sNormalDate.match(/^([0-9]{4,})-([01][0-9])-([0-3][0-9])/);
		if(aValue !== null){
			dReturnDate = new Date(aValue[1], Number(aValue[2])-1, aValue[3]);
		}
	}else{
		dReturnDate = new Date(aValue[1], Number(aValue[2])-1, aValue[3], aValue[4], aValue[5], aValue[6]);
	}
	
	return dReturnDate;
}

/**
* Javascript의 Date 객체를 주어진 옵션에 맞게 Format을 변경하여 반환
* @name		changeDateFormat
* @function
* @param 	{Date} 		dJavascriptDate 	Javascript의 Date 객체
* @param 	{Hash Table} 	[htOption] 		포멧 변경 시 사용될  옵션
* @returns 	{String} 						Format이 변경된 날짜 문자열
* @see		changeJavascriptDate
* @example
* // htOption 상세 설명
* htOption.format 			- 반환 시 Format을 문자열로 정의한다.
* 	기본값	- "{yyyy}/{mm}/{0d} {0H}:{0i}"
*	{yyyy}  	- 년도를 4자리로 나타냄.
* 	{yy}		- 년도를 뒤에 2자리로 나타냄.
* 	{mm}	- monthFormat에 정해진대로 나타냄.
* 	{dd}		- 일이 2자리일 경우에 2자리,1자리일 경우 1자리로 나타냄.
* 	{0d}		- 일을 1자리일 경우 0을 붙여 무조건 2자리로 나타냄.
* 	{ww}	- weekFormat에 정해진대로 나타냄.
* 	{ap}		- ampmFormat에 정해진대로 나타냄.
* 	{hh}		- 1~12시로 2자리일 경우에 2자리,1자리일 경우 1자리로 나타냄.
* 	{0h} 		- 1~12시로 1자리일 경우 0을 무조건 2자리로 나타냄.
* 	{HH} 	- 0~24시로 2자리일 경우에 2자리,1자리일 경우 1자리로 나타냄.
* 	{0H}		- 0~24시로 1자리일 경우 0을 무조건 2자리로 나타냄.
* 	{ii}		- 0~59분으로 2자리일 경우에 2자리,1자리일 경우 1자리로 나타냄.
* 	{0i}		- 0~59분으로 1자리일 경우 0을 무조건 2자리로 나타냄.
* 	{ss}		- 0~59초으로 2자리일 경우에 2자리,1자리일 경우 1자리로 나타냄.
* 	{0s}		- 0~59초으로 1자리일 경우 0을 무조건 2자리로 나타냄
* htOption.monthFormat 	-  월을 나타낼 때 쓰일 Format을 배열로 정의한다.
* 	기본값	- ["01","02","03","04","05","06","07","08","09","10","11","12"]
* htOption.weekFormat - 주를 나타낼 때 쓰일 Format을 배열로 정의한다.
* 	기본값 	- ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
* htOption.ampmFormat 	- AM/PM을 나타낼 때 쓰일 Format을 배열로 정의한다.
*	기본값 	- ["am","pm"] 
* @example
* changeDateFormat(new Date());
* // 결과: "2009/11/04 13:00"
*
* changeDateFormat(new Date(), {
*	format : "{yyyy}년 {mm}월 {dd}일 {ww}요일 {ap} {hh}시 {ii}분 {ss}초", 
*	monthFormat : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
*	weekFormat : ["월", "화", "수", "목", "금", "토", "일"],
*	ampmFormat : ["오전", "오후"]
* });
* // 결과: "2009년 11월 4일 수요일 오후 1시 3분 5초"
*/
function changeDateFormat(dJavascriptDate, htOption){
	if(arguments.length < 1) {
		return false;
	}
	if (!(dJavascriptDate.constructor == Date || dJavascriptDate.constructor == Date())){
		return false;
	}
	
	var options = {
		format		: "{yyyy}/{mm}/{0d} {0H}:{0i}",
		monthFormat : ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
		weekFormat	: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
		ampmFormat	: ["am", "pm"]
	};
	htOption = htOption || {};
	for(var i in htOption){
		options[i] = htOption[i];
	}

	options["rowData"] = [dJavascriptDate.getFullYear()+"",
						dJavascriptDate.getMonth(),
						dJavascriptDate.getDate(),
						dJavascriptDate.getDay(),
						dJavascriptDate.getHours() < 12 ? 0 : 1,
						dJavascriptDate.getHours(),
						dJavascriptDate.getMinutes(),
						dJavascriptDate.getSeconds()];
	// Sunday 처리
	if(options["rowData"][3] === 0){
		options["rowData"][3] = 7;
	}
	
	return options.format.replace(/\{([^{}]*)\}/g, function(type){
		var coptions = options;

		function addZero(num){
			return (num >= 10) ? num : "0" + num;
		}
		function twelveNotation(num){
			return (num > 12) ? num - 12 : num;
		}
		var rowData = coptions.rowData;
		var monthFormat = coptions.monthFormat;
		var weekFormat = coptions.weekFormat;
		var ampmFormat = coptions.ampmFormat;

		return type == "{yyyy}" && rowData[0] ||
				type == "{yy}" && rowData[0].slice(2,4) ||
				type == "{mm}" && monthFormat[rowData[1]] ||
				type == "{dd}" && rowData[2] ||
				type == "{0d}" && addZero(rowData[2]) ||
				type == "{ww}" && weekFormat[rowData[3]-1] ||
				type == "{ap}" && ampmFormat[rowData[4]] ||
				type == "{hh}" && twelveNotation(rowData[5]) ||
				type == "{HH}" && rowData[5] ||
				type == "{0h}" && addZero(twelveNotation(rowData[5])) ||
				type == "{0H}" && addZero(rowData[5]) ||
				type == "{ii}" && addZero(rowData[6]) ||
				type == "{0i}" && addZero(rowData[6]) ||
				type == "{ss}" && rowData[7] ||
				type == "{0s}" && addZero(rowData[7]) || "'" + type + ":undefined type'";

	});
}

/**
* sNumberString이 순수한 숫자의 조합인지 여부를 반환
* @name		isNumberOnly
* @function
* @param 	{String} 	sNumberString 	검사하려는 문자열
* @returns 	{Boolean} 				결과 (true: 모두 숫자, false: 하나이상이 숫자가 아님) 
* @see 		changeNumberFormat
* @example
* isNumberOnly(12345);
* isNumberOnly("12345");
* // 결과: true
*
* isNumberOnly("123.45");
* isNumberOnly("-12345");
* // 결과: false
*/
function isNumberOnly(sNumberString){
	if (/^[\d]+$/.test(sNumberString)){
		return true;
	}

	return false;
}

/**
* 전달인자로 받은 문자열(String)이 undefined 또는 null 또는 빈 문자열인지 여부를 반환
* @name 		isEmpty
* @function
* @param 	{String} 	sString 	검사하려는 문자열
* @returns 	{Boolean} 		결과 (true: undefined or null or 빈 문자, false: 빈 문자가 아님) 
* @example
* isEmpty(undefined)
* isEmpty(null);
* isEmpty(""); 		//빈 문자
* // 결과: true
*
* isEmpty("  "); 	//공백 문자(space bar)
* isEmpty("aaa");
* // 결과: false
*/
function isEmpty(sString){
	if(sString && sString.length > 0){
		return false;
	}
	
	return true;
}

/**
* sString의 앞/뒤 공백을 제거하여 반환
* @name		trim
* @function
* @param 	{String} 	sString 	원본 문자열
* @returns 	{String} 			앞/뒤 공백이 제거된 문자열
* @example
* trim();
* trim(undefined);
* // 결과: undefined
*
* trim(null);
* // 결과: null
*
* trim(111); 	//전달인자의 type이 String이 아닌 경우
* // 결과: ""
*
* trim(" abcde 12345 ")
* // 결과: "abcde 12345"
*/
function trim(sString){
	if(!sString){
		return sString;
	}
	
	return (typeof sString == "string") ? sString.replace(/^\s+/g, "").replace(/\s+$/g, "") : "";
}

/**
* sEmail이 전체 이메일 주소로 유효한 값인지 여부를 반환
* @name		isEmail
* @function
* @param 	{String} 		sEmail 	검사하려는 전체 이메일 주소 문자열
* @returns 	{Boolean} 			결과 (true: 유효한 값, false: 잘못된 값)
* @requires 	trim
* @see		isEmailFirst
* @see		isEmailLast
* @example
* isEmail(123);
* isEmail("@test.com");
* // 결과: false
*
* isEmail("test@test.com");
* isEmail("test.test@test.co.kr");
* isEmail("-!#$%&'*+\/^_~{}@-!#$%&'*+\/^_~{}.com");
* // 결과: true
*/
function isEmail(sEmail){
	var sEmailTrim = (typeof sEmail == "string") ? trim(sEmail) : "";
	var aResult = sEmailTrim.match(/[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)*@[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+(\.[-!#$%&'*+\/^_~{}|0-9a-zA-Z]+)+/);
	
	if(aResult && aResult[0] == sEmailTrim){
		return true;
	}else{
		return false;
	}
}

/**
* sEmailFirst가 이메일 중 @ 앞부분의 값으로 유효한지 여부를 반환
* @name		isEmailFirst
* @function
* @param 	{String} 		sEmailFirst 	검사하려는 이메일 주소 중 @ 앞부분의 문자열
* @returns 	{Boolean} 				결과 (true: 유효한 값, false: 잘못된 값)
* @see		isEmailLast
* @see		isEmail
* @example
* isEmailFirst(undefined);
* isEmailFirst(null);
* isemailFirst("test#test");  // 특수문자는 hyphen(-), underbar(_), dot(.)만 가능하다.
* //결과: false
*
* isEmailFirst("Test.1-2_3");
* // 결과: true
*/
function isEmailFirst(sEmailFirst){
	var rxEmailFirst = /^[\w\d]+([-_\.]?[\w\d])*$/i;
	if(sEmailFirst && rxEmailFirst.test(sEmailFirst)){
		return true;
	}
	return false;
}

/**
* sEmailLast가 이메일 중 @ 뒤부분의 값으로 유효한지 여부를 반환
* @name		isEmailLast
* @function
* @param 	{String} 		sEmailLast 	검사하려는 이메일 주소 중 @ 뒷부분의 문자열
* @returns 	{Boolean} 				결과 (true: 유효한 값, false: 잘못된 값)
* @see		isEmailFirst
* @see		isEmail
* @example
* isEmailLast(undefined);
* isEmailLast(null);
* isEmailLast("test#test");  // 특수문자는 hyphen(-), underbar(_), dot(.)만 가능하다.
* isEmailLast("test.cokr");  // 마지막 dot(.) 다음 문자의 자리수는 2~3자리만 가능하다. 
* //결과: false
*
* isEmailLast("Test.1-2_3.co.kr");
* // 결과: true
*/
function isEmailLast(sEmailLast){
	var rxEmailLast = /^[\w\d]([-_\.]?[\w\d])*\.[\w]{2,3}$/i;
	if(sEmailLast && rxEmailLast.test(sEmailLast)){
		return true;
	}
	return false;
}

/**
* sPhone(02-1234-5678)가 전화번호(핸드폰 포함) 값으로 유효한지 여부를 반환
* @name		isPhone
* @function
* @param 	{String} 		sPhone 	검사하려는 전화번호 문자열 (구분자는 "-"를 사용)
* @returns 	{Boolean} 			결과 (true: 유효한 값, false: 잘못된 값)
* @example
* isPhone(undefined);
* isPhone(null);
* // 결과: false
*
* isPhone("010-1234-5678");	// 지역번호는 0으로 시작하며 2~3자리수, 국번은 0이 아닌 수로 시작하며 3~4자리수, 나머지 번호는 4자리의 숫자여야 한다.
* // 결과: true
*/
function isPhone(sPhone){
	var rxPhone = /^0\d{1,2}-[1-9]\d{2,3}-\d{4}$/;
	if(sPhone && rxPhone.test(sPhone)){
		return true;
	}
	return false;
}

/**
* sIP가 IP 주소로 유효한 값인지 여부를 반환
* @name		isIP
* @function
* @param 	{String} 		sIP 	검사하려는 IP 주소 문자열
* @returns 	{Boolean} 		결과 (true: 유효한 값, false: 잘못된 값)
* @example
* isIP(undefined);
* isIP(null);
* // 결과: false
*
* isIP("255.255.255.255");
* // 결과: true
*/
function isIP(sIP){
	var rxIP = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4]\d|[01]?\d\d|\d)\.(25[0-5]|2[0-4]\d|[01]?\d\d|\d)\.(25[0-5]|2[0-4]\d|[01]?\d\d|\d)$/;
	if(sIP && rxIP.test(sIP)){
		return true;
	}
	return false;
}

/**
* sURL이 URL로 유효한 값인지 여부를 반환
* @name		isURL
* @function
* @param 	{String} 		sURL 	검사하려는 URL 문자열
* @returns 	{Boolean} 			결과 (true: 유효한 값, false: 잘못된 값)
* @example
* isURL("http://www.naver.com/?q=test#top")
* // 결과: true (가능 프로토콜: http, https, ftp, mailto, mms)
*
* isURL("www.naver.com/?q=test#top")
* // 결과: false
*
* isURL("http://naver")
* // 결과: false
*/
function isURL(sURL){
	var rxURL = /^(http|https|ftp|mailto|mms):(?:\/\/)?((\w|-)+(?:[\.:@](\w|-))+)(?:\/|@)?([^"\?]*?)(?:\?([^\?"]*?))?$/;
	if(sURL && rxURL.test(sURL)){
		return true;
	}
	return false;
}

/**
* sString 문자열 중 sBefore와 일치하는 모든 문자(열)을 sAfter 문자(열)로 변경하여 반환 (대/소문자 구분)
* @name		replaceAll
* @function
* @param 	{String} 	sString 	원본 문자열
* @param 	{String} 	sBefore 	변경하고 싶은 기존 문자(열)
* @param 	{String} 	sAfter 	변경 시 사용할 대체 문자(열)
* @returns 	{String} 			변경 완료된 문자열
* @example
* replaceAll("This is replaceAll function", "i", "#");
* // 결과: "Th#s #s replaceAll funct#on"
*
* replaceAll("This is replaceAll function", "is", "#");
* // 결과: "Th# # replaceAll function"
*/
function replaceAll(sString, sBefore, sAfter){
	return (typeof sString == "string") ? sString.replace(new RegExp(sBefore, "g"), sAfter) : "";
} 

/**
* sString 문자열 중 새 줄(\n)을 제거하여 반환
* @name		removeNewline
* @function
* @param 	{String} 	sString 	원본 문자열
* @returns 	{String} 			새 줄이 제거된 문자열
* @see		replaceNewline
* @example
* removeNewline(undefined);
* removeNewline(null);
* removeNewline(123);
* // 결과: ""
*
* removeNewline("Line1\\nLine2");
* //결과: "Line1Line2"
*/
function removeNewline(sString){
	return (typeof sString == "string") ? sString.replace(/\r/gi, "").replace(/\n/gi, "") : "";
}

/**
* sHTMLString 내 br, p 태그를 새 줄(\n)로 변경하여 반환
* @name		replaceNewline
* @function
* @param 	{String} 	sHTMLString 	원본 문자열
* @returns 	{String} 				변경된 문자열
* @see		removeNewline
* @example
* replaceNewline(undefined);
* replaceNewline(null);
* replaceNewline(123);
* // 결과: ""
*
* replaceNewline("Line1&lt;p>Line2&lt;br>&lt;br/>Line3&lt;/p>Line4");
* // 결과: "Line1\\nLine2\\n\\nLine3\\nLine4"
*/
function replaceNewline(sHTMLString){
	return (typeof sHTMLString == "string") ? sHTMLString.replace(/<br\s?\/?>/gi, "\n").replace(/<\/?p>/gi, "\n") : "";
}

/**
* sChar 문자를 escape처리 후 byte 크기를 반환
* @name		getCharByte
* @function
* @param 	{String} 		sChar 	검사하려는 문자
* @returns 	{Number} 			byte 크기
* @see		getStringByte
* @example
* getCharByte(undefined)
* getCharByte(null)
* // 결과: 0
*
* getCharByte("1")
* getCharByte("a")
* getCharByte(" ")
* // 결과: 1
*
* getCharByte("아")
* // 결과: 2
*/
function getCharByte(sChar){
	if(!sChar){
		return 0;
	}
		
	var nByteSize = 0;
	var str = escape(sChar);
	
	if(str.length == 1){
		nByteSize++;
	}else if(str.indexOf("%u") != -1){
		nByteSize += 2;
	}else if(str.indexOf("%") != -1){
		nByteSize += str.length/3;
	}
	
	return nByteSize;
}

/**
* sString 문자열의 각 문자를 escape 처리 후 byte 크기를 계산하여 총합을 반환
* @name		getStringByte
* @function
* @param 	{String} 		sString 	검사하려는 문자열
* @returns 	{Number} 			총 byte 크기
* @requires  	getCharByte
* @see		getCharByte
* @example
* getStringByte(undefined);
* getStringByte(null);
* getStringByte(123);
* // 결과: 0
*
* getStringByte("test 테스트");
* // 결과: 11
*/
function getStringByte(sString){
	var sSource = (typeof sString == "string") ? sString : "";
	var sByte = 0;
	var sChar = "";
	var sLen  = sSource.length;
	
	for (i=0; i<sLen; i++){
		sChar = sSource.charAt(i);
		sByte += getCharByte(sChar);
	}
	
	return sByte;
}

/**
* 확장자를 포함한 전체 파일명(sFileName)이 nMaxByte 보다 크면 순수 파일명만 그 크기 만큼 자른 후 sTail을 붙여 반환(확장자는 항상 노출)
* @name 		cutFilenameByByte
* @function
* @param 	{String} 		sFileName 	원본 파일명(확장자 포함)
* @param 	{Number} 	nMaxByte 	수정할 최대 Byte 크기
* @param 	{String} 		[sTail] 		순수 파일명을 수정 후 끝에 붙일 문자열 (default: "") 
* @returns 	{String} 					수정된 문자열
* @requires 	getStringByte
* @see		cutStringByByte
* @see		getFileSize
* @example
* cutFilenameByByte("longFileName.txt", 0, "...") ;  //maxByte가 0인 경우
* // 결과: "longFileName.txt"
*
* // 파일명 총 byte 크기 - (nMaxByte - 확장자명 총 byte 크기) = 노출될 파일명 총 byte 크기
* cutFilenameByByte("longFileName.txt", 10, "...") ; 
* // 결과: "longFil...txt"
*
* cutFilenameByByte("longFileName.txt", 2, "...") ;  //maxByte가 확장자명 총 Byte 크기 보다 작은 경우
* // 결과: "...txt"
*
* cutFilenameByByte("longFileName", 10, "...") ;  //확장자가 없는 경우
* // 결과: "longFileNa..."
*/
function cutFilenameByByte(sFileName, nMaxByte, sTail){
	var sSourceFileName = sFileName || "";
	var sAddTail = sTail || "";
	var nCutSize = parseInt(nMaxByte, 10);
	if(nCutSize < 1 || nCutSize >= getStringByte(sSourceFileName)){
		return sSourceFileName;
	}
	
	var aToken = sSourceFileName.split(".");
	var nTokenLength = aToken.length;
	var sFileExt = "";
	var nFileExtSize = 0;
	if(nTokenLength > 1){
		sFileExt = aToken[nTokenLength - 1];
		nFileExtSize = getStringByte(sFileExt);
		aToken.pop();
		sSourceFileName = aToken.join(".");
	}
	var nTailSize = 0;
	if(sAddTail != ""){
		nTailSize = getStringByte(sAddTail);
	}
	
	var nSize = nTailSize + nFileExtSize;
	if(nCutSize > nSize){
		nCutSize -= nSize;
	}else{
		sSourceFileName = "";
	}
	
	for(var i=0, nResultSize=0, nFileNameLength=sSourceFileName.length; i < nFileNameLength; i++){
		nResultSize += getCharByte(sSourceFileName.charAt(i));
		if(nResultSize > nCutSize){
			sSourceFileName = sSourceFileName.substring(0,i);
			break;
		}
	}
	return sSourceFileName + sAddTail + sFileExt;
}

/**
* nMaxLength 길이 만큼 sElements 문자열의 요소들로 랜덤한 문자열을 만들어 반환
* @name		makeRandomString
* @function
* @param 	{Number} 	[nMaxLength] 	반환할 문자열의 길이 (default: 10)
* @param 	{String} 		[sElements] 	요소로 사용할 문자열 (default: 숫자+영문 대/소문자)
* @returns 	{String} 					수정된 문자열
* @example
* makeRandom();
* // 결과: ""
*
* makeRandom(10);
* // 결과: SZUHa5V1vp	--> 	default (0~9, 영문 대/소문자)를 요소로 10자리의 랜덤 문자열을 반환
*
* makeRandom(5, "0123456789");
* // 결과: 10286 	--> 	0~9 문자를 요소로 5자리의 랜덤 문자열를 반환
*/
function makeRandomString(nMaxLength, sElements){
	var string_length = nMaxLength || 0;
	var chars = sElements || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var randomstring = "";
	for(var i=0; i<string_length; i++){
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

/**
* byte단위의 파일 크기 값을 알맞은 단위 값으로 환산하여 반환 (최소단위: 1KB)
* @name		getFileSize
* @function
* @param 	{Number} 	nByte 	byte단위의 값
* @returns 	{String} 				환산된 값(파일 단위 포함)
* @see		cutFilenameByByte
* @example
* getFileSize(0);
* // 결과: 0KB 		--> 전달인자가 0, null, undefined 이면 "0KB"로 반환
*
* getFileSize(1);
* // 결과: 1KB		--> 전달인자가 1024(byte) 이하는 모두 "1KB"로 반환
* 
* getFileSize(1025);	
* // 결과: 2KB		--> 반환 값의 단위가 KB 이면 소수점 첫째자리를 올림처리한다.
*
* getFileSize(10000000000);
* // 결과: 9.32GB 	--> 반환 값의 단위가 MB 이상이면 소수점 셋째 자리를 올림처리한다.
*/
function getFileSize(nByte){
	var nByteSize = nByte || 0;
	var sRet= "", sUnit = "", nSize = 0;
	var aUnit = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
	var i = aUnit.length;
	
	if(nByteSize === 0){
		return nByteSize + aUnit[0];
	}
	
	while(i >= 0){         
		nSize = nByteSize / Math.pow(1024, i);
		if(Math.floor(nSize) > 0){
			if(i === 0){
				nSize = 1;
				sUnit = aUnit[i];
			}else{
				sUnit = aUnit[i-1];                                      
			}
			break;
		}
		i--;
	}

	if(sUnit == "KB"){
		sRet = Math.ceil(nSize) + sUnit;
	}else{
		var aMatch = String(nSize).match(/((\d*)\.(\d{0,2}))(\d)?/i);

		if(!aMatch[4] || Number(aMatch[4]) === 0){
			if(Number(aMatch[3]) === 0){
				sRet = String(aMatch[2]) + sUnit;
			}else{
				sRet = String(aMatch[1]) + sUnit;
			}
		}else{
			var nCeilSize = Math.round((Number(aMatch[1]) * 100) + 1) / 100;
			sRet = String(nCeilSize) + sUnit;
		}
	}

	return sRet;
}

/**
* 숫자형 문자열(vNumber)에 3자리 마다 콤마(,)를 찍어 반환
* @name		changeNumberFormat
* @function
* @param 	{String || Number} 	vNumber 	숫자 or 숫자형 문자
* @returns 	{String} 						콤마가 적용된 문자열
* @see		isNumberOnly
* @example
* changeNumberFormat(undefined); 
* // 결과: 0			-->  전달인자가 null인 경우도 동일
*
* changeNumberFormat(1000000);
* // 결과: 1,000,000 
*
* changeNumberFormat("1000.0000");
* // 결과: 1,000.0000	--> 소숫점 이하 숫자는 적용되지 않음
*
* changeNumberFormat("$1000.00");
* // 결과: $1,000.00 	--> 가능은 하나 권장하지 않음
*
* changeNumberFormat("abcde");
* // 결과: abcde 		--> 숫자형 문자가 아니면 그대로 반환
*/
function changeNumberFormat(vNumber){
	var sUnderNumber = "";
	var sNumberString = vNumber || 0;
	sNumberString = (typeof sNumberString != "String") ? String(sNumberString) : sNumberString;
		
	if(sNumberString.indexOf(".") > -1){
		var aNumber = sNumberString.split(".");
		sNumberString = aNumber[0];
		sUnderNumber = "." + aNumber[1];
	}
	
	return sNumberString.replace(/(\d)(?=(\d{3})+$)/igm, "$1,") + sUnderNumber;
}

/**
* 전달인자로 받은 경로 문자열(sPath)에서 마지막 폴더명을 반환 (경로에 파일명이 있을 경우 파일명을 반환하므로 경로에서 파일명을 제외한다.)
* @name		getFolderName
* @function
* @param 	{String} 	sPath 	파일명을 제외한 경로 문자열 
* @returns 	{String} 			추출된 폴더명
* @see		isUpperPath
* @see		getParentPath
* @example
* //판단 방식: 마지막 "/" 이후 문자열을 가져온다.(문자열이 없을 경우 이전 "/" 이후 문자열을 가져온다.)
* getFolderName("http://www.naver.com/naver/test");
* // 결과: "test"
*
* getFolderName("http://www.naver.com/naver/test/");
* // 결과: "test"
*
* getFolderName("http://www.naver.com/naver/test/index.html");
* // 결과: "index.html"  (파일명을 제외할 것)
*/
function getFolderName(sPath){
	return (typeof sPath == "string") ? sPath.match(/.*\/(.[^\/]*)\/?$/i)[1] : "";
}

/**
* sUpperPath가 sPath의 상위 폴더 경로인지 여부를 반환 (경로에 파일명이 있을 경우 잘못된 결과를 가져올 수 있으므로 경로에서 파일명을 제외한다.)
* @name		isUpperPath
* @function
* @param 	{String} 		sUpperPath 		상위 폴더 경로 문자열
* @param 	{String} 		sMaybeLowerPath 	하위 폴더인지 검사하려는 경로 문자열
* @returns 	{Boolean} 					상위 인지 여부 (true: 상위임, false: 상위가 아님)
* @requires 	Jindo.$S
* @see		getFolderName
* @see		getParentPath
* @example
* // 판단 방식: 두번째 전달인자가 첫번째 전달인자를 포함하는지 여부를 판단(첫 문자부터 일치해야 함.)
* isUpperPath("http://www.naver.com/naver/", "http://www.naver.com/naver/test/");
* // 결과: true
*
* // 두 전달인자가 동일한 값 or 위치일 경우 
* isUpperPath("http://www.naver.com/naver/", "http://www.naver.com/naver/");
* isUpperPath("http://www.naver.com/naver/", "http://www.naver.com/naver/index.html");
* // 결과: true
*
* // 두 전달인자가 동일한 위치이긴하나, "판단 방식"에 어긋나는 경우
* isUpperPath("http://www.naver.com/naver/", "http://www.naver.com/naver");
* // 결과: false
*/
function isUpperPath(sUpperPath, sMaybeLowerPath){
	var bIsUpper = false;
	var sRegexUpperPath = jindo.$S(sUpperPath).escapeRegex().$value();
	
	var sReg = new RegExp("^" + sRegexUpperPath,"i");
	var aMatch = sReg.exec(sMaybeLowerPath);
	
	if(aMatch){
		bIsUpper = true;
	}
	
	return bIsUpper;
}

/**
* 자신(sPath)의 부모 폴더 경로를 반환
* @name		getParentPath
* @function
* @param 	{String} 	sPath 	자신의 경로 문자열(절대경로/상대경로, 모든 프로토콜 사용 가능)
* @returns 	{String} 			부모 폴더의 경로 문자열
* @see		getFolderName
* @see		isUpperPath
* @example
* // 판단 방식: 마지막 "/" 이후 문자열을 제거한 경로는 가져온다.(문자열이 없을 경우 이전 "/" 이후 문자열을 제거한다.)
* getParentPath("/");  //Root 경로일 경우
* getParentPath("http://www.naver.com/");  //Root 경로일 경우
* //결과: ""
*
* getParentPath("http://www.naver.com/naver");
* // 결과: "http://www.naver.com/"
*
* getParentPath("http://www.naver.com/naver/test/");
* // 결과: "http://www.naver.com/naver/"
*
* getParentPath("http://www.naver.com/naver/test/index.html");
* // 결과: "http://www.naver.com/naver/test/" (주의: 잘못된 결과가 나오므로 파일명을 제외할 것)
*/
function getParentPath(sPath){
	var sParentPath = sPath.replace(/([^\/]*\/?)$/i, "");
	if(/^(\w*:\/{2,3})$/.test(sParentPath)){
		sParentPath = "";
	}
	
	return sParentPath;
}

/**
* 배열을 원하는 방식/기준으로  정렬 
* @name		sortArray
* @function
* @param 	{Array} 	aTargetArray 	원본 배열 
* @param 	{String} 	sSortType 	정렬 방식 (asc: 오름차순, desc: 내림차순)
* @param 	{String} 	[sFieldName] 	배열 요소가 Hash Table 형태일 때, 특정 필드(key)를 지정하면 그 것의 값(value)을 비교하여 정렬 
* @returns 	{Array} 				정렬이 된 배열
* @example
* // 일반 배열일 경우
* sortArray(["가", "1", "ab", "나", "a", "b", "3", "ac", "2", "다"], "asc");	// 오름차순 정렬
* // 결과: ["1", "2", "3", "a", "ab", "ac", "b", "가", "나", "다"]
*
* // Hash Table을 요소로하는 배열일 경우
* var aData = [
* 	{name: "c", value: "3"},
* 	{name: "b", value: "4"},
* 	{name: "a", value: "2"},
* 	{name: "d", value: "1"}
* ]
* sortArray(aData, "asc", "name"); 	// "name"필드를 기준으로 오름차순 정렬
* // 결과: [
* // 	{name: "a", value: "2"},
* // 	{name: "b", value: "4"},
* // 	{name: "c", value: "3"},
* // 	{name: "d", value: "1"}
* // ]
*/
function sortArray(aTargetArray, sSortType, sFieldName){
	var aSortedArray;
	var nTargetArrayLength = aTargetArray.length;
	var vCompareA, vCompareB;
	
	if(nTargetArrayLength / 2 < 1){
		// 배열의 길이가 1인 경우  그대로 return
		aSortedArray = aTargetArray;
	}else if(nTargetArrayLength / 2 == 1){
		// 배열의 길이가 2인 경우 정렬
		var nTemp;
		vCompareA = (sFieldName) ? aTargetArray[0][sFieldName] : aTargetArray[0] ;
		vCompareB = (sFieldName) ? aTargetArray[1][sFieldName] : aTargetArray[1];
		
		if(sSortType == "asc"){
			// 오름차순 정렬
			if(vCompareA > vCompareB){
				nTemp = aTargetArray[1];
				aTargetArray[1] = aTargetArray[0];
				aTargetArray[0] = nTemp;
			}
		}else{
			// 내림차순 정렬
			if(vCompareA < vCompareB){
				nTemp = aTargetArray[1];
				aTargetArray[1] = aTargetArray[0];
				aTargetArray[0] = nTemp;
			}
		}
		aSortedArray = [aTargetArray[0], aTargetArray[1]];
	}else{	
		// 배열의 길이가 3이상인 경우 이진트리 알고리즘 정렬
		var nMiddleIndex = Math.round(nTargetArrayLength / 2) - 1;
		var nLeftIndex = 0;
		var nRightIndex = 0;
		
		var aLeftArray = [];
		var aRightArray = [];
		
		if(sSortType == "asc"){		// 오름차순 정렬
			//큰수 우측으로 보냄
			for(var i = 0; i < nMiddleIndex; i++){
				vCompareA = (sFieldName) ? aTargetArray[i][sFieldName] : aTargetArray[i];
				vCompareB = (sFieldName) ? aTargetArray[nMiddleIndex][sFieldName] : aTargetArray[nMiddleIndex];
				if(vCompareA > vCompareB){	
					aRightArray[nRightIndex++] = aTargetArray[i];
				}else{
					aLeftArray[nLeftIndex++] = aTargetArray[i];
				}
			}
			//작은수 좌측으로 보냄
			for(var j = nMiddleIndex + 1; j < nTargetArrayLength; j++){
				vCompareA = (sFieldName) ? aTargetArray[j][sFieldName] : aTargetArray[j];
				vCompareB = (sFieldName) ? aTargetArray[nMiddleIndex][sFieldName] : aTargetArray[nMiddleIndex];
				if(vCompareA < vCompareB){
					aLeftArray[nLeftIndex++] = aTargetArray[j];
				}else{
					aRightArray[nRightIndex++] = aTargetArray[j];
				}
			}
		}else{						// 내림차순 정렬
			// 작은수 우측보냄
			for(var i = 0; i < nMiddleIndex; i++){
				vCompareA = (sFieldName) ? aTargetArray[i][sFieldName] : aTargetArray[i];
				vCompareB = (sFieldName) ? aTargetArray[nMiddleIndex][sFieldName] : aTargetArray[nMiddleIndex];
				if(vCompareA < vCompareB){
					aRightArray[nRightIndex++] = aTargetArray[i];
				}else{
					aLeftArray[nLeftIndex++] = aTargetArray[i];
				}
			}
			// 크거나같은수 죄측보냄
			for(var j = nMiddleIndex + 1; j < nTargetArrayLength; j++){
				vCompareA = (sFieldName) ? aTargetArray[j][sFieldName] : aTargetArray[j];
				vCompareB = (sFieldName) ? aTargetArray[nMiddleIndex][sFieldName] : aTargetArray[nMiddleIndex];
				if(vCompareA > vCompareB){
					aLeftArray[nLeftIndex++] = aTargetArray[j];
				}else{
					aRightArray[nRightIndex++] = aTargetArray[j];
				}
			}
		}
		
		//재귀정렬
		var nLeftArrayLength = aLeftArray.length;
		var nRigthArrayLength = aRightArray.length;
		var aLeft, aRight;
		if(nLeftArrayLength > 1){
			aLeft =  arguments.callee(aLeftArray, sSortType, sFieldName);
		}else{
			aLeft = aLeftArray;
		}
		
		if(nRigthArrayLength > 1){
			aRight =  arguments.callee(aRightArray, sSortType, sFieldName);
		}else{
			aRight = aRightArray;
		}
		
		aSortedArray = new Array(nLeftArrayLength + nRigthArrayLength - 1);
		var nSortedIndex = 0;
		for(var i = 0, nLeftLen = aLeft.length; i < nLeftLen; i++){
			aSortedArray[nSortedIndex++] = aLeft[i];
		}
		aSortedArray[nSortedIndex++] = aTargetArray[nMiddleIndex];
		for(var i = 0, nRightLen = aRight.length; i < nRightLen; i++){
			aSortedArray[nSortedIndex++] = aRight[i];
		}
	}

	return aSortedArray;
}

/**
* 페이지 내 Cookie 중 지정한 Cookie의 값을 반환 
* @name		getCookie
* @function
* @param 	{String} 	sName 	추출하고하는 Cookie의 Field Name
* @returns 	{String} 			해당 쿠키의 value 값
* @see		setCookie
* @example
* document.cookie = "testName=testValue";
*
* getCookie("testName");
* // 결과: "testValue"
*
* getCookie("testName2");
* // 결과: null
*/
function getCookie(sName){
	var ca = document.cookie.split(/\s*;\s*/);
	var re = new RegExp("^(\\s*"+sName+"\\s*=)");
	
	for(var i=0; i < ca.length; i++){
		if(re.test(ca[i])){
			return unescape(ca[i].substr(RegExp.$1.length));
		}
	}
	
	return null;
}

/**
* 페이지 내 Cookie에 지정한 Cookie 정보를 추가
* @name		setCookie
* @function
* @param 	{String} 		sName		추가할 Cookie의 Field Name
* @param 	{String} 		sValue 		추가할 Cookie의 Value 값
* @param 	{Number} 	[nDays] 		추가할 Cookie의 유효기간(단위: 일)
* @param 	{String} 		[sDomain] 	추가할 Cookie의 도메인
* @param 	{String} 		[sPath] 		추가할 Cookie의 경로
* @see		getCookie
* @example
* document.cookie = "";
*
* setCookie("testName3", "testValue3");
* setCookie("testName4", "testValue4", 1, document.domain,  "/");
* alert(document.cookie);
* // 결과: "testName3=testValue3;testName4=testValue4"
*/
function setCookie(sName, sValue, nDays, sDomain, sPath){
	var sExpire = "";
	
	if(typeof nDays == "number"){
		sExpire = ";expires="+(new Date((new Date()).getTime()+nDays*1000*60*60*24)).toGMTString();
	}
	if(typeof sDomain == "undefined"){
		sDomain = "";
	}
	if(typeof sPath == "undefined"){
		sPath = "/";
	}
	
	document.cookie = sName+"="+escape(sValue)+sExpire+"; path="+sPath+(sDomain?"; domain="+sDomain:"");
}

/**
* oDestination에 없는 oSource의 property만을 oDestination으로 확장하여 반환
* @name		extend
* @function
* @param 	{Object} 	oDestination 	확장할 Object
* @param 	{Object} 	oSource 		원본 Object
* @returns 	{Object} 				확장된 Object
* @example
* var oDestination = {aa : "1", bb : "2", cc : "3"};
* var oSource = {aa : "5", dd : "4"};
*
* extend(oDestination, oSource);
* // 결과: {aa : "1", bb : "2", cc : "3", dd : "4"}
* // --> {aa : "1"}과 같이 동일한 프로퍼티가 존재할 경우 덮어쓰지 않고 무시한다.
*/
function extend(oDestination, oSource){
	for(var name in oSource){
		if(typeof(oDestination[name]) == 'undefined'){
			oDestination[name] = oSource[name];
		}
	}
	return oDestination;
}

/**
* 전달인자로 받은 객체와 함수를 묶어 하나의 함수로 반환 (Jindo.$Fn을 사용하지 않고 단순한 binding을 하기 위한 함수)
* @name		bind
* @function
* @param 	{Object} 		oObject 	두번째 전달인자로 받은 함수(fFunc)에 this객체로 Binding하기 위한 object
* @param 	{Function} 	fFunc 	Binding하기 위한 대상 함수
* @returns 	{Function} 			Binding 된 함수
* @example
* var sReferName = "window object";
* var oObj = {sReferName : "oObj object", sDesc : "Description"};
* var fFunc = function(){ alert(this.sReferName); };
*
* fFunc();
* // 결과: "window object" 	--> this는 window를 가리킨다.
*
* (bind(oObj, fFunc))();
* // 결과: "oObj object" 		--> 바인딩된 함수(확장된 fFunc) 내에선 this 객체가 oObj 객체를 가리킨다.
*/
function bind(oObject, fFunc){
	var oSelf = oObject;
	return function(){
		return fFunc.apply(oSelf, arguments);
	};
}

/**
* 전달인자로 받은 엘리먼트(elElement)를 선택이 되지 않도록 설정
* @name		disableSelection
* @function
* @param 	{HTML Element} 	elElement 	선택되지 않도록 할 엘리먼트
* @requires 	Jindo.$Agent
* @example
* <div>DIV AREA<span id="span_1">SPAN AREA <span id="span_2">INNER_SPAN AREA</span></span></div>
*
* <script type="text/javascript">
*     disableSelection(document.getElementById("span_1"));
* </script>
* // 결과: span_1은 선택되어지지 않는다.
* // 참고: 주로, 드래그시 특정 엘리먼트가 선택되지 않도록 할 때 사용
* // 주의: IE,Opera와 같이 unselectable 속성으로 제어하는 경우 드래그 시작점이 상위/하위 엘리먼트일 때는 적용되지 않는다.
*/
function disableSelection(elElement){
	var oNavigator = jindo.$Agent().navigator();
	if(oNavigator.ie || oNavigator.opera){  
		elElement.unselectable = 'on';  
	}else if(oNavigator.safari || oNavigator.chrome){  
		elElement.style.KhtmlUserSelect = 'none';  
	}else{  
		elElement.style.MozUserSelect = '-moz-none';
	}  
}

/**
* 전달인자로 받은 레이어 엘리먼트(elElement)에 속성들(oAttr)을 추가 설정하여 반환 
* @name		setLayerAttrs
* @function
* @param 	{HTML Element} 	elElement 	속성을 추가할 대상 엘리먼트
* @param 	{Hash Table}  		htAttr 		추가할 속성/값
* @returns 	{HTML Element} 				속성이 추가된 엘리먼트
* @example
* var oEl = document.createElement("div");
* setLayerAttrs(oEl, {id : "div_1", style : {width: "100px"}});
* // 결과: <div id="div_1" style="width:100px;"></div>
*/
function setLayerAttrs(elElement, htAttr){
	for(var prop in htAttr){
		if(typeof htAttr[prop] != 'object'){
			elElement[prop] = htAttr[prop];
		}else{
			arguments.callee(elElement[prop], htAttr[prop]);
		}
	}
	return elElement;
}

/**
* 원본 문자열(sSource)이 지정한 길이(nLength)보다 작을 경우 부족한 길이 만큼 원본 문자열의 앞부분을 지정한 문자(sPadChar)로 채운다. 
* @name 		pad
* @function
* @param 	{String} 		sSource 		원본 문자열
* @param 	{Number} 	nLength 		결과 문자열의 길이
* @param 	{String} 		[sPadChar] 	부족한 길이를 채울 문자(default: 공백문자)
* @returns 	{String} 					수정된 문자열
* @example
* pad("1", 5);
* // 결과: "    1"(공백 4개)
* pad("1", 5, "0");
* // 결과: "00001"
*/
function pad(sSource, nLength, sPadChar){
	var sPad = sPadChar || " ";
	var sResult = sSource + "";

	if(sResult.length < nLength){
		var aStr = new Array((nLength - sResult.length) + 1);
		aStr[aStr.length - 1] = sResult;
		sResult = aStr.join(sPad);
	}
	
	return sResult;
}

/**
* 전달인자로 받은 셀렉터 문자열(sSelector)에 해당하는 CSS Style 객체를 반환
* @name		getCSSRule
* @function
* @param 	{String} 	sSelector 		셀렉터 문자열
* @returns 	{object} 				스타일 객체
* @example
* <style>
*     .sample {color : red;}
* </style>
*
* <span class="sample">one</span> 
* <span>two</span>
* <span class="sample">three</span>
* 
* <script type="text/javascript">
*     var oEmpty = getCSSRule("#empty");  
*     // #empty로 선언된 CSS Style 객체가 없을 경우 빈 CSS Style(#emplty {})을 만들어 Head 에 붙인 후 반환한다.
*
*     var oSample = getCSSRule(".sample");  // .sample로 선언된 CSS Style 객체를 반환
*     oSample.color = "blue";	// CSS Style의 내용을 변경
* </script>
*
* // 응용: 지정한 selector에 해당 하는 스타일 객체의 내용을 변경함으로써 selector에 해당하는 모든 엘리먼트의 스타일을 제어한다. 
*/
function getCSSRule(sSelector){
	var fpTry = function(sSelector){
		var aSheets = document.styleSheets;
		
		for(var i = aSheets.length - 1; i >= 0; i--){
			try{
				var oSheet = aSheets[i];
				var aRules = oSheet.cssRules || oSheet.rules;
				for(var j = aRules.length - 1; j >= 0; j--){
					var oRule = aRules[j];
					
					if (oRule.selectorText.toLowerCase() == sSelector.toLowerCase()){
						return oRule.style || null;
					}
				}
			}catch(e){
			}
		}
		
		return null;
	};
	
	var oStyle = fpTry(sSelector);
	if(oStyle){
		return oStyle;
	}
	
	var oEl = document.createElement('style');
	oEl.type = "text/css";
	
	if(oEl.styleSheet){
		oEl.styleSheet.cssText = sSelector + '{}';
	}else{
		oEl.appendChild(document.createTextNode(sSelector + '{}'));
	}

	document.getElementsByTagName('head')[0].appendChild(oEl);
	
	return fpTry(sSelector);
}

/**
* 전달인자로 받은 자식 엘리먼트(elInner)를 부모 엘리먼트(elOuter)의 중앙에 위치시킨다.
* @name		arrangeCenter
* @function
* @param 	{HTML Element} 	elInner 	중앙에 위치시키려는 자식 엘리먼트
* @param 	{HTML Element} 	elOuter 	부모 엘리먼트
* @example
* // 주의: elInner 엘리먼트의 position값이 relative로 선언되어 있어야 한다.
* <div id="outer" style="width:500px; height:300px;">
* 	<div id="inner" style="position:relative; width:100px;">Arrange Center</div>
* </div>
*
* <script type="text/javascript">
*     var elOuter = document.getElementById("outer");
*     var elInner = document.getElementById("inner");
*
*     arrageCenter(elInner);
*     // 결과: elInner를 부모엘리먼트의 중앙에 위치시킨다.
*
*     arrageCenter(elInner, elOuter);
*     // 결과: elInner를 elOuter의 중앙에 위치시킨다.
* </script>
*/
function arrangeCenter(elInner, elOuter){
	var elChild = elInner;
	var elParent = elOuter || elChild.parentNode;
	var aOuterSize = [elParent.offsetWidth, elParent.offsetHeight];
	var aInnerSize = [elChild.offsetWidth, elChild.offsetHeight];
	
	elChild.style.left = (aOuterSize[0] - aInnerSize[0]) / 2 + 'px';
	elChild.style.top = (aOuterSize[1] - aInnerSize[1]) / 2 + 'px';
}

/**
* 전달인자로 받은 이미지 엘리먼트(elImg)의 파일명을 bFlag 값에 따라 변경
* @name		setImageOn
* @function
* @param 	{HTML Element} 	elImg 	토글 시킬 이미지
* @param 	{Boolean} 		bFlag 	파일명 끝에 "_on"을 붙일지 여부 (true: 붙임, false: 제거)
* @see		isImageOn
* @example
* var elImg = new Image();
* elImg.src = "./sampleImage.jpg";
* setImageOn(elImg, true);
* // 결과: <img id="imgSample" src="./sampleImage_on.jpg" />
*
* elImg.src = "./sampleImage_on.jpg";
* setImageOn(elImg, false);
* // 결과: <img id="imgSample" src="./sampleImage.jpg" />
*/
function setImageOn(elImg, bFlag){
	var sSrc = elImg.src;

	sSrc = sSrc.replace(/(\w+)(\.\w+)(\?.*)?$/, function($0, sFileName, sExt, $3) {
		
		sFileName = sFileName.replace(/_on$/, '');
		if(bFlag){
			sFileName = sFileName + '_on';
		}

		return sFileName + sExt + ($3 || '');

	});

	elImg.src = sSrc;
}

/**
* 전달인자로 받은 이미지 엘리먼트(elImg)의 파일명 끝에 "_on"이 있는지 여부를 반환
* @name		isImageOn
* @function
* @param 	{HTML Element} 	elImg 	검사하려는 이미지 엘리먼트
* @returns 	{Boolean} 				파일명 끝에 "_on"이 있는지 여부 (true: 있음, false: 없음) 
* @see		setImageOn
* @example
* var elImg = new Image();
* elImg.src = "./sampleImage.jpg";
* isImageOn(elImg);
* // 결과: false
*
* elImg.src = "./sampleImage_on.jpg";
* isImageOn(elImg);
* // 결과: true
*/
function isImageOn(elImg){
	var rxImg = /(\w+)_on(\.\w+)(\?.*)?$/;
	return rxImg.test(elImg.src);
}

/**
* IE에서의 URL에 Hash(#) 사용 시 이벤트 발생에 따라 윈도우 타이틀이 변경되는 플래시 버그를 회피
* @name 		avoidFlashHashBug
* @function
* @example
* // 페이지 내에서 한번만 실행하면 되므로 익명함수로 실행 (권장)
* (function() {
*	var avoidFlashHashBug = function() {
*		var sTitle = document.title;
*		setTimeout(function() { 
*			document.title = sTitle;
*		}, 0);
*	};
*	
*	if (document.attachEvent) { // only IE
*		document.attachEvent('onmousedown', avoidFlashHashBug);
*		document.attachEvent('onkeydown', avoidFlashHashBug);
*	}
* })();
*/
function avoidFlashHashBug(){
	var sTitle = document.title;
	window.setTimeout(function() { 
		document.title = sTitle;
		}, 0);
} 

/**
* 팝업 윈도우를 띄운다.
* @name		openPopup
* @function
* @param 	{String} 		sUrl 			팝업 윈도우로 사용할 페이지 URL
* @param 	{String} 		sTitle 		팝업 위도우의 Title
* @param 	{Number} 	nWidth 		팝업의 가로 사이즈
* @param 	{Number} 	nHeight 		팝업의 세로 사이즈
* @param 	{Boolean} 	[isCenter] 	팝업을 화면 정중앙에 띄울 것인지 여부(true: 중앙, false: 중앙아님, default: false)
* @returns 	{Object} 					팝업 윈도우(window)
* @example
* openPopup("popup.html", "_blank", 300, 400, true);
* // 결과: 매번 새창(_blank or _new)으로 화면 중앙에 띄운다.
*
* openPopup("popup.html", "title", 300, 400, false);
* // 결과: 하나의 창(title 지정)으로 이전에 캐시된 위치에 띄운다.
*/
function openPopup(sUrl, sTitle, nWidth, nHeight, isCenter){
	var sPosition = "";
	var bCenter = isCenter || false;
	if(bCenter){
		nLeftPosition = (screen.availWidth - nWidth) / 2;
		nTopPosition = (screen.availHeight - nHeight) / 2;
		sPosition = "left=" + nLeftPosition + ", top=" + nTopPosition + ",";
	}
	
	return window.open(sUrl, sTitle, sPosition + " toolbar=no, location=no, status=no, menubars=no, resizable=no, width=" + nWidth + ", height=" + nHeight);
}

/**
* 전달인자로 받은 URL 문자열(sURL)에서 도메인을 추출하여 반환(전달 인자에 프로토콜이 선언되지 않으면 ""을 반환)
* @name		getDomain
* @function
* @param 	{String} 	[sURL] 	URL 문자열 (default: 현재 페이지 URL)
* @returns 	{String} 			도메인 문자열
* @see		getSimpleURL
* @see		getURLParameter
* @see		getURLHash
* @example
* // 추출 가능 프로토콜: http, https, mms
* getDomain()
* // 결과: 현재 페이지의 URL에서 추출하여 반환
*
* getDomain("http://www.naver.com/naver/index.html");
* // 결과: "http://www.naver.com"
*
* getDomain("www.naver.com/naver/index.html"); 		--> 프로토콜 선언이 안된 경우
* // 결과: ""
*/
function getDomain(sURL){
	var sSourceURL = sURL || window.location.toString();
	var aMatch = sSourceURL.match(/^(http|https|mms):\/\/([^\/]*)/i);
	
	return (!!aMatch) ? aMatch[0] : "";
}

/**
* 전달인자로 받은 URL 문자열(sURL)에서 파라미터를 제거한 URL 문자열을 반환
* @name 		getSimpleURL
* @function
* @param 	{String} 	[sURL] 	URL 문자열 (default: 현재 페이지 URL)
* @returns 	{String} 			파라미터를 제외한 URL 문자열
* @see		getDomain
* @see		getURLParameter
* @see		getURLHash
* @example
* getSimpleURL()
* // 결과: 현재 페이지의 URL에서 추출하여 반환
*
* getSimpleURL("http://se.naver.com/index.nhn?query='naver'");
* // 결과: http://se.naver.com/index.nhn 		--> 프로토콜 상관 없음.
*/
function getSimpleURL(sURL){
	var sSourceURL = sURL || window.location.toString(); 
	
	if(sSourceURL.indexOf("?") > -1){
		sSourceURL = sSourceURL.split("?")[0];
	}
	if(sSourceURL.indexOf("#") > -1){
		sSourceURL = sSourceURL.split("#")[0];		// Hash값만 있는 경우 대비
	}
	
	return sSourceURL;
}

/**
* 전달인자로 받은 URL 문자열(sURL)에서 파라미터를 추출하여 반환
* @name		getURLParameter
* @function
* @param 	{String} 	[sURL] 	URL 문자열 (default: 현재 페이지 URL)
* @returns 	{String} 			파라미터 문자열
* @see		getDomain
* @see		getSimpleURL
* @see		getURLHash
* @see		changeQueryStringToObject
* @example
* getURLParameter()
* // 결과: 현재 페이지의 URL에서 추출하여 반환
*
* getURLParameter("http://se.naver.com/?query='nhn'&page='1'");
* getURLParameter("http://se.naver.com/?query='nhn'&page='1'#top");
* // 결과: "query='nhn'&page='1'" 		--> 프로토콜 상관 없음.
*/
function getURLParameter(sURL){
	var sSourceURL = sURL || window.location.toString(); 
	var sURLParams = "";
	
	if(sSourceURL.indexOf("?") > -1){
		sURLParams = sSourceURL.split("?")[1];
		if(sURLParams.indexOf("#") > -1){
			sURLParams = sURLParams.split("#")[0];
		}
	}
	
	return sURLParams;
}

/**
* 전달인자로 받은 URL 문자열(sURL)에서 해쉬값(# 이하)를 추출하여 반환
* @name 		getURLHash
* @function
* @param 	{String} 	[sURL] 	URL 문자열 (default: 현재 페이지 URL)
* @returns 	{String} 			해쉬(# 이하) 문자열
* @see		getDomain
* @see		getSimpleURL
* @see		getURLParameter
* @see		changeQueryStringToObject
* @example
* getURLHash()
* // 결과: 현재 페이지의 URL에서 추출하여 반환
*
* getURLHash("http://se.naver.com/#top");
* // 결과: "top"
*
* getURLHash("http://se.naver.com/#cate='1'&page='1'");
* getURLHash("http://se.naver.com/?query='nhn'#cate='1'&page='1'");
* // 결과: "cate='1'&page='1'" 		--> 프로토콜 상관 없음.
*/
function getURLHash(sURL){
	var sSourceURL = sURL || window.location.toString(); 
	var sURLHash = "";
	
	if(sSourceURL.indexOf("#") > -1){
		sURLHash = sSourceURL.split("#")[1];
	}
	
	return sURLHash;
}

/**
* 전달인자로 받은 QueryString 형태의 문자열을 Hash Table형태의 오브젝트로 변환하여 반환
* @name		changeQueryStringToObject
* @function
* @param 	{String} 		sQueryString 	QueryString 형태의 문자열
* @returns 	{Hash Table} 				Hash Table( 키 : 값 ) 형태로 변환된 오브젝트
* @see		changeObjectToQueryString
* @see		getURLParameter
* @see		getURLHash
* @example
* changeQueryStringToObject();
* changeQueryStringToObject("");
* // 결과: {}
*
* changeQueryStringToObject("query=nhn&cate=1&page=1");
* // 결과: {query : "nhn", cate : "1", page : "1"}
*/
function changeQueryStringToObject(sQueryString){
    var htObject = {};
    var aParams = [];
	var sQuery = sQueryString || "";
	
    if(sQuery.indexOf("&") > -1){
		aParams = sQuery.split("&");
	}else{
		aParams[0] = sQuery;
	}
    
    for(var i = 0, nLength = aParams.length; i < nLength; i++){
        if(aParams[i].indexOf("=") > -1){
            var aParam = aParams[i].split("=");
            htObject[aParam[0]] = aParam[1];
        }
    }
    
    return htObject;
}

/**
* 전달인자로 받은 Hash Table 형태의 오브젝트(htObject)를 QueryString 형태의 문자열로 변환하여 반환
* @name		changeObjectToQueryString
* @function
* @param 	{Hash Table} 	htObject 	Hash Table( 키 : 값 ) 형태의 오브젝트
* @returns 	{String} 				QueryString 형태로 변환된 문자열 
* @see		changeQueryStringToObject
* @example
* changeObjectToQueryString();
* changeObjectToQueryString({});
* // 결과: ""
*
* changeObjectToQueryString({query : "nhn", cate : "1", page : "1"});
* // 결과: "query=nhn&cate=1&page=1"
*/
function changeObjectToQueryString(htObject){
	var aParam = [];

	for(var key in htObject){
		aParam.push(key + "=" + htObject[key]);
	}

	return aParam.join("&");
}

/**
* IE6에서 Background-Image 사용 시 깜박임 현상 방지
* @name		stopFlicker
* @function
* @example
* // 페이지 내에서 한번만 실행하면 되므로 익명함수로 실행 (권장)
* (function(){
* 	function stopFlicker(){
*		var m = document.uniqueID //IE 전용 
*		&& document.compatMode //브라우져의 랜더링 방식이 standard/quirk인지 구분 : IE6 이상, FF, opera9 
*		&& !window.XMLHttpRequest //IE6 이하 
*		&& document.execCommand ; //IE4 이상 
* 
*		try{
*			if(!!m) m("BackgroundImageCache", false, true); 
*		}catch(e){};
* 	}
* })();
*/
function stopFlicker(){
	var m = document.uniqueID && //IE 전용 
			document.compatMode && //브라우져의 랜더링 방식이 standard/quirk인지 구분 : IE6 이상, FF, opera9 
			!window.XMLHttpRequest && //IE6 이하 
			document.execCommand; //IE4 이상 
 
	try{
		if(!!m){
			m("BackgroundImageCache", false, true); //IE6 only
		}
	}catch(oh){
	}
}

/**
* 전달인자로 받은 첫번째 엘리먼트(elUpper)가 두번째 엘리먼트(elMaybeLower)를 포함하고 있는지 여부를 반환
* @name		contains
* @function
* @param 	{HTML Element} 	elUpper 			상위 엘리먼트
* @param 	{HTML Element} 	elMaybeLower 	검사하려는 하위 엘리먼트
* @returns 	{Boolean} 						포함 여부 (true: 같거나 포함함, false: 포함하지 않음)
* @example
* <div id="div_1">
* 	<div id="div_1_1">
* 		<span id="span_1">This is contains Function</span>
* 	</div> 
* </div>
* <div id="div_2"></div>
* 
* <script type="text/javascript">
* 	var elDiv1 = document.getElementById("div_1");
* 	var elDiv1_1 = document.getElementById("div_1_1");
* 	var elSpan1 = document.getElementById("span_1");
* 	var elDiv2 = document.getElementById("div_2");
*
* 	contains(elDiv1, elDiv1);		// 두 전달인자가 같을 경우
* 	contains(elDiv1, elDiv1_1);	// 첫번째 전달인자(elDiv1)가 1Depth 상위일 경우
* 	contains(elDiv1, elSpan1);	// 첫번째 전달인자(elDiv1)가 2Depth 상위일 경우
* 	// 결과: true
*
* 	contains(elDiv1, elDiv2);	// 두 전달인자(elDiv1, elDiv2)가 다르고, 동일 Depth일 경우
* 	contains(elDiv1_1, elDiv1);	// 첫번째 전달인자(elDiv1_1)가 하위 Depth일 경우
* 	// 결과: false
* </script>
*/
function contains(elUpper, elMaybeLower){
	if(typeof elUpper.contains != "undefined" && elMaybeLower["nodeType"] == 1){
		return elUpper == elMaybeLower || elUpper.contains(elMaybeLower); //IE 전용
	} 
	if(typeof elUpper.compareDocumentPosition != "undefined"){
		return elUpper == elMaybeLower || Boolean(elUpper.compareDocumentPosition(elMaybeLower) & 16); //기타
	} 
	while(elMaybeLower && elUpper != elMaybeLower){
		elMaybeLower = elMaybeLower["parentNode"];
	}

	return elMaybeLower == elUpper;
}

