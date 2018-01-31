'use strict';

const hostsInput =  document.querySelector("#hosts");
const runAtInput =  document.querySelector("#runAt");
const excludeMatchesInput =  document.querySelector("#excludeMatches");
const includeGlobsInput =  document.querySelector("#includeGlobs");
const excludeGlobsInput =  document.querySelector("#excludeGlobs");
const matchAboutBlankInput =  document.querySelector("#matchAboutBlank");
const allFramesInput =  document.querySelector("#allFrames");
const codeInput =  document.querySelector("#code");
const lastErrorEl =  document.querySelector("#lastError");

const defaultHosts = "*://*.org/*";
const defaultCode = "document.body.innerHTML = '<h1>This page has been eaten<h1>'";

hostsInput.value = defaultHosts;
codeInput.value = defaultCode;

async function loadLastSetValues() {
  const params = await browser.storage.local.get();

  const {
    hosts,
    code,
    runAt,
    excludeMatches,
    includeGlobs,
    excludeGlobs,
    matchAboutBlank,
    allFrames,
  } = params.lastSetValues;

  hostsInput.value = hosts ? hosts.join(",") : defaultHosts;
  codeInput.value = code ? code : defaultHosts;
  runAtInput.value = runAt ? runAt : "document_idle";
  excludeMatchesInput.value = excludeMatches ? excludeMatches.join(",") : "";
  includeGlobsInput.value = includeGlobs ? includeGlobs.join(",") : "";
  excludeGlobsInput.value = excludeGlobs ? excludeGlobs.join(",") : "";

  matchAboutBlankInput.value = matchAboutBlank || false;
  allFramesInput.value = allFrames || false;

  lastErrorEl.textContent = params.lastError || "";
}

function stringToArray(value) {
  const res = value.split(",").map(el => el.trim()).filter(el => el !== "");

  return res.length > 0 ? res : null;
}

function stringToBool(value) {
  return value === "true";
}

async function registerScript() {
  const params = {
    hosts: stringToArray(hostsInput.value),
    code: codeInput.value,
    excludeMatches: stringToArray(excludeMatchesInput.value),
    includeGlobs: stringToArray(includeGlobsInput.value),
    excludeGlobs: stringToArray(excludeGlobsInput.value),
    runAt: runAtInput.value,
    matchAboutBlank: stringToBool(matchAboutBlankInput.value),
    allFrames: stringToBool(allFramesInput.value),
  };

  // Store the last submitted values to the extension storage
  // (so that they can be restored when the popup is opened
  // the next time).
  await browser.storage.local.set({
    lastSetValues: params,
  });

  try {
    await browser.runtime.sendMessage(params);
    // Clear the last contentScripts.register error.
    lastErrorEl.textContent = "";

    // Clear the last error stored.
    await browser.storage.local.remove("lastError");
  } catch (e) {
    // There was an error on registering the contentScript,
    // let's show the error message in the popup and store
    // the last error into the extension storage.

    const lastError = `${e}`;
    // Show the last contentScripts.register error.
    lastErrorEl.textContent = lastError;

    // Store the last error.
    await browser.storage.local.set({lastError});
  }
}

loadLastSetValues();

document.querySelector("#register").addEventListener('click', registerScript);
