
const cards = document.querySelectorAll(".project-card");

cards.forEach((card, index) => {
    card.style.animation = `slideUp 0.7s ease ${index * 0.2}s both`;
});

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        console.log("Navigating to:", link.textContent);
    });
});

function scrollInternships(direction) {
    const track = document.getElementById("internshipTrack");

    if (track) {
        const card = track.querySelector(".internship-slide");
        const gap = 22;
        const distance = card ? card.getBoundingClientRect().width + gap : 400;

        track.scrollBy({
            left: direction * distance,
            behavior: "smooth"
        });
    }
}

document.querySelectorAll(".certificate-card").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");

    card.addEventListener("click", () => {
        card.classList.toggle("is-selected");
    });

    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            card.classList.toggle("is-selected");
        }
    });
});
document.addEventListener("click", function (event) {
    const summary = event.target.closest(".skills-stash > summary");
    if (!summary) return;

    event.preventDefault();

    const details = summary.parentElement;
    details.open = !details.open;
});
