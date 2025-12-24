// p5.js sketch - 使用 global mode（全域模式）
// 可以直接使用 setup() 和 draw()，不需要 p. 前綴

let x = 0;
let y = 0;
let speedX = 2;
let speedY = 2;

function setup() {
  // 建立 canvas，寬度會自動適應容器
  const container = document.getElementById("p5-canvas-wrapper");
  const isEmbedMode =
    window.location.hash === "#embed" || window.self !== window.top;

  let containerWidth = 800;
  if (container) {
    if (isEmbedMode) {
      // 嵌入模式：使用 iframe 的寬度
      containerWidth =
        container.offsetWidth || container.clientWidth || window.innerWidth;
    } else {
      // 正常模式：使用容器的寬度
      containerWidth = container.offsetWidth || 800;
    }
  }

  createCanvas(containerWidth, 400);
  background(255);

  // 初始化位置
  x = width / 2;
  y = height / 2;
}

function windowResized() {
  // 當視窗大小改變時，調整 canvas 大小
  const container = document.getElementById("p5-canvas-wrapper");
  if (!container) return;

  // 在嵌入模式下，使用 iframe 的寬度
  const isEmbedMode =
    window.location.hash === "#embed" || window.self !== window.top;
  let containerWidth = 800;

  if (isEmbedMode) {
    // 嵌入模式：使用 iframe 的寬度
    containerWidth =
      container.offsetWidth || container.clientWidth || window.innerWidth;
  } else {
    // 正常模式：使用容器的寬度
    containerWidth = container.offsetWidth || 800;
  }

  if (containerWidth > 0) {
    resizeCanvas(containerWidth, 400);
  }
}

function draw() {
  // 半透明背景創造拖尾效果
  fill(240, 240, 240, 10);
  rect(0, 0, width, height);

  // 移動圓形
  x += speedX;
  y += speedY;

  // 邊界碰撞檢測
  if (x > width || x < 0) {
    speedX *= -1;
  }
  if (y > height || y < 0) {
    speedY *= -1;
  }

  // 繪製圓形
  fill(100, 150, 255);
  noStroke();
  ellipse(x, y, 50, 50);

  // 繪製文字
  fill(50);
  textAlign(CENTER);
  textSize(24);
  text("Hello p5.js!", width / 2, 50);
}
