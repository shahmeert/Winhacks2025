const forbiddenUrls = [
    "https://www.netflix.*/*", "https://www.primevideo.*/*", "https://www.youtube.*/*", "https://www.hulu.*/*",
    "https://www.disneyplus.*/*", "https://www.crunchyroll.*/*", "https://www.twitch.*/*", "https://www.facebook.*/*",
    "https://www.instagram.*/*", "https://www.snapchat.*/*", "https://x.*/*", "https://www.tiktok.*/*",
    "https://www.pinterest.*/*", "https://www.reddit.*/*", "https://www.whatsapp.*/*", "https://www.messenger.*/*",
    "https://web.whatsapp.*/*", "https://www.discord.*/*", "https://www.skype.*/*", "https://www.steampowered.*/*",
    "https://www.epicgames.*/*", "https://www.roblox.*/*", "https://www.nytimes.*/*"
];

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

function checkForbiddenTabs() {
    const startTracker = document.getElementById("startTracker");
    if (!startTracker || !startTracker.checked) return;
    chrome.tabs.query({}, (tabs) => { 
        tabs.forEach((tab) => {
            forbiddenUrls.some((urlPattern) => {
                const regex = new RegExp(urlPattern);
                if (regex.test(tab.url)) {
                    if(!tab.url.includes("focus.html")){
                    chrome.notifications.create({
                        type: "basic",
                        iconUrl: "icon.png", 
                        title: "Focus Mode Activated!",
                        message: "This tab is a distraction. It has been redirected.",
                    });

                    chrome.tabs.update(tab.id, { url: "focus.html" }, () => {
                    });
                }
            }
            });
        });
    });
}
chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.action === "closeTab" && sender.tab) {
        chrome.tabs.remove(sender.tab.id);
    }
});

chrome.tabs.onCreated.addListener((tab) => {
    checkForbiddenTabs();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>{
    if(changeInfo.status == "complete"){
        checkForbiddenTabs();
    }
});

