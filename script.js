// =========================================
// 1. SELECT HTML ELEMENTS
// =========================================

// Get the mobile navigation menu.
const navMenu = document.getElementById("nav-menu");

// Get the mobile menu button.
const menuButton = document.getElementById("menu-button");

// Get all navigation links.
const navLinks = document.querySelectorAll(".nav-link");

// Get the theme change button.
const themeButton = document.getElementById("theme-button");

// Get the back-to-top button.
const backToTop = document.getElementById("back-to-top");


// =========================================
// 2. MOBILE NAVIGATION MENU
// =========================================

// Open or close the menu when clicked.
menuButton.addEventListener("click", function () {

    // Toggle the menu visibility.
    navMenu.classList.toggle("show-menu");

    // Check whether the menu is open.
    const menuIsOpen = navMenu.classList.contains("show-menu");

    // Update the accessibility status.
    menuButton.setAttribute("aria-expanded", menuIsOpen);

    // Change the menu icon.
    if (menuIsOpen) {
        menuButton.innerHTML = '<i class="ri-close-line"></i>';
    } else {
        menuButton.innerHTML = '<i class="ri-menu-line"></i>';
    }

});


// =========================================
// 3. CLOSE MENU AFTER CLICKING A LINK
// =========================================

// Close the mobile menu after clicking a link.
navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        // Hide the menu.
        navMenu.classList.remove("show-menu");

        // Reset the button state.
        menuButton.setAttribute("aria-expanded", "false");

        // Restore the menu icon.
        menuButton.innerHTML = '<i class="ri-menu-line"></i>';

    });

});


// =========================================
// 4. DARK AND LIGHT THEME
// =========================================

// Change the theme when the button is clicked.
themeButton.addEventListener("click", function () {

    // Toggle dark mode on the body.
    document.body.classList.toggle("dark-theme");

    // Check whether dark mode is active.
    const darkModeIsActive =
        document.body.classList.contains("dark-theme");

    // Display the appropriate icon.
    if (darkModeIsActive) {

        themeButton.innerHTML = '<i class="ri-sun-line"></i>';
        themeButton.setAttribute("aria-label", "Switch to light theme");

    } else {

        themeButton.innerHTML = '<i class="ri-moon-line"></i>';
        themeButton.setAttribute("aria-label", "Switch to dark theme");

    }

});


// =========================================
// 5. UPDATE COPYRIGHT YEAR
// =========================================

// Get the year element from the footer.
const yearElement = document.getElementById("year");

// Display the current year automatically.
yearElement.textContent = new Date().getFullYear();


// =========================================
// 6. BACK-TO-TOP BUTTON
// =========================================

// Check the page position while scrolling.
window.addEventListener("scroll", function () {

    // Show the button after scrolling down.
    if (window.scrollY > 350) {

        backToTop.classList.add("show-back-to-top");

    } else {

        backToTop.classList.remove("show-back-to-top");

    }

});


// =========================================
// 7. REVEAL ELEMENTS ON SCROLL
// =========================================

// Select all elements with the reveal class.
const revealElements = document.querySelectorAll(".reveal");

// Check whether IntersectionObserver is supported.
if ("IntersectionObserver" in window) {

    // Create an observer for the reveal animation.
    const revealObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                // Reveal the element when it enters the screen.
                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    // Stop observing after revealing it.
                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );

    // Observe each reveal element.
    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    // Show all elements in older browsers.
    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}


// =========================================
// 8. HIGHLIGHT ACTIVE NAVIGATION LINK
// =========================================

// Select all sections inside the main element.
const pageSections = document.querySelectorAll("main section[id]");

// Update the active link while scrolling.
window.addEventListener("scroll", function () {

    let currentSection = "";

    // Find the section currently being viewed.
    pageSections.forEach(function (section) {

        const sectionTop = section.offsetTop - 130;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });

    // Update the navigation link.
    navLinks.forEach(function (link) {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === "#" + currentSection) {

            link.classList.add("active-link");

        }

    });

});


// =========================================
// 9. CONTACT FORM DEMO
// =========================================

// Get the contact form and message element.
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

// Handle form submission.
contactForm.addEventListener("submit", function (event) {

    // Prevent the page from reloading.
    event.preventDefault();

    // Read the visitor's information.
    const visitorName = document.getElementById("name").value.trim();
    const visitorEmail = document.getElementById("email").value.trim();
    const visitorMessage = document.getElementById("message").value.trim();

    // Check that all fields are filled.
    if (
        visitorName === "" ||
        visitorEmail === "" ||
        visitorMessage === ""
    ) {

        formMessage.textContent = "Please fill in all the fields.";

        return;

    }

    // Display a confirmation message.
    // This demo does not send an actual email.
    formMessage.textContent =
        "Thanks, " + visitorName +
        "! The demo form was submitted successfully.";

    // Clear the form fields.
    contactForm.reset();

});