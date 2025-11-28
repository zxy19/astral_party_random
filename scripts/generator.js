function generatePlan() {
    // 获取选中的地图
    const selectedMaps = [];
    document
        .querySelectorAll("#mapSelection input:checked")
        .forEach((checkbox) => {
            selectedMaps.push(checkbox.value);
        });

    // 获取选中的难度
    const selectedDifficulties = [];
    document
        .querySelectorAll("#difficultySelection input:checked")
        .forEach((checkbox) => {
            selectedDifficulties.push(checkbox.value);
        });

    // 获取禁止颜色数量
    const colorCount = document.querySelector(
        'input[name="colorCount"]:checked'
    ).value;

    // 验证选择
    if (selectedMaps.length === 0) {
        alert("请至少选择一个地图！");
        return;
    }

    if (selectedDifficulties.length === 0) {
        alert("请至少选择一个难度！");
        return;
    }

    // 随机选择地图和难度
    const randomMap =
        selectedMaps[Math.floor(Math.random() * selectedMaps.length)];
    const randomDifficulty =
        selectedDifficulties[
        Math.floor(Math.random() * selectedDifficulties.length)
        ];

    // 随机选择禁止的颜色
    const colors = ["0", "1", "2", "3", "4", "5"];
    const bannedColors = [];
    const colorCountNum = parseInt(colorCount);

    for (let i = 0; i < colorCountNum && i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        bannedColors.push(colors[randomIndex]);
        colors.splice(randomIndex, 1);
    }

    const bannedTagIndexes = selectForAllTags();
    const bannedCharIndexes = selectForAllChars();

    // 生成URL并跳转
    const hash = `${randomMap}|${randomDifficulty}|${bannedColors.join(
        ","
    )}|${bannedTagIndexes.join(",")}|${bannedCharIndexes.join(",")}`;
    return hash;
}