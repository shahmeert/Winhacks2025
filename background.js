const forbiddenUrls = [
    "https://www.netflix.*/*", "https://www.primevideo.*/*", "https://www.youtube.*/*", "https://www.hulu.*/*",
    "https://www.disneyplus.*/*", "https://www.crunchyroll.*/*", "https://www.twitch.*/*", "https://www.facebook.*/*",
    "https://www.instagram.*/*", "https://www.snapchat.*/*", "https://www.twitter.*/*", "https://www.tiktok.*/*",
    "https://www.pinterest.*/*", "https://www.reddit.*/*", "https://www.whatsapp.*/*", "https://www.messenger.*/*",
    "https://web.whatsapp.*/*", "https://www.discord.*/*", "https://www.skype.*/*", "https://www.steampowered.*/*",
    "https://www.epicgames.*/*", "https://www.roblox.*/*",  "https://www.reddit.*/*",
    "https://www.nytimes.*/*"
];
function checkForbiddenTabs() {
    chrome.storage.local.get(["focusMode"], (data) => {
        if (data.focusMode) { 
            chrome.tabs.query({}, (tabs) => {
                tabs.forEach((tab) => {
                    forbiddenUrls.some((urlPattern) => {
                        const regex = new RegExp("^" + urlPattern.replace(/\*/g, ".*"));
                        if (regex.test(tab.url) && !tab.url.includes("focus.html")) {
                            chrome.notifications.create({
                                type: "basic",
                                iconUrl: "icon.png",
                                title: "Focus Mode Activated!",
                                message: "This tab is a distraction. Redirecting..."
                            });

                            chrome.tabs.update(tab.id, { url: "focus.html" });
                            return true;
                        }
                        return false;
                    });
                });
            });
        }
    });
}

chrome.tabs.onCreated.addListener(checkForbiddenTabs);
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        checkForbiddenTabs();
    }
});