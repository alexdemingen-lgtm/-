const menuButton = document.getElementById('menuButton');
const nav = document.getElementById('nav');

// Открываем и закрываем мобильное меню.
menuButton.addEventListener('click', function () {
    nav.classList.toggle('active');
});

// Закрываем меню после выбора раздела.
const navLinks = nav.querySelectorAll('a');

navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        nav.classList.remove('active');
    });
});

// Фильтр товаров по категориям.
const filterButtons = document.querySelectorAll('.filter-button');
const products = document.querySelectorAll('.product-card');
const emptyMessage = document.getElementById('emptyMessage');

filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const selectedCategory = button.dataset.filter;
        let visibleProducts = 0;

        filterButtons.forEach(function (item) {
            item.classList.remove('active');
        });

        button.classList.add('active');

        products.forEach(function (product) {
            const category = product.dataset.category;

            const shouldShow =
                selectedCategory === 'all' ||
                selectedCategory === category;

            product.classList.toggle('hidden', !shouldShow);

            if (shouldShow) {
                visibleProducts++;
            }
        });

        if (visibleProducts === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
        }
    });
});