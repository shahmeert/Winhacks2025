document.addEventListener("DOMContentLoaded", () => {
    const startTracker = document.getElementById("startTracker");

    // ✅ Load saved toggle state from the background script
    chrome.storage.local.get(["trackerEnabled"], (result) => {
        startTracker.checked = result.trackerEnabled || false; // ✅ Default to OFF
    });

    if (startTracker) {
        startTracker.addEventListener("change", (event) => {
            const isChecked = event.target.checked;

            // ✅ Tell background script to update state
            chrome.runtime.sendMessage({ action: "toggleTracking", enabled: isChecked });
        });
    }
});
