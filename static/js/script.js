document.addEventListener("DOMContentLoaded", () => {
    const spoiler = document.getElementById("spoiler-container");
    const image = document.querySelector(".spoiler-img");
    const hide = document.querySelector(".hide");

    spoiler.addEventListener("click", (event) => {
        const rect = spoiler.getBoundingClientRect();
        const clickX = ((event.clientX - rect.left) / rect.width) * 100;
        const clickY = ((event.clientY - rect.top) / rect.height) * 100;
        hide.style.setProperty("--click-x", `${clickX}%`);
        hide.style.setProperty("--click-y", `${clickY}%`);
        image.classList.toggle("unblur");
        hide.classList.toggle("clicked");
        
    });

    function generateRandomKeyframes() {
        let keyframes = '';
        for (let i = 0; i <= 100; i += 20) {
            const randomX = Math.random() * 200 - 100;
            const randomY = Math.random() * 200 - 100;
            keyframes += `${i}% { transform: translate(${randomX}px, ${randomY}px); } `;
        }
        return keyframes;
    }

    function createDots() {
        for (let i = 0; i < 500; i++) {
            const dot = document.createElement("div");
            dot.className = "dot";

            dot.style.top = Math.random() * hide.offsetHeight + "px";
            dot.style.left = Math.random() * hide.offsetWidth + "px";

            const animationName = `moveDot${i}`;

            const keyframes = generateRandomKeyframes();

            const styleSheet = document.styleSheets[0];
            styleSheet.insertRule(`@keyframes ${animationName} { ${keyframes} }`, styleSheet.cssRules.length);

            dot.style.animation = `${animationName} ${2 + Math.random() * 3}s infinite ease-in-out`;

            hide.appendChild(dot);
        }
    }

    createDots();
});
