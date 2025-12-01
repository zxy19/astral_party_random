import { Renderer } from "./Renderer";

export class Layout {
    private renderer: Renderer;
    private currentY: number = 0;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
    }

    stepY(dy: number) {
        this.currentY += dy;
    }

    start(dx: number, dy: number) {
        // 创建并返回一个新的LayoutContext实例
        return new LayoutContext(dx, dy, this);
    }

    getY() {
        return this.currentY;
    }

    getWidth() {
        return this.renderer.getWidth();
    }

    // 新增方法：重置Y坐标
    resetY() {
        this.currentY = 0;
    }

    // 新增方法：设置Y坐标
    setY(y: number) {
        this.currentY = y;
    }
}

export class LayoutContext {
    private dx: number;
    private dy: number;
    private layout: Layout;
    private currentX: number;
    private first: boolean;

    constructor(dx: number, dy: number, layout: Layout) {
        this.dx = dx;
        this.dy = dy;
        this.layout = layout;
        this.currentX = 0;
        this.first = true;
    }

    next(): { x: number, y: number, w: number, h: number } {
        if (this.first) {
            this.first = false;
        } else {
            this.currentX += this.dx;
            if (this.currentX + this.dx >= this.layout.getWidth()) {
                this.currentX = 0;
                this.layout.stepY(this.dy);
            }
        }
        return { x: this.currentX, y: this.layout.getY(), w: this.dx, h: this.dy };
    }

    finish() {
        this.layout.stepY(this.dy);
    }
}