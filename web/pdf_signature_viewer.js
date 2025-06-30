/** @typedef {import("./event_utils.js").EventBus} EventBus */
/** @typedef {import("./interfaces.js").IL10n} IL10n */
/** @typedef {import("./overlay_manager.js").OverlayManager} OverlayManager */
// eslint-disable-next-line max-len
/** @typedef {import("../src/display/api.js").PDFDocumentProxy} PDFDocumentProxy */

import { AnnotationEditorParamsType } from "pdfjs-lib";
import { getPageSizeInches, isPortraitOrientation } from "./ui_utils.js";
import { PDFDateString } from "pdfjs-lib";


class PDFSignViewer {
  #fieldData = null;

  constructor(
    { dialog},
    overlayManager,
    eventBus,
    l10n    
  ) {
    this.dialog = dialog;
    this.canvas = this.dialog.querySelector("canvas");
    this.signAddButton = this.dialog.querySelector("#signAddButton");    
    this.signCancelButton = this.dialog.querySelector("#signCancelButton");
    this.signClearButton = this.dialog.querySelector("#signClearButton");
    this.overlayManager = overlayManager;
    this.l10n = l10n;
    this.eventBus = eventBus;

    this.overlayManager.register(this.dialog);

    this.signaturePad = new SignaturePad(this.canvas, {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      penColor: 'rgb(0, 0, 0)',
      minWidth: 2,
      maxWidth: 6,
      throttle: 8,
      velocityFilterWeight: 0.3,
    });

    this.setupFullscreenCanvas();
    this.setupButtons();
  }

  setupButtons() {
    this.signAddButton.addEventListener("click", async () => {
      const signatureData = await this.getSignatureData();
      if (!signatureData) {
        console.warn("签名数据为空");
        return;
      }
      
      this.eventBus.dispatch("switchannotationeditorparams", {
        source: this,
        type: AnnotationEditorParamsType.CREATE,
        value: signatureData,
      });
      
      this.close();
    });


    this.signClearButton.addEventListener("click", async () => {
      this.signaturePad.clear();
    });

    this.signCancelButton.addEventListener("click", async () => {
      this.close();
    });
    
  }

  setupFullscreenCanvas() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  resizeCanvas() {
    if (!this.canvas) return;
        
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    this.canvas.width = this.canvas.offsetWidth * ratio;
    this.canvas.height = this.canvas.offsetHeight * ratio;    
    
    const ctx = this.canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    ctx.imageSmoothingEnabled = false;
    
    this.signaturePad.clear();
  }

  async open() {    
    this.overlayManager.open(this.dialog);
    await new Promise(resolve => setTimeout(resolve, 100));
    this.resizeCanvas();
  }

  async close() {
    this.overlayManager.close(this.dialog);
    this.signaturePad.clear();
  }

  async getSignatureData() {
    if (!this.signaturePad || this.signaturePad.isEmpty()) {
      return null;
    }
    
    const croppedSvg = this.getCroppedSignature();
        
    return {
      type: "signature",
      svgString: croppedSvg,
      isEmpty: this.signaturePad.isEmpty(),
      data: this.signaturePad.toData(),
      timestamp: Date.now()
    };
  }

  getCroppedSignature() {
    const data = this.signaturePad.toData();
    if (!data || data.length === 0) {
      return this.signaturePad.toSVG();
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    for (const stroke of data) {
      for (const point of stroke.points) {
        minX = Math.min(minX, point.x);
        minY = Math.min(minY, point.y);
        maxX = Math.max(maxX, point.x);
        maxY = Math.max(maxY, point.y);
      }
    }

    const padding = 20;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = Math.min(this.canvas.width, maxX + padding);
    maxY = Math.min(this.canvas.height, maxY + padding);

    const width = maxX - minX;
    const height = maxY - minY;

    const originalSvg = this.signaturePad.toSVG();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(originalSvg, 'image/svg+xml');
    const svgElement = svgDoc.documentElement;
    
    svgElement.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    svgElement.setAttribute('width', width*0.25);
    svgElement.setAttribute('height', height*0.25);

    return new XMLSerializer().serializeToString(svgElement);
  }

  // 清除签名
  clearSignature() {
    if (this.signaturePad) {
      this.signaturePad.clear();
    }
  }
}

export { PDFSignViewer };
