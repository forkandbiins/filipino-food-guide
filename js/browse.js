// =======================================
// Filipino Food Guide
// browse.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    const dishContainer = document.getElementById("dishContainer");
    const searchInput = document.getElementById("searchInput");
    const categoryFilters = document.querySelectorAll(".category-filter");
    const difficultyFilters = document.querySelectorAll(".difficulty-filter");
    const statusFilters = document.querySelectorAll(".status-filter");

    // Stop if we're not on browse.html
    if (!dishContainer || !searchInput) {
        return;
    }

    // ===============================
    // Display Dishes
    // ===============================
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

                    <span class="badge">
                        ${dish.learned ? "🟢 Learned" : "🟡 Want to Learn"}
                    </span>

                    <h3>${dish.name}</h3>

                    <p class="meta">
                        ${dish.category} • ${dish.difficulty}
                    </p>

                    <p>${dish.shortDescription}</p>

                    <a href="dish.html?id=${dish.id}" class="btn">
                        View Recipe
                    </a>

                </div>
            `;

            dishContainer.appendChild(card);

        });

    }

    function filterDishes() {

        const keyword = searchInput.value.toLowerCase().trim();

        const selectedCategories = [...categoryFilters]
            .filter(box => box.checked)
            .map(box => box.value);

        const selectedDifficulty = [...difficultyFilters]
            .filter(box => box.checked)
            .map(box => box.value);

        const selectedStatus = [...statusFilters]
            .filter(box => box.checked)
            .map(box => box.value);

        const filtered = dishes.filter(dish => {

            const matchesSearch =
                dish.name.toLowerCase().includes(keyword) ||
                dish.shortDescription.toLowerCase().includes(keyword);

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(dish.category);

            const matchesDifficulty =
                selectedDifficulty.length === 0 ||
                selectedDifficulty.includes(dish.difficulty);

            const status = dish.learned ? "learned" : "planned";

            const matchesStatus =
                selectedStatus.length === 0 ||
                selectedStatus.includes(status);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesDifficulty &&
                matchesStatus
            );

        });

        displayDishes(filtered);

    }

    // ===============================
    // Initial Display
    // ===============================
    displayDishes(dishes);

    // ===============================
    // Search
    // ===============================
    searchInput.addEventListener("input", () => {

        const keyword = searchInput.value
            .toLowerCase()
            .trim();

        const filtered = dishes.filter(dish =>

            dish.name.toLowerCase().includes(keyword) ||

            dish.category.toLowerCase().includes(keyword) ||

            dish.shortDescription.toLowerCase().includes(keyword)

        );

        displayDishes(filtered);

    });

});