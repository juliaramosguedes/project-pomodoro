self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('message', ({ data, source: { id } }) => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      let timeLeft = data.time;

      if (client.id === id) {
        setInterval(() => {
          if (timeLeft <= 0 || data.stop) {
            for (var i = 1; i < 99999; i++) clearInterval(i);
            client.postMessage(0);
          }
          if (timeLeft > 0 && !data.stop) {
            timeLeft -= 1;
            client.postMessage(timeLeft);
          }
        }, 1000);
      }
    });
  });
});
