"use strict";

var EXPORTED_SYMBOLS = ["Addon"];

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

XPCOMUtils.defineLazyModuleGetter(this, "ConsoleAPI",
                                  "resource://gre/modules/Console.jsm");

const console = new ConsoleAPI({
  prefix: "native-messaging-hybrid",
});

function onWebExtensionAPI({browser}) {
  browser.runtime.onConnect.addListener(port => {
    const onMessage = msg => {
      const {type} = msg;

      switch(type) {
      case "send-native-message-error":
        console.error("Error on send native message", msg.error);
        break;
      case "native-message-reply":
        console.log("Native message received", msg.reply);
        port.postMessage({
          type: "show-notification",
          content: `Legacy container addon received a native message: ${msg.reply}`,
        });
        break;
      case "browser-action-clicked":
        port.postMessage({
          type: "send-native-message",
          payload: "ping",
        });
        break;
      default:
        console.error("Error on unknown message type", msg);
        break;
      }
    };

    const onDisconnect = () => {
      console.error("Unexpected port disconnected");
    };

    port.onDisconnect.addListener(onDisconnect);
    port.onMessage.addListener(onMessage);
  });
}

var Addon = {
  onWebExtensionAPI,
};
