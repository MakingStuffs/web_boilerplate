import sliderCss from './assets/sass/slider.ce.scss';
import slideCss from './assets/sass/slide.ce.scss';

class MsHeroSlider extends HTMLElement {
    static get observedAttributes() {
        return ['active-slide'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue !== newValue) {
            return this[attr] = this.hasAttribute(attr);
        }
    }

    get activeSlide() {
        return this.hasAttribute('active-slide');
    }

    set activeSlide(slide) {
        return slide ?
            this.setAttribute('active-slide', slide) :
            this.setAttribute('active-slide', 0);
    }

    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        // Bind this to the interval function
        this.boundInterval = this.startInterval.bind(this);
        // Bind this to make indexes function
        this.boundIndexes = this.makeIndexes.bind(this);
    }

    async connectedCallback() {
        if (this.isConnected) {
            // Make style element
            const style = document.createElement('style');
            // Get the template and then its content
            const template = document.getElementById(this.getAttribute('template'));
            const content = document.importNode(template.content, true);
            // Apply CSS to the style element
            style.innerHTML = sliderCss.toString();
            // Append the template and style to the shadow root
            this.shadowRoot.append(style, content);
            // Assign all slides to a variable
            this.slides = this.shadowRoot.querySelectorAll('ms-hero-slide');
            // Set the active slide to the first
            this.activeSlide = 0;
            // Make index loaders
            await this.boundIndexes();
            // Start interval
            await this.boundInterval();
            // Activate the first slide 
            this.slides[0].setAttribute('active', '');
            // Check if the custom JS function exists and execute it
            import('./assets/js/custom')
            .then(module => {
                module.custom(this);
            })
            .catch(err => {
                if(err) return new Error(err);
            });
        }
    }

    disconnectedCallback() {
        clearInterval(this.interval);
    }

    startInterval() {
        let loaders = this.shadowRoot.querySelectorAll('.loader');
        setTimeout(() => loaders[0].setAttribute('active', ''), 100);
        this.interval = setInterval(() => {
            let activeIndex = parseInt(this.getAttribute('active-slide'));
            let activeSlide = this.slides[activeIndex];
            let nextIndex = activeIndex === this.slides.length - 1 ? 0 : activeIndex + 1;
            let nextSlide = this.slides[nextIndex];
            loaders[activeIndex].removeAttribute('active');
            loaders[nextIndex].setAttribute('active', '');
            activeSlide.active = false;
            nextSlide.active = true;
            this.activeSlide = nextIndex;
        }, 10000);
    }

    makeIndexes() {
        const container = document.createElement('div');
        const wrapper = this.shadowRoot.querySelector('.wrapper');
        container.classList = 'loader-wrapper';
        for(let i = 0; i < this.slides.length; i++) {
            let span = document.createElement('span');
            span.classList = 'loader';
            span.dataset.index = i;
            container.appendChild(span);
        }
        wrapper.appendChild(container);
    }
}

class MsHeroSlide extends MsHeroSlider {
    static get observedAttributes() {
        return ['active'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (oldValue !== newValue) {
            return this[attr] === this.hasAttribute(attr);
        }
    }

    get active() {
        return this.hasAttribute('active');
    }

    set active(isActive) {
        if (isActive) {
            this.setAttribute('active', '');
        } else {
            this.removeAttribute('active');
        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.isConnected) {
            // Make style element
            const style = document.createElement('style');
            // Get the template and then its content
            const template = document.getElementById(this.getAttribute('template'));
            // Make a contents div and set the class
            const contentDiv = document.createElement('div');
            contentDiv.classList.add('content');
            // Make a wrapper div and set the class
            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper');

            let content;
            if(template) {
                content = document.importNode(template.content, true);
                // Append template content to content div;
                contentDiv.appendChild(content);
            }
            // Append content div to wrapper
            wrapper.appendChild(contentDiv);
            // Get bg-img attribute
            const bgImg = this.getAttribute('bg-img');
            // Apply CSS to the style element
            style.innerHTML = slideCss.toString();
            // Append it 
            this.shadowRoot.append(style, wrapper);
            // Check if there is a bg-img specified
            if(bgImg) {
                // If there is, set the bg image of this slide
                wrapper.style.backgroundImage = `url('${bgImg}')`;
            }
        }
    }

    disconnectedCallback() {

    }
}
customElements.define('ms-hero-slider', MsHeroSlider);
customElements.define('ms-hero-slide', MsHeroSlide);