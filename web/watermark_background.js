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

/**
 * 水印背景管理器
 * 用于将水印作为PDF背景渲染
 */
class WatermarkBackgroundManager {
  constructor() {
    this.watermarks = new Map(); // 存储每页的水印配置
    this.defaultWatermark = null; // 默认水印
    this.enabled = false; // 是否启用水印背景
  }

  /**
   * 设置默认水印
   * @param {Object} watermark - 水印配置
   * @param {string} watermark.text - 水印文字
   * @param {string} watermark.imageUrl - 水印图片URL
   * @param {number} watermark.opacity - 透明度 (0-1)
   * @param {number} watermark.rotation - 旋转角度 (度)
   * @param {number} watermark.scale - 缩放比例
   * @param {string} watermark.position - 位置 ('center', 'top-left', 'top-right', 'bottom-left', 'bottom-right')
   * @param {number} watermark.spacing - 水印间距
   */
  setDefaultWatermark(watermark) {
    this.defaultWatermark = {
      text: watermark.text || "机密文件",
      imageUrl: watermark.imageUrl || null,
      opacity: watermark.opacity || 0.3,
      rotation: watermark.rotation || -45,
      scale: watermark.scale || 1.0,
      position: watermark.position || "center",
      spacing: watermark.spacing || 200,
      ...watermark
    };
  }

  /**
   * 为指定页面设置水印
   * @param {number} pageIndex - 页面索引
   * @param {Object} watermark - 水印配置
   */
  setPageWatermark(pageIndex, watermark) {
    this.watermarks.set(pageIndex, {
      ...this.defaultWatermark,
      ...watermark
    });
  }

  /**
   * 获取页面水印配置
   * @param {number} pageIndex - 页面索引
   * @returns {Object|null} 水印配置
   */
  getPageWatermark(pageIndex) {
    return this.watermarks.get(pageIndex) || this.defaultWatermark;
  }

  /**
   * 启用水印背景
   */
  enable() {
    this.enabled = true;
  }

  /**
   * 禁用水印背景
   */
  disable() {
    this.enabled = false;
  }

  /**
   * 创建水印背景画布
   * @param {number} width - 画布宽度
   * @param {number} height - 画布高度
   * @param {Object} watermark - 水印配置
   * @returns {HTMLCanvasElement} 水印背景画布
   */
  createWatermarkBackground(width, height, watermark) {
    if (!watermark || !this.enabled) {
      return null;
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 设置透明度
    ctx.globalAlpha = watermark.opacity;

    if (watermark.imageUrl) {
      this.#drawImageWatermark(ctx, width, height, watermark);
    } else if (watermark.text) {
      this.#drawTextWatermark(ctx, width, height, watermark);
    }

    return canvas;
  }

  /**
   * 绘制图片水印
   * @private
   */
  #drawImageWatermark(ctx, width, height, watermark) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const imgWidth = img.width * watermark.scale;
      const imgHeight = img.height * watermark.scale;
      const spacing = watermark.spacing;

      // 计算水印网格
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing;
          const y = row * spacing;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((watermark.rotation * Math.PI) / 180);
          ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
          ctx.restore();
        }
      }
    };

    img.src = watermark.imageUrl;
  }

  /**
   * 绘制文字水印
   * @private
   */
  #drawTextWatermark(ctx, width, height, watermark) {
    const fontSize = 24 * watermark.scale;
    ctx.font = `${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const textWidth = ctx.measureText(watermark.text).width;
    const textHeight = fontSize;
    const spacing = watermark.spacing;

    // 计算水印网格
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacing;
        const y = row * spacing;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((watermark.rotation * Math.PI) / 180);
        ctx.fillText(watermark.text, 0, 0);
        ctx.restore();
      }
    }
  }

  /**
   * 创建水印背景的data URL
   * @param {number} width - 画布宽度
   * @param {number} height - 画布高度
   * @param {Object} watermark - 水印配置
   * @returns {Promise<string>} 水印背景的data URL
   */
  async createWatermarkBackgroundDataURL(width, height, watermark) {
    return new Promise((resolve) => {
      if (!watermark || !this.enabled) {
        resolve(null);
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // 设置透明度
      ctx.globalAlpha = watermark.opacity;

      if (watermark.imageUrl) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          const imgWidth = img.width * watermark.scale;
          const imgHeight = img.height * watermark.scale;
          const spacing = watermark.spacing;

          // 计算水印网格
          const cols = Math.ceil(width / spacing) + 1;
          const rows = Math.ceil(height / spacing) + 1;

          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const x = col * spacing;
              const y = row * spacing;

              ctx.save();
              ctx.translate(x, y);
              ctx.rotate((watermark.rotation * Math.PI) / 180);
              ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
              ctx.restore();
            }
          }

          resolve(canvas.toDataURL());
        };

        img.onerror = () => {
          // 如果图片加载失败，使用文字水印
          this.#drawTextWatermark(ctx, width, height, watermark);
          resolve(canvas.toDataURL());
        };

        img.src = watermark.imageUrl;
      } else if (watermark.text) {
        this.#drawTextWatermark(ctx, width, height, watermark);
        resolve(canvas.toDataURL());
      } else {
        resolve(null);
      }
    });
  }

  /**
   * 清除指定页面的水印
   * @param {number} pageIndex - 页面索引
   */
  clearPageWatermark(pageIndex) {
    this.watermarks.delete(pageIndex);
  }

  /**
   * 清除所有水印
   */
  clearAllWatermarks() {
    this.watermarks.clear();
    this.defaultWatermark = null;
  }
}

export { WatermarkBackgroundManager }; 