// ============================================
// p5.js Sketch 模板
// ============================================

// 設定原始畫布尺寸（你的設計基準尺寸）
// 修改這裡來設定你的作品尺寸
const BASE_WIDTH = 500;
const BASE_HEIGHT = 500;

// ============================================
// 全域變數
// ============================================

let scaleRatio = 1;
let canvasWidth = BASE_WIDTH;
let canvasHeight = BASE_HEIGHT;
let p5Initialized = false;

// 在這裡宣告你的自訂變數
let colorPalette = [];
let rects = [];
let yTranslation = 0;
let scrollVelocity = 10;
let rectQueue = [];
let counter = 1;
let divideY;

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

    background(255);

    push();
    colorMode(HSB);
    const startHue = random(360);
    for (let i = 0; i < 3; i++) {
      const hue = (startHue + i * 120 + random(-20, 20)) % 360;
      let sat = 100;
      let bri = 100;
      if (i == 1 && random() < 0.5) {
        sat = random(10, 30);
        bri = random() < 0.5 ? random(0, 40) : random(95, 100);
      }
      colorPalette.push(color(hue, sat, bri));
    }
    pop();

    divideY = BASE_HEIGHT;
    divide(0, divideY, BASE_WIDTH, BASE_HEIGHT / 2);
    divideY += BASE_HEIGHT / 2;

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
  const finalDensity = Math.max(1, Math.min(targetDensity, 3));
  pixelDensity(finalDensity);

  // ============================================
  // 在這裡初始化你的變數
  // ============================================
  push();
  colorMode(HSB);
  const startHue = random(360);
  for (let i = 0; i < 3; i++) {
    const hue = (startHue + i * 120 + random(-20, 20)) % 360;
    let sat = 100;
    let bri = 100;
    if (i == 1 && random() < 0.5) {
      sat = random(10, 30);
      bri = random() < 0.5 ? random(0, 40) : random(95, 100);
    }
    colorPalette.push(color(hue, sat, bri));
  }
  pop();

  divideY = height;
  divide(0, divideY, width, height / 2);
  divideY += height / 2;

  // 標記 p5.js 已初始化，現在可以安全使用 noLoop() 和 loop()
  p5Initialized = true;
}

// ============================================
// p5.js 繪製函數（動畫循環）
// ============================================

function draw() {
  push();
  scale(scaleRatio);

  if (frameCount % 100 == 0) {
    scrollVelocity = random(5, 25);
  }

  scrollVelocity = lerp(scrollVelocity, 0, 0.05);

  background(colorPalette[2]);
  // background(255)

  translate(0, yTranslation);

  for (let ktRect of rects) {
    ktRect.draw();
  }

  for (let r of rectQueue) {
    if (r.y + r.h + yTranslation < BASE_HEIGHT + 100 && r.added == false) {
      rects.push(
        new KtRect({
          x: r.x,
          y: r.y,
          w: r.w,
          h: r.h,
          timer: random(0, 120),
        })
      );
      r.added = true;
    }
  }

  if (rectQueue.length == 0) {
    divide(0, divideY, BASE_WIDTH, BASE_HEIGHT / 2);
    divideY += BASE_HEIGHT / 2;
  }

  rectQueue = rectQueue.filter((e) => e.added == false);
  rects = rects.filter((e) => e.y + e.h > -yTranslation);
  yTranslation -= scrollVelocity;

  pop();
}

function divide(x, y, w, h) {
  if (
    w < 50 ||
    h < 50 ||
    (random() < 0.05 && w < BASE_WIDTH / 3 && h < BASE_WIDTH / 3)
  ) {
    rectQueue.push({
      x: x,
      y: y,
      w: w,
      h: h,
      added: false,
    });

    return;
  }

  const ratio = random(0.3, 0.7);
  if (w > h) {
    divide(x, y, w * ratio, h);
    divide(x + ratio * w, y, w * (1 - ratio), h);
  } else {
    divide(x, y, w, h * ratio);
    divide(x, y + h * ratio, w, h * (1 - ratio));
  }
}

class KtRect {
  constructor(argus) {
    this.x = argus.x;
    this.y = argus.y;
    this.w = argus.w;
    this.h = 0;
    this.targetH = argus.h;
    this.centerX = this.x + this.w / 2;
    this.centerY = this.y + this.h / 2;
    this.nowColor = 0;
    this.timer = argus.timer || 60;
    this.duration = 90;
    this.nowDirection = floor(random(0, 4));
    this.transitionSeed = random();
    this.transitionType = floor(random(0, 10));
  }
  initial() {
    this.timer = this.duration;
    this.nowColor++;
    if (this.nowColor > colorPalette.length - 1) this.nowColor = 0;
    this.nowDirection = floor(random(0, 4));
    this.transitionSeed = random();
    this.transitionType = floor(random(0, 10));
  }
  draw() {
    this.h = lerp(this.h, this.targetH, 0.1);
    noStroke();
    const lastColor =
      this.nowColor > 0 ? this.nowColor - 1 : colorPalette.length - 1;
    fill(colorPalette[lastColor]);
    rect(this.x, this.y, this.w, this.h);

    //--maskRect--
    noFill();
    stroke(255, 0);
    rect(this.x, this.y, this.w, this.h);
    push();
    drawingContext.clip(); //mask
    push();
    translate(this.x, this.y);
    fill(colorPalette[this.nowColor]);
    let x, y, w, h, t, r, d, maxD;
    let xStart, yStart, xStart2, yStart2; //1
    let startAngle, rotateAngle, angle; //3

    if (this.timer <= this.duration) {
      switch (this.transitionType) {
        case 0:
          t = easeInOutCubic(map(this.timer, this.duration, 0, 0, 1));
          const target = this.nowDirection < 2 ? this.h : this.w;
          w = map(t, 0, 1, 0, target);
          switch (this.nowDirection) {
            case 0:
              rect(0, this.h - w, this.w, w);
              break;
            case 1:
              rect(0, 0, this.w, w);
              break;
            case 2:
              rect(0, 0, w, this.h);
              break;
            case 3:
              rect(this.w - w, 0, w, this.h);
              break;
          }
          break;
        case 1:
          t = easeInOutCubic(map(this.timer, this.duration, 0, 0, 1));
          xStart = ((this.transitionSeed * 100) % 1) * this.w;
          yStart = ((this.transitionSeed * 10000) % 1) * this.h;
          push();
          rectMode(CENTER);
          x = map(t, 0, 1, xStart, this.w / 2);
          y = map(t, 0, 1, yStart, this.h / 2);
          w = map(t, 0, 1, 0, this.w);
          h = map(t, 0, 1, 0, this.h);
          r = map(t, 0, 1, this.w, 0);
          rect(x, y, w, h, r);
          pop();
          break;
        case 2:
          t = easeInOutExpo(map(this.timer, this.duration, 0, 0, 1));
          switch (this.nowDirection) {
            case 0:
              w = map(t, 0, 1, 0, this.w);
              quad(0, 0, w, 0, this.w, this.h, this.w - w, this.h);
              break;
            case 1:
              w = map(t, 0, 1, 0, this.w);
              quad(this.w - w, 0, 0, this.h, w, this.h, this.w, 0);
              break;
            case 2:
              w = map(t, 0, 1, 0, this.h);
              quad(0, 0, 0, w, this.w, this.h, this.w, this.h - w);
              break;
            case 3:
              w = map(t, 0, 1, 0, this.h);
              quad(0, this.h - w, this.w, 0, this.w, w, 0, this.h);
              break;
          }
          break;
        case 3:
          t = easeInOutExpo(map(this.timer, this.duration, 0, 0, 1));
          startAngle = map(this.transitionSeed, 0, 1, 0, TWO_PI);
          angle = map(t, 0, 1, 0, PI);
          xStart = ((this.transitionSeed * 100) % 1) * this.w;
          yStart = ((this.transitionSeed * 10000) % 1) * this.h;
          x = map(t, 0, 1, xStart, this.w / 2);
          y = map(t, 0, 1, yStart, this.h / 2);
          d = sqrt(this.w * this.w + this.h * this.h) * 2;
          arc(x, y, d, d, startAngle - angle * 1, startAngle + angle * 1);
          break;
        case 4:
          t = easeInOutExpo(map(this.timer, this.duration, 0, 0, 1));
          startAngle = map(this.transitionSeed, 0, 1, -PI, PI);
          rotateAngle = map(t, 0, 1, startAngle, 0);
          w = map(t, 0, 1, 0, this.w);
          h = map(t, 0, 1, 0, this.h);
          push();
          translate(this.w / 2, this.h / 2);
          rotate(rotateAngle);
          rectMode(CENTER);
          if (this.nowDirection < 2) {
            rect(0, 0, this.w, h);
          } else {
            rect(0, 0, w, this.h);
          }
          pop();
          break;
        case 5:
          t = easeInOutExpo(map(this.timer, this.duration, 0, 0, 1));
          let startX, startY;
          let endX, endY;
          switch (this.nowDirection) {
            case 0:
              startX = 0;
              startY = 0;
              endX = this.w;
              endY = this.h;
              startAngle = atan2(this.h, this.w);
              break;
            case 1:
              startX = this.w;
              startY = this.h;
              endX = 0;
              endY = 0;
              startAngle = atan2(-this.h, -this.w);
              break;
            case 2:
              startX = this.w;
              startY = 0;
              endX = 0;
              endY = this.h;
              startAngle = atan2(this.h, -this.w);
              break;
            case 3:
              startX = 0;
              startY = this.h;
              endX = this.w;
              endY = 0;
              startAngle = atan2(-this.h, this.w);
              break;
          }
          x = map(t, 0, 1, startX, endX);
          y = map(t, 0, 1, startY, endY);
          angle = map(t, 0, 1, startAngle, startAngle + PI);
          d = sqrt(this.w * this.w + this.h * this.h) * 2;
          arc(x, y, d, d, startAngle, angle);
          arc(x, y, d, d, startAngle + PI, angle + PI);
          break;
        case 6:
          t = easeInOutExpo(map(this.timer, this.duration, 0, 0, 1));
          switch (this.nowDirection) {
            case 0:
              x = 0;
              y = 0;
              break;
            case 1:
              x = this.w;
              y = this.h;
              break;
            case 2:
              x = this.w;
              y = 0;
              break;
            case 3:
              x = 0;
              y = this.h;
              break;
          }
          maxD = sqrt(this.w * this.w + this.h * this.h) * 2;
          d = map(t, 0, 1, 0, maxD);
          circle(x, y, d);
          break;
        case 7:
          t = easeInOutExpo(map(this.timer, this.duration, 0, 0, 1));
          maxD = sqrt(this.w * this.w + this.h * this.h);
          d = map(t, 0, 1, 0, maxD);
          circle(0, 0, d);
          circle(this.w, 0, d);
          circle(0, this.h, d);
          circle(this.w, this.h, d);
          break;
        case 8:
          t = easeInOutCubic(map(this.timer, this.duration, 0, 0, 1));
          if (this.w > this.h) {
            const x = map(t, 0, 1, 0, this.w);
            const maxD = this.w * 2;
            const d = map(t, 0, 1, 0, maxD);
            if (this.nowDirection < 2) {
              circle(x, 0, d);
              circle(this.w - x, this.h, d);
            } else {
              circle(this.w - x, 0, d);
              circle(x, this.h, d);
            }
          } else {
            const y = map(t, 0, 1, 0, this.h);
            const maxD = this.h * 2;
            const d = map(t, 0, 1, 0, maxD);
            if (this.nowDirection < 2) {
              circle(0, y, d);
              circle(this.w, this.h - y, d);
            } else {
              circle(this.w, y, d);
              circle(0, this.h - y, d);
            }
          }
          break;
        case 9:
          t = easeInOutExpo(map(this.timer, this.duration, 0, 0, 1));
          xStart = ((this.transitionSeed * 10) % 1) * this.w;
          yStart = ((this.transitionSeed * 100000000) % 1) * this.h;
          xStart2 = ((this.transitionSeed * 10000) % 1) * this.w;
          yStart2 = ((this.transitionSeed * 1000000) % 1) * this.h;
          const p1 = createVector(
            map(t, 0, 1, xStart, 0),
            map(t, 0, 1, yStart, 0)
          );
          const p2 = createVector(
            map(t, 0, 1, xStart, this.w),
            map(t, 0, 1, yStart, 0)
          );
          const p3 = createVector(
            map(t, 0, 1, xStart2, this.w),
            map(t, 0, 1, yStart2, this.h)
          );
          const p4 = createVector(
            map(t, 0, 1, xStart2, 0),
            map(t, 0, 1, yStart2, this.h)
          );
          quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
          break;
      }
    }

    pop();
    pop();
    this.timer--;
    if (this.timer <= 0) this.initial();
  }
}

function easeInOutQuart(x) {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
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
