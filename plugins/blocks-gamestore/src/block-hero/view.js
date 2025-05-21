document.addEventListener('DOMContentLoaded', () => {
	const swiperHero = new Swiper('.hero-slider .slider-container', {
		loop: true,
		autoplay: {
			delay: 2000,
			disableOnInteraction: false,
		},
		slidesPerView: 'auto',
		speed: 1500,
		grabCursor: true,
		mousewheelControl: true,
		keyboardControl: true,
	})
});
