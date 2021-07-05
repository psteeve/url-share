const app = (function () {

    /**
     * Encode the properties of an object as if they were name/value pairs from
     * an HTML form, using application/x-www-form-urlencoded format
     */
    function encodeFormData(data) {

        if (!data) return "";

        let pairs = [];

        for (let name in data) {

            if (!data.hasOwnProperty(name)) continue;

            if (typeof data[name] === "function") continue;

            let value = data[name].toString();

            name = encodeURIComponent(name).replace("%20", "+");

            value = encodeURIComponent(value).replace("%20", "+");

            pairs.push(`${name}=${value}`);
        }
        
        return pairs.join('&');
    }

    function shareUrl(url) {

        return fetch('/add-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: encodeFormData({url})
        })
            .then(response => response)
            .then(data => callback(data))
            .catch(error => error => console.log(error))              
    }

    function getLastUrl() {
        return fetch('/last-url');
    }
    
    return {
        shareUrl,
        getLastUrl
    };
    
}());

