xcopy "build\generic-legacy\web\locale\zh-CN"  "E:\work\palmmmo3_editor_assets\pdf_china\web\locale\zh-CN" /E /I /Y
xcopy "build\generic-legacy\web\locale\en-US"  "E:\work\palmmmo3_editor_assets\pdf_china\web\locale\en-US" /E /I /Y
xcopy "build\generic-legacy\web\images"  "E:\work\palmmmo3_editor_assets\pdf_china\web\images" /E /I /Y
copy "build\generic-legacy\web\palmmob3.js"  "E:\work\palmmmo3_editor_assets\pdf_china\web\palmmob3.js"
copy "build\generic-legacy\web\viewer.mjs"  "E:\work\palmmmo3_editor_assets\pdf_china\web\viewer.mjs"
copy "build\generic-legacy\web\viewer.html"  "E:\work\palmmmo3_editor_assets\pdf_china\web\viewer.html"
copy "build\generic-legacy\web\viewer.css"  "E:\work\palmmmo3_editor_assets\pdf_china\web\viewer.css"
copy "build\generic-legacy\build\pdf.mjs"         "E:\work\palmmmo3_editor_assets\pdf_china\libs\pdf.mjs"
copy "build\generic-legacy\build\pdf.worker.mjs"  "E:\work\palmmmo3_editor_assets\pdf_china\libs\pdf.worker.mjs"


xcopy "build\generic-legacy\web\locale"  "E:\work\palmmmo3_editor_assets\pdf_global\web\locale" /E /I /Y
xcopy "build\generic-legacy\web\images"  "E:\work\palmmmo3_editor_assets\pdf_global\web\images" /E /I /Y
copy "build\generic-legacy\web\palmmob3.js"  "E:\work\palmmmo3_editor_assets\pdf_global\web\palmmob3.js"
copy "build\generic-legacy\web\viewer.mjs"  "E:\work\palmmmo3_editor_assets\pdf_global\web\viewer.mjs"
copy "build\generic-legacy\web\viewer.html"  "E:\work\palmmmo3_editor_assets\pdf_global\web\viewer.html"
copy "build\generic-legacy\web\viewer.css"  "E:\work\palmmmo3_editor_assets\pdf_global\web\viewer.css"
copy "build\generic-legacy\build\pdf.mjs"         "E:\work\palmmmo3_editor_assets\pdf_global\libs\pdf.mjs"
copy "build\generic-legacy\build\pdf.worker.mjs"  "E:\work\palmmmo3_editor_assets\pdf_global\libs\pdf.worker.mjs"

