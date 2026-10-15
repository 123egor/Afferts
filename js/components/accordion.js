const accordionBtn = document.querySelectorAll('.accordion__btn');

accordionBtn.forEach(function (btn) {
    btn.addEventListener('click', function (e) {

        accordionBtn.forEach(function (otherBtn) {
            if (otherBtn !== btn) {
                otherBtn.classList.remove('accordion__btn--active');
            }
        });
        btn.classList.toggle("accordion__btn--active")
    });
});