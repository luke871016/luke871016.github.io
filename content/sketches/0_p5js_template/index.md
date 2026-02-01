+++
title = "p5.js 創作模板"
subtitle = ""
draft = true
date = ""
tags = [""]
image = '/images/'
canvas_bg = "#000"
+++

Made for Genuary2025-28 "Infinite Scroll."

## 使用方式

1. **複製模板資料夾**

   - 複製 `0_p5js_template` 資料夾
   - 重新命名為你的作品名稱（例如：`my-sketch`）

2. **修改 `index.md`**

   - 設定標題、日期、標籤等 Front Matter
   - 使用 <code> </code> 嵌入作品

3. **修改 `sketch.js`**
   - 調整 `BASE_WIDTH` 和 `BASE_HEIGHT` 為你的設計尺寸
   - 在 `setup()` 函數中初始化你的變數
   - 在 `draw()` 函數中撰寫你的創作程式碼

## 重要參數說明

### BASE_WIDTH 和 BASE_HEIGHT

這是你的設計基準尺寸。所有座標系統都基於這個尺寸，實際顯示時會自動縮放。

```javascript
const BASE_WIDTH = 500; // 你的設計寬度
const BASE_HEIGHT = 700; // 你的設計高度
```

### 座標系統

- 在 `draw()` 函數中，你可以直接使用 `BASE_WIDTH` 和 `BASE_HEIGHT` 作為參考
- 例如：`circle(BASE_WIDTH / 2, BASE_HEIGHT / 2, 50)` 會在畫布中心繪製圓形
- `mouseX` 和 `mouseY` 需要除以 `scaleRatio` 來取得正確座標：
  ```javascript
  let mx = mouseX / scaleRatio;
  let my = mouseY / scaleRatio;
  ```

### 變數初始化

在 `setup()` 函數中初始化你的變數，例如：

```javascript
let x = 0;
let y = BASE_HEIGHT / 2;
let speed = 2;
```

### 背景設定

如果需要設定背景色，在 `setup()` 中呼叫：

```javascript
background(220); // 灰色背景
```

## 範例程式碼

```javascript
// 在 setup() 中
let x = 0;
let y = BASE_HEIGHT / 2;
let speed = 2;
background(220);

// 在 draw() 中
push();
scale(scaleRatio);

background(220); // 清除上一幀（如果需要動畫）
fill(255, 0, 0);
circle(BASE_WIDTH / 2, BASE_HEIGHT / 2, 50);

x += speed;
if (x > BASE_WIDTH) {
  x = 0;
}
fill(0, 0, 255);
circle(x, y, 30);

pop();
```

## 功能說明

### 自動縮放

- 畫布會根據容器大小自動縮放
- 保持原始寬高比
- 自動調整像素密度以維持視覺品質

### 暫停/播放控制

- 作品會自動支援暫停/播放功能
- 透過 iframe 嵌入時，可以使用控制按鈕

### 響應式設計

- 自動適應不同螢幕尺寸
- 在獨立頁面模式（`?sketch_only=true`）中會自動置中

## 注意事項

1. **不要修改全域變數名稱**

   - `scaleRatio`、`canvasWidth`、`canvasHeight`、`p5Initialized` 是系統變數，請勿修改

2. **座標系統**

   - 在 `draw()` 中，使用 `push()` 和 `scale(scaleRatio)` 包裝你的程式碼
   - 記得在最後呼叫 `pop()`

3. **變數作用域**

   - 在檔案頂部宣告你的全域變數
   - 在 `setup()` 中初始化它們

4. **windowResized()**
   - 如果需要響應視窗大小改變，可以取消註解 `windowResized()` 函數
   - 注意：`resizeCanvas()` 會清除 canvas 內容，需要重新繪製

## 嵌入到其他文章

在其他文章中使用 shortcode 嵌入：

```markdown
{{< sketch name="your-sketch-name" width="500px" height="700px" reload="true">}}
```

參數說明：

- `name`: 你的 sketch 資料夾名稱
- `width`: iframe 寬度（例如：`"500px"` 或 `"100%"`）
- `height`: iframe 高度（例如：`"700px"`）
- `reload`: 是否顯示重新載入按鈕（可選，預設為 `false`）
