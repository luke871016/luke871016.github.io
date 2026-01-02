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

let ball;
let x;
let y;
let targetX;
let targetY;
let balls = [];

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

function initSketch() {
  // ============================================
  // setup
  // ============================================
  for (let i = 0; i < random(10, 20); i++) {
    balls.push(new Ball(random(BASE_WIDTH), random(BASE_HEIGHT)));
  }
}

// ============================================
// p5.js 設定函數
// ============================================

function setup() {
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

function draw() {
  push();
  scale(scaleRatio);
  background(255);
  for (let ball of balls) {
    ball.update();
    ball.draw();
  }
  pop();
}

class Ball {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.targetPosition = createVector(x, y);
    this.velocity = createVector(0, -1);
    let baseSize = randomGaussian(100, 25);
    this.w = baseSize;
    this.h = baseSize;
    this.timer = floor(random(60, 120));
    this.duration = this.timer;
  }

  setPosition(x, y) {
    this.pPosition = this.position.copy();
    this.position = p5.Vector.lerp(this.position, createVector(x, y), 0.2);
    this.velocity = p5.Vector.sub(this.position, this.pPosition);
  }

  update() {
    // y = lerp(y, targetY, 0.5)
    const nextPosition = this.position.copy().lerp(this.targetPosition, 0.3);
    this.setPosition(nextPosition.x, nextPosition.y);

    this.timer--;
    if (this.timer == 0) {
      this.targetPosition = createVector(
        random(BASE_WIDTH),
        random(BASE_HEIGHT)
      );
      this.timer = floor(random(60, 180));
      this.duration = this.timer;
    }
  }

  draw() {
    // print(this.velocity.heading())
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    const ratio1 = map(this.velocity.mag(), 0, 15, 1, 2, true);
    const ratio2 = map(this.velocity.mag(), 0, 15, 1, 0.5, true);

    noStroke();

    fill(0);
    ellipse(0, 0, this.w * ratio1, this.h * ratio2);

    stroke(map(this.timer, this.duration, 0, 30, 255, true));
    strokeWeight(
      map(this.timer, this.duration, 30, this.w * 0, this.w * 0.09, true)
    );
    const energyRatio = map(this.timer, this.duration, 0, 0.45, 0.5, true);
    fill(map(this.velocity.mag(), 0, 15, 0, 200, true));
    ellipse(0, 0, this.w * ratio1 * energyRatio, this.h * ratio2 * energyRatio);
    pop();
  }
}
