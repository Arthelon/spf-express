module.exports = function(data) {
    return function(req, res, next) {
        var spfQuery = req.query.spf
        var identifierMatch = false
        var identifiers = ["navigate", "prefetch", "navigate-back"]

        if (data.identifiers && data.identifiers.length > 0) identifiers.concat(data.identifiers)
        for (var i = 0; i < identifiers.length; i++) {
            if (identifiers[i] == spfQuery) {
                identifierMatch = true
            }
        }

        if (!identifierMatch) next()
        else {
            var handler = data.paths[req.path]
            if (!handler) {
                next()
            } else if (typeof handler == "object") {
                res.json(handler)
            } else if (typeof handler == "function") {
                handler(req, res, next)
            } else {
                var error = new Error("Invalid handler for path: " + req.path)
                next(error)
            }
        }
    }
}