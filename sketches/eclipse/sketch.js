// ============================================
// p5.js Sketch 模板
// ============================================

// 設定原始畫布尺寸（你的設計基準尺寸）
const BASE_WIDTH = 500;
const BASE_HEIGHT = 700;

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

function setup() {
  // 取得容器
  const container = document.getElementById("p5-canvas-wrapper");
  if (!container) {
    // 如果沒有容器，使用預設尺寸
    createCanvas(BASE_WIDTH, BASE_HEIGHT);
    pixelDensity(1);
    background(0);
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

  // 標記 p5.js 已初始化，現在可以安全使用 noLoop() 和 loop()
  p5Initialized = true;
}

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

  push();

  scale(scaleRatio);

  background(10);

  y = random(300, 400);

  let sunX = random(100, BASE_WIDTH - 100);
  let sunY = random(50, 150);

  let sunD = random(30, 50);

  push();
  translate(sunX, sunY);
  for (let i = 0; i < 4000; i++) {
    let r = sunD + random(random()) * 15;
    let theta = random(2 * PI);
    let x = cos(theta) * r;
    let y = sin(theta) * r;
    fill(255, 30);
    noStroke();
    circle(x, y, random(2));
  }
  pop();

  pop();
}

function draw() {
  push();
  scale(scaleRatio);
  // 你的創作程式碼
  // 注意：這裡的座標系統是基於 BASE_WIDTH x BASE_HEIGHT 的
  // 但實際繪製會自動縮放到 canvasWidth x canvasHeight

  for (let x = 0; x < BASE_WIDTH; x++) {
    let n1 = noise(x * 0.002, y * 0.008);
    let n2 = noise(x * 0.01 + 1000000, y * 0.01 + 1000000);
    let n3 = noise(x * 0.002 + 10000, y * 0.01 + 10000);

    let h = 10 + n1 * 150;

    noStroke();
    fill(n1 * 255 + random(-5, 5));
    rect(x, y, 3, -h);

    if (random() < 0.01 && n2 < 0.4) {
      fill(0, 5);
      rect(x, y - h, randomGaussian(5, 3), -randomGaussian(300, 10));
    }

    if (n3 > 0.5 && n3 < 0.51) {
      // fill("red")
      // circle(x,y-h,2)
      for (let j = 0; j < 100; j++) {
        let dotX = x;
        let dotY = y - h - random(random()) * 200;
        fill(255, 5);
        circle(dotX, dotY, random(2));
      }
    }
  }

  y++;

  if (y > BASE_HEIGHT + 200) {
    noLoop();
  }

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
