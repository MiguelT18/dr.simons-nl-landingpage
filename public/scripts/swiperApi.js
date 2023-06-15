export function initSwiper() {
  return new Swiper(".swiper", {
    //? Optional parameters
    effect: "flip",
    flipEffect: {
      slideShadows: false,
    },
    limitRotation: true,
    speed: 1000,
    direction: "horizontal",
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-sig",
      prevEl: ".swiper-button-ant",
    },
  });
}
