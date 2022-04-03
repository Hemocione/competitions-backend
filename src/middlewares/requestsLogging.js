function logging(req, res, next) {
    const { rawHeaders, httpVersion, method, socket, url } = req;
    const { remoteAddress, remoteFamily } = socket;

    console.log(
        JSON.stringify({
            timestamp: Date.now(),
            rawHeaders,
            httpVersion,
            method,
            remoteAddress,
            remoteFamily,
            url
        })
    )

    next();
}

module.exports = logging;
