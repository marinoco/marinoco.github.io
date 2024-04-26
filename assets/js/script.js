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
