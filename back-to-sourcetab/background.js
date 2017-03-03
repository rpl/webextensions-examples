const tabsOpener = new Map();

browser.webNavigation.onCreatedNavigationTarget.addListener(msg => {
  console.log("webNavigation.onCreatedNavigationTarget event received", msg);
  const {tabId, sourceTabId} = msg;
  tabsOpener.set(tabId, sourceTabId);

  browser.pageAction.show(tabId);
});


function updatePageAction({tabId}) {
  if (tabsOpener.has(tabId)) {
    browser.pageAction.show(tabId);
  } else {
    browser.pageAction.hide(tabId);
  }
}
browser.webNavigation.onCompleted.addListener(updatePageAction);
browser.webNavigation.onErrorOccurred.addListener(updatePageAction);
browser.webNavigation.onReferenceFragmentUpdated.addListener(updatePageAction);
browser.webNavigation.onHistoryStateUpdated.addListener(updatePageAction);
browser.tabs.onActivated.addListener(updatePageAction);

browser.tabs.onRemoved.addListener((tabId) => {
  tabsOpener.delete(tabId);
});

browser.pageAction.onClicked.addListener(async tab => {
  const opener = tabsOpener.get(tab.id);

  if (!opener) {
    browser.notifications.create("missing-tab-id", {
      "type": "basic",
      "title": "ERROR: missing sourceTabId for this tab",
      "message": "Cannot switch to a source tab without a valid sourceTabId"
    });
    return;
  }

  const sourceTab = await browser.tabs.get(opener);

  await browser.tabs.update(sourceTab.id, {active: true});
  await browser.windows.update(sourceTab.windowId, {focused: true});
});
