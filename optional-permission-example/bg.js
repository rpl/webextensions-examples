browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({url: "optional-permissions-request.html"});
});
