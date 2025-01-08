var isIOS = !!navigator.userAgent.toLowerCase().match(/iphone|macintosh|ipad/g)
var isBroswer = !window.webkit && !window.ReactNativeWebView; //浏览器环境
var editorWin, editorDoc, docEditor;
var action = "edit", uid, fileuri, documentType, lang = navigator.language;
var baidu_stat, baidu_stat_ios;
var isEditable, editorMode=0;
var isQuit = false;             //是否保存并退出

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

function Palmmob_docReady(){
    postMsg({
        "action":"init"
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
    
    Palmmob_Func('finishSaveBlob');
}

function js_switchEdit(editable){

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
