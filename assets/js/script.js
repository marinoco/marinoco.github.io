// title
document.addEventListener("DOMContentLoaded", function () {
    const titles = document.querySelectorAll('.title[data-icon="true"]');

    titles.forEach(function (title) {
        const icon = document.createElement("span");
        icon.classList.add("title__icon");

        if (title.firstChild) {
            title.insertBefore(icon, title.firstChild);
        } else {
            title.appendChild(icon);
        }
    });
});

// svg読み込み
document.addEventListener("DOMContentLoaded", function () {
    const svgElements = document.querySelectorAll("[data-svg]");

    svgElements.forEach(function (element) {
        const svgFilePath = element.getAttribute("data-svg");
        const svgUrl = `../assets/images/${svgFilePath}.svg`;

        fetch(svgUrl)
            .then((response) => response.text())
            .then((svgContent) => {
                element.innerHTML = svgContent;
                element.removeAttribute("data-svg");
            })
            .catch((error) => {
                console.error("SVGの読み込みエラー:", error);
            });
    });
});

// サブコンテンツの移動
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const sidebarItem = document.querySelector(".aside-section");
    const main = document.querySelector(".main");

    let isSmallScreen = window.innerWidth <= 768;

    function handleResize() {
        const currentIsSmallScreen = window.innerWidth <= 768;

        if (currentIsSmallScreen !== isSmallScreen) {
            isSmallScreen = currentIsSmallScreen;

            if (isSmallScreen) {
                main.appendChild(sidebarItem);
            } else {
                sidebar.appendChild(sidebarItem);
            }
        }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
});
