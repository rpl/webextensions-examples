const legacyPort = browser.runtime.connect({name: "legacy-native-port"});

const onLegacyMessage = (msg) => {
  if (msg.type == "send-native-message") {
    browser.runtime.sendNativeMessage("ping_pong_hybrid", msg.payload, reply => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        legacyPort.postMessage({
          type: "send-native-message-error",
          error: chrome.runtime.lastError.message,
        });
      } else {
        legacyPort.postMessage({
          type: "native-message-reply",
          reply
        });
      }
    });
  }

  if (msg.type == "show-notification") {
    browser.notifications.create({
      type: "basic",
      title: "hybrid addon notification",
      message: msg.content
    });
  }
};

const handleBrowserActionClick = () => {
  // When the browserAction button has been clicked, send a message
  // to the legacy container.
  legacyPort.postMessage({type: "browser-action-clicked"});
};

const handlePortDisconnect = () => {
  browser.browserAction.onClicked.removeListener(handleBrowserActionClick);
  legacyPort.onMessage.removeListener(onLegacyMessage);
}

legacyPort.onMessage.addListener(onLegacyMessage);
legacyPort.onDisconnect.addListener(handlePortDisconnect);
browser.browserAction.onClicked.addListener(handleBrowserActionClick);
