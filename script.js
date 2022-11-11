// Begin: handle slider
const slider__list = document.querySelector(".slider__list")
const slider__items = document.querySelectorAll('.slider__item')
const slider_control_circle_items = document.querySelectorAll(".slider_control-circle-item")
let transformUnit = -100;
let index_slider__item = 1 //(count from 0)
// auto slide
let intervalSlide = setInterval(
    function () {
        handleNextSlide()
    }, 5000)

function handleNextSlide() {
    const slider_control_circle_item__active = document.querySelector(".slider_control-circle-item--active")
    if (slider_control_circle_item__active) {
        slider_control_circle_item__active.classList.remove("slider_control-circle-item--active")
    }
    if (index_slider__item === slider_control_circle_items.length) {
        slider_control_circle_items[0].classList.add("slider_control-circle-item--active")
    }
    else {
        slider_control_circle_items[index_slider__item].classList.add("slider_control-circle-item--active")
    }

    transformUnit = transformUnit - 100
    slider__list.style.transition = 'transform .5s linear'
    slider__list.style.transform = `translateX(${transformUnit}%)`
    index_slider__item++;
    if (index_slider__item === slider__items.length - 1) {
        slider_control_item_right.onclick = null;

        setTimeout(function () {
            index_slider__item = 1
            transformUnit = -100;
            slider__list.style.transform = `translateX(${transformUnit}%)`
            slider__list.style.transition = 'transform 0s linear'

            slider_control_item_right.onclick = function () {
                clearInterval(intervalSlide)
                handleNextSlide()
                intervalSlide = setInterval(
                    function () {
                        handleNextSlide()
                    }, 5000)
            }
        }, 500)
    }
}

function handlePrevSlide() {
    const slider_control_circle_item__active = document.querySelector(".slider_control-circle-item--active")
    if (slider_control_circle_item__active) {
        slider_control_circle_item__active.classList.remove("slider_control-circle-item--active")
    }
    if (index_slider__item - 2 === -1) {
        slider_control_circle_items[slider_control_circle_items.length - 1].classList.add("slider_control-circle-item--active")
    }
    else {
        slider_control_circle_items[index_slider__item - 2].classList.add("slider_control-circle-item--active")
    }

    transformUnit = transformUnit + 100
    slider__list.style.transition = 'transform .5s linear'
    slider__list.style.transform = `translateX(${transformUnit}%)`
    index_slider__item--;

    if (index_slider__item === 0) {
        slider_control_item_left.onclick = null;

        setTimeout(function () {
            index_slider__item = slider__items.length - 2
            transformUnit = index_slider__item * -100;
            slider__list.style.transform = `translateX(${transformUnit}%)`
            slider__list.style.transition = 'transform 0s linear'

            slider_control_item_left.onclick = function () {
                clearInterval(intervalSlide)
                handlePrevSlide()
                intervalSlide = setInterval(
                    function () {
                        handleNextSlide()
                    }, 5000)
            }
        }, 500)
    }
}

// next, prev slide
const slider_control_item_left = document.querySelector(".slider_control-item-left")
slider_control_item_left.onclick = function () {
    clearInterval(intervalSlide)
    handlePrevSlide()
    intervalSlide = setInterval(
        function () {
            handleNextSlide()
        }, 5000)
}
const slider_control_item_right = document.querySelector(".slider_control-item-right")
slider_control_item_right.onclick = function () {
    clearInterval(intervalSlide)
    handleNextSlide()
    intervalSlide = setInterval(
        function () {
            handleNextSlide()
        }, 5000)
}
// click to circle to change slider
slider_control_circle_items.forEach(function (slider_control_circle_item, index) {
    index++;
    slider_control_circle_item.onclick = function () {
        const slider_control_circle_item__active = document.querySelector(".slider_control-circle-item--active")
        slider_control_circle_item__active.classList.remove("slider_control-circle-item--active")
        slider_control_circle_item.classList.add("slider_control-circle-item--active")
        index_slider__item = index

        clearInterval(intervalSlide)
        transformUnit = index * -100;
        slider__list.style.transition = 'transform 0.5s linear'
        slider__list.style.transform = `translateX(${transformUnit}%)`
        intervalSlide = setInterval(
            function () {
                handleNextSlide()
            }, 5000)

    }
})


// End: handle slider

// scroll event
const skill = document.querySelector(".skill")
const skill__item_progresses = document.querySelectorAll(".skill__item-progress")
const viewportHeight = document.documentElement.clientHeight
const sidenav = document.querySelector(".sidenav")
window.onscroll = function () {
    // handle skill animation
    let rect = skill.getBoundingClientRect();
    let top = rect.top

    if (top < viewportHeight) {
        skill__item_progresses.forEach(function (skill__item_progress) {
            skill__item_progress.style.animation = "scaleSkillItem 1s ease-out forwards"
        })
    }
    else {
        skill__item_progresses.forEach(function (skill__item_progress) {
            skill__item_progress.style.animation = "none"
        })
    }
    
    // handle position for sidenav
    rect = sidenav.getBoundingClientRect();
    top = rect.top
    if (top <= 0) {
        sidenav.style.position = "sticky"
        sidenav.style.top = "24px"
    }
    else if (top <= 24 && sidenav.style.position === "sticky") {
        sidenav.style.position = "sticky"
        sidenav.style.top = "24px"
    }
    else {
        sidenav.style.position = null
        sidenav.style.top = null
    }
    // handle scale sidenav on tablet
    if (top < 0 && Math.abs(top) > sidenav.clientHeight) {
        console.log("True")
        sidenav.style.animation = "none"
    }
    else {
        console.log("False")
        sidenav.style.animation = "scaleSidenavTablet .5s linear"
    }
}

// handle click .sidenav_list-item-link
const sidenav_list_item_links = document.querySelectorAll(".sidenav_list-item-link")
const content_items = document.querySelectorAll(".content-item")
const sidenav_list_items = document.querySelectorAll(".sidenav_list-item")
sidenav_list_item_links.forEach((sidenav_list_item_link, index) => {
    sidenav_list_item_link.onclick = function () {
        content_items.forEach(content_item => {
            content_item.style.display = "none"
        })
        const sidenav_list__item__active = document.querySelector(".sidenav_list-item--active")
        sidenav_list__item__active.classList.remove("sidenav_list-item--active")
        sidenav_list_items[index].classList.add("sidenav_list-item--active")
        content_items[index].style.display = "block"
    }
})

// load window
const overlay = document.querySelector(".overlay")
setTimeout(function () {
    overlay.style.opacity = 0
    setTimeout(function () {
        overlay.style.display = "none"
    }, 500)
}, 2000)


