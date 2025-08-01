// background.js

// Helper to inject our content script
function injectConfirmScript(tabId) {
  browser.scripting.executeScript({
    target: { tabId },
    files: ['content-script.js']
  }).catch(console.error);
}

// 1) On full page loads
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith('https://www.chess.com/')) {
    injectConfirmScript(tabId);
  }
});

// 2) On SPA navigations
browser.webNavigation.onHistoryStateUpdated.addListener(details => {
  if (details.url.startsWith('https://www.chess.com/')) {
    injectConfirmScript(details.tabId);
  }
});
