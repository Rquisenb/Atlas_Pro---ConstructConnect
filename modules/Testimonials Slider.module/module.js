document.addEventListener('DOMContentLoaded', function () {
	var sliders = document.querySelectorAll('.kl-testimonial-slider');
	const sliderConf = {
		type: 'carousel',
		gap: 32,
		peek: 16,
		perView: 3,
		bound: true,
		breakpoints: {
			1100: {
				perView: 2,
			},
			767: {
				perView: 1,
			},
		},
	}
	sliders.forEach((element)=>{
		new Glide(element, sliderConf).mutate().mount();
	})
});
