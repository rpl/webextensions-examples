console.log("Injecting externally_connectable content script into", window.location.href);

// Define the API subset provided to the webpage
var externallyConnectable = {
  runtime: {
    sendMessage: function(msg) {
      if (typeof msg == "function" || arguments.length > 1) {
        // Reject with an Error instance created from window.Error.
        return window.Promise.reject(new window.Error("Invalid sendMessage params"));
      }

      // Return a Promise instance created from window.Promise.
      return new window.Promise(resolve, reject => {
        browser.runtime.sendMessage({
          contentMessage: msg,
        }).then(result => {
          if (result.contentMessageReply) {
            // If the sendMessage reply contains a `contentMessageReply` property,
            // clone it into the window.
            resolve(cloneInto(result.contentMessageReply, window));
          } else {
            resolve();
          }
        }).catch(err => {
          console.error("externally_connectable_contentscript runtime.sendMessage error", err);
          reject(new window.Error("Unexpected error on runtime.sendMessage"));
        });
      });
    }
  },
};

// Inject the API in the webpage wrapped by this content script
// (exposed as `browser.runtime.sendMessage({anyProp: "anyValue"}).then(reply => ..., err => ...)`)
window.wrappedJSObject.browser = cloneInto(externallyConnectable, window, {
  cloneFunctions: true,
});
