let position = 0;
let initial = 0;
let crossed;
let currentItemIndex = 0;
let isAnimating = false;

const container = document.querySelector('.slider-container');
const track = document.querySelector('.slider-track');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const items = document.querySelectorAll('.slider-item');
const navContainer = document.querySelector('.slider-nav');
const itemsCount = items.length;
const itemWidth = container.clientWidth;

items.forEach((item) => {
	item.style.minWidth = `${itemWidth}px`;
});

for (let i = 0; i < itemsCount; i++) {
	let navItem = document.createElement('div');
	navItem.className = 'slider-nav__item';
	if (i === currentItemIndex) {
		navItem.classList.add('slider-nav__item--active');
	}
	navItem.dataset.index = i;
	navContainer.append(navItem);
}

const navItems = document.querySelectorAll('.slider-nav__item');

for (let item of navItems) {
	item.addEventListener('click', (e) => {
		if (isAnimating) {
			return;
		}

		let currentNavItem = e.target;
		let nextSlideIndex = +e.target.dataset.index;

		if (nextSlideIndex === currentItemIndex) {
			return;
		}

		isAnimating = true;

		console.log(nextSlideIndex, currentItemIndex);

		let slidesCountToMove = currentItemIndex - nextSlideIndex;

		initial = -(currentItemIndex * itemWidth);
		position = initial + slidesCountToMove * itemWidth;

		navItems[currentItemIndex].classList.remove('slider-nav__item--active');
		currentNavItem.classList.add('slider-nav__item--active');

		const animate = setInterval(() => {
			if (nextSlideIndex > currentItemIndex) {
				initial -= 50;
			} else if (nextSlideIndex < currentItemIndex) {
				initial += 50;
			}
			track.style.transform = `translateX(${initial}px)`;
			if (initial === position) {
				clearInterval(animate);
				isAnimating = false;
				currentItemIndex = nextSlideIndex;
			}
		}, 16);
	});
}

function setPosition(direction) {
	if (isAnimating) {
		return;
	}

	isAnimating = true;

	let prevItemIndex = currentItemIndex;

	if (direction === 'right') ++currentItemIndex;
	else if (direction === 'left') --currentItemIndex;

	if (currentItemIndex === -1) {
		currentItemIndex = itemsCount - 1;
		crossed = 'left';
		let clone = items[0].cloneNode(true);
		track.appendChild(clone);
		initial = -(itemWidth * itemsCount);
		position = -(itemWidth * (itemsCount - 1));
	} else if (currentItemIndex === itemsCount) {
		currentItemIndex = 0;
		crossed = 'right';
		let clone = items[0].cloneNode(true);
		track.appendChild(clone);
		initial = -(itemWidth * (itemsCount - 1));
		position = -(itemWidth * itemsCount);
	} else {
		if (direction === 'right') {
			position -= itemWidth;
			initial = position + itemWidth;
		} else if (direction === 'left') {
			position += itemWidth;
			initial = position - itemWidth;
		}
	}

	for (let item of navItems) {
		if (+item.dataset.index === prevItemIndex) {
			item.classList.remove('slider-nav__item--active');
		}
		if (+item.dataset.index === currentItemIndex) {
			item.classList.add('slider-nav__item--active');
		}
	}

	const animate = setInterval(() => {
		if (direction === 'right') {
			initial -= 25;
		} else if (direction === 'left') {
			initial += 25;
		}
		track.style.transform = `translateX(${initial}px)`;
		if (initial === position) {
			clearInterval(animate);
			isAnimating = false;
			if (crossed === 'left') {
				track.style.transform = `translateX(${
					-(itemsCount - 1) * itemWidth
				}px)`;
				position = +`-${itemWidth * (itemsCount - 1)}`;
			} else if (crossed === 'right') {
				track.style.transform = `translateX(0px)`;
				position = 0;
			}
			if (crossed) {
				crossed = null;
				track.removeChild(track.lastChild);
			}
		}
	}, 16);
}

btnNext.addEventListener('click', () => {
	setPosition('right');
});

btnPrev.addEventListener('click', () => {
	setPosition('left');
});
