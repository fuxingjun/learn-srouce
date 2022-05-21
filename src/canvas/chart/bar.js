const canvasRef = document.querySelector("#canvasRef");
const context = canvasRef.getContext("2d");
canvasRef.width = 800;
canvasRef.height = 500;
const marginLeft = 80;
const marginBottom = 100;

/**
 * 变换画布到左下角
 * @param context
 */
function translateCanvas(context) {
    context.translate(marginLeft, canvasRef.height - marginBottom);
    context.scale(1, -1);
}

/**
 * 绘制x轴，平行线，刻度等
 * @param context
 */
function drawXAxis(context) {
    // 绘制X轴
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvasRef.width - marginLeft * 2, 0);
    context.closePath();
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.shadowBlur = 2;
    context.lineWidth = .2;
    context.shadowColor = 'rgb(100, 255, 255)';
    context.stroke();

    // 绘制平行线
    context.save();
    const lineWidth = canvasRef.width - marginLeft * 2;
    const unitHeight = (canvasRef.height - marginBottom * 2) / 7;
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.shadowBlur = 2;
    context.lineWidth = .1;
    context.shadowColor = 'rgb(100, 255, 255)';
    context.translate(0, unitHeight);
    for (let i = 0; i < 7; i++) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(lineWidth, 0);
        context.closePath();
        context.stroke();
        context.translate(0, unitHeight);
    }
    context.restore();

    // 绘制刻度
    context.save();
    const widthOfOne = (canvasRef.width - marginLeft * 2) / 20;
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.lineWidth = 0.1;
    for (let i = 0; i < 21; i++) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -5);
        context.closePath();
        context.stroke();
        context.translate(widthOfOne, 0);
    }
    context.restore();
}

/**
 * 绘制坐标轴轴标签
 * @param context
 */
function drawAxisLabel(context) {
    // x轴
    const xText = ["北京", "天津", "河北", "山西", "四川", "广东", "上海", "深圳", "江苏", "河南", "山西", "陕西", "甘肃", "内蒙", "天塌", "运城", "哈尔滨", "日本", "台湾", "香港"]
    context.save();
    context.scale(1, -1);
    // 不用beginPath最后一根刻度样式有问题，为什么？？？
    context.beginPath();
    const widthOfOne = (canvasRef.width - marginLeft * 2) / 20;
    for (let i = 0, len = xText.length; i < len; i++) {
        const textRect = context.measureText(xText[i]);
        context.strokeStyle = 'rgb(111,11,111)';
        // console.log(textRect.emHeightAscent)
        context.fillText(xText[i], widthOfOne / 2 - textRect.width / 2, 14);
        context.stroke();
        context.translate(widthOfOne, 0);
    }
    context.restore();

    // y轴
    context.save();
    context.scale(1, -1);
    context.translate(-30, 0);
    context.font = "10px Calibri";
    const heightOfOne = (canvasRef.height - marginBottom * 2) / 7;
    for (let i = 0; i < 8; i++) {
        // 起什么作用
        context.stroke();
        const text = (3000 * i).toString()
        context.fillText(text, 0, 3);
        context.translate(0, -heightOfOne);
    }
    context.restore();
}

/**
 * 画出柱状图
 * draw the bar
 * @param context
 */
function drawBar(context) {
    const data = [
        [100, 2800, 9000], [150, 2900, 600], [300, 12000, 400], [500, 13333, 4000], [1300, 2000, 122], [111, 3333, 1111], [1111, 2111, 1111], [111, 1611, 222],
        [444, 4444, 333], [222, 11111, 2222], [2222, 2235, 11], [111, 1345, 1111], [1111, 11111, 2234], [1122, 12223, 12], [121, 1665, 111], [234, 334, 21],
        [112, 12134, 1211], [1212, 12111, 134], [124, 2021, 112], [1222, 20345, 1212],
    ]
    console.log(data.length)
    context.save();
    context.beginPath();
    const widthOfOne = (canvasRef.width - marginLeft * 2) / 20;
    const widthOneRect = widthOfOne / 3;
    const heightOfOne = (canvasRef.height - marginBottom * 2) / 7;
    const unitHeight = heightOfOne / 3000;

    for (let i = 0, len = data.length; i < len; i++) {
        context.fillStyle = "rgb(189, 119, 119)";
        context.fill();

        // the first bar
        context.fillRect(0, 0, widthOneRect - 1, data[i][0] * unitHeight);

        // the second bar
        context.fillStyle = "rgb(19, 172, 172)"
        context.fillRect(widthOneRect, 0, widthOneRect - 1, data[i][1] * unitHeight);

        // the third bar
        context.fillStyle = "rgb(111, 73, 142)";
        context.fillRect(widthOneRect * 2, 0, widthOneRect - 1, data[i][2] * unitHeight);

        context.translate(widthOfOne, 0);
    }
    context.restore();
}

function start() {
    translateCanvas(context);
    drawXAxis(context);
    drawAxisLabel(context);
    drawBar(context);
}

start();
