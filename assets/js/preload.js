document.addEventListener("DOMContentLoaded", function () {
    var preloadImages = [
        "../assets/images/works/cri-mw.jpg",
        "../assets/images/works/cri-mw-sp.jpg",
        "../assets/images/works/cri-mw.webp",
        "../assets/images/works/cri-mw-sp.webp",
        "../assets/images/works/neko-nook.jpg",
        "../assets/images/works/neko-nook.webp",
        "../assets/images/works/neko-nook-sp.jpg",
        "../assets/images/works/neko-nook-sp.webp",
        "../assets/images/works/ninnaji.jpg",
        "../assets/images/works/ninnaji-sp.jpg",
        "../assets/images/works/ninnaji.webp",
        "../assets/images/works/ninnaji-sp.webp",
        "../assets/images/works/ninnaji-en.jpg",
        "../assets/images/works/ninnaji-en.webp",
        "../assets/images/works/ninnaji-en-sp.jpg",
        "../assets/images/works/ninnaji-en-sp.webp",
        "../assets/images/works/personal.jpg",
        "../assets/images/works/personal.webp",
        "../assets/images/works/personal-sp.jpg",
        "../assets/images/works/personal-sp.webp",
        "../assets/images/works/post-card.jpg",
        "../assets/images/works/post-card.webp",
        "../assets/images/works/post-card-sp.jpg",
        "../assets/images/works/post-card-sp.webp"
    ];

    var head = document.getElementsByTagName("head")[0];

    preloadImages.forEach(function (imagePath) {
        var link = document.createElement("link");
        link.rel = "preload";
        link.href = imagePath;
        link.as = "image";
        head.appendChild(link);
    });
});
