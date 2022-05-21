const canvasRef = document.querySelector("#canvasRef");

canvasRef.width = 400;
canvasRef.height = 300;

const context = canvasRef.getContext("2d");

context.strokeStyle = "rgba(0, 0, 0, 1)";
context.lineWidth = .2;

// 变换坐标系
const marginLeft = 40;
const marginBottom = 50;
context.scale(1, -1);
context.translate(marginLeft, -canvasRef.height + marginBottom);

const heightOfOne = 35;
const widthOfOne = (canvasRef.width - 10 - marginLeft) / 7;

/**
 * 绘制x轴
 * @param context
 */
function drawXAxis(context) {
//保存好当前画布的状态。因为我们的圆心在左下角，我们还需要返回到这个原点进行其他操作。
    context.save();
    for (let i = 0; i < 7; i++) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(canvasRef.width, 0);
        context.closePath();
        context.stroke();
        context.translate(0, heightOfOne);
    }
    context.restore();
}

/**
 * 绘制刻度
 * @param context
 */
function drawXScale(context) {
    // context.lineWidth = 2;
    // context.strokeStyle = "red";
    context.save();
    context.lineWidth = 0.2;
    for (let i = 0; i < 8; i++) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -5);
        context.stroke();
        context.translate(widthOfOne, 0);
    }
    context.restore();
    // 延迟就正常了。。。restore导致最后一个刻度颜色不一致？？？
    // setTimeout(() => {
    //     console.log("restore")
    //     context.restore();
    // }, 1000)
    // throw new Error("12")
}

/**
 * 绘制x轴文字
 * @param context
 */
function drawXLabel(context) {
    const textArray = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    context.save();
// 这里沿着X轴镜像对称变换,否则文字是镜像的。那么Y轴向下为正，X没变向右为正。
    context.scale(1, -1);
    // 不用beginPath最后一根刻度样式有问题，为什么？？？
    context.beginPath();
    for (let i = 0, len = textArray.length; i < len; i++) {
        // 这一行貌似没什么用？
        context.stroke();
        if (i === 0) {
            context.translate(widthOfOne / 2, 15);
        } else {
            context.translate(widthOfOne, 0);
        }
        const textRect = context.measureText(textArray[i]);
        context.fillText(textArray[i], -textRect.width / 2, 0);
    }
    context.restore();
}

/**
 * 绘制y轴文字
 * @param context
 */
function drawYLabel(context) {
    context.save();
    context.scale(1, -1);
    context.translate(-20, 0);
    context.font = "10px Calibri";
    for (let i = 0; i < 7; i++) {
        // 这一行貌似没什么用？
        context.stroke();
        context.fillText((50 * i).toString(), 0, 4);
        context.translate(0, -heightOfOne);
    }
    context.restore();
}

/**
 * 点类
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * 数据转化为点数组
 * @param data
 * @returns {*}
 */
function dataToPoint(data) {
    // 单位高度
    const unitHeight = heightOfOne / 50;
    return data.map((item, index) => new Point(widthOfOne * index + widthOfOne / 2, item * unitHeight));
}

function start() {
    drawXAxis(context);
    drawXScale(context);
    drawXLabel(context);
    drawYLabel(context);

    const data = [150, 250, 225, 211, 140, 148, 260];
    const pointList = dataToPoint(data);

    const data2 = [150, 200, 125, 181, 90, 98, 210];
    const pointList2 = dataToPoint(data2);

    const data3 = [60, 65, 61, 70, 78, 68, 72];
    const pointList3 = dataToPoint(data3);

    drawFillLine(context, pointList, 'rgba(93, 111, 194, 1)', 'rgba(93, 111, 194, .5)', true);
    drawFillLine(context, pointList2, 'rgba(193, 111, 194, 1)', 'rgba(193, 111, 194, .5)');
    drawFillLine(context, pointList3, 'rgba(293, 111, 294, 1)', 'rgba(293, 111, 294, .5)');
    // drawCurve(context, pointList);
}

start();

/**
 * 绘制线条,并填充多边形
 * @param context
 * @param pointList
 * @param strokeStyle
 * @param fillStyle
 * @param drawY
 */
function drawFillLine(context, pointList, strokeStyle, fillStyle, drawY = false) {
    context.save();
    context.beginPath();

    for (let i = 0, len = pointList.length; i < len; i++) {
        context.lineTo(pointList[i].x, pointList[i].y);
        if (!drawY) continue;
        //这里由于文字反转所以需要变换坐标系。且为了方便操作每次都将坐标圆点移动到顶点跟家方便的操作
        context.save()
        context.translate(pointList[i].x, pointList[i].y)
        context.scale(1, -1);
        context.fillText(pointList[i].y + "", 0, -10)
        //记得文字绘制完成还原坐标系，因为后面还要绘制线，不影响坐标系圆点是左下叫为圆形即可。
        context.restore();
    }
    context.strokeStyle = strokeStyle;
    context.lineWidth = 1;
    context.shadowBlur = 5;
    context.stroke();
    context.closePath();
    // context.restore();
    //
    // context.save();
    // 绘制闭环多边形
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, pointList[0].y);
    for (let i = 0, len = pointList.length; i < len; i++) {
        context.lineTo(pointList[i].x, pointList[i].y);
    }
    context.lineTo(pointList[pointList.length - 1].x, 0);
    context.lineTo(0, 0);
    context.closePath();
    context.fillStyle = fillStyle;
    context.lineWidth = 3;
    context.shadowBlur = 5;
    context.fill();
    context.restore();

    drawCircle(context, pointList, strokeStyle);
}

/**
 * 绘制曲线
 * @param context
 * @param pointList
 */
function drawCurve(context, pointList) {
    context.save();
    context.beginPath();
    context.lineTo(pointList[0].x, pointList[0].y);

    const xMoveDistance = 20;
    const yMoveDistance = 30;

    for (let i = 0, len = pointList.length; i < len; i++) {
        const currentPoint = pointList[i];
        const nextPoint = pointList[i + 1];
        if (!nextPoint) return;
        if (currentPoint.y === nextPoint.y) {
            context.lineTo(nextPoint.y, 0);
        } else {
            const centerX = currentPoint.x + (nextPoint.x - currentPoint.x) / 2;
            const centerY = currentPoint.y + (nextPoint.y - currentPoint.y) / 2;
            const controlX0 = (currentPoint.x + centerX) / 2;
            const controlY0 = (currentPoint.y + centerY) / 2;
            const controlX1 = (nextPoint.x + centerX) / 2;
            const controlY1 = (nextPoint.y + centerY) / 2;
            if (currentPoint.y < nextPoint.y) {
                context.bezierCurveTo(
                    controlX0 + xMoveDistance, controlY0 - yMoveDistance,
                    controlX1 - xMoveDistance, controlY1 + yMoveDistance,
                    nextPoint.x, nextPoint.y
                )
            } else {
                context.bezierCurveTo(
                    controlX0 + xMoveDistance, controlY0 + yMoveDistance,
                    controlX1 - xMoveDistance, controlY1 - yMoveDistance,
                    nextPoint.x, nextPoint.y
                )
            }
            context.moveTo(nextPoint.x, nextPoint.y);
        }
        context.strokeStyle = "rgba(93, 111, 194, 1)";
        context.lineWidth = 2;
        context.shadowBlur = 5;
        context.stroke();
        context.closePath();
        context.restore();
    }
}

/**
 * 绘制圆圈
 * @param context
 * @param pointList
 * @param fillStyle
 */
function drawCircle(context, pointList, fillStyle) {
    context.save();
    for (let i = 0, len = pointList.length; i < len; i++) {
        context.beginPath();
        context.arc(pointList[i].x, pointList[i].y, 3, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = fillStyle;
        context.shadowBlur = 5;
        context.shadowColor = fillStyle;
        context.fill();
    }
    context.restore();
}
