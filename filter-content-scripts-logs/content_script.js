"use strict";

/**
 * Log Helpers
 */

// Mark printed logs using the addon name.
// or using the addon id: const logPrefix = browser.runtime.id;
const logPrefix = browser.runtime.getManifest().name;

// Enable/Disable logging;
const logDisabled = true;

// Produce log messages with the defined prefix.
function log(level, ...args) {
  if (logDisabled && level !== "error") {
    return;
  }

  let printLog = console.log;
  switch (level) {
    case "info": printLog = console.log; break;
    case "error": printLog = console.error; break;
    case "warn": printLog = console.warning; break;
    default: console.error("Unknown log level", level, "Defaults to 'info'");
  }

  printLog(`"${logPrefix}"`, ...args);
}

// Wrap a function and log the raised exception if any.
function logOnException(cb) {
  return (...args) => {
    try {
      cb(...args);
    } catch (err) {
      log("error", "Error calling a content script function:", err.message, err.stack);
    }
  };
}

/**
 * Use "Log Helpers" to print logs and errors in the webconsole and make them
 * searchable using the addon name or the addon id.
 */

log("info", "Injecting externally_connectable polyfill into", window.location.href);

window.addEventListener("click", logOnException(() => {
  throw Error("Error raised in a content script event handler");
}));

const initContentScript = logOnException(() => {
  throw Error("Error raised during content script injection");
});

initContentScript();
