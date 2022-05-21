const canvasRef = document.querySelector("#canvasRef");

canvasRef.width = 831;
canvasRef.height = 706;

const context = canvasRef.getContext("2d");
context.translate(canvasRef.width / 2, canvasRef.height / 2);
context.scale(1, -1);

context.arc(0, 0, 50, 0, Math.PI * 2, true);

context.strokeStyle = "rgb(189, 142, 16)";
context.stroke();

context.beginPath();
// 左下至右上骨架线
// the skeleton line from Bottom Left to Top Right
const y = Math.tan(Math.PI / 180 * 30) * 300;
context.moveTo(-300, -y);
context.lineTo(300, y);

// 中间骨架线
// the skeleton line in the middle
context.moveTo(0, 300);
context.lineTo(0, -300);

// 右下至左上骨架线
// the skeleton line from Bottom Right to Top Left
context.moveTo(300, -y)
context.lineTo(-300, y)

context.closePath();
context.strokeStyle = "rgb(189, 142, 16)";
context.stroke();

// 发散的圆
// divergent circles
context.strokeStyle = "rgb(189, 142, 16)";
for (let i = 0; i < 6; i++) {
    context.beginPath();
    context.arc(0, 0, 50 * (i + 1), 0, Math.PI * 2, true);
    context.closePath();
    context.stroke();
}

/**
 * 创建多边形线条
 * create path of polygon
 * @param context
 * @param dataItem
 */
function createPolygonPath(context, dataItem) {
    const cosDeg30 = Math.cos(Math.PI / 180 * 30);
    const sinDeg30 = Math.cos(Math.PI / 180 * 30);
    context.beginPath();
    // 顺时针从右上开始绘制
    // draw clockwise from Top Right
    context.lineTo(dataItem[0] * cosDeg30, dataItem[0] * sinDeg30);
    context.lineTo(dataItem[1] * cosDeg30, -dataItem[1] * sinDeg30);
    context.lineTo(0, -dataItem[2]);
    context.lineTo(-dataItem[3] * cosDeg30, -dataItem[3] * sinDeg30);
    context.lineTo(-dataItem[4] * cosDeg30, dataItem[4] * sinDeg30);
    context.lineTo(0, dataItem[5]);
    context.closePath();
}

/**
 * 绘制雷达图
 * @param context
 */
function drawRadar(context) {
    const data = [[70, 100, 20, 5, 21, 99], [100, 120, 50, 75, 121, 99], [117, 211, 259, 232, 190, 200], [217, 240, 259, 282, 190, 120]];
    context.fillStyle = "rgb(189, 142, 16, .09)";
    for (let i = 0, len = data.length; i < len; i++) {
        createPolygonPath(context, data[i]);
        context.fill();
    }

    context.fillStyle = "rgb(189, 142, 16, 1)";
    for (let i = 0, len = data.length; i < len; i++) {
        createPolygonPath(context, data[i]);
        context.stroke();
    }
}

drawRadar(context);
