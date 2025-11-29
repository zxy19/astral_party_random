

// 显示页面2
function showPage2() {
    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";
    loadPlanFromHash();
    reRenderPage2();
}
function reRenderPage2() {
    document.getElementById("mapResult").textContent = aLabel[plan.map];
    document.getElementById("difficultyResult").textContent = bLabel[plan.difficulty];
    document.getElementById("colorResult").textContent = plan.bannedColors.length > 0 ? plan.bannedColors.map((t) => color[t]).join(", ") : "无";

    let tagResult = "";
    if (plan.bannedTags.length > 0) {
        tagResult = plan.bannedTags.map((tag) => `<span class="badge tag-badge bg-danger">${tags[tag]}</span>`).join("");
    }
    if (plan.requiredTags.length > 0) {
        tagResult += plan.requiredTags.map((tag) => `<span class="badge tag-badge bg-success">${tags[tag]}</span>`).join("");
    }
    if (tagResult == "") {
        tagResult = "<span class='badge tag-badge bg-secondary'>无</span>";
    }

    document.getElementById("tagResult").innerHTML = tagResult;

    displayCharacters();

    updateConfigImage();
}

// 显示页面1
function showPage1() {
    document.getElementById("page1").style.display = "block";
    document.getElementById("page2").style.display = "none";
}

// 显示角色信息
function displayCharacters() {
    const availableContainer = document.getElementById(
        "availableCharacters"
    );
    const bannedContainer = document.getElementById("bannedCharacters");

    availableContainer.innerHTML = "";
    bannedContainer.innerHTML = "";

    chars.forEach((char) => {
        // 检查角色是否被禁止
        const isBanned = isCharBanned(char);

        const container = isBanned ? bannedContainer : availableContainer;

        const card = document.createElement("div");
        card.className = "character-card";

        // 创建标签徽章
        let tagBadges = "";
        if (char.related && char.related.length > 0) {
            tagBadges = char.related
                .map((tag) => {
                    let specialClass = "";
                    if (plan.requiredTags.find(t => tag == tags[t]) !== undefined) {
                        specialClass = "success";
                    }
                    if (plan.bannedTags.find(t => tag == tags[t]) !== undefined) {
                        specialClass = "danger";
                    }
                    if (specialClass != "")
                        return `<span class="badge tag-badge bg-${specialClass}">${tag}</span>`
                    return ""
                })
                .join("");
        }
        if (plan.bannedColors.find(color => char.color == color) !== undefined) {
            tagBadges = `<span class="badge tag-badge bg-danger">${color[char.color]}</span>` + tagBadges;
        }

        card.innerHTML = `
<img src="${char.icon}" alt="${char.name}" class="character-icon color-${char.color}">
<h6>${char.name}</h6>
<small class="text-muted">颜色: ${color[char.color]}</small>
<div class="character-tags">${tagBadges}</div>
                `;
        container.appendChild(card);
    });
}
function showAllCharacters() {
    document.getElementById("allCharacters").innerHTML = "";
    chars.forEach((char) => {
        const card = document.createElement("div");
        card.className = "character-card";

        // 创建标签徽章
        let tagBadges = "";
        if (char.related && char.related.length > 0) {
            tagBadges = char.related
                .map(
                    (tag) =>
                        `<span class="badge tag-badge bg-secondary">${tag}</span>`
                )
                .join("");
        }

        card.innerHTML = `
                    <img src="${char.icon}" alt="${char.name
            }" class="character-icon color-${char.color}">
                    <h6>${char.name}</h6>
                    <small class="text-muted">颜色: ${color[char.color]}</small>
                    <div class="character-tags">${tagBadges}</div>
          `;
        document.getElementById("allCharacters").appendChild(card);
    });
}