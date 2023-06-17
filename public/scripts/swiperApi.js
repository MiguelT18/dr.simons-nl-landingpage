export function initSwiper() {
  return new Swiper(".swiper", {
    //? Optional parameters
    slidesPerView: "1",
    effect: "flip",
    flipEffect: {
      slideShadows: false,
    },

    speed: 1000,
    direction: "horizontal",
    loop: false,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-sig",
      prevEl: ".swiper-button-ant",
    },
  });
}
