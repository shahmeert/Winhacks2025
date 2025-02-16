document.addEventListener('DOMContentLoaded', () => {
    const startTracker = document.getElementById("startTracker");

    // ✅ Load saved toggle state when the popup opens
    chrome.storage.local.get(["trackerEnabled"], (result) => {
        if (result.trackerEnabled) {
            startTracker.checked = true; // ✅ Restores toggle state
            document.body.style.backgroundColor = "#000000"; // ✅ Keeps dark mode active
        } else {
            startTracker.checked = false; // ✅ Ensures switch is off if no saved state
            document.body.style.backgroundColor = "";
        }
    });

    if (startTracker) {
        startTracker.addEventListener("change", (event) => {
            const isChecked = event.target.checked;

            // ✅ Save toggle state in Chrome Storage
            chrome.storage.local.set({ trackerEnabled: isChecked });

            if (isChecked) { 
                document.body.style.transition = "background-color 1s";
                document.body.style.backgroundColor = "#000000"; 
                
                if (typeof centeredText !== 'undefined' && centeredText) centeredText.style.color = "#ffffff";
                if (typeof cen2 !== 'undefined' && cen2) cen2.style.color = "#ffffff";
                
                document.body.style.width = "300px";
                document.body.style.height = "300px";
            } else {
                alert("Tracking stopped!");
                document.body.style.backgroundColor = "";

                if (typeof centeredText !== 'undefined' && centeredText) centeredText.style.color = ""; 
                if (typeof cen2 !== 'undefined' && cen2) cen2.style.color = "";
                
                document.body.style.width = "300px";
                document.body.style.height = "300px";
            }
        });
    }
});