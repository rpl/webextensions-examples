document.querySelector("button#request").addEventListener("click", async () => {
  document.querySelector("pre#result").textContent = "";

  const granted = await browser.permissions.request({permissions: ["tabs"]});

  if (granted) {
    browser.notifications.create("optional-permissions-result", {
      "type": "basic",
      "title": "Optional Permissions Example",
      "message": "Optional Permissions Request have been GRANTED"
    });

    const tabs = await browser.tabs.query({currentWindow: true});

    document.querySelector("pre#result").textContent = JSON.stringify(tabs, null, 2);
  } else {
    browser.notifications.create("optional-permissions-result", {
      "type": "basic",
      "title": "Optional Permissions Example",
      "message": "Optional Permissions Request have been DENIED"
    });
  }
});
