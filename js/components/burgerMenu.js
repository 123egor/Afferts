const mainMenuEl = document.querySelector(".main-menu")
const catalogBtnEL = document.querySelector(".header__catalog-btn")
const menuCloseBtnEl = document.querySelector(".main-menu__close")

catalogBtnEL.addEventListener('click', function (e) {
    mainMenuEl.classList.add("main-menu--active")
});
menuCloseBtnEl.addEventListener('click', function (e) {
    mainMenuEl.classList.remove("main-menu--active")
});