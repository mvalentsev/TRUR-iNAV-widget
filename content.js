const url = 'https://iss.moex.com/cs/engines/stock/markets/index/boardgroups/104/securities/TRURA.hs?candles=2';
const delay = 1000;
let $truraValue;

const delayFetch = (url, options) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(fetch(url, options));
        }, options.delay);
    });

const truraUpdate = () => {
    delayFetch(url + '&_=' + Math.random(), {
        delay: delay,
        method: "GET",
    }).then((response) => response.json())
        .then((json) => {
            $truraValue.dataset.value = json.candles[0].data[1][1];
            truraUpdate();
        }).catch(e => {
        $truraValue.dataset.value = 'ВСЕ СЛОМАЛОСЬ!';
        truraUpdate();
    })
}

const observer = new MutationObserver(function (mutations, mutationInstance) {
    const $insertAfter = document.querySelector('#marquee-search');
    if ($insertAfter) {
        $insertAfter.insertAdjacentHTML('beforebegin', '<div id="trur-inav-widget" data-value="0.0000">TRURA:&nbsp;</div>');
        $truraValue = document.querySelector('#trur-inav-widget');
        truraUpdate();
        mutationInstance.disconnect()
    }
});

observer.observe(document, {
    childList: true,
    subtree: true
});