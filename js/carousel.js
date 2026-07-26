document.addEventListener("DOMContentLoaded", () => {

    const carouselTrack = document.getElementById("carouselTrack");
    const carouselDots = document.getElementById("carouselDots");

    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");


    // Stop if this page does not have a carousel
    if (!carouselTrack) {
        return;
    }


    // Get only dishes marked as featured
    const featuredDishes = dishes.filter(
        dish => dish.featured === true
    );


    let currentSlide = 0;


    // Create slides
    featuredDishes.forEach((dish, index) => {

        const slide = document.createElement("div");

        slide.className = "slide";


        slide.innerHTML = `

            <img src="${dish.image}" alt="${dish.name}">

            <div class="slide-title">
                ${dish.name}
            </div>

        `;


        if (index === 0) {
            slide.classList.add("active");
        }


        carouselTrack.appendChild(slide);



        // Create dots

        const dot = document.createElement("span");

        dot.className = "dot";


        if (index === 0) {
            dot.classList.add("active");
        }


        dot.addEventListener("click", () => {

            showSlide(index);

        });


        carouselDots.appendChild(dot);

    });



    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");



    function showSlide(index) {


        // Loop back if needed

        if (index >= slides.length) {
            currentSlide = 0;
        }

        else if (index < 0) {
            currentSlide = slides.length - 1;
        }

        else {
            currentSlide = index;
        }



        slides.forEach(slide => {

            slide.classList.remove("active");

        });



        dots.forEach(dot => {

            dot.classList.remove("active");

        });



        slides[currentSlide]
            .classList.add("active");


        dots[currentSlide]
            .classList.add("active");

    }



    nextBtn.addEventListener("click", () => {

        showSlide(currentSlide + 1);

    });



    prevBtn.addEventListener("click", () => {

        showSlide(currentSlide - 1);

    });



    // Automatic slideshow

    setInterval(() => {

        showSlide(currentSlide + 1);

    }, 5000);


});