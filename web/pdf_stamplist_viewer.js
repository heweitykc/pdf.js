/** @typedef {import("./event_utils.js").EventBus} EventBus */
/** @typedef {import("./interfaces.js").IL10n} IL10n */
/** @typedef {import("./overlay_manager.js").OverlayManager} OverlayManager */
// eslint-disable-next-line max-len
/** @typedef {import("../src/display/api.js").PDFDocumentProxy} PDFDocumentProxy */

import { AnnotationEditorParamsType } from "pdfjs-lib";

class PDFStampListViewer {  

  constructor(
    { dialog},
    overlayManager,
    pdfStampDataStorage,
    eventBus,
    l10n
  ) {
    this.dialog = dialog;
    this.canvas = this.dialog.querySelector("canvas");
    this.stampAddButton = this.dialog.querySelector("#stampListAddButton");    
    this.stampCancelButton = this.dialog.querySelector("#stampListCancelButton");    
    this.overlayManager = overlayManager;
    this.l10n = l10n;
    this.eventBus = eventBus;
    this.pdfStampDataStorage = pdfStampDataStorage;
    this.overlayManager.register(this.dialog);
    
    this.setupButtons();
  }

  setupButtons() {
    this.stampAddButton.addEventListener("click", async () => {
      await this.close();
      this.eventBus.dispatch("create_signature");
    });
    this.stampCancelButton.addEventListener("click", async () => {
      this.close();
    });
  }

  updateStampList() {
    const stampList = this.pdfStampDataStorage.getAllStamps();
    console.log(stampList);
    const stampListGrid = this.dialog.querySelector("#stampListGrid");    
    stampList.forEach(stamp => {
      if(stamp.type !== this.type) {
        return;
      }
      const stampItem = document.createElement("div");
      stampItem.classList.add("stamp-list-item");
      
      const img = document.createElement("img");
      if(stamp.svgUrl) {
        img.src = stamp.svgUrl;
      } else if(stamp.svgData) {
        img.src = `data:image/svg+xml;base64,${btoa(stamp.svgData)}`;
      }

      img.addEventListener("click", (e) => {
        e.stopPropagation();

        this.eventBus.dispatch("switchannotationeditorparams", {
          source: this,
          type: AnnotationEditorParamsType.CREATE,
          value: this.getSignatureData(stamp)
        });
        setTimeout(() => {
          this.close();
        }, 100);
      });
      
      stampItem.appendChild(img);
            
      if (stamp.svgData) {
        // 只为用户创建的签名（有svgData的）添加删除按钮
        const deleteButton = document.createElement("img");
        deleteButton.src = "images/sign_delete.svg";
        deleteButton.classList.add("stamp-delete-button");
        deleteButton.title = "删除";
        deleteButton.setAttribute("data-stamp-id", stamp.id);
        deleteButton.addEventListener("click", (e) => {
          e.stopPropagation();
          this.deleteStamp(stamp.id);
        });        
        stampItem.appendChild(deleteButton);
      }
      
      stampListGrid.appendChild(stampItem);
    });

    if(this.type === "sign") {
      this.stampAddButton.classList.remove("hidden");
    } else {
      this.stampAddButton.classList.add("hidden");
    }
  }

  deleteStamp(stampId) {
    // 只允许删除用户创建的签名，不允许删除默认签名
    if (this.pdfStampDataStorage.removeStampById(stampId)) {
      // 重新渲染列表
      this.clearStampList();
      this.updateStampList();
    }
  }

  clearStampList() {
    const stampListGrid = this.dialog.querySelector("#stampListGrid");
    while (stampListGrid.children.length > 1) {
      stampListGrid.removeChild(stampListGrid.lastChild);
    }
  }

  getSignatureData(stamp) {
    if(stamp.svgUrl) {
      return {
        type: "signature",
        svgUrl: stamp.svgUrl,
        timestamp: Date.now()
      };
    } else if(stamp.svgData) {
      return {
        type: "signature",
        svgString: stamp.svgData,
        timestamp: Date.now()
      };
    }
  }

  async open(type) {    
    this.overlayManager.open(this.dialog);
    this.type = type;
    this.updateStampList();
  }

  async close() {
    this.overlayManager.close(this.dialog);
    this.clearStampList();
  }

}

export { PDFStampListViewer };
