# PDF.js 水印背景功能使用指南

## 概述

PDF.js 水印背景功能允许您将水印作为PDF页面的背景进行渲染，而不是作为注释层。这种方式可以确保水印在打印时也会显示，并且不会被轻易移除。

## 功能特性

- **文字水印**：支持自定义文字内容、字体、大小、颜色
- **图片水印**：支持上传自定义图片作为水印
- **网格布局**：水印以网格形式重复显示在整个页面
- **可调节参数**：
  - 透明度 (0-1)
  - 旋转角度 (-180° 到 180°)
  - 缩放比例 (0.1-3.0)
  - 水印间距 (50-500px)
- **实时预览**：在设置对话框中提供实时预览功能
- **页面级控制**：可以为不同页面设置不同的水印

## 技术实现

### 1. 架构层次

```
WatermarkBackgroundManager (水印管理器)
    ↓
PDFPageView (页面视图)
    ↓
CanvasGraphics (画布图形)
    ↓
PDF渲染流程
```

### 2. 核心组件

#### WatermarkBackgroundManager
- 管理水印配置和状态
- 创建水印背景画布
- 处理水印的序列化和反序列化

#### WatermarkBackgroundDialog
- 提供用户界面进行水印设置
- 实时预览水印效果
- 管理水印配置的保存和加载

#### PDFPageView 集成
- 在页面渲染时应用水印背景
- 将水印作为背景传递给渲染引擎

### 3. 渲染流程

1. **页面初始化**：PDFPageView 创建时接收水印管理器
2. **渲染准备**：在 `draw()` 方法中检查水印配置
3. **背景生成**：调用水印管理器创建背景画布
4. **渲染执行**：将水印背景传递给 CanvasGraphics
5. **画布绘制**：在 `beginDrawing()` 中绘制水印背景

## 使用方法

### 1. 基本设置

```javascript
// 创建水印管理器
const watermarkManager = new WatermarkBackgroundManager();

// 设置默认水印
watermarkManager.setDefaultWatermark({
  text: "机密文件",
  opacity: 0.3,
  rotation: -45,
  scale: 1.0,
  spacing: 200
});

// 启用水印
watermarkManager.enable();
```

### 2. 文字水印

```javascript
watermarkManager.setDefaultWatermark({
  text: "内部资料",
  opacity: 0.4,
  rotation: -30,
  scale: 1.2,
  spacing: 150
});
```

### 3. 图片水印

```javascript
watermarkManager.setDefaultWatermark({
  imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  opacity: 0.5,
  rotation: 0,
  scale: 0.8,
  spacing: 100
});
```

### 4. 页面特定水印

```javascript
// 为第一页设置特定水印
watermarkManager.setPageWatermark(0, {
  text: "首页机密",
  opacity: 0.6
});

// 为第二页设置不同水印
watermarkManager.setPageWatermark(1, {
  text: "第二页",
  opacity: 0.3
});
```

### 5. 动态控制

```javascript
// 启用水印
watermarkManager.enable();

// 禁用水印
watermarkManager.disable();

// 清除所有水印
watermarkManager.clearAllWatermarks();

// 清除特定页面水印
watermarkManager.clearPageWatermark(0);
```

## 用户界面

### 水印设置对话框

对话框包含以下控件：

1. **启用/禁用开关**：控制水印功能的开启和关闭
2. **水印类型选择**：文字水印或图片水印
3. **文字输入框**：输入水印文字内容
4. **图片上传**：选择水印图片文件
5. **透明度滑块**：调节水印透明度 (0-1)
6. **旋转角度滑块**：调节水印旋转角度 (-180° 到 180°)
7. **缩放比例滑块**：调节水印大小 (0.1-3.0)
8. **间距滑块**：调节水印之间的间距 (50-500px)
9. **预览区域**：实时显示水印效果
10. **操作按钮**：应用、清除、取消

### 工具栏集成

在PDF查看器的工具栏中添加水印背景设置按钮：

```html
<button id="watermarkBackgroundButton" class="toolbarButton" title="水印背景设置">
  <span>水印背景</span>
</button>
```

## 配置选项

### 水印配置对象

```javascript
{
  text: string,           // 水印文字
  imageUrl: string,       // 水印图片URL
  opacity: number,        // 透明度 (0-1)
  rotation: number,       // 旋转角度 (度)
  scale: number,          // 缩放比例
  position: string,       // 位置 ('center', 'top-left', etc.)
  spacing: number         // 水印间距 (像素)
}
```

### 默认值

```javascript
{
  text: "机密文件",
  imageUrl: null,
  opacity: 0.3,
  rotation: -45,
  scale: 1.0,
  position: "center",
  spacing: 200
}
```

## 事件系统

### 监听水印变化

```javascript
eventBus._on("watermarkbackgroundchanged", () => {
  // 水印配置发生变化时的处理逻辑
  console.log("水印背景已更新");
});
```

### 触发重新渲染

```javascript
// 水印变化后重新渲染页面
pdfViewer.forceRendering();
```

## 性能考虑

1. **画布缓存**：水印背景画布会被缓存以提高性能
2. **异步生成**：图片水印采用异步加载避免阻塞
3. **内存管理**：及时清理不需要的画布对象
4. **渲染优化**：只在必要时重新生成水印背景

## 兼容性

- 支持现代浏览器 (Chrome, Firefox, Safari, Edge)
- 需要 Canvas API 支持
- 图片水印需要支持 FileReader API
- 建议使用支持 OffscreenCanvas 的浏览器以获得更好性能

## 注意事项

1. **文件大小**：图片水印会增加PDF文件大小
2. **打印效果**：水印背景在打印时会保持显示
3. **性能影响**：复杂水印可能影响渲染性能
4. **内存使用**：大量水印可能增加内存占用
5. **跨域限制**：外部图片水印需要处理跨域问题

## 故障排除

### 常见问题

1. **水印不显示**
   - 检查水印是否已启用
   - 确认透明度设置不为0
   - 验证水印配置是否正确

2. **图片水印加载失败**
   - 检查图片URL是否有效
   - 确认图片格式支持
   - 处理跨域访问问题

3. **性能问题**
   - 减少水印复杂度
   - 调整水印间距
   - 使用较小的图片文件

4. **内存泄漏**
   - 及时清理画布对象
   - 避免创建过多水印实例
   - 使用适当的水印缓存策略

## 扩展开发

### 自定义水印类型

```javascript
class CustomWatermarkManager extends WatermarkBackgroundManager {
  createCustomWatermark(config) {
    // 实现自定义水印逻辑
  }
}
```

### 添加新的水印效果

```javascript
// 添加渐变水印
watermarkManager.addGradientWatermark({
  startColor: '#ff0000',
  endColor: '#0000ff',
  direction: 'diagonal'
});
```

### 集成外部水印服务

```javascript
// 从外部服务获取水印
watermarkManager.setWatermarkFromService({
  serviceUrl: 'https://api.watermark.com/generate',
  params: { text: '机密文件', style: 'official' }
});
``` 