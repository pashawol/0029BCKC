"use strict";
const JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	//pure js
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); // (1)
			if (!container && !toggle) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},
	//-
	modalCall() {
		const link = ".link-modal-js";

		Fancybox.bind(link, {
			arrows: false,
			infobar: false,
			touch: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		// fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	//pure js
	tabscostume() {
		//ultimate tabs
		let cTabs = document.querySelectorAll('.tabs');
		for (let tab of cTabs) {
			let Btns = tab.querySelectorAll('.tabs__btn')
			let contentGroups = tab.querySelectorAll('.tabs__wrap');

			for (let btn of Btns) {
				btn.addEventListener('click', function () {

					for (let btn of Btns) {
						btn.classList.remove('active');
					}
					this.classList.add('active');

					let index = [...Btns].indexOf(this);
					//-console.log(index);

					for (let cGroup of contentGroups) {
						let contentItems = cGroup.querySelectorAll('.tabs__content');

						for (let item of contentItems) {
							item.classList.remove('active');
						}
						contentItems[index].classList.add('active');
					}
				})
			}
		}
	},
	//pure js
	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		let maskedDate = [].slice.call(document.querySelectorAll('.masked-date'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		maskedDate.forEach(element => element.setAttribute("pattern", "(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
		Inputmask("99.99.9999").mask(maskedDate);
	},
	//pure js
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	//pure js
	heightwindow() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	//pure js
	animateScroll(topShift = 80) {
		document.addEventListener('click', function () {
			if (event.target.closest('.menu li a, .scroll-link')) {
				let self = event.target.closest('.menu li a, .scroll-link');
				event.preventDefault();

				let targetSelector = self.getAttribute('href');
				let target = document.querySelector(targetSelector);


				if (!target) {
					self.setAttribute("href", '/' + targetSelector);
				}

				if (headerH) {
					topShift = headerH;
				}
				else {
					event.preventDefault();
					let targetTop = target.offsetTop;
					window.scrollTo({
						top: targetTop - topShift,
						behavior: "smooth",
					});
				}
			}
		});
	},
	datepicker() {
		let pickers = document.querySelectorAll(".input-date-picker-js")
		pickers.forEach(el => {
			new Litepicker({
				element: el,
				singleMode: false,
				showTooltip: false,
				dropdowns: true,
				resetButton: true,
				// tooltipText: {
				// 	one: 'night',
				// 	other: 'nights'
				// },
				lang: 'ru-RU',
				format: "DD.MM.YYYY",
			})
		});
		let pickerSingle = document.querySelectorAll(".input-date-picker-single-js")
		pickerSingle.forEach(el => {
			new Litepicker({
				element: el,
				singleMode: true,
				showTooltip: false,
				dropdowns: true,
				resetButton: true,
				// tooltipText: {
				// 	one: 'night',
				// 	other: 'nights'
				// },
				lang: 'ru-RU',
				format: "DD.MM.YYYY",
			})
		})

	}
};
const $ = jQuery;

function eventHandler() {
	// JSCCommon.ifie();
	JSCCommon.modalCall();
	JSCCommon.datepicker();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}

	//luckyOne Js

	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	let freeMomentum = {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,
	};

	let defSwiper = new Swiper('selector', {
		...defaultSl,
		...freeMomentum,
	});

	//jq
	function makeDDGroup() {
		let parents = document.querySelector('.dd-group-js');
		if (!parents) return
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	}
	makeDDGroup();

	//
	$('.menu-mobile--js .menu-item-has-children').click(function () {
		$(this).toggleClass('active');
		$(this).find('.sub-menu').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	$('.input-location-picker').click(function () {
		$('.input-location-modal-wrap').toggleClass('active');
	});
	$('.accordion-button').click(function () {
		$(this).toggleClass('active')
			.next().slideToggle();
	});
	var aboutSlider = new Swiper('.sAboutOrg__aboutSwiper--js', {
		slidesPerView: 'auto',
		spaceBetween: 40,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
	//.headerBlock-slider-js
	let headerBlockSlider = new Swiper('.headerBlock-slider-js', {
		slidesPerView: 'auto',
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		effect: "creative",
		speed: 700,
		creativeEffect: {
			prev: {
				shadow: false,
				translate: [0, 0, -400],
			},
			next: {
				translate: ["70%", "30%", 0],
				scale: .5,
			},
		},
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		on: {
			slideChange: function () {
				let realCount = 0;

				for (let slide of this.slides) {
					if (!slide.classList.contains('swiper-slide-duplicate')) {
						realCount++;
					}
				}

				// let thisFract = document.querySelector('.sHero--js .fract-js');
				let thisFract = this.el.querySelector('.fract-js');
				// thisFract.innerHTML = this.realIndex + 1 + ' / ' + realCount;

				thisFract.innerHTML = this.realIndex + 1 + ' / ' + realCount;
			},
		},
	});


	let headerBlockSliderMob = new Swiper('.headerBlock-slider-mob-js', {
		slidesPerView: 1,
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		speed: 700,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	});



	//
	let sEventsSlider = new Swiper('.sEvents-slider-js', {
		slidesPerView: "auto",
		loop: true,

		breakpoints: {
			0: {
				spaceBetween: 20,
			},
			1200: {
				spaceBetween: 40,
			},
		},
	});

	let sEventsSliderRegion = new Swiper('.sEvents--region .sEvents-slider--js', {
		slidesPerView: "auto",
		// loop: true,
		watchOverflow: true,

		breakpoints: {
			0: {
				spaceBetween: 20,
			},
			1200: {
				spaceBetween: 40,
			},
		},
	});

	let sNewsSlider = new Swiper('.sNews-slider-js', {
		slidesPerView: "auto",
		// loop: true,
		watchOverflow: true,

		breakpoints: {
			0: {
				spaceBetween: 20,
			},
			1200: {
				spaceBetween: 40,
			},
		},
	});

	let pageHeadSlider = new Swiper('.page-head__slider--js', {
		slidesPerView: "auto",
		watchOverflow: true,
		freeMode: true,
		touchRatio: 0.3,
		slideToClickedSlide: true,
		freeModeMomentum: true,
		// spaceBetween: 20,
		breakpoints: {
			0: {
				spaceBetween: 5,
			},
			576: {
				spaceBetween: 20,
			},
		},
	});
	//
	// import * as FilePond from 'filepond';
	// const pond = FilePond.create({
	// 	multiple: true,
	// 	name: 'filepond'
	// });
	// document.body.appendChild(pond.element);
	FilePond.registerPlugin(
		FilePondPluginImagePreview,
		FilePondPluginImageCrop,
		FilePondPluginImageResize,
		FilePondPluginImageTransform,
		FilePondPluginImageEdit
		// FilePondPluginImageExifOrientation,
		// FilePondPluginFileValidateSize,
		// FilePondPluginImageEdit
	);

	FilePond.create(
		document.querySelector('.load-photo input'),
		{
			labelIdle: `Добавить фото&nbsp;профиля`,
			imagePreviewHeight: 300,
			imageCropAspectRatio: '1:1',
			imageResizeTargetWidth: 280,
			imageResizeTargetHeight: 297,
			styleLoadIndicatorPosition: 'center bottom',
			styleProgressIndicatorPosition: 'left bottom',
			styleButtonRemoveItemPosition: 'left bottom',
			styleButtonProcessItemPosition: 'left bottom',
		}
	);
	FilePond.create(
		document.querySelector('.load-photo--edit input'),
		{
			labelIdle: `Изменить фото&nbsp;профиля`,
			imagePreviewHeight: 300,
			imageCropAspectRatio: '1:1',
			imageResizeTargetWidth: 280,
			imageResizeTargetHeight: 297,
			styleLoadIndicatorPosition: 'center bottom',
			styleProgressIndicatorPosition: 'left bottom',
			styleButtonRemoveItemPosition: 'left bottom',
			styleButtonProcessItemPosition: 'left bottom',
		}
	);
	FilePond.create(
		document.querySelector('.load-photo-ticket input'),
		{
			labelIdle: `Добавить фото&nbsp;для&nbsp;билета`,
			imagePreviewHeight: 300,
			imageCropAspectRatio: '1:1',
			imageResizeTargetWidth: 280,
			imageResizeTargetHeight: 297,
			styleLoadIndicatorPosition: 'center bottom',
			styleProgressIndicatorPosition: 'left bottom',
			styleButtonRemoveItemPosition: 'left bottom',
			styleButtonProcessItemPosition: 'left bottom',
		}
	);

	// $('.load-photo').filepond({
	// 	labelIdle: `Добавить фото&nbsp;профиля`,
	// 	imagePreviewHeight: 170,
	// 	imageCropAspectRatio: '1:1',
	// 	imageResizeTargetWidth: 200,
	// 	imageResizeTargetHeight: 200,
	// 	// stylePanelLayout: 'compact circle',
	// 	// styleLoadIndicatorPosition: 'center bottom',
	// 	// styleProgressIndicatorPosition: 'right bottom',
	// 	// styleButtonRemoveItemPosition: 'left bottom',
	// 	// styleButtonProcessItemPosition: 'right bottom',
	// });

	let sHeroSlider = new Swiper('.sHero-slider-js', {
		slidesPerView: "auto",
		loop: true,
		spaceBetween: 20,

		navigation: {
			nextEl: '.sHero--js .swiper-next',
			prevEl: '.sHero--js .swiper-prev',
		},
		on: {
			slideChange: function () {
				let realCount = 0;

				for (let slide of this.slides) {
					if (!slide.classList.contains('swiper-slide-duplicate')) {
						realCount++;
					}
				}

				let thisFract = document.querySelector('.sHero--js .fract-js');
				thisFract.innerHTML = this.realIndex + 1 + ' / ' + realCount;
			},
		},
	});
	$('.set-curr-year-js').each(function () {
		this.innerHTML = new Date().getFullYear();
	});
	//yandex lazy
	//<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=ef0b1dde-1d01-4d5b-9636-c00e2adbee98" type="text/javascript"></script>
	window.setTimeout(function () {
		let yandexScript = document.createElement('script');
		yandexScript.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=ef0b1dde-1d01-4d5b-9636-c00e2adbee98');
		yandexScript.setAttribute('type', 'text/javascript');
		document.body.appendChild(yandexScript);
		//-console.log(yandexScript);

		// let yandexJq = document.createElement('script');
		// yandexJq.setAttribute('src', 'https://yandex.st/jquery/2.2.3/jquery.min.js');
		// yandexJq.setAttribute('type', 'text/javascript');
		// document.body.appendChild(yandexJq);
		//-console.log(yandexJq);

		if (document.querySelector("#map")) {


			window.setTimeout(function () {
				ymaps.ready(function () {
					var myMap = new ymaps.Map('map', {
						center: [63.63, 99.22],
						zoom: 3,
					}, {
						minZoom: 3,
						maxZoom: 5,
					}, {
						searchControlProvider: 'yandex#search'
					}),
						objectManager = new ymaps.ObjectManager({
							// Чтобы метки начали кластеризоваться, выставляем опцию.
							clusterize: true,
							// ObjectManager принимает те же опции, что и кластеризатор.
							gridSize: 32,
							clusterDisableClickZoom: true
						});

					// Чтобы задать опции одиночным объектам и кластерам,
					// обратимся к дочерним коллекциям ObjectManager.
					objectManager.objects.options.set('preset', 'islands#circleDotIcon');
					objectManager.objects.options.set('iconColor', '#E31E24');
					objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
					myMap.geoObjects.add(objectManager);

					$.ajax({
						url: "data.json"
					}).done(function (data) {
						objectManager.add(data);
					});
				});
			}, 1000);
		}

	}, 2000);

	//
	let show = true;
	function counters() {
		var countbox = $('.counter-wrap-js');
		if (!countbox.length && !show) return;
		$('.counter-js').css('opacity', '1');
		$('.counter-js').spincrement({
			thousandSeparator: " ",
			duration: 1000
		});
		show = false;
	}

	//
	let progress = document.querySelector('.pieProgress');
	if (progress) {
		let bar = $('.pieProgress');

		let target = bar;
		let targetPos = target.offset().top;
		let winHeight = $(window).height();
		let scrollToElem = targetPos - winHeight;


		let arr = {
			namespace: 'pie_progress',
			easing: 'linear',
			min: 0,
			first: 0,
			size: 68,
			barcolor: '#EB7329',
			barsize: '1',
			speed: 30,
			trackcolor: 'transparent',
			goal: 0,
		}

		let bars = document.querySelectorAll('.col-circle-js .pieProgress');
		for (let bar of bars) {
			$(bar).asPieProgress(arr);
		}

		function startPrigess() {
			for (let bar of bars) {
				$(bar).asPieProgress('start');
			}
		}

		$(window).scroll(function () {
			let winScrollTop = $(this).scrollTop();
			if (winScrollTop > scrollToElem) {
				startPrigess();
				counters();
			}
		});
	}


	//end luckyOne Js

	$('.toggle-text').click(function (e) {
		e.preventDefault();
		let text = $(this).prev();
		let attr = text.attr("style");
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).html("читать&nbsp;полностью")
			text.removeAttr("style");
		}
		else {
			$(this).html("cкрыть")
			text.attr("style", '--clamp:" "')
		}
	})
	$(".toggle-content").each(function () {
	})
	$('.toggle-text-volunteers').click(function (e) {
		e.preventDefault();
		let text = $(this).prev();
		let attr = text.attr("style");
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).html("подробнее...")
			text.removeAttr("style");
		}
		else {
			$(this).html("cкрыть")
			text.attr("style", '--clamp:" "')
		}
	})
	$(".toggle-content-volunteers").each(function () {
	})
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}
