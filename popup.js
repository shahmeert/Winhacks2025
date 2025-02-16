document.addEventListener('DOMContentLoaded', () => {
    const startTracker = document.getElementById("startTracker");
    if (startTracker) {
        startTracker.addEventListener("change", (event) => {
            if (event.target.checked) { 
                document.body.style.transition = "background-color 1s";
                document.body.style.backgroundColor = "#000000"; 
                document.body.style.width = "300px";
                document.body.style.height = "300px";
            } else {
                alert("Tracking stopped!");
                document.body.style.backgroundColor = "";
                document.body.style.width = "300px";
                document.body.style.height = "300px";
            }
        });
    }
});