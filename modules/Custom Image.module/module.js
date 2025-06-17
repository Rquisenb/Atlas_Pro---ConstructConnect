class CustomImage{
	constructor(initElement){
		this.lifecycle(initElement);
	}
	lifecycle(element){
		this.calculateFilterSize(element);
		if("true" == element.dataset.zoom){
			this.createZoomElement(element);
			this.createMouseEvents(element);
		}
	}
	calculateFilterSize(element){
		const filter = element.querySelector(".kl-custom-image__filter"),
			image = element.querySelector("img"),
			height = image.clientHeight,
			width = image.clientWidth,
			topMargin = Number(filter.dataset.borderTop),
			bottomMargin = Number(filter.dataset.borderBottom),
			leftMargin = Number(filter.dataset.borderLeft),
			rightMargin = Number(filter.dataset.borderRight);

		//console.log("Width: ", leftMargin+rightMargin );
		filter.style.height = `${height + topMargin + bottomMargin}px`;
		filter.style.width = `${width + leftMargin + rightMargin}px`;
		filter.style.opacity = 1;
	}
	createZoomElement(element){
		const pointerElement = element.querySelector(".kl-custom-image__pointer");
		pointerElement.style.backgroundImage = `url("${pointerElement.dataset.src}")`;
	}
	createMouseEvents(element){
		//const filterElement = element.querySelector('img'),
		const filterElement = element.querySelector('.kl-custom-image__filter'),
			pointerElement = element.querySelector('.kl-custom-image__pointer');

		//element.addEventListener("pointermove", (event)=>{
		filterElement.addEventListener("pointermove", (event)=>{
			console.log("Inside");
			pointerElement.classList.remove('hide');
			let n_offsetX = event.offsetX/filterElement.clientWidth*100, 
				n_offsetY = event.offsetY/filterElement.clientHeight*100; // n_ means normalized

			pointerElement.style.transform = `translate(${n_offsetX - 100}%, ${n_offsetY - 100}%)`; // -50%, -50 is the center
			pointerElement.style.backgroundPosition = `${n_offsetX}% ${n_offsetY}%`;
			//pointerElement.style.left = `${event.offsetX}px`;
			//pointerElement.style.top = `${event.offsetY}px`;
		})
		//element.addEventListener("pointerleave", (event)=>{
		filterElement.addEventListener("pointerleave", (event)=>{
			console.log("Outside");
			pointerElement.classList.add("hide");
		})
	}
}
// Initializing the class

function initialize(){
	const __customImageElement = document.querySelectorAll('.kl-custom-image');
	__customImageElement.forEach((element)=>{
		new CustomImage(element);
	})
}
["load", "resize"].forEach((element)=>{
	window.addEventListener(element, initialize, false);
})
