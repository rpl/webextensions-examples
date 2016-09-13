"use strict";

function startup(data) {
  Components.utils.import("chrome://bootstrap-transition-addon/content/AddonPrefs.jsm");
  Components.utils.import("chrome://bootstrap-transition-addon/content/AddonUI.jsm");

  AddonPrefs.set("super-important-user-setting", "char", "addon preference content");
  AddonUI.init(data);
}

function shutdown(data) {
  AddonUI.shutdown(data);

  Components.utils.unload("chrome://bootstrap-transition-addon/content/AddonUI.jsm");
  Components.utils.unload("chrome://bootstrap-transition-addon/content/AddonPrefs.jsm");
}
