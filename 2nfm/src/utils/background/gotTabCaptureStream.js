import * as globals from './globals';
import { captureTabUsingTabCapture } from './captureTabUsingTabCapture';
import { initVideoPlayer } from './common';
import { gotStream } from './gotStream';

export function gotTabCaptureStream(stream, constraints) {
  if (!stream) {
    if (constraints.audio === true) {
      console.log(
        "unable to capture with audio enabled; trying again without audio"
      );
      globals.enableAudio = false;
      captureTabUsingTabCapture(constraints.videoConstraints.mandatory);
      return;
    }
    console.error("error:", chrome.runtime.lastError.message);
    return alert("still no tabCapture stream");
    chrome.runtime.reload();
    return;
  }

  var newStream = new MediaStream();

  stream.getTracks().forEach(function(track) {
    newStream.addTrack(track);
  });

  initVideoPlayer(newStream);

  gotStream(newStream);
}
