var userinput = 0;
var keystatus = 1;


function setCookie( name, value, expiredays )
{
        if(expiredays == 0) {
                document.cookie = name + "=" + escape( value ) + "; path=/;"
        }
        else {
                var todayDate = new Date();
                todayDate.setDate( todayDate.getDate() + expiredays );
                document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
        }
}

function getCookie(name){

	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;

	while(i< clen){
		var j = i + alen;
		if(document.cookie.substring(i,j)==arg){
			var end = document.cookie.indexOf(";",j);
			if(end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(j,end));
		}
		i=document.cookie.indexOf(" ",i)+1;
		if (i==0) break;
	}
	return null;
}

function refreshx() {
	setCookie("refreshx", 1);
	location.replace(self.location);
}

function init() {
    var textbox = document.search.stock_keyword;
    document.onkeydown = setFocusToQueryTextBox;
}


function setFocusToQueryTextBox(event) {

	var textbox, selectbox;
	var _event;

	textbox = document.search.stock_keyword;
	selectbox = document.search.cmd;


	switch ( getNavigatorType() ) {
		case 1 : // IE
			_event = window.event;
			node = _event.srcElement;
			nodeName = _event.srcElement.nodeName;
			break;
		case 2 : // Netscape
			_event = event;
			node = _event.target;
			nodeName = _event.target.nodeName;
			break;
		default :
			nodeName = "None";
			break;
	}

	key = _event.keyCode;

	/* press alt + number keky */
	if ( _event.altKey && key > 47 && key < 58 ) {
		var table = new Array(14,0,1,2,3,4,5,11,12,13);
		selectbox.selectedIndex = table[key-48];
		return 1;
	}

	if ( _event.altKey && key == 189 ) {
		selectbox.selectedIndex = 15;
		return 1;
	}

	if (!(nodeName=="INPUT"||nodeName=="SELECT"||(_event.ctrlKey&&key!=86)||userinput)) {
		if (key==8||(key>32&&key<41)||(key!=21&&key<32)||_event.altKey) {
		} else if (key==32) {
			if (_event.shiftKey) {
				textbox.focus();
				textbox.style.imeMode ="active";
				textbox.select();
				_event.returnValue=false;
			}
		} else if (key == 21) {
			scrollTo(0,0);
			textbox.focus();
			textbox.style.imeMode ="active";
			textbox.select();
			_event.returnValue=false;
		} else if (node!=textbox) {
			scrollTo(0,0);
			textbox.focus();
			textbox.style.imeMode ="inactive";
			textbox.select();
		}
	}
}


function getNavigatorType() {
	if ( navigator.appName == "Microsoft Internet Explorer" )
		return 1;
	else if ( navigator.appName == "Netscape" )
		return 2;
	else
		return 0;
}

function winResize(x, y)
{
    var divEl = document.createElement("div");
    divEl.style.position = "absolute";
    divEl.style.left = "0px";
    divEl.style.top = "0px";
    divEl.style.width = "100%";
    divEl.style.height = "100%";

    document.body.appendChild(divEl);

    window.resizeBy(x-divEl.offsetWidth, y-divEl.offsetHeight);
    document.body.removeChild(divEl);
}

var Fluctuation = jindo.$Class({ 
	upperCnt : 0,
	riseCnt : 0,
	steadyCnt : 0,
	fallCnt : 0,
	lowerCnt : 0,
	$init : function(mainIndex) {
		this.upperCnt = mainIndex.upperCnt,
		this.riseCnt = mainIndex.riseCnt,
		this.steadyCnt = mainIndex.steadyCnt,
		this.fallCnt = mainIndex.fallCnt,
		this.lowerCnt = mainIndex.lowerCnt
	},
	getUpperCnt : function() {		
		return this.upperCnt;
	},
	getRiseCnt : function() {
		return this.riseCnt;
	},
	getSteadyCnt : function() {
		return this.steadyCnt;
	},
	getFallCnt : function() {
		return this.fallCnt;
	},
	getLowerCnt : function() {
		return this.lowerCnt;
	}
});

var DealTrend = jindo.$Class({ 
	personalValue : 0,
	foreignValue : 0,
	institutionalValue : 0,
	$init : function(dealTrend) {
		this.personalValue = dealTrend.personalValue,
		this.foreignValue = dealTrend.foreignValue,
		this.institutionalValue = dealTrend.institutionalValue
	},
	getPersonalValue : function() {		
		return this.personalValue;
	},
	getForeignValue : function() {
		return this.foreignValue;
	},
	getInstitutionalValue : function() {
		return this.institutionalValue;
	}
});

var TrendProgram = jindo.$Class({ 
	differenceReal : 0,
	biDifferenceReal : 0,
	totalReal : 0,
	$init : function(TrendProgram) {
	    if (TrendProgram) {
	        this.differenceReal = (TrendProgram.differenceBuyConsignAmount + TrendProgram.differenceBuySelfAmount) - (TrendProgram.differenceSellConsignAmount + TrendProgram.differenceSellSelfAmount);
            this.biDifferenceReal = (TrendProgram.biDifferenceBuyConsignAmount + TrendProgram.biDifferenceBuySelfAmount) - (TrendProgram.biDifferenceSellConsignAmount + TrendProgram.biDifferenceSellSelfAmount);
            this.totalReal = this.biDifferenceReal + this.differenceReal;
	    }
	},
	getDifferenceReal : function() {
		return this.differenceReal;
	},
	getBiDifferenceReal : function() {
		return this.biDifferenceReal;
	},
	getTotalReal : function() {
		return this.totalReal;
	}
});


function getDealTrendTemplateValues(dealTrend) {
	var dealTrend = new DealTrend(dealTrend);
	var values = {
			_personalValue : dealTrend.getPersonalValue(),
			_foreignValue : dealTrend.getForeignValue(),
			_institutionalValue : dealTrend.getInstitutionalValue()
	};
	
	return values;
}

function getFluctuationTemplateValues(mainIndex, trendProgram) {
	var fluctuation = new Fluctuation(mainIndex);
	values = {
			_indexItemUpperCnt : fluctuation.getUpperCnt(),
			_indexItemRiseCnt : fluctuation.getRiseCnt(),
			_indexItemSteadyCnt : fluctuation.getSteadyCnt(),
			_indexItemFallCnt : fluctuation.getFallCnt(),
			_indexItemLowerCnt : fluctuation.getLowerCnt()
	};
	
	var map = jindo.$H(values);
	if(trendProgram) {
		var programMap = jindo.$H(getProgramTemplateValues(trendProgram));
	
		programMap.forEach(function(v, k, o) {
			map.add(k, v);
		});
	}
	return map.$value();
}

function getProgramTemplateValues(trendProgram) {
	var trendProgram = new TrendProgram(trendProgram);
	values = {
			_differenceReal : trendProgram.getDifferenceReal(),
			_biDifferenceReal : trendProgram.getBiDifferenceReal(),
			_totalReal : trendProgram.getTotalReal()	
	};
	return values;
}

function printChangeRate(value, denominator){
	if (!denominator){
		 denominator = 1;
	}
	result = changeNumberFormat(Math.round(value/denominator));
	return (value > 0) ? "+" + result : "" + result;
}

function displayTime(ms, aq, time) {
	var result;
	
	var utcDate = new Date(time);
	utcDate.setMinutes(utcDate.getMinutes() + utcDate.getTimezoneOffset());
	utcDate.setHours(utcDate.getHours() + 9);

	var oDate = jindo.$Date(utcDate);

	if (ms == "PREOPEN") {
		if (aq == "0") {
			closeDate = oDate.format('Y.m.d');
			result = oDate.format('Y.m.d') + "<span>개장전</span></span> ";
		} else {
			closeDate = oDate.format('Y.m.d');
			result = oDate.format('Y.m.d') + "<span class='sub'>개장전</span> <span class='sub2'>예상지수</span></span> ";
		}
	} else if (ms == "CLOSE") {
		result = closeDate + "<span>장마감</span></span> ";
	} else {
		closeDate = oDate.format('Y.m.d');
		result = oDate.format('Y.m.d H:i') + "<span>장중</span></span>";
	}

	return result;
}


