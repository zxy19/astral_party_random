var currentTagGrpId = 0;
function generateNewPanel(no_save) {
    const id = currentTagGrpId++;
    setTimeout(() => {
        // 切换标签模式按钮事件
        document
            .getElementById("switchTagMode-" + id)
            .addEventListener("click", function () {
                switchTagMode(id);
                saveSettings();
            });
        
        // 反选标签按钮事件
        document
            .getElementById("invertTagsBtn-" + id)
            .addEventListener("click", function () {
                const tagCheckboxes = document.querySelectorAll(
                    `#tagSelection-${id} input[type="checkbox"]`
                );
                tagCheckboxes.forEach((checkbox) => {
                    checkbox.checked = !checkbox.checked;
                });
                saveSettings();
            });
        document
            .getElementById("deleteTagsBtn-" + id)
            .addEventListener("click", function () {
                document.getElementById("tagPanel-" + id).remove();
                saveSettings();
            });

        // 生成标签选择选项
        const tagSelection = document.getElementById("tagSelection-" + id);
        if (tags && Array.isArray(tags)) {
            tags.forEach((tag, index) => {
                const div = document.createElement("div");
                div.className = "form-check me-3 mb-2";
                div.innerHTML = `
                <input class="form-check-input" type="checkbox" id="tag${index}-${id}" value="${index}" checked>
                <label class="form-check-label" for="tag${index}-${id}">${tag}</label>
            `;
                tagSelection.appendChild(div);
            });
        }
        if (!no_save) saveSettings();
    }, 1);
    const tagContainer = document.getElementById("banTag");
    const tagPanel = document.createElement("div");
    tagPanel.className = "tagPanel col-md-12";
    tagPanel.setAttribute("data-tag-id", id);
    tagPanel.id = "tagPanel-" + id;
    tagPanel.innerHTML = `    
    <div class="card">
    <div class="card-body">
        <div
        class="d-flex justify-content-between align-items-center mb-3"
        >
        <h5 class="card-title section-title mb-0">
            <button type="button"
            id="switchTagMode-${id}"
            class="btn btn-sm btn-outline-info">
            切换
            </button>
            <span id="tagMode-${id}" data-whitemode="0">禁止</span>标签#${id}
        </h5>
        <button
            type="button"
            id="invertTagsBtn-${id}"
            class="btn btn-sm btn-outline-secondary"
        >
            反选
        </button>
        <button
            type="button"
            id="deleteTagsBtn-${id}"
            class="btn btn-sm btn-outline-danger"
        >
            删除
        </button>
        </div>

        <!-- 标签数量选择 -->
        <div class="mb-3">
        <label class="form-label">选择标签数量 (0-4):</label>
        <div class="form-check form-check-inline">
            <input
            class="form-check-input"
            type="radio"
            name="tagCount-${id}"
            id="tagCount0-${id}"
            value="0"
            checked
            />
            <label class="form-check-label" for="tagCount0-${id}">0</label>
        </div>
        <div class="form-check form-check-inline">
            <input
            class="form-check-input"
            type="radio"
            name="tagCount-${id}"
            id="tagCount1-${id}"
            value="1"
            />
            <label class="form-check-label" for="tagCount1-${id}">1</label>
        </div>
        <div class="form-check form-check-inline">
            <input
            class="form-check-input"
            type="radio"
            name="tagCount-${id}"
            id="tagCount2-${id}"
            value="2"
            />
            <label class="form-check-label" for="tagCount2-${id}">2</label>
        </div>
        <div class="form-check form-check-inline">
            <input
            class="form-check-input"
            type="radio"
            name="tagCount-${id}"
            id="tagCount3-${id}"
            value="3"
            />
            <label class="form-check-label" for="tagCount3-${id}">3</label>
        </div>
        <div class="form-check form-check-inline">
            <input
            class="form-check-input"
            type="radio"
            name="tagCount-${id}"
            id="tagCount4-${id}"
            value="4"
            />
            <label class="form-check-label" for="tagCount4-${id}">4</label>
        </div>
        </div>

        <!-- 标签选择区域 -->
        <div id="tagSelection-${id}" class="d-flex flex-wrap">
        <!-- 标签选项将通过JavaScript动态生成 -->
        </div>
    </div>
    </div>`;
    tagContainer.appendChild(tagPanel);
}

function switchTagMode(id) {
    const modeElement = document.getElementById("tagMode-" + id);
    const isWhiteMode = modeElement.getAttribute("data-whitemode") === "1";
    
    if (isWhiteMode) {
        // 从白名单模式切换到黑名单模式
        modeElement.setAttribute("data-whitemode", "0");
        modeElement.textContent = "禁止";
    } else {
        // 从黑名单模式切换到白名单模式
        modeElement.setAttribute("data-whitemode", "1");
        modeElement.textContent = "允许";
    }
}

function selectForAllTags() {
    const banTagsSelected = {}, requiredTagsSelected = {};
    const panels = document.querySelectorAll(".tagPanel");
    panels.forEach((panel) => {
        const id = panel.getAttribute("data-tag-id");
        const modeElement = document.getElementById(`tagMode-${id}`);
        const isWhiteMode = modeElement.getAttribute("data-whitemode") === "1";
        const count = panel.querySelector(`input[name="tagCount-${id}"]:checked`).value;
        const tagCheckboxes = panel.querySelectorAll(`input[type="checkbox"]:checked`);
        let allTags = Array.from(tagCheckboxes).map((checkbox) => checkbox.value);
        const toPick = Math.min(count, allTags.length);
        for (let i = 0; i < toPick; i++) {
            const pickedId = Math.floor(Math.random() * allTags.length);
            const picked = allTags[pickedId];
            if (isWhiteMode) {
                requiredTagsSelected[picked] = true;
            } else {
                banTagsSelected[picked] = true;
            }
            allTags.splice(pickedId, 1);
        }
    })
    return [Object.keys(banTagsSelected), Object.keys(requiredTagsSelected)];
}

function saveTagSettings() {
    let tagSettings = [];
    const panels = document.querySelectorAll(".tagPanel");
    panels.forEach((panel) => {
        const id = panel.getAttribute("data-tag-id");
        const modeElement = document.getElementById(`tagMode-${id}`);
        const isWhiteMode = modeElement.getAttribute("data-whitemode") === "1";
        const count = panel.querySelector(`input[name="tagCount-${id}"]:checked`).value;
        const tagCheckboxes = panel.querySelectorAll(`input[type="checkbox"]:checked`);
        const tags = Array.from(tagCheckboxes).map((checkbox) => checkbox.value);
        tagSettings.push({ count, tags, isWhiteMode });
    });
    return tagSettings;
}
function restoreTagSettings(setting) {
    const currentPanels = document.querySelectorAll(".tagPanel");
    if (currentPanels.length < setting.length) {
        for (let i = currentPanels.length; i < setting.length; i++) {
            generateNewPanel(true);
        }
        setTimeout(() => restoreTagSettings(setting), 1);
    } else if (currentPanels.length > setting.length) {
        for (let i = currentPanels.length - 1; i >= setting.length; i--) {
            const panel = currentPanels[i];
            panel.parentNode.removeChild(panel);
        }
        setTimeout(() => restoreTagSettings(setting), 1);
    } else {
        for (let i = 0; i < setting.length; i++) {
            const panel = currentPanels[i];
            const id = panel.getAttribute("data-tag-id");
            const count = setting[i].count;
            const tags = setting[i].tags;
            document.getElementById(`tagMode-${id}`).setAttribute("data-whitemode", setting[i].isWhiteMode ? "1" : "0");
            document.getElementById(`tagMode-${id}`).textContent = setting[i].isWhiteMode ? "允许" : "禁止";
            panel.querySelectorAll('input').forEach(i => i.checked = false);
            document.getElementById(`tagCount${count}-${id}`).checked = true;
            tags.forEach(tag => document.getElementById(`tag${tag}-${id}`).checked = true);
        }
    }
}