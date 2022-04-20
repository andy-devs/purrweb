document.addEventListener('DOMContentLoaded', () => {
	const cookiesBlock = document.createElement('div');
	const cookiesWrapper = document.createElement('div');
	const cookiesText = document.createElement('p');
	const cookiesButton = document.createElement('button');
	cookiesBlock.className = 'cookies';
	cookiesWrapper.className = 'cookies__wrapper';
	cookiesText.className = 'cookies__text';
	cookiesButton.className = 'cookies__button';
	cookiesText.innerText =
		'We use cookie to improve your experience on our site. By using our site you consent cookies. ';
	cookiesButton.innerText = 'OK';
	cookiesWrapper.append(cookiesText, cookiesButton);
	cookiesBlock.append(cookiesWrapper);
	cookiesButton.addEventListener('click', (event) => {
		const mountedCookies = event.target.parentNode.parentNode;
		mountedCookies.classList.remove('cookies--visible');
		setTimeout(() => {
			mountedCookies.parentNode.removeChild(mountedCookies);
		}, 1000);
	});
	document.body.append(cookiesBlock);
	setTimeout(() => {
		const mountedCookiesBlock = document.querySelector('.cookies');
		mountedCookiesBlock.classList.add('cookies--visible');
	}, 1000);
});

const form = document.querySelector('.contact__form');
const formInputs = document.querySelectorAll('.contact__form-input');
const formTextarea = document.querySelector('.contact__form-textarea');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	let canSubmit = true;

	for (let input of formInputs) {
		if (input.value.trim() === '') {
			input.classList.add('contact__form-input--empty');
			canSubmit = false;
		} else if (input.value.trim() !== '') {
			input.classList.remove('contact__form-input--empty');
		}
	}
	if (formTextarea.value.trim() === '') {
		formTextarea.classList.add('contact__form-textarea--empty');
		canSubmit = false;
	} else if (formTextarea.value.trim() !== '') {
		formTextarea.classList.remove('contact__form-textareas--empty');
	}
	console.log(canSubmit);
	if (canSubmit === true) {
		event.target.submit();
	}
});
