'use strict';

const elementToggleFunc = elem => elem.classList.toggle("active");

// Sidebar toggle
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// Testimonials Modal
const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = () => {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
};

testimonialsItem.forEach(item => {
    item.addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    });
});

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

// Filter Section
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

select.addEventListener('click', () => elementToggleFunc(select));

selectItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedValue = item.innerText.toLowerCase();
        selectValue.innerText = item.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
});

const filterFunc = selectedValue => {
    filterItems.forEach(item => {
        item.classList.toggle('active', selectedValue === 'all' || selectedValue === item.dataset.category);
    });
};

let lastClickedBtn = filterBtn[0];

filterBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        const selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;
    });
});

// Contact Form
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

formInputs.forEach(input => {
    input.addEventListener('input', () => {
        formBtn.toggleAttribute('disabled', !form.checkValidity());
    });
});

// Page Navigation
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
        pages.forEach(page => {
            const isActive = link.innerHTML.toLowerCase() === page.dataset.page;
            page.classList.toggle('active', isActive);
        });

        navigationLinks.forEach((nav, navIndex) => {
            nav.classList.toggle('active', navIndex === index);
        });

        window.scrollTo(0, 0);
    });
});
