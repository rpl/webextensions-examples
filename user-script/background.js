'use strict';

var registered = null;

async function registerScript(message) {

  let hosts = message.hosts;
  let code = message.code;
  let runAt = message.runAt;

  let excludeMatches = message.excludeMatches;
  let includeGlobs = message.includeGlobs;
  let excludeGlobs = message.excludeGlobs;
  let matchAboutBlank = message.matchAboutBlank;
  let allFrames = message.allFrames;

  if (registered) {
    registered.unregister();
  }

  registered = await browser.contentScripts.register({
    matches: hosts,
    js: [{code}],
    runAt,
    excludeMatches,
    includeGlobs,
    excludeGlobs,
    matchAboutBlank,
    allFrames,
  });
}

browser.runtime.onMessage.addListener(registerScript);
