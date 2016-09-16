"use strict";

function startup({webExtension}) {
  Components.utils.import("chrome://native-messaging-hybrid/content/Addon.jsm");

  // Start the embedded webextension and retrieve the API object.
  webExtension.startup().then(Addon.onWebExtensionAPI);
}

function shutdown(data) {
  Components.utils.unload("chrome://native-messaging-hybrid/content/Addon.jsm");
}
