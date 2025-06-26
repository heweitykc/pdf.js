
/** @typedef {import("./event_utils.js").EventBus} EventBus */
/** @typedef {import("./interfaces.js").IL10n} IL10n */
/** @typedef {import("./overlay_manager.js").OverlayManager} OverlayManager */
// eslint-disable-next-line max-len
/** @typedef {import("../src/display/api.js").PDFDocumentProxy} PDFDocumentProxy */

import { getPageSizeInches, isPortraitOrientation } from "./ui_utils.js";
import { PDFDateString } from "pdfjs-lib";


class PDFSignViewer {
  #fieldData = null;

  constructor(
    { dialog, canvas },
    overlayManager,
    eventBus,
    l10n,
    fileNameLookup
  ) {
    console.log("PDFSignViewer constructor", dialog, canvas);
    this.dialog = dialog;
    this.canvas = canvas;
    this.overlayManager = overlayManager;
    this.l10n = l10n;
    this._fileNameLookup = fileNameLookup;

    this.overlayManager.register(this.dialog);
    this.signaturePad = new SignaturePad(this.canvas);
  }  

  async open() {    
    await Promise.all([      
      this.overlayManager.open(this.dialog),      
    ]);    
  }


  async close() {
    this.overlayManager.close(this.dialog);
  }

}

export { PDFSignViewer };
