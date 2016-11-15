# externally-connectable-contentscript

## What it does

It inject a simple `browser.runtime.sendMessage` API in any webpage loaded from
`developer.mozilla.org`, using the content script as declared in the extension manifest.

- Install the addon
- Open a Browser Console or the Addon Debugger
- Load developer.mozilla.org
- open the Webconsole
- evaluate `browser.runtime.sendMessage({webPage2BackgroundPage: "testprop"}).then(console.log, console.error)`

## What it shows

- how to inject a API in the webpage which is similar to the one provided by [externally_connectable
  on Chrome](https://developer.chrome.com/extensions/manifest/externally_connectable) using a content script.
