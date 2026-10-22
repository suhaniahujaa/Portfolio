document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(
        ".reveal, section, .project-card, .certificate-card, .education-item"
    );

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach(item => {
        item.classList.add("reveal");
        revealObserver.observe(item);
    });

    document.querySelectorAll(".magnetic").forEach(button => {
        button.addEventListener("mousemove", event => {
            const rect = button.getBoundingClientRect();

            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });

    if (window.matchMedia("(pointer: fine)").matches) {
        let lastTrail = 0;

        document.addEventListener("mousemove", event => {
            const now = Date.now();

            if (now - lastTrail < 80) return;

            lastTrail = now;

            const particle = document.createElement("span");

            particle.className = "cursor-sparkle";
            particle.textContent = "✦";
            particle.style.left = `${event.clientX}px`;
            particle.style.top = `${event.clientY}px`;

            document.body.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 700);
        });
    }

    document.querySelectorAll(".floating-dock a").forEach(link => {
        link.addEventListener("click", () => {
            document.querySelectorAll(".floating-dock a").forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeSkill();
        }
    });
});

function showSkill(star) {
    const popup = document.getElementById("skillPopup");
    const title = document.getElementById("skillTitle");
    const text = document.getElementById("skillText");

    if (!popup || !title || !text) {
        alert("Popup HTML nahi mila");
        return;
    }

    title.textContent = star.dataset.skill;
    text.textContent = star.dataset.description;

    popup.style.display = "block";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.zIndex = "2147483647";

    popup.setAttribute("aria-hidden", "false");
}

function closeSkill() {
    const popup = document.getElementById("skillPopup");

    if (!popup) return;

    popup.style.display = "none";
    popup.setAttribute("aria-hidden", "true");
}