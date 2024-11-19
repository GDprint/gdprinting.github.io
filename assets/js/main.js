/**
 * Template Name: Eterna
 * Template URL: https://bootstrapmade.com/eterna-free-multipurpose-bootstrap-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
	"use strict";

	/**
	 * Apply .scrolled class to the body as the page is scrolled down
	 */
	function toggleScrolled() {
		const selectBody = document.querySelector('body');
		const selectHeader = document.querySelector('#header');
		if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
		window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
	}

	document.addEventListener('scroll', toggleScrolled);
	window.addEventListener('load', toggleScrolled);

	/**
	 * Mobile nav toggle
	 */
	const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

	function mobileNavToogle() {
		document.querySelector('body').classList.toggle('mobile-nav-active');
		mobileNavToggleBtn.classList.toggle('bi-list');
		mobileNavToggleBtn.classList.toggle('bi-x');
	}
	mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

	/**
	 * Hide mobile nav on same-page/hash links
	 */
	document.querySelectorAll('#navmenu a').forEach(navmenu => {
		navmenu.addEventListener('click', () => {
			if (document.querySelector('.mobile-nav-active')) {
				mobileNavToogle();
			}
		});

	});

	/**
	 * Toggle mobile nav dropdowns
	 */
	document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
		navmenu.addEventListener('click', function (e) {
			e.preventDefault();
			this.parentNode.classList.toggle('active');
			this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
			e.stopImmediatePropagation();
		});
	});

	/**
	 * Preloader
	 */
	const preloader = document.querySelector('#preloader');
	if (preloader) {
		window.addEventListener('load', () => {
			preloader.remove();
		});
	}

	/**
	 * Scroll top button
	 */
	let scrollTop = document.querySelector('.scroll-top');

	function toggleScrollTop() {
		if (scrollTop) {
			window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
		}
	}
	scrollTop.addEventListener('click', (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	window.addEventListener('load', toggleScrollTop);
	document.addEventListener('scroll', toggleScrollTop);

	/**
	 * Animation on scroll function and init
	 */
	function aosInit() {
		AOS.init({
			duration: 600,
			easing: 'ease-in-out',
			once: true,
			mirror: false
		});
	}
	window.addEventListener('load', aosInit);

	/**
	 * Init swiper sliders
	 */
	function initSwiper() {
		document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
			let config = JSON.parse(
				swiperElement.querySelector(".swiper-config").innerHTML.trim()
			);

			if (swiperElement.classList.contains("swiper-tab")) {
				initSwiperWithCustomPagination(swiperElement, config);
			} else {
				new Swiper(swiperElement, config);
			}
		});
	}

	window.addEventListener("load", initSwiper);

	/**
	 * Initiate Pure Counter
	 */
	new PureCounter();

	/**
	 * Animate the skills items on reveal
	 */
	let skillsAnimation = document.querySelectorAll('.skills-animation');
	skillsAnimation.forEach((item) => {
		new Waypoint({
			element: item,
			offset: '80%',
			handler: function (direction) {
				let progress = item.querySelectorAll('.progress .progress-bar');
				progress.forEach(el => {
					el.style.width = el.getAttribute('aria-valuenow') + '%';
				});
			}
		});
	});

	/**
	 * Initiate glightbox
	 */
	const glightbox = GLightbox({
		selector: '.glightbox'
	});

	/**
	 * Init isotope layout and filters
	 */
	document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
		let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
		let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
		let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

		let initIsotope;
		imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
			initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
				itemSelector: '.isotope-item',
				layoutMode: layout,
				filter: filter,
				sortBy: sort
			});
		});

		isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
			filters.addEventListener('click', function () {
				isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
				this.classList.add('filter-active');
				initIsotope.arrange({
					filter: this.getAttribute('data-filter')
				});
				if (typeof aosInit === 'function') {
					aosInit();
				}
			}, false);
		});

	});

})();

//Լայնաֆորմատ տպագրություն Calculator functionality
document.getElementById('width').addEventListener('input', calculateCost);
document.getElementById('height').addEventListener('input', calculateCost);
document.getElementById('servicePackage').addEventListener('change', calculateCost);

function calculateCost() {
	const width = parseFloat(document.getElementById('width').value);
	const height = parseFloat(document.getElementById('height').value);
	const packageCost = parseFloat(document.getElementById('servicePackage').value);

	if (!width || !height || !packageCost || width <= 0 || height <= 0) {
		document.getElementById('totalCost').innerText = `Արժեքը:  0 AMD`;
		return;
	}

	const area = width * height;
	const totalCost = packageCost * area;

	document.getElementById('totalCost').innerText = `Արժեքը: ${totalCost.toFixed(0)} AMD`;
}

//Լուսանկարների տպագրություն Calculator functionality
function photoCount() {
	const sizeCost = parseFloat(document.getElementById('size').value);
	const qanak = parseInt(document.getElementById('qanak').value);

	// Check if both values are valid
	if (!sizeCost || !qanak || qanak <= 0) {
		document.getElementById('totalphCost').innerText = `Արժեքը: 0 AMD `;
		return;
	}

	// Calculate total cost
	const totalphCost = sizeCost * qanak;
	document.getElementById('totalphCost').innerText = `Արժեքը:  ${totalphCost} AMD`;
}


//Այցեքարտերի տպագրություն Calculator functionality
document.getElementById('quantity').addEventListener('input', calculateBCCost);

function calculateBCCost() {
	const quantity = parseInt(document.getElementById('quantity').value);
	const pricePerCard = 8; // Price of 1 card is 8 AMD
	let totalBCCost = 0;

	if (quantity >= 1000) {
		totalBCCost = quantity * pricePerCard; // Calculate total cost for entered quantity
	}

	document.getElementById('totalBCCost').innerText = `Արժեքը: ${totalBCCost} AMD `;
}

//Ձևաթխտերի տպագրություն Calculator function
// Calculator function
function blankForms() {
	const printTypeCost = parseFloat(document.getElementById('printType').value);
	const blank = parseInt(document.getElementById('blank').value);

	// Check if both values are valid
	if (!printTypeCost || !blank || blank <= 0) {
		document.getElementById('totalbkCost').innerText = `Արժեքը: 0 AMD`;
		return;
	}

	// Calculate total cost
	const totalbkCost = printTypeCost * blank;
	document.getElementById('totalbkCost').innerText = `Արժեքը: ${totalbkCost} AMD `;
}

//Բաժակների տպագրություն Calculator function
function SarphForms() {
        const regularPrice = 2000; // Price for 1 piece if quantity is 50 or less
        const discountedPrice = 1900; // Price for 1 piece if quantity is more than 50
        const Sarph = parseInt(document.getElementById('Sarph').value);

        // Check if quantity is valid
        if (!quantity || quantity <= 0) {
            document.getElementById('totalcupCost').innerText = `Արժեքը: 0 AMD`;
            return;
        }

        // Determine the applicable price
        const pricePerPiece = Sarph > 50 ? discountedPrice : regularPrice;

        // Calculate total cost
        const totalcupCost = pricePerPiece * Sarph;

        document.getElementById('totalcupCost').innerText = `Արժեքը: ${totalcupCost} AMD`;
    }


//Լայնաֆորմատ տպագրությ տեղադրում/փակցնում Calculator function
function PostForms() {
	const pricePerSquareMeter = 4200;
	const squareMeters = parseFloat(document.getElementById('squareMeters').value);
	//    const post = parseInt(document.getElementById('post').value);

	// Check if values are valid
	if (!squareMeters || squareMeters <= 0) {
		document.getElementById('totalptCost').innerText = `Արժեքը:  0 AMD`;
		return;
	}

	// Calculate total cost
	const totalptCost = pricePerSquareMeter * squareMeters;
	document.getElementById('totalptCost').innerText = `Արժեքը: ${totalptCost} AMD `;
}

function notificate() {
	alert("Այս պահին քննական թեստի ֆունկցիան ժամանակավորապես անհասանելի է և գտնվում է մշակման փուլում։");
	return;
}

//My order code

// Simulated order data
const orderData = {
	"148025": {
		title: "Պատվեր #148025 - Գովազդային պաստառի տպագրություն",
		printingMaterial: "Banner",
		orderStage: "Պատրաստման փուլում",
		customerData: {
			name: "Տիգրան Դանելյան",
			email: "tiko_danelyan@bk.ru",
			phone: "093672234"
		},
		description: "Գովազդային պաստառ՝ Սև ֆոնով և կապույտ երանգներով պատկեր է, պարունակում է իր մեջ համակարգչային խաղերի լուսանկարններ առկա տեքստ (GAME ZONE) տառատեսակի անվանումը *PERFORMANCE* ",
		images: [
        "https://github.com/GDprint/GDprint.github.io/blob/Master/img/dummies/works/148.jpg?raw=true"
            ]
	}
};

function searchOrder() {
	const orderNumber = document.getElementById("orderNumber").value.trim();
	const message = document.getElementById("message");
	const orderTitle = document.getElementById("orderTitle");
	const orderInfo = document.getElementById("orderInfo");
	const imageGrid = document.getElementById("imageGrid");

	// Clear previous data
	message.textContent = "";
	orderTitle.textContent = "";
	orderInfo.innerHTML = "";
	imageGrid.innerHTML = "";

	// Check if the order exists
	if (orderData[orderNumber]) {
		const order = orderData[orderNumber];

		// Set order title and detailed information
		orderTitle.textContent = order.title;
		orderInfo.innerHTML = `
                <p><strong>Տպման Նյութի Տեսակը:</strong> ${order.printingMaterial}</p>
                <p><strong>Պատվերի Վիճակը:</strong> ${order.orderStage}</p>
                <p><strong>Հաճախորդի Տվյալներ:</strong></p>
                <ul>
                    <li><strong>Անուն:</strong> ${order.customerData.name}</li>
                    <li><strong>Էլ․ հասցե:</strong> ${order.customerData.email}</li>
                    <li><strong>Հեռախոսահամար:</strong> ${order.customerData.phone}</li>
                </ul>
                <p><strong>Պատվերի Նկարագրություն:</strong> ${order.description}</p>
            `;

		// Display images in a responsive grid with zoom functionality
		order.images.forEach(imageUrl => {
			const colDiv = document.createElement("div");
			colDiv.className = "col";

			const img = document.createElement("img");
			img.src = imageUrl;
			img.alt = "Պատվերի Նկար";
			img.className = "order-image img-fluid";
			img.setAttribute("data-bs-toggle", "modal");
			img.setAttribute("data-bs-target", "#zoomModal");

			// Click event to zoom image
			img.onclick = function () {
				document.getElementById("zoomImage").src = img.src;
			};

			colDiv.appendChild(img);
			imageGrid.appendChild(colDiv);
		});

		// Show the modal
		const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
		orderModal.show();
	} else {
		message.textContent = "Պատվեր չի գտնվել։ Խնդրում ենք մուտքագրել ճիշտ պատվերի համար:";
	}
}

// Function to return to the order view
function backToOrder() {
	const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
	orderModal.show();
}
