var assert = require("chai").assert
var spf_express = require("../index")
var sinon = require("sinon")

var asyncDelay = 100


describe("spf-express", function() {

	it("should throw an error if paths object is not specified in options", function() {
		assert.throws(function() {
			spf_express({})
		}, "Please add at least one SPF path handler to middleware constructor")
	})

	it("should invoke express callback if link query does not contain the key spf", function(done) {
		var next = sinon.spy()
		var req = {
			query: {}
		}
		var res = {}
		spf_express({
			paths: {"sample_path": {}}
		})(req, res, next)
		setTimeout(function() {
			assert.isTrue(next.calledOnce, "express callback function was invoked once")
			assert.isTrue(next.args[0].length == 0, "no arguments were passed into callback function")
			done()
		}, asyncDelay)
	})

	it("should invoke express callback if request path is not specified in paths object", function(done) {
		var res = {}
		var req = {query: {spf: "navigate", path: "/sample_path"}}
		var next = sinon.spy()

		spf_express({
			paths: {"/another_path": {}}
		})(req, res, next)
		setTimeout(function() {
			assert.isTrue(next.calledOnce, "express callback function was invoked once")
			assert.isTrue(next.args[0].length == 0, "no arguments were passed into callback function")
			done()
		}, asyncDelay)
	})

	it("should override default identifiers when flag is true", function(done) {
		var res = {}
		var req = {query: {spf: "navigate"}, path: "/sample_path"}
		var next = sinon.spy()

		spf_express({
			override: true,
			identifiers: ["sample_identifier"],
			paths: {
				"/sample_path": {}
			}
		})(req, res, next)
		setTimeout(function() {
			assert.isTrue(next.calledOnce, "express callback function was invoked once")
			assert.isTrue(next.args[0].length == 0, "no arguments were passed into callback function")
			done()
		}, asyncDelay)
	})

	it("should send json response through express when paths object contains a SPF response for the specified request path", 
		function(done) {
			var req = {query: {spf: "navigate"}, path: "/sample_path"}
			var res = {json: sinon.spy()}
			var next = function() {}
			var spf_resp = {title: "sample_title"}

			spf_express({
				paths: {
					"/sample_path": spf_resp
				}
			})(req, res, next)
			setTimeout(function() {
				assert.isTrue(res.json.calledOnce, "res.json() function was invoked once")
				assert.equal(res.json.args[0].length, 1, "only one argument passed into res.json()")
				assert.equal(res.json.args[0][0], spf_resp, "argument passed into res.json matches response object specified in path handler")
				done()
			}, asyncDelay)
		})


	it("should invoke path handler with express callback arguments when request path is specified in paths object", function(done) {
		var req = {query: {spf: "navigate"}, "path": "/sample_path"}
		var res = {}
		var next = function() {}

		var path_handler = sinon.spy()
		spf_express({
			paths: {
				"/sample_path": path_handler
			}
		})(req, res, next)
		setTimeout(function() {
			assert.isTrue(path_handler.calledOnce, "path handler was invoked once")
			assert.equal(path_handler.args[0].length, 3, "3 arguments passed into path handler")
			assert.equal(path_handler.args[0][0], req, "first argument passed into handler matches request object passed into middleware")
			assert.equal(path_handler.args[0][1], res, "second argument passed into handler matches response object passed into middleware")
			assert.equal(path_handler.args[0][2], next, "third argument passed into handler matches callback function passed into middleware")
			done()
		}, asyncDelay)
	})

	it("should invoke express callback function with a new Error object if handler is neither a function nor an object", function(done) {
		var req = {query: {spf: "navigate"}, path: "/sample_path"}
		var res = {}
		var next = sinon.spy()

		spf_express({
			paths: {
				"/sample_path": "not a function or object"
			}
		})(req, res, next)
		setTimeout(function() {
			assert.isTrue(next.calledOnce, "express callback function was invoked once")
			assert.isTrue(next.calledOnce, "express callback function was invoked with 1 argument")
			assert.instanceOf(next.args[0][0], Error, "argument of the callback function is an instance of Error")
			done()
		}, asyncDelay)
	})
})