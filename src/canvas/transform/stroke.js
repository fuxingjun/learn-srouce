const canvasRef = document.querySelector("#canvasRef");

canvasRef.width = 100;
canvasRef.height = 100;

const context = canvasRef.getContext("2d");

context.beginPath();
context.moveTo(0, 0);
context.lineTo(100, 100);


/**
 * 线性渐变
 * @type {CanvasGradient}
 */
const gradientStyle = context.createLinearGradient(0, 0, canvasRef.width, canvasRef.height);
gradientStyle.addColorStop(0, "rgba(100, 200, 155, 1)");
gradientStyle.addColorStop(0.8, "rgba(200, 120, 155, 1)");
gradientStyle.addColorStop(1, "rgba(0, 120, 105, 1)");

context.strokeStyle = gradientStyle;

context.stroke();
