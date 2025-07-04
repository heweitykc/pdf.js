var isIOS = !!navigator.userAgent.toLowerCase().match(/iphone|macintosh|ipad/g)
var baidu_stat="a22e57e3af6919a0e515b1b00a399422", baidu_stat_ios="382d50f21a0139781907e7c434fb71a6"
var editorWin = window
var Palmmob_version = "1.0.3"
var palmmob_debug = false;  //当前是否调试状态
var Palmmob_appChannel  = Palmmob_Func("appChannel","huawei");

console.log("Palmmob_version=", Palmmob_version);
console.log("Palmmob_appChannel=", Palmmob_appChannel);

function palmmob_log(...args){
    if(palmmob_debug){
        console.log(...args);
    }
}

function Palmmob_Func(FuncName, defaultVal){
    palmmob_log("Palmmob_Func", FuncName)
    if(window.ReactNativeWebView){
        return window.ReactNativeWebView[FuncName]()
    } else if(window.webkit && window.webkit.messageHandlers){        
        return prompt(JSON.stringify([FuncName]))
    }
    return defaultVal
}

function Palmmob_Func1(FuncName, p0, defaultVal){
    palmmob_log("Palmmob_Func1", FuncName, p0)
    if(window.ReactNativeWebView){
        return window.ReactNativeWebView[FuncName](p0)
    } else if(window.webkit && window.webkit.messageHandlers.ReactNativeWebView){        
        return prompt(JSON.stringify([FuncName, p0]))
    }
    return defaultVal
}

function Palmmob_Func2(FuncName, p0, p1, defaultVal){
    palmmob_log("Palmmob_Func2", FuncName, p0, p1)
    if(window.ReactNativeWebView){
        return window.ReactNativeWebView[FuncName](p0, p1)
    } else if(window.webkit && window.webkit.messageHandlers.ReactNativeWebView){        
        return prompt(JSON.stringify([FuncName, p0, p1]))
    }
    return defaultVal
}

function Palmmob_Func3(FuncName, p0, p1, p2, defaultVal){
    palmmob_log("Palmmob_Func3", FuncName, p0, p1, p2)
    if(window.ReactNativeWebView){
        return window.ReactNativeWebView[FuncName](p0, p1, p2)
    } else if(window.webkit && window.webkit.messageHandlers.ReactNativeWebView){        
        return prompt(JSON.stringify([FuncName, p0, p1, p2]))
    }
    return defaultVal
}

function postMsg(cmd) {
    var cmddata = JSON.stringify(cmd);
    palmmob_log("cmddata", cmddata);
    Palmmob_Func1('postMessage', cmddata)
}
function sendMenuCmd(type) {
    var cmd = {
        'action' : 'menuclick',
        'type'   : type
    };
    postMsg(cmd);
}

function Palmmob_language(){
    // return "zh-CN";
    return navigator.language || "en-US";
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

function Palmmob_annotationUsage(eventDetails){
    var appAction;
    if(eventDetails.mode === 3){
        appAction = "FreeText";
    } else if(eventDetails.mode === 15){
        appAction = "Ink";
    }
    if(appAction){
        Palmmob_Func3("appUsage", appAction);
    }    
}

function Palmmob_appUsage(appAction, type=0, p0=null){    
    Palmmob_Func3("appUsage", appAction, type, p0, null)
}

function Palmmob_docReady(){
    postMsg({
        "action":"init"
    });
    postMsg({
        "action":"docloaded"
    });
    Palmmob_appUsage("pdfReady", 0, document.location.search);
}

// 通知用户修改了文档
var Palmmob_docChanged = function (){    
    Palmmob_Func("docChanged");
}

function Palmmob_quit(){
    postMsg({
        "action":"quit"
    });
}

function Palmmob_sharePdf(){    
    sendMenuCmd("shareaspdf");
}

function Palmmob_savefile(data) {
    palmmob_log("Palmmob_savefile");
    Palmmob_Func1('startSaveBlob', false);
        
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
        palmmob_log("error event:", event);
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
        palmmob_log("unhandled promise rejection:", event);
        var errstr = `Promise Error: ${event.reason ? (event.reason.stack || event.reason.toString()) : '未知Promise错误'}`;
        Palmmob_appErr(8883, errstr);
        event.preventDefault();
    }, true);
        
    window.addEventListener('rejectionhandled', function(event) {
        palmmob_log("handled promise rejection:", event);
        var errstr = `Handled Promise Error: ${event.reason ? (event.reason.stack || event.reason.toString()) : '未知Promise错误'}`;
        Palmmob_appErr(8884, errstr);
    }, true);
}

function useAbortSignal_Any(){
    return (typeof PDFJSDev !== "undefined" && PDFJSDev.test("MOZCENTRAL")) ||
          typeof AbortSignal.any === "function"
}

function abortSignalAny(signals) {
    if(typeof AbortSignal.any === "function"){
        return AbortSignal.any(signals);
    }
    const controller = new AbortController();
  
    function onAbort(signal) {
      if (controller.signal.aborted) return;
      controller.abort(signal.reason); // 可选：传递触发者的中止原因
    }
  
    for (const signal of signals) {
      if (signal.aborted) {
        controller.abort(signal.reason);
        break;
      }
      signal.addEventListener('abort', () => onAbort(signal), { once: true });
    }
  
    return controller.signal;
  }

function lock_ink_scroll(lock) {
    if(Palmmob_appChannel != "huawei"){
        return;
    }
    const viewerContainer = document.getElementById("viewerContainer");    
    viewerContainer.style.touchAction = lock ? "none" : "";
}

function abortSignalAny(signals) {
    if(typeof AbortSignal.any === "function"){
        return AbortSignal.any(signals);
    }
    const controller = new AbortController();
  
    function onAbort(signal) {
      if (controller.signal.aborted) return;
      controller.abort(signal.reason); // 可选：传递触发者的中止原因
    }
  
    for (const signal of signals) {
      if (signal.aborted) {
        controller.abort(signal.reason);
        break;
      }
      signal.addEventListener('abort', () => onAbort(signal), { once: true });
    }
  
    return controller.signal;
}

if(!palmmob_debug){
    errWatch()
}

initBDStat()

