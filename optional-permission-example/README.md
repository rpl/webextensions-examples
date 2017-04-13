# optional-permission-example

## What it does ##

The extension includes:

* a browser action which open an extension page in a tab
* an extension page which request an optional permission (the "tabs" permission),
* the extension page shows a notification when the request has been granted or denied
* if the optional permission has been granted, it uses the tabs API to query all the tabs
  (which should include the urls if the permission has been granted correctly)

## How to run it ##

Using web-ext and a recent Nightly build (the optional_permissions have been landed in Firefox 55),
you can run the extension and set the preference that enable the optional permissions with the
following command:

```
$ /web-ext run --pref extensions.webextOptionalPermissionPrompts=true -f /path/to/nightly/bin/firefox

Running web extension from /path/to/optional-permissions-example
Setting custom Firefox preferences: {
  "extensions.webextOptionalPermissionPrompts": true
}
Use --verbose or open Tools > Web Developer > Browser Console to see logging
Installed /path/to/optional-permissions-example as a temporary add-on
The extension will reload if any source file changes
Last extension reload: 11:46:31 GMT+0200 (CEST
```
