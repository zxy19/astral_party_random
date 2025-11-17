/**
 * @type {{bannedColors: number[], bannedTags: number[], map: string, difficulty: string}}
 */
const plan = {
    bannedColors: [],
    bannedTags: [],
    map: "",
    difficulty: ""
}
function loadPlanFromHash() {
    // // 解析哈希值
    const hash = window.location.hash.substring(1);
    const parts = hash.split("|");
    plan.map = parts[0];
    plan.difficulty = parts[1];
    plan.bannedColors = parts[2].split(",").map(color => parseInt(color));
    plan.bannedTags = parts[3].split(",").map(tag => parseInt(tag));
}

/**
 * 
 * @param {Types.Char} char 
 */
function isCharBanned(char) {
    return plan.bannedColors.find(color => char.color == color) || plan.bannedTags.map(tagId => tags[tagId]).find(tag => char.related.find(t => t == tag));
}