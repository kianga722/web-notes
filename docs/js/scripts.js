(() => {
    const otherSite = 'https://othersite.netlify.app';

    // const otherSiteNoCORS = 'https://server-nocors.herokuapp.com';
    // const otherSiteCORS = 'https://server-cors-all.herokuapp.com';
    // const otherSiteRestrict = 'https://server-cors-restrict.herokuapp.com';

    const fetchSameOrigin = document.querySelector('#fetch-same-origin');
    const fetchDifferentOrigin = document.querySelector('#fetch-different-origin');
    const fetchCORS = document.querySelector('#fetch-cors');
    const fetchRestrict = document.querySelector('#fetch-restrict');
    const fetchPreflight = document.querySelector('#fetch-preflight');
    const fetchJSON = document.querySelector('#fetch-json');
    const JSONPnosupport = document.querySelector('#jsonp-nosupport');
    const JSONPsupport = document.querySelector('#jsonp-support');

    const dataWrapperSame = document.querySelector('#data-wrapper-same');
    const dataWrapperDifferent = document.querySelector('#data-wrapper-different');
    const dataWrapperCORS = document.querySelector('#data-wrapper-cors');
    const dataWrapperRestrict = document.querySelector('#data-wrapper-restrict');
    const dataWrapperPreflight = document.querySelector('#data-wrapper-preflight');
    const dataWrapperJSON = document.querySelector('#data-wrapper-json');
    const dataWrapperJSONPnosupport = document.querySelector('#data-wrapper-jsonp-nosupport');
    const dataWrapperJSONPsupport = document.querySelector('#data-wrapper-jsonp-support');

    async function handleFetch(url, dataWrapper, customHeader) {
        let data;
        if (customHeader) {
            data = await fetch(url, {
                headers: {
                    'Content-Type': customHeader
                }
            });
        } else {
            data = await fetch(url);
        }
        const dataJSON = await data.json();
        dataWrapper.textContent = JSON.stringify(dataJSON);
    }

    function handleJSONP(url, dataWrapper) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            error: (err) => {
                console.log('error')
                console.log(err)
            },
            success: (data) => {
                dataWrapper.textContent = JSON.stringify(data)
            }
        })
    }

    fetchSameOrigin.addEventListener('click', () => {
        handleFetch(`./data/data.json`, dataWrapperSame)
    })
    fetchDifferentOrigin.addEventListener('click', () => {
        handleFetch(`${otherSite}/data.json`, dataWrapperDifferent)
    })
    fetchCORS.addEventListener('click', () => {
        handleFetch(`${otherSite}/data.json`, dataWrapperCORS)
    })
    fetchRestrict.addEventListener('click', () => {
        handleFetch(`${otherSite}/data.json`, dataWrapperRestrict)
    })
    fetchPreflight.addEventListener('click', () => {
        handleFetch(`${otherSite}/data.json`, dataWrapperPreflight, 'application/json')
    })
    fetchJSON.addEventListener('click', () => {
        handleFetch(`${otherSite}/data.json`, dataWrapperJSON)
    })
    JSONPnosupport.addEventListener('click', () => {
        handleJSONP(`${otherSite}/data.json`, dataWrapperJSONPnosupport)
    })
    JSONPsupport.addEventListener('click', () => {
        handleJSONP(`${otherSite}/getJSONP`, dataWrapperJSONPsupport)
    })
})()