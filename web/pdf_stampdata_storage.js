/** @typedef {import("./event_utils.js").EventBus} EventBus */
/** @typedef {import("./interfaces.js").IL10n} IL10n */
/** @typedef {import("./overlay_manager.js").OverlayManager} OverlayManager */
// eslint-disable-next-line max-len
/** @typedef {import("../src/display/api.js").PDFDocumentProxy} PDFDocumentProxy */

class PDFStampDataStorage {
  constructor() {

    this.language = Palmmob_language();
    if(this.language === "zh-CN"){
      this.default_stamps = this.#stamps_cn;
    } else {
      this.default_stamps = this.#stamps_en;
    }

    this.storageKey = 'pdf_stamp_data';
    this.stamps = this.loadStamps();
  }

  // 生成唯一ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // 保存签名数据到本地存储
  saveStamp(svgData, type) {
    const stamp = {
      id: this.generateId(),
      svgData: svgData,
      type: type
    };
    
    this.stamps.push(stamp);
    this.saveToLocalStorage();
    return stamp;
  }

  // 根据ID删除签名
  removeStampById(id) {
    const initialLength = this.stamps.length;
    this.stamps = this.stamps.filter(stamp => stamp.id !== id);
    
    if (this.stamps.length !== initialLength) {
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  // 获取所有签名列表
  getAllStamps() {
    return [...this.stamps, ...this.default_stamps];
  }

  // 根据ID获取签名
  getStampById(id) {
    const allStamps = this.getAllStamps();
    return allStamps.find(stamp => stamp.id === id);
  }

  // 保存到本地存储
  saveToLocalStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.stamps));
    } catch (error) {
      console.error('保存签名数据失败:', error);
    }
  }

  // 从本地存储加载数据
  loadStamps() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('加载签名数据失败:', error);
      return [];
    }
  }

  // 清空所有签名数据
  clearAllStamps() {
    this.stamps = [];
    this.saveToLocalStorage();
  }

  // 获取签名数量
  getStampCount() {
    return this.default_stamps.length + this.stamps.length;
  }

  // 检查是否存在指定ID的签名
  hasStamp(id) {
    const allStamps = this.getAllStamps();    
    return allStamps.some(stamp => stamp.id === id);
  }
  
  #stamps_cn = [
    {
      id: "1",
      svgUrl: "images/stamp_通过.svg",
      type: "sign"
    },
    {
      id: "4",
      svgUrl: "images/stamp_已阅.svg",
      type: "sign"
    },
    {
      id: "2",
      svgUrl: "images/stamp_同意.svg",
      type: "sign"
    },
    {
      id: "3",
      svgUrl: "images/stamp_合格.svg",
      type: "sign"
    },
    {
      id: "5",
      svgUrl: "images/stamp_驳回.svg",
      type: "sign"
    },
    {
      id: "6",
      svgUrl: "images/stamp_不同意.svg",
      type: "sign"
    },
    {
      id: "7",
      svgUrl: "images/stamp_不合格.svg",
      type: "sign"
    },
    {
      id: "8",
      svgUrl: "images/stamp_勾.svg",
      type: "sign"
    },
    {
      id: "9",
      svgUrl: "images/stamp_叉.svg",
      type: "sign"
    },
    {
      id: "10",
      svgUrl: "images/stamp_严禁复制.svg",
      type: "watermark"
    },
    {
      id: "11",
      svgUrl: "images/stamp_内部资料.svg",
      type: "watermark"
    },
    {
      id: "12",
      svgUrl: "images/stamp_保密.svg",
      type: "watermark"
    },
    {
      id: "13",
      svgUrl: "images/stamp_绝密.svg",
      type: "watermark"
    },
  ];

  #stamps_en = [
    {
      id: "1",
      svgUrl: "images/stamp_APPROVED.svg",
      type: "sign"
    },
    {
      id: "4",
      svgUrl: "images/stamp_READ.svg",
      type: "sign"
    },
    {
      id: "2",
      svgUrl: "images/stamp_AGREED.svg",
      type: "sign"
    },
    {
      id: "3",
      svgUrl: "images/stamp_QUALIFIED.svg",
      type: "sign"
    },
    {
      id: "5",
      svgUrl: "images/stamp_REJECTED.svg",
      type: "sign"
    },
    {
      id: "6",
      svgUrl: "images/stamp_DISAGREED.svg",
      type: "sign"
    },
    {
      id: "7",
      svgUrl: "images/stamp_UNQUALIFIED.svg",
      type: "sign"
    },
    {
      id: "8",
      svgUrl: "images/stamp_勾.svg",
      type: "sign"
    },
    {
      id: "9",
      svgUrl: "images/stamp_叉.svg",
      type: "sign"
    },
    {
      id: "10",
      svgUrl: "images/stamp_COPYING_PROHIBITED.svg",
      type: "watermark"
    },
    {
      id: "11",
      svgUrl: "images/stamp_INTERNAL_USE_ONLY.svg",
      type: "watermark"
    },
    {
      id: "12",
      svgUrl: "images/stamp_CONFIDENTIAL.svg",
      type: "watermark"
    },
    {
      id: "13",
      svgUrl: "images/stamp_TOP_SECRET.svg",
      type: "watermark"
    },
  ];
}

export { PDFStampDataStorage };
