
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

        // 保存禁止标签数量
        tagCount: document.querySelector('input[name="tagCount"]:checked')
            .value,

        // 保存标签选择
        tags: Array.from(
            document.querySelectorAll("#tagSelection input:checked")
        ).map((input) => input.value),
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

        // 恢复禁止标签数量
        if (settings.tagCount) {
            const tagCountInput = document.querySelector(
                `input[name="tagCount"][value="${settings.tagCount}"]`
            );
            if (tagCountInput) tagCountInput.checked = true;
        }

        // 恢复标签选择
        document.querySelectorAll("#tagSelection input").forEach((input) => {
            input.checked = settings.tags.includes(input.value);
        });
        style = settings.style || STYLE_BANNED_ONLY;
        const iss = document.querySelector(
            `input[name="img_style"][value="${settings.style}"]`
        );
        if (iss) iss.checked = true;
    }
}