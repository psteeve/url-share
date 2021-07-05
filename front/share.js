const app = (function () {

    function getData(url, callback) {
        var request = new XMLHttpRequest();

        request.open("GET", url);

        request.onreadystatechange = function () {
            if (request.readyState === 4 && callback) callback(request);
        };

        request.send(null);
    }

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


    function postData(url, data, callback) {

        var request = new XMLHttpRequest();

        request.open("POST", url);

        request.onreadystatechange = function () {
            if (request.readyState === 4 && callback) {
                callback(request);
            }
        };

        request.setRequestHeader("Content-Type",
                                 "application/x-www-form-urlencoded");

        request.send(encodeFormData(data));
    }

    function shareUrl(url) {
        postData('/add-url', { url });
    }

    function getLastUrl(callback) {
        getData('/last-url', callback);
    }
    
    return {
        shareUrl,
        getLastUrl
    };
    
}());

