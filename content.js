
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});
console.log('I AM HERE');
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'CountInfo')) {
    console.log('MESSA');
    // Collect the necessary data
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var viewsCount = 0;
    var showsCount = 0;
    $('.publication-card-item__stat-main-text').each(function(item){
      if ($(item).text() == 'просмотров') {
        count = parseInt($(item).parent().find('.publication-card-item__stat-main-count').text());
        viewsCount = viewsCount + count;
      }

      if ($(item).text() == 'показов') {
        count = $(item).parent().find('.publication-card-item__stat-main-count').text();
        if (count.endsWith('тыс.')){
          count = parseInt(count.slice(0, count.length-5))*1000;
        } else {
          count = parseInt(count);
        }
        showsCount = showsCount + count;
      }
      console.log(viewsCount);
      console.log(showsCount)

    })
    var info = {
      views: viewsCount,
      shows: showsCount
    }

    // Directly respond to the sender (popup),
    // through the specified callback */
    response(info);
  }
});
