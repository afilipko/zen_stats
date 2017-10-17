// Update the relevant fields with the new data
function updateCounts(info) {
  document.getElementById('v-total').textContent  = info.views;
  document.getElementById('s-total').textContent  = info.shows;
  document.getElementById('l-total').textContent  = info.likes;
}

// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'CountInfo'},
        // ...also specifying a callback to be called
        //    from the receiving end (content script)
        updateCounts);
  });
});
