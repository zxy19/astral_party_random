
// 初始化页面
document.addEventListener("DOMContentLoaded", function () {
    showAllCharacters();

    // 表单变化时保存设置
    document
        .getElementById("selectionForm")
        .addEventListener("change", saveSettings);

    // 清除存储按钮事件
    document
        .getElementById("clearStorageBtn")
        .addEventListener("click", function () {
            if (confirm("确定要清除所有保存的设置吗？")) {
                localStorage.removeItem(STORAGE_KEY);
                location.reload();
            }
        });
    document
        .getElementById("addTagGroup")
        .addEventListener("click", function () {
            generateNewPanel();
        });
    document
        .getElementById("addCharGroup")
        .addEventListener("click", function () {
            generateNewBanCharPanel();
        });

    // 提交按钮点击事件
    document
        .getElementById("submitBtn")
        .addEventListener("click", function () {
            window.location.hash = generatePlan();
            showPage2();
        });

    // 返回按钮点击事件
    document
        .getElementById("backBtn")
        .addEventListener("click", function () {
            window.location.hash = "";
        });

    // 监听hashchange事件
    window.addEventListener("hashchange", function () {
        if (window.location.hash) {
            showPage2();
        } else {
            showPage1();
        }
    });

    // 监听popstate事件（浏览器前进后退）
    window.addEventListener("popstate", function (event) {
        if (window.location.hash) {
            showPage2();
        } else {
            showPage1();
        }
    });
});