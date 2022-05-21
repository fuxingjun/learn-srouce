function init() {
    const canvas = new fabric.Canvas("c");
    const rect = new fabric.Rect({
        top: 30,
        left: 30,
        width: 100,
        height: 60,
        fill: "red",
    })
    canvas.add(rect);
}

init();
