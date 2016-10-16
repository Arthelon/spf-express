module.exports = function(opts) {
	if (!opts.paths) {
		throw new Error("Please add at least one SPF path handler to middleware constructor")
	}

    return function(req, res, next) {
        var spfQuery = req.query.spf
        var identifierMatch = false
        var identifiers = ["navigate", "prefetch", "navigate-back"]

        if (opts.identifiers && opts.identifiers.length > 0) {
            if (opts.override) {
                identifiers = opts.identifiers
            } else {
                identifiers.concat(opts.identifiers)
            }
        }
        for (var i = 0; i < identifiers.length; i++) {
            if (identifiers[i] == spfQuery) {
                identifierMatch = true
            }
        }

        if (!identifierMatch) next()
        else {
            var handler = opts.paths[req.path]
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
