var isIOS = !!navigator.userAgent.toLowerCase().match(/iphone|macintosh|ipad/g)
var baidu_stat="a22e57e3af6919a0e515b1b00a399422", baidu_stat_ios="382d50f21a0139781907e7c434fb71a6"
var editorWin = window

function Palmmob_Func(FuncName, defaultVal){
    // console.log("Palmmob_Func", FuncName)
    if(window.ReactNativeWebView){
        return window.ReactNativeWebView[FuncName]()
    } else if(window.webkit && window.webkit.messageHandlers){        
        return prompt(JSON.stringify([FuncName]))
    }
    return defaultVal
}

function Palmmob_Func1(FuncName, p0, defaultVal){
    // console.log("Palmmob_Func1", FuncName)
    if(window.ReactNativeWebView){
        return window.ReactNativeWebView[FuncName](p0)
    } else if(window.webkit && window.webkit.messageHandlers.ReactNativeWebView){        
        return prompt(JSON.stringify([FuncName, p0]))
    }
    return defaultVal
}

function Palmmob_Func2(FuncName, p0, p1, defaultVal){
    // console.log("Palmmob_Func2", FuncName)
    if(window.ReactNativeWebView){
        return window.ReactNativeWebView[FuncName](p0, p1)
    } else if(window.webkit && window.webkit.messageHandlers.ReactNativeWebView){        
        return prompt(JSON.stringify([FuncName, p0, p1]))
    }
    return defaultVal
}

function postMsg(cmd) {
    var cmddata = JSON.stringify(cmd);
    console.log("cmddata", cmddata);
    Palmmob_Func1('postMessage', cmddata)
}

function Palmmob_raiseEditor(inputMethodHeight){

}

function Palmmob_resumeEditor() {

}

function Palmmob_closePop(){
    return "";
}

function Palmmob_appErr(type, content){
    Palmmob_Func2("appErr", type, content, null)
}

function Palmmob_docReady(){
    postMsg({
        "action":"init"
    });
    postMsg({
        "action":"docloaded"
    });
}

function Palmmob_quit(){
    postMsg({
        "action":"quit"
    });
}

function Palmmob_savefile(data) {    
    Palmmob_Func('startSaveBlob');
        
    const chunkSize = 50 * 1024;
    let offset = 0;
    
    while (offset < data.length) {
        const chunk = data.slice(offset, offset + chunkSize);
        Palmmob_Func1("saveBlob", btoa(String.fromCharCode.apply(null, chunk)));
        offset += chunkSize;
    }
    
    return new Promise(resolve => {
        setTimeout(function() {
            Palmmob_Func('finishSaveBlob');
            resolve();
        }, 1000);
    });
}

function js_closeEditor() {
    const activeElement = document.activeElement;
    if(activeElement){
        const newTarget = document.getElementById("editorOK");
        newTarget.focus();
        const blurEvent = new FocusEvent('blur', {
          relatedTarget: newTarget,
          bubbles: true
        });
        activeElement.dispatchEvent(blurEvent);
    }

    setTimeout(() => {
        PDFViewerApplication.eventBus.dispatch("editor_exit", {source: this});
    }, 300);
}

function js_switchEdit(editable){

}

function js_inputHide(){

}

function initBDStat(){
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?" + (isIOS ? baidu_stat_ios : baidu_stat);
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
}

function errWatch(){
    window.addEventListener('error', function(event) {
        console.log("error event:", event);
        if (event.error) {
            // 如果是普通的错误对象
            var errstr = `${event.error.message},${event.lineno},${event.colno},${event.error.stack || ''}`;
            Palmmob_appErr(8880, errstr);
        } else if (event.target && event.target.tagName) {
            // 如果是资源加载错误(图片、脚本等)
            var errstr = `Resource Error: ${event.target.tagName},${event.target.src || event.target.href}`;
            Palmmob_appErr(8881, errstr);
        } else {
            // 其他类型错误
            var errstr = `Unknown Error: ${event.message || JSON.stringify(event)}`;
            Palmmob_appErr(8882, errstr);
        }                
        return false;
    }, true);
        
    window.addEventListener('unhandledrejection', function(event) {
        console.log("unhandled promise rejection:", event);
        var errstr = `Promise Error: ${event.reason ? (event.reason.stack || event.reason.toString()) : '未知Promise错误'}`;
        Palmmob_appErr(8883, errstr);
        event.preventDefault();
    }, true);
        
    window.addEventListener('rejectionhandled', function(event) {
        console.log("handled promise rejection:", event);
        var errstr = `Handled Promise Error: ${event.reason ? (event.reason.stack || event.reason.toString()) : '未知Promise错误'}`;
        Palmmob_appErr(8884, errstr);
    }, true);
}


// errWatch()
initBDStat()