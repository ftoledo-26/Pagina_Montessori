document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".montessori-tarjeta");

    faqItems.forEach(item => {
        const question = item.querySelector(".pregunta");
        const answer = item.querySelector(".respuesta");
        const icon = item.querySelector(".icono");

        question.addEventListener("click", function() {
            const isOpen = answer.classList.contains("open");

            
            document.querySelectorAll(".respuesta").forEach(ans => {
                ans.classList.remove("open");
                ans.previousElementSibling.classList.remove("active");
                ans.previousElementSibling.querySelector(".icono").textContent = "▼";
            });

            
            if (!isOpen) {
                answer.classList.add("open");
                question.classList.add("active");
                
            }
        });
    });
});