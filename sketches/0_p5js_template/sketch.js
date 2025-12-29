// ============================================
// p5.js Sketch 模板
// ============================================

// 設定原始畫布尺寸（你的設計基準尺寸）
const BASE_WIDTH = 800;
const BASE_HEIGHT = 800;

// 變數
let scaleRatio = 1;
let canvasWidth = BASE_WIDTH;
let canvasHeight = BASE_HEIGHT;
let p5Initialized = false;

// 監聽來自父頁面的控制訊息
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

function windowResized() {
  // 取得容器
  const container = document.getElementById("p5-canvas-wrapper");
  if (!container) return;

  // 計算容器尺寸
  const containerWidth =
    container.offsetWidth || container.clientWidth || window.innerWidth;
  const containerHeight =
    container.offsetHeight || container.clientHeight || window.innerHeight;

  // 計算縮放比例（保持寬高比）
  const scaleX = containerWidth / BASE_WIDTH;
  const scaleY = containerHeight / BASE_HEIGHT;
  scaleRatio = min(scaleX, scaleY);

  // 計算實際 canvas 尺寸
  canvasWidth = BASE_WIDTH * scaleRatio;
  canvasHeight = BASE_HEIGHT * scaleRatio;

  // 調整 canvas 大小
  resizeCanvas(canvasWidth, canvasHeight);

  // 根據縮放比例和設備像素比設定 pixelDensity（與 setup 中相同的邏輯）
  const devicePixelRatio = window.devicePixelRatio || 1;
  const targetDensity = devicePixelRatio * scaleRatio;

  // 限制在合理範圍內（1-3）以平衡畫質和效能
  const finalDensity = Math.max(1, Math.min(targetDensity, 3));
  pixelDensity(finalDensity);

  // 重新繪製以應用新的縮放比例
  redraw();
}

function setup() {
  // 取得容器
  const container = document.getElementById("p5-canvas-wrapper");
  if (!container) {
    // 如果沒有容器，使用預設尺寸
    createCanvas(BASE_WIDTH, BASE_HEIGHT);
    pixelDensity(1);
    background(255);
    p5Initialized = true; // 標記 p5.js 已初始化
    return;
  }

  // 計算容器尺寸
  const containerWidth =
    container.offsetWidth || container.clientWidth || window.innerWidth;
  const containerHeight =
    container.offsetHeight || container.clientHeight || window.innerHeight;

  // 計算縮放比例（保持寬高比）
  const scaleX = containerWidth / BASE_WIDTH;
  const scaleY = containerHeight / BASE_HEIGHT;
  scaleRatio = min(scaleX, scaleY); // 使用較小的比例以保持寬高比

  // 計算實際 canvas 尺寸
  canvasWidth = BASE_WIDTH * scaleRatio;
  canvasHeight = BASE_HEIGHT * scaleRatio;

  // 建立 canvas
  createCanvas(canvasWidth, canvasHeight);

  // 根據縮放比例和設備像素比設定 pixelDensity
  // 目標：維持相同的視覺 PPI（每英寸像素數）
  // 公式：pixelDensity = devicePixelRatio * scaleRatio
  const devicePixelRatio = window.devicePixelRatio || 1;
  const targetDensity = devicePixelRatio * scaleRatio;

  // 限制在合理範圍內（1-3）以平衡畫質和效能
  const finalDensity = Math.max(1, Math.min(targetDensity, 3));
  pixelDensity(finalDensity);

  background(255);

  // 標記 p5.js 已初始化，現在可以安全使用 noLoop() 和 loop()
  p5Initialized = true;
}

function draw() {
  // 清除之前的繪圖狀態
  background(255);

  // 使用 push() 和 scale() 來縮放座標系統
  // 這樣我們可以使用 BASE_WIDTH x BASE_HEIGHT 作為座標參考
  push();

  scale(scaleRatio);

  // 現在座標系統已經縮放，可以使用 BASE_WIDTH 和 BASE_HEIGHT
  // 例如：BASE_WIDTH / 2 會對應到實際 canvas 的中心
  circle(BASE_WIDTH / 2, BASE_HEIGHT / 2, 30);

  // mouseX 和 mouseY 需要除以 scaleRatio 來轉換到基準座標系統
  const baseMouseX = mouseX / scaleRatio;
  const baseMouseY = mouseY / scaleRatio;
  circle(baseMouseX, baseMouseY, 50);

  // 你的創作程式碼
  // 注意：這裡的座標系統是基於 BASE_WIDTH x BASE_HEIGHT 的
  // 所有座標值都應該使用基準尺寸（0 到 BASE_WIDTH，0 到 BASE_HEIGHT）
  // mouseX 和 mouseY 需要除以 scaleRatio 來轉換

  pop();
}

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
