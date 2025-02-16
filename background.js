// ✅ Listen for messages from the popup to update tracking state
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "toggleTracking") {
        chrome.storage.local.set({ trackerEnabled: message.enabled });
    }
});

// ✅ Function to block sites when tracking is ON
function checkForbiddenTabs() {
    chrome.storage.local.get(["trackerEnabled"], (result) => {
        if (!result.trackerEnabled) return; // ✅ Stops blocking if tracking is OFF

        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                const forbiddenUrls = [
                    "https://www.netflix.*/*", "https://www.primevideo.*/*", "https://www.youtube.*/*", "https://www.hulu.*/*",
                    "https://www.disneyplus.*/*", "https://www.crunchyroll.*/*", "https://www.twitch.*/*", "https://www.facebook.*/*",
                    "https://www.instagram.*/*", "https://www.snapchat.*/*", "https://x.*/*", "https://www.tiktok.*/*",
                    "https://www.pinterest.*/*", "https://www.reddit.*/*", "https://www.whatsapp.*/*", "https://www.messenger.*/*",
                    "https://web.whatsapp.*/*", "https://www.discord.*/*", "https://www.skype.*/*", "https://www.steampowered.*/*",
                    "https://www.epicgames.*/*", "https://www.roblox.*/*", "https://www.nytimes.*/*"
                ];

                forbiddenUrls.some((urlPattern) => {
                    const regex = new RegExp(urlPattern.replace(/\*/g, ".*"));
                    if (regex.test(tab.url) && !tab.url.includes("focus.html")) {
                        chrome.notifications.create({
                            type: "basic",
                            iconUrl: "icon.png",
                            title: "Focus Mode Activated!",
                            message: "This tab is a distraction. It has been redirected.",
                        });
                        chrome.tabs.update(tab.id, { url: "focus.html" });
                    }
                });
            });
        });
    });
}

// ✅ Run checks when tabs are created or updated
chrome.tabs.onCreated.addListener(() => {
    checkForbiddenTabs();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === "complete") {
        checkForbiddenTabs();
    }
});
