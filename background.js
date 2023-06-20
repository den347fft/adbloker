// background.js
// a variable to store the blocking state
let isBlocking = false;

// a function to toggle the blocking state and register or remove the web request listener
function toggleBlocking() {
// toggle the blocking state
isBlocking = !isBlocking;
// if blocking is true, register the listener
if (isBlocking) {
chrome.webRequest.onBeforeRequest.addListener(
blockAds,
{ urls: ["<all_urls>"] },
["blocking"]
);
}
// if blocking is false, remove the listener
else {
chrome.webRequest.onBeforeRequest.removeListener(blockAds);
}
}

// a function to block ads by canceling web requests that contain "ad" in their url
function blockAds(details) {
// check if the url contains "ad"
if (details.url.includes("ad")) {
// return an object with cancel: true to cancel the request
return { cancel: true };
}
}

// a listener for messages from content scripts
chrome.runtime.onMessage.addListener(function (message) {
// if the message is "toggle", call the toggleBlocking function
if (message === "toggle") {
toggleBlocking();
}
});