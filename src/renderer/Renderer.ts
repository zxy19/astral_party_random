import { Plan } from "../data/Plan";
import { CharPlan } from "../data/CharPlan";
import { Character, Map, Difficulty } from "../types/game";
import { chars, mapLabels, difficultyLabels, colorData } from "../data";

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('无法获取Canvas上下文');
        }
        this.ctx = ctx;
        this.width = canvas.width;
        this.height = canvas.height;
    }
    public clear(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    public translate(x: number, y: number): void {
        this.ctx.translate(x, y);
    }
    public rotate(angle: number): void {
        this.ctx.rotate(angle);
    }
    public scale(x: number, y: number): void {
        this.ctx.scale(x, y);
    }
    public save(): void {
        this.ctx.save();
    }
    public restore(): void {
        this.ctx.restore();
    }
    public fillRect(x: number, y: number, width: number, height: number, style: string | CanvasGradient | CanvasPattern): void {
        this.ctx.fillStyle = style;
        this.ctx.fillRect(x, y, width, height);
    }
    public strokeRect(x: number, y: number, width: number, height: number, style: string, lineWidth: number = 1): void {
        this.ctx.strokeStyle = style;
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(x, y, width, height);
    }
    public fillCircle(x: number, y: number, radius: number, style: string | CanvasGradient | CanvasPattern): void {
        this.ctx.fillStyle = style;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    public strokeCircle(x: number, y: number, radius: number, style: string, lineWidth: number = 1): void {
        this.ctx.strokeStyle = style;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    public drawCircularImage(image: HTMLImageElement, x: number, y: number, radius: number): void {
        // 检查图像是否有效
        if (!image || !image.complete || image.width === 0 || image.height === 0) {
            console.warn('Invalid image provided to drawCircularImage');
            return;
        }

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.clip();
        
        // 计算图像绘制的尺寸和位置，使其居中并填满圆形区域
        const aspectRatio = image.width / image.height;
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (aspectRatio > 1) {
            // 宽度大于高度，以高度为准
            drawHeight = radius * 2;
            drawWidth = drawHeight * aspectRatio;
            offsetX = -(drawWidth - radius * 2) / 2;
            offsetY = 0;
        } else {
            // 高度大于等于宽度，以宽度为准
            drawWidth = radius * 2;
            drawHeight = drawWidth / aspectRatio;
            offsetX = 0;
            offsetY = -(drawHeight - radius * 2) / 2;
        }
        
        this.ctx.drawImage(image, x + offsetX - radius, y + offsetY - radius, drawWidth, drawHeight);
        this.ctx.restore();
    }

    // 绘制文字
    public fillText(text: string, x: number, y: number, style: string, font: string = '16px Arial'): void {
        this.ctx.fillStyle = style;
        this.ctx.font = font;
        this.ctx.fillText(text, x, y);
    }

    // 绘制图片
    public drawImage(image: HTMLImageElement, x: number, y: number, width?: number, height?: number): void {
        if (width !== undefined && height !== undefined) {
            this.ctx.drawImage(image, x, y, width, height);
        } else {
            this.ctx.drawImage(image, x, y);
        }
    }

    // 绘制线条
    public strokeLine(x1: number, y1: number, x2: number, y2: number, style: string, lineWidth: number = 1): void {
        this.ctx.strokeStyle = style;
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    // 绘制水平分割线
    public drawHorizontalDivider(y: number, style: string, lineWidth: number = 1, startX: number = 0, endX: number = this.width): void {
        this.strokeLine(startX, y, endX, y, style, lineWidth);
    }

    // 设置全局透明度
    public setGlobalAlpha(alpha: number): void {
        this.ctx.globalAlpha = alpha;
    }

    // 重置变换矩阵
    public resetTransform(): void {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // 获取画布宽度
    public getWidth(): number {
        return this.width;
    }

    // 获取画布高度
    public getHeight(): number {
        return this.height;
    }

    public setHeight(height: number): void {
        this.height = height;
        this.canvas.height = height;
    }
    public setWidth(width: number): void {
        this.width = width;
        this.canvas.width = width;
    }
}