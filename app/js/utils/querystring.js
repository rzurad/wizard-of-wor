export default function parseQueryString() {
    var qs = {},
        str;

    if (window.location.search.length) {
        str = window.location.search.substring(1);
        str = str.charAt(str.length - 1) === '/' ? str.substr(0, str.length - 1) : str;
        str = str.split('&');

        str.forEach(function (kvp) {
            var split = kvp.split('=');

            /* handle comma separated -> array: qs[split[0]] = split[1].split(','); */
            qs[split[0]] = split[1];
        });
    }

    return qs;
};
