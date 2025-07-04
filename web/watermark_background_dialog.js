/* Copyright 2024 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @typedef {import("./event_utils.js").EventBus} EventBus */
/** @typedef {import("./interfaces.js").IL10n} IL10n */
/** @typedef {import("./overlay_manager.js").OverlayManager} OverlayManager */
/** @typedef {import("./watermark_background.js").WatermarkBackgroundManager} WatermarkBackgroundManager */

class WatermarkBackgroundDialog {
  constructor(
    { dialog },
    overlayManager,
    watermarkManager,
    eventBus,
    l10n
  ) {
    this.dialog = dialog;
    this.overlayManager = overlayManager;
    this.watermarkManager = watermarkManager;
    this.eventBus = eventBus;
    this.l10n = l10n;
    
    this.overlayManager.register(this.dialog);
    this.setupEventListeners();
  }

  setupEventListeners() {
    // 启用/禁用水印
    const enableCheckbox = this.dialog.querySelector("#watermarkEnable");
    enableCheckbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        this.watermarkManager.enable();
      } else {
        this.watermarkManager.disable();
      }
      this.eventBus.dispatch("watermarkbackgroundchanged");
    });

    // 水印类型选择
    const watermarkType = this.dialog.querySelector("#watermarkType");
    const textSection = this.dialog.querySelector("#textWatermarkSection");
    const imageSection = this.dialog.querySelector("#imageWatermarkSection");
    
    watermarkType.addEventListener("change", (e) => {
      if (e.target.value === "text") {
        textSection.style.display = "block";
        imageSection.style.display = "none";
      } else {
        textSection.style.display = "none";
        imageSection.style.display = "block";
      }
    });

    // 文字水印设置
    const textInput = this.dialog.querySelector("#watermarkText");
    textInput.addEventListener("input", (e) => {
      this.updateWatermark();
    });

    // 图片水印设置
    const imageInput = this.dialog.querySelector("#watermarkImage");
    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.updateWatermark({ imageUrl: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    });

    // 透明度设置
    const opacityInput = this.dialog.querySelector("#watermarkOpacity");
    opacityInput.addEventListener("input", (e) => {
      this.updateWatermark();
    });

    // 旋转角度设置
    const rotationInput = this.dialog.querySelector("#watermarkRotation");
    rotationInput.addEventListener("input", (e) => {
      this.updateWatermark();
    });

    // 缩放设置
    const scaleInput = this.dialog.querySelector("#watermarkScale");
    scaleInput.addEventListener("input", (e) => {
      this.updateWatermark();
    });

    // 间距设置
    const spacingInput = this.dialog.querySelector("#watermarkSpacing");
    spacingInput.addEventListener("input", (e) => {
      this.updateWatermark();
    });

    // 应用按钮
    const applyButton = this.dialog.querySelector("#watermarkApply");
    applyButton.addEventListener("click", () => {
      this.applyWatermark();
      this.close();
    });

    // 取消按钮
    const cancelButton = this.dialog.querySelector("#watermarkCancel");
    cancelButton.addEventListener("click", () => {
      this.close();
    });

    // 清除按钮
    const clearButton = this.dialog.querySelector("#watermarkClear");
    clearButton.addEventListener("click", () => {
      this.watermarkManager.clearAllWatermarks();
      this.watermarkManager.disable();
      this.eventBus.dispatch("watermarkbackgroundchanged");
      this.close();
    });
  }

  updateWatermark(additionalProps = {}) {
    const watermarkType = this.dialog.querySelector("#watermarkType").value;
    const opacity = parseFloat(this.dialog.querySelector("#watermarkOpacity").value);
    const rotation = parseFloat(this.dialog.querySelector("#watermarkRotation").value);
    const scale = parseFloat(this.dialog.querySelector("#watermarkScale").value);
    const spacing = parseInt(this.dialog.querySelector("#watermarkSpacing").value);

    const watermark = {
      opacity,
      rotation,
      scale,
      spacing,
      ...additionalProps
    };

    if (watermarkType === "text") {
      watermark.text = this.dialog.querySelector("#watermarkText").value;
    }

    this.watermarkManager.setDefaultWatermark(watermark);
  }

  applyWatermark() {
    this.updateWatermark();
    this.watermarkManager.enable();
    this.eventBus.dispatch("watermarkbackgroundchanged");
  }

  open() {
    this.overlayManager.open(this.dialog);
    
    // 加载当前设置
    const currentWatermark = this.watermarkManager.defaultWatermark;
    if (currentWatermark) {
      this.dialog.querySelector("#watermarkEnable").checked = this.watermarkManager.enabled;
      this.dialog.querySelector("#watermarkOpacity").value = currentWatermark.opacity || 0.3;
      this.dialog.querySelector("#watermarkRotation").value = currentWatermark.rotation || -45;
      this.dialog.querySelector("#watermarkScale").value = currentWatermark.scale || 1.0;
      this.dialog.querySelector("#watermarkSpacing").value = currentWatermark.spacing || 200;
      
      if (currentWatermark.text) {
        this.dialog.querySelector("#watermarkType").value = "text";
        this.dialog.querySelector("#watermarkText").value = currentWatermark.text;
        this.dialog.querySelector("#textWatermarkSection").style.display = "block";
        this.dialog.querySelector("#imageWatermarkSection").style.display = "none";
      } else if (currentWatermark.imageUrl) {
        this.dialog.querySelector("#watermarkType").value = "image";
        this.dialog.querySelector("#textWatermarkSection").style.display = "none";
        this.dialog.querySelector("#imageWatermarkSection").style.display = "block";
      }
    }
  }

  close() {
    this.overlayManager.close(this.dialog);
  }
}

export { WatermarkBackgroundDialog }; 