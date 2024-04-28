// DOMContentLoadedイベントで複数の関数を実行
document.addEventListener("DOMContentLoaded", function () {
    updateCopyright();
    addTitleIcons();
    loadSvgs();
    loadImages();
    initModal();
    handleSidebarResize();
});

// 現在の年を自動で更新
function updateCopyright() {
    const yearSpan = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
}

// タイトル要素の前にアイコンを追加
function addTitleIcons() {
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
}

// SVGファイルを読み込み
function loadSvgs() {
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
}

// 画像ファイルを読み込み、WebPやスマホ用の画像を自動で設定
function loadImages() {
    const basePath = "../assets/images/";
    const imgExtensions = [".jpg", ".png"];

    function setImageSrc(img, imageName, suffix, extension) {
        img.src = `${basePath}${imageName}${suffix}${extension}`;
        img.removeAttribute("data-src");
    }

    function checkImageExists(img, imageName, suffix) {
        let extensionIndex = 0;

        function checkNext() {
            const extension = imgExtensions[extensionIndex];
            const tempImg = new Image();
            tempImg.onload = function () {
                setImageSrc(img, imageName, suffix, extension);
            };
            tempImg.onerror = function () {
                extensionIndex++;
                if (extensionIndex < imgExtensions.length) {
                    checkNext();
                }
            };
            tempImg.src = `${basePath}${imageName}${suffix}${extension}`;
        }

        checkNext();
    }

    const webpSupported = document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0;
    const windowWidth = window.innerWidth;
    const images = document.querySelectorAll("[data-src]");

    images.forEach(function (img) {
        const imageName = img.dataset.src;
        const suffix = windowWidth <= 767 ? "-sp" : "";

        if (img.parentElement.classList.contains("hero__image")) {
            // Hero imageの場合
            img.src = `${basePath}${imageName}${suffix}${webpSupported ? ".webp" : ".jpg"}`;
            img.removeAttribute("data-src");
        } else {
            // その他の画像の場合
            if (webpSupported) {
                setImageSrc(img, imageName, suffix, ".webp");
            } else {
                checkImageExists(img, imageName, suffix);
            }
        }
    });
}

// モーダル表示機能
function initModal() {
    var overlay = document.createElement("div");
    overlay.classList.add("overlay");

    var overlayImage = document.createElement("img");
    overlayImage.classList.add("overlay__item");

    var closeBtn = document.createElement("button");
    closeBtn.classList.add("overlay__close");
    closeBtn.innerHTML = "&times;";

    overlay.appendChild(overlayImage);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    var galleryLinks = document.querySelectorAll('.gallery__link[data-modal="true"]');

    var openModal = function (imageSrc) {
        overlayImage.setAttribute("src", imageSrc);
        overlay.classList.add("active");
        setTimeout(function () {
            overlayImage.classList.add("active");
        }, 100);
    };

    var closeModal = function () {
        overlayImage.classList.remove("active");
        setTimeout(function () {
            overlay.classList.remove("active");
        }, 300);
    };

    galleryLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            openModal(this.getAttribute("href"));
        });
    });

    closeBtn.addEventListener("click", closeModal);

    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
}

// サイドバーのコンテンツを画面サイズに合わせて移動
function handleSidebarResize() {
    const sidebar = document.querySelector(".sidebar");
    const sidebarItem = document.querySelector(".aside-section");
    const main = document.querySelector(".main");
    const isSmallScreen = window.innerWidth <= 768;

    if (isSmallScreen) {
        main.appendChild(sidebarItem);
    } else {
        sidebar.appendChild(sidebarItem);
    }
}

// リサイズイベントを監視してhandleSidebarResizeを実行
window.addEventListener("resize", handleSidebarResize);