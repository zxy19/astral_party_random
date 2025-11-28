
// 保存设置到localStorage
function saveSettings() {
    const settings = {
        // 保存地图选择
        maps: Array.from(
            document.querySelectorAll("#mapSelection input:checked")
        ).map((input) => input.value),

        // 保存难度选择
        difficulties: Array.from(
            document.querySelectorAll("#difficultySelection input:checked")
        ).map((input) => input.value),

        // 保存禁止颜色数量
        colorCount: document.querySelector('input[name="colorCount"]:checked')
            .value,

        tagGrps: saveTagSettings(),
        charGrps: saveCharSettings(),
        // 添加其他设置项
        style,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

// 从localStorage恢复设置
function restoreSettings() {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);

        // 恢复地图选择
        document.querySelectorAll("#mapSelection input").forEach((input) => {
            input.checked = settings.maps.includes(input.value);
        });

        // 恢复难度选择
        document
            .querySelectorAll("#difficultySelection input")
            .forEach((input) => {
                input.checked = settings.difficulties.includes(input.value);
            });

        // 恢复禁止颜色数量
        if (settings.colorCount) {
            const colorCountInput = document.querySelector(
                `input[name="colorCount"][value="${settings.colorCount}"]`
            );
            if (colorCountInput) colorCountInput.checked = true;
        }


        if (settings.tagGrps) {
            restoreTagSettings(settings.tagGrps);
        }

        if (settings.charGrps) {
            restoreCharSettings(settings.charGrps);
        }

        style = settings.style || STYLE_BANNED_ONLY;
        const iss = document.querySelector(
            `input[name="img_style"][value="${settings.style}"]`
        );
        if (iss) iss.checked = true;
    } else {
        generateNewPanel();
    }
}