self.addEventListener('message', function(e) {
    const result = e.data * 2;
    self.postMessage(result);
});