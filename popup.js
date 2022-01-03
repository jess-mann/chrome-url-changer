var PROD = 'dockit.torticitylegal.com'
var STAGING = 'dockit.staging.torticitylegal.com'
var LOCAL = 'localhost:3000'

chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
  var url = new URL(tabs[0].url);
  var host = url.hostname;
  var env = host === PROD ? 'prod' : host === STAGING ? 'staging' : host ===  LOCAL ? 'local' : null;

  var changeToProdBtn = document.getElementById('changeToProd');
  var changeToStagingBtn = document.getElementById('changeToStaging');
  var changeToLocalBtn = document.getElementById('changeToLocal');

  changeToProdBtn.style.display = env === 'prod' ? 'none' : '';
  changeToStagingBtn.style.display = env === 'staging' ? 'none' : '';
  changeToLocalBtn.style.display = env === 'local' ? 'none' : '';

  changeToProdBtn.addEventListener("click", function () {
    chrome.tabs.getCurrent(function () {
      var newUrl = `https://${PROD}${url.pathname}`
      chrome.tabs.update(tabs[0].id, { url: newUrl });
    });
  });

  changeToStagingBtn.addEventListener("click", function () {
    chrome.tabs.getCurrent(function () {
      var newUrl = `https://${STAGING}${url.pathname}`
      chrome.tabs.update(tabs[0].id, { url: newUrl });
    });
  });

  changeToLocalBtn.addEventListener("click", function () {
    chrome.tabs.getCurrent(function () {
      var newUrl = `http://${LOCAL}${url.pathname}`
      chrome.tabs.update(tabs[0].id, { url: newUrl });
    });
  });
});
