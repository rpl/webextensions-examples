This is a very simple example of how to use [native messaging](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging) to exchange messages between an hybrid addon with an [Embedded WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Embedded_WebExtensions) and a native application.

The Hybrid Add-ons, which can be found under the "hybrid-boostrapped" and "hybrid-sdk" directories, connects to the native application and listens to messages from it. The hybrid add-on then sends a message to the native application when the user clicks on the WebExtension's browser action. The message payload is just "ping".

The native application, which can be found under "app", listens for messages from the Hybrid Add-on. When it receives a message, the native application sends a response message whose payload is just "pong". The native application is written in Python.

## Setup ##

To get this working, there's a little setup to do.

### Mac OS/Linux setup ###

1. Check that the [file permissions](https://en.wikipedia.org/wiki/File_system_permissions) for "ping_pong.py" include the `execute` permission.
2. Edit the "path" property of "ping_pong_hybrid.json" to point to the location of "ping_pong.py" on your computer.
3. copy "ping_pong_hybrid.json" to the correct location on your computer. See [App manifest location ](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging#App_manifest_location) to find the correct location for your OS.

### Windows setup ###

1. Check you have Python installed, and that your system's PATH environment variable includes the path to Python.  See [Using Python on Windows](https://docs.python.org/2/using/windows.html). You'll need to restart the web browser after making this change, or the browser won't pick up the new environment variable.
2. Edit the "path" property of "ping_pong_hybrid.json" to point to the location of "ping_pong_win.bat" on your computer. Note that you'll need to escape the Windows directory separator, like this: `"path": "C:\\Users\\MDN\\native-messaging\\app\\ping_pong_win.bat"`.
3. Edit "ping_pong_win.bat" to refer to the location of "ping_pong.py" on your computer.
4. Add a registry key containing the path to "ping_pong_hybrid.json" on your computer. See [App manifest location ](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging#App_manifest_location) to find details of the registry key to add.

## Testing the example ##

Then just install the add-on as usual, by visiting about:debugging, clicking "Load Temporary Add-on", and selecting the add-on's "chrome.manifest" for the bootstrapped add-on, or the XPI build using JPM >= 1.2.0 for the SDK add-on.

You should see a new browser action icon in the toolbar. Press the browser action button and a notification message should be opened.
    
If you don't see this output, see the [Troubleshooting guide](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Native_messaging#Troubleshooting) for ideas.
