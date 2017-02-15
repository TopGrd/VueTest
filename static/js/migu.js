/**
 * [domReady]
 * @param  {Function} fun 执行的函数
 * @return {null}
 */
function domReady(fun) {

    if(domReady.done) return fun();

    if(domReady.timer) {
        // 把参数中的函数放入执行队列
        domReady.ready.push(fun);
    } else {
        if (window.addEventListener) {
            document.addEventListener("DOMContentLoaded", isDOMReady, false);
            window.addEventListener("load", isDOMReady, false);
        }else {
            window.attachEvent('onload', isDOMReady);
        }

        // 初始化执行函数的数组
        domReady.ready = [fun];
        // 尽可能快的检查DOM是否已可用
        domReady.timer = setInterval(isDOMReady, 20);
    }
}

/**
 * [isDOMReady 检测dom加载]
 * @return {Boolean} [description]
 */
function isDOMReady() {
    if(domReady.done) return false;

    // 检查dom元素和函数是否存在
    if(document && document.getElementsByTagName && document.getElementById && document.body) {
        // 如果可用，停止检查
        clearInterval(domReady.timer);

        domReady.timer = null;

        // 执行所有正在队列中的函数
        for(var i = 0; i < domReady.ready.length; i++) {
            domReady.ready[i]();
        }

        domReady.ready = null;
        domReady.done = true;

    }
}

window.migusdk = (function  (){
    window.sdk = {};
    sdk.payCallback = null;
    sdk.initFinish = null;
    sdk.paydata = null;
    sdk.isIE = false;

    sdk.payurl = "http://117.139.217.11:10300";

    function showFrame() {
        var payDetailTagDiv = document.getElementById('payDetailTag');
        payDetailTagDiv.style.display = "block";
    }

    function hideFrame() {
        var payDetailTagDiv = document.getElementById('payDetailTag');
        payDetailTagDiv.style.display = 'none';
    }

		function checkBrowser() {
			var userAgent = navigator.userAgent.toLowerCase();
			if( (userAgent.indexOf("trident") > -1)
					//((userAgent.indexOf("msie") > -1) && (userAgent.indexOf("compatible") > -1) && (userAgent.indexOf("opera") <= -1))
					/*&& (userAgent.indexOf("windows phone") <= -1) */) {
				sdk.isIE = true;
			} else {
				sdk.isIE = false;
			}
		}

    sdk.pay = function(data, cb) {
        window.frames['__migu_web_pay_frame'].postMessage(data, sdk.payurl);
        sdk.payCallback = cb;
    };

     sdk.createFrame = function(ver){
        var  payDetailTagDiv = document.createElement("div");
        payDetailTagDiv.id = "payDetailTag";
        payDetailTagDiv.setAttribute("style", "background: rgba(0,0,0,.6);position: fixed;z-index: 1000;left: 0;top: 0;display: none;-webkit-box-align: center;-ms-flex-align: center;-webkit-align-items: center;-moz-align-items: center;align-items: center;	width: 100%;height: 100%");
        document.body.appendChild(payDetailTagDiv);
        var payDetailTagAreaDiv = document.createElement("div");
        payDetailTagAreaDiv.setAttribute("style", "width: 100%; display: -webkit-box; display: -ms-flexbox; display: -webkit-flex; display: -moz-flex; -webkit-box-pack: center;  -ms-flex-pack: center; -webkit-justify-content: center; -moz-justify-content: center; justify-content: center; text-align: center; height: 100%");
        payDetailTagDiv.appendChild(payDetailTagAreaDiv);

        checkBrowser();

        var iframe = document.createElement("iframe");
        iframe.id = 'frame';
        if( sdk.umark.length === 0 ) {
        	if( !sdk.isIE ) {
        		iframe.src = sdk.payurl + "/migunetsdk/webJs/frame.html?netId=" + window.netId;
        	} else {
        		iframe.src = sdk.payurl + "/migunetsdk/webJs/frame.html?netId=" + window.netId + "&umark=Common";
        	}
      	} else {
      		iframe.src = sdk.payurl + "/migunetsdk/webJs/frame.html?netId=" + window.netId + "&umark=" + sdk.umark;
      	}

        if (ver) {
          ver == 'a' ? iframe.src += "&client=WAP" : iframe.src += "&client=WWW";
        } else {
          if( !sdk.isIE ) {
        		iframe.src += "&client=WAP";
        	} else {
        		iframe.src += "&client=WWW";
        	}
        }

        iframe.name = '__migu_web_pay_frame';
        iframe.className = "miguframe";
        iframe.setAttribute("style", "position: absolute; top: 0; left: 0; border: 0; width: 100%; height: 100%;");
        payDetailTagAreaDiv.appendChild(iframe);
    };

    sdk.init = function(netId, cb, umark, ver) {
    	var initTime = new Date().getTime();
    	console.log('init start time:' + initTime);
	    window.netId = netId;
      sdk.umark = umark||"";
      domReady(function() {
          sdk.createFrame(ver);
      });
      if (typeof cb != 'function') {
          alert("回调函数不能为空 ");
      }

		if (window.addEventListener)
        window.addEventListener("message", function(e) {
            var url = e.origin || e.originalEvent.origin;
            if (url === sdk.payurl) {
                var obj = JSON.parse(e.data);
                console.log(obj);
                switch (obj.msgtype) {
                    case "init":
						console.log("init receive");
						console.log(obj.msg);
                        if (obj.resultCode !== "0000") {

                            removeEventListener('message', this);
                            cb(obj.result);
                        } else {
                        	var initSuTime = new Date().getTime();
                        	console.log('init Success Time:' + initSuTime);
                        	console.log('init All Time:' + (initSuTime - initTime));
                            var btn = window.document.getElementById('paybtn');
							if (btn != null && typeof(btn)!="undefined")
								btn.onclick = sendONEMsg;
                            var li = window.document.getElementById('li_pay');
							if (li != null && typeof(li)!="undefined")
								li.className = 'footer_pay_right';
                            cb(obj.resultCode, obj.msg, obj.authSessionId);
                        }
                        break;
                    case "pay":
                        if (obj.resultCode === "0000") {
                            console.log("success");
                            console.log('Pay Success Time: ' + new Date().getTime())
                        } else {
                            console.log("failed");
                        }
                        sdk.payCallback(obj.resultCode, obj.msg, sdk.paydata);
                        break;
                    case "show frame":
						console.log("log:show frame");
                        showFrame();
                        var showFTime = new Date().getTime();
                        console.log('Pay show frame success time: ' + showFTime);
                        console.log('Pay show frame all time: ' + (showFTime - payTime));
                        break;
                    case "hide frame":
                        hideFrame();
                        break;
                }
                console.log(e.data + " in window");
            }
        }, false);

		else if (window.attachEvent)  //for lower ie
			window.attachEvent("onmessage", function(e) {
            var url = e.origin || e.originalEvent.origin;
            if (url === sdk.payurl) {
                var obj = JSON.parse(e.data);
                console.log(obj);
                switch (obj.msgtype) {
                    case "init":
						console.log("init receive");
						console.log(obj.msg);
                        if (obj.resultCode !== "0000") {
                            removeEventListener('message');
                            cb(obj.result);

                        } else {
                            var btn = window.document.getElementById('paybtn');
							if (btn != null && typeof(btn)!="undefined")
								btn.onclick = sendONEMsg;
                            var li = window.document.getElementById('li_pay');
							if (li != null && typeof(li)!="undefined")
								li.className = 'footer_pay_right';
                            cb(obj.resultCode, obj.msg, obj.authSessionId);
                        }
                        break;
                    case "pay":
                        if (obj.resultCode === "0000") {
                            console.log("success");
                        } else {
                            console.log("failed");
                        }
						hideFrame();
                        sdk.payCallback(obj.resultCode, obj.msg, sdk.paydata);
                        break;
                    case "show frame":
						console.log("log:show frame");
                        showFrame();
                        break;
                    case "hide frame":
                        hideFrame();
                        break;
                }
                console.log(e.data + " in window");
            }
        });
    };
    return sdk;
})();
