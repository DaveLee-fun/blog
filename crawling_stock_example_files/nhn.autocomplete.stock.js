/* release date : 2013-11-25 */
typeof nhn == "undefined" && (nhn = {}), nhn.Autocomplete = jindo.$Class({
    $init: function(a, b, c, d){
        this._oIM = a, this._oDM = b, this._oVM = c, this.option({
            cookieDomain: "naver.com",
            cookieName: "autocomplete"
        }), this.option(d), this._bUse = this._initUse(), this._bUse || this._oVM.setButtonImage("unuse"), this._oIM._setAutocomplete(this), this._oIM._setDataManager(b), this._oIM._setViewManager(c), this._oDM._setAutocomplete(this), this._oDM._setViewManager(c), this._oVM._setAutocomplete(this), this._oVM._setInputManager(a)
    }, getViewManager: function(){
        return this._oVM
    }, request: function(){
        this._oDM._request(this._oIM.getValue())
    }, doAction: function(){
        this._oIM.change()
    }, show: function(){
        this._oVM.show()
    }, hide: function(){
        this._oVM.hide()
    }, use: function(){
        if(this.fireEvent("onUse")){
            var a = jindo.$Cookie().get(this.option("cookieName")), b = "";
            if(a){
                var c = a.split("&");
                c.length > 1 && (b = "&" + c[1])
            }
            jindo.$Cookie().set(this.option("cookieName"), "use" + b, 21900, this.option("cookieDomain")), this._bUse = !0
        }
    }, unuse: function(a){
        if(this.fireEvent("onUnuse")){
            (undefined == a || a) && this.hide();
            var b = jindo.$Cookie().get(this.option("cookieName")), c = "";
            if(b){
                var d = b.split("&");
                d.length > 1 && (c = "&" + d[1])
            }
            jindo.$Cookie().set(this.option("cookieName"), "unuse" + c, 21900, this.option("cookieDomain")), this._bUse = !1, this._oVM.setButtonImage("unuse")
        }
    }, setUse: function(a){
        this._bUse = a, a || (this.hide(), this._oVM.setButtonImage("unuse"))
    }, isUse: function(){
        return this._bUse
    }, setButtonImage: function(a){
        this._oVM.setButtonImage(a)
    }, _initUse: function(){
        var a = jindo.$Cookie().get(this.option("cookieName"));
        return a ? 0 == a.indexOf("use") : !0
    }
}).extend(jindo.Component), nhn.AcInputManager = jindo.$Class({
    $init: function(a){
        this._el = a, this._wel = jindo.$Element(this._el), this._oAgent = jindo.$Agent().navigator(), this._sValue = this._wel.text(), this._attachEvent()
    }, getValue: function(){
        return this._wel.text()
    }, setValue: function(a){
        this._sValue = a, this._wel.text(a)
    }, focus: function(){
        this._el.focus()
    }, change: function(){
        this._oDM._request(this._wel.text())
    }, _setAutocomplete: function(a){
        this._oAuto = a
    }, _setDataManager: function(a){
        this._oDM = a
    }, _setViewManager: function(a){
        this._oVM = a
    }, _attachEvent: function(){
        jindo.$Fn(this._onFocus, this).attach(this._el, "focus"), jindo.$Fn(this._onBlur, this).attach(this._el, "blur"), jindo.$Fn(this._onKeyup, this).attach(this._el, "keyup"), jindo.$Fn(this._onKeydown, this).attach(this._el, "keydown"), jindo.$Fn(this._onClickDoc, this).attach(document, "mousedown"), this._oAgent.firefox && (this._oItvID = window.setInterval(jindo.$Fn(this._onWatch, this).bind(), 200))
    }, _onFocus: function(a){
        this._oAuto.fireEvent("onFocus"), this._oAgent.firefox || (this._oItvID && window.clearInterval(this._oItvID), this._oItvID = window.setInterval(jindo.$Fn(this._onWatch, this).bind(a), 200))
    }, _onBlur: function(a){
        this._oAuto.fireEvent("onBlur"), this._oAgent.firefox || this._oItvID && (window.clearInterval(this._oItvID), this._oItvID = null)
    }, _onKeyup: function(a){
        this._sValue != this._wel.text() && (this._sValue = this._wel.text(), this._onChange())
    }, _onKeydown: function(a){
        var b = a.key(), c = 9;
        if(b.down || b.up || c == b.keyCode){
            var d = !1;
            b.up || c == b.keyCode && b.shift ? d = this._oVM.up(a) : d = this._oVM.down(a), d && a.stop()
        }else b.enter ? this._oVM.enter(a) : b.right ? this._oVM.right(a) : b.left ? this._oVM.left(a) : b.ctrl && this._oVM.functionWithCtrl(a)
    }, _onWatch: function(a){
        this._sValue != this._wel.text() && (this._sValue = this._wel.text(), this._onChange())
    }, _onChange: function(a){
        this._oDM._request(this._wel.text())
    }, _onClickDoc: function(a){
        var b = a.element;
        if(!b)return;
        if(b == this._el) this._oVM.isShow() ? this._oVM.hide() : (this._sValue = this._wel.text(), this._oDM._request(this._sValue)), a.stopBubble();else{
            var c = this._oVM._getWrappedElement();
            c.isParentOf(b) || this._oVM.hide()
        }
    }
}), nhn.AcDataManager = jindo.$Class({
    $init: function(a, b, c, d){
        this._sURL = a, this._sType = b || "jsonp", this._sMethod = c || "get", this._oParam = {
            q: null,
            q_enc: "UTF-8",
            st: 100,
            frm: "test",
            r_format: "json",
            r_enc: "UTF-8",
            r_unicode: "0",
            t_koreng: "1"
        };
        for(var e in d)this._oParam[e] = d[e];
        this._qeuryExp = this._oParam.q
    }, _setAutocomplete: function(a){
        this._oAuto = a
    }, _setViewManager: function(a){
        this._oVM = a
    }, _request: function(a){
        this._sQuery = a.replace(/^(\s|　)+/g, "");
        if(!this._oAuto.isUse() || !this._sQuery){
            !this._oAjax || this._oAjax.abort(), this._oVM.paint({
                query: [],
                answer: [],
                nature: [],
                data: []
            });
            return
        }
        if(!this._htCache) this._htCache = {};else if(this._htCache[this._sQuery] && this._htCache.hasOwnProperty(this._sQuery)){
            this._oVM.paint(this._htCache[this._sQuery]);
            return
        }
        if(!this._oAjax){
            var b = this;
            this._oAjax = new jindo.$Ajax(this._sURL, {
                type: this._sType,
                method: this._sMethod,
                callbackid: "$3361",
                onload: function(a){
                    var c = a.json();
                    b._handleJSON(b._sQuery, c)
                }
            })
        }
        this._qeuryExp ? this._oParam.q = this._qeuryExp.replace("{query}", this._sQuery) : this._oParam.q = this._sQuery, this._oAjax.abort(), this._oAjax.request(this._oParam)
    }, _handleJSON: function(a, b){
        try{
            var c = [];
            for(var d = 0; d < b.items.length; d++){
                c[d] = [];
                var e = b.items[d];
                if(e.length > 0)for(var f = 0; f < e.length; f++)c[d][f] = e[f]
            }
            this._htCache[a] = {
                query: b.query,
                answer: b.answer,
                nature: b.nature,
                data: c
            }, this._oVM.paint(this._htCache[a])
        }catch(g){
            try{
                this._oVM.paint({query: [], answer: [], nature: [], data: []})
            }catch(g){
            }
        }
    }
}), nhn.AcViewManager = jindo.$Class({
    $init: function(a, b, c){
        this.el = a, this.wel = jindo.$Element(a), this.elBtn = b, b && (this.welBtn = jindo.$Element(this.elBtn)), this.oOption = {
            order: "asc",
            listSelector: "",
            listbox: "_resultBox",
            strMax: 50,
            listMax: 15,
            buttonImg: {
                show: "https://ssl.pstatic.net/sstatic/search/images11/btn_atcmp_up_on.gif",
                hide: "https://ssl.pstatic.net/sstatic/search/images11/btn_atcmp_down_on.gif",
                unuse: "https://ssl.pstatic.net/sstatic/search/images11/btn_atcmp_down_off2.gif"
            }
        };
        for(var d in c)this.oOption[d] = c[d];
        this.oAgent = jindo.$Agent().navigator()
    }, _getElement: function(){
        return this.el
    }, _getWrappedElement: function(){
        return this.wel
    }, _setAutocomplete: function(a){
        this.oAuto = a
    }, _setInputManager: function(a){
        this.oIM = a
    }, paint: function(a){
    }, enter: function(a){
    }, up: function(a){
    }, down: function(a){
    }, left: function(a){
    }, right: function(a){
    }, functionWithCtrl: function(a){
    }, toggle: function(){
        this.wel.visible() ? this.hide() : this.show()
    }, show: function(){
        if(!this.oAuto.isUse())return !1;
        if(this.oAuto.fireEvent("onShow")){
            this.wel.show(), this.setButtonImage("show");
            if("IFRAME" == this.wel.$value().tagName.toUpperCase()){
                var a = this.wel.$value().contentWindow.document.body,
                    b = this.oAgent.ie ? a.scrollHeight : a.clientHeight;
                this.wel.height(b)
            }
        }
    }, hide: function(){
        if(!this.oAuto.isUse())return !1;
        this.oAuto.fireEvent("onHide") && (this.wel.hide(), this.setButtonImage("hide"))
    }, isShow: function(){
        return this.wel.visible()
    }, setButtonImage: function(a){
        if(!this.welBtn)return;
        var b;
        "IMG" == this.welBtn.$value().tagName.toUpperCase() ? b = this.welBtn.$value() : b = jindo.$$.getSingle("img", this.welBtn.$value()), b && (a == "show" ? (b.src = this.oOption.buttonImg.show, b.title = b.alt = "자동완성 접기") : a == "hide" ? (b.src = this.oOption.buttonImg.hide, b.title = b.alt = "자동완성 펼치기") : a == "unuse" ? (b.src = this.oOption.buttonImg.unuse, b.title = b.alt = "자동완성 켜기") : this.oOption.buttonImg[a] && (b.src = this.oOption.buttonImg[a]))
    }
}), nhn.AcStockViewManager = jindo.$Class({
    $init: function(a, b, c){
        this.oOption.buttonImg = {
            show: "https://ssl.pstatic.net/static/common/snb/090513/bu_arrow_up.gif",
            hide: "https://ssl.pstatic.net/static/common/snb/090513/bu_arrow_down.gif",
            unuse: "https://ssl.pstatic.net/static/common/snb/090513/bu_arrow_down3.gif"
        }, this._welSelect = null, this._attachEvent()
    }, up: function(a){
        if(!this.isShow()){
            var b = 9;
            return b == a.key().keyCode ? !1 : (this.oAuto.request(), !0)
        }
        var c = !1;
        this._welSelect && (c = !0, this._welSelect.removeClass("atcmp_on"), this._welSelect = this._getPrev(this._welSelect)), this._welSelect || (c ? (this.oAuto.hide(), this.oIM.setValue(this._sUserQuery)) : this._welSelect = this._getLast());
        if(this._welSelect){
            this._welSelect.addClass("atcmp_on");
            var d = jindo.$$.getSingle("._au_full", this._welSelect.$value());
            this.oIM.setValue(jindo.$Element(d).text()), this.show()
        }
        return !0
    }, down: function(a){
        if(!this.isShow()){
            var b = 9;
            return b == a.key().keyCode ? !1 : (this.oAuto.request(), !0)
        }
        var c = !1;
        this._welSelect && (c = !0, this._welSelect.removeClass("atcmp_on"), this._welSelect = this._getNext(this._welSelect)), this._welSelect || (c ? (this.oAuto.hide(), this.oIM.setValue(this._sUserQuery)) : this._welSelect = this._getFirst());

        if(this._welSelect){
            this._welSelect.addClass("atcmp_on");
            var d = jindo.$$.getSingle("._au_full", this._welSelect.$value());
            this.oIM.setValue(jindo.$Element(d).text()), this.show()
        }
        return !0
    }, enter: function(a){
        if(this._welSelect){
            var b = jindo.$$.getSingle("._au_full", this._welSelect.$value());
            this.oIM.setValue(jindo.$Element(b).text())
        }
    }, hide: function() {
        this.$super.hide()
    }, _getRedirectUrl: function(itemcode, market, redirectUrl) {
        if (market == '코스피' || market == '코스닥' || market == '코넥스') {
            return "/item/main.naver?code=" + itemcode
        }

        if (market == '국내지수') {
            if (itemcode == 'KOSPI200') {
                return "/sise/sise_index.naver?code=KPI200"
            }

            return "/sise/sise_index.naver?code=" + itemcode
        }

        return redirectUrl.replace(".nhn", ".naver")

    }, paint: function(a){
        this._nRecentCount = 0, this._welAtcmp || this._setElement(), this._sUserQuery = this.oIM.getValue(), this._welSelect = null;
        for(var b = 0; b < this._aResultBox.length; b++)this._aResultBox[b].innerHTML = "", this._aResultBox[b].style.display = "none";
        var c = a.query, d = a.data, e = 0,
            f = this._getCount(d, this.oOption.listMax);
        for(var b = 0; b < d.length; b++){
            var g = [], h = f[0], i = this._aResultBox[0],
                j = this._aTemplate[0], k = this.oOption.aRedirectUrl[0];
            if(1 == b || 4 == b) i = this._aResultBox[1], j = this._aTemplate[1], k = this.oOption.aRedirectUrl[1], h = f[1];else if(2 == b || 5 == b) i = this._aResultBox[2], j = this._aTemplate[2], k = this.oOption.aRedirectUrl[2], h = f[2];
            if(d[b] && i){
                for(var l = 0; l < d[b].length; l++){
                    i.style.display = "block";

                    var m = d[b][l], n = {
                        encoded: encodeURIComponent(m[0][0] + " " + m[1][0]),
                        code: m[0][0],
                        txt: this._trim(this._cutStr(m[1][0], this.oOption.strMax)),
                        market: m[2][0],
                        full_txt: m[0][0] + " " + m[1][0],
                        in_code: m[0][0],
                        in_txt: m[1][0],
                        in_market: m[2][0],
                        in_link: k + this._getRedirectUrl(m[0][0], m[2][0], m[3][0])
                    };

                    // 해외증시 자동완성노출 제외. 경로 수정 확인필요
                    // 시장지표 자동완성노출 제외.
                    if (m[2][0] != '코스피' && m[2][0] != '코스닥' && m[2][0] !='코넥스' && m[2][0] != '국내지수') continue;

                    // 국내/해외 펀드 제외
                    if (m[2][0] == '해외펀드' || m[2][0] == '국내펀드') continue;

                    g[g.length] = this._applyTemplate(j, n, c), e++
                }
                i.innerHTML += g.join("")
            }else i && (i.innerHTML = "")
        }
        this._nRecentCount = e, this._welWords.hide(), this._welAtcmp.hide(), this._welAtcmpIng.hide(), this._welAtcmpStart.hide(), e > 0 ? (this._welWords.show(), this._welAtcmp.show(), this.show()) : this.hide()
    }, _setElement: function(){
        this._welAtcmp = jindo.$Element(document.getElementById("atcmp")), this._welAtcmpIng = jindo.$Element(document.getElementById("atcmpIng")), this._welAtcmpStart = jindo.$Element(document.getElementById("atcmpStart")), this._aResultBox = jindo.$$("ul._resultBox", this._welAtcmp.$value()), this._aTemplate = [];
        for(var b = 0; b < this._aResultBox.length; b++){
            var c = this._aResultBox[b];
            this._aTemplate[b] = c ? c.innerHTML.replace(/^\s+|\s+$/g, "") : null, b == 0 && (this._welWords = jindo.$Element(this._aResultBox[b]).parent())
        }
        jindo.$Fn(this._onMouseover, this).attach(this._welAtcmp, "mouseover"), jindo.$Fn(this._onClick, this).attach(this._welAtcmp, "click")
    }, _attachEvent: function(){
        if(this.elBtn){
            jindo.$Fn(this._onClickBtn, this).attach(this.elBtn, "mousedown");
            jindo.$Fn(this._onEnterBtn, this).attach(this.elBtn, "keydown");
        }
    }, _onMouseover: function(a){
        var b = a.element;
        if(this._welAnswer && this._welAnswer.isParentOf(b))return !1;
        if(!b || !b.tagName || b.tagName.toUpperCase() != "A")return !1;
        if(!b.parentNode || !b.parentNode.tagName || b.parentNode.tagName.toUpperCase() != "LI")return !1;
        this._welSelect && this._welSelect.removeClass("atcmp_on"), this._welSelect = jindo.$Element(b.parentNode), this._welSelect.addClass("atcmp_on")
    }, _onClick: function(a){
        if (this._welSelect) {
            this._select(a);
        } else {
            var _clickElement = jindo.$Element(a.element);
            if (_clickElement && _clickElement.parent() && _clickElement.parent().parent()) {
                var _linkDiv = jindo.$$.getSingle("._au_link", _clickElement.parent().parent().$value());
                document.location.href = jindo.$Element(_linkDiv).text();
            } else {
                // skip
            }
        }
    }, _onEnterBtn: function(a){
        if(a.key().enter){
            this._onClickBtn(a);
        }
    }, _onClickBtn: function(a){
        this._welAtcmp || this._setElement(), this.oAuto.isUse() ? this.wel.visible() ? this.oAuto.hide() : (this.oAuto.request(), this._nRecentCount == 0 && (this._welAtcmpStart.hide(), this._welAtcmpIng.show(), this.oAuto.show())) : (this.oAuto.use(), this.oAuto.request(), this._nRecentCount == 0 && (this._welAtcmpIng.hide(), this._welAtcmpStart.show(), this.oAuto.show())), a.stop()
    }, _select: function(a){
        if(this.oAuto.fireEvent("onSelect")){
            var b = jindo.$$.getSingle("._au_full", this._welSelect.$value()),
                c = jindo.$$.getSingle("._au_link", this._welSelect.$value());
            this.oIM.setValue(jindo.$Element(b).text()), document.location.href = c.innerHTML
        }
    }, _getCount: function(a, b){
        var c = [], d = jindo.$Agent().navigator();
        for(var e = 0; e < a.length; e++)c[e] = a[e].length;
        var f = b[0] + b[1] + b[2] - (d.chrome || d.safari ? 6 : 0),
            g = Math.min(f - Math.min(b[1], c[1] + c[4]) - Math.min(b[2], c[2] + c[5]), c[0] + c[3]),
            h = Math.min(f - g - Math.min(b[2], c[2] + c[5]), c[1] + c[4]),
            i = Math.min(f - g - h, c[2] + c[5]);
        return [g, h, i]
    }, _applyTemplate: function(a, b, c){
        var d = {};
        for(var e in b){
            d[e] = b[e], e == "txt" || e == "code" ? d[e] = this._highlight(b[e], c) : e == "full_txt" && (d[e] = this._escapeHTML(b[e]));
            if(!b.propertyIsEnumerable(e))continue;
            a = a.replace(new RegExp("@" + e + "@", "g"), d[e])
        }
        return b.txt == b.in_txt ? a = a.replace(/title=\"\"/, "") : a = a.replace(/title=\"\"/, 'title="' + b.in_txt + '"'), a
    }, _highlight: function(a, b){
        for(var c = 0; c < b.length; c++){
            var d = this._makeStrong(this._escapeHTML(a), this._escapeHTML(b[c]));
            if("" != d)return d
        }
        return a
    }, _makeStrong: function(a, b){
        var c = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"),
            d = b.replace(/()/g, " ").replace(/^\s+|\s+$/g, ""),
            e = d.match(/\S/g), f = [];
        for(var g = 0, h = e.length; g < h; g++)f.push(e[g].replace(/[\S]+/g, "[" + e[g].toLowerCase().replace(c, "\\$&") + "|" + e[g].toUpperCase().replace(c, "\\$&") + "] ").replace(/[\s]+/g, "[\\s]*"));
        d = "(" + f.join("") + ")";
        var i = "", j = new RegExp(d);
        return j.test(a) && (i = a.replace(j, "<strong>" + RegExp.$1 + "</strong>")), i
    }, _trim: function(a){
        return a.replace(/^\s+|\s+$/g, "")
    }, _cutStr: function(a, b){
        var c = a.length, d = 0, e = 2, f = 2, g = 1, h = 1;
        for(var i = 0; i < a.length; i++){
            var j = a.charAt(i).charCodeAt(0);
            j >= 44032 && j <= 552013 || j >= 12593 && j <= 12643 ? d += e : j == 73 && j == 74 ? d += g : j >= 65 && j <= 90 ? d += f : j >= 97 && j <= 122 ? d += g : d += h;
            if(Math.floor(d) > b){
                c = i;
                break
            }
        }
        return c < a.length ? a.substring(0, c) + "..." : a
    }, _escapeHTML: function(a){
        a && (a = a.replace(/\$/g, "$$$$"));
        var b = {'"': "quot", "&": "amp", "<": "lt", ">": "gt", "'": "#39"},
            c = a.replace(/[<>&"']/g, function(a){
                return b[a] ? "&" + b[a] + ";" : a
            });
        return c
    }, _getFirst: function(){
        for(var a = 0; a < this._aResultBox.length; a++)if(this._aResultBox[a].childNodes.length)return jindo.$Element(this._aResultBox[a]).first();
        return null
    }, _getLast: function(){
        for(var a = this._aResultBox.length - 1; a >= 0; a--)if(this._aResultBox[a].childNodes.length)return jindo.$Element(this._aResultBox[a]).last()
    }, _getNext: function(a){
        for(var b = 0; b < this._aResultBox.length; b++){
            var c = jindo.$Element(this._aResultBox[b]);
            if(a.isChildOf(c)){
                var d = a.next();
                if(d)return d;
                for(var e = b + 1; e < this._aResultBox.length; e++)if(this._aResultBox[e].childNodes.length)return jindo.$Element(this._aResultBox[e]).first();
                break
            }
        }
        return null
    }, _getPrev: function(a){
        for(var b = 0; b < this._aResultBox.length; b++){
            var c = jindo.$Element(this._aResultBox[b]);
            if(a.isChildOf(c)){
                var d = a.prev();
                if(d)return d;
                for(var e = b - 1; e >= 0; e--)if(this._aResultBox[e].childNodes.length)return jindo.$Element(this._aResultBox[e]).last();
                break
            }
        }
        return null
    }
}).extend(nhn.AcViewManager);
