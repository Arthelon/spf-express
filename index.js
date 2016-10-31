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
				var paths = Object.keys(opts.paths)
				for (var i = 0; i < paths.length; i++) {
					var path = paths[i]
					var params = {}
					var pathComponents = path.split("/").filter(function(item) {
						return !!item
					})
					var mainComponents = req.path.split("/").filter(function(item) {
						return !!item
					})
					if (pathComponents.length === mainComponents.length) {
						var failed = false
						for (var j = 0; j < pathComponents.length; j++) {
							var item = pathComponents[j]
						 	if (item.charAt(0) === ":") {
								params[item.slice(1)] = mainComponents[j]
							} else if (item !== mainComponents[j]) {
								failed = true
								break
							}
						}
						if (!failed) {
							req.params = params
							handler = opts.paths[path]
							break
						}
					}
				}
            }
			if (!handler) {
				next()
			} else if (typeof handler === "object") {
                res.json(handler)
            } else if (typeof handler === "function") {
                handler(req, res, next)
            } else {
                var error = new Error("Invalid handler for path: " + req.path)
                next(error)
            }
        }
    }
}
