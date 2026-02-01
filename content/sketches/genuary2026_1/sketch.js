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
const ellipses = [];
let segmentModifier;

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

    segmentModifier = random(3, 6);

    noFill();
    colorMode(HSB);
    stroke(random(360), 29, 51);
    strokeWeight(1);

    for (let i = 0; i < 500; i++) {
      let x = random(BASE_WIDTH);
      let y = random(BASE_HEIGHT);
      let baseSize = max(randomGaussian(100, 50), 30);
      let w = baseSize;
      let h = baseSize * 1.618;
      let angle = random(TAU);

      let myEllipse = new MyEllipse(x, y, w, h, angle);

      let collisionChecked = true;
      for (let e of ellipses) {
        if (myEllipse.isCollision(e)) {
          collisionChecked = false;
          break;
        }
      }
      if (collisionChecked) {
        ellipses.push(myEllipse);
      }
    }

    for (let e of ellipses) {
      // e.draw()
      e.draw();
      await sleep(10);
    }

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

  // ============================================
  // 在這裡初始化你的變數
  // ============================================
  push();
  scale(scaleRatio);
  background(255);

  segmentModifier = random(3, 6);

  noFill();
  colorMode(HSB);
  stroke(random(360), 29, 51);
  strokeWeight(1);

  for (let i = 0; i < 500; i++) {
    let x = random(BASE_WIDTH);
    let y = random(BASE_HEIGHT);
    let baseSize = max(randomGaussian(100, 50), 30);
    let w = baseSize;
    let h = baseSize * 1.618;
    let angle = random(TAU);

    let myEllipse = new MyEllipse(x, y, w, h, angle);

    let collisionChecked = true;
    for (let e of ellipses) {
      if (myEllipse.isCollision(e)) {
        collisionChecked = false;
        break;
      }
    }
    if (collisionChecked) {
      ellipses.push(myEllipse);
    }
  }

  for (let e of ellipses) {
    // e.draw()
    e.draw();
    await sleep(10);
  }

  pop();

  // 標記 p5.js 已初始化，現在可以安全使用 noLoop() 和 loop()
  p5Initialized = true;
  noLoop();
}

// ============================================
// p5.js 繪製函數（動畫循環）
// ============================================

function draw() {
  push();
  scale(scaleRatio);

  // ============================================
  // 在這裡撰寫你的創作程式碼
  // ============================================
  // 注意：
  // 1. 這裡的座標系統是基於 BASE_WIDTH x BASE_HEIGHT 的
  // 2. 實際繪製會自動縮放到 canvasWidth x canvasHeight
  // 3. 你可以直接使用 BASE_WIDTH 和 BASE_HEIGHT 作為參考
  // 4. mouseX 和 mouseY 需要除以 scaleRatio 來取得正確的座標
  //    例如：let mx = mouseX / scaleRatio;
  //         let my = mouseY / scaleRatio;

  // 範例程式碼：
  // background(220);
  // fill(255, 0, 0);
  // circle(BASE_WIDTH / 2, BASE_HEIGHT / 2, 50);

  // x += speed;
  // if (x > BASE_WIDTH) {
  //   x = 0;
  // }
  // fill(0, 0, 255);
  // circle(x, BASE_HEIGHT / 2, 30);

  pop();
}

class MyEllipse {
  constructor(x, y, w, h, angle) {
    this.position = createVector(x, y);
    this.w = w;
    this.h = h;
    this.n = noise(this.position.x * 0.001, this.position.y * 0.001);
    this.angle = angle;
    this.segments = round((w + h) / segmentModifier);
    // this.segments = 10
  }

  draw() {
    const vertices = this.getVertices();
    const v = createVector(1, 0).rotate(this.n * TAU);
    vertices.sort(function (a, b) {
      const projectionA = getProjection(
        a.copy().add(BASE_WIDTH * 100, BASE_HEIGHT * 100),
        v
      );
      const projectionB = getProjection(
        b.copy().add(BASE_WIDTH * 100, BASE_HEIGHT * 100),
        v
      );
      return projectionA.mag() - projectionB.mag();
    });
    beginShape();

    for (let v of vertices) {
      vertex(v.x, v.y);
    }

    endShape();
  }

  getVertices() {
    let vertices = [];
    for (let i = 0; i < this.segments; i++) {
      let t = (i / this.segments) * TWO_PI;

      let px = (this.w / 2) * cos(t);
      let py = (this.h / 2) * sin(t);

      let rotatedX = px * cos(this.angle) - py * sin(this.angle);
      let rotatedY = px * sin(this.angle) + py * cos(this.angle);

      vertices.push(
        createVector(this.position.x + rotatedX, this.position.y + rotatedY)
      );
    }
    return vertices;
  }

  getAxes(vertices) {
    let axes = [];
    for (let i = 0; i < vertices.length; i++) {
      let p1 = vertices[i];
      let p2 = vertices[(i + 1) % vertices.length];

      let edge = p5.Vector.sub(p2, p1);

      let n = createVector(-edge.y, edge.x);
      n.normalize();

      axes.push(n);
    }
    return axes;
  }

  projectOntoAxis(axis, vertices) {
    let minAxis = Infinity;
    let maxAxis = -Infinity;

    for (let v of vertices) {
      let projection = v.dot(axis);
      minAxis = Math.min(minAxis, projection);
      maxAxis = Math.max(maxAxis, projection);
    }

    return {
      minAxis,
      maxAxis,
    };
  }
  projectionsOverlap(proj1, proj2) {
    return !(proj1.maxAxis < proj2.minAxis || proj2.maxAxis < proj1.minAxis);
  }

  // SAT
  isCollision(anotherEllipse) {
    let verticesA = this.getVertices();
    let verticesB = anotherEllipse.getVertices();

    let axesA = this.getAxes(verticesA);
    let axesB = this.getAxes(verticesB);
    let allAxes = axesA.concat(axesB);

    for (let axis of allAxes) {
      let projA = this.projectOntoAxis(axis, verticesA);
      let projB = this.projectOntoAxis(axis, verticesB);
      if (!this.projectionsOverlap(projA, projB)) {
        return false;
      }
    }

    return true;
  }
}

function getProjection(v1, v2) {
  return v2.copy().mult((p5.Vector.dot(v1, v2) / v2.mag()) * v2.mag());
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
