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

let quads = [];

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

// ============================================
// p5.js 繪製函數（動畫循環）
// ============================================

let drawer;
async function initSketch() {
  // ============================================
  // setup
  // ============================================
  const p0 = createVector(0, 0);
  const p1 = createVector(BASE_WIDTH, 0);
  const p2 = createVector(BASE_WIDTH, BASE_HEIGHT);
  const p3 = createVector(0, BASE_HEIGHT);

  divide(p0, p1, p2, p3);

  quads.sort(function (a, b) {
    return a.distanceFromCenter - b.distanceFromCenter;
  });
}

function draw() {
  background(0);
  push();
  scale(scaleRatio);
  for (let q of quads) {
    q.draw();
  }

  quads = quads.filter((a) => a.active == true);

  if (quads.length == 0) {
    const p0 = createVector(0, 0);
    const p1 = createVector(BASE_WIDTH, 0);
    const p2 = createVector(BASE_WIDTH, BASE_HEIGHT);
    const p3 = createVector(0, BASE_HEIGHT);
    divide(p0, p1, p2, p3);
  }
  pop();
}
function divide(p0, p1, p2, p3, depth = 0) {
  const maxDepth = random(6, 9); // 防止無限遞迴

  const l0 = p5.Vector.sub(p1, p0);
  const l1 = p5.Vector.sub(p2, p1);
  const l2 = p5.Vector.sub(p3, p2);
  const l3 = p5.Vector.sub(p0, p3);
  const perimeter = l0.mag() + l1.mag() + l2.mag() + l3.mag();

  const centerP = p5.Vector.lerp(
    p5.Vector.lerp(p0, p2, 0.5),
    p5.Vector.lerp(p1, p3, 0.5),
    0.5
  );

  // 判斷是否需要繼續切割
  if (depth < maxDepth && (random() < 0.8 || perimeter > 100)) {
    // 計算對邊的長度
    const topLength = l0.mag(); // p0 到 p1 (上邊)
    const bottomLength = l2.mag(); // p3 到 p2 (下邊)
    const leftLength = l3.mag(); // p0 到 p3 (左邊)
    const rightLength = l1.mag(); // p1 到 p2 (右邊)

    // 計算水平對邊和垂直對邊的平均長度
    const horizontalLength = (topLength + bottomLength) / 2;
    const verticalLength = (leftLength + rightLength) / 2;

    // 選擇較長的對邊進行切割
    if (horizontalLength > verticalLength) {
      // 水平切割：在上下兩邊的中間取隨機點
      const t1 = random(0.3, 0.7); // 上邊的隨機位置
      const t2 = random(0.3, 0.7); // 下邊的隨機位置

      const m1 = p5.Vector.lerp(p0, p1, t1); // 上邊的分割點
      const m2 = p5.Vector.lerp(p3, p2, t2); // 下邊的分割點

      // 分成兩個四邊形
      divide(p0, m1, m2, p3, depth + 1); // 左邊
      divide(m1, p1, p2, m2, depth + 1); // 右邊
    } else {
      // 垂直切割：在左右兩邊的中間取隨機點
      const t1 = random(0.1, 0.9); // 左邊的隨機位置
      const t2 = random(0.1, 0.9); // 右邊的隨機位置

      const m1 = p5.Vector.lerp(p0, p3, t1); // 左邊的分割點
      const m2 = p5.Vector.lerp(p1, p2, t2); // 右邊的分割點

      // 分成兩個四邊形
      divide(p0, p1, m2, m1, depth + 1); // 上邊
      divide(m1, m2, p2, p3, depth + 1); // 下邊
    }
  } else {
    // 不再切割，保存這個四邊形
    quads.push(new myQuad(p0, p1, p2, p3));
  }
}

class myQuad {
  constructor(p0, p1, p2, p3) {
    this.p0 = p0.copy();
    this.p1 = p1.copy();
    this.p2 = p2.copy();
    this.p3 = p3.copy();
    const centerP = p5.Vector.lerp(
      p5.Vector.lerp(p0, p2, 0.5),
      p5.Vector.lerp(p1, p3, 0.5),
      0.5
    );
    this.centerP = centerP;
    this.distanceFromCenter = dist(
      this.centerP.x,
      this.centerP.y,
      BASE_WIDTH / 2,
      BASE_HEIGHT / 2
    );
    this.timer = floor(
      map(this.distanceFromCenter, 0, (BASE_WIDTH / 2) * sqrt(2), 240, 360)
    );
    this.active = true;

    this.hue = random(0, 40);
    this.saturation = random(50);
    this.brightness = random(90, 100);
  }

  draw() {
    strokeWeight(5);
    colorMode(HSB);
    strokeJoin(BEVEL);

    if (this.timer <= 240 && this.timer >= 30) {
      const n = map(this.timer, 240, 180, 0, 1);
      fill(this.hue, this.saturation, this.brightness, easeInOutElastic(n));
      quad(
        this.p0.x,
        this.p0.y,
        this.p1.x,
        this.p1.y,
        this.p2.x,
        this.p2.y,
        this.p3.x,
        this.p3.y
      );
    }

    if (this.timer <= 240 && this.timer <= 30) {
      const n = map(this.timer, 30, 0, 1, 0);
      fill(this.hue, this.saturation, this.brightness, easeInOutElastic(n));
      quad(
        this.p0.x,
        this.p0.y,
        this.p1.x,
        this.p1.y,
        this.p2.x,
        this.p2.y,
        this.p3.x,
        this.p3.y
      );
    }

    this.timer--;
    if (this.timer == 0) {
      this.active = false;
    }
  }
}

function easeInOutElastic(x) {
  const c5 = (2 * Math.PI) / 4.5;
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
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
