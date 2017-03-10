const tabsOpener = new Map();

browser.webNavigation.onCreatedNavigationTarget.addListener(msg => {
  console.log("webNavigation.onCreatedNavigationTarget event received", msg);
  const {tabId, sourceTabId} = msg;
  tabsOpener.set(tabId, sourceTabId);

  browser.pageAction.show(tabId);
});


function updatePageAction(event, tab) {
  const {tabId} = tab || {};
  console.log("updatePageAction on ", {event, tab, hasTabId: tabsOpener.has(tabId)});
  if (tabsOpener.has(tabId)) {
    browser.pageAction.show(tabId);
  } else {
    browser.pageAction.hide(tabId);
  }
}
browser.webNavigation.onCompleted.addListener(updatePageAction.bind(null, "onCompleted"));
browser.webNavigation.onErrorOccurred.addListener(updatePageAction.bind(null, "onErrorOccurred"));
browser.webNavigation.onReferenceFragmentUpdated.addListener(updatePageAction.bind(null, "onReferenceFragmentUpdated"));
browser.webNavigation.onHistoryStateUpdated.addListener(updatePageAction.bind(null, "onHistoryStateUpdated"));
browser.tabs.onActivated.addListener(updatePageAction.bind(null, "onActivated"));

browser.tabs.onRemoved.addListener((tabId) => {
  tabsOpener.delete(tabId);
});

browser.pageAction.onClicked.addListener(async tab => {
  console.log("PAGE ACTION CLICKED", tab);
  // NOTE: workaround missing tab in android pageAction onClicked event.
  if (!tab) {
    tab = (await browser.tabs.query({active: true, currentWindow: true}))[0];
  }
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
