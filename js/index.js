function createDiv(className) {
    var div = document.createElement("div");
    var classNames = className.split(" ");
    classNames.forEach((name) => div.classList.add(name));
    return div;
}
function navigationAchievement(slider) {
    let wrapper, dots, arrowLeft, arrowRight;

    function markup(remove) {
        wrapperMarkup(remove);
        dotMarkup(remove);
        arrowMarkup(remove);
    }

    function removeElement(elment) {
        elment.parentNode.removeChild(elment);
    }

    function arrowMarkup(remove) {
        if (remove) {
            removeElement(arrowLeft);
            removeElement(arrowRight);
            return;
        }
        arrowLeft = createDiv("arrow arrow--left");
        arrowLeft.addEventListener("click", () => slider.prev());
        arrowRight = createDiv("arrow arrow--right");
        arrowRight.addEventListener("click", () => slider.next());

        wrapper.appendChild(arrowLeft);
        wrapper.appendChild(arrowRight);
    }

    function wrapperMarkup(remove) {
        if (remove) {
            var parent = wrapper.parentNode;
            while (wrapper.firstChild)
                parent.insertBefore(wrapper.firstChild, wrapper);
            removeElement(wrapper);
            return;
        }
        wrapper = createDiv("navigation-wrapper");
        slider.container.parentNode.appendChild(wrapper);
        wrapper.appendChild(slider.container);
    }

    function dotMarkup(remove) {
        if (remove) {
            removeElement(dots);
            return;
        }
        dots = createDiv("dots");
        slider.track.details.slides.forEach((_e, idx) => {
            var dot = createDiv("dot");
            dot.addEventListener("click", () => slider.moveToIdx(idx));
            dots.appendChild(dot);
        });

        wrapper.appendChild(dots);
    }

    function updateClasses() {
        var slide = slider.track.details.rel;
        slide === 0
            ? arrowLeft.classList.add("arrow--disabled")
            : arrowLeft.classList.remove("arrow--disabled");

        slide === slider.track.details.slides.length - 1
            ? arrowRight.classList.add("arrow--disabled")
            : arrowRight.classList.remove("arrow--disabled");

        Array.from(dots.children).forEach(function (dot, idx) {
            idx === slide
                ? dot.classList.add("dot--active")
                : dot.classList.remove("dot--active");
        });
    }

    slider.on("created", () => {
        markup();
        updateClasses();
    });
    slider.on("optionsChanged", () => {
        markup(true);
        markup();
        updateClasses();
    });
    slider.on("slideChanged", () => {
        updateClasses();
    });
    slider.on("destroyed", () => {
        markup(true);
    });
}

function gallaryArrowsInit(slider) {
    const leftArrow = document.getElementById("gallary-left-arrow");
    const rightArrow = document.getElementById("gallary-right-arrow");

    leftArrow.addEventListener("click", () => slider.prev());
    rightArrow.addEventListener("click", () => slider.next());
}

function featuredArrowsInit(slider) {
    const leftArrow = document.getElementById("featured-left-arrow");
    const rightArrow = document.getElementById("featured-right-arrow");

    leftArrow.addEventListener("click", () => slider.prev());
    rightArrow.addEventListener("click", () => slider.next());
}

const achievementCarousel = new KeenSlider(
    "#achievement-carousel",
    {
        loop: true,
        breakpoints: {
            "(min-width: 500px)": {
                slides: { perView: 2, spacing: 5 },
            },
            "(min-width: 1000px)": {
                slides: { perView: 3, spacing: 10 },
            },
        },
        slides: { perView: 1 },
    },
    [navigationAchievement]
);

let gallaryCarousel = new KeenSlider("#gallary-carousel", {
    loop: true,
    mode: "snap",
    rtl: false,
    slides: { perView: "auto", spacing: 16 },
});

gallaryArrowsInit(gallaryCarousel);

function addDots(slider, wrapperSelector) {
    const dots = createDiv("dots");
    const wrapper = document.querySelector(wrapperSelector);
    wrapper.appendChild(dots);

    slider.track.details.slides.forEach((_e, idx) => {
        var dot = createDiv("dot");
        if (idx === 0) dot.classList.add("dot--active");
        dot.addEventListener("click", () => slider.moveToIdx(idx));
        dots.appendChild(dot);
    });

    function updateClasses() {
        let slide = slider.track.details.rel;
        Array.from(dots.children).forEach(function (dot, idx) {
            idx === slide
                ? dot.classList.add("dot--active")
                : dot.classList.remove("dot--active");
        });
    }

    slider.on("created", () => {
        updateClasses();
    });
    slider.on("optionsChanged", () => {
        updateClasses();
    });
    slider.on("slideChanged", () => {
        updateClasses();
    });
}


document.addEventListener('DOMContentLoaded', function () {
    emailjs.init('kGEGbK2SHgEUBR0c2');

    document.getElementById('contactForm').addEventListener('submit', function (event) {
        event.preventDefault();

        emailjs.sendForm('service_gf00ax5', 'template_53izycp', this)
            .then(function () {
                alert('Message sent successfully!');
            }, function (error) {
                alert('Failed to send message. Please try again later.');
                console.log('FAILED...', error);
            });
    });
});


const featuredSlider = new KeenSlider("#featured-carousel", {
    loop: true,
    slides: { perView: "auto", spacing: 16 },
});

featuredArrowsInit(featuredSlider);
addDots(featuredSlider, ".featured-dots-wrapper");
addDots(gallaryCarousel, ".gallary-dots-header");
