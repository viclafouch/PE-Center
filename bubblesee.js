class Bubblesee {
    
    static bind(selector, animation = null, custom = null) {
        var bubbles = document.querySelectorAll(selector);
        for (var i = bubbles.length - 1; i >= 0; i--) {
            new Bubblesee(bubbles[i], animation, custom);
        }
    }

    constructor(element, animation, custom) {
        this.element = element;

        if (animation !== null) {
            this.animation = animation.split(' ');
        } else {
            this.animation = animation;
        }

        if (custom) {
            this.custom = custom;
        }

        let bubbleTarget = this.element.getAttribute('data-bubble');
        
        if (bubbleTarget) {
            this.title = document.querySelector(bubbleTarget).innerHTML;
        } else {
            this.title = element.getAttribute('title');
        }

        this.whichTransitionEvent = this.whichTransitionEvent();

        this.bubblesee = null;
        this.element.addEventListener('mouseover', this.mouseOver.bind(this), false);
        this.element.addEventListener('mouseout', this.mouseOut.bind(this), false);
        this.element.addEventListener('focusin', this.mouseOver.bind(this), false);
        this.element.addEventListener('focusout', this.mouseOut.bind(this), false);
    }

    mouseOver() {
        let bubblesee = this.createBubble();
        let width = bubblesee.offsetWidth;
        let height = bubblesee.offsetHeight;
        let left = this.element.offsetWidth / 2 - width / 2 + this.element.getBoundingClientRect().left + document.documentElement.scrollLeft;
        var top = this.element.getBoundingClientRect().top - height - 15 + document.documentElement.scrollTop;
        if (top < 20) {
            top = this.element.getBoundingClientRect().top + height + 15 + document.documentElement.scrollTop;
            bubblesee.classList.add('bubblesee__bottom');
        }
        bubblesee.style.left = left + "px";
        bubblesee.style.top = top + "px";
        bubblesee.classList.add('bubblesee__visible');

        this.element.setAttribute('title', '');
    }

    mouseOut() {
        if (this.bubblesee !== null) {
            this.bubblesee.classList.remove('bubblesee__visible');
            this.bubblesee.addEventListener(this.whichTransitionEvent, () => {
                if (this.bubblesee !== null) {
                    this.element.setAttribute('title', this.title);
                    document.body.removeChild(this.bubblesee);
                    this.bubblesee = null;
                }
            });
        }
    }

    whichTransitionEvent() {
        var t, el = document.createElement("div");

        var transitions = {
            "transition"      : "transitionend",
            "OTransition"     : "oTransitionEnd",
            "MozTransition"   : "transitionend",
            "WebkitTransition": "webkitTransitionEnd"
        }

        for (t in transitions){
            if (el.style[t] !== undefined){
                return transitions[t];
            }
        }
    }

    newId() {
        return (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
    }

    createBubble() {
        if (this.bubblesee === null) {
            let bubble = document.createElement('div');
            bubble.innerHTML = this.title;
            bubble.classList.add('bubblesee');
            this.id = this.newId();
            bubble.setAttribute('data-bubblesee', this.newId());
            document.body.appendChild(bubble);
            this.bubblesee = bubble;

            if (this.animation !== null) {
                this.animation.forEach( function(element, index) {
                    bubble.classList.add('bubblesee__'+element);
                });
            }

            if (this.custom) {
                bubble.classList.add(this.custom);
            }
        }
        return this.bubblesee;
    }  
}