var currentCharGrpId = 0;
function generateNewBanCharPanel() {
    const id = currentCharGrpId++;
    setTimeout(() => {
        // 反选标签按钮事件
        document
            .getElementById("invertCharsBtn-" + id)
            .addEventListener("click", function () {
                const tagCheckboxes = document.querySelectorAll(
                    `#charSelection-${id} input[type="checkbox"]`
                );
                tagCheckboxes.forEach((checkbox) => {
                    checkbox.checked = !checkbox.checked;
                });
                saveSettings();
            });
        document
            .getElementById("deleteCharsBtn-" + id)
            .addEventListener("click", function () {
                document.getElementById("charPanel-" + id).remove();
                saveSettings();
            });
        document
            .getElementById("charCountMin-" + id)
            .addEventListener("change", saveSettings);
        document
            .getElementById("charCountMax-" + id)
            .addEventListener("change", saveSettings);

        // 生成标签选择选项
        const charSelection = document.getElementById("charSelection-" + id);
        if (chars && Array.isArray(chars)) {
            chars.forEach((charDesc, index) => {
                const div = document.createElement("div");
                div.className = "form-check me-3 mb-2 char-selection color-" + charDesc.color;
                div.innerHTML = `
<input class="form-check-input" type="checkbox" id="char${index}-${id}" value="${index}" checked>
<label class="form-check-label" for="char${index}-${id}">
<img src="${charDesc.icon}" class="char-icon">
${charDesc.name}</label>
            `;
                charSelection.appendChild(div);
            });
        }
        saveSettings();
    }, 1);
    const charContainer = document.getElementById("banTag");
    const charPanel = document.createElement("div");
    charPanel.className = "charPanel col-md-12";
    charPanel.setAttribute("data-char-id", id);
    charPanel.id = "charPanel-" + id;
    charPanel.innerHTML = `    
    <div class="card">
    <div class="card-body">
        <div
        class="d-flex justify-content-between align-items-center mb-3"
        >
        <h5 class="card-title section-title mb-0">禁止角色#${id}</h5>
        <button
            type="button"
            id="invertCharsBtn-${id}"
            class="btn btn-sm btn-outline-secondary"
        >
            反选
        </button>
        <button
            type="button"
            id="deleteCharsBtn-${id}"
            class="btn btn-sm btn-outline-danger"
        >
            删除
        </button>
        </div>

        <!-- 禁止标签数量选择 -->
        <div class="row">
            <div class="col-sm-2 col-md-2 pt-1 text-center">
                禁止角色数量:
            </div>
            <div class="col-sm-4 col-md-2">
                <input type="number" class="form-control" placeholder="0" id="charCountMin-${id}">
            </div>
            <div class="col-sm-2 col-md-1 pt-1 text-center">
                -
            </div>
            <div class="col-sm-4 col-md-2">
                <input type="number" class="form-control" placeholder="0" id="charCountMax-${id}" value="${chars.length-4}">
            </div>
            <div class="col-md-6">
            </div>
        </div>

        <!-- 标签选择区域 -->
        <div id="charSelection-${id}" class="d-flex flex-wrap char-selection-container">
        <!-- 标签选项将通过JavaScript动态生成 -->
        </div>
    </div>
    </div>`;
    charContainer.appendChild(charPanel);
}

function selectForAllChars() {
    const tagsSelected = {};
    const panels = document.querySelectorAll(".charPanel");
    panels.forEach((panel) => {
        const id = panel.getAttribute("data-char-id");
        const countMin = document.getElementById(`charCountMin-${id}`).value || 0;
        const countMax = document.getElementById(`charCountMax-${id}`).value || 0;
        const count = Math.floor(Math.random() * (countMax - countMin + 1)) + countMin;
        const tagCheckboxes = panel.querySelectorAll(`input[type="checkbox"]:checked`);
        let allTags = Array.from(tagCheckboxes).map((checkbox) => checkbox.value);
        const toPick = Math.min(count, allTags.length);

        for (let i = 0; i < toPick; i++) {
            const pickedId = Math.floor(Math.random() * allTags.length);
            const picked = allTags[pickedId];
            tagsSelected[picked] = true;
            allTags.splice(pickedId, 1);
        }
    })
    return Object.keys(tagsSelected);
}

function saveCharSettings() {
    let charSettings = [];
    const panels = document.querySelectorAll(".charPanel");
    panels.forEach((panel) => {
        const id = panel.getAttribute("data-char-id");
        const countMin = document.getElementById(`charCountMin-${id}`).value;
        const countMax = document.getElementById(`charCountMax-${id}`).value;
        const charCheckboxes = panel.querySelectorAll(`input[type="checkbox"]:checked`);
        const chars = Array.from(charCheckboxes).map((checkbox) => checkbox.value);
        charSettings.push({ countMax, countMin, chars });
    });
    return charSettings;
}
function restoreCharSettings(setting) {
    const currentPanels = document.querySelectorAll(".charPanel");
    if (currentPanels.length < setting.length) {
        for (let i = currentPanels.length; i < setting.length; i++) {
            generateNewBanCharPanel();
        }
        setTimeout(() => restoreCharSettings(setting), 1);
    } else if (currentPanels.length > setting.length) {
        for (let i = currentPanels.length - 1; i >= setting.length; i--) {
            const panel = currentPanels[i];
            panel.parentNode.removeChild(panel);
        }
        setTimeout(() => restoreCharSettings(setting), 1);
    } else {
        for (let i = 0; i < setting.length; i++) {
            const panel = currentPanels[i];
            const id = panel.getAttribute("data-char-id");
            const chars = setting[i].chars;
            document.getElementById(`charCountMin-${id}`).value = setting[i].countMin;
            document.getElementById(`charCountMax-${id}`).value = setting[i].countMax;

            panel.querySelectorAll('input').forEach(i => i.checked = false);
            chars.forEach(char => document.getElementById(`char${char}-${id}`).checked = true);
        }
    }
}