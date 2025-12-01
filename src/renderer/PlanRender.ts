import { chars, difficultyLabels, mapLabels, colorData } from "../data";
import { CharPlan } from "../data/CharPlan";
import { Character, Difficulty, Map } from "../types/game";
import { Renderer } from "./Renderer";
import { Layout } from "./Layout";
import { Plan } from "../data/Plan";
import { charIndex } from "../util/charIndex";
import { GraphSettings } from "../types/data";

export class PlanRenderer {
    private canvas: HTMLCanvasElement;
    private renderer: Renderer;
    private imageCache: Record<string, HTMLImageElement> = {};
    private settings: GraphSettings;
    private static COLOR_GRP = [
        ['#2196f3', '#e3f2fd'],
        ['#ffc107', '#fffde7'],
        ['#4caf50', '#e8f5e9'],
        ['#ff5722', '#fbe9e7']
    ]
    constructor(settings: GraphSettings) {
        this.settings = settings;
        this.canvas = document.createElement('canvas');
        this.canvas.width = settings.slim ? 900 : 1500;
        this.renderer = new Renderer(this.canvas);
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public async drawPlan(plan: Plan): Promise<void> {
        const layout = new Layout(this.renderer);
        await this.doActualRender(plan, layout);
        await new Promise<void>(resolve => {
            setTimeout(() => {
                resolve();
            }, 0);
        });
        this.renderer.setHeight(layout.getY());
        layout.resetY();
        await this.doActualRender(plan, layout);
    }

    private async doActualRender(plan: Plan, layout: Layout): Promise<void> {
        this.switchBackgroundColor('#9c27b0', layout);
        layout.stepY(40);
        this.renderer.fillText("游戏配置结果", 10, layout.getY(), '#fff', '32px bold Arial');
        layout.stepY(20);
        this.switchBackgroundColor('#ffffff', layout);
        layout.stepY(30);

        const map = plan.getMap();
        const difficulty = plan.getDifficulty();
        const mapLabel = mapLabels[map] || '未知地图';
        const difficultyLabel = difficultyLabels[difficulty] || '未知难度';
        this.renderer.fillText(`地图: ${mapLabel}`, 20, layout.getY(), '#000', '32px Arial');
        layout.stepY(40);
        this.renderer.fillText(`难度: ${difficultyLabel}`, 20, layout.getY(), '#000', '32px Arial');
        layout.stepY(20);
        const groups = plan.getGroups();
        for (let index = 0; index < groups.length; index++) {
            const group = groups[index];
            await this.drawCharacterGroup(group, chars, groups.length == 1 ? -1 : index, layout);
        }
    }

    private async drawCharacterGroup(group: CharPlan, allCharacters: Character[], groupIndex: number, layout: Layout): Promise<void> {
        const [colorHighlight, colorBackground] = PlanRenderer.COLOR_GRP[Math.max(groupIndex, 0) % PlanRenderer.COLOR_GRP.length];
        this.switchBackgroundColor(colorHighlight, layout);
        layout.stepY(20);
        if (groupIndex >= 0)
            this.renderer.fillText(`${charIndex(groupIndex)}组`, 20, layout.getY(), '#fff', '20px bold Arial');
        else
            this.renderer.fillText(`角色详情`, 20, layout.getY(), '#fff', '20px bold Arial');
        layout.stepY(10);
        this.switchBackgroundColor(colorBackground, layout);
        this.setBorderColor(colorHighlight, layout);
        layout.stepY(30);
        const availableChars: Character[] = [];
        const unavailableChars: Character[] = [];
        allCharacters.forEach(character => {
            if (group.isCharacterAllowed(character)) {
                availableChars.push(character);
            } else {
                unavailableChars.push(character);
            }
        });
        if (this.settings.showDescription) {
            const desc = this.generateSummary(group);
            desc.forEach(line => {
                this.renderer.fillText(line, 20, layout.getY(), '#000', '24px Arial');
                layout.stepY(30);
            });
            layout.stepY(20);
        }
        if (this.settings.showAvailable) {
            this.renderer.fillText("可用角色:", 20, layout.getY(), '#28a745', 'bold 24px Arial');
            layout.stepY(10);
            await this.drawCharacterList(availableChars, 20, layout.getY(), layout);
            layout.stepY(20);
        }
        if (this.settings.showBanned) {
            this.renderer.fillText("不可用角色:", 20, layout.getY(), '#dc3545', 'bold 24px Arial');
            layout.stepY(10);
            await this.drawCharacterList(unavailableChars, 20, layout.getY(), layout);
            layout.stepY(20);
        }
        layout.stepY(-34);
        this.switchBackgroundColor(colorHighlight, layout);
        layout.stepY(5);

    }

    private loadImage(src: string): Promise<HTMLImageElement> {
        if (this.imageCache[src]) {
            return Promise.resolve(this.imageCache[src]);
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // 处理跨域问题
            img.onload = () => {
                this.imageCache[src] = img;
                resolve(img);
            };
            img.onerror = (err) => {
                reject(err);
            };
            img.src = src;
        });
    }

    private async drawCharacterList(characters: Character[], x: number, y: number, layout: Layout): Promise<void> {
        if (characters.length === 0) {
            this.renderer.fillText("无", x, y, '#999', '14px Arial');
            layout.stepY(30);
            return;
        }
        const imsz = this.settings.large ? 140 : 100;
        const context = layout.start(this.settings.large ? 145 : 122, imsz + 20);
        const displayCharacters = characters;
        const imagePromises = displayCharacters.map(character =>
            character.icon ? this.loadImage(character.icon).catch(() => null) : Promise.resolve(null)
        );

        // 等待所有图片加载完成
        const images = await Promise.all(imagePromises);
        // 绘制每个角色
        for (let i = 0; i < displayCharacters.length; i++) {
            const character = displayCharacters[i];
            const img = images[i];
            const pos = context.next();
            const posX = x + pos.x;
            const posY = pos.y;
            const r = imsz / 2 - 8;
            this.drawCharacterPortrait(img, character, posX + r, posY + r, r - 4); // 在位置中心绘制半径为25的头像
            // 绘制角色名称，左对齐到图片左侧
            const textColor = '#000000';
            let tName = character.name;
            if (character.name.length > 9) {
                tName = character.name.substring(0, 8) + "...";
            }
            this.renderer.fillText(tName, posX - 2, posY + r * 2 + 16, textColor, this.settings.large ? '16px Arial' : '14px Arial');
        }

        context.finish();
    }

    // 绘制角色头像（独立方法）
    private drawCharacterPortrait(img: HTMLImageElement | null, character: Character, x: number, y: number, radius: number): void {
        // 绘制角色颜色边框
        const colorCode = colorData[character.color[0]]?.code || '#ccc';
        this.renderer.fillCircle(x, y, radius + 3, colorCode);

        // 绘制白色内边框
        this.renderer.fillCircle(x, y, radius, '#ffffff');

        // 绘制角色头像
        if (img) {
            try {
                this.renderer.drawCircularImage(img, x, y, radius - 2);
            } catch (e) {
                this.renderer.fillCircle(x, y, radius - 2, '#ccc');
            }
        } else {
            this.renderer.fillCircle(x, y, radius - 2, '#ccc');
        }
    }
    private switchBackgroundColor(color: string, layout: Layout): void {
        this.renderer.fillRect(0, layout.getY(), this.renderer.getWidth(), this.renderer.getHeight() - layout.getY(), color);
    }
    private setBorderColor(color: string, layout: Layout): void {
        this.renderer.fillRect(0, layout.getY(), 5, this.renderer.getHeight(), color);
        this.renderer.fillRect(this.renderer.getWidth() - 5, layout.getY(), this.renderer.getWidth(), this.renderer.getHeight(), color);
    }

    private generateSummary(CharPlan: CharPlan): string[] {
        let d = CharPlan.describe();
        if (!d.length)
            d = ["当前组别无要求"];
        return d;
    }
}