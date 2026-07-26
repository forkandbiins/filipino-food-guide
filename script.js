// =======================================
// Filipino Food Guide
// script.js
// =======================================

// Wait until the page has fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // These elements only exist on browse.html
    const dishContainer = document.getElementById("dishContainer");
    const searchInput = document.getElementById("searchInput");

    // If we're not on browse.html, stop here.
    if (!dishContainer || !searchInput) {
        return;
    }

    /**
     * Creates and displays dish cards.
     * @param {Array} dishList
     */
    function displayDishes(dishList) {

        dishContainer.innerHTML = "";

        if (dishList.length === 0) {
            dishContainer.innerHTML = `
                <p>No dishes found.</p>
            `;
            return;
        }

        dishList.forEach(dish => {

            const card = document.createElement("article");
            card.className = "dish-card";

            card.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}">

                <div class="dish-content">

                    <h3>${dish.name}</h3>

                    <p>${dish.description}</p>

                    <p><strong>Category:</strong> ${dish.category}</p>

                    <p><strong>Difficulty:</strong> ${dish.difficulty}</p>

                    <p><strong>Cook Time:</strong> ${dish.cookTime}</p>

                </div>
            `;

            dishContainer.appendChild(card);

        });

    }

    // Show every dish on page load
    displayDishes(dishes);

    // Search functionality
    searchInput.addEventListener("input", () => {

        const keyword = searchInput.value
            .toLowerCase()
            .trim();

        const filtered = dishes.filter(dish =>

            dish.name.toLowerCase().includes(keyword) ||

            dish.category.toLowerCase().includes(keyword) ||

            dish.description.toLowerCase().includes(keyword)

        );

        displayDishes(filtered);

    });

});