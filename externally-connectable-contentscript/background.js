console.log("externally_connectable_contentscript - Background Page Loaded.");

browser.runtime.onMessage.addListener((msg, sender, sendReply) => {
  console.log("externally_connectable_contentscript - Background Page Loaded", {msg, sender});

  return Promise.resolve({
    contentMessageReply: {
      data: "reply to webpage",
      receivedMsg: msg,
    },
  });
});
