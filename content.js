
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});


chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  // First, validate the message's structure
  if ((msg.from === 'popup') && (msg.subject === 'CountInfo')) {
    // Collect the necessary data
    // (For your specific requirements `document.querySelectorAll(...)`
    //  should be equivalent to jquery's `$(...)`)
    var viewsCount = 0;
    var showsCount = 0;
    var likesCount = 0
    var count = 0;
    $('.publication-card-item__stat-main-text').each(function(ind, item){
      if (($(item).text() == 'просмотров') || ($(item).text() == 'просмотра') || ($(item).text() == 'просмотр')) {
        count = $(item).parent().find('.publication-card-item__stat-main-count').text();
        if (count.endsWith('тыс.')){
          count = parseInt(count.slice(0, count.length-5))*1000;
        } else {
          count = parseInt(count);
        }
        viewsCount = viewsCount + count;
      }

      if (($(item).text() == 'показов в ленте') || ($(item).text() == 'показ в ленте')) {
        count = $(item).parent().find('.publication-card-item__stat-main-count').text();
        if (count.endsWith('тыс.')){
          count = parseInt(count.slice(0, count.length-5))*1000;
        } else {
          count = parseInt(count);
        }
        showsCount = showsCount + count;
      }
    });

    $('.publication-card-item__stat-likes').each(function(ind, item){
      count = parseInt($(item).find('.publication-card-item__stat-count').text());
      likesCount = likesCount + count;

    });
    var info = {
      views: viewsCount,
      shows: showsCount,
      likes: likesCount
    }

    // Directly respond to the sender (popup),
    // through the specified callback */
    response(info);
  }
});
