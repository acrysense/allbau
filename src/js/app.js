document.addEventListener('DOMContentLoaded', function () {
    // INPUTMASK
    Inputmask().mask(document.querySelectorAll('input'));

    // HEIGHT 100VH FIX FOR IOS
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // HEIGHT HEADER
    const header = document.querySelector('.header'); // header
    let headerh = header ? header.getBoundingClientRect().height : 0; // height header
    document.documentElement.style.setProperty('--headerh', `${headerh}px`);

    // NEWS STRING
    const news = document.querySelector('.c-news'); // news
    let newsh = news ? news.getBoundingClientRect().height : 0; // height news
    document.documentElement.style.setProperty('--newsh', `${newsh}px`);

    // PARTNERS TITLE
    const partnersTitle = [...document.querySelectorAll('.partners__subtitle')]

    function getMaxElementsHeight(elements) {

        const heights = elements.map(elements => {
            return elements.getBoundingClientRect().height;
        });              
        
        return Math.max.apply(null, heights);
    }

    if (partnersTitle) {
        if (window.innerWidth >= 1024) {
            let maxCellHeight = getMaxElementsHeight(partnersTitle)
        
            partnersTitle.forEach(item => {
                item.style.minHeight = maxCellHeight + 'px'
            })
        }
    }

    // RESIZE
    window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        let headerh = header ? document.querySelector('.header').getBoundingClientRect().height : 0; // height header
        let newsh = news ? news.getBoundingClientRect().height : 0; // height news
        let maxCellHeight = partnersTitle ? getMaxElementsHeight(partnersTitle) : 0; // partners title max height
        
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--headerh', `${headerh}px`);
        document.documentElement.style.setProperty('--newsh', `${newsh}px`);

        if (partnersTitle) {
            if (window.innerWidth >= 1024) {
                partnersTitle.forEach(item => {
                    item.style.minHeight = maxCellHeight + 'px'
                })
            } else {
                partnersTitle.forEach(item => {
                    item.style.minHeight = 'auto'
                })
            }
        }
    });
    
    // SMOOTH SCROLL
    function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;

        return 0;
    } 
    
    function elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    
    function smoothScroll(eID) {
        let startY = currentYPosition();
        let stopY = elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }

    // ALL LINKS SMOOTH SCROLL
    const allLinks = document.querySelectorAll('a[href^="#"]')

    if (allLinks) {
        allLinks.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
        
                setTimeout(() => {
                    if (item.getAttribute('href').length > 1) {
                        smoothScroll(item.getAttribute('href').slice(1))
                    }
                }, 500);
            })
        })
    }

    // SELECT
    const selects = document.querySelectorAll('.select')

    selects.forEach(item => {
        new SlimSelect({
            select: item
        })
    })

    // ANIMATIONS
    AOS.init({
        duration: 1200,
        once: true,
    })

    // MENU
    const hamburger = document.getElementById('hamburger-toggle')
    const menu = document.getElementById('menu')
    const overlay = document.querySelector('.overlay')

    if (hamburger) {
        hamburger.addEventListener('click', (event) => {
            event.preventDefault()

            if (hamburger.classList.contains('hamburger--active') && menu.classList.contains('menu--active')) {
                hamburger.classList.remove('hamburger--active')
                menu.classList.remove('menu--active')
                overlay.classList.remove('overlay--active')
                document.body.classList.remove('scroll-disabled')
            } else {
                hamburger.classList.add('hamburger--active')
                menu.classList.add('menu--active')
                overlay.classList.add('overlay--active')
                document.body.classList.add('scroll-disabled')
            }

            document.querySelectorAll('.languages__list').forEach((child) => child.classList.remove('languages__list--active'))
            document.querySelectorAll('.languages__current').forEach((child) => child.classList.remove('languages__current--active'))
        })
    }

    if (overlay) {
        overlay.addEventListener('click', (event) => {
            event.preventDefault()

            // menu
            if (hamburger.classList.contains('hamburger--active') && menu.classList.contains('menu--active')) {
                hamburger.classList.remove('hamburger--active')
                menu.classList.remove('menu--active')
                overlay.classList.remove('overlay--active')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }

    // MODAL
    const modal = document.querySelectorAll('.modal')
    const modalBtn = document.querySelectorAll('.modal-btn')
    const modalOverlay = document.querySelector('.modal-overlay')
    
    if (modalBtn) {
        modalBtn.forEach((item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                if (!modalOverlay.classList.contains('modal-overlay--active')) {
                    modalOverlay.classList.add('modal-overlay--active')
                }
                document.body.classList.add('scroll-disabled')

                const modalID = item.dataset.id
                document.getElementById(modalID).classList.add('modal--active')
            });
        });
    }

    document.body.addEventListener('keyup', (event) => {
        let key = event.keyCode;

        if (modal && modalOverlay.classList.contains('modal-overlay--active')) {
            if (key == 27) {
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
                document.body.classList.remove('scroll-disabled')
            };
        }
    }, false);

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (event) => {
            event.preventDefault()
            
            // modal
            if (modal && modalOverlay.classList.contains('modal-overlay--active')) {
                document.querySelectorAll('.modal.modal--active').forEach((child) => child.classList.remove('modal--active'))
                modalOverlay.classList.remove('modal-overlay--active')
                document.body.classList.remove('scroll-disabled')
            }
        })
    }
    
    // SELECT
    const selected = document.querySelectorAll('.languages__current')
    const optionsList = document.querySelectorAll('.languages__option')

    const useItemChecker = (els, onClickOutside) => {
        const checkBodyClick = (e) => {
            let currentEl = e.target;

            while (currentEl) {
                if (els.includes(currentEl)) break;
                currentEl = currentEl.parentNode
            }

            if (!currentEl) {
                onClickOutside()
                removeBodyChecker()
            }
        }
        function setBodyChecker  ()  {
            document.documentElement.addEventListener('click', checkBodyClick)
        }
        function removeBodyChecker ()  {
            document.documentElement.removeEventListener('click', checkBodyClick)
        }
        return {setBodyChecker, removeBodyChecker}
    }
    
    if (selected) {
        selected.forEach(item => {
            const close = () => {
                document.querySelectorAll('.languages__list').forEach((child) => child.classList.remove('languages__list--active'))
                document.querySelectorAll('.languages__current').forEach((child) => child.classList.remove('languages__current--active'))
            }
            const itemChecker = useItemChecker([item.parentNode.parentNode.parentNode], close)

            item.addEventListener('click', () => {
                if (item.previousElementSibling.classList.contains('languages__list--active')) {
                    document.querySelectorAll('.languages__list').forEach((child) => child.classList.remove('languages__list--active'))
                    document.querySelectorAll('.languages__current').forEach((child) => child.classList.remove('languages__current--active'))
                }
                else {
                    document.querySelectorAll('.languages__list').forEach((child) => child.classList.remove('languages__list--active'))
                    document.querySelectorAll('.languages__current').forEach((child) => child.classList.remove('languages__current--active'))
                    item.previousElementSibling.classList.add('languages__list--active')
                    item.classList.add('languages__current--active')
                    itemChecker.setBodyChecker()
                }
            })
        });
    }

    if (optionsList) {
        optionsList.forEach((option, i) => {
            option.addEventListener('click', (event) => {
                event.preventDefault()

                option.parentNode.parentNode.nextElementSibling.innerHTML = option.innerHTML

                option.parentNode.parentNode.classList.remove('languages__list--active')
                option.parentNode.parentNode.nextElementSibling.classList.remove('languages__current--active')
            });
        });
    }

    // HEADER DROPDOWN NAV
    const headerDropdownBtn = document.querySelector('.solutions-btn');
    const headerDropdown = document.querySelector('.header-nav');
    const headerDropdownLink = document.querySelector('.header-nav__link--content');
    const headerDropdownContent = document.querySelector('.header-nav__content');
    const headerDropdownBack = document.querySelector('.header-nav__back');

    if (headerDropdownBtn) {
        headerDropdownBtn.addEventListener('click', (event) => {
            event.preventDefault()

            if (headerDropdownBtn.classList.contains('solutions-btn--active') && headerDropdown.classList.contains('header-nav--active')) {
                headerDropdownBtn.classList.remove('solutions-btn--active')
                headerDropdown.classList.remove('header-nav--active')
                headerDropdownContent.classList.remove('header-nav__content--active')
            } else {
                headerDropdownBtn.classList.add('solutions-btn--active')
                headerDropdown.classList.add('header-nav--active')
                headerDropdownContent.classList.add('header-nav__content--active')
            }
        })
    }

    if (headerDropdownBack) {
        headerDropdownBack.addEventListener('click', (event) => {
            event.preventDefault()

            headerDropdownBtn.classList.remove('solutions-btn--active')
            headerDropdown.classList.remove('header-nav--active')
            headerDropdownContent.classList.remove('header-nav__content--active')
        })
    }

    if (headerDropdownLink) {
        headerDropdownLink.addEventListener('click', () => {
            if (window.matchMedia( "(hover: none)" ).matches) {
                headerDropdownContent.classList.add('header-nav__content--active')
            }
        })

        headerDropdownLink.addEventListener('mouseover', () => {
            if (window.matchMedia( "(hover: hover)" ).matches) {
                headerDropdownContent.classList.add('header-nav__content--active')
            }
        })

        headerDropdownLink.addEventListener('mouseout', () => {
            if (window.matchMedia( "(hover: hover)" ).matches) {
                headerDropdownContent.classList.remove('header-nav__content--active')
            }
        })
    }

    if (headerDropdownContent) {
        headerDropdownContent.addEventListener('mouseover', () => {
            if (window.matchMedia( "(hover: hover)" ).matches) {
                headerDropdownLink.parentNode.classList.add('header-nav__item--hover')
            }
        })

        headerDropdownContent.addEventListener('mouseout', () => {
            if (window.matchMedia( "(hover: hover)" ).matches) {
                headerDropdownLink.parentNode.classList.remove('header-nav__item--hover')
            }
        })
    }

   // SEARCH FILTER
   const searchFilterToggler = document.querySelector('.search-filter__toggler')
   const searchFilterList = document.querySelector('.search-filter__list')

   if (searchFilterToggler) {
    searchFilterToggler.addEventListener('click', (event) => {
           event.preventDefault()

           searchFilterToggler.classList.toggle('search-filter__toggler--active')
           searchFilterList.classList.toggle('search-filter__list--active')
       })
   }

    // SWIPER
    const userProjectsSlider = document.querySelector('.user-projects__slider .swiper-container')
    const faqSlider = document.querySelector('.faq-main__slider .swiper-container')
    const productsSlider = document.querySelector('.products__slider .swiper-container')

    if (userProjectsSlider) {
        const myUserProjectsSlider = new Swiper(userProjectsSlider, {
            slidesPerView: 1,
            loop: true,
            speed: 1000,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                formatFractionCurrent: function(number) {
                    return number < 10 ? number = '0' + number : number;
                },
                formatFractionTotal: function(number) {
                    return number < 10 ? number = '0' + number : number;
                },
            },
            navigation: {
                nextEl: userProjectsSlider.parentNode.querySelector('.swiper-navigation > .swiper-button-next'),
                prevEl: userProjectsSlider.parentNode.querySelector('.swiper-navigation > .swiper-button-prev'),
            },
            breakpoints: {
                768: {
                    spaceBetween: 0,
                },
                0: {
                    spaceBetween: 35,
                }
            }
        })
    }

    if (faqSlider) {
        const myFaqSlider = new Swiper(faqSlider, {
            slidesPerView: 1,
            loop: true,
            speed: 1000,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                formatFractionCurrent: function(number) {
                    return number < 10 ? number = '0' + number : number;
                },
                formatFractionTotal: function(number) {
                    return number < 10 ? number = '0' + number : number;
                },
            },
            navigation: {
                nextEl: faqSlider.parentNode.querySelector('.swiper-navigation > .swiper-button-next'),
                prevEl: faqSlider.parentNode.querySelector('.swiper-navigation > .swiper-button-prev'),
            },
            breakpoints: {
                768: {
                    spaceBetween: 0,
                },
                0: {
                    spaceBetween: 35,
                }
            }
        })
    }

    if (productsSlider) {
        const myProductsSlider = new Swiper(productsSlider, {
            slidesPerView: 1,
            loop: true,
            speed: 1000,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                formatFractionCurrent: function(number) {
                    return number < 10 ? number = '0' + number : number;
                },
                formatFractionTotal: function(number) {
                    return number < 10 ? number = '0' + number : number;
                },
            },
            navigation: {
                nextEl: productsSlider.parentNode.querySelector('.swiper-navigation > .swiper-button-next'),
                prevEl: productsSlider.parentNode.querySelector('.swiper-navigation > .swiper-button-prev'),
            },
            breakpoints: {
                768: {
                    spaceBetween: 0,
                },
                0: {
                    spaceBetween: 35,
                }
            }
        })
    }
});