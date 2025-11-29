let waitingRePaintId = null;
const STYLE_BANNED_ONLY = "banned_only";
const STYLE_AVAILABLE_ONLY = "available_only";
const STYLE_NONE = "none";
const STYLE_FULL = "full";
var style = STYLE_BANNED_ONLY;
// 更新配置信息图片
function updateConfigImage() {
    const mapId = plan.map;
    const difficultyId = plan.difficulty;
    const bannedColors = plan.bannedColors;
    let showAvailable =
        style === STYLE_AVAILABLE_ONLY || style === STYLE_FULL;
    let showBanned = style === STYLE_BANNED_ONLY || style === STYLE_FULL;
    const canvas = document.getElementById("configCanvas");
    const ctx = canvas.getContext("2d");
    const imgElement = document.getElementById("configImage");

    // 获取可用角色和不可用角色
    const availableChars = chars.filter((char) => !isCharBanned(char));
    const bannedChars = chars.filter((char) => isCharBanned(char));


    showBanned &= bannedChars.length > 0;
    showAvailable &= availableChars.length > 0;

    // 设置canvas尺寸 - 使用容器宽度并提高分辨率
    const containerWidth = Math.max(
        700,
        document.getElementById("canvasContainer").clientWidth
    );
    const scaleFactor = 2; // 提高分辨率2倍
    const padding = 40 * scaleFactor;
    const avatarSize = 120 * scaleFactor; // 增大头像尺寸
    const avatarSpacing = 30 * scaleFactor; // 增加头像间距
    const charsPerRow = Math.max(
        4,
        Math.floor(
            (containerWidth * scaleFactor - padding * 2) /
            (avatarSize + avatarSpacing)
        )
    );

    // 计算高度 - 调整行距（略微缩小）
    const availableRows = Math.ceil(availableChars.length / charsPerRow);
    const bannedRows = Math.ceil(bannedChars.length / charsPerRow);
    const headerHeight = 200 * scaleFactor; // 增加标题区域高度
    const rowHeight = avatarSize + 60 * scaleFactor; // 略微缩小行高（从100改为80）
    const sectionSpacing = 45 * scaleFactor; // 两个区域之间的间距

    const totalHeight =
        headerHeight +
        70 * scaleFactor +
        (showBanned ? bannedRows * rowHeight + sectionSpacing : 0) +
        (showAvailable ? availableRows * rowHeight + sectionSpacing : 0) +
        (showAvailable || showBanned ? padding : 0);

    canvas.width = containerWidth * scaleFactor;
    canvas.height = totalHeight;

    // 绘制背景
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制标题背景
    ctx.fillStyle = "#6a11cb";
    ctx.fillRect(0, 0, canvas.width, 60 * scaleFactor);

    // 绘制标题
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${32 * scaleFactor}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText("游戏配置结果", canvas.width / 2, 40 * scaleFactor);

    // 绘制配置信息区域背景
    const infoPanelHeight = 160 * scaleFactor;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
        20 * scaleFactor,
        80 * scaleFactor,
        canvas.width - 40 * scaleFactor,
        infoPanelHeight
    );
    ctx.strokeStyle = "#dee2e6";
    ctx.lineWidth = 2 * scaleFactor;
    ctx.strokeRect(
        20 * scaleFactor,
        80 * scaleFactor,
        canvas.width - 40 * scaleFactor,
        infoPanelHeight
    );

    // 绘制配置信息
    ctx.font = `${18 * scaleFactor}px Arial`;
    ctx.textAlign = "left";
    ctx.fillStyle = "#495057";

    let yPos = 110 * scaleFactor;
    ctx.fillText(`地图: ${aLabel[mapId]}`, padding, yPos);
    yPos += 35 * scaleFactor;
    ctx.fillText(`难度: ${bLabel[difficultyId]}`, padding, yPos);
    yPos += 35 * scaleFactor;
    ctx.fillText(
        `禁止颜色: ${bannedColors.length > 0
            ? bannedColors.map((c) => color[c]).join(", ")
            : "无"
        }`,
        padding,
        yPos
    );
    yPos += 35 * scaleFactor;
    let tagResult = "";
    if(plan.bannedTags.length > 0)
        tagResult +="禁【"+ plan.bannedTags.map((tag) => tags[tag]).join(", ")+"】";
    if(plan.requiredTags.length > 0)
        tagResult +="要【"+ plan.requiredTags.map((tag) => tags[tag]).join(", ")+"】";
    ctx.fillText(
        `标签: ${tagResult || "无"}`,
        padding,
        yPos
    );

    // 当前绘制位置
    let currentY = 80 * scaleFactor + infoPanelHeight + 15 * scaleFactor;

    // 绘制禁止角色区域（如果有禁止角色）
    if (bannedChars.length > 0 && showBanned) {
        // 绘制禁止角色标题区域
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
            20 * scaleFactor,
            currentY,
            canvas.width - 40 * scaleFactor,
            bannedRows * rowHeight + 60 * scaleFactor
        );
        ctx.strokeRect(
            20 * scaleFactor,
            currentY,
            canvas.width - 40 * scaleFactor,
            bannedRows * rowHeight + 60 * scaleFactor
        );

        // 绘制禁止角色标题
        currentY += 40 * scaleFactor;
        ctx.font = `bold ${24 * scaleFactor}px Arial`;
        ctx.fillStyle = "#dc3545"; // 红色标题表示禁止
        ctx.textAlign = "left";
        ctx.fillText("禁止角色:", padding, currentY);

        // 绘制禁止角色
        currentY += 30 * scaleFactor;
        drawCharacterSection(
            ctx,
            bannedChars,
            charsPerRow,
            currentY,
            avatarSize,
            avatarSpacing,
            rowHeight,
            padding,
            scaleFactor,
            true
        );

        currentY += bannedRows * rowHeight;
    }

    // 绘制可用角色区域（如果有可用角色）
    if (availableChars.length > 0 && showAvailable) {
        // 绘制可用角色标题区域
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(
            20 * scaleFactor,
            currentY,
            canvas.width - 40 * scaleFactor,
            availableRows * rowHeight + 60 * scaleFactor
        );
        ctx.strokeRect(
            20 * scaleFactor,
            currentY,
            canvas.width - 40 * scaleFactor,
            availableRows * rowHeight + 60 * scaleFactor
        );

        // 绘制可用角色标题
        currentY += 40 * scaleFactor;
        ctx.font = `bold ${24 * scaleFactor}px Arial`;
        ctx.fillStyle = "#28a745"; // 绿色标题表示可用
        ctx.textAlign = "left";
        ctx.fillText("可用角色:", padding, currentY);

        // 绘制可用角色
        currentY += 30 * scaleFactor;
        drawCharacterSection(
            ctx,
            availableChars,
            charsPerRow,
            currentY,
            avatarSize,
            avatarSpacing,
            rowHeight,
            padding,
            scaleFactor,
            false
        );
    }

    // 将canvas内容转换为图片
    imgElement.src = canvas.toDataURL("image/png");
}

// 新增辅助函数：绘制角色区域
function drawCharacterSection(
    ctx,
    characters,
    charsPerRow,
    startY,
    avatarSize,
    avatarSpacing,
    rowHeight,
    padding,
    scaleFactor,
    isBanned
) {
    ctx.font = `${16 * scaleFactor}px Arial`;
    ctx.textAlign = "center";

    for (let i = 0; i < characters.length; i++) {
        const char = characters[i];
        const row = Math.floor(i / charsPerRow);
        const col = i % charsPerRow;

        const x =
            padding + col * (avatarSize + avatarSpacing) + avatarSize / 2;
        const y = startY + row * rowHeight + 50 * scaleFactor;

        // 绘制圆形头像背景
        ctx.beginPath();
        ctx.arc(x, y, avatarSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.strokeStyle = colorCode[char.color];
        ctx.lineWidth = 3 * scaleFactor;
        ctx.stroke();

        // 绘制头像（如果已加载）
        if (char.imageObj && char.imageObj.complete) {
            // 创建圆形裁剪区域
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, avatarSize / 2 - 4 * scaleFactor, 0, Math.PI * 2);
            ctx.clip();

            // 计算图片绘制尺寸，保持宽高比
            const imgAspectRatio = char.imageObj.width / char.imageObj.height;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgAspectRatio < 1) {
                // 宽图
                drawWidth = avatarSize - 8 * scaleFactor;
                drawHeight = drawWidth / imgAspectRatio;
                offsetX = 0;
                offsetY = (avatarSize - 8 * scaleFactor - drawHeight) / 2;
            } else {
                // 高图或方图
                drawHeight = avatarSize - 8 * scaleFactor;
                drawWidth = drawHeight * imgAspectRatio;
                offsetX = (avatarSize - 8 * scaleFactor - drawWidth) / 2;
                offsetY = 0;
            }

            // 绘制图像，保持宽高比
            ctx.drawImage(
                char.imageObj,
                x - avatarSize / 2 + 4 * scaleFactor + offsetX,
                y - avatarSize / 2 + 4 * scaleFactor + offsetY,
                drawWidth,
                drawHeight
            );
            ctx.restore();
        } else if (!char.imageImg) {
            char.imageObj = new Image();
            char.imageObj.src = char.icon;
            char.imageObj.crossOrigin = "anonymous";
            char.imageObj.onload = repaint;
        }
        // 绘制角色名字
        ctx.fillStyle = isBanned ? "#dc3545" : "#495057";
        let tName = char.name;
        if (tName.length > 9) {
            tName = tName.substring(0, 8) + "...";
        }
        ctx.fillText(tName, x, y + avatarSize / 2 + 30 * scaleFactor);
    }
}
function setStyle(event) {
    style = event.currentTarget.value;
    showPage2();
    saveSettings();
}
function repaint() {
    if (waitingRePaintId !== null) return;
    waitingRePaintId = setTimeout(() => {
        waitingRePaintId = null;
        if (location.hash) showPage2();
    }, 500);
}