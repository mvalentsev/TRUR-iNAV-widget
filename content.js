const url = 'https://iss.moex.com/iss/engines/stock/markets/index/securities/TRURA.json?iss.meta=off&iss.only=marketdata&marketdata.columns=CURRENTVALUE';
const delay = 250;
let $truraValue;

const delayFetch = (url, options) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(fetch(url, options));
        }, options.delay);
    });

const truraUpdate = (value) => {
    $truraValue.dataset.value = value || 'Н/Д';
    delayFetch(url, {
        delay: delay,
        method: "GET",
    }).then((response) => response.json())
        .then((json) => {
            truraUpdate(json.marketdata.data[0][0].toFixed(4));
        }).catch(e => {
        truraUpdate();
    })
}

const observer = new MutationObserver(function (mutations, mutationInstance) {
    const $insertAfter = document.querySelector('#marquee-search');
    if ($insertAfter) {
        $insertAfter.insertAdjacentHTML('beforebegin', '<div id="trur-inav-widget">TRURA:&nbsp;</div>');
        $truraValue = document.querySelector('#trur-inav-widget');
        truraUpdate();
        mutationInstance.disconnect()
    }
});

observer.observe(document, {
    childList: true,
    subtree: true
});