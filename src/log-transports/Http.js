export function HttpTransport(url, method) {
    return function _httpTransporLog(level, event, message_parts) {
        if (typeof url !== 'string' || !url) {
            return;
        }

        if (typeof method !== 'string' || !method) {
            method = 'GET';
        }
        if (method !== 'GET' && method !== 'POST' && method !== 'PUT') {
            method = 'GET';
        }

        const params = {
            level,
            event,
            message: flattenMessage(message_parts)
        }
        const options = {
            method,
            mode: 'cors'
        };
        let requestUrl = url;
        if (method === 'GET') {
            // If method is GET, params must be sent on the query string
            requestUrl = makeQueryURL(url, params);
        } else {
            options.headers = new Headers({ 'Content-Type': 'application/json' });
            options.body = JSON.stringify(params);
        }

        fetch(requestUrl, options)
            .catch(() => {})
            .then(response => response.text())
            .then(body => {});
    }
}

function makeQueryURL(url, params) {
    let prefix = '?';
    if (url.indexOf('?') > -1) {
        prefix = '&';
    }
    const query = Object.keys(params).reduce((queryStr, key) => {
        if (queryStr) {
            queryStr += '&';
        }
        return queryStr + `${key}=${encodeURIComponent(params[key])}`;
    }, '');
    return url + prefix + query;
}

function flattenMessage(message_parts) {
    return message_parts
        .map(JSON.stringify)
        .map(stripQuote)
        .join(' ');
}

function stripQuote(val) {
    if (val.startsWith('"')) {
        val = JSON.parse(val);
    }
    return val;
}
