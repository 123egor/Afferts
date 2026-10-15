const locationCityBtn = document.querySelector(".location__city");
const locationCityName = document.querySelector(".location__city-name");
const locationSublinks = document.querySelectorAll(".location__sublink");

locationCityBtn.addEventListener('click', function (e) {
    locationCityBtn.classList.toggle("location__city--active")
});

locationSublinks.forEach(function (locationSublink) {
    locationSublink.addEventListener('click', function (e) {
        locationCityName.textContent = locationSublink.textContent
        locationCityBtn.classList.remove("location__city--active")
    });
});
