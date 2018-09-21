export const SDK_URL = `https://w.soundcloud.com/player/api.js`;
export const sdkGlobal = `SC`;

const queuedResolves = [];
export const loadSC = () => {
  return new Promise((resolve, reject) => {

    // If already loading script, just add resolve to queue
    if (queuedResolves.length > 0) {
      queuedResolves.push(resolve);
      return;
    }

    queuedResolves.push(resolve);

    const script = document.createElement(`script`);
    const isLoaded = () => {
      queuedResolves.forEach(queuedResolve =>
          queuedResolve(window[sdkGlobal]));
    };

    script.async = true;
    script.onload = isLoaded;
    script.onerror = reject;
    script.src = SDK_URL;
    document.getElementsByTagName(`head`)[0].appendChild(script);
  });
};
