// @ts-check
/// <reference types="p5/global" />

// ============================================
// p5.js Sketch 模板
// ============================================

// 設定原始畫布尺寸（你的設計基準尺寸）
// 修改這裡來設定你的作品尺寸
const BASE_WIDTH = 400;
const BASE_HEIGHT = 400;

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
function initSketch() {
  // ============================================
  // setup
  // ============================================

  background(0);
  noFill();

  drawer = new MyDrawer();

  background(255);
}

function draw() {
  push();
  scale(scaleRatio);
  drawer.draw();
  pop();
}

class MyDrawer {
  constructor() {
    this.drawingArea = {
      x: 0,
      y: 0,
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
    };
    this.lastArea = {
      x: 0,
      y: 0,
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
    };
    this.nextArea = {};
    this.wRatio = 1;
    this.hRatio = 1;
    this.step = 1;
    this.changing = false;

    this.g = get();
    this.changingDuration = 40;
    // this.drawingDuration = 80;
    this.setDrawingDuration();
    this.timer = this.drawingDuration;
    this.scaleRatio = scaleRatio;
  }

  setDrawingDuration() {
    this.drawingDuration = floor(
      min(this.drawingArea.width, this.drawingArea.height) / 5
    );
  }

  draw() {
    // print(this.timer);
    if (this.changing) {
      background(255);
      // 變形狀態
      // background(255);
      const ratio = easeInOutCubic(1 - this.timer / this.changingDuration);
      if (this.step % 4 == 2) {
        // 往左邊縮小
        const x = lerp(this.lastArea.x, this.nextArea.x, ratio);
        const y = lerp(this.lastArea.y, this.nextArea.y, ratio);
        const gWidth = lerp(
          this.lastArea.width,
          this.lastArea.width * (this.nextArea.height / this.lastArea.height),
          ratio
        );
        const gHeight = lerp(this.lastArea.height, this.nextArea.height, ratio);
        image(this.g, x, y, gWidth, gHeight);
      } else if (this.step % 4 == 3) {
        // 往上面縮小
        const x = lerp(this.lastArea.x, this.nextArea.x, ratio);
        const y = lerp(this.lastArea.y, this.nextArea.y, ratio);
        const gWidth = lerp(this.lastArea.width, this.nextArea.width, ratio);
        const gHeight = lerp(
          this.lastArea.height,
          this.lastArea.height * (this.nextArea.width / this.lastArea.width),
          ratio
        );
        image(this.g, x, y, gWidth, gHeight);
      } else if (this.step % 4 == 0) {
        // 往右邊縮小
        const x = lerp(
          this.lastArea.x,
          this.nextArea.x + this.nextArea.height,
          ratio
        );
        const y = lerp(this.lastArea.y, this.nextArea.y, ratio);
        const gWidth = lerp(
          this.lastArea.width,
          this.nextArea.width - this.nextArea.height,
          ratio
        );
        const gHeight = lerp(this.lastArea.height, this.nextArea.height, ratio);
        image(this.g, x, y, gWidth, gHeight);
      } else if (this.step % 4 == 1) {
        // 往下面縮小
        const x = lerp(this.lastArea.x, this.nextArea.x, ratio);
        const y = lerp(
          this.lastArea.y,
          this.nextArea.y + this.nextArea.width,
          ratio
        );
        const gWidth = lerp(this.lastArea.width, this.nextArea.width, ratio);
        const gHeight = lerp(
          this.lastArea.height,
          this.nextArea.height - this.nextArea.width,
          ratio
        );
        image(this.g, x, y, gWidth, gHeight);
      }
    } else {
      // 繪製狀態

      // stroke(0, 0, 0, 0);
      //--------遮罩開始
      stroke(255);
      rect(
        this.drawingArea.x,
        this.drawingArea.y,
        this.drawingArea.width,
        this.drawingArea.height
      );
      stroke(0);

      push();
      drawingContext.clip();
      //-------遮罩結束

      // 旋轉
      push();
      translate(this.drawingArea.x, this.drawingArea.y);
      translate(this.drawingArea.width / 2, this.drawingArea.height / 2);
      if (this.step % 4 == 1) {
        //圓心在右下
      } else if (this.step % 4 == 2) {
        //圓心在左下
        rotate(PI / 2);
      } else if (this.step % 4 == 3) {
        rotate(PI);
      } else if (this.step % 4 == 0) {
        rotate((PI * 3) / 2);
      }

      translate(-this.drawingArea.width / 2, -this.drawingArea.height / 2);

      const ratio = 1 - this.timer / this.drawingDuration;
      for (let i = 0; i < 200; i++) {
        const angle =
          lerp(PI - 0.1, (PI * 3) / 2 + 0.1, ratio) + random(-0.15, 0.15);
        strokeWeight(this.drawingArea.width * 0.005 * randomGaussian(1, 0.3));
        blendMode(MULTIPLY);
        const r = 1 - random(random(random()));
        const x =
          this.drawingArea.width + cos(angle) * this.drawingArea.width * r;
        const y =
          this.drawingArea.height + sin(angle) * this.drawingArea.height * r;
        stroke(0, 255, 255);
        point(x, y);
        stroke(255, 0, 255);
        const rand1 = random(
          -this.drawingArea.width * 0.005,
          this.drawingArea.width * 0.005
        );
        const rand2 = random(
          -this.drawingArea.width * 0.005,
          this.drawingArea.width * 0.005
        );
        point(x + rand1, y + rand2);
        stroke(255, 255, 0);
        const rand3 = random(
          -this.drawingArea.width * 0.005,
          this.drawingArea.width * 0.005
        );
        const rand4 = random(
          -this.drawingArea.width * 0.005,
          this.drawingArea.width * 0.005
        );
        point(x + rand3, y + rand4);
      }

      pop();

      // circle(
      //   random(this.drawingArea.x, this.drawingArea.x + this.drawingArea.width),
      //   random(
      //     this.drawingArea.y,
      //     this.drawingArea.y + this.drawingArea.height
      //   ),
      //   random(30, 50)
      // );

      pop();
    }

    // print(this.timer);

    this.timer--;
    if (this.timer == 0) {
      if (!this.changing) {
        //進入變形狀態的瞬間
        this.timer = this.changingDuration;
        if (this.wRatio > this.hRatio) {
          // 橫比例
          const gX = 0;
          const gY =
            (BASE_HEIGHT * ((this.wRatio - this.hRatio) / 2)) / this.wRatio;
          this.lastArea = {
            x: gX,
            y: gY,
            width: BASE_WIDTH,
            height: BASE_HEIGHT * (this.hRatio / this.wRatio),
          };
          this.g = get(
            this.lastArea.x * this.scaleRatio,
            this.lastArea.y * this.scaleRatio,
            this.lastArea.width * this.scaleRatio,
            this.lastArea.height * this.scaleRatio
          );
          // background(255);
          // rect(gX, gY, BASE_WIDTH, BASE_HEIGHT * (this.hRatio / this.wRatio));
          this.hRatio += this.wRatio;
          // 計算下一個主區域
          this.nextArea = {
            // 下個主區域會是直比例
            x: (BASE_WIDTH * ((this.hRatio - this.wRatio) / 2)) / this.hRatio,
            y: 0,
            width: BASE_WIDTH * (this.wRatio / this.hRatio),
            height: BASE_HEIGHT,
          };
        } else {
          //直比例
          const gX =
            (BASE_WIDTH * ((this.hRatio - this.wRatio) / 2)) / this.hRatio;
          const gY = 0;
          this.lastArea = {
            x: gX,
            y: gY,
            width: BASE_WIDTH * (this.wRatio / this.hRatio),
            height: BASE_HEIGHT,
          };
          this.g = get(
            this.lastArea.x * this.scaleRatio,
            this.lastArea.y * this.scaleRatio,
            this.lastArea.width * this.scaleRatio,
            this.lastArea.height * this.scaleRatio
          );
          // background(255);
          // rect(gX, gY, BASE_WIDTH * (this.wRatio / this.hRatio), BASE_HEIGHT);
          this.wRatio += this.hRatio;
          // 計算下一個主區域
          this.nextArea = {
            // 下個主區域會是橫比例
            x: 0,
            y: (BASE_HEIGHT * ((this.wRatio - this.hRatio) / 2)) / this.wRatio,
            width: BASE_WIDTH,
            height: BASE_HEIGHT * (this.hRatio / this.wRatio),
          };
        }

        // print("step" + this.step);
        // print("w:" + this.wRatio);
        // print("h:" + this.hRatio);

        // push();
        // stroke("blue");
        // rect(
        //   this.nextArea.x,
        //   this.nextArea.y,
        //   this.nextArea.width,
        //   this.nextArea.height
        // );
        // pop();

        // 找到下一個繪製區域
        if (this.step % 4 == 1) {
          //右
          this.drawingArea = {
            x: this.nextArea.x + this.nextArea.width - this.nextArea.height,
            y: this.nextArea.y,
            width: this.nextArea.height,
            height: this.nextArea.height,
          };
          // rect()
        } else if (this.step % 4 == 2) {
          //下
          this.drawingArea = {
            x: this.nextArea.x,
            y: this.nextArea.y + this.nextArea.height - this.nextArea.width,
            width: this.nextArea.width,
            height: this.nextArea.width,
          };
        } else if (this.step % 4 == 3) {
          //左
          this.drawingArea = {
            x: this.nextArea.x,
            y: this.nextArea.y,
            width: this.nextArea.height,
            height: this.nextArea.height,
          };
        } else if (this.step % 4 == 0) {
          //上
          this.drawingArea = {
            x: this.nextArea.x,
            y: this.nextArea.y,
            width: this.nextArea.width,
            height: this.nextArea.width,
          };
        }
        this.step++;
      } else {
        // 進入繪製狀態的瞬間
        this.setDrawingDuration();
        this.timer = this.drawingDuration;
        // print(this.timer);
      }
      this.changing = !this.changing;
    }
  }
}

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
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
