document.addEventListener("DOMContentLoaded", function () {
    // 生成地图选择选项
    const mapSelection = document.getElementById("mapSelection");
    for (let i = 1; i <= 6; i++) {
        const div = document.createElement("div");
        div.className = "form-check";
        div.innerHTML = `
                    <input class="form-check-input" type="checkbox" id="map${i}" value="${i}" checked>
                    <label class="form-check-label" for="map${i}">${aLabel[i]}</label>
                `;
        mapSelection.appendChild(div);
    }

    // 生成难度选择选项
    const difficultySelection = document.getElementById(
        "difficultySelection"
    );
    for (let i = 1; i <= 4; i++) {
        const div = document.createElement("div");
        div.className = "form-check";
        div.innerHTML = `
                    <input class="form-check-input" type="checkbox" id="difficulty${i}" value="${i}" ${i == 4 ? "checked" : ""
            }>
                    <label class="form-check-label" for="difficulty${i}">${bLabel[i]
            }</label>
                `;
        difficultySelection.appendChild(div);
    }


    // 生成标签选择选项
    const tagSelection = document.getElementById("tagSelection");
    if (tags && Array.isArray(tags)) {
        tags.forEach((tag, index) => {
            const div = document.createElement("div");
            div.className = "form-check me-3 mb-2";
            div.innerHTML = `
            <input class="form-check-input" type="checkbox" id="tag${index}" value="${index}" checked>
            <label class="form-check-label" for="tag${index}">${tag}</label>
        `;
            tagSelection.appendChild(div);
        });
    }

    // 从localStorage恢复设置
    restoreSettings();
    
    // 检查URL哈希值，决定显示哪个页面
    if (window.location.hash) {
        showPage2();
    }
});

