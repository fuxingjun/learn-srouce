const canvasRef = document.querySelector("#canvasRef");
canvasRef.width = 1000;
canvasRef.height = 500;
const context = canvasRef.getContext("2d");

context.fillStyle = 'rgb(222,155,155)';
/**
 * 线性渐变
 * @type {CanvasGradient}
 */
const gradient = context.createLinearGradient(0, 0, canvasRef.width, canvasRef.height);
gradient.addColorStop(0, 'rgba(100, 200, 155, 1)');
gradient.addColorStop(0.5, 'rgba(200, 120, 155, 1)');
gradient.addColorStop(1, 'rgba(200, 220, 255, 1)');

/**
 * 径向渐变
 * @type {CanvasGradient}
 */
const gradient2 = context.createRadialGradient(canvasRef.width / 2, canvasRef.height / 2, 50, canvasRef.width / 2, canvasRef.height / 2, 20);
gradient2.addColorStop(0, "rgba(100, 200, 155, 1)");
gradient2.addColorStop(0.8, "rgba(200, 120, 155, 1)");
gradient2.addColorStop(1, "rgba(0, 120, 105, 1)");

context.fillStyle = gradient2;

context.fillRect(0, 0, canvasRef.width, canvasRef.height);
