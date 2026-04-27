let allImages = document.querySelectorAll(".gallery img");
let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img");
let currentIndex = 0;
let visibleImages = Array.from(allImages); // ✅ Track visible images separately

/* Open Lightbox */
allImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        visibleImages = getVisibleImages(); // ✅ Refresh visible list on click
        currentIndex = visibleImages.indexOf(img);
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

/* Get currently visible images */
function getVisibleImages() {
    return Array.from(document.querySelectorAll(".gallery-item"))
        .filter(item => item.style.display !== "none")
        .map(item => item.querySelector("img"));
}

/* Close */
function closeLightbox() {
    lightbox.style.display = "none";
}

/* Next */
function nextImage() {
    visibleImages = getVisibleImages();
    currentIndex = (currentIndex + 1) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].src;
}

/* Previous */
function prevImage() {
    visibleImages = getVisibleImages();
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    lightboxImg.src = visibleImages[currentIndex].src;
}

/* Filter - ✅ Also updates lightbox navigation */
function filterImages(category) {
    let items = document.querySelectorAll(".gallery-item");
    items.forEach(item => {
        if (category === "all" || item.classList.contains(category)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}