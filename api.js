const allFoodsHere = document.getElementById('foods');
const searchBtn = document.getElementById('searchBtn');
const message = document.getElementById('message');
const details = document.getElementById('details');


searchBtn.addEventListener('click', function () {
    const keyword = document.getElementById('keyword').value;
    document.getElementById('keyword').value = '';
    allFoodsHere.innerHTML = '';

    if (keyword === '') {
        const msg = document.getElementById('message');
        message.style.display = 'block';
        details.style.display = 'none';
    } else {
        getFoodDetails(keyword);
        message.style.display = 'none';
        details.style.display = 'none';
    }
})

function getFoodDetails(key) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
        .then(res => res.json())
        .then(data => { displayMeals(data) })
}
const displayMeals = meals => {
    const foods = meals.meals;
    const foodsDiv = document.getElementById('foods');
    foods.map(food => {
        const foodDiv = document.createElement('div');
        foodDiv.className = 'col-lg-3 col-md-4 pb-4';
        const foodInfo = `
            <div onclick = "displayCountryDetail('${food.idMeal}')">           
            <img src="${food.strMealThumb}" alt="">
            <h2>${food.strMeal}</h2>
            </div>
        `
        foodDiv.innerHTML = foodInfo;
        foodsDiv.appendChild(foodDiv);
    })

}



const displayCountryDetail = name => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
        })
}
const renderFoodInfo = food => {
    allFoodsHere.innerHTML = '';
    details.style.display = 'block';

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        ingredients.push(`${food[`strIngredient${i}`]}`);

    }

    const detailsDiv = document.getElementById('details');
    detailsDiv.innerHTML = `
            <div class="details-container">
                <img src="${food.strMealThumb}" alt="">
                <h4>${food.strMeal}</h4>
                <h5>Ingredients</h5>
                <ul class="mb-0">
                    ${ingredients.map((ingredient) => `
                        <li><i class="fa fa-check-square"></i>${ingredient}</li>
                    `)}
                </ul>
            </div>
        `
}

