# filter-content-scripts-logs

## What it does ##

The extension includes a content script which prints its logs and errors using a bunch of helpers so that the produced log messages will include the add-on name (or the add-on id),
and to optionally disable any log that is not related to an error.

## What it shows ##

Currently, because of the way content scripts logs and errors are produced and automatically logged,
they are not easily filterable/searchable from the tab's webconsole.

This small example show how to produce logs that can be more easily searchable using the
existent webconsole "filter logs" feature, by prefixing any produce log message with the
add-on name (or the add-on id).

NOTE: the content scripts errors are currently logged automatically in the Browser Console, as a workaround which makes the errors visible alongside the other logs produced by the same content script, the errors have to be manually logged using a try/catch and console.error, in the example the `logOnException` is the helper which is used to wrap a function and log the raised exception if any.
