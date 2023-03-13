const isTouchEvent = (e) => e instanceof TouchEvent;
function registerStart(root, callback) {
    root.addEventListener('touchstart', callback);
    root.addEventListener('mousedown', callback);
}
function registerMove(root, callback) {
    document.addEventListener('touchmove', callback);
    document.addEventListener('mousemove', callback);
}
function registerEnd(root, callback) {
    document.addEventListener('touchend', callback);
    document.addEventListener('touchcancel', callback);
    document.addEventListener('mouseup', callback);
}
function destroyStart(root, callback) {
    root.removeEventListener('touchstart', callback);
    root.removeEventListener('mousedown', callback);
}
function destroyMove(root, callback) {
    document.removeEventListener('touchmove', callback);
    document.removeEventListener('mousemove', callback);
}
function destroyEnd(root, callback) {
    document.removeEventListener('touchend', callback);
    document.removeEventListener('touchcancel', callback);
    document.removeEventListener('mouseup', callback);
}
class FineTouch {
    constructor(option) {
        const { root, moveCallback = () => { }, startCallback = () => { }, endCallback = () => { }, } = option;
        this.hasMove = true;
        this.isStart = false;
        this.root = root;
        const positions = [];
        let lastTimeStamp = 0;
        let stepX = 0;
        let stepY = 0;
        let startX = 0;
        let startY = 0;
        this.startMethod = (e) => {
            this.hasMove = false;
            this.isStart = true;
            if (e.type === 'mousedown') {
                e.preventDefault();
            }
            const currentTouch = isTouchEvent(e) ? e.touches[0] : e;
            const { clientX, clientY } = currentTouch;
            startX = clientX;
            startY = clientY;
            stepX = clientX;
            stepY = clientY;
            lastTimeStamp = e.timeStamp;
            startCallback({
                startX: clientX,
                startY: clientY,
                event: e,
            });
        };
        this.moveMethod = (e) => {
            this.hasMove = true;
            if (!this.isStart)
                return;
            const currentTouch = isTouchEvent(e) ? e.touches[0] : e;
            const { clientX, clientY } = currentTouch;
            moveCallback({
                movedX: clientX - startX,
                movedY: clientY - startY,
                stepX: clientX - stepX,
                stepY: clientY - stepY,
                event: e,
            });
            stepX = clientX;
            stepY = clientY;
            if (positions.length > 20) {
                positions.splice(0, 10);
            }
            positions.push(e);
            lastTimeStamp = e.timeStamp;
        };
        this.endMethod = (e) => {
            if (!this.isStart)
                return;
            this.isStart = false;
            if (!this.hasMove) {
                this.hasMove = true;
                return;
            }
            let speedX = 0;
            let speedY = 0;
            if (e.timeStamp - lastTimeStamp <= 100) {
                const endPos = positions.length - 1;
                let startPos = endPos;
                for (let i = endPos; i >= 0; i--) {
                    const touch = positions[i];
                    if (touch.timeStamp + 100 > lastTimeStamp) {
                        startPos = i;
                    }
                }
                if (startPos !== endPos) {
                    const timeOffset = positions[endPos].timeStamp - positions[startPos].timeStamp;
                    const targetEvent = positions[startPos];
                    const currentTouch = isTouchEvent(targetEvent)
                        ? targetEvent.touches[0]
                        : targetEvent;
                    const { clientX, clientY } = currentTouch;
                    const movedX = stepX - clientX;
                    const movedY = stepY - clientY;
                    speedX = (movedX / timeOffset) * (1000 / 60);
                    speedY = (movedY / timeOffset) * (1000 / 60);
                }
            }
            const currentTouch = isTouchEvent(e) ? e.changedTouches[0] : e;
            const { clientX, clientY } = currentTouch;
            endCallback({
                movedX: clientX - startX,
                movedY: clientY - startY,
                speedX,
                speedY,
                event: e,
            });
            stepX = 0;
            stepY = 0;
            startX = 0;
            startY = 0;
            lastTimeStamp = 0;
            positions.length = 0;
        };
        registerStart(root, this.startMethod);
        registerMove(root, this.moveMethod);
        registerEnd(root, this.endMethod);
    }
    destroy() {
        destroyStart(this.root, this.startMethod);
        destroyMove(this.root, this.moveMethod);
        destroyEnd(this.root, this.endMethod);
    }
}
const createTouch = (option) => {
    return new FineTouch(option);
};

export { FineTouch, createTouch };
