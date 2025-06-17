class FeatureFour{
	constructor(initElement){
		this.initElement = initElement;
		this.lifecycle();
	}
	lifecycle(){
		this.createClickEvents();
		this.setState(0);
	}
	createClickEvents(){
		this.initElement.querySelectorAll('.kl-features-04__content-list-item').forEach((element)=>{
			element.addEventListener('click', (event)=>{
				this.setState(element.dataset.id);
			})
		})
	}
	setState(stateNumber){
		// This is for the selectors
		this.initElement.querySelectorAll('.kl-features-04__content-list-item').forEach((element)=>{
			element.classList.remove('active');
			if(element.dataset.id == stateNumber){
				element.classList.add('active');
			}
		})

		// This is for the cards
		this.initElement.querySelectorAll('.kl-features-04__card-item').forEach((element)=>{
			element.classList.remove('active');
			if(element.dataset.id == stateNumber){
				element.classList.add('active');
			}
		})
	}
	/*
	*/

}
window.addEventListener('load', ()=>{
	//const __FEATURES_ELEMENT = document.querySelector('#{{name}}.kl-features-04');
	const __FEATURES_ELEMENT = document.querySelectorAll('.kl-features-04');
	//const __FEATURES_FOUR = new FeatureFour(__FEATURES_ELEMENT);
	__FEATURES_ELEMENT.forEach((element)=>{
		const __FEATURES_FOUR = new FeatureFour(element);
	})
})
