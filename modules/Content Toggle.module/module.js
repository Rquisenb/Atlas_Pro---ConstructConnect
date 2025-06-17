class Toggler{
	constructor(initElement){
		this.initElement = initElement;
	}
	setState(state){
		const toggleElement = this.initElement.querySelector('.kl-content-toggle__toggler');
		toggleElement.dataset.state = state;
		if(state == 0){

			toggleElement.classList.remove('right');
			toggleElement.classList.add('left');

			this.initElement.querySelector('.kl-content-toggle-label.left').classList.add('active');
			this.initElement.querySelector('.kl-content-toggle-label.right').classList.remove('active');
			return;
		}
		toggleElement.classList.add('right');
		toggleElement.classList.remove('left');
		this.initElement.querySelector('.kl-content-toggle-label.left').classList.remove('active');
		this.initElement.querySelector('.kl-content-toggle-label.right').classList.add('active');
	}
}
class TogglerController{
	constructor(initElements){
		this.initElements = initElements;
		this.togglers = {};
		this.state = 0;
		this.lifecycle();
	}
	lifecycle(){
		this.initializeTogglers(this.initElements, this.togglers);
		this.setGlobalState(0);
	}
	initializeTogglers(listOfElements, togglersObject){
		listOfElements.forEach((element, index)=>{

			//const togglerElement = element.querySelector('.kl-content-toggle__toggler');
			const togglerWrapper = element.querySelector('.kl-content-toggle__wrapper');

			togglersObject[index] = new Toggler(element);

			togglerWrapper.addEventListener('click', ()=>{
				if(this.state == 0){
					this.state = 1;
				}else{
					this.state = 0;
				}
				this.setGlobalState(this.state);
			})
		})
	}
	showContent(state){
		this.clearContent();
		const allContent = document.querySelectorAll(`.kl-toggler.content-${state}`);
		allContent.forEach((element)=>{
			element.style.display = "block";
		})
	}
	clearContent(){
		const allContent = document.querySelectorAll('.kl-toggler');
		allContent.forEach((element)=>{
			element.style.display = "none";
		})
	}
	setGlobalState(state){
		for(const [key, value] of Object.entries(this.togglers)){
			value.setState(state);
		}
		this.clearContent();
		this.showContent(state);
	}
}
window.addEventListener('load', ()=>{
	const __toggler_element = document.querySelectorAll('.kl-content-toggle');
	const __toggler = new TogglerController(__toggler_element);
})
