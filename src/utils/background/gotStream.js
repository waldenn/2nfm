import { setDefaults } from './setDefaults';
import { addStreamStopListener } from './common';
import { shareStreamUsingRTCMultiConnection } from './shareStreamUsingRTCMultiConnection';

export function gotStream(stream, externalThis) {
  if (!stream) {
    setDefaults(externalThis);

    // chrome.windows.create({
    //   url:
    //     "data:text/html,<h1>Internal error occurred while capturing the screen.</h1>",
    //   type: "popup",
    //   width: screen.width / 2,
    //   height: 170,
    // });
    // return;
  }

  // chrome.browserAction.setTitle({
  //   title: "Connecting to WebSockets server.",
  // });

  // chrome.browserAction.disable();

  stream.addEventListener("inactive", e => {
    setDefaults(externalThis);
  });

  addStreamStopListener(stream, function() {
    setDefaults(externalThis);
    // chrome.runtime.reload();
  });

  shareStreamUsingRTCMultiConnection(stream, externalThis);

  // chrome.browserAction.setIcon({
  //   path: "images/icon-active_128.png",
  // });
}