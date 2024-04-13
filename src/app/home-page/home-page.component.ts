import { Component, OnInit, ElementRef } from '@angular/core';

declare const document: any;
declare const window: any;
declare const Waypoint: any;
declare const Isotope: any;
declare const Typed: any;
declare const AOS: any;
declare const GLightbox: any;
declare const Swiper: any;
declare const PureCounter: any;

@Component({
  selector: 'app-home-page',
  standalone:true,
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    //this.initializeScripts();
  }
/*
  private initializeScripts(): void {
    // Encapsulate existing code within this method
    (() => {
      "use strict";

      const select = (el: string, all = false): HTMLElement | NodeListOf<HTMLElement> => {
        el = el.trim();
        if (all) {
          return document.querySelectorAll(el);
        } else {
          return document.querySelector(el);
        }
      };

      const on = (type: string, el: string, listener: EventListenerOrEventListenerObject, options: any = {}): void => {
        const selectEl = select(el, options.all);

        if (selectEl) {
          if (options.all) {
            const elements = selectEl as NodeListOf<HTMLElement>;
            elements.forEach((e: HTMLElement) => e.addEventListener(type, listener, options));
          } else {
            const element = selectEl as HTMLElement;
            element.addEventListener(type, listener, options);
          }
        }
      };

      const onscroll = (el: HTMLElement, listener: EventListenerOrEventListenerObject): void => {
        el.addEventListener('scroll', listener);
      };

      // Move the initialization of navbarlinks outside of navbarlinksActive
      let navbarlinks: NodeListOf<HTMLElement> = select('#navbar .scrollto', true) as NodeListOf<HTMLElement>;

      const navbarlinksActive = (): void => {
        let position: number = window.scrollY + 200;
        navbarlinks.forEach((navbarlink: HTMLElement) => {
          const link = navbarlink as HTMLAnchorElement; // Type assertion
          if (!link.hash) return;
          let section: HTMLElement | null = select(link.hash) as HTMLElement;
          if (!section) return;
          if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
            navbarlink.classList.add('active');
          } else {
            navbarlink.classList.remove('active');
          }
        });
      };




      window.addEventListener('load', navbarlinksActive);
      onscroll(document, navbarlinksActive);

      const scrollto = (el: string): void => {
        let selectedElement = select(el);
        if (selectedElement instanceof HTMLElement) {
          let elementPos: number = selectedElement.offsetTop;
          window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
          });
        } else if (selectedElement instanceof NodeList && selectedElement.length > 0) {
          let elementPos: number = (selectedElement[0] as HTMLElement).offsetTop;
          window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
          });
        }
      };


      let backtotop: HTMLElement | null = select('.back-to-top') as HTMLElement;
      if (backtotop) {
        const toggleBacktotop = (): void => {
          if (window.scrollY > 100) {
            backtotop.classList.add('active');
          } else {
            backtotop.classList.remove('active');
          }
        };
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
      }

      on('click', '.mobile-nav-toggle', function(this: HTMLElement, e: Event): void {
        (select('body') as HTMLElement).classList.toggle('mobile-nav-active');
        this.classList.toggle('bi-list');
        this.classList.toggle('bi-x');
      });
      on('click', '.scrollto', function(this: HTMLAnchorElement, e: Event): void {
        if (select(this.hash)) {
          e.preventDefault();

          let body: HTMLElement = select('body') as HTMLElement;
          if (body.classList.contains('mobile-nav-active')) {
            body.classList.remove('mobile-nav-active');
            let navbarToggle: HTMLElement = select('.mobile-nav-toggle') as HTMLElement;
            navbarToggle.classList.toggle('bi-list');
            navbarToggle.classList.toggle('bi-x');
          }
          scrollto(this.hash);
        }
      }, { all: true });
      window.addEventListener('load', () => {
        if (window.location.hash) {
          if (select(window.location.hash)) {
            scrollto(window.location.hash);
          }
        }
      });

      const typed: HTMLElement | null = select('.typed') as HTMLElement;
      if (typed) {
        let typed_strings: string | null = typed.getAttribute('data-typed-items');
        if (typed_strings) {
          let typedStringsArray: string[] = typed_strings.split(',');
          new Typed('.typed', {
            strings: typedStringsArray,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
          });
        }
      }

      let skilsContent: HTMLElement | null = select('.skills-content') as HTMLElement;
      if (skilsContent) {
        new Waypoint({
          element: skilsContent,
          offset: '80%',
          handler: function (direction: string) {
            let progress: NodeListOf<HTMLElement> = select('.progress .progress-bar', true) as NodeListOf<HTMLElement>;
            progress.forEach((el: HTMLElement) => {
              el.style.width = el.getAttribute('aria-valuenow') + '%';
            });
          }
        });
      }

      window.addEventListener('load', function(event: Event) {
        let portfolioContainer: HTMLElement | null = select('.portfolio-container') as HTMLElement;
        if (portfolioContainer) {
          let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item'
          });

          let portfolioFilters: NodeListOf<HTMLElement> = select('#portfolio-flters li', true) as NodeListOf<HTMLElement>;

          const handleClick = function (e: Event) {
            e.preventDefault();
            portfolioFilters.forEach(function (el: HTMLElement) {
              el.classList.remove('filter-active');
            });
            const clickedElement = e.target as HTMLElement;
            clickedElement.classList.add('filter-active');

            portfolioIsotope.arrange({
              filter: clickedElement.getAttribute('data-filter')
            });
            portfolioIsotope.on('arrangeComplete', function () {
              AOS.refresh();
            });
          };

          on('click', '#portfolio-flters li', handleClick, true);
        }
      });


      const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
      });

      new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });

      new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },

          1200: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }
      });

      window.addEventListener('load', () => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      });

      new PureCounter();

    })();
  }
*/
}
