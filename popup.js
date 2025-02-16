document.addEventListener('DOMContentLoaded', () => {
    const startTracker = document.getElementById("startTracker");
    
    if (startTracker) {
        startTracker.addEventListener("change", (event) => {
            if (event.target.checked) { 
                document.body.style.transition = "background-color 1s";
                document.body.style.backgroundColor = "#000000"; 
                
                centeredText.style.color = "#ffffff";
                cen2.style.color = "#ffffff";
                
                document.body.style.width = "300px";
                document.body.style.height = "300px";
            } else {
                alert("Tracking stopped!");
                document.body.style.backgroundColor = "";

                centeredText.style.color = "";
                cen2.style.color = "";
                
                document.body.style.width = "300px";
                document.body.style.height = "300px";
            }
        });
    }
});