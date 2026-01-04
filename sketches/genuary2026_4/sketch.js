// @ts-check
/// <reference types="p5/global" />

// ============================================
// p5.js Sketch 模板
// ============================================

// 設定原始畫布尺寸（你的設計基準尺寸）
// 修改這裡來設定你的作品尺寸
const BASE_WIDTH = 700;
const BASE_HEIGHT = 700;

// ============================================
// 全域變數
// ============================================

let scaleRatio = 1;
let canvasWidth = BASE_WIDTH;
let canvasHeight = BASE_HEIGHT;
let p5Initialized = false;

// 在這裡宣告你的自訂變數
// 例如：
// let x = 0;
// let y = 0;
// let speed = 2;

// ============================================
// 控制訊息監聽（用於暫停/播放功能）
// ============================================

window.addEventListener("message", function (event) {
  if (!p5Initialized) return; // 等待 p5.js 初始化完成

  if (event.data && event.data.type === "pause-sketch") {
    // 暫停動畫
    noLoop();
  } else if (event.data && event.data.type === "play-sketch") {
    // 繼續播放動畫
    loop();
  }
});

// ============================================
// p5.js 設定函數
// ============================================

async function setup() {
  // 取得容器
  const container = document.getElementById("p5-canvas-wrapper");
  if (!container) {
    // 如果沒有容器，使用預設尺寸
    createCanvas(BASE_WIDTH, BASE_HEIGHT);
    pixelDensity(1);

    // 初始化你的創作
    initSketch();
    p5Initialized = true; // 標記 p5.js 已初始化
    return;
  }

  // 計算容器尺寸（使用 requestAnimationFrame 確保 DOM 已準備好）
  let containerWidth =
    container.offsetWidth || container.clientWidth || window.innerWidth;
  let containerHeight =
    container.offsetHeight || container.clientHeight || window.innerHeight;

  // 如果容器尺寸為 0，使用視窗尺寸
  if (containerWidth === 0 || containerHeight === 0) {
    containerWidth = window.innerWidth;
    containerHeight = window.innerHeight;
  }

  // 計算縮放比例（保持寬高比）
  const scaleX = containerWidth / BASE_WIDTH;
  const scaleY = containerHeight / BASE_HEIGHT;
  scaleRatio = min(scaleX, scaleY); // 使用較小的比例以保持寬高比

  // 計算實際 canvas 尺寸
  canvasWidth = BASE_WIDTH * scaleRatio;
  canvasHeight = BASE_HEIGHT * scaleRatio;

  // 建立 canvas（p5.js 會自動將它添加到 body）
  createCanvas(canvasWidth, canvasHeight);
  // createCanvas(BASE_WIDTH, BASE_HEIGHT);

  // 確保 canvas 在容器中（如果還沒有）
  const canvas = document.querySelector("canvas");
  if (canvas && container && !container.contains(canvas)) {
    container.appendChild(canvas);
  }

  // 根據縮放比例和設備像素比設定 pixelDensity
  // 目標：維持相同的視覺 PPI（每英寸像素數）
  // 公式：pixelDensity = devicePixelRatio * scaleRatio
  const devicePixelRatio = window.devicePixelRatio || 1;
  const targetDensity = devicePixelRatio * scaleRatio;

  // 限制在合理範圍內（1-3）以平衡畫質和效能
  // 注意：較高的 pixelDensity 會增加渲染負擔，可能導致初始卡頓
  const finalDensity = Math.max(1, Math.min(targetDensity, 3));
  pixelDensity(finalDensity);

  // 提示：如果遇到初始卡頓，可以考慮：
  // 1. 降低 pixelDensity 上限（例如改為 2）
  // 2. 將複雜的初始化邏輯延遲到 draw() 的第一幀
  // 3. 使用 requestAnimationFrame 分批處理大量計算

  // 初始化你的創作
  initSketch();

  // 標記 p5.js 已初始化，現在可以安全使用 noLoop() 和 loop()
  p5Initialized = true;
}

let img;
const rects = [];

async function initSketch() {
  // ============================================
  // setup
  // ============================================
  // 從 Dog API 取得隨機狗圖片 URL
  const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
  const data = await response.json();
  const imageUrl = data.message;

  // 使用取得的圖片 URL 載入圖片
  img = await loadImage(imageUrl);

  // resizeCanvas(width, (width * img.height) / img.width);
  img.resize(BASE_WIDTH, (BASE_WIDTH * img.height) / img.width);

  push();
  scale(scaleRatio);

  // imageMode(CENTER);
  background(0);
  image(img, 0, BASE_HEIGHT / 2 - img.height / 2);
  divide(0, BASE_HEIGHT / 2 - img.height / 2, img.width, img.height);

  beginClip();
  rect(0, BASE_HEIGHT / 2 - img.height / 2, img.width, img.height);
  endClip();

  background(0);

  for (let r of rects) {
    // stroke(255)
    // noFill()
    noStroke();

    // rect(...r.rect)
    const n = r.rect[2] + r.rect[3];
    // print(n)
    for (let i = 0; i < n * 2; i++) {
      fill(
        r.color[0] + random(-10, 10),
        r.color[1] + random(-10, 10),
        r.color[2] + random(-10, 10)
      );
      push();
      translate(
        random(r.rect[0], r.rect[0] + r.rect[2]),
        random(r.rect[1], r.rect[1] + r.rect[3])
      );
      const rotationNoise = noise(r.rect[0] * 0.01, r.rect[1] * 0.01);
      rotate(map(rotationNoise, 0, 1, -PI, PI));
      const s = random(3, r.rect[2] / 5);
      ellipse(0, 0, s, s * 2);
      pop();
    }
    if (n > 100) {
      await sleep(10);
    }
  }

  pop();
}

function divide(x, y, w, h) {
  // 將縮放後的座標轉換為實際 canvas 座標來讀取像素
  // 因為座標系統被 scale(scaleRatio) 縮放，所以需要乘以 scaleRatio 來取得實際 canvas 座標
  const actualX = (x + w / 2) * scaleRatio;
  const actualY = (y + h / 2) * scaleRatio;
  const centerColor = get(actualX, actualY);

  const ratio = (centerColor[0] + centerColor[1] + centerColor[2]) / 3 / 255;

  // 在縮放後的座標系統中，使用 BASE_WIDTH 和 BASE_HEIGHT 進行比較
  if (
    (w < BASE_WIDTH / 150 || h < BASE_HEIGHT / 150 || random() < ratio / 3) &&
    w < BASE_WIDTH / 10
  ) {
    rects.push({
      rect: [x, y, w, h],
      color: centerColor,
    });
    return;
  }

  const divideRatio = randomGaussian(0.5, 0.1);

  if (w > h) {
    divide(x, y, w * divideRatio, h);
    divide(x + w * divideRatio, y, w * (1 - divideRatio), h);
  } else {
    divide(x, y, w, h * divideRatio);
    divide(x, y + h * divideRatio, w, h * (1 - divideRatio));
  }
}

function draw() {
  push();
  scale(scaleRatio);

  pop();
  noLoop();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// ============================================
// 視窗大小改變時的處理（可選）
// ============================================

// 如果需要響應視窗大小改變，可以取消註解以下函數
// 注意：resizeCanvas() 會清除 canvas 內容，需要重新繪製

// function windowResized() {
//   // 取得容器
//   const container = document.getElementById("p5-canvas-wrapper");
//   if (!container) return;
//
//   // 如果 p5.js 還沒初始化完成，不執行
//   if (!p5Initialized) return;
//
//   // 計算容器尺寸
//   const containerWidth =
//     container.offsetWidth || container.clientWidth || window.innerWidth;
//   const containerHeight =
//     container.offsetHeight || container.clientHeight || window.innerHeight;
//
//   // 計算縮放比例（保持寬高比）
//   const scaleX = containerWidth / BASE_WIDTH;
//   const scaleY = containerHeight / BASE_HEIGHT;
//   scaleRatio = min(scaleX, scaleY);
//
//   // 計算實際 canvas 尺寸
//   canvasWidth = BASE_WIDTH * scaleRatio;
//   canvasHeight = BASE_HEIGHT * scaleRatio;
//
//   // 調整 canvas 大小（這會清除 canvas 內容）
//   resizeCanvas(canvasWidth, canvasHeight);
//
//   // 根據縮放比例和設備像素比設定 pixelDensity
//   const devicePixelRatio = window.devicePixelRatio || 1;
//   const targetDensity = devicePixelRatio * scaleRatio;
//   const finalDensity = Math.max(1, Math.min(targetDensity, 3));
//   pixelDensity(finalDensity);
//
//   // 重新繪製（因為 resizeCanvas 會清除內容）
//   // 如果需要重新初始化某些內容，可以在這裡處理
//   redraw();
// }

// ============================================
// 輔助函數（可選）
// ============================================

// 如果你想要使用原始尺寸的座標系統，可以使用這些函數
// function getScaledX(x) {
//   return x * scaleRatio;
// }
//
// function getScaledY(y) {
//   return y * scaleRatio;
// }
