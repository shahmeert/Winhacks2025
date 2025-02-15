const forbiddenUrls = [
    "https://www.netflix.*/*", "https://www.primevideo.*/*", "https://www.youtube.*/*", "https://www.hulu.*/*",
    "https://www.disneyplus.*/*", "https://www.crunchyroll.*/*", "https://www.twitch.*/*", "https://www.facebook.*/*",
    "https://www.instagram.*/*", "https://www.snapchat.*/*", "https://x.*/*", "https://www.tiktok.*/*",
    "https://www.pinterest.*/*", "https://www.reddit.*/*", "https://www.whatsapp.*/*", "https://www.messenger.*/*",
    "https://web.whatsapp.*/*", "https://www.discord.*/*", "https://www.skype.*/*", "https://www.steampowered.*/*",
    "https://www.epicgames.*/*", "https://www.roblox.*/*", "https://www.reddit.*/*", "https://www.nytimes.*/*"
];

function checkForbiddenTabs() {
    chrome.storage.sync.get(["blockingEnabled"], (result) => {
        if (!result.blockingEnabled) return; 

        chrome.tabs.query({}, (tabs) => { 
            tabs.forEach((tab) => {
                forbiddenUrls.some((urlPattern) => {
                    const regex = new RegExp(urlPattern);
                    if (regex.test(tab.url)) {
                        if (!tab.url.includes("focus.html")) {
                            chrome.notifications.create({
                                type: "basic",
                                iconUrl: "icon.png", 
                                title: "Focus Mode Activated!",
                                message: "This tab is a distraction. Redirecting...",
                            });

                            chrome.tabs.update(tab.id, { url: "focus.html" }); 
                        }
                    }
                });
            });
        });
    });
}


chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.action === "closeTab" && sender.tab) {
        chrome.tabs.remove(sender.tab.id);
    }
});

chrome.tabs.onCreated.addListener(checkForbiddenTabs);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
        checkForbiddenTabs();
    }
});
