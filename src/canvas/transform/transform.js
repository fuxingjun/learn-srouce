const canvasRef = document.querySelector("#canvasRef");

canvasRef.width = 400;
canvasRef.height = 200;

const context = canvasRef.getContext("2d");

/**
 * 线性渐变
 * @type {CanvasGradient}
 */
const gradientStyle = context.createLinearGradient(0, 0, canvasRef.width, canvasRef.height);
gradientStyle.addColorStop(0, "rgba(100, 200, 155, 1)");
gradientStyle.addColorStop(0.8, "rgba(200, 120, 155, 1)");
gradientStyle.addColorStop(1, "rgba(0, 120, 105, 1)");

context.strokeStyle = gradientStyle;

// 画布平移
// context.translate(canvasRef.width / 2, canvasRef.height / 2);
// // 旋转画布
// context.rotate(Math.PI / 180 * 10)

// 平移加缩放把坐标原点移到左下角
context.scale(1, -1);
context.translate(0, -canvasRef.height);


// 绘制x轴
context.beginPath();
context.moveTo(0, 0);
context.lineTo(canvasRef.width, 0);
context.closePath();
context.stroke();

// 绘制y轴
context.beginPath();
context.moveTo(0, 0);
context.lineTo(0, canvasRef.height);
context.closePath();
context.stroke();

//绘制在圆心绘制圆圈
context.beginPath();
context.arc(0, 0, 50, 0, Math.PI * 2, true);
context.closePath();
context.fillStyle = gradientStyle;
context.fill();
