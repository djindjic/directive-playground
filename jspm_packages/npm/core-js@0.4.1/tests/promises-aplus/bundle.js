/* */ 
(function(Buffer, process) {
  ;
  (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (i)
            return i(o, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        var f = n[o] = {exports: {}};
        t[o][0].call(f.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, f, f.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
      s(r[o]);
    return s;
  })({
    1: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var testFulfilled = require("./helpers/testThreeCases").testFulfilled;
      var adapter = global.adapter;
      var deferred = adapter.deferred;
      var dummy = {dummy: "dummy"};
      describe("2.1.2.1: When fulfilled, a promise: must not transition to any other state.", function() {
        testFulfilled(dummy, function(promise, done) {
          var onFulfilledCalled = false;
          promise.then(function onFulfilled() {
            onFulfilledCalled = true;
          }, function onRejected() {
            assert.strictEqual(onFulfilledCalled, false);
            done();
          });
          setTimeout(done, 100);
        });
        specify("trying to fulfill then immediately reject", function(done) {
          var d = deferred();
          var onFulfilledCalled = false;
          d.promise.then(function onFulfilled() {
            onFulfilledCalled = true;
          }, function onRejected() {
            assert.strictEqual(onFulfilledCalled, false);
            done();
          });
          d.resolve(dummy);
          d.reject(dummy);
          setTimeout(done, 100);
        });
        specify("trying to fulfill then reject, delayed", function(done) {
          var d = deferred();
          var onFulfilledCalled = false;
          d.promise.then(function onFulfilled() {
            onFulfilledCalled = true;
          }, function onRejected() {
            assert.strictEqual(onFulfilledCalled, false);
            done();
          });
          setTimeout(function() {
            d.resolve(dummy);
            d.reject(dummy);
          }, 50);
          setTimeout(done, 100);
        });
        specify("trying to fulfill immediately then reject delayed", function(done) {
          var d = deferred();
          var onFulfilledCalled = false;
          d.promise.then(function onFulfilled() {
            onFulfilledCalled = true;
          }, function onRejected() {
            assert.strictEqual(onFulfilledCalled, false);
            done();
          });
          d.resolve(dummy);
          setTimeout(function() {
            d.reject(dummy);
          }, 50);
          setTimeout(done, 100);
        });
      });
    }, {
      "./helpers/testThreeCases": 15,
      "assert": 18
    }],
    2: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var testRejected = require("./helpers/testThreeCases").testRejected;
      var adapter = global.adapter;
      var deferred = adapter.deferred;
      var dummy = {dummy: "dummy"};
      describe("2.1.3.1: When rejected, a promise: must not transition to any other state.", function() {
        testRejected(dummy, function(promise, done) {
          var onRejectedCalled = false;
          promise.then(function onFulfilled() {
            assert.strictEqual(onRejectedCalled, false);
            done();
          }, function onRejected() {
            onRejectedCalled = true;
          });
          setTimeout(done, 100);
        });
        specify("trying to reject then immediately fulfill", function(done) {
          var d = deferred();
          var onRejectedCalled = false;
          d.promise.then(function onFulfilled() {
            assert.strictEqual(onRejectedCalled, false);
            done();
          }, function onRejected() {
            onRejectedCalled = true;
          });
          d.reject(dummy);
          d.resolve(dummy);
          setTimeout(done, 100);
        });
        specify("trying to reject then fulfill, delayed", function(done) {
          var d = deferred();
          var onRejectedCalled = false;
          d.promise.then(function onFulfilled() {
            assert.strictEqual(onRejectedCalled, false);
            done();
          }, function onRejected() {
            onRejectedCalled = true;
          });
          setTimeout(function() {
            d.reject(dummy);
            d.resolve(dummy);
          }, 50);
          setTimeout(done, 100);
        });
        specify("trying to reject immediately then fulfill delayed", function(done) {
          var d = deferred();
          var onRejectedCalled = false;
          d.promise.then(function onFulfilled() {
            assert.strictEqual(onRejectedCalled, false);
            done();
          }, function onRejected() {
            onRejectedCalled = true;
          });
          d.reject(dummy);
          setTimeout(function() {
            d.resolve(dummy);
          }, 50);
          setTimeout(done, 100);
        });
      });
    }, {
      "./helpers/testThreeCases": 15,
      "assert": 18
    }],
    3: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var adapter = global.adapter;
      var resolved = adapter.resolved;
      var rejected = adapter.rejected;
      var dummy = {dummy: "dummy"};
      describe("2.2.1: Both `onFulfilled` and `onRejected` are optional arguments.", function() {
        describe("2.2.1.1: If `onFulfilled` is not a function, it must be ignored.", function() {
          describe("applied to a directly-rejected promise", function() {
            function testNonFunction(nonFunction, stringRepresentation) {
              specify("`onFulfilled` is " + stringRepresentation, function(done) {
                rejected(dummy).then(nonFunction, function() {
                  done();
                });
              });
            }
            testNonFunction(undefined, "`undefined`");
            testNonFunction(null, "`null`");
            testNonFunction(false, "`false`");
            testNonFunction(5, "`5`");
            testNonFunction({}, "an object");
          });
          describe("applied to a promise rejected and then chained off of", function() {
            function testNonFunction(nonFunction, stringRepresentation) {
              specify("`onFulfilled` is " + stringRepresentation, function(done) {
                rejected(dummy).then(function() {}, undefined).then(nonFunction, function() {
                  done();
                });
              });
            }
            testNonFunction(undefined, "`undefined`");
            testNonFunction(null, "`null`");
            testNonFunction(false, "`false`");
            testNonFunction(5, "`5`");
            testNonFunction({}, "an object");
          });
        });
        describe("2.2.1.2: If `onRejected` is not a function, it must be ignored.", function() {
          describe("applied to a directly-fulfilled promise", function() {
            function testNonFunction(nonFunction, stringRepresentation) {
              specify("`onRejected` is " + stringRepresentation, function(done) {
                resolved(dummy).then(function() {
                  done();
                }, nonFunction);
              });
            }
            testNonFunction(undefined, "`undefined`");
            testNonFunction(null, "`null`");
            testNonFunction(false, "`false`");
            testNonFunction(5, "`5`");
            testNonFunction({}, "an object");
          });
          describe("applied to a promise fulfilled and then chained off of", function() {
            function testNonFunction(nonFunction, stringRepresentation) {
              specify("`onFulfilled` is " + stringRepresentation, function(done) {
                resolved(dummy).then(undefined, function() {}).then(function() {
                  done();
                }, nonFunction);
              });
            }
            testNonFunction(undefined, "`undefined`");
            testNonFunction(null, "`null`");
            testNonFunction(false, "`false`");
            testNonFunction(5, "`5`");
            testNonFunction({}, "an object");
          });
        });
      });
    }, {}],
    4: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var testFulfilled = require("./helpers/testThreeCases").testFulfilled;
      var adapter = global.adapter;
      var resolved = adapter.resolved;
      var deferred = adapter.deferred;
      var dummy = {dummy: "dummy"};
      var sentinel = {sentinel: "sentinel"};
      describe("2.2.2: If `onFulfilled` is a function,", function() {
        describe("2.2.2.1: it must be called after `promise` is fulfilled, with `promise`’s fulfillment value as its " + "first argument.", function() {
          testFulfilled(sentinel, function(promise, done) {
            promise.then(function onFulfilled(value) {
              assert.strictEqual(value, sentinel);
              done();
            });
          });
        });
        describe("2.2.2.2: it must not be called before `promise` is fulfilled", function() {
          specify("fulfilled after a delay", function(done) {
            var d = deferred();
            var isFulfilled = false;
            d.promise.then(function onFulfilled() {
              assert.strictEqual(isFulfilled, true);
              done();
            });
            setTimeout(function() {
              d.resolve(dummy);
              isFulfilled = true;
            }, 50);
          });
          specify("never fulfilled", function(done) {
            var d = deferred();
            var onFulfilledCalled = false;
            d.promise.then(function onFulfilled() {
              onFulfilledCalled = true;
              done();
            });
            setTimeout(function() {
              assert.strictEqual(onFulfilledCalled, false);
              done();
            }, 150);
          });
        });
        describe("2.2.2.3: it must not be called more than once.", function() {
          specify("already-fulfilled", function(done) {
            var timesCalled = 0;
            resolved(dummy).then(function onFulfilled() {
              assert.strictEqual(++timesCalled, 1);
              done();
            });
          });
          specify("trying to fulfill a pending promise more than once, immediately", function(done) {
            var d = deferred();
            var timesCalled = 0;
            d.promise.then(function onFulfilled() {
              assert.strictEqual(++timesCalled, 1);
              done();
            });
            d.resolve(dummy);
            d.resolve(dummy);
          });
          specify("trying to fulfill a pending promise more than once, delayed", function(done) {
            var d = deferred();
            var timesCalled = 0;
            d.promise.then(function onFulfilled() {
              assert.strictEqual(++timesCalled, 1);
              done();
            });
            setTimeout(function() {
              d.resolve(dummy);
              d.resolve(dummy);
            }, 50);
          });
          specify("trying to fulfill a pending promise more than once, immediately then delayed", function(done) {
            var d = deferred();
            var timesCalled = 0;
            d.promise.then(function onFulfilled() {
              assert.strictEqual(++timesCalled, 1);
              done();
            });
            d.resolve(dummy);
            setTimeout(function() {
              d.resolve(dummy);
            }, 50);
          });
          specify("when multiple `then` calls are made, spaced apart in time", function(done) {
            var d = deferred();
            var timesCalled = [0, 0, 0];
            d.promise.then(function onFulfilled() {
              assert.strictEqual(++timesCalled[0], 1);
            });
            setTimeout(function() {
              d.promise.then(function onFulfilled() {
                assert.strictEqual(++timesCalled[1], 1);
              });
            }, 50);
            setTimeout(function() {
              d.promise.then(function onFulfilled() {
                assert.strictEqual(++timesCalled[2], 1);
                done();
              });
            }, 100);
            setTimeout(function() {
              d.resolve(dummy);
            }, 150);
          });
          specify("when `then` is interleaved with fulfillment", function(done) {
            var d = deferred();
            var timesCalled = [0, 0];
            d.promise.then(function onFulfilled() {
              assert.strictEqual(++timesCalled[0], 1);
            });
            d.resolve(dummy);
            d.promise.then(function onFulfilled() {
              assert.strictEqual(++timesCalled[1], 1);
              done();
            });
          });
        });
      });
    }, {
      "./helpers/testThreeCases": 15,
      "assert": 18
    }],
    5: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var testRejected = require("./helpers/testThreeCases").testRejected;
      var adapter = global.adapter;
      var rejected = adapter.rejected;
      var deferred = adapter.deferred;
      var dummy = {dummy: "dummy"};
      var sentinel = {sentinel: "sentinel"};
      describe("2.2.3: If `onRejected` is a function,", function() {
        describe("2.2.3.1: it must be called after `promise` is rejected, with `promise`’s rejection reason as its " + "first argument.", function() {
          testRejected(sentinel, function(promise, done) {
            promise.then(null, function onRejected(reason) {
              assert.strictEqual(reason, sentinel);
              done();
            });
          });
        });
        describe("2.2.3.2: it must not be called before `promise` is rejected", function() {
          specify("rejected after a delay", function(done) {
            var d = deferred();
            var isRejected = false;
            d.promise.then(null, function onRejected() {
              assert.strictEqual(isRejected, true);
              done();
            });
            setTimeout(function() {
              d.reject(dummy);
              isRejected = true;
            }, 50);
          });
          specify("never rejected", function(done) {
            var d = deferred();
            var onRejectedCalled = false;
            d.promise.then(null, function onRejected() {
              onRejectedCalled = true;
              done();
            });
            setTimeout(function() {
              assert.strictEqual(onRejectedCalled, false);
              done();
            }, 150);
          });
        });
        describe("2.2.3.3: it must not be called more than once.", function() {
          specify("already-rejected", function(done) {
            var timesCalled = 0;
            rejected(dummy).then(null, function onRejected() {
              assert.strictEqual(++timesCalled, 1);
              done();
            });
          });
          specify("trying to reject a pending promise more than once, immediately", function(done) {
            var d = deferred();
            var timesCalled = 0;
            d.promise.then(null, function onRejected() {
              assert.strictEqual(++timesCalled, 1);
              done();
            });
            d.reject(dummy);
            d.reject(dummy);
          });
          specify("trying to reject a pending promise more than once, delayed", function(done) {
            var d = deferred();
            var timesCalled = 0;
            d.promise.then(null, function onRejected() {
              assert.strictEqual(++timesCalled, 1);
              done();
            });
            setTimeout(function() {
              d.reject(dummy);
              d.reject(dummy);
            }, 50);
          });
          specify("trying to reject a pending promise more than once, immediately then delayed", function(done) {
            var d = deferred();
            var timesCalled = 0;
            d.promise.then(null, function onRejected() {
              assert.strictEqual(++timesCalled, 1);
              done();
            });
            d.reject(dummy);
            setTimeout(function() {
              d.reject(dummy);
            }, 50);
          });
          specify("when multiple `then` calls are made, spaced apart in time", function(done) {
            var d = deferred();
            var timesCalled = [0, 0, 0];
            d.promise.then(null, function onRejected() {
              assert.strictEqual(++timesCalled[0], 1);
            });
            setTimeout(function() {
              d.promise.then(null, function onRejected() {
                assert.strictEqual(++timesCalled[1], 1);
              });
            }, 50);
            setTimeout(function() {
              d.promise.then(null, function onRejected() {
                assert.strictEqual(++timesCalled[2], 1);
                done();
              });
            }, 100);
            setTimeout(function() {
              d.reject(dummy);
            }, 150);
          });
          specify("when `then` is interleaved with rejection", function(done) {
            var d = deferred();
            var timesCalled = [0, 0];
            d.promise.then(null, function onRejected() {
              assert.strictEqual(++timesCalled[0], 1);
            });
            d.reject(dummy);
            d.promise.then(null, function onRejected() {
              assert.strictEqual(++timesCalled[1], 1);
              done();
            });
          });
        });
      });
    }, {
      "./helpers/testThreeCases": 15,
      "assert": 18
    }],
    6: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var testFulfilled = require("./helpers/testThreeCases").testFulfilled;
      var testRejected = require("./helpers/testThreeCases").testRejected;
      var adapter = global.adapter;
      var resolved = adapter.resolved;
      var rejected = adapter.rejected;
      var deferred = adapter.deferred;
      var dummy = {dummy: "dummy"};
      describe("2.2.4: `onFulfilled` or `onRejected` must not be called until the execution context stack contains only " + "platform code.", function() {
        describe("`then` returns before the promise becomes fulfilled or rejected", function() {
          testFulfilled(dummy, function(promise, done) {
            var thenHasReturned = false;
            promise.then(function onFulfilled() {
              assert.strictEqual(thenHasReturned, true);
              done();
            });
            thenHasReturned = true;
          });
          testRejected(dummy, function(promise, done) {
            var thenHasReturned = false;
            promise.then(null, function onRejected() {
              assert.strictEqual(thenHasReturned, true);
              done();
            });
            thenHasReturned = true;
          });
        });
        describe("Clean-stack execution ordering tests (fulfillment case)", function() {
          specify("when `onFulfilled` is added immediately before the promise is fulfilled", function() {
            var d = deferred();
            var onFulfilledCalled = false;
            d.promise.then(function onFulfilled() {
              onFulfilledCalled = true;
            });
            d.resolve(dummy);
            assert.strictEqual(onFulfilledCalled, false);
          });
          specify("when `onFulfilled` is added immediately after the promise is fulfilled", function() {
            var d = deferred();
            var onFulfilledCalled = false;
            d.resolve(dummy);
            d.promise.then(function onFulfilled() {
              onFulfilledCalled = true;
            });
            assert.strictEqual(onFulfilledCalled, false);
          });
          specify("when one `onFulfilled` is added inside another `onFulfilled`", function(done) {
            var promise = resolved();
            var firstOnFulfilledFinished = false;
            promise.then(function() {
              promise.then(function() {
                assert.strictEqual(firstOnFulfilledFinished, true);
                done();
              });
              firstOnFulfilledFinished = true;
            });
          });
          specify("when `onFulfilled` is added inside an `onRejected`", function(done) {
            var promise = rejected();
            var promise2 = resolved();
            var firstOnRejectedFinished = false;
            promise.then(null, function() {
              promise2.then(function() {
                assert.strictEqual(firstOnRejectedFinished, true);
                done();
              });
              firstOnRejectedFinished = true;
            });
          });
          specify("when the promise is fulfilled asynchronously", function(done) {
            var d = deferred();
            var firstStackFinished = false;
            setTimeout(function() {
              d.resolve(dummy);
              firstStackFinished = true;
            }, 0);
            d.promise.then(function() {
              assert.strictEqual(firstStackFinished, true);
              done();
            });
          });
        });
        describe("Clean-stack execution ordering tests (rejection case)", function() {
          specify("when `onRejected` is added immediately before the promise is rejected", function() {
            var d = deferred();
            var onRejectedCalled = false;
            d.promise.then(null, function onRejected() {
              onRejectedCalled = true;
            });
            d.reject(dummy);
            assert.strictEqual(onRejectedCalled, false);
          });
          specify("when `onRejected` is added immediately after the promise is rejected", function() {
            var d = deferred();
            var onRejectedCalled = false;
            d.reject(dummy);
            d.promise.then(null, function onRejected() {
              onRejectedCalled = true;
            });
            assert.strictEqual(onRejectedCalled, false);
          });
          specify("when `onRejected` is added inside an `onFulfilled`", function(done) {
            var promise = resolved();
            var promise2 = rejected();
            var firstOnFulfilledFinished = false;
            promise.then(function() {
              promise2.then(null, function() {
                assert.strictEqual(firstOnFulfilledFinished, true);
                done();
              });
              firstOnFulfilledFinished = true;
            });
          });
          specify("when one `onRejected` is added inside another `onRejected`", function(done) {
            var promise = rejected();
            var firstOnRejectedFinished = false;
            promise.then(null, function() {
              promise.then(null, function() {
                assert.strictEqual(firstOnRejectedFinished, true);
                done();
              });
              firstOnRejectedFinished = true;
            });
          });
          specify("when the promise is rejected asynchronously", function(done) {
            var d = deferred();
            var firstStackFinished = false;
            setTimeout(function() {
              d.reject(dummy);
              firstStackFinished = true;
            }, 0);
            d.promise.then(null, function() {
              assert.strictEqual(firstStackFinished, true);
              done();
            });
          });
        });
      });
    }, {
      "./helpers/testThreeCases": 15,
      "assert": 18
    }],
    7: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var adapter = global.adapter;
      var resolved = adapter.resolved;
      var rejected = adapter.rejected;
      var dummy = {dummy: "dummy"};
      var defaultThisStrict = (function() {
        "use strict";
        return this;
      }());
      var defaultThisSloppy = (function() {
        return this;
      }());
      describe("2.2.5 `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value).", function() {
        describe("strict mode", function() {
          specify("fulfilled", function(done) {
            resolved(dummy).then(function onFulfilled() {
              "use strict";
              assert.strictEqual(this, defaultThisStrict);
              done();
            });
          });
          specify("rejected", function(done) {
            rejected(dummy).then(null, function onRejected() {
              "use strict";
              assert.strictEqual(this, defaultThisStrict);
              done();
            });
          });
        });
        describe("sloppy mode", function() {
          specify("fulfilled", function(done) {
            resolved(dummy).then(function onFulfilled() {
              assert.strictEqual(this, defaultThisSloppy);
              done();
            });
          });
          specify("rejected", function(done) {
            rejected(dummy).then(null, function onRejected() {
              assert.strictEqual(this, defaultThisSloppy);
              done();
            });
          });
        });
      });
    }, {"assert": 18}],
    8: [function(require, module, exports) {
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var sinon = require("sinon");
      var testFulfilled = require("./helpers/testThreeCases").testFulfilled;
      var testRejected = require("./helpers/testThreeCases").testRejected;
      var dummy = {dummy: "dummy"};
      var other = {other: "other"};
      var sentinel = {sentinel: "sentinel"};
      var sentinel2 = {sentinel2: "sentinel2"};
      var sentinel3 = {sentinel3: "sentinel3"};
      function callbackAggregator(times, ultimateCallback) {
        var soFar = 0;
        return function() {
          if (++soFar === times) {
            ultimateCallback();
          }
        };
      }
      describe("2.2.6: `then` may be called multiple times on the same promise.", function() {
        describe("2.2.6.1: If/when `promise` is fulfilled, all respective `onFulfilled` callbacks must execute in the " + "order of their originating calls to `then`.", function() {
          describe("multiple boring fulfillment handlers", function() {
            testFulfilled(sentinel, function(promise, done) {
              var handler1 = sinon.stub().returns(other);
              var handler2 = sinon.stub().returns(other);
              var handler3 = sinon.stub().returns(other);
              var spy = sinon.spy();
              promise.then(handler1, spy);
              promise.then(handler2, spy);
              promise.then(handler3, spy);
              promise.then(function(value) {
                assert.strictEqual(value, sentinel);
                sinon.assert.calledWith(handler1, sinon.match.same(sentinel));
                sinon.assert.calledWith(handler2, sinon.match.same(sentinel));
                sinon.assert.calledWith(handler3, sinon.match.same(sentinel));
                sinon.assert.notCalled(spy);
                done();
              });
            });
          });
          describe("multiple fulfillment handlers, one of which throws", function() {
            testFulfilled(sentinel, function(promise, done) {
              var handler1 = sinon.stub().returns(other);
              var handler2 = sinon.stub().throws(other);
              var handler3 = sinon.stub().returns(other);
              var spy = sinon.spy();
              promise.then(handler1, spy);
              promise.then(handler2, spy);
              promise.then(handler3, spy);
              promise.then(function(value) {
                assert.strictEqual(value, sentinel);
                sinon.assert.calledWith(handler1, sinon.match.same(sentinel));
                sinon.assert.calledWith(handler2, sinon.match.same(sentinel));
                sinon.assert.calledWith(handler3, sinon.match.same(sentinel));
                sinon.assert.notCalled(spy);
                done();
              });
            });
          });
          describe("results in multiple branching chains with their own fulfillment values", function() {
            testFulfilled(dummy, function(promise, done) {
              var semiDone = callbackAggregator(3, done);
              promise.then(function() {
                return sentinel;
              }).then(function(value) {
                assert.strictEqual(value, sentinel);
                semiDone();
              });
              promise.then(function() {
                throw sentinel2;
              }).then(null, function(reason) {
                assert.strictEqual(reason, sentinel2);
                semiDone();
              });
              promise.then(function() {
                return sentinel3;
              }).then(function(value) {
                assert.strictEqual(value, sentinel3);
                semiDone();
              });
            });
          });
          describe("`onFulfilled` handlers are called in the original order", function() {
            testFulfilled(dummy, function(promise, done) {
              var handler1 = sinon.spy(function handler1() {});
              var handler2 = sinon.spy(function handler2() {});
              var handler3 = sinon.spy(function handler3() {});
              promise.then(handler1);
              promise.then(handler2);
              promise.then(handler3);
              promise.then(function() {
                sinon.assert.callOrder(handler1, handler2, handler3);
                done();
              });
            });
            describe("even when one handler is added inside another handler", function() {
              testFulfilled(dummy, function(promise, done) {
                var handler1 = sinon.spy(function handler1() {});
                var handler2 = sinon.spy(function handler2() {});
                var handler3 = sinon.spy(function handler3() {});
                promise.then(function() {
                  handler1();
                  promise.then(handler3);
                });
                promise.then(handler2);
                promise.then(function() {
                  setTimeout(function() {
                    sinon.assert.callOrder(handler1, handler2, handler3);
                    done();
                  }, 15);
                });
              });
            });
          });
        });
        describe("2.2.6.2: If/when `promise` is rejected, all respective `onRejected` callbacks must execute in the " + "order of their originating calls to `then`.", function() {
          describe("multiple boring rejection handlers", function() {
            testRejected(sentinel, function(promise, done) {
              var handler1 = sinon.stub().returns(other);
              var handler2 = sinon.stub().returns(other);
              var handler3 = sinon.stub().returns(other);
              var spy = sinon.spy();
              promise.then(spy, handler1);
              promise.then(spy, handler2);
              promise.then(spy, handler3);
              promise.then(null, function(reason) {
                assert.strictEqual(reason, sentinel);
                sinon.assert.calledWith(handler1, sinon.match.same(sentinel));
                sinon.assert.calledWith(handler2, sinon.match.same(sentinel));
                sinon.assert.calledWith(handler3, sinon.match.same(sentinel));
                sinon.assert.notCalled(spy);
                done();
              });
            });
          });
          describe("multiple rejection handlers, one of which throws", function() {
            testRejected(sentinel, function(promise, done) {
              var handler1 = sinon.stub().returns(other);
              var handler2 = sinon.stub().throws(other);
              var handler3 = sinon.stub().returns(other);
              var spy = sinon.spy();
              promise.then(spy, handler1);
              promise.then(spy, handler2);
              promise.then(spy, handler3);
              promise.then(null, function(reason) {
                assert.strictEqual(reason, sentinel);
                sinon.assert.calledWith(handler1, sinon.match.same(sentinel));
                sinon.assert.calledWith(handler2, sinon.match.same(sentinel));
                sinon.assert.calledWith(handler3, sinon.match.same(sentinel));
                sinon.assert.notCalled(spy);
                done();
              });
            });
          });
          describe("results in multiple branching chains with their own fulfillment values", function() {
            testRejected(sentinel, function(promise, done) {
              var semiDone = callbackAggregator(3, done);
              promise.then(null, function() {
                return sentinel;
              }).then(function(value) {
                assert.strictEqual(value, sentinel);
                semiDone();
              });
              promise.then(null, function() {
                throw sentinel2;
              }).then(null, function(reason) {
                assert.strictEqual(reason, sentinel2);
                semiDone();
              });
              promise.then(null, function() {
                return sentinel3;
              }).then(function(value) {
                assert.strictEqual(value, sentinel3);
                semiDone();
              });
            });
          });
          describe("`onRejected` handlers are called in the original order", function() {
            testRejected(dummy, function(promise, done) {
              var handler1 = sinon.spy(function handler1() {});
              var handler2 = sinon.spy(function handler2() {});
              var handler3 = sinon.spy(function handler3() {});
              promise.then(null, handler1);
              promise.then(null, handler2);
              promise.then(null, handler3);
              promise.then(null, function() {
                sinon.assert.callOrder(handler1, handler2, handler3);
                done();
              });
            });
            describe("even when one handler is added inside another handler", function() {
              testRejected(dummy, function(promise, done) {
                var handler1 = sinon.spy(function handler1() {});
                var handler2 = sinon.spy(function handler2() {});
                var handler3 = sinon.spy(function handler3() {});
                promise.then(null, function() {
                  handler1();
                  promise.then(null, handler3);
                });
                promise.then(null, handler2);
                promise.then(null, function() {
                  setTimeout(function() {
                    sinon.assert.callOrder(handler1, handler2, handler3);
                    done();
                  }, 15);
                });
              });
            });
          });
        });
      });
    }, {
      "./helpers/testThreeCases": 15,
      "assert": 18,
      "sinon": 32
    }],
    9: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var testFulfilled = require("./helpers/testThreeCases").testFulfilled;
      var testRejected = require("./helpers/testThreeCases").testRejected;
      var reasons = require("./helpers/reasons");
      var adapter = global.adapter;
      var deferred = adapter.deferred;
      var dummy = {dummy: "dummy"};
      var sentinel = {sentinel: "sentinel"};
      var other = {other: "other"};
      describe("2.2.7: `then` must return a promise: `promise2 = promise1.then(onFulfilled, onRejected)`", function() {
        specify("is a promise", function() {
          var promise1 = deferred().promise;
          var promise2 = promise1.then();
          assert(typeof promise2 === "object" || typeof promise2 === "function");
          assert.notStrictEqual(promise2, null);
          assert.strictEqual(typeof promise2.then, "function");
        });
        describe("2.2.7.1: If either `onFulfilled` or `onRejected` returns a value `x`, run the Promise Resolution " + "Procedure `[[Resolve]](promise2, x)`", function() {
          specify("see separate 3.3 tests", function() {});
        });
        describe("2.2.7.2: If either `onFulfilled` or `onRejected` throws an exception `e`, `promise2` must be rejected " + "with `e` as the reason.", function() {
          function testReason(expectedReason, stringRepresentation) {
            describe("The reason is " + stringRepresentation, function() {
              testFulfilled(dummy, function(promise1, done) {
                var promise2 = promise1.then(function onFulfilled() {
                  throw expectedReason;
                });
                promise2.then(null, function onPromise2Rejected(actualReason) {
                  assert.strictEqual(actualReason, expectedReason);
                  done();
                });
              });
              testRejected(dummy, function(promise1, done) {
                var promise2 = promise1.then(null, function onRejected() {
                  throw expectedReason;
                });
                promise2.then(null, function onPromise2Rejected(actualReason) {
                  assert.strictEqual(actualReason, expectedReason);
                  done();
                });
              });
            });
          }
          Object.keys(reasons).forEach(function(stringRepresentation) {
            testReason(reasons[stringRepresentation], stringRepresentation);
          });
        });
        describe("2.2.7.3: If `onFulfilled` is not a function and `promise1` is fulfilled, `promise2` must be fulfilled " + "with the same value.", function() {
          function testNonFunction(nonFunction, stringRepresentation) {
            describe("`onFulfilled` is " + stringRepresentation, function() {
              testFulfilled(sentinel, function(promise1, done) {
                var promise2 = promise1.then(nonFunction);
                promise2.then(function onPromise2Fulfilled(value) {
                  assert.strictEqual(value, sentinel);
                  done();
                });
              });
            });
          }
          testNonFunction(undefined, "`undefined`");
          testNonFunction(null, "`null`");
          testNonFunction(false, "`false`");
          testNonFunction(5, "`5`");
          testNonFunction({}, "an object");
          testNonFunction([function() {
            return other;
          }], "an array containing a function");
        });
        describe("2.2.7.4: If `onRejected` is not a function and `promise1` is rejected, `promise2` must be rejected " + "with the same reason.", function() {
          function testNonFunction(nonFunction, stringRepresentation) {
            describe("`onRejected` is " + stringRepresentation, function() {
              testRejected(sentinel, function(promise1, done) {
                var promise2 = promise1.then(null, nonFunction);
                promise2.then(null, function onPromise2Rejected(reason) {
                  assert.strictEqual(reason, sentinel);
                  done();
                });
              });
            });
          }
          testNonFunction(undefined, "`undefined`");
          testNonFunction(null, "`null`");
          testNonFunction(false, "`false`");
          testNonFunction(5, "`5`");
          testNonFunction({}, "an object");
          testNonFunction([function() {
            return other;
          }], "an array containing a function");
        });
      });
    }, {
      "./helpers/reasons": 14,
      "./helpers/testThreeCases": 15,
      "assert": 18
    }],
    10: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var adapter = global.adapter;
      var resolved = adapter.resolved;
      var rejected = adapter.rejected;
      var dummy = {dummy: "dummy"};
      describe("2.3.1: If `promise` and `x` refer to the same object, reject `promise` with a `TypeError' as the reason.", function() {
        specify("via return from a fulfilled promise", function(done) {
          var promise = resolved(dummy).then(function() {
            return promise;
          });
          promise.then(null, function(reason) {
            assert(reason instanceof TypeError);
            done();
          });
        });
        specify("via return from a rejected promise", function(done) {
          var promise = rejected(dummy).then(null, function() {
            return promise;
          });
          promise.then(null, function(reason) {
            assert(reason instanceof TypeError);
            done();
          });
        });
      });
    }, {"assert": 18}],
    11: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var adapter = global.adapter;
      var resolved = adapter.resolved;
      var rejected = adapter.rejected;
      var deferred = adapter.deferred;
      var dummy = {dummy: "dummy"};
      var sentinel = {sentinel: "sentinel"};
      function testPromiseResolution(xFactory, test) {
        specify("via return from a fulfilled promise", function(done) {
          var promise = resolved(dummy).then(function onBasePromiseFulfilled() {
            return xFactory();
          });
          test(promise, done);
        });
        specify("via return from a rejected promise", function(done) {
          var promise = rejected(dummy).then(null, function onBasePromiseRejected() {
            return xFactory();
          });
          test(promise, done);
        });
      }
      describe("2.3.2: If `x` is a promise, adopt its state", function() {
        describe("2.3.2.1: If `x` is pending, `promise` must remain pending until `x` is fulfilled or rejected.", function() {
          function xFactory() {
            return deferred().promise;
          }
          testPromiseResolution(xFactory, function(promise, done) {
            var wasFulfilled = false;
            var wasRejected = false;
            promise.then(function onPromiseFulfilled() {
              wasFulfilled = true;
            }, function onPromiseRejected() {
              wasRejected = true;
            });
            setTimeout(function() {
              assert.strictEqual(wasFulfilled, false);
              assert.strictEqual(wasRejected, false);
              done();
            }, 100);
          });
        });
        describe("2.3.2.2: If/when `x` is fulfilled, fulfill `promise` with the same value.", function() {
          describe("`x` is already-fulfilled", function() {
            function xFactory() {
              return resolved(sentinel);
            }
            testPromiseResolution(xFactory, function(promise, done) {
              promise.then(function onPromiseFulfilled(value) {
                assert.strictEqual(value, sentinel);
                done();
              });
            });
          });
          describe("`x` is eventually-fulfilled", function() {
            var d = null;
            function xFactory() {
              d = deferred();
              setTimeout(function() {
                d.resolve(sentinel);
              }, 50);
              return d.promise;
            }
            testPromiseResolution(xFactory, function(promise, done) {
              promise.then(function onPromiseFulfilled(value) {
                assert.strictEqual(value, sentinel);
                done();
              });
            });
          });
        });
        describe("2.3.2.3: If/when `x` is rejected, reject `promise` with the same reason.", function() {
          describe("`x` is already-rejected", function() {
            function xFactory() {
              return rejected(sentinel);
            }
            testPromiseResolution(xFactory, function(promise, done) {
              promise.then(null, function onPromiseRejected(reason) {
                assert.strictEqual(reason, sentinel);
                done();
              });
            });
          });
          describe("`x` is eventually-rejected", function() {
            var d = null;
            function xFactory() {
              d = deferred();
              setTimeout(function() {
                d.reject(sentinel);
              }, 50);
              return d.promise;
            }
            testPromiseResolution(xFactory, function(promise, done) {
              promise.then(null, function onPromiseRejected(reason) {
                assert.strictEqual(reason, sentinel);
                done();
              });
            });
          });
        });
      });
    }, {"assert": 18}],
    12: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var thenables = require("./helpers/thenables");
      var reasons = require("./helpers/reasons");
      var adapter = global.adapter;
      var resolved = adapter.resolved;
      var rejected = adapter.rejected;
      var deferred = adapter.deferred;
      var dummy = {dummy: "dummy"};
      var sentinel = {sentinel: "sentinel"};
      var other = {other: "other"};
      var sentinelArray = [sentinel];
      function testPromiseResolution(xFactory, test) {
        specify("via return from a fulfilled promise", function(done) {
          var promise = resolved(dummy).then(function onBasePromiseFulfilled() {
            return xFactory();
          });
          test(promise, done);
        });
        specify("via return from a rejected promise", function(done) {
          var promise = rejected(dummy).then(null, function onBasePromiseRejected() {
            return xFactory();
          });
          test(promise, done);
        });
      }
      function testCallingResolvePromise(yFactory, stringRepresentation, test) {
        describe("`y` is " + stringRepresentation, function() {
          describe("`then` calls `resolvePromise` synchronously", function() {
            function xFactory() {
              return {then: function(resolvePromise) {
                  resolvePromise(yFactory());
                }};
            }
            testPromiseResolution(xFactory, test);
          });
          describe("`then` calls `resolvePromise` asynchronously", function() {
            function xFactory() {
              return {then: function(resolvePromise) {
                  setTimeout(function() {
                    resolvePromise(yFactory());
                  }, 0);
                }};
            }
            testPromiseResolution(xFactory, test);
          });
        });
      }
      function testCallingRejectPromise(r, stringRepresentation, test) {
        describe("`r` is " + stringRepresentation, function() {
          describe("`then` calls `rejectPromise` synchronously", function() {
            function xFactory() {
              return {then: function(resolvePromise, rejectPromise) {
                  rejectPromise(r);
                }};
            }
            testPromiseResolution(xFactory, test);
          });
          describe("`then` calls `rejectPromise` asynchronously", function() {
            function xFactory() {
              return {then: function(resolvePromise, rejectPromise) {
                  setTimeout(function() {
                    rejectPromise(r);
                  }, 0);
                }};
            }
            testPromiseResolution(xFactory, test);
          });
        });
      }
      function testCallingResolvePromiseFulfillsWith(yFactory, stringRepresentation, fulfillmentValue) {
        testCallingResolvePromise(yFactory, stringRepresentation, function(promise, done) {
          promise.then(function onPromiseFulfilled(value) {
            assert.strictEqual(value, fulfillmentValue);
            done();
          });
        });
      }
      function testCallingResolvePromiseRejectsWith(yFactory, stringRepresentation, rejectionReason) {
        testCallingResolvePromise(yFactory, stringRepresentation, function(promise, done) {
          promise.then(null, function onPromiseRejected(reason) {
            assert.strictEqual(reason, rejectionReason);
            done();
          });
        });
      }
      function testCallingRejectPromiseRejectsWith(reason, stringRepresentation) {
        testCallingRejectPromise(reason, stringRepresentation, function(promise, done) {
          promise.then(null, function onPromiseRejected(rejectionReason) {
            assert.strictEqual(rejectionReason, reason);
            done();
          });
        });
      }
      describe("2.3.3: Otherwise, if `x` is an object or function,", function() {
        describe("2.3.3.1: Let `then` be `x.then`", function() {
          describe("`x` is an object with null prototype", function() {
            var numberOfTimesThenWasRetrieved = null;
            beforeEach(function() {
              numberOfTimesThenWasRetrieved = 0;
            });
            function xFactory() {
              return Object.create(null, {then: {get: function() {
                    ++numberOfTimesThenWasRetrieved;
                    return function thenMethodForX(onFulfilled) {
                      onFulfilled();
                    };
                  }}});
            }
            testPromiseResolution(xFactory, function(promise, done) {
              promise.then(function() {
                assert.strictEqual(numberOfTimesThenWasRetrieved, 1);
                done();
              });
            });
          });
          describe("`x` is an object with normal Object.prototype", function() {
            var numberOfTimesThenWasRetrieved = null;
            beforeEach(function() {
              numberOfTimesThenWasRetrieved = 0;
            });
            function xFactory() {
              return Object.create(Object.prototype, {then: {get: function() {
                    ++numberOfTimesThenWasRetrieved;
                    return function thenMethodForX(onFulfilled) {
                      onFulfilled();
                    };
                  }}});
            }
            testPromiseResolution(xFactory, function(promise, done) {
              promise.then(function() {
                assert.strictEqual(numberOfTimesThenWasRetrieved, 1);
                done();
              });
            });
          });
          describe("`x` is a function", function() {
            var numberOfTimesThenWasRetrieved = null;
            beforeEach(function() {
              numberOfTimesThenWasRetrieved = 0;
            });
            function xFactory() {
              function x() {}
              Object.defineProperty(x, "then", {get: function() {
                  ++numberOfTimesThenWasRetrieved;
                  return function thenMethodForX(onFulfilled) {
                    onFulfilled();
                  };
                }});
              return x;
            }
            testPromiseResolution(xFactory, function(promise, done) {
              promise.then(function() {
                assert.strictEqual(numberOfTimesThenWasRetrieved, 1);
                done();
              });
            });
          });
        });
        describe("2.3.3.2: If retrieving the property `x.then` results in a thrown exception `e`, reject `promise` with " + "`e` as the reason.", function() {
          function testRejectionViaThrowingGetter(e, stringRepresentation) {
            function xFactory() {
              return Object.create(Object.prototype, {then: {get: function() {
                    throw e;
                  }}});
            }
            describe("`e` is " + stringRepresentation, function() {
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(null, function(reason) {
                  assert.strictEqual(reason, e);
                  done();
                });
              });
            });
          }
          Object.keys(reasons).forEach(function(stringRepresentation) {
            testRejectionViaThrowingGetter(reasons[stringRepresentation], stringRepresentation);
          });
        });
        describe("2.3.3.3: If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and " + "second argument `rejectPromise`", function() {
          describe("Calls with `x` as `this` and two function arguments", function() {
            function xFactory() {
              var x = {then: function(onFulfilled, onRejected) {
                  assert.strictEqual(this, x);
                  assert.strictEqual(typeof onFulfilled, "function");
                  assert.strictEqual(typeof onRejected, "function");
                  onFulfilled();
                }};
              return x;
            }
            testPromiseResolution(xFactory, function(promise, done) {
              promise.then(function() {
                done();
              });
            });
          });
          describe("Uses the original value of `then`", function() {
            var numberOfTimesThenWasRetrieved = null;
            beforeEach(function() {
              numberOfTimesThenWasRetrieved = 0;
            });
            function xFactory() {
              return Object.create(Object.prototype, {then: {get: function() {
                    if (numberOfTimesThenWasRetrieved === 0) {
                      return function(onFulfilled) {
                        onFulfilled();
                      };
                    }
                    return null;
                  }}});
            }
            testPromiseResolution(xFactory, function(promise, done) {
              promise.then(function() {
                done();
              });
            });
          });
          describe("2.3.3.3.1: If/when `resolvePromise` is called with value `y`, run `[[Resolve]](promise, y)`", function() {
            describe("`y` is not a thenable", function() {
              testCallingResolvePromiseFulfillsWith(function() {
                return undefined;
              }, "`undefined`", undefined);
              testCallingResolvePromiseFulfillsWith(function() {
                return null;
              }, "`null`", null);
              testCallingResolvePromiseFulfillsWith(function() {
                return false;
              }, "`false`", false);
              testCallingResolvePromiseFulfillsWith(function() {
                return 5;
              }, "`5`", 5);
              testCallingResolvePromiseFulfillsWith(function() {
                return sentinel;
              }, "an object", sentinel);
              testCallingResolvePromiseFulfillsWith(function() {
                return sentinelArray;
              }, "an array", sentinelArray);
            });
            describe("`y` is a thenable", function() {
              Object.keys(thenables.fulfilled).forEach(function(stringRepresentation) {
                function yFactory() {
                  return thenables.fulfilled[stringRepresentation](sentinel);
                }
                testCallingResolvePromiseFulfillsWith(yFactory, stringRepresentation, sentinel);
              });
              Object.keys(thenables.rejected).forEach(function(stringRepresentation) {
                function yFactory() {
                  return thenables.rejected[stringRepresentation](sentinel);
                }
                testCallingResolvePromiseRejectsWith(yFactory, stringRepresentation, sentinel);
              });
            });
            describe("`y` is a thenable for a thenable", function() {
              Object.keys(thenables.fulfilled).forEach(function(outerStringRepresentation) {
                var outerThenableFactory = thenables.fulfilled[outerStringRepresentation];
                Object.keys(thenables.fulfilled).forEach(function(innerStringRepresentation) {
                  var innerThenableFactory = thenables.fulfilled[innerStringRepresentation];
                  var stringRepresentation = outerStringRepresentation + " for " + innerStringRepresentation;
                  function yFactory() {
                    return outerThenableFactory(innerThenableFactory(sentinel));
                  }
                  testCallingResolvePromiseFulfillsWith(yFactory, stringRepresentation, sentinel);
                });
                Object.keys(thenables.rejected).forEach(function(innerStringRepresentation) {
                  var innerThenableFactory = thenables.rejected[innerStringRepresentation];
                  var stringRepresentation = outerStringRepresentation + " for " + innerStringRepresentation;
                  function yFactory() {
                    return outerThenableFactory(innerThenableFactory(sentinel));
                  }
                  testCallingResolvePromiseRejectsWith(yFactory, stringRepresentation, sentinel);
                });
              });
            });
          });
          describe("2.3.3.3.2: If/when `rejectPromise` is called with reason `r`, reject `promise` with `r`", function() {
            Object.keys(reasons).forEach(function(stringRepresentation) {
              testCallingRejectPromiseRejectsWith(reasons[stringRepresentation], stringRepresentation);
            });
          });
          describe("2.3.3.3.3: If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same " + "argument are made, the first call takes precedence, and any further calls are ignored.", function() {
            describe("calling `resolvePromise` then `rejectPromise`, both synchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise, rejectPromise) {
                    resolvePromise(sentinel);
                    rejectPromise(other);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(function(value) {
                  assert.strictEqual(value, sentinel);
                  done();
                });
              });
            });
            describe("calling `resolvePromise` synchronously then `rejectPromise` asynchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise, rejectPromise) {
                    resolvePromise(sentinel);
                    setTimeout(function() {
                      rejectPromise(other);
                    }, 0);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(function(value) {
                  assert.strictEqual(value, sentinel);
                  done();
                });
              });
            });
            describe("calling `resolvePromise` then `rejectPromise`, both asynchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise, rejectPromise) {
                    setTimeout(function() {
                      resolvePromise(sentinel);
                    }, 0);
                    setTimeout(function() {
                      rejectPromise(other);
                    }, 0);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(function(value) {
                  assert.strictEqual(value, sentinel);
                  done();
                });
              });
            });
            describe("calling `resolvePromise` with an asynchronously-fulfilled promise, then calling " + "`rejectPromise`, both synchronously", function() {
              function xFactory() {
                var d = deferred();
                setTimeout(function() {
                  d.resolve(sentinel);
                }, 50);
                return {then: function(resolvePromise, rejectPromise) {
                    resolvePromise(d.promise);
                    rejectPromise(other);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(function(value) {
                  assert.strictEqual(value, sentinel);
                  done();
                });
              });
            });
            describe("calling `resolvePromise` with an asynchronously-rejected promise, then calling " + "`rejectPromise`, both synchronously", function() {
              function xFactory() {
                var d = deferred();
                setTimeout(function() {
                  d.reject(sentinel);
                }, 50);
                return {then: function(resolvePromise, rejectPromise) {
                    resolvePromise(d.promise);
                    rejectPromise(other);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(null, function(reason) {
                  assert.strictEqual(reason, sentinel);
                  done();
                });
              });
            });
            describe("calling `rejectPromise` then `resolvePromise`, both synchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise, rejectPromise) {
                    rejectPromise(sentinel);
                    resolvePromise(other);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(null, function(reason) {
                  assert.strictEqual(reason, sentinel);
                  done();
                });
              });
            });
            describe("calling `rejectPromise` synchronously then `resolvePromise` asynchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise, rejectPromise) {
                    rejectPromise(sentinel);
                    setTimeout(function() {
                      resolvePromise(other);
                    }, 0);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(null, function(reason) {
                  assert.strictEqual(reason, sentinel);
                  done();
                });
              });
            });
            describe("calling `rejectPromise` then `resolvePromise`, both asynchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise, rejectPromise) {
                    setTimeout(function() {
                      rejectPromise(sentinel);
                    }, 0);
                    setTimeout(function() {
                      resolvePromise(other);
                    }, 0);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(null, function(reason) {
                  assert.strictEqual(reason, sentinel);
                  done();
                });
              });
            });
            describe("calling `resolvePromise` twice synchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise) {
                    resolvePromise(sentinel);
                    resolvePromise(other);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(function(value) {
                  assert.strictEqual(value, sentinel);
                  done();
                });
              });
            });
            describe("calling `resolvePromise` twice, first synchronously then asynchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise) {
                    resolvePromise(sentinel);
                    setTimeout(function() {
                      resolvePromise(other);
                    }, 0);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(function(value) {
                  assert.strictEqual(value, sentinel);
                  done();
                });
              });
            });
            describe("calling `resolvePromise` twice, both times asynchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise) {
                    setTimeout(function() {
                      resolvePromise(sentinel);
                    }, 0);
                    setTimeout(function() {
                      resolvePromise(other);
                    }, 0);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(function(value) {
                  assert.strictEqual(value, sentinel);
                  done();
                });
              });
            });
            describe("calling `resolvePromise` with an asynchronously-fulfilled promise, then calling it again, both " + "times synchronously", function() {
              function xFactory() {
                var d = deferred();
                setTimeout(function() {
                  d.resolve(sentinel);
                }, 50);
                return {then: function(resolvePromise) {
                    resolvePromise(d.promise);
                    resolvePromise(other);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(function(value) {
                  assert.strictEqual(value, sentinel);
                  done();
                });
              });
            });
            describe("calling `resolvePromise` with an asynchronously-rejected promise, then calling it again, both " + "times synchronously", function() {
              function xFactory() {
                var d = deferred();
                setTimeout(function() {
                  d.reject(sentinel);
                }, 50);
                return {then: function(resolvePromise) {
                    resolvePromise(d.promise);
                    resolvePromise(other);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(null, function(reason) {
                  assert.strictEqual(reason, sentinel);
                  done();
                });
              });
            });
            describe("calling `rejectPromise` twice synchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise, rejectPromise) {
                    rejectPromise(sentinel);
                    rejectPromise(other);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(null, function(reason) {
                  assert.strictEqual(reason, sentinel);
                  done();
                });
              });
            });
            describe("calling `rejectPromise` twice, first synchronously then asynchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise, rejectPromise) {
                    rejectPromise(sentinel);
                    setTimeout(function() {
                      rejectPromise(other);
                    }, 0);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(null, function(reason) {
                  assert.strictEqual(reason, sentinel);
                  done();
                });
              });
            });
            describe("calling `rejectPromise` twice, both times asynchronously", function() {
              function xFactory() {
                return {then: function(resolvePromise, rejectPromise) {
                    setTimeout(function() {
                      rejectPromise(sentinel);
                    }, 0);
                    setTimeout(function() {
                      rejectPromise(other);
                    }, 0);
                  }};
              }
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(null, function(reason) {
                  assert.strictEqual(reason, sentinel);
                  done();
                });
              });
            });
            describe("saving and abusing `resolvePromise` and `rejectPromise`", function() {
              var savedResolvePromise,
                  savedRejectPromise;
              function xFactory() {
                return {then: function(resolvePromise, rejectPromise) {
                    savedResolvePromise = resolvePromise;
                    savedRejectPromise = rejectPromise;
                  }};
              }
              beforeEach(function() {
                savedResolvePromise = null;
                savedRejectPromise = null;
              });
              testPromiseResolution(xFactory, function(promise, done) {
                var timesFulfilled = 0;
                var timesRejected = 0;
                promise.then(function() {
                  ++timesFulfilled;
                }, function() {
                  ++timesRejected;
                });
                if (savedResolvePromise && savedRejectPromise) {
                  savedResolvePromise(dummy);
                  savedResolvePromise(dummy);
                  savedRejectPromise(dummy);
                  savedRejectPromise(dummy);
                }
                setTimeout(function() {
                  savedResolvePromise(dummy);
                  savedResolvePromise(dummy);
                  savedRejectPromise(dummy);
                  savedRejectPromise(dummy);
                }, 50);
                setTimeout(function() {
                  assert.strictEqual(timesFulfilled, 1);
                  assert.strictEqual(timesRejected, 0);
                  done();
                }, 100);
              });
            });
          });
          describe("2.3.3.3.4: If calling `then` throws an exception `e`,", function() {
            describe("2.3.3.3.4.1: If `resolvePromise` or `rejectPromise` have been called, ignore it.", function() {
              describe("`resolvePromise` was called with a non-thenable", function() {
                function xFactory() {
                  return {then: function(resolvePromise) {
                      resolvePromise(sentinel);
                      throw other;
                    }};
                }
                testPromiseResolution(xFactory, function(promise, done) {
                  promise.then(function(value) {
                    assert.strictEqual(value, sentinel);
                    done();
                  });
                });
              });
              describe("`resolvePromise` was called with an asynchronously-fulfilled promise", function() {
                function xFactory() {
                  var d = deferred();
                  setTimeout(function() {
                    d.resolve(sentinel);
                  }, 50);
                  return {then: function(resolvePromise) {
                      resolvePromise(d.promise);
                      throw other;
                    }};
                }
                testPromiseResolution(xFactory, function(promise, done) {
                  promise.then(function(value) {
                    assert.strictEqual(value, sentinel);
                    done();
                  });
                });
              });
              describe("`resolvePromise` was called with an asynchronously-rejected promise", function() {
                function xFactory() {
                  var d = deferred();
                  setTimeout(function() {
                    d.reject(sentinel);
                  }, 50);
                  return {then: function(resolvePromise) {
                      resolvePromise(d.promise);
                      throw other;
                    }};
                }
                testPromiseResolution(xFactory, function(promise, done) {
                  promise.then(null, function(reason) {
                    assert.strictEqual(reason, sentinel);
                    done();
                  });
                });
              });
              describe("`rejectPromise` was called", function() {
                function xFactory() {
                  return {then: function(resolvePromise, rejectPromise) {
                      rejectPromise(sentinel);
                      throw other;
                    }};
                }
                testPromiseResolution(xFactory, function(promise, done) {
                  promise.then(null, function(reason) {
                    assert.strictEqual(reason, sentinel);
                    done();
                  });
                });
              });
              describe("`resolvePromise` then `rejectPromise` were called", function() {
                function xFactory() {
                  return {then: function(resolvePromise, rejectPromise) {
                      resolvePromise(sentinel);
                      rejectPromise(other);
                      throw other;
                    }};
                }
                testPromiseResolution(xFactory, function(promise, done) {
                  promise.then(function(value) {
                    assert.strictEqual(value, sentinel);
                    done();
                  });
                });
              });
              describe("`rejectPromise` then `resolvePromise` were called", function() {
                function xFactory() {
                  return {then: function(resolvePromise, rejectPromise) {
                      rejectPromise(sentinel);
                      resolvePromise(other);
                      throw other;
                    }};
                }
                testPromiseResolution(xFactory, function(promise, done) {
                  promise.then(null, function(reason) {
                    assert.strictEqual(reason, sentinel);
                    done();
                  });
                });
              });
            });
            describe("2.3.3.3.4.2: Otherwise, reject `promise` with `e` as the reason.", function() {
              describe("straightforward case", function() {
                function xFactory() {
                  return {then: function() {
                      throw sentinel;
                    }};
                }
                testPromiseResolution(xFactory, function(promise, done) {
                  promise.then(null, function(reason) {
                    assert.strictEqual(reason, sentinel);
                    done();
                  });
                });
              });
              describe("`resolvePromise` is called asynchronously before the `throw`", function() {
                function xFactory() {
                  return {then: function(resolvePromise) {
                      setTimeout(function() {
                        resolvePromise(other);
                      }, 0);
                      throw sentinel;
                    }};
                }
                testPromiseResolution(xFactory, function(promise, done) {
                  promise.then(null, function(reason) {
                    assert.strictEqual(reason, sentinel);
                    done();
                  });
                });
              });
              describe("`rejectPromise` is called asynchronously before the `throw`", function() {
                function xFactory() {
                  return {then: function(resolvePromise, rejectPromise) {
                      setTimeout(function() {
                        rejectPromise(other);
                      }, 0);
                      throw sentinel;
                    }};
                }
                testPromiseResolution(xFactory, function(promise, done) {
                  promise.then(null, function(reason) {
                    assert.strictEqual(reason, sentinel);
                    done();
                  });
                });
              });
            });
          });
        });
        describe("2.3.3.4: If `then` is not a function, fulfill promise with `x`", function() {
          function testFulfillViaNonFunction(then, stringRepresentation) {
            var x = null;
            beforeEach(function() {
              x = {then: then};
            });
            function xFactory() {
              return x;
            }
            describe("`then` is " + stringRepresentation, function() {
              testPromiseResolution(xFactory, function(promise, done) {
                promise.then(function(value) {
                  assert.strictEqual(value, x);
                  done();
                });
              });
            });
          }
          testFulfillViaNonFunction(5, "`5`");
          testFulfillViaNonFunction({}, "an object");
          testFulfillViaNonFunction([function() {}], "an array containing a function");
          testFulfillViaNonFunction(/a-b/i, "a regular expression");
          testFulfillViaNonFunction(Object.create(Function.prototype), "an object inheriting from `Function.prototype`");
        });
      });
    }, {
      "./helpers/reasons": 14,
      "./helpers/thenables": 16,
      "assert": 18
    }],
    13: [function(require, module, exports) {
      "use strict";
      var assert = require("github:jspm/nodelibs@0.0.8/assert");
      var testFulfilled = require("./helpers/testThreeCases").testFulfilled;
      var testRejected = require("./helpers/testThreeCases").testRejected;
      var dummy = {dummy: "dummy"};
      describe("2.3.4: If `x` is not an object or function, fulfill `promise` with `x`", function() {
        function testValue(expectedValue, stringRepresentation, beforeEachHook, afterEachHook) {
          describe("The value is " + stringRepresentation, function() {
            if (typeof beforeEachHook === "function") {
              beforeEach(beforeEachHook);
            }
            if (typeof afterEachHook === "function") {
              afterEach(afterEachHook);
            }
            testFulfilled(dummy, function(promise1, done) {
              var promise2 = promise1.then(function onFulfilled() {
                return expectedValue;
              });
              promise2.then(function onPromise2Fulfilled(actualValue) {
                assert.strictEqual(actualValue, expectedValue);
                done();
              });
            });
            testRejected(dummy, function(promise1, done) {
              var promise2 = promise1.then(null, function onRejected() {
                return expectedValue;
              });
              promise2.then(function onPromise2Fulfilled(actualValue) {
                assert.strictEqual(actualValue, expectedValue);
                done();
              });
            });
          });
        }
        testValue(undefined, "`undefined`");
        testValue(null, "`null`");
        testValue(false, "`false`");
        testValue(true, "`true`");
        testValue(0, "`0`");
        testValue(true, "`true` with `Boolean.prototype` modified to have a `then` method", function() {
          Boolean.prototype.then = function() {};
        }, function() {
          delete Boolean.prototype.then;
        });
        testValue(1, "`1` with `Number.prototype` modified to have a `then` method", function() {
          Number.prototype.then = function() {};
        }, function() {
          delete Number.prototype.then;
        });
      });
    }, {
      "./helpers/testThreeCases": 15,
      "assert": 18
    }],
    14: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var adapter = global.adapter;
      var resolved = adapter.resolved;
      var rejected = adapter.rejected;
      var dummy = {dummy: "dummy"};
      exports["`undefined`"] = function() {
        return undefined;
      };
      exports["`null`"] = function() {
        return null;
      };
      exports["`false`"] = function() {
        return false;
      };
      exports["`0`"] = function() {
        return 0;
      };
      exports["an error"] = function() {
        return new Error();
      };
      exports["an error without a stack"] = function() {
        var error = new Error();
        delete error.stack;
        return error;
      };
      exports["a date"] = function() {
        return new Date();
      };
      exports["an object"] = function() {
        return {};
      };
      exports["an always-pending thenable"] = function() {
        return {then: function() {}};
      };
      exports["a fulfilled promise"] = function() {
        return resolved(dummy);
      };
      exports["a rejected promise"] = function() {
        return rejected(dummy);
      };
    }, {}],
    15: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var adapter = global.adapter;
      var resolved = adapter.resolved;
      var rejected = adapter.rejected;
      var deferred = adapter.deferred;
      exports.testFulfilled = function(value, test) {
        specify("already-fulfilled", function(done) {
          test(resolved(value), done);
        });
        specify("immediately-fulfilled", function(done) {
          var d = deferred();
          test(d.promise, done);
          d.resolve(value);
        });
        specify("eventually-fulfilled", function(done) {
          var d = deferred();
          test(d.promise, done);
          setTimeout(function() {
            d.resolve(value);
          }, 50);
        });
      };
      exports.testRejected = function(reason, test) {
        specify("already-rejected", function(done) {
          test(rejected(reason), done);
        });
        specify("immediately-rejected", function(done) {
          var d = deferred();
          test(d.promise, done);
          d.reject(reason);
        });
        specify("eventually-rejected", function(done) {
          var d = deferred();
          test(d.promise, done);
          setTimeout(function() {
            d.reject(reason);
          }, 50);
        });
      };
    }, {}],
    16: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      var adapter = global.adapter;
      var resolved = adapter.resolved;
      var rejected = adapter.rejected;
      var deferred = adapter.deferred;
      var other = {other: "other"};
      exports.fulfilled = {
        "a synchronously-fulfilled custom thenable": function(value) {
          return {then: function(onFulfilled) {
              onFulfilled(value);
            }};
        },
        "an asynchronously-fulfilled custom thenable": function(value) {
          return {then: function(onFulfilled) {
              setTimeout(function() {
                onFulfilled(value);
              }, 0);
            }};
        },
        "a synchronously-fulfilled one-time thenable": function(value) {
          var numberOfTimesThenRetrieved = 0;
          return Object.create(null, {then: {get: function() {
                if (numberOfTimesThenRetrieved === 0) {
                  ++numberOfTimesThenRetrieved;
                  return function(onFulfilled) {
                    onFulfilled(value);
                  };
                }
                return null;
              }}});
        },
        "a thenable that tries to fulfill twice": function(value) {
          return {then: function(onFulfilled) {
              onFulfilled(value);
              onFulfilled(other);
            }};
        },
        "a thenable that fulfills but then throws": function(value) {
          return {then: function(onFulfilled) {
              onFulfilled(value);
              throw other;
            }};
        },
        "an already-fulfilled promise": function(value) {
          return resolved(value);
        },
        "an eventually-fulfilled promise": function(value) {
          var d = deferred();
          setTimeout(function() {
            d.resolve(value);
          }, 50);
          return d.promise;
        }
      };
      exports.rejected = {
        "a synchronously-rejected custom thenable": function(reason) {
          return {then: function(onFulfilled, onRejected) {
              onRejected(reason);
            }};
        },
        "an asynchronously-rejected custom thenable": function(reason) {
          return {then: function(onFulfilled, onRejected) {
              setTimeout(function() {
                onRejected(reason);
              }, 0);
            }};
        },
        "a synchronously-rejected one-time thenable": function(reason) {
          var numberOfTimesThenRetrieved = 0;
          return Object.create(null, {then: {get: function() {
                if (numberOfTimesThenRetrieved === 0) {
                  ++numberOfTimesThenRetrieved;
                  return function(onFulfilled, onRejected) {
                    onRejected(reason);
                  };
                }
                return null;
              }}});
        },
        "a thenable that immediately throws in `then`": function(reason) {
          return {then: function() {
              throw reason;
            }};
        },
        "an object with a throwing `then` accessor": function(reason) {
          return Object.create(null, {then: {get: function() {
                throw reason;
              }}});
        },
        "an already-rejected promise": function(reason) {
          return rejected(reason);
        },
        "an eventually-rejected promise": function(reason) {
          var d = deferred();
          setTimeout(function() {
            d.reject(reason);
          }, 50);
          return d.promise;
        }
      };
    }, {}],
    17: [function(require, module, exports) {
      var toString = Object.prototype.toString;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      function isArray(xs) {
        return toString.call(xs) === '[object Array]';
      }
      exports.isArray = typeof Array.isArray === 'function' ? Array.isArray : isArray;
      exports.indexOf = function indexOf(xs, x) {
        if (xs.indexOf)
          return xs.indexOf(x);
        for (var i = 0; i < xs.length; i++) {
          if (x === xs[i])
            return i;
        }
        return -1;
      };
      exports.filter = function filter(xs, fn) {
        if (xs.filter)
          return xs.filter(fn);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          if (fn(xs[i], i, xs))
            res.push(xs[i]);
        }
        return res;
      };
      exports.forEach = function forEach(xs, fn, self) {
        if (xs.forEach)
          return xs.forEach(fn, self);
        for (var i = 0; i < xs.length; i++) {
          fn.call(self, xs[i], i, xs);
        }
      };
      exports.map = function map(xs, fn) {
        if (xs.map)
          return xs.map(fn);
        var out = new Array(xs.length);
        for (var i = 0; i < xs.length; i++) {
          out[i] = fn(xs[i], i, xs);
        }
        return out;
      };
      exports.reduce = function reduce(array, callback, opt_initialValue) {
        if (array.reduce)
          return array.reduce(callback, opt_initialValue);
        var value,
            isValueSet = false;
        if (2 < arguments.length) {
          value = opt_initialValue;
          isValueSet = true;
        }
        for (var i = 0,
            l = array.length; l > i; ++i) {
          if (array.hasOwnProperty(i)) {
            if (isValueSet) {
              value = callback(value, array[i], i, array);
            } else {
              value = array[i];
              isValueSet = true;
            }
          }
        }
        return value;
      };
      if ('ab'.substr(-1) !== 'b') {
        exports.substr = function(str, start, length) {
          if (start < 0)
            start = str.length + start;
          return str.substr(start, length);
        };
      } else {
        exports.substr = function(str, start, length) {
          return str.substr(start, length);
        };
      }
      exports.trim = function(str) {
        if (str.trim)
          return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      };
      exports.bind = function() {
        var args = Array.prototype.slice.call(arguments);
        var fn = args.shift();
        if (fn.bind)
          return fn.bind.apply(fn, args);
        var self = args.shift();
        return function() {
          fn.apply(self, args.concat([Array.prototype.slice.call(arguments)]));
        };
      };
      function create(prototype, properties) {
        var object;
        if (prototype === null) {
          object = {'__proto__': null};
        } else {
          if (typeof prototype !== 'object') {
            throw new TypeError('typeof prototype[' + (typeof prototype) + '] != \'object\'');
          }
          var Type = function() {};
          Type.prototype = prototype;
          object = new Type();
          object.__proto__ = prototype;
        }
        if (typeof properties !== 'undefined' && Object.defineProperties) {
          Object.defineProperties(object, properties);
        }
        return object;
      }
      exports.create = typeof Object.create === 'function' ? Object.create : create;
      function notObject(object) {
        return ((typeof object != "object" && typeof object != "function") || object === null);
      }
      function keysShim(object) {
        if (notObject(object)) {
          throw new TypeError("Object.keys called on a non-object");
        }
        var result = [];
        for (var name in object) {
          if (hasOwnProperty.call(object, name)) {
            result.push(name);
          }
        }
        return result;
      }
      function propertyShim(object) {
        if (notObject(object)) {
          throw new TypeError("Object.getOwnPropertyNames called on a non-object");
        }
        var result = keysShim(object);
        if (exports.isArray(object) && exports.indexOf(object, 'length') === -1) {
          result.push('length');
        }
        return result;
      }
      var keys = typeof Object.keys === 'function' ? Object.keys : keysShim;
      var getOwnPropertyNames = typeof Object.getOwnPropertyNames === 'function' ? Object.getOwnPropertyNames : propertyShim;
      if (new Error().hasOwnProperty('description')) {
        var ERROR_PROPERTY_FILTER = function(obj, array) {
          if (toString.call(obj) === '[object Error]') {
            array = exports.filter(array, function(name) {
              return name !== 'description' && name !== 'number' && name !== 'message';
            });
          }
          return array;
        };
        exports.keys = function(object) {
          return ERROR_PROPERTY_FILTER(object, keys(object));
        };
        exports.getOwnPropertyNames = function(object) {
          return ERROR_PROPERTY_FILTER(object, getOwnPropertyNames(object));
        };
      } else {
        exports.keys = keys;
        exports.getOwnPropertyNames = getOwnPropertyNames;
      }
      function valueObject(value, key) {
        return {value: value[key]};
      }
      if (typeof Object.getOwnPropertyDescriptor === 'function') {
        try {
          Object.getOwnPropertyDescriptor({'a': 1}, 'a');
          exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        } catch (e) {
          exports.getOwnPropertyDescriptor = function(value, key) {
            try {
              return Object.getOwnPropertyDescriptor(value, key);
            } catch (e) {
              return valueObject(value, key);
            }
          };
        }
      } else {
        exports.getOwnPropertyDescriptor = valueObject;
      }
    }, {}],
    18: [function(require, module, exports) {
      var util = require("github:jspm/nodelibs@0.0.8/util");
      var shims = require("_shims");
      var pSlice = Array.prototype.slice;
      var assert = module.exports = ok;
      assert.AssertionError = function AssertionError(options) {
        this.name = 'AssertionError';
        this.actual = options.actual;
        this.expected = options.expected;
        this.operator = options.operator;
        this.message = options.message || getMessage(this);
      };
      util.inherits(assert.AssertionError, Error);
      function replacer(key, value) {
        if (util.isUndefined(value)) {
          return '' + value;
        }
        if (util.isNumber(value) && (isNaN(value) || !isFinite(value))) {
          return value.toString();
        }
        if (util.isFunction(value) || util.isRegExp(value)) {
          return value.toString();
        }
        return value;
      }
      function truncate(s, n) {
        if (util.isString(s)) {
          return s.length < n ? s : s.slice(0, n);
        } else {
          return s;
        }
      }
      function getMessage(self) {
        return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' + self.operator + ' ' + truncate(JSON.stringify(self.expected, replacer), 128);
      }
      function fail(actual, expected, message, operator, stackStartFunction) {
        throw new assert.AssertionError({
          message: message,
          actual: actual,
          expected: expected,
          operator: operator,
          stackStartFunction: stackStartFunction
        });
      }
      assert.fail = fail;
      function ok(value, message) {
        if (!value)
          fail(value, true, message, '==', assert.ok);
      }
      assert.ok = ok;
      assert.equal = function equal(actual, expected, message) {
        if (actual != expected)
          fail(actual, expected, message, '==', assert.equal);
      };
      assert.notEqual = function notEqual(actual, expected, message) {
        if (actual == expected) {
          fail(actual, expected, message, '!=', assert.notEqual);
        }
      };
      assert.deepEqual = function deepEqual(actual, expected, message) {
        if (!_deepEqual(actual, expected)) {
          fail(actual, expected, message, 'deepEqual', assert.deepEqual);
        }
      };
      function _deepEqual(actual, expected) {
        if (actual === expected) {
          return true;
        } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
          if (actual.length != expected.length)
            return false;
          for (var i = 0; i < actual.length; i++) {
            if (actual[i] !== expected[i])
              return false;
          }
          return true;
        } else if (util.isDate(actual) && util.isDate(expected)) {
          return actual.getTime() === expected.getTime();
        } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
          return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;
        } else if (!util.isObject(actual) && !util.isObject(expected)) {
          return actual == expected;
        } else {
          return objEquiv(actual, expected);
        }
      }
      function isArguments(object) {
        return Object.prototype.toString.call(object) == '[object Arguments]';
      }
      function objEquiv(a, b) {
        if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b))
          return false;
        if (a.prototype !== b.prototype)
          return false;
        if (isArguments(a)) {
          if (!isArguments(b)) {
            return false;
          }
          a = pSlice.call(a);
          b = pSlice.call(b);
          return _deepEqual(a, b);
        }
        try {
          var ka = shims.keys(a),
              kb = shims.keys(b),
              key,
              i;
        } catch (e) {
          return false;
        }
        if (ka.length != kb.length)
          return false;
        ka.sort();
        kb.sort();
        for (i = ka.length - 1; i >= 0; i--) {
          if (ka[i] != kb[i])
            return false;
        }
        for (i = ka.length - 1; i >= 0; i--) {
          key = ka[i];
          if (!_deepEqual(a[key], b[key]))
            return false;
        }
        return true;
      }
      assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
        if (_deepEqual(actual, expected)) {
          fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
        }
      };
      assert.strictEqual = function strictEqual(actual, expected, message) {
        if (actual !== expected) {
          fail(actual, expected, message, '===', assert.strictEqual);
        }
      };
      assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
        if (actual === expected) {
          fail(actual, expected, message, '!==', assert.notStrictEqual);
        }
      };
      function expectedException(actual, expected) {
        if (!actual || !expected) {
          return false;
        }
        if (Object.prototype.toString.call(expected) == '[object RegExp]') {
          return expected.test(actual);
        } else if (actual instanceof expected) {
          return true;
        } else if (expected.call({}, actual) === true) {
          return true;
        }
        return false;
      }
      function _throws(shouldThrow, block, expected, message) {
        var actual;
        if (util.isString(expected)) {
          message = expected;
          expected = null;
        }
        try {
          block();
        } catch (e) {
          actual = e;
        }
        message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');
        if (shouldThrow && !actual) {
          fail(actual, expected, 'Missing expected exception' + message);
        }
        if (!shouldThrow && expectedException(actual, expected)) {
          fail(actual, expected, 'Got unwanted exception' + message);
        }
        if ((shouldThrow && actual && expected && !expectedException(actual, expected)) || (!shouldThrow && actual)) {
          throw actual;
        }
      }
      assert.throws = function(block, error, message) {
        _throws.apply(this, [true].concat(pSlice.call(arguments)));
      };
      assert.doesNotThrow = function(block, message) {
        _throws.apply(this, [false].concat(pSlice.call(arguments)));
      };
      assert.ifError = function(err) {
        if (err) {
          throw err;
        }
      };
    }, {
      "_shims": 17,
      "util": 21
    }],
    19: [function(require, module, exports) {}, {}],
    20: [function(require, module, exports) {
      var process = require("__browserify_process");
      var util = require("github:jspm/nodelibs@0.0.8/util");
      var shims = require("_shims");
      function normalizeArray(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      }
      var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
      var splitPath = function(filename) {
        return splitPathRe.exec(filename).slice(1);
      };
      exports.resolve = function() {
        var resolvedPath = '',
            resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : process.cwd();
          if (!util.isString(path)) {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            continue;
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        resolvedPath = normalizeArray(shims.filter(resolvedPath.split('/'), function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      };
      exports.normalize = function(path) {
        var isAbsolute = exports.isAbsolute(path),
            trailingSlash = shims.substr(path, -1) === '/';
        path = normalizeArray(shims.filter(path.split('/'), function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      };
      exports.isAbsolute = function(path) {
        return path.charAt(0) === '/';
      };
      exports.join = function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return exports.normalize(shims.filter(paths, function(p, index) {
          if (!util.isString(p)) {
            throw new TypeError('Arguments to path.join must be strings');
          }
          return p;
        }).join('/'));
      };
      exports.relative = function(from, to) {
        from = exports.resolve(from).substr(1);
        to = exports.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '')
              break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '')
              break;
          }
          if (start > end)
            return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      };
      exports.sep = '/';
      exports.delimiter = ':';
      exports.dirname = function(path) {
        var result = splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          return '.';
        }
        if (dir) {
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      };
      exports.basename = function(path, ext) {
        var f = splitPath(path)[2];
        if (ext && f.substr(-1 * ext.length) === ext) {
          f = f.substr(0, f.length - ext.length);
        }
        return f;
      };
      exports.extname = function(path) {
        return splitPath(path)[3];
      };
    }, {
      "__browserify_process": 31,
      "_shims": 17,
      "util": 21
    }],
    21: [function(require, module, exports) {
      var shims = require("_shims");
      var formatRegExp = /%[sdj%]/g;
      exports.format = function(f) {
        if (!isString(f)) {
          var objects = [];
          for (var i = 0; i < arguments.length; i++) {
            objects.push(inspect(arguments[i]));
          }
          return objects.join(' ');
        }
        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(formatRegExp, function(x) {
          if (x === '%%')
            return '%';
          if (i >= len)
            return x;
          switch (x) {
            case '%s':
              return String(args[i++]);
            case '%d':
              return Number(args[i++]);
            case '%j':
              try {
                return JSON.stringify(args[i++]);
              } catch (_) {
                return '[Circular]';
              }
            default:
              return x;
          }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
          if (isNull(x) || !isObject(x)) {
            str += ' ' + x;
          } else {
            str += ' ' + inspect(x);
          }
        }
        return str;
      };
      function inspect(obj, opts) {
        var ctx = {
          seen: [],
          stylize: stylizeNoColor
        };
        if (arguments.length >= 3)
          ctx.depth = arguments[2];
        if (arguments.length >= 4)
          ctx.colors = arguments[3];
        if (isBoolean(opts)) {
          ctx.showHidden = opts;
        } else if (opts) {
          exports._extend(ctx, opts);
        }
        if (isUndefined(ctx.showHidden))
          ctx.showHidden = false;
        if (isUndefined(ctx.depth))
          ctx.depth = 2;
        if (isUndefined(ctx.colors))
          ctx.colors = false;
        if (isUndefined(ctx.customInspect))
          ctx.customInspect = true;
        if (ctx.colors)
          ctx.stylize = stylizeWithColor;
        return formatValue(ctx, obj, ctx.depth);
      }
      exports.inspect = inspect;
      inspect.colors = {
        'bold': [1, 22],
        'italic': [3, 23],
        'underline': [4, 24],
        'inverse': [7, 27],
        'white': [37, 39],
        'grey': [90, 39],
        'black': [30, 39],
        'blue': [34, 39],
        'cyan': [36, 39],
        'green': [32, 39],
        'magenta': [35, 39],
        'red': [31, 39],
        'yellow': [33, 39]
      };
      inspect.styles = {
        'special': 'cyan',
        'number': 'yellow',
        'boolean': 'yellow',
        'undefined': 'grey',
        'null': 'bold',
        'string': 'green',
        'date': 'magenta',
        'regexp': 'red'
      };
      function stylizeWithColor(str, styleType) {
        var style = inspect.styles[styleType];
        if (style) {
          return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
        } else {
          return str;
        }
      }
      function stylizeNoColor(str, styleType) {
        return str;
      }
      function arrayToHash(array) {
        var hash = {};
        shims.forEach(array, function(val, idx) {
          hash[val] = true;
        });
        return hash;
      }
      function formatValue(ctx, value, recurseTimes) {
        if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
          var ret = value.inspect(recurseTimes);
          if (!isString(ret)) {
            ret = formatValue(ctx, ret, recurseTimes);
          }
          return ret;
        }
        var primitive = formatPrimitive(ctx, value);
        if (primitive) {
          return primitive;
        }
        var keys = shims.keys(value);
        var visibleKeys = arrayToHash(keys);
        if (ctx.showHidden) {
          keys = shims.getOwnPropertyNames(value);
        }
        if (keys.length === 0) {
          if (isFunction(value)) {
            var name = value.name ? ': ' + value.name : '';
            return ctx.stylize('[Function' + name + ']', 'special');
          }
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
          }
          if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), 'date');
          }
          if (isError(value)) {
            return formatError(value);
          }
        }
        var base = '',
            array = false,
            braces = ['{', '}'];
        if (isArray(value)) {
          array = true;
          braces = ['[', ']'];
        }
        if (isFunction(value)) {
          var n = value.name ? ': ' + value.name : '';
          base = ' [Function' + n + ']';
        }
        if (isRegExp(value)) {
          base = ' ' + RegExp.prototype.toString.call(value);
        }
        if (isDate(value)) {
          base = ' ' + Date.prototype.toUTCString.call(value);
        }
        if (isError(value)) {
          base = ' ' + formatError(value);
        }
        if (keys.length === 0 && (!array || value.length == 0)) {
          return braces[0] + base + braces[1];
        }
        if (recurseTimes < 0) {
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
          } else {
            return ctx.stylize('[Object]', 'special');
          }
        }
        ctx.seen.push(value);
        var output;
        if (array) {
          output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
        } else {
          output = keys.map(function(key) {
            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
          });
        }
        ctx.seen.pop();
        return reduceToSingleString(output, base, braces);
      }
      function formatPrimitive(ctx, value) {
        if (isUndefined(value))
          return ctx.stylize('undefined', 'undefined');
        if (isString(value)) {
          var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
          return ctx.stylize(simple, 'string');
        }
        if (isNumber(value))
          return ctx.stylize('' + value, 'number');
        if (isBoolean(value))
          return ctx.stylize('' + value, 'boolean');
        if (isNull(value))
          return ctx.stylize('null', 'null');
      }
      function formatError(value) {
        return '[' + Error.prototype.toString.call(value) + ']';
      }
      function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
        var output = [];
        for (var i = 0,
            l = value.length; i < l; ++i) {
          if (hasOwnProperty(value, String(i))) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
          } else {
            output.push('');
          }
        }
        shims.forEach(keys, function(key) {
          if (!key.match(/^\d+$/)) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
          }
        });
        return output;
      }
      function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
        var name,
            str,
            desc;
        desc = shims.getOwnPropertyDescriptor(value, key) || {value: value[key]};
        if (desc.get) {
          if (desc.set) {
            str = ctx.stylize('[Getter/Setter]', 'special');
          } else {
            str = ctx.stylize('[Getter]', 'special');
          }
        } else {
          if (desc.set) {
            str = ctx.stylize('[Setter]', 'special');
          }
        }
        if (!hasOwnProperty(visibleKeys, key)) {
          name = '[' + key + ']';
        }
        if (!str) {
          if (shims.indexOf(ctx.seen, desc.value) < 0) {
            if (isNull(recurseTimes)) {
              str = formatValue(ctx, desc.value, null);
            } else {
              str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf('\n') > -1) {
              if (array) {
                str = str.split('\n').map(function(line) {
                  return '  ' + line;
                }).join('\n').substr(2);
              } else {
                str = '\n' + str.split('\n').map(function(line) {
                  return '   ' + line;
                }).join('\n');
              }
            }
          } else {
            str = ctx.stylize('[Circular]', 'special');
          }
        }
        if (isUndefined(name)) {
          if (array && key.match(/^\d+$/)) {
            return str;
          }
          name = JSON.stringify('' + key);
          if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.substr(1, name.length - 2);
            name = ctx.stylize(name, 'name');
          } else {
            name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name = ctx.stylize(name, 'string');
          }
        }
        return name + ': ' + str;
      }
      function reduceToSingleString(output, base, braces) {
        var numLinesEst = 0;
        var length = shims.reduce(output, function(prev, cur) {
          numLinesEst++;
          if (cur.indexOf('\n') >= 0)
            numLinesEst++;
          return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
        }, 0);
        if (length > 60) {
          return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
        }
        return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
      }
      function isArray(ar) {
        return shims.isArray(ar);
      }
      exports.isArray = isArray;
      function isBoolean(arg) {
        return typeof arg === 'boolean';
      }
      exports.isBoolean = isBoolean;
      function isNull(arg) {
        return arg === null;
      }
      exports.isNull = isNull;
      function isNullOrUndefined(arg) {
        return arg == null;
      }
      exports.isNullOrUndefined = isNullOrUndefined;
      function isNumber(arg) {
        return typeof arg === 'number';
      }
      exports.isNumber = isNumber;
      function isString(arg) {
        return typeof arg === 'string';
      }
      exports.isString = isString;
      function isSymbol(arg) {
        return typeof arg === 'symbol';
      }
      exports.isSymbol = isSymbol;
      function isUndefined(arg) {
        return arg === void 0;
      }
      exports.isUndefined = isUndefined;
      function isRegExp(re) {
        return isObject(re) && objectToString(re) === '[object RegExp]';
      }
      exports.isRegExp = isRegExp;
      function isObject(arg) {
        return typeof arg === 'object' && arg;
      }
      exports.isObject = isObject;
      function isDate(d) {
        return isObject(d) && objectToString(d) === '[object Date]';
      }
      exports.isDate = isDate;
      function isError(e) {
        return isObject(e) && objectToString(e) === '[object Error]';
      }
      exports.isError = isError;
      function isFunction(arg) {
        return typeof arg === 'function';
      }
      exports.isFunction = isFunction;
      function isPrimitive(arg) {
        return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || typeof arg === 'undefined';
      }
      exports.isPrimitive = isPrimitive;
      function isBuffer(arg) {
        return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.binarySlice === 'function';
        ;
      }
      exports.isBuffer = isBuffer;
      function objectToString(o) {
        return Object.prototype.toString.call(o);
      }
      function pad(n) {
        return n < 10 ? '0' + n.toString(10) : n.toString(10);
      }
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      function timestamp() {
        var d = new Date();
        var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
        return [d.getDate(), months[d.getMonth()], time].join(' ');
      }
      exports.log = function() {
        console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
      };
      exports.inherits = function(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = shims.create(superCtor.prototype, {constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }});
      };
      exports._extend = function(origin, add) {
        if (!add || !isObject(add))
          return origin;
        var keys = shims.keys(add);
        var i = keys.length;
        while (i--) {
          origin[keys[i]] = add[keys[i]];
        }
        return origin;
      };
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
    }, {"_shims": 17}],
    22: [function(require, module, exports) {
      exports.readIEEE754 = function(buffer, offset, isBE, mLen, nBytes) {
        var e,
            m,
            eLen = nBytes * 8 - mLen - 1,
            eMax = (1 << eLen) - 1,
            eBias = eMax >> 1,
            nBits = -7,
            i = isBE ? 0 : (nBytes - 1),
            d = isBE ? 1 : -1,
            s = buffer[offset + i];
        i += d;
        e = s & ((1 << (-nBits)) - 1);
        s >>= (-nBits);
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8)
          ;
        m = e & ((1 << (-nBits)) - 1);
        e >>= (-nBits);
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8)
          ;
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : ((s ? -1 : 1) * Infinity);
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.writeIEEE754 = function(buffer, value, offset, isBE, mLen, nBytes) {
        var e,
            m,
            c,
            eLen = nBytes * 8 - mLen - 1,
            eMax = (1 << eLen) - 1,
            eBias = eMax >> 1,
            rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
            i = isBE ? (nBytes - 1) : 0,
            d = isBE ? -1 : 1,
            s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8)
          ;
        e = (e << mLen) | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8)
          ;
        buffer[offset + i - d] |= s * 128;
      };
    }, {}],
    23: [function(require, module, exports) {
      var assert;
      exports.Buffer = Buffer;
      exports.SlowBuffer = Buffer;
      Buffer.poolSize = 8192;
      exports.INSPECT_MAX_BYTES = 50;
      function stringtrim(str) {
        if (str.trim)
          return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      }
      function Buffer(subject, encoding, offset) {
        if (!assert)
          assert = require("github:jspm/nodelibs@0.0.8/assert");
        if (!(this instanceof Buffer)) {
          return new Buffer(subject, encoding, offset);
        }
        this.parent = this;
        this.offset = 0;
        if (encoding == "base64" && typeof subject == "string") {
          subject = stringtrim(subject);
          while (subject.length % 4 != 0) {
            subject = subject + "=";
          }
        }
        var type;
        if (typeof offset === 'number') {
          this.length = coerce(encoding);
          for (var i = 0; i < this.length; i++) {
            this[i] = subject.get(i + offset);
          }
        } else {
          switch (type = typeof subject) {
            case 'number':
              this.length = coerce(subject);
              break;
            case 'string':
              this.length = Buffer.byteLength(subject, encoding);
              break;
            case 'object':
              this.length = coerce(subject.length);
              break;
            default:
              throw new Error('First argument needs to be a number, ' + 'array or string.');
          }
          if (isArrayIsh(subject)) {
            for (var i = 0; i < this.length; i++) {
              if (subject instanceof Buffer) {
                this[i] = subject.readUInt8(i);
              } else {
                this[i] = subject[i];
              }
            }
          } else if (type == 'string') {
            this.length = this.write(subject, 0, encoding);
          } else if (type === 'number') {
            for (var i = 0; i < this.length; i++) {
              this[i] = 0;
            }
          }
        }
      }
      Buffer.prototype.get = function get(i) {
        if (i < 0 || i >= this.length)
          throw new Error('oob');
        return this[i];
      };
      Buffer.prototype.set = function set(i, v) {
        if (i < 0 || i >= this.length)
          throw new Error('oob');
        return this[i] = v;
      };
      Buffer.byteLength = function(str, encoding) {
        switch (encoding || "utf8") {
          case 'hex':
            return str.length / 2;
          case 'utf8':
          case 'utf-8':
            return utf8ToBytes(str).length;
          case 'ascii':
          case 'binary':
            return str.length;
          case 'base64':
            return base64ToBytes(str).length;
          default:
            throw new Error('Unknown encoding');
        }
      };
      Buffer.prototype.utf8Write = function(string, offset, length) {
        var bytes,
            pos;
        return Buffer._charsWritten = blitBuffer(utf8ToBytes(string), this, offset, length);
      };
      Buffer.prototype.asciiWrite = function(string, offset, length) {
        var bytes,
            pos;
        return Buffer._charsWritten = blitBuffer(asciiToBytes(string), this, offset, length);
      };
      Buffer.prototype.binaryWrite = Buffer.prototype.asciiWrite;
      Buffer.prototype.base64Write = function(string, offset, length) {
        var bytes,
            pos;
        return Buffer._charsWritten = blitBuffer(base64ToBytes(string), this, offset, length);
      };
      Buffer.prototype.base64Slice = function(start, end) {
        var bytes = Array.prototype.slice.apply(this, arguments);
        return require("base64-js").fromByteArray(bytes);
      };
      Buffer.prototype.utf8Slice = function() {
        var bytes = Array.prototype.slice.apply(this, arguments);
        var res = "";
        var tmp = "";
        var i = 0;
        while (i < bytes.length) {
          if (bytes[i] <= 0x7F) {
            res += decodeUtf8Char(tmp) + String.fromCharCode(bytes[i]);
            tmp = "";
          } else
            tmp += "%" + bytes[i].toString(16);
          i++;
        }
        return res + decodeUtf8Char(tmp);
      };
      Buffer.prototype.asciiSlice = function() {
        var bytes = Array.prototype.slice.apply(this, arguments);
        var ret = "";
        for (var i = 0; i < bytes.length; i++)
          ret += String.fromCharCode(bytes[i]);
        return ret;
      };
      Buffer.prototype.binarySlice = Buffer.prototype.asciiSlice;
      Buffer.prototype.inspect = function() {
        var out = [],
            len = this.length;
        for (var i = 0; i < len; i++) {
          out[i] = toHex(this[i]);
          if (i == exports.INSPECT_MAX_BYTES) {
            out[i + 1] = '...';
            break;
          }
        }
        return '<Buffer ' + out.join(' ') + '>';
      };
      Buffer.prototype.hexSlice = function(start, end) {
        var len = this.length;
        if (!start || start < 0)
          start = 0;
        if (!end || end < 0 || end > len)
          end = len;
        var out = '';
        for (var i = start; i < end; i++) {
          out += toHex(this[i]);
        }
        return out;
      };
      Buffer.prototype.toString = function(encoding, start, end) {
        encoding = String(encoding || 'utf8').toLowerCase();
        start = +start || 0;
        if (typeof end == 'undefined')
          end = this.length;
        if (+end == start) {
          return '';
        }
        switch (encoding) {
          case 'hex':
            return this.hexSlice(start, end);
          case 'utf8':
          case 'utf-8':
            return this.utf8Slice(start, end);
          case 'ascii':
            return this.asciiSlice(start, end);
          case 'binary':
            return this.binarySlice(start, end);
          case 'base64':
            return this.base64Slice(start, end);
          case 'ucs2':
          case 'ucs-2':
            return this.ucs2Slice(start, end);
          default:
            throw new Error('Unknown encoding');
        }
      };
      Buffer.prototype.hexWrite = function(string, offset, length) {
        offset = +offset || 0;
        var remaining = this.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = +length;
          if (length > remaining) {
            length = remaining;
          }
        }
        var strLen = string.length;
        if (strLen % 2) {
          throw new Error('Invalid hex string');
        }
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; i++) {
          var byte = parseInt(string.substr(i * 2, 2), 16);
          if (isNaN(byte))
            throw new Error('Invalid hex string');
          this[offset + i] = byte;
        }
        Buffer._charsWritten = i * 2;
        return i;
      };
      Buffer.prototype.write = function(string, offset, length, encoding) {
        if (isFinite(offset)) {
          if (!isFinite(length)) {
            encoding = length;
            length = undefined;
          }
        } else {
          var swap = encoding;
          encoding = offset;
          offset = length;
          length = swap;
        }
        offset = +offset || 0;
        var remaining = this.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = +length;
          if (length > remaining) {
            length = remaining;
          }
        }
        encoding = String(encoding || 'utf8').toLowerCase();
        switch (encoding) {
          case 'hex':
            return this.hexWrite(string, offset, length);
          case 'utf8':
          case 'utf-8':
            return this.utf8Write(string, offset, length);
          case 'ascii':
            return this.asciiWrite(string, offset, length);
          case 'binary':
            return this.binaryWrite(string, offset, length);
          case 'base64':
            return this.base64Write(string, offset, length);
          case 'ucs2':
          case 'ucs-2':
            return this.ucs2Write(string, offset, length);
          default:
            throw new Error('Unknown encoding');
        }
      };
      function clamp(index, len, defaultValue) {
        if (typeof index !== 'number')
          return defaultValue;
        index = ~~index;
        if (index >= len)
          return len;
        if (index >= 0)
          return index;
        index += len;
        if (index >= 0)
          return index;
        return 0;
      }
      Buffer.prototype.slice = function(start, end) {
        var len = this.length;
        start = clamp(start, len, 0);
        end = clamp(end, len, len);
        return new Buffer(this, end - start, +start);
      };
      Buffer.prototype.copy = function(target, target_start, start, end) {
        var source = this;
        start || (start = 0);
        if (end === undefined || isNaN(end)) {
          end = this.length;
        }
        target_start || (target_start = 0);
        if (end < start)
          throw new Error('sourceEnd < sourceStart');
        if (end === start)
          return 0;
        if (target.length == 0 || source.length == 0)
          return 0;
        if (target_start < 0 || target_start >= target.length) {
          throw new Error('targetStart out of bounds');
        }
        if (start < 0 || start >= source.length) {
          throw new Error('sourceStart out of bounds');
        }
        if (end < 0 || end > source.length) {
          throw new Error('sourceEnd out of bounds');
        }
        if (end > this.length) {
          end = this.length;
        }
        if (target.length - target_start < end - start) {
          end = target.length - target_start + start;
        }
        var temp = [];
        for (var i = start; i < end; i++) {
          assert.ok(typeof this[i] !== 'undefined', "copying undefined buffer bytes!");
          temp.push(this[i]);
        }
        for (var i = target_start; i < target_start + temp.length; i++) {
          target[i] = temp[i - target_start];
        }
      };
      Buffer.prototype.fill = function fill(value, start, end) {
        value || (value = 0);
        start || (start = 0);
        end || (end = this.length);
        if (typeof value === 'string') {
          value = value.charCodeAt(0);
        }
        if (!(typeof value === 'number') || isNaN(value)) {
          throw new Error('value is not a number');
        }
        if (end < start)
          throw new Error('end < start');
        if (end === start)
          return 0;
        if (this.length == 0)
          return 0;
        if (start < 0 || start >= this.length) {
          throw new Error('start out of bounds');
        }
        if (end < 0 || end > this.length) {
          throw new Error('end out of bounds');
        }
        for (var i = start; i < end; i++) {
          this[i] = value;
        }
      };
      Buffer.isBuffer = function isBuffer(b) {
        return b instanceof Buffer || b instanceof Buffer;
      };
      Buffer.concat = function(list, totalLength) {
        if (!isArray(list)) {
          throw new Error("Usage: Buffer.concat(list, [totalLength])\n \
      list should be an Array.");
        }
        if (list.length === 0) {
          return new Buffer(0);
        } else if (list.length === 1) {
          return list[0];
        }
        if (typeof totalLength !== 'number') {
          totalLength = 0;
          for (var i = 0; i < list.length; i++) {
            var buf = list[i];
            totalLength += buf.length;
          }
        }
        var buffer = new Buffer(totalLength);
        var pos = 0;
        for (var i = 0; i < list.length; i++) {
          var buf = list[i];
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      Buffer.isEncoding = function(encoding) {
        switch ((encoding + '').toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
          case 'raw':
            return true;
          default:
            return false;
        }
      };
      function coerce(length) {
        length = ~~Math.ceil(+length);
        return length < 0 ? 0 : length;
      }
      function isArray(subject) {
        return (Array.isArray || function(subject) {
          return {}.toString.apply(subject) == '[object Array]';
        })(subject);
      }
      function isArrayIsh(subject) {
        return isArray(subject) || Buffer.isBuffer(subject) || subject && typeof subject === 'object' && typeof subject.length === 'number';
      }
      function toHex(n) {
        if (n < 16)
          return '0' + n.toString(16);
        return n.toString(16);
      }
      function utf8ToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++)
          if (str.charCodeAt(i) <= 0x7F)
            byteArray.push(str.charCodeAt(i));
          else {
            var h = encodeURIComponent(str.charAt(i)).substr(1).split('%');
            for (var j = 0; j < h.length; j++)
              byteArray.push(parseInt(h[j], 16));
          }
        return byteArray;
      }
      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++)
          byteArray.push(str.charCodeAt(i) & 0xFF);
        return byteArray;
      }
      function base64ToBytes(str) {
        return require("base64-js").toByteArray(str);
      }
      function blitBuffer(src, dst, offset, length) {
        var pos,
            i = 0;
        while (i < length) {
          if ((i + offset >= dst.length) || (i >= src.length))
            break;
          dst[i + offset] = src[i];
          i++;
        }
        return i;
      }
      function decodeUtf8Char(str) {
        try {
          return decodeURIComponent(str);
        } catch (err) {
          return String.fromCharCode(0xFFFD);
        }
      }
      Buffer.prototype.readUInt8 = function(offset, noAssert) {
        var buffer = this;
        if (!noAssert) {
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset < buffer.length, 'Trying to read beyond buffer length');
        }
        if (offset >= buffer.length)
          return;
        return buffer[offset];
      };
      function readUInt16(buffer, offset, isBigEndian, noAssert) {
        var val = 0;
        if (!noAssert) {
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset + 1 < buffer.length, 'Trying to read beyond buffer length');
        }
        if (offset >= buffer.length)
          return 0;
        if (isBigEndian) {
          val = buffer[offset] << 8;
          if (offset + 1 < buffer.length) {
            val |= buffer[offset + 1];
          }
        } else {
          val = buffer[offset];
          if (offset + 1 < buffer.length) {
            val |= buffer[offset + 1] << 8;
          }
        }
        return val;
      }
      Buffer.prototype.readUInt16LE = function(offset, noAssert) {
        return readUInt16(this, offset, false, noAssert);
      };
      Buffer.prototype.readUInt16BE = function(offset, noAssert) {
        return readUInt16(this, offset, true, noAssert);
      };
      function readUInt32(buffer, offset, isBigEndian, noAssert) {
        var val = 0;
        if (!noAssert) {
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset + 3 < buffer.length, 'Trying to read beyond buffer length');
        }
        if (offset >= buffer.length)
          return 0;
        if (isBigEndian) {
          if (offset + 1 < buffer.length)
            val = buffer[offset + 1] << 16;
          if (offset + 2 < buffer.length)
            val |= buffer[offset + 2] << 8;
          if (offset + 3 < buffer.length)
            val |= buffer[offset + 3];
          val = val + (buffer[offset] << 24 >>> 0);
        } else {
          if (offset + 2 < buffer.length)
            val = buffer[offset + 2] << 16;
          if (offset + 1 < buffer.length)
            val |= buffer[offset + 1] << 8;
          val |= buffer[offset];
          if (offset + 3 < buffer.length)
            val = val + (buffer[offset + 3] << 24 >>> 0);
        }
        return val;
      }
      Buffer.prototype.readUInt32LE = function(offset, noAssert) {
        return readUInt32(this, offset, false, noAssert);
      };
      Buffer.prototype.readUInt32BE = function(offset, noAssert) {
        return readUInt32(this, offset, true, noAssert);
      };
      Buffer.prototype.readInt8 = function(offset, noAssert) {
        var buffer = this;
        var neg;
        if (!noAssert) {
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset < buffer.length, 'Trying to read beyond buffer length');
        }
        if (offset >= buffer.length)
          return;
        neg = buffer[offset] & 0x80;
        if (!neg) {
          return (buffer[offset]);
        }
        return ((0xff - buffer[offset] + 1) * -1);
      };
      function readInt16(buffer, offset, isBigEndian, noAssert) {
        var neg,
            val;
        if (!noAssert) {
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset + 1 < buffer.length, 'Trying to read beyond buffer length');
        }
        val = readUInt16(buffer, offset, isBigEndian, noAssert);
        neg = val & 0x8000;
        if (!neg) {
          return val;
        }
        return (0xffff - val + 1) * -1;
      }
      Buffer.prototype.readInt16LE = function(offset, noAssert) {
        return readInt16(this, offset, false, noAssert);
      };
      Buffer.prototype.readInt16BE = function(offset, noAssert) {
        return readInt16(this, offset, true, noAssert);
      };
      function readInt32(buffer, offset, isBigEndian, noAssert) {
        var neg,
            val;
        if (!noAssert) {
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset + 3 < buffer.length, 'Trying to read beyond buffer length');
        }
        val = readUInt32(buffer, offset, isBigEndian, noAssert);
        neg = val & 0x80000000;
        if (!neg) {
          return (val);
        }
        return (0xffffffff - val + 1) * -1;
      }
      Buffer.prototype.readInt32LE = function(offset, noAssert) {
        return readInt32(this, offset, false, noAssert);
      };
      Buffer.prototype.readInt32BE = function(offset, noAssert) {
        return readInt32(this, offset, true, noAssert);
      };
      function readFloat(buffer, offset, isBigEndian, noAssert) {
        if (!noAssert) {
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset + 3 < buffer.length, 'Trying to read beyond buffer length');
        }
        return require("./buffer_ieee754").readIEEE754(buffer, offset, isBigEndian, 23, 4);
      }
      Buffer.prototype.readFloatLE = function(offset, noAssert) {
        return readFloat(this, offset, false, noAssert);
      };
      Buffer.prototype.readFloatBE = function(offset, noAssert) {
        return readFloat(this, offset, true, noAssert);
      };
      function readDouble(buffer, offset, isBigEndian, noAssert) {
        if (!noAssert) {
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset + 7 < buffer.length, 'Trying to read beyond buffer length');
        }
        return require("./buffer_ieee754").readIEEE754(buffer, offset, isBigEndian, 52, 8);
      }
      Buffer.prototype.readDoubleLE = function(offset, noAssert) {
        return readDouble(this, offset, false, noAssert);
      };
      Buffer.prototype.readDoubleBE = function(offset, noAssert) {
        return readDouble(this, offset, true, noAssert);
      };
      function verifuint(value, max) {
        assert.ok(typeof(value) == 'number', 'cannot write a non-number as a number');
        assert.ok(value >= 0, 'specified a negative value for writing an unsigned value');
        assert.ok(value <= max, 'value is larger than maximum value for type');
        assert.ok(Math.floor(value) === value, 'value has a fractional component');
      }
      Buffer.prototype.writeUInt8 = function(value, offset, noAssert) {
        var buffer = this;
        if (!noAssert) {
          assert.ok(value !== undefined && value !== null, 'missing value');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset < buffer.length, 'trying to write beyond buffer length');
          verifuint(value, 0xff);
        }
        if (offset < buffer.length) {
          buffer[offset] = value;
        }
      };
      function writeUInt16(buffer, value, offset, isBigEndian, noAssert) {
        if (!noAssert) {
          assert.ok(value !== undefined && value !== null, 'missing value');
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset + 1 < buffer.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffff);
        }
        for (var i = 0; i < Math.min(buffer.length - offset, 2); i++) {
          buffer[offset + i] = (value & (0xff << (8 * (isBigEndian ? 1 - i : i)))) >>> (isBigEndian ? 1 - i : i) * 8;
        }
      }
      Buffer.prototype.writeUInt16LE = function(value, offset, noAssert) {
        writeUInt16(this, value, offset, false, noAssert);
      };
      Buffer.prototype.writeUInt16BE = function(value, offset, noAssert) {
        writeUInt16(this, value, offset, true, noAssert);
      };
      function writeUInt32(buffer, value, offset, isBigEndian, noAssert) {
        if (!noAssert) {
          assert.ok(value !== undefined && value !== null, 'missing value');
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset + 3 < buffer.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffffffff);
        }
        for (var i = 0; i < Math.min(buffer.length - offset, 4); i++) {
          buffer[offset + i] = (value >>> (isBigEndian ? 3 - i : i) * 8) & 0xff;
        }
      }
      Buffer.prototype.writeUInt32LE = function(value, offset, noAssert) {
        writeUInt32(this, value, offset, false, noAssert);
      };
      Buffer.prototype.writeUInt32BE = function(value, offset, noAssert) {
        writeUInt32(this, value, offset, true, noAssert);
      };
      function verifsint(value, max, min) {
        assert.ok(typeof(value) == 'number', 'cannot write a non-number as a number');
        assert.ok(value <= max, 'value larger than maximum allowed value');
        assert.ok(value >= min, 'value smaller than minimum allowed value');
        assert.ok(Math.floor(value) === value, 'value has a fractional component');
      }
      function verifIEEE754(value, max, min) {
        assert.ok(typeof(value) == 'number', 'cannot write a non-number as a number');
        assert.ok(value <= max, 'value larger than maximum allowed value');
        assert.ok(value >= min, 'value smaller than minimum allowed value');
      }
      Buffer.prototype.writeInt8 = function(value, offset, noAssert) {
        var buffer = this;
        if (!noAssert) {
          assert.ok(value !== undefined && value !== null, 'missing value');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset < buffer.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7f, -0x80);
        }
        if (value >= 0) {
          buffer.writeUInt8(value, offset, noAssert);
        } else {
          buffer.writeUInt8(0xff + value + 1, offset, noAssert);
        }
      };
      function writeInt16(buffer, value, offset, isBigEndian, noAssert) {
        if (!noAssert) {
          assert.ok(value !== undefined && value !== null, 'missing value');
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset + 1 < buffer.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fff, -0x8000);
        }
        if (value >= 0) {
          writeUInt16(buffer, value, offset, isBigEndian, noAssert);
        } else {
          writeUInt16(buffer, 0xffff + value + 1, offset, isBigEndian, noAssert);
        }
      }
      Buffer.prototype.writeInt16LE = function(value, offset, noAssert) {
        writeInt16(this, value, offset, false, noAssert);
      };
      Buffer.prototype.writeInt16BE = function(value, offset, noAssert) {
        writeInt16(this, value, offset, true, noAssert);
      };
      function writeInt32(buffer, value, offset, isBigEndian, noAssert) {
        if (!noAssert) {
          assert.ok(value !== undefined && value !== null, 'missing value');
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset + 3 < buffer.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fffffff, -0x80000000);
        }
        if (value >= 0) {
          writeUInt32(buffer, value, offset, isBigEndian, noAssert);
        } else {
          writeUInt32(buffer, 0xffffffff + value + 1, offset, isBigEndian, noAssert);
        }
      }
      Buffer.prototype.writeInt32LE = function(value, offset, noAssert) {
        writeInt32(this, value, offset, false, noAssert);
      };
      Buffer.prototype.writeInt32BE = function(value, offset, noAssert) {
        writeInt32(this, value, offset, true, noAssert);
      };
      function writeFloat(buffer, value, offset, isBigEndian, noAssert) {
        if (!noAssert) {
          assert.ok(value !== undefined && value !== null, 'missing value');
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset + 3 < buffer.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
        }
        require("./buffer_ieee754").writeIEEE754(buffer, value, offset, isBigEndian, 23, 4);
      }
      Buffer.prototype.writeFloatLE = function(value, offset, noAssert) {
        writeFloat(this, value, offset, false, noAssert);
      };
      Buffer.prototype.writeFloatBE = function(value, offset, noAssert) {
        writeFloat(this, value, offset, true, noAssert);
      };
      function writeDouble(buffer, value, offset, isBigEndian, noAssert) {
        if (!noAssert) {
          assert.ok(value !== undefined && value !== null, 'missing value');
          assert.ok(typeof(isBigEndian) === 'boolean', 'missing or invalid endian');
          assert.ok(offset !== undefined && offset !== null, 'missing offset');
          assert.ok(offset + 7 < buffer.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
        }
        require("./buffer_ieee754").writeIEEE754(buffer, value, offset, isBigEndian, 52, 8);
      }
      Buffer.prototype.writeDoubleLE = function(value, offset, noAssert) {
        writeDouble(this, value, offset, false, noAssert);
      };
      Buffer.prototype.writeDoubleBE = function(value, offset, noAssert) {
        writeDouble(this, value, offset, true, noAssert);
      };
    }, {
      "./buffer_ieee754": 22,
      "assert": 18,
      "base64-js": 24
    }],
    24: [function(require, module, exports) {
      (function(exports) {
        'use strict';
        var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        function b64ToByteArray(b64) {
          var i,
              j,
              l,
              tmp,
              placeHolders,
              arr;
          if (b64.length % 4 > 0) {
            throw 'Invalid string. Length must be a multiple of 4';
          }
          placeHolders = b64.indexOf('=');
          placeHolders = placeHolders > 0 ? b64.length - placeHolders : 0;
          arr = [];
          l = placeHolders > 0 ? b64.length - 4 : b64.length;
          for (i = 0, j = 0; i < l; i += 4, j += 3) {
            tmp = (lookup.indexOf(b64[i]) << 18) | (lookup.indexOf(b64[i + 1]) << 12) | (lookup.indexOf(b64[i + 2]) << 6) | lookup.indexOf(b64[i + 3]);
            arr.push((tmp & 0xFF0000) >> 16);
            arr.push((tmp & 0xFF00) >> 8);
            arr.push(tmp & 0xFF);
          }
          if (placeHolders === 2) {
            tmp = (lookup.indexOf(b64[i]) << 2) | (lookup.indexOf(b64[i + 1]) >> 4);
            arr.push(tmp & 0xFF);
          } else if (placeHolders === 1) {
            tmp = (lookup.indexOf(b64[i]) << 10) | (lookup.indexOf(b64[i + 1]) << 4) | (lookup.indexOf(b64[i + 2]) >> 2);
            arr.push((tmp >> 8) & 0xFF);
            arr.push(tmp & 0xFF);
          }
          return arr;
        }
        function uint8ToBase64(uint8) {
          var i,
              extraBytes = uint8.length % 3,
              output = "",
              temp,
              length;
          function tripletToBase64(num) {
            return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
          }
          ;
          for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
            output += tripletToBase64(temp);
          }
          switch (extraBytes) {
            case 1:
              temp = uint8[uint8.length - 1];
              output += lookup[temp >> 2];
              output += lookup[(temp << 4) & 0x3F];
              output += '==';
              break;
            case 2:
              temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1]);
              output += lookup[temp >> 10];
              output += lookup[(temp >> 4) & 0x3F];
              output += lookup[(temp << 2) & 0x3F];
              output += '=';
              break;
          }
          return output;
        }
        module.exports.toByteArray = b64ToByteArray;
        module.exports.fromByteArray = uint8ToBase64;
      }());
    }, {}],
    25: [function(require, module, exports) {
      var Buffer = require("github:jspm/nodelibs@0.0.8/buffer").Buffer;
      var intSize = 4;
      var zeroBuffer = new Buffer(intSize);
      zeroBuffer.fill(0);
      var chrsz = 8;
      function toArray(buf, bigEndian) {
        if ((buf.length % intSize) !== 0) {
          var len = buf.length + (intSize - (buf.length % intSize));
          buf = Buffer.concat([buf, zeroBuffer], len);
        }
        var arr = [];
        var fn = bigEndian ? buf.readInt32BE : buf.readInt32LE;
        for (var i = 0; i < buf.length; i += intSize) {
          arr.push(fn.call(buf, i));
        }
        return arr;
      }
      function toBuffer(arr, size, bigEndian) {
        var buf = new Buffer(size);
        var fn = bigEndian ? buf.writeInt32BE : buf.writeInt32LE;
        for (var i = 0; i < arr.length; i++) {
          fn.call(buf, arr[i], i * 4, true);
        }
        return buf;
      }
      function hash(buf, fn, hashSize, bigEndian) {
        if (!Buffer.isBuffer(buf))
          buf = new Buffer(buf);
        var arr = fn(toArray(buf, bigEndian), buf.length * chrsz);
        return toBuffer(arr, hashSize, bigEndian);
      }
      module.exports = {hash: hash};
    }, {"buffer": 23}],
    26: [function(require, module, exports) {
      var Buffer = require("github:jspm/nodelibs@0.0.8/buffer").Buffer;
      var sha = require("./sha");
      var sha256 = require("./sha256");
      var rng = require("./rng");
      var md5 = require("./md5");
      var algorithms = {
        sha1: sha,
        sha256: sha256,
        md5: md5
      };
      var blocksize = 64;
      var zeroBuffer = new Buffer(blocksize);
      zeroBuffer.fill(0);
      function hmac(fn, key, data) {
        if (!Buffer.isBuffer(key))
          key = new Buffer(key);
        if (!Buffer.isBuffer(data))
          data = new Buffer(data);
        if (key.length > blocksize) {
          key = fn(key);
        } else if (key.length < blocksize) {
          key = Buffer.concat([key, zeroBuffer], blocksize);
        }
        var ipad = new Buffer(blocksize),
            opad = new Buffer(blocksize);
        for (var i = 0; i < blocksize; i++) {
          ipad[i] = key[i] ^ 0x36;
          opad[i] = key[i] ^ 0x5C;
        }
        var hash = fn(Buffer.concat([ipad, data]));
        return fn(Buffer.concat([opad, hash]));
      }
      function hash(alg, key) {
        alg = alg || 'sha1';
        var fn = algorithms[alg];
        var bufs = [];
        var length = 0;
        if (!fn)
          error('algorithm:', alg, 'is not yet supported');
        return {
          update: function(data) {
            if (!Buffer.isBuffer(data))
              data = new Buffer(data);
            bufs.push(data);
            length += data.length;
            return this;
          },
          digest: function(enc) {
            var buf = Buffer.concat(bufs);
            var r = key ? hmac(fn, key, buf) : fn(buf);
            bufs = null;
            return enc ? r.toString(enc) : r;
          }
        };
      }
      function error() {
        var m = [].slice.call(arguments).join(' ');
        throw new Error([m, 'we accept pull requests', 'http://github.com/dominictarr/crypto-browserify'].join('\n'));
      }
      exports.createHash = function(alg) {
        return hash(alg);
      };
      exports.createHmac = function(alg, key) {
        return hash(alg, key);
      };
      exports.randomBytes = function(size, callback) {
        if (callback && callback.call) {
          try {
            callback.call(this, undefined, new Buffer(rng(size)));
          } catch (err) {
            callback(err);
          }
        } else {
          return new Buffer(rng(size));
        }
      };
      function each(a, f) {
        for (var i in a)
          f(a[i], i);
      }
      each(['createCredentials', 'createCipher', 'createCipheriv', 'createDecipher', 'createDecipheriv', 'createSign', 'createVerify', 'createDiffieHellman', 'pbkdf2'], function(name) {
        exports[name] = function() {
          error('sorry,', name, 'is not implemented yet');
        };
      });
    }, {
      "./md5": 27,
      "./rng": 28,
      "./sha": 29,
      "./sha256": 30,
      "buffer": 23
    }],
    27: [function(require, module, exports) {
      var helpers = require("./helpers");
      function md5_vm_test() {
        return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
      }
      function core_md5(x, len) {
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        for (var i = 0; i < x.length; i += 16) {
          var olda = a;
          var oldb = b;
          var oldc = c;
          var oldd = d;
          a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
          d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
          b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
          a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
          a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
          a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
          d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
          c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
          a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
          d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
          a = safe_add(a, olda);
          b = safe_add(b, oldb);
          c = safe_add(c, oldc);
          d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
      }
      function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
      }
      function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
      }
      function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
      }
      function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
      }
      function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
      }
      function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
      }
      function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
      }
      module.exports = function md5(buf) {
        return helpers.hash(buf, core_md5, 16);
      };
    }, {"./helpers": 25}],
    28: [function(require, module, exports) {
      (function() {
        var _global = this;
        var mathRNG,
            whatwgRNG;
        mathRNG = function(size) {
          var bytes = new Array(size);
          var r;
          for (var i = 0,
              r; i < size; i++) {
            if ((i & 0x03) == 0)
              r = Math.random() * 0x100000000;
            bytes[i] = r >>> ((i & 0x03) << 3) & 0xff;
          }
          return bytes;
        };
        if (_global.crypto && crypto.getRandomValues) {
          whatwgRNG = function(size) {
            var bytes = new Uint8Array(size);
            crypto.getRandomValues(bytes);
            return bytes;
          };
        }
        module.exports = whatwgRNG || mathRNG;
      }());
    }, {}],
    29: [function(require, module, exports) {
      var helpers = require("./helpers");
      function core_sha1(x, len) {
        x[len >> 5] |= 0x80 << (24 - len % 32);
        x[((len + 64 >> 9) << 4) + 15] = len;
        var w = Array(80);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        var e = -1009589776;
        for (var i = 0; i < x.length; i += 16) {
          var olda = a;
          var oldb = b;
          var oldc = c;
          var oldd = d;
          var olde = e;
          for (var j = 0; j < 80; j++) {
            if (j < 16)
              w[j] = x[i + j];
            else
              w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
          }
          a = safe_add(a, olda);
          b = safe_add(b, oldb);
          c = safe_add(c, oldc);
          d = safe_add(d, oldd);
          e = safe_add(e, olde);
        }
        return Array(a, b, c, d, e);
      }
      function sha1_ft(t, b, c, d) {
        if (t < 20)
          return (b & c) | ((~b) & d);
        if (t < 40)
          return b ^ c ^ d;
        if (t < 60)
          return (b & c) | (b & d) | (c & d);
        return b ^ c ^ d;
      }
      function sha1_kt(t) {
        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
      }
      function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
      }
      function rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
      }
      module.exports = function sha1(buf) {
        return helpers.hash(buf, core_sha1, 20, true);
      };
    }, {"./helpers": 25}],
    30: [function(require, module, exports) {
      var helpers = require("./helpers");
      var safe_add = function(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
      };
      var S = function(X, n) {
        return (X >>> n) | (X << (32 - n));
      };
      var R = function(X, n) {
        return (X >>> n);
      };
      var Ch = function(x, y, z) {
        return ((x & y) ^ ((~x) & z));
      };
      var Maj = function(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
      };
      var Sigma0256 = function(x) {
        return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
      };
      var Sigma1256 = function(x) {
        return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
      };
      var Gamma0256 = function(x) {
        return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
      };
      var Gamma1256 = function(x) {
        return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
      };
      var core_sha256 = function(m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a,
            b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j;
        var T1,
            T2;
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
        for (var i = 0; i < m.length; i += 16) {
          a = HASH[0];
          b = HASH[1];
          c = HASH[2];
          d = HASH[3];
          e = HASH[4];
          f = HASH[5];
          g = HASH[6];
          h = HASH[7];
          for (var j = 0; j < 64; j++) {
            if (j < 16) {
              W[j] = m[j + i];
            } else {
              W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
            }
            T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
            T2 = safe_add(Sigma0256(a), Maj(a, b, c));
            h = g;
            g = f;
            f = e;
            e = safe_add(d, T1);
            d = c;
            c = b;
            b = a;
            a = safe_add(T1, T2);
          }
          HASH[0] = safe_add(a, HASH[0]);
          HASH[1] = safe_add(b, HASH[1]);
          HASH[2] = safe_add(c, HASH[2]);
          HASH[3] = safe_add(d, HASH[3]);
          HASH[4] = safe_add(e, HASH[4]);
          HASH[5] = safe_add(f, HASH[5]);
          HASH[6] = safe_add(g, HASH[6]);
          HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
      };
      module.exports = function sha256(buf) {
        return helpers.hash(buf, core_sha256, 32, true);
      };
    }, {"./helpers": 25}],
    31: [function(require, module, exports) {
      var process = module.exports = {};
      process.nextTick = (function() {
        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;
        ;
        if (canSetImmediate) {
          return function(f) {
            return window.setImmediate(f);
          };
        }
        if (canPost) {
          var queue = [];
          window.addEventListener('message', function(ev) {
            if (ev.source === window && ev.data === 'process-tick') {
              ev.stopPropagation();
              if (queue.length > 0) {
                var fn = queue.shift();
                fn();
              }
            }
          }, true);
          return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
          };
        }
        return function nextTick(fn) {
          setTimeout(fn, 0);
        };
      })();
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.binding = function(name) {
        throw new Error('process.binding is not supported');
      };
      process.cwd = function() {
        return '/';
      };
      process.chdir = function(dir) {
        throw new Error('process.chdir is not supported');
      };
    }, {}],
    32: [function(require, module, exports) {
      "use strict";
      var sinon = (function(buster) {
        var div = typeof document != "undefined" && document.createElement("div");
        var hasOwn = Object.prototype.hasOwnProperty;
        function isDOMNode(obj) {
          var success = false;
          try {
            obj.appendChild(div);
            success = div.parentNode == obj;
          } catch (e) {
            return false;
          } finally {
            try {
              obj.removeChild(div);
            } catch (e) {}
          }
          return success;
        }
        function isElement(obj) {
          return div && obj && obj.nodeType === 1 && isDOMNode(obj);
        }
        function isFunction(obj) {
          return typeof obj === "function" || !!(obj && obj.constructor && obj.call && obj.apply);
        }
        function mirrorProperties(target, source) {
          for (var prop in source) {
            if (!hasOwn.call(target, prop)) {
              target[prop] = source[prop];
            }
          }
        }
        function isRestorable(obj) {
          return typeof obj === "function" && typeof obj.restore === "function" && obj.restore.sinon;
        }
        var sinon = {
          wrapMethod: function wrapMethod(object, property, method) {
            if (!object) {
              throw new TypeError("Should wrap property of object");
            }
            if (typeof method != "function") {
              throw new TypeError("Method wrapper should be function");
            }
            var wrappedMethod = object[property];
            if (!isFunction(wrappedMethod)) {
              throw new TypeError("Attempted to wrap " + (typeof wrappedMethod) + " property " + property + " as function");
            }
            if (wrappedMethod.restore && wrappedMethod.restore.sinon) {
              throw new TypeError("Attempted to wrap " + property + " which is already wrapped");
            }
            if (wrappedMethod.calledBefore) {
              var verb = !!wrappedMethod.returns ? "stubbed" : "spied on";
              throw new TypeError("Attempted to wrap " + property + " which is already " + verb);
            }
            var owned = hasOwn.call(object, property);
            object[property] = method;
            method.displayName = property;
            method.restore = function() {
              if (!owned) {
                delete object[property];
              }
              if (object[property] === method) {
                object[property] = wrappedMethod;
              }
            };
            method.restore.sinon = true;
            mirrorProperties(method, wrappedMethod);
            return method;
          },
          extend: function extend(target) {
            for (var i = 1,
                l = arguments.length; i < l; i += 1) {
              for (var prop in arguments[i]) {
                if (arguments[i].hasOwnProperty(prop)) {
                  target[prop] = arguments[i][prop];
                }
                if (arguments[i].hasOwnProperty("toString") && arguments[i].toString != target.toString) {
                  target.toString = arguments[i].toString;
                }
              }
            }
            return target;
          },
          create: function create(proto) {
            var F = function() {};
            F.prototype = proto;
            return new F();
          },
          deepEqual: function deepEqual(a, b) {
            if (sinon.match && sinon.match.isMatcher(a)) {
              return a.test(b);
            }
            if (typeof a != "object" || typeof b != "object") {
              return a === b;
            }
            if (isElement(a) || isElement(b)) {
              return a === b;
            }
            if (a === b) {
              return true;
            }
            if ((a === null && b !== null) || (a !== null && b === null)) {
              return false;
            }
            var aString = Object.prototype.toString.call(a);
            if (aString != Object.prototype.toString.call(b)) {
              return false;
            }
            if (aString == "[object Array]") {
              if (a.length !== b.length) {
                return false;
              }
              for (var i = 0,
                  l = a.length; i < l; i += 1) {
                if (!deepEqual(a[i], b[i])) {
                  return false;
                }
              }
              return true;
            }
            if (aString == "[object Date]") {
              return a.valueOf() === b.valueOf();
            }
            var prop,
                aLength = 0,
                bLength = 0;
            for (prop in a) {
              aLength += 1;
              if (!deepEqual(a[prop], b[prop])) {
                return false;
              }
            }
            for (prop in b) {
              bLength += 1;
            }
            return aLength == bLength;
          },
          functionName: function functionName(func) {
            var name = func.displayName || func.name;
            if (!name) {
              var matches = func.toString().match(/function ([^\s\(]+)/);
              name = matches && matches[1];
            }
            return name;
          },
          functionToString: function toString() {
            if (this.getCall && this.callCount) {
              var thisValue,
                  prop,
                  i = this.callCount;
              while (i--) {
                thisValue = this.getCall(i).thisValue;
                for (prop in thisValue) {
                  if (thisValue[prop] === this) {
                    return prop;
                  }
                }
              }
            }
            return this.displayName || "sinon fake";
          },
          getConfig: function(custom) {
            var config = {};
            custom = custom || {};
            var defaults = sinon.defaultConfig;
            for (var prop in defaults) {
              if (defaults.hasOwnProperty(prop)) {
                config[prop] = custom.hasOwnProperty(prop) ? custom[prop] : defaults[prop];
              }
            }
            return config;
          },
          format: function(val) {
            return "" + val;
          },
          defaultConfig: {
            injectIntoThis: true,
            injectInto: null,
            properties: ["spy", "stub", "mock", "clock", "server", "requests"],
            useFakeTimers: true,
            useFakeServer: true
          },
          timesInWords: function timesInWords(count) {
            return count == 1 && "once" || count == 2 && "twice" || count == 3 && "thrice" || (count || 0) + " times";
          },
          calledInOrder: function(spies) {
            for (var i = 1,
                l = spies.length; i < l; i++) {
              if (!spies[i - 1].calledBefore(spies[i]) || !spies[i].called) {
                return false;
              }
            }
            return true;
          },
          orderByFirstCall: function(spies) {
            return spies.sort(function(a, b) {
              var aCall = a.getCall(0);
              var bCall = b.getCall(0);
              var aId = aCall && aCall.callId || -1;
              var bId = bCall && bCall.callId || -1;
              return aId < bId ? -1 : 1;
            });
          },
          log: function() {},
          logError: function(label, err) {
            var msg = label + " threw exception: ";
            sinon.log(msg + "[" + err.name + "] " + err.message);
            if (err.stack) {
              sinon.log(err.stack);
            }
            setTimeout(function() {
              err.message = msg + err.message;
              throw err;
            }, 0);
          },
          typeOf: function(value) {
            if (value === null) {
              return "null";
            } else if (value === undefined) {
              return "undefined";
            }
            var string = Object.prototype.toString.call(value);
            return string.substring(8, string.length - 1).toLowerCase();
          },
          createStubInstance: function(constructor) {
            if (typeof constructor !== "function") {
              throw new TypeError("The constructor should be a function.");
            }
            return sinon.stub(sinon.create(constructor.prototype));
          },
          restore: function(object) {
            if (object !== null && typeof object === "object") {
              for (var prop in object) {
                if (isRestorable(object[prop])) {
                  object[prop].restore();
                }
              }
            } else if (isRestorable(object)) {
              object.restore();
            }
          }
        };
        var isNode = typeof module == "object" && typeof require == "function";
        if (isNode) {
          try {
            buster = {format: require("buster-format")};
          } catch (e) {}
          module.exports = sinon;
          module.exports.spy = require("./sinon/spy");
          module.exports.stub = require("./sinon/stub");
          module.exports.mock = require("./sinon/mock");
          module.exports.collection = require("./sinon/collection");
          module.exports.assert = require("./sinon/assert");
          module.exports.sandbox = require("./sinon/sandbox");
          module.exports.test = require("./sinon/test");
          module.exports.testCase = require("./sinon/test_case");
          module.exports.assert = require("./sinon/assert");
          module.exports.match = require("./sinon/match");
        }
        if (buster) {
          var formatter = sinon.create(buster.format);
          formatter.quoteStrings = false;
          sinon.format = function() {
            return formatter.ascii.apply(formatter, arguments);
          };
        } else if (isNode) {
          try {
            var util = require("github:jspm/nodelibs@0.0.8/util");
            sinon.format = function(value) {
              return typeof value == "object" && value.toString === Object.prototype.toString ? util.inspect(value) : value;
            };
          } catch (e) {}
        }
        return sinon;
      }(typeof buster == "object" && buster));
    }, {
      "./sinon/assert": 33,
      "./sinon/collection": 34,
      "./sinon/match": 35,
      "./sinon/mock": 36,
      "./sinon/sandbox": 37,
      "./sinon/spy": 38,
      "./sinon/stub": 39,
      "./sinon/test": 40,
      "./sinon/test_case": 41,
      "buster-format": 43,
      "util": 21
    }],
    33: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      (function(sinon, global) {
        var commonJSModule = typeof module == "object" && typeof require == "function";
        var slice = Array.prototype.slice;
        var assert;
        if (!sinon && commonJSModule) {
          sinon = require("../sinon");
        }
        if (!sinon) {
          return;
        }
        function verifyIsStub() {
          var method;
          for (var i = 0,
              l = arguments.length; i < l; ++i) {
            method = arguments[i];
            if (!method) {
              assert.fail("fake is not a spy");
            }
            if (typeof method != "function") {
              assert.fail(method + " is not a function");
            }
            if (typeof method.getCall != "function") {
              assert.fail(method + " is not stubbed");
            }
          }
        }
        function failAssertion(object, msg) {
          object = object || global;
          var failMethod = object.fail || assert.fail;
          failMethod.call(object, msg);
        }
        function mirrorPropAsAssertion(name, method, message) {
          if (arguments.length == 2) {
            message = method;
            method = name;
          }
          assert[name] = function(fake) {
            verifyIsStub(fake);
            var args = slice.call(arguments, 1);
            var failed = false;
            if (typeof method == "function") {
              failed = !method(fake);
            } else {
              failed = typeof fake[method] == "function" ? !fake[method].apply(fake, args) : !fake[method];
            }
            if (failed) {
              failAssertion(this, fake.printf.apply(fake, [message].concat(args)));
            } else {
              assert.pass(name);
            }
          };
        }
        function exposedName(prefix, prop) {
          return !prefix || /^fail/.test(prop) ? prop : prefix + prop.slice(0, 1).toUpperCase() + prop.slice(1);
        }
        ;
        assert = {
          failException: "AssertError",
          fail: function fail(message) {
            var error = new Error(message);
            error.name = this.failException || assert.failException;
            throw error;
          },
          pass: function pass(assertion) {},
          callOrder: function assertCallOrder() {
            verifyIsStub.apply(null, arguments);
            var expected = "",
                actual = "";
            if (!sinon.calledInOrder(arguments)) {
              try {
                expected = [].join.call(arguments, ", ");
                var calls = slice.call(arguments);
                var i = calls.length;
                while (i) {
                  if (!calls[--i].called) {
                    calls.splice(i, 1);
                  }
                }
                actual = sinon.orderByFirstCall(calls).join(", ");
              } catch (e) {}
              failAssertion(this, "expected " + expected + " to be " + "called in order but were called as " + actual);
            } else {
              assert.pass("callOrder");
            }
          },
          callCount: function assertCallCount(method, count) {
            verifyIsStub(method);
            if (method.callCount != count) {
              var msg = "expected %n to be called " + sinon.timesInWords(count) + " but was called %c%C";
              failAssertion(this, method.printf(msg));
            } else {
              assert.pass("callCount");
            }
          },
          expose: function expose(target, options) {
            if (!target) {
              throw new TypeError("target is null or undefined");
            }
            var o = options || {};
            var prefix = typeof o.prefix == "undefined" && "assert" || o.prefix;
            var includeFail = typeof o.includeFail == "undefined" || !!o.includeFail;
            for (var method in this) {
              if (method != "export" && (includeFail || !/^(fail)/.test(method))) {
                target[exposedName(prefix, method)] = this[method];
              }
            }
            return target;
          }
        };
        mirrorPropAsAssertion("called", "expected %n to have been called at least once but was never called");
        mirrorPropAsAssertion("notCalled", function(spy) {
          return !spy.called;
        }, "expected %n to not have been called but was called %c%C");
        mirrorPropAsAssertion("calledOnce", "expected %n to be called once but was called %c%C");
        mirrorPropAsAssertion("calledTwice", "expected %n to be called twice but was called %c%C");
        mirrorPropAsAssertion("calledThrice", "expected %n to be called thrice but was called %c%C");
        mirrorPropAsAssertion("calledOn", "expected %n to be called with %1 as this but was called with %t");
        mirrorPropAsAssertion("alwaysCalledOn", "expected %n to always be called with %1 as this but was called with %t");
        mirrorPropAsAssertion("calledWithNew", "expected %n to be called with new");
        mirrorPropAsAssertion("alwaysCalledWithNew", "expected %n to always be called with new");
        mirrorPropAsAssertion("calledWith", "expected %n to be called with arguments %*%C");
        mirrorPropAsAssertion("calledWithMatch", "expected %n to be called with match %*%C");
        mirrorPropAsAssertion("alwaysCalledWith", "expected %n to always be called with arguments %*%C");
        mirrorPropAsAssertion("alwaysCalledWithMatch", "expected %n to always be called with match %*%C");
        mirrorPropAsAssertion("calledWithExactly", "expected %n to be called with exact arguments %*%C");
        mirrorPropAsAssertion("alwaysCalledWithExactly", "expected %n to always be called with exact arguments %*%C");
        mirrorPropAsAssertion("neverCalledWith", "expected %n to never be called with arguments %*%C");
        mirrorPropAsAssertion("neverCalledWithMatch", "expected %n to never be called with match %*%C");
        mirrorPropAsAssertion("threw", "%n did not throw exception%C");
        mirrorPropAsAssertion("alwaysThrew", "%n did not always throw exception%C");
        if (commonJSModule) {
          module.exports = assert;
        } else {
          sinon.assert = assert;
        }
      }(typeof sinon == "object" && sinon || null, typeof window != "undefined" ? window : (typeof self != "undefined") ? self : global));
    }, {"../sinon": 32}],
    34: [function(require, module, exports) {
      "use strict";
      (function(sinon) {
        var commonJSModule = typeof module == "object" && typeof require == "function";
        var push = [].push;
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        if (!sinon && commonJSModule) {
          sinon = require("../sinon");
        }
        if (!sinon) {
          return;
        }
        function getFakes(fakeCollection) {
          if (!fakeCollection.fakes) {
            fakeCollection.fakes = [];
          }
          return fakeCollection.fakes;
        }
        function each(fakeCollection, method) {
          var fakes = getFakes(fakeCollection);
          for (var i = 0,
              l = fakes.length; i < l; i += 1) {
            if (typeof fakes[i][method] == "function") {
              fakes[i][method]();
            }
          }
        }
        function compact(fakeCollection) {
          var fakes = getFakes(fakeCollection);
          var i = 0;
          while (i < fakes.length) {
            fakes.splice(i, 1);
          }
        }
        var collection = {
          verify: function resolve() {
            each(this, "verify");
          },
          restore: function restore() {
            each(this, "restore");
            compact(this);
          },
          verifyAndRestore: function verifyAndRestore() {
            var exception;
            try {
              this.verify();
            } catch (e) {
              exception = e;
            }
            this.restore();
            if (exception) {
              throw exception;
            }
          },
          add: function add(fake) {
            push.call(getFakes(this), fake);
            return fake;
          },
          spy: function spy() {
            return this.add(sinon.spy.apply(sinon, arguments));
          },
          stub: function stub(object, property, value) {
            if (property) {
              var original = object[property];
              if (typeof original != "function") {
                if (!hasOwnProperty.call(object, property)) {
                  throw new TypeError("Cannot stub non-existent own property " + property);
                }
                object[property] = value;
                return this.add({restore: function() {
                    object[property] = original;
                  }});
              }
            }
            if (!property && !!object && typeof object == "object") {
              var stubbedObj = sinon.stub.apply(sinon, arguments);
              for (var prop in stubbedObj) {
                if (typeof stubbedObj[prop] === "function") {
                  this.add(stubbedObj[prop]);
                }
              }
              return stubbedObj;
            }
            return this.add(sinon.stub.apply(sinon, arguments));
          },
          mock: function mock() {
            return this.add(sinon.mock.apply(sinon, arguments));
          },
          inject: function inject(obj) {
            var col = this;
            obj.spy = function() {
              return col.spy.apply(col, arguments);
            };
            obj.stub = function() {
              return col.stub.apply(col, arguments);
            };
            obj.mock = function() {
              return col.mock.apply(col, arguments);
            };
            return obj;
          }
        };
        if (commonJSModule) {
          module.exports = collection;
        } else {
          sinon.collection = collection;
        }
      }(typeof sinon == "object" && sinon || null));
    }, {"../sinon": 32}],
    35: [function(require, module, exports) {
      "use strict";
      (function(sinon) {
        var commonJSModule = typeof module == "object" && typeof require == "function";
        if (!sinon && commonJSModule) {
          sinon = require("../sinon");
        }
        if (!sinon) {
          return;
        }
        function assertType(value, type, name) {
          var actual = sinon.typeOf(value);
          if (actual !== type) {
            throw new TypeError("Expected type of " + name + " to be " + type + ", but was " + actual);
          }
        }
        var matcher = {toString: function() {
            return this.message;
          }};
        function isMatcher(object) {
          return matcher.isPrototypeOf(object);
        }
        function matchObject(expectation, actual) {
          if (actual === null || actual === undefined) {
            return false;
          }
          for (var key in expectation) {
            if (expectation.hasOwnProperty(key)) {
              var exp = expectation[key];
              var act = actual[key];
              if (match.isMatcher(exp)) {
                if (!exp.test(act)) {
                  return false;
                }
              } else if (sinon.typeOf(exp) === "object") {
                if (!matchObject(exp, act)) {
                  return false;
                }
              } else if (!sinon.deepEqual(exp, act)) {
                return false;
              }
            }
          }
          return true;
        }
        matcher.or = function(m2) {
          if (!isMatcher(m2)) {
            throw new TypeError("Matcher expected");
          }
          var m1 = this;
          var or = sinon.create(matcher);
          or.test = function(actual) {
            return m1.test(actual) || m2.test(actual);
          };
          or.message = m1.message + ".or(" + m2.message + ")";
          return or;
        };
        matcher.and = function(m2) {
          if (!isMatcher(m2)) {
            throw new TypeError("Matcher expected");
          }
          var m1 = this;
          var and = sinon.create(matcher);
          and.test = function(actual) {
            return m1.test(actual) && m2.test(actual);
          };
          and.message = m1.message + ".and(" + m2.message + ")";
          return and;
        };
        var match = function(expectation, message) {
          var m = sinon.create(matcher);
          var type = sinon.typeOf(expectation);
          switch (type) {
            case "object":
              if (typeof expectation.test === "function") {
                m.test = function(actual) {
                  return expectation.test(actual) === true;
                };
                m.message = "match(" + sinon.functionName(expectation.test) + ")";
                return m;
              }
              var str = [];
              for (var key in expectation) {
                if (expectation.hasOwnProperty(key)) {
                  str.push(key + ": " + expectation[key]);
                }
              }
              m.test = function(actual) {
                return matchObject(expectation, actual);
              };
              m.message = "match(" + str.join(", ") + ")";
              break;
            case "number":
              m.test = function(actual) {
                return expectation == actual;
              };
              break;
            case "string":
              m.test = function(actual) {
                if (typeof actual !== "string") {
                  return false;
                }
                return actual.indexOf(expectation) !== -1;
              };
              m.message = "match(\"" + expectation + "\")";
              break;
            case "regexp":
              m.test = function(actual) {
                if (typeof actual !== "string") {
                  return false;
                }
                return expectation.test(actual);
              };
              break;
            case "function":
              m.test = expectation;
              if (message) {
                m.message = message;
              } else {
                m.message = "match(" + sinon.functionName(expectation) + ")";
              }
              break;
            default:
              m.test = function(actual) {
                return sinon.deepEqual(expectation, actual);
              };
          }
          if (!m.message) {
            m.message = "match(" + expectation + ")";
          }
          return m;
        };
        match.isMatcher = isMatcher;
        match.any = match(function() {
          return true;
        }, "any");
        match.defined = match(function(actual) {
          return actual !== null && actual !== undefined;
        }, "defined");
        match.truthy = match(function(actual) {
          return !!actual;
        }, "truthy");
        match.falsy = match(function(actual) {
          return !actual;
        }, "falsy");
        match.same = function(expectation) {
          return match(function(actual) {
            return expectation === actual;
          }, "same(" + expectation + ")");
        };
        match.typeOf = function(type) {
          assertType(type, "string", "type");
          return match(function(actual) {
            return sinon.typeOf(actual) === type;
          }, "typeOf(\"" + type + "\")");
        };
        match.instanceOf = function(type) {
          assertType(type, "function", "type");
          return match(function(actual) {
            return actual instanceof type;
          }, "instanceOf(" + sinon.functionName(type) + ")");
        };
        function createPropertyMatcher(propertyTest, messagePrefix) {
          return function(property, value) {
            assertType(property, "string", "property");
            var onlyProperty = arguments.length === 1;
            var message = messagePrefix + "(\"" + property + "\"";
            if (!onlyProperty) {
              message += ", " + value;
            }
            message += ")";
            return match(function(actual) {
              if (actual === undefined || actual === null || !propertyTest(actual, property)) {
                return false;
              }
              return onlyProperty || sinon.deepEqual(value, actual[property]);
            }, message);
          };
        }
        match.has = createPropertyMatcher(function(actual, property) {
          if (typeof actual === "object") {
            return property in actual;
          }
          return actual[property] !== undefined;
        }, "has");
        match.hasOwn = createPropertyMatcher(function(actual, property) {
          return actual.hasOwnProperty(property);
        }, "hasOwn");
        match.bool = match.typeOf("boolean");
        match.number = match.typeOf("number");
        match.string = match.typeOf("string");
        match.object = match.typeOf("object");
        match.func = match.typeOf("function");
        match.array = match.typeOf("array");
        match.regexp = match.typeOf("regexp");
        match.date = match.typeOf("date");
        if (commonJSModule) {
          module.exports = match;
        } else {
          sinon.match = match;
        }
      }(typeof sinon == "object" && sinon || null));
    }, {"../sinon": 32}],
    36: [function(require, module, exports) {
      "use strict";
      (function(sinon) {
        var commonJSModule = typeof module == "object" && typeof require == "function";
        var push = [].push;
        if (!sinon && commonJSModule) {
          sinon = require("../sinon");
        }
        if (!sinon) {
          return;
        }
        function mock(object) {
          if (!object) {
            return sinon.expectation.create("Anonymous mock");
          }
          return mock.create(object);
        }
        sinon.mock = mock;
        sinon.extend(mock, (function() {
          function each(collection, callback) {
            if (!collection) {
              return;
            }
            for (var i = 0,
                l = collection.length; i < l; i += 1) {
              callback(collection[i]);
            }
          }
          return {
            create: function create(object) {
              if (!object) {
                throw new TypeError("object is null");
              }
              var mockObject = sinon.extend({}, mock);
              mockObject.object = object;
              delete mockObject.create;
              return mockObject;
            },
            expects: function expects(method) {
              if (!method) {
                throw new TypeError("method is falsy");
              }
              if (!this.expectations) {
                this.expectations = {};
                this.proxies = [];
              }
              if (!this.expectations[method]) {
                this.expectations[method] = [];
                var mockObject = this;
                sinon.wrapMethod(this.object, method, function() {
                  return mockObject.invokeMethod(method, this, arguments);
                });
                push.call(this.proxies, method);
              }
              var expectation = sinon.expectation.create(method);
              push.call(this.expectations[method], expectation);
              return expectation;
            },
            restore: function restore() {
              var object = this.object;
              each(this.proxies, function(proxy) {
                if (typeof object[proxy].restore == "function") {
                  object[proxy].restore();
                }
              });
            },
            verify: function verify() {
              var expectations = this.expectations || {};
              var messages = [],
                  met = [];
              each(this.proxies, function(proxy) {
                each(expectations[proxy], function(expectation) {
                  if (!expectation.met()) {
                    push.call(messages, expectation.toString());
                  } else {
                    push.call(met, expectation.toString());
                  }
                });
              });
              this.restore();
              if (messages.length > 0) {
                sinon.expectation.fail(messages.concat(met).join("\n"));
              } else {
                sinon.expectation.pass(messages.concat(met).join("\n"));
              }
              return true;
            },
            invokeMethod: function invokeMethod(method, thisValue, args) {
              var expectations = this.expectations && this.expectations[method];
              var length = expectations && expectations.length || 0,
                  i;
              for (i = 0; i < length; i += 1) {
                if (!expectations[i].met() && expectations[i].allowsCall(thisValue, args)) {
                  return expectations[i].apply(thisValue, args);
                }
              }
              var messages = [],
                  available,
                  exhausted = 0;
              for (i = 0; i < length; i += 1) {
                if (expectations[i].allowsCall(thisValue, args)) {
                  available = available || expectations[i];
                } else {
                  exhausted += 1;
                }
                push.call(messages, "    " + expectations[i].toString());
              }
              if (exhausted === 0) {
                return available.apply(thisValue, args);
              }
              messages.unshift("Unexpected call: " + sinon.spyCall.toString.call({
                proxy: method,
                args: args
              }));
              sinon.expectation.fail(messages.join("\n"));
            }
          };
        }()));
        var times = sinon.timesInWords;
        sinon.expectation = (function() {
          var slice = Array.prototype.slice;
          var _invoke = sinon.spy.invoke;
          function callCountInWords(callCount) {
            if (callCount == 0) {
              return "never called";
            } else {
              return "called " + times(callCount);
            }
          }
          function expectedCallCountInWords(expectation) {
            var min = expectation.minCalls;
            var max = expectation.maxCalls;
            if (typeof min == "number" && typeof max == "number") {
              var str = times(min);
              if (min != max) {
                str = "at least " + str + " and at most " + times(max);
              }
              return str;
            }
            if (typeof min == "number") {
              return "at least " + times(min);
            }
            return "at most " + times(max);
          }
          function receivedMinCalls(expectation) {
            var hasMinLimit = typeof expectation.minCalls == "number";
            return !hasMinLimit || expectation.callCount >= expectation.minCalls;
          }
          function receivedMaxCalls(expectation) {
            if (typeof expectation.maxCalls != "number") {
              return false;
            }
            return expectation.callCount == expectation.maxCalls;
          }
          return {
            minCalls: 1,
            maxCalls: 1,
            create: function create(methodName) {
              var expectation = sinon.extend(sinon.stub.create(), sinon.expectation);
              delete expectation.create;
              expectation.method = methodName;
              return expectation;
            },
            invoke: function invoke(func, thisValue, args) {
              this.verifyCallAllowed(thisValue, args);
              return _invoke.apply(this, arguments);
            },
            atLeast: function atLeast(num) {
              if (typeof num != "number") {
                throw new TypeError("'" + num + "' is not number");
              }
              if (!this.limitsSet) {
                this.maxCalls = null;
                this.limitsSet = true;
              }
              this.minCalls = num;
              return this;
            },
            atMost: function atMost(num) {
              if (typeof num != "number") {
                throw new TypeError("'" + num + "' is not number");
              }
              if (!this.limitsSet) {
                this.minCalls = null;
                this.limitsSet = true;
              }
              this.maxCalls = num;
              return this;
            },
            never: function never() {
              return this.exactly(0);
            },
            once: function once() {
              return this.exactly(1);
            },
            twice: function twice() {
              return this.exactly(2);
            },
            thrice: function thrice() {
              return this.exactly(3);
            },
            exactly: function exactly(num) {
              if (typeof num != "number") {
                throw new TypeError("'" + num + "' is not a number");
              }
              this.atLeast(num);
              return this.atMost(num);
            },
            met: function met() {
              return !this.failed && receivedMinCalls(this);
            },
            verifyCallAllowed: function verifyCallAllowed(thisValue, args) {
              if (receivedMaxCalls(this)) {
                this.failed = true;
                sinon.expectation.fail(this.method + " already called " + times(this.maxCalls));
              }
              if ("expectedThis" in this && this.expectedThis !== thisValue) {
                sinon.expectation.fail(this.method + " called with " + thisValue + " as thisValue, expected " + this.expectedThis);
              }
              if (!("expectedArguments" in this)) {
                return;
              }
              if (!args) {
                sinon.expectation.fail(this.method + " received no arguments, expected " + sinon.format(this.expectedArguments));
              }
              if (args.length < this.expectedArguments.length) {
                sinon.expectation.fail(this.method + " received too few arguments (" + sinon.format(args) + "), expected " + sinon.format(this.expectedArguments));
              }
              if (this.expectsExactArgCount && args.length != this.expectedArguments.length) {
                sinon.expectation.fail(this.method + " received too many arguments (" + sinon.format(args) + "), expected " + sinon.format(this.expectedArguments));
              }
              for (var i = 0,
                  l = this.expectedArguments.length; i < l; i += 1) {
                if (!sinon.deepEqual(this.expectedArguments[i], args[i])) {
                  sinon.expectation.fail(this.method + " received wrong arguments " + sinon.format(args) + ", expected " + sinon.format(this.expectedArguments));
                }
              }
            },
            allowsCall: function allowsCall(thisValue, args) {
              if (this.met() && receivedMaxCalls(this)) {
                return false;
              }
              if ("expectedThis" in this && this.expectedThis !== thisValue) {
                return false;
              }
              if (!("expectedArguments" in this)) {
                return true;
              }
              args = args || [];
              if (args.length < this.expectedArguments.length) {
                return false;
              }
              if (this.expectsExactArgCount && args.length != this.expectedArguments.length) {
                return false;
              }
              for (var i = 0,
                  l = this.expectedArguments.length; i < l; i += 1) {
                if (!sinon.deepEqual(this.expectedArguments[i], args[i])) {
                  return false;
                }
              }
              return true;
            },
            withArgs: function withArgs() {
              this.expectedArguments = slice.call(arguments);
              return this;
            },
            withExactArgs: function withExactArgs() {
              this.withArgs.apply(this, arguments);
              this.expectsExactArgCount = true;
              return this;
            },
            on: function on(thisValue) {
              this.expectedThis = thisValue;
              return this;
            },
            toString: function() {
              var args = (this.expectedArguments || []).slice();
              if (!this.expectsExactArgCount) {
                push.call(args, "[...]");
              }
              var callStr = sinon.spyCall.toString.call({
                proxy: this.method || "anonymous mock expectation",
                args: args
              });
              var message = callStr.replace(", [...", "[, ...") + " " + expectedCallCountInWords(this);
              if (this.met()) {
                return "Expectation met: " + message;
              }
              return "Expected " + message + " (" + callCountInWords(this.callCount) + ")";
            },
            verify: function verify() {
              if (!this.met()) {
                sinon.expectation.fail(this.toString());
              } else {
                sinon.expectation.pass(this.toString());
              }
              return true;
            },
            pass: function(message) {
              sinon.assert.pass(message);
            },
            fail: function(message) {
              var exception = new Error(message);
              exception.name = "ExpectationError";
              throw exception;
            }
          };
        }());
        if (commonJSModule) {
          module.exports = mock;
        } else {
          sinon.mock = mock;
        }
      }(typeof sinon == "object" && sinon || null));
    }, {"../sinon": 32}],
    37: [function(require, module, exports) {
      "use strict";
      if (typeof module == "object" && typeof require == "function") {
        var sinon = require("../sinon");
        sinon.extend(sinon, require("./util/fake_timers"));
      }
      (function() {
        var push = [].push;
        function exposeValue(sandbox, config, key, value) {
          if (!value) {
            return;
          }
          if (config.injectInto) {
            config.injectInto[key] = value;
          } else {
            push.call(sandbox.args, value);
          }
        }
        function prepareSandboxFromConfig(config) {
          var sandbox = sinon.create(sinon.sandbox);
          if (config.useFakeServer) {
            if (typeof config.useFakeServer == "object") {
              sandbox.serverPrototype = config.useFakeServer;
            }
            sandbox.useFakeServer();
          }
          if (config.useFakeTimers) {
            if (typeof config.useFakeTimers == "object") {
              sandbox.useFakeTimers.apply(sandbox, config.useFakeTimers);
            } else {
              sandbox.useFakeTimers();
            }
          }
          return sandbox;
        }
        sinon.sandbox = sinon.extend(sinon.create(sinon.collection), {
          useFakeTimers: function useFakeTimers() {
            this.clock = sinon.useFakeTimers.apply(sinon, arguments);
            return this.add(this.clock);
          },
          serverPrototype: sinon.fakeServer,
          useFakeServer: function useFakeServer() {
            var proto = this.serverPrototype || sinon.fakeServer;
            if (!proto || !proto.create) {
              return null;
            }
            this.server = proto.create();
            return this.add(this.server);
          },
          inject: function(obj) {
            sinon.collection.inject.call(this, obj);
            if (this.clock) {
              obj.clock = this.clock;
            }
            if (this.server) {
              obj.server = this.server;
              obj.requests = this.server.requests;
            }
            return obj;
          },
          create: function(config) {
            if (!config) {
              return sinon.create(sinon.sandbox);
            }
            var sandbox = prepareSandboxFromConfig(config);
            sandbox.args = sandbox.args || [];
            var prop,
                value,
                exposed = sandbox.inject({});
            if (config.properties) {
              for (var i = 0,
                  l = config.properties.length; i < l; i++) {
                prop = config.properties[i];
                value = exposed[prop] || prop == "sandbox" && sandbox;
                exposeValue(sandbox, config, prop, value);
              }
            } else {
              exposeValue(sandbox, config, "sandbox", value);
            }
            return sandbox;
          }
        });
        sinon.sandbox.useFakeXMLHttpRequest = sinon.sandbox.useFakeServer;
        if (typeof module == "object" && typeof require == "function") {
          module.exports = sinon.sandbox;
        }
      }());
    }, {
      "../sinon": 32,
      "./util/fake_timers": 42
    }],
    38: [function(require, module, exports) {
      "use strict";
      var commonJSModule = typeof module == "object" && typeof require == "function";
      if (!this.sinon && commonJSModule) {
        var sinon = require("../sinon");
      }
      (function(sinon) {
        function throwYieldError(proxy, text, args) {
          var msg = sinon.functionName(proxy) + text;
          if (args.length) {
            msg += " Received [" + slice.call(args).join(", ") + "]";
          }
          throw new Error(msg);
        }
        var slice = Array.prototype.slice;
        var callProto = {
          calledOn: function calledOn(thisValue) {
            if (sinon.match && sinon.match.isMatcher(thisValue)) {
              return thisValue.test(this.thisValue);
            }
            return this.thisValue === thisValue;
          },
          calledWith: function calledWith() {
            for (var i = 0,
                l = arguments.length; i < l; i += 1) {
              if (!sinon.deepEqual(arguments[i], this.args[i])) {
                return false;
              }
            }
            return true;
          },
          calledWithMatch: function calledWithMatch() {
            for (var i = 0,
                l = arguments.length; i < l; i += 1) {
              var actual = this.args[i];
              var expectation = arguments[i];
              if (!sinon.match || !sinon.match(expectation).test(actual)) {
                return false;
              }
            }
            return true;
          },
          calledWithExactly: function calledWithExactly() {
            return arguments.length == this.args.length && this.calledWith.apply(this, arguments);
          },
          notCalledWith: function notCalledWith() {
            return !this.calledWith.apply(this, arguments);
          },
          notCalledWithMatch: function notCalledWithMatch() {
            return !this.calledWithMatch.apply(this, arguments);
          },
          returned: function returned(value) {
            return sinon.deepEqual(value, this.returnValue);
          },
          threw: function threw(error) {
            if (typeof error === "undefined" || !this.exception) {
              return !!this.exception;
            }
            return this.exception === error || this.exception.name === error;
          },
          calledWithNew: function calledWithNew(thisValue) {
            return this.thisValue instanceof this.proxy;
          },
          calledBefore: function(other) {
            return this.callId < other.callId;
          },
          calledAfter: function(other) {
            return this.callId > other.callId;
          },
          callArg: function(pos) {
            this.args[pos]();
          },
          callArgOn: function(pos, thisValue) {
            this.args[pos].apply(thisValue);
          },
          callArgWith: function(pos) {
            this.callArgOnWith.apply(this, [pos, null].concat(slice.call(arguments, 1)));
          },
          callArgOnWith: function(pos, thisValue) {
            var args = slice.call(arguments, 2);
            this.args[pos].apply(thisValue, args);
          },
          "yield": function() {
            this.yieldOn.apply(this, [null].concat(slice.call(arguments, 0)));
          },
          yieldOn: function(thisValue) {
            var args = this.args;
            for (var i = 0,
                l = args.length; i < l; ++i) {
              if (typeof args[i] === "function") {
                args[i].apply(thisValue, slice.call(arguments, 1));
                return;
              }
            }
            throwYieldError(this.proxy, " cannot yield since no callback was passed.", args);
          },
          yieldTo: function(prop) {
            this.yieldToOn.apply(this, [prop, null].concat(slice.call(arguments, 1)));
          },
          yieldToOn: function(prop, thisValue) {
            var args = this.args;
            for (var i = 0,
                l = args.length; i < l; ++i) {
              if (args[i] && typeof args[i][prop] === "function") {
                args[i][prop].apply(thisValue, slice.call(arguments, 2));
                return;
              }
            }
            throwYieldError(this.proxy, " cannot yield to '" + prop + "' since no callback was passed.", args);
          },
          toString: function() {
            var callStr = this.proxy.toString() + "(";
            var args = [];
            for (var i = 0,
                l = this.args.length; i < l; ++i) {
              args.push(sinon.format(this.args[i]));
            }
            callStr = callStr + args.join(", ") + ")";
            if (typeof this.returnValue != "undefined") {
              callStr += " => " + sinon.format(this.returnValue);
            }
            if (this.exception) {
              callStr += " !" + this.exception.name;
              if (this.exception.message) {
                callStr += "(" + this.exception.message + ")";
              }
            }
            return callStr;
          }
        };
        callProto.invokeCallback = callProto.yield;
        function createSpyCall(spy, thisValue, args, returnValue, exception, id) {
          if (typeof id !== "number") {
            throw new TypeError("Call id is not a number");
          }
          var proxyCall = sinon.create(callProto);
          proxyCall.proxy = spy;
          proxyCall.thisValue = thisValue;
          proxyCall.args = args;
          proxyCall.returnValue = returnValue;
          proxyCall.exception = exception;
          proxyCall.callId = id;
          return proxyCall;
        }
        ;
        createSpyCall.toString = callProto.toString;
        sinon.spyCall = createSpyCall;
      }(typeof sinon == "object" && sinon || null));
      "use strict";
      (function(sinon) {
        var commonJSModule = typeof module == "object" && typeof require == "function";
        var push = Array.prototype.push;
        var slice = Array.prototype.slice;
        var callId = 0;
        function spy(object, property) {
          if (!property && typeof object == "function") {
            return spy.create(object);
          }
          if (!object && !property) {
            return spy.create(function() {});
          }
          var method = object[property];
          return sinon.wrapMethod(object, property, spy.create(method));
        }
        function matchingFake(fakes, args, strict) {
          if (!fakes) {
            return;
          }
          var alen = args.length;
          for (var i = 0,
              l = fakes.length; i < l; i++) {
            if (fakes[i].matches(args, strict)) {
              return fakes[i];
            }
          }
        }
        function incrementCallCount() {
          this.called = true;
          this.callCount += 1;
          this.notCalled = false;
          this.calledOnce = this.callCount == 1;
          this.calledTwice = this.callCount == 2;
          this.calledThrice = this.callCount == 3;
        }
        function createCallProperties() {
          this.firstCall = this.getCall(0);
          this.secondCall = this.getCall(1);
          this.thirdCall = this.getCall(2);
          this.lastCall = this.getCall(this.callCount - 1);
        }
        var vars = "a,b,c,d,e,f,g,h,i,j,k,l";
        function createProxy(func) {
          var p;
          if (func.length) {
            eval("p = (function proxy(" + vars.substring(0, func.length * 2 - 1) + ") { return p.invoke(func, this, slice.call(arguments)); });");
          } else {
            p = function proxy() {
              return p.invoke(func, this, slice.call(arguments));
            };
          }
          return p;
        }
        var uuid = 0;
        var spyApi = {
          reset: function() {
            this.called = false;
            this.notCalled = true;
            this.calledOnce = false;
            this.calledTwice = false;
            this.calledThrice = false;
            this.callCount = 0;
            this.firstCall = null;
            this.secondCall = null;
            this.thirdCall = null;
            this.lastCall = null;
            this.args = [];
            this.returnValues = [];
            this.thisValues = [];
            this.exceptions = [];
            this.callIds = [];
            if (this.fakes) {
              for (var i = 0; i < this.fakes.length; i++) {
                this.fakes[i].reset();
              }
            }
          },
          create: function create(func) {
            var name;
            if (typeof func != "function") {
              func = function() {};
            } else {
              name = sinon.functionName(func);
            }
            var proxy = createProxy(func);
            sinon.extend(proxy, spy);
            delete proxy.create;
            sinon.extend(proxy, func);
            proxy.reset();
            proxy.prototype = func.prototype;
            proxy.displayName = name || "spy";
            proxy.toString = sinon.functionToString;
            proxy._create = sinon.spy.create;
            proxy.id = "spy#" + uuid++;
            return proxy;
          },
          invoke: function invoke(func, thisValue, args) {
            var matching = matchingFake(this.fakes, args);
            var exception,
                returnValue;
            incrementCallCount.call(this);
            push.call(this.thisValues, thisValue);
            push.call(this.args, args);
            push.call(this.callIds, callId++);
            try {
              if (matching) {
                returnValue = matching.invoke(func, thisValue, args);
              } else {
                returnValue = (this.func || func).apply(thisValue, args);
              }
            } catch (e) {
              push.call(this.returnValues, undefined);
              exception = e;
              throw e;
            } finally {
              push.call(this.exceptions, exception);
            }
            push.call(this.returnValues, returnValue);
            createCallProperties.call(this);
            return returnValue;
          },
          getCall: function getCall(i) {
            if (i < 0 || i >= this.callCount) {
              return null;
            }
            return sinon.spyCall(this, this.thisValues[i], this.args[i], this.returnValues[i], this.exceptions[i], this.callIds[i]);
          },
          calledBefore: function calledBefore(spyFn) {
            if (!this.called) {
              return false;
            }
            if (!spyFn.called) {
              return true;
            }
            return this.callIds[0] < spyFn.callIds[spyFn.callIds.length - 1];
          },
          calledAfter: function calledAfter(spyFn) {
            if (!this.called || !spyFn.called) {
              return false;
            }
            return this.callIds[this.callCount - 1] > spyFn.callIds[spyFn.callCount - 1];
          },
          withArgs: function() {
            var args = slice.call(arguments);
            if (this.fakes) {
              var match = matchingFake(this.fakes, args, true);
              if (match) {
                return match;
              }
            } else {
              this.fakes = [];
            }
            var original = this;
            var fake = this._create();
            fake.matchingAguments = args;
            push.call(this.fakes, fake);
            fake.withArgs = function() {
              return original.withArgs.apply(original, arguments);
            };
            for (var i = 0; i < this.args.length; i++) {
              if (fake.matches(this.args[i])) {
                incrementCallCount.call(fake);
                push.call(fake.thisValues, this.thisValues[i]);
                push.call(fake.args, this.args[i]);
                push.call(fake.returnValues, this.returnValues[i]);
                push.call(fake.exceptions, this.exceptions[i]);
                push.call(fake.callIds, this.callIds[i]);
              }
            }
            createCallProperties.call(fake);
            return fake;
          },
          matches: function(args, strict) {
            var margs = this.matchingAguments;
            if (margs.length <= args.length && sinon.deepEqual(margs, args.slice(0, margs.length))) {
              return !strict || margs.length == args.length;
            }
          },
          printf: function(format) {
            var spy = this;
            var args = slice.call(arguments, 1);
            var formatter;
            return (format || "").replace(/%(.)/g, function(match, specifyer) {
              formatter = spyApi.formatters[specifyer];
              if (typeof formatter == "function") {
                return formatter.call(null, spy, args);
              } else if (!isNaN(parseInt(specifyer), 10)) {
                return sinon.format(args[specifyer - 1]);
              }
              return "%" + specifyer;
            });
          }
        };
        function delegateToCalls(method, matchAny, actual, notCalled) {
          spyApi[method] = function() {
            if (!this.called) {
              if (notCalled) {
                return notCalled.apply(this, arguments);
              }
              return false;
            }
            var currentCall;
            var matches = 0;
            for (var i = 0,
                l = this.callCount; i < l; i += 1) {
              currentCall = this.getCall(i);
              if (currentCall[actual || method].apply(currentCall, arguments)) {
                matches += 1;
                if (matchAny) {
                  return true;
                }
              }
            }
            return matches === this.callCount;
          };
        }
        delegateToCalls("calledOn", true);
        delegateToCalls("alwaysCalledOn", false, "calledOn");
        delegateToCalls("calledWith", true);
        delegateToCalls("calledWithMatch", true);
        delegateToCalls("alwaysCalledWith", false, "calledWith");
        delegateToCalls("alwaysCalledWithMatch", false, "calledWithMatch");
        delegateToCalls("calledWithExactly", true);
        delegateToCalls("alwaysCalledWithExactly", false, "calledWithExactly");
        delegateToCalls("neverCalledWith", false, "notCalledWith", function() {
          return true;
        });
        delegateToCalls("neverCalledWithMatch", false, "notCalledWithMatch", function() {
          return true;
        });
        delegateToCalls("threw", true);
        delegateToCalls("alwaysThrew", false, "threw");
        delegateToCalls("returned", true);
        delegateToCalls("alwaysReturned", false, "returned");
        delegateToCalls("calledWithNew", true);
        delegateToCalls("alwaysCalledWithNew", false, "calledWithNew");
        delegateToCalls("callArg", false, "callArgWith", function() {
          throw new Error(this.toString() + " cannot call arg since it was not yet invoked.");
        });
        spyApi.callArgWith = spyApi.callArg;
        delegateToCalls("callArgOn", false, "callArgOnWith", function() {
          throw new Error(this.toString() + " cannot call arg since it was not yet invoked.");
        });
        spyApi.callArgOnWith = spyApi.callArgOn;
        delegateToCalls("yield", false, "yield", function() {
          throw new Error(this.toString() + " cannot yield since it was not yet invoked.");
        });
        spyApi.invokeCallback = spyApi.yield;
        delegateToCalls("yieldOn", false, "yieldOn", function() {
          throw new Error(this.toString() + " cannot yield since it was not yet invoked.");
        });
        delegateToCalls("yieldTo", false, "yieldTo", function(property) {
          throw new Error(this.toString() + " cannot yield to '" + property + "' since it was not yet invoked.");
        });
        delegateToCalls("yieldToOn", false, "yieldToOn", function(property) {
          throw new Error(this.toString() + " cannot yield to '" + property + "' since it was not yet invoked.");
        });
        spyApi.formatters = {
          "c": function(spy) {
            return sinon.timesInWords(spy.callCount);
          },
          "n": function(spy) {
            return spy.toString();
          },
          "C": function(spy) {
            var calls = [];
            for (var i = 0,
                l = spy.callCount; i < l; ++i) {
              var stringifiedCall = "    " + spy.getCall(i).toString();
              if (/\n/.test(calls[i - 1])) {
                stringifiedCall = "\n" + stringifiedCall;
              }
              push.call(calls, stringifiedCall);
            }
            return calls.length > 0 ? "\n" + calls.join("\n") : "";
          },
          "t": function(spy) {
            var objects = [];
            for (var i = 0,
                l = spy.callCount; i < l; ++i) {
              push.call(objects, sinon.format(spy.thisValues[i]));
            }
            return objects.join(", ");
          },
          "*": function(spy, args) {
            var formatted = [];
            for (var i = 0,
                l = args.length; i < l; ++i) {
              push.call(formatted, sinon.format(args[i]));
            }
            return formatted.join(", ");
          }
        };
        sinon.extend(spy, spyApi);
        spy.spyCall = sinon.spyCall;
        if (commonJSModule) {
          module.exports = spy;
        } else {
          sinon.spy = spy;
        }
      }(typeof sinon == "object" && sinon || null));
    }, {"../sinon": 32}],
    39: [function(require, module, exports) {
      var process = require("__browserify_process");
      "use strict";
      (function(sinon) {
        var commonJSModule = typeof module == "object" && typeof require == "function";
        if (!sinon && commonJSModule) {
          sinon = require("../sinon");
        }
        if (!sinon) {
          return;
        }
        function stub(object, property, func) {
          if (!!func && typeof func != "function") {
            throw new TypeError("Custom stub should be function");
          }
          var wrapper;
          if (func) {
            wrapper = sinon.spy && sinon.spy.create ? sinon.spy.create(func) : func;
          } else {
            wrapper = stub.create();
          }
          if (!object && !property) {
            return sinon.stub.create();
          }
          if (!property && !!object && typeof object == "object") {
            for (var prop in object) {
              if (typeof object[prop] === "function") {
                stub(object, prop);
              }
            }
            return object;
          }
          return sinon.wrapMethod(object, property, wrapper);
        }
        function getChangingValue(stub, property) {
          var index = stub.callCount - 1;
          var values = stub[property];
          var prop = index in values ? values[index] : values[values.length - 1];
          stub[property + "Last"] = prop;
          return prop;
        }
        function getCallback(stub, args) {
          var callArgAt = getChangingValue(stub, "callArgAts");
          if (callArgAt < 0) {
            var callArgProp = getChangingValue(stub, "callArgProps");
            for (var i = 0,
                l = args.length; i < l; ++i) {
              if (!callArgProp && typeof args[i] == "function") {
                return args[i];
              }
              if (callArgProp && args[i] && typeof args[i][callArgProp] == "function") {
                return args[i][callArgProp];
              }
            }
            return null;
          }
          return args[callArgAt];
        }
        var join = Array.prototype.join;
        function getCallbackError(stub, func, args) {
          if (stub.callArgAtsLast < 0) {
            var msg;
            if (stub.callArgPropsLast) {
              msg = sinon.functionName(stub) + " expected to yield to '" + stub.callArgPropsLast + "', but no object with such a property was passed.";
            } else {
              msg = sinon.functionName(stub) + " expected to yield, but no callback was passed.";
            }
            if (args.length > 0) {
              msg += " Received [" + join.call(args, ", ") + "]";
            }
            return msg;
          }
          return "argument at index " + stub.callArgAtsLast + " is not a function: " + func;
        }
        var nextTick = (function() {
          if (typeof process === "object" && typeof process.nextTick === "function") {
            return process.nextTick;
          } else if (typeof setImmediate === "function") {
            return setImmediate;
          } else {
            return function(callback) {
              setTimeout(callback, 0);
            };
          }
        })();
        function callCallback(stub, args) {
          if (stub.callArgAts.length > 0) {
            var func = getCallback(stub, args);
            if (typeof func != "function") {
              throw new TypeError(getCallbackError(stub, func, args));
            }
            var callbackArguments = getChangingValue(stub, "callbackArguments");
            var callbackContext = getChangingValue(stub, "callbackContexts");
            if (stub.callbackAsync) {
              nextTick(function() {
                func.apply(callbackContext, callbackArguments);
              });
            } else {
              func.apply(callbackContext, callbackArguments);
            }
          }
        }
        var uuid = 0;
        sinon.extend(stub, (function() {
          var slice = Array.prototype.slice,
              proto;
          function throwsException(error, message) {
            if (typeof error == "string") {
              this.exception = new Error(message || "");
              this.exception.name = error;
            } else if (!error) {
              this.exception = new Error("Error");
            } else {
              this.exception = error;
            }
            return this;
          }
          proto = {
            create: function create() {
              var functionStub = function() {
                callCallback(functionStub, arguments);
                if (functionStub.exception) {
                  throw functionStub.exception;
                } else if (typeof functionStub.returnArgAt == 'number') {
                  return arguments[functionStub.returnArgAt];
                } else if (functionStub.returnThis) {
                  return this;
                }
                return functionStub.returnValue;
              };
              functionStub.id = "stub#" + uuid++;
              var orig = functionStub;
              functionStub = sinon.spy.create(functionStub);
              functionStub.func = orig;
              functionStub.callArgAts = [];
              functionStub.callbackArguments = [];
              functionStub.callbackContexts = [];
              functionStub.callArgProps = [];
              sinon.extend(functionStub, stub);
              functionStub._create = sinon.stub.create;
              functionStub.displayName = "stub";
              functionStub.toString = sinon.functionToString;
              return functionStub;
            },
            resetBehavior: function() {
              var i;
              this.callArgAts = [];
              this.callbackArguments = [];
              this.callbackContexts = [];
              this.callArgProps = [];
              delete this.returnValue;
              delete this.returnArgAt;
              this.returnThis = false;
              if (this.fakes) {
                for (i = 0; i < this.fakes.length; i++) {
                  this.fakes[i].resetBehavior();
                }
              }
            },
            returns: function returns(value) {
              this.returnValue = value;
              return this;
            },
            returnsArg: function returnsArg(pos) {
              if (typeof pos != "number") {
                throw new TypeError("argument index is not number");
              }
              this.returnArgAt = pos;
              return this;
            },
            returnsThis: function returnsThis() {
              this.returnThis = true;
              return this;
            },
            "throws": throwsException,
            throwsException: throwsException,
            callsArg: function callsArg(pos) {
              if (typeof pos != "number") {
                throw new TypeError("argument index is not number");
              }
              this.callArgAts.push(pos);
              this.callbackArguments.push([]);
              this.callbackContexts.push(undefined);
              this.callArgProps.push(undefined);
              return this;
            },
            callsArgOn: function callsArgOn(pos, context) {
              if (typeof pos != "number") {
                throw new TypeError("argument index is not number");
              }
              if (typeof context != "object") {
                throw new TypeError("argument context is not an object");
              }
              this.callArgAts.push(pos);
              this.callbackArguments.push([]);
              this.callbackContexts.push(context);
              this.callArgProps.push(undefined);
              return this;
            },
            callsArgWith: function callsArgWith(pos) {
              if (typeof pos != "number") {
                throw new TypeError("argument index is not number");
              }
              this.callArgAts.push(pos);
              this.callbackArguments.push(slice.call(arguments, 1));
              this.callbackContexts.push(undefined);
              this.callArgProps.push(undefined);
              return this;
            },
            callsArgOnWith: function callsArgWith(pos, context) {
              if (typeof pos != "number") {
                throw new TypeError("argument index is not number");
              }
              if (typeof context != "object") {
                throw new TypeError("argument context is not an object");
              }
              this.callArgAts.push(pos);
              this.callbackArguments.push(slice.call(arguments, 2));
              this.callbackContexts.push(context);
              this.callArgProps.push(undefined);
              return this;
            },
            yields: function() {
              this.callArgAts.push(-1);
              this.callbackArguments.push(slice.call(arguments, 0));
              this.callbackContexts.push(undefined);
              this.callArgProps.push(undefined);
              return this;
            },
            yieldsOn: function(context) {
              if (typeof context != "object") {
                throw new TypeError("argument context is not an object");
              }
              this.callArgAts.push(-1);
              this.callbackArguments.push(slice.call(arguments, 1));
              this.callbackContexts.push(context);
              this.callArgProps.push(undefined);
              return this;
            },
            yieldsTo: function(prop) {
              this.callArgAts.push(-1);
              this.callbackArguments.push(slice.call(arguments, 1));
              this.callbackContexts.push(undefined);
              this.callArgProps.push(prop);
              return this;
            },
            yieldsToOn: function(prop, context) {
              if (typeof context != "object") {
                throw new TypeError("argument context is not an object");
              }
              this.callArgAts.push(-1);
              this.callbackArguments.push(slice.call(arguments, 2));
              this.callbackContexts.push(context);
              this.callArgProps.push(prop);
              return this;
            }
          };
          for (var method in proto) {
            if (proto.hasOwnProperty(method) && method.match(/^(callsArg|yields|thenYields$)/) && !method.match(/Async/)) {
              proto[method + 'Async'] = (function(syncFnName) {
                return function() {
                  this.callbackAsync = true;
                  return this[syncFnName].apply(this, arguments);
                };
              })(method);
            }
          }
          return proto;
        }()));
        if (commonJSModule) {
          module.exports = stub;
        } else {
          sinon.stub = stub;
        }
      }(typeof sinon == "object" && sinon || null));
    }, {
      "../sinon": 32,
      "__browserify_process": 31
    }],
    40: [function(require, module, exports) {
      "use strict";
      (function(sinon) {
        var commonJSModule = typeof module == "object" && typeof require == "function";
        if (!sinon && commonJSModule) {
          sinon = require("../sinon");
        }
        if (!sinon) {
          return;
        }
        function test(callback) {
          var type = typeof callback;
          if (type != "function") {
            throw new TypeError("sinon.test needs to wrap a test function, got " + type);
          }
          return function() {
            var config = sinon.getConfig(sinon.config);
            config.injectInto = config.injectIntoThis && this || config.injectInto;
            var sandbox = sinon.sandbox.create(config);
            var exception,
                result;
            var args = Array.prototype.slice.call(arguments).concat(sandbox.args);
            try {
              result = callback.apply(this, args);
            } catch (e) {
              exception = e;
            }
            if (typeof exception !== "undefined") {
              sandbox.restore();
              throw exception;
            } else {
              sandbox.verifyAndRestore();
            }
            return result;
          };
        }
        test.config = {
          injectIntoThis: true,
          injectInto: null,
          properties: ["spy", "stub", "mock", "clock", "server", "requests"],
          useFakeTimers: true,
          useFakeServer: true
        };
        if (commonJSModule) {
          module.exports = test;
        } else {
          sinon.test = test;
        }
      }(typeof sinon == "object" && sinon || null));
    }, {"../sinon": 32}],
    41: [function(require, module, exports) {
      "use strict";
      (function(sinon) {
        var commonJSModule = typeof module == "object" && typeof require == "function";
        if (!sinon && commonJSModule) {
          sinon = require("../sinon");
        }
        if (!sinon || !Object.prototype.hasOwnProperty) {
          return;
        }
        function createTest(property, setUp, tearDown) {
          return function() {
            if (setUp) {
              setUp.apply(this, arguments);
            }
            var exception,
                result;
            try {
              result = property.apply(this, arguments);
            } catch (e) {
              exception = e;
            }
            if (tearDown) {
              tearDown.apply(this, arguments);
            }
            if (exception) {
              throw exception;
            }
            return result;
          };
        }
        function testCase(tests, prefix) {
          if (!tests || typeof tests != "object") {
            throw new TypeError("sinon.testCase needs an object with test functions");
          }
          prefix = prefix || "test";
          var rPrefix = new RegExp("^" + prefix);
          var methods = {},
              testName,
              property,
              method;
          var setUp = tests.setUp;
          var tearDown = tests.tearDown;
          for (testName in tests) {
            if (tests.hasOwnProperty(testName)) {
              property = tests[testName];
              if (/^(setUp|tearDown)$/.test(testName)) {
                continue;
              }
              if (typeof property == "function" && rPrefix.test(testName)) {
                method = property;
                if (setUp || tearDown) {
                  method = createTest(property, setUp, tearDown);
                }
                methods[testName] = sinon.test(method);
              } else {
                methods[testName] = tests[testName];
              }
            }
          }
          return methods;
        }
        if (commonJSModule) {
          module.exports = testCase;
        } else {
          sinon.testCase = testCase;
        }
      }(typeof sinon == "object" && sinon || null));
    }, {"../sinon": 32}],
    42: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      "use strict";
      if (typeof sinon == "undefined") {
        var sinon = {};
      }
      (function(global) {
        var id = 1;
        function addTimer(args, recurring) {
          if (args.length === 0) {
            throw new Error("Function requires at least 1 parameter");
          }
          var toId = id++;
          var delay = args[1] || 0;
          if (!this.timeouts) {
            this.timeouts = {};
          }
          this.timeouts[toId] = {
            id: toId,
            func: args[0],
            callAt: this.now + delay,
            invokeArgs: Array.prototype.slice.call(args, 2)
          };
          if (recurring === true) {
            this.timeouts[toId].interval = delay;
          }
          return toId;
        }
        function parseTime(str) {
          if (!str) {
            return 0;
          }
          var strings = str.split(":");
          var l = strings.length,
              i = l;
          var ms = 0,
              parsed;
          if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
            throw new Error("tick only understands numbers and 'h:m:s'");
          }
          while (i--) {
            parsed = parseInt(strings[i], 10);
            if (parsed >= 60) {
              throw new Error("Invalid time " + str);
            }
            ms += parsed * Math.pow(60, (l - i - 1));
          }
          return ms * 1000;
        }
        function createObject(object) {
          var newObject;
          if (Object.create) {
            newObject = Object.create(object);
          } else {
            var F = function() {};
            F.prototype = object;
            newObject = new F();
          }
          newObject.Date.clock = newObject;
          return newObject;
        }
        sinon.clock = {
          now: 0,
          create: function create(now) {
            var clock = createObject(this);
            if (typeof now == "number") {
              clock.now = now;
            }
            if (!!now && typeof now == "object") {
              throw new TypeError("now should be milliseconds since UNIX epoch");
            }
            return clock;
          },
          setTimeout: function setTimeout(callback, timeout) {
            return addTimer.call(this, arguments, false);
          },
          clearTimeout: function clearTimeout(timerId) {
            if (!this.timeouts) {
              this.timeouts = [];
            }
            if (timerId in this.timeouts) {
              delete this.timeouts[timerId];
            }
          },
          setInterval: function setInterval(callback, timeout) {
            return addTimer.call(this, arguments, true);
          },
          clearInterval: function clearInterval(timerId) {
            this.clearTimeout(timerId);
          },
          tick: function tick(ms) {
            ms = typeof ms == "number" ? ms : parseTime(ms);
            var tickFrom = this.now,
                tickTo = this.now + ms,
                previous = this.now;
            var timer = this.firstTimerInRange(tickFrom, tickTo);
            var firstException;
            while (timer && tickFrom <= tickTo) {
              if (this.timeouts[timer.id]) {
                tickFrom = this.now = timer.callAt;
                try {
                  this.callTimer(timer);
                } catch (e) {
                  firstException = firstException || e;
                }
              }
              timer = this.firstTimerInRange(previous, tickTo);
              previous = tickFrom;
            }
            this.now = tickTo;
            if (firstException) {
              throw firstException;
            }
            return this.now;
          },
          firstTimerInRange: function(from, to) {
            var timer,
                smallest,
                originalTimer;
            for (var id in this.timeouts) {
              if (this.timeouts.hasOwnProperty(id)) {
                if (this.timeouts[id].callAt < from || this.timeouts[id].callAt > to) {
                  continue;
                }
                if (!smallest || this.timeouts[id].callAt < smallest) {
                  originalTimer = this.timeouts[id];
                  smallest = this.timeouts[id].callAt;
                  timer = {
                    func: this.timeouts[id].func,
                    callAt: this.timeouts[id].callAt,
                    interval: this.timeouts[id].interval,
                    id: this.timeouts[id].id,
                    invokeArgs: this.timeouts[id].invokeArgs
                  };
                }
              }
            }
            return timer || null;
          },
          callTimer: function(timer) {
            if (typeof timer.interval == "number") {
              this.timeouts[timer.id].callAt += timer.interval;
            } else {
              delete this.timeouts[timer.id];
            }
            try {
              if (typeof timer.func == "function") {
                timer.func.apply(null, timer.invokeArgs);
              } else {
                eval(timer.func);
              }
            } catch (e) {
              var exception = e;
            }
            if (!this.timeouts[timer.id]) {
              if (exception) {
                throw exception;
              }
              return;
            }
            if (exception) {
              throw exception;
            }
          },
          reset: function reset() {
            this.timeouts = {};
          },
          Date: (function() {
            var NativeDate = Date;
            function ClockDate(year, month, date, hour, minute, second, ms) {
              switch (arguments.length) {
                case 0:
                  return new NativeDate(ClockDate.clock.now);
                case 1:
                  return new NativeDate(year);
                case 2:
                  return new NativeDate(year, month);
                case 3:
                  return new NativeDate(year, month, date);
                case 4:
                  return new NativeDate(year, month, date, hour);
                case 5:
                  return new NativeDate(year, month, date, hour, minute);
                case 6:
                  return new NativeDate(year, month, date, hour, minute, second);
                default:
                  return new NativeDate(year, month, date, hour, minute, second, ms);
              }
            }
            return mirrorDateProperties(ClockDate, NativeDate);
          }())
        };
        function mirrorDateProperties(target, source) {
          if (source.now) {
            target.now = function now() {
              return target.clock.now;
            };
          } else {
            delete target.now;
          }
          if (source.toSource) {
            target.toSource = function toSource() {
              return source.toSource();
            };
          } else {
            delete target.toSource;
          }
          target.toString = function toString() {
            return source.toString();
          };
          target.prototype = source.prototype;
          target.parse = source.parse;
          target.UTC = source.UTC;
          target.prototype.toUTCString = source.prototype.toUTCString;
          return target;
        }
        var methods = ["Date", "setTimeout", "setInterval", "clearTimeout", "clearInterval"];
        function restore() {
          var method;
          for (var i = 0,
              l = this.methods.length; i < l; i++) {
            method = this.methods[i];
            if (global[method].hadOwnProperty) {
              global[method] = this["_" + method];
            } else {
              delete global[method];
            }
          }
          this.methods = [];
        }
        function stubGlobal(method, clock) {
          clock[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(global, method);
          clock["_" + method] = global[method];
          if (method == "Date") {
            var date = mirrorDateProperties(clock[method], global[method]);
            global[method] = date;
          } else {
            global[method] = function() {
              return clock[method].apply(clock, arguments);
            };
            for (var prop in clock[method]) {
              if (clock[method].hasOwnProperty(prop)) {
                global[method][prop] = clock[method][prop];
              }
            }
          }
          global[method].clock = clock;
        }
        sinon.useFakeTimers = function useFakeTimers(now) {
          var clock = sinon.clock.create(now);
          clock.restore = restore;
          clock.methods = Array.prototype.slice.call(arguments, typeof now == "number" ? 1 : 0);
          if (clock.methods.length === 0) {
            clock.methods = methods;
          }
          for (var i = 0,
              l = clock.methods.length; i < l; i++) {
            stubGlobal(clock.methods[i], clock);
          }
          return clock;
        };
      }(typeof global != "undefined" && typeof global !== "function" ? global : this));
      sinon.timers = {
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setInterval: setInterval,
        clearInterval: clearInterval,
        Date: Date
      };
      if (typeof module == "object" && typeof require == "function") {
        module.exports = sinon;
      }
    }, {}],
    43: [function(require, module, exports) {
      var global = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
      if (typeof buster === "undefined") {
        var buster = {};
      }
      if (typeof module === "object" && typeof require === "function") {
        buster = require("buster-core");
      }
      buster.format = buster.format || {};
      buster.format.excludeConstructors = ["Object", /^.$/];
      buster.format.quoteStrings = true;
      buster.format.ascii = (function() {
        "use strict";
        var hasOwn = Object.prototype.hasOwnProperty;
        var specialObjects = [];
        if (typeof global != "undefined") {
          specialObjects.push({
            obj: global,
            value: "[object global]"
          });
        }
        if (typeof document != "undefined") {
          specialObjects.push({
            obj: document,
            value: "[object HTMLDocument]"
          });
        }
        if (typeof window != "undefined") {
          specialObjects.push({
            obj: window,
            value: "[object Window]"
          });
        }
        function keys(object) {
          var k = Object.keys && Object.keys(object) || [];
          if (k.length == 0) {
            for (var prop in object) {
              if (hasOwn.call(object, prop)) {
                k.push(prop);
              }
            }
          }
          return k.sort();
        }
        function isCircular(object, objects) {
          if (typeof object != "object") {
            return false;
          }
          for (var i = 0,
              l = objects.length; i < l; ++i) {
            if (objects[i] === object) {
              return true;
            }
          }
          return false;
        }
        function ascii(object, processed, indent) {
          if (typeof object == "string") {
            var quote = typeof this.quoteStrings != "boolean" || this.quoteStrings;
            return processed || quote ? '"' + object + '"' : object;
          }
          if (typeof object == "function" && !(object instanceof RegExp)) {
            return ascii.func(object);
          }
          processed = processed || [];
          if (isCircular(object, processed)) {
            return "[Circular]";
          }
          if (Object.prototype.toString.call(object) == "[object Array]") {
            return ascii.array.call(this, object, processed);
          }
          if (!object) {
            return "" + object;
          }
          if (buster.isElement(object)) {
            return ascii.element(object);
          }
          if (typeof object.toString == "function" && object.toString !== Object.prototype.toString) {
            return object.toString();
          }
          for (var i = 0,
              l = specialObjects.length; i < l; i++) {
            if (object === specialObjects[i].obj) {
              return specialObjects[i].value;
            }
          }
          return ascii.object.call(this, object, processed, indent);
        }
        ascii.func = function(func) {
          return "function " + buster.functionName(func) + "() {}";
        };
        ascii.array = function(array, processed) {
          processed = processed || [];
          processed.push(array);
          var pieces = [];
          for (var i = 0,
              l = array.length; i < l; ++i) {
            pieces.push(ascii.call(this, array[i], processed));
          }
          return "[" + pieces.join(", ") + "]";
        };
        ascii.object = function(object, processed, indent) {
          processed = processed || [];
          processed.push(object);
          indent = indent || 0;
          var pieces = [],
              properties = keys(object),
              prop,
              str,
              obj;
          var is = "";
          var length = 3;
          for (var i = 0,
              l = indent; i < l; ++i) {
            is += " ";
          }
          for (i = 0, l = properties.length; i < l; ++i) {
            prop = properties[i];
            obj = object[prop];
            if (isCircular(obj, processed)) {
              str = "[Circular]";
            } else {
              str = ascii.call(this, obj, processed, indent + 2);
            }
            str = (/\s/.test(prop) ? '"' + prop + '"' : prop) + ": " + str;
            length += str.length;
            pieces.push(str);
          }
          var cons = ascii.constructorName.call(this, object);
          var prefix = cons ? "[" + cons + "] " : "";
          return (length + indent) > 80 ? prefix + "{\n  " + is + pieces.join(",\n  " + is) + "\n" + is + "}" : prefix + "{ " + pieces.join(", ") + " }";
        };
        ascii.element = function(element) {
          var tagName = element.tagName.toLowerCase();
          var attrs = element.attributes,
              attribute,
              pairs = [],
              attrName;
          for (var i = 0,
              l = attrs.length; i < l; ++i) {
            attribute = attrs.item(i);
            attrName = attribute.nodeName.toLowerCase().replace("html:", "");
            if (attrName == "contenteditable" && attribute.nodeValue == "inherit") {
              continue;
            }
            if (!!attribute.nodeValue) {
              pairs.push(attrName + "=\"" + attribute.nodeValue + "\"");
            }
          }
          var formatted = "<" + tagName + (pairs.length > 0 ? " " : "");
          var content = element.innerHTML;
          if (content.length > 20) {
            content = content.substr(0, 20) + "[...]";
          }
          var res = formatted + pairs.join(" ") + ">" + content + "</" + tagName + ">";
          return res.replace(/ contentEditable="inherit"/, "");
        };
        ascii.constructorName = function(object) {
          var name = buster.functionName(object && object.constructor);
          var excludes = this.excludeConstructors || buster.format.excludeConstructors || [];
          for (var i = 0,
              l = excludes.length; i < l; ++i) {
            if (typeof excludes[i] == "string" && excludes[i] == name) {
              return "";
            } else if (excludes[i].test && excludes[i].test(name)) {
              return "";
            }
          }
          return name;
        };
        return ascii;
      }());
      if (typeof module != "undefined") {
        module.exports = buster.format;
      }
    }, {"buster-core": 44}],
    44: [function(require, module, exports) {
      var process = require("__browserify_process");
      var buster = (function(setTimeout, B) {
        var isNode = typeof require == "function" && typeof module == "object";
        var div = typeof document != "undefined" && document.createElement("div");
        var F = function() {};
        var buster = {
          bind: function bind(obj, methOrProp) {
            var method = typeof methOrProp == "string" ? obj[methOrProp] : methOrProp;
            var args = Array.prototype.slice.call(arguments, 2);
            return function() {
              var allArgs = args.concat(Array.prototype.slice.call(arguments));
              return method.apply(obj, allArgs);
            };
          },
          partial: function partial(fn) {
            var args = [].slice.call(arguments, 1);
            return function() {
              return fn.apply(this, args.concat([].slice.call(arguments)));
            };
          },
          create: function create(object) {
            F.prototype = object;
            return new F();
          },
          extend: function extend(target) {
            if (!target) {
              return;
            }
            for (var i = 1,
                l = arguments.length,
                prop; i < l; ++i) {
              for (prop in arguments[i]) {
                target[prop] = arguments[i][prop];
              }
            }
            return target;
          },
          nextTick: function nextTick(callback) {
            if (typeof process != "undefined" && process.nextTick) {
              return process.nextTick(callback);
            }
            setTimeout(callback, 0);
          },
          functionName: function functionName(func) {
            if (!func)
              return "";
            if (func.displayName)
              return func.displayName;
            if (func.name)
              return func.name;
            var matches = func.toString().match(/function\s+([^\(]+)/m);
            return matches && matches[1] || "";
          },
          isNode: function isNode(obj) {
            if (!div)
              return false;
            try {
              obj.appendChild(div);
              obj.removeChild(div);
            } catch (e) {
              return false;
            }
            return true;
          },
          isElement: function isElement(obj) {
            return obj && obj.nodeType === 1 && buster.isNode(obj);
          },
          isArray: function isArray(arr) {
            return Object.prototype.toString.call(arr) == "[object Array]";
          },
          flatten: function flatten(arr) {
            var result = [],
                arr = arr || [];
            for (var i = 0,
                l = arr.length; i < l; ++i) {
              result = result.concat(buster.isArray(arr[i]) ? flatten(arr[i]) : arr[i]);
            }
            return result;
          },
          each: function each(arr, callback) {
            for (var i = 0,
                l = arr.length; i < l; ++i) {
              callback(arr[i]);
            }
          },
          map: function map(arr, callback) {
            var results = [];
            for (var i = 0,
                l = arr.length; i < l; ++i) {
              results.push(callback(arr[i]));
            }
            return results;
          },
          parallel: function parallel(fns, callback) {
            function cb(err, res) {
              if (typeof callback == "function") {
                callback(err, res);
                callback = null;
              }
            }
            if (fns.length == 0) {
              return cb(null, []);
            }
            var remaining = fns.length,
                results = [];
            function makeDone(num) {
              return function done(err, result) {
                if (err) {
                  return cb(err);
                }
                results[num] = result;
                if (--remaining == 0) {
                  cb(null, results);
                }
              };
            }
            for (var i = 0,
                l = fns.length; i < l; ++i) {
              fns[i](makeDone(i));
            }
          },
          series: function series(fns, callback) {
            function cb(err, res) {
              if (typeof callback == "function") {
                callback(err, res);
              }
            }
            var remaining = fns.slice();
            var results = [];
            function callNext() {
              if (remaining.length == 0)
                return cb(null, results);
              var promise = remaining.shift()(next);
              if (promise && typeof promise.then == "function") {
                promise.then(buster.partial(next, null), next);
              }
            }
            function next(err, result) {
              if (err)
                return cb(err);
              results.push(result);
              callNext();
            }
            callNext();
          },
          countdown: function countdown(num, done) {
            return function() {
              if (--num == 0)
                done();
            };
          }
        };
        if (typeof process === "object" && typeof require === "function" && typeof module === "object") {
          var crypto = require("github:jspm/nodelibs@0.0.8/crypto");
          var path = require("github:jspm/nodelibs@0.0.8/path");
          buster.tmpFile = function(fileName) {
            var hashed = crypto.createHash("sha1");
            hashed.update(fileName);
            var tmpfileName = hashed.digest("hex");
            if (process.platform == "win32") {
              return path.join(process.env["TEMP"], tmpfileName);
            } else {
              return path.join("/tmp", tmpfileName);
            }
          };
        }
        if (Array.prototype.some) {
          buster.some = function(arr, fn, thisp) {
            return arr.some(fn, thisp);
          };
        } else {
          buster.some = function(arr, fun, thisp) {
            "use strict";
            if (arr == null) {
              throw new TypeError();
            }
            arr = Object(arr);
            var len = arr.length >>> 0;
            if (typeof fun !== "function") {
              throw new TypeError();
            }
            for (var i = 0; i < len; i++) {
              if (arr.hasOwnProperty(i) && fun.call(thisp, arr[i], i, arr)) {
                return true;
              }
            }
            return false;
          };
        }
        if (Array.prototype.filter) {
          buster.filter = function(arr, fn, thisp) {
            return arr.filter(fn, thisp);
          };
        } else {
          buster.filter = function(fn, thisp) {
            "use strict";
            if (this == null) {
              throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fn != "function") {
              throw new TypeError();
            }
            var res = [];
            for (var i = 0; i < len; i++) {
              if (i in t) {
                var val = t[i];
                if (fn.call(thisp, val, i, t)) {
                  res.push(val);
                }
              }
            }
            return res;
          };
        }
        if (isNode) {
          module.exports = buster;
          buster.eventEmitter = require("./buster-event-emitter");
          Object.defineProperty(buster, "defineVersionGetter", {get: function() {
              return require("./define-version-getter");
            }});
        }
        return buster.extend(B || {}, buster);
      }(setTimeout, buster));
    }, {
      "./buster-event-emitter": 45,
      "./define-version-getter": 46,
      "__browserify_process": 31,
      "crypto": 26,
      "path": 20
    }],
    45: [function(require, module, exports) {
      if (typeof require == "function" && typeof module == "object") {
        var buster = require("./buster-core");
      }
      (function() {
        function eventListeners(eventEmitter, event) {
          if (!eventEmitter.listeners) {
            eventEmitter.listeners = {};
          }
          if (!eventEmitter.listeners[event]) {
            eventEmitter.listeners[event] = [];
          }
          return eventEmitter.listeners[event];
        }
        function throwLater(event, error) {
          buster.nextTick(function() {
            error.message = event + " listener threw error: " + error.message;
            throw error;
          });
        }
        function addSupervisor(emitter, listener, thisObject) {
          if (!emitter.supervisors) {
            emitter.supervisors = [];
          }
          emitter.supervisors.push({
            listener: listener,
            thisObject: thisObject
          });
        }
        function notifyListener(emitter, event, listener, args) {
          try {
            listener.listener.apply(listener.thisObject || emitter, args);
          } catch (e) {
            throwLater(event, e);
          }
        }
        buster.eventEmitter = {
          create: function() {
            return buster.create(this);
          },
          addListener: function addListener(event, listener, thisObject) {
            if (typeof event === "function") {
              return addSupervisor(this, event, listener);
            }
            if (typeof listener != "function") {
              throw new TypeError("Listener is not function");
            }
            eventListeners(this, event).push({
              listener: listener,
              thisObject: thisObject
            });
          },
          once: function once(event, listener, thisObject) {
            var self = this;
            this.addListener(event, listener);
            var wrapped = function() {
              self.removeListener(event, listener);
              self.removeListener(event, wrapped);
            };
            this.addListener(event, wrapped);
          },
          hasListener: function hasListener(event, listener, thisObject) {
            var listeners = eventListeners(this, event);
            for (var i = 0,
                l = listeners.length; i < l; i++) {
              if (listeners[i].listener === listener && listeners[i].thisObject === thisObject) {
                return true;
              }
            }
            return false;
          },
          removeListener: function(event, listener) {
            var listeners = eventListeners(this, event);
            for (var i = 0,
                l = listeners.length; i < l; ++i) {
              if (listeners[i].listener == listener) {
                listeners.splice(i, 1);
                return;
              }
            }
          },
          emit: function emit(event) {
            var listeners = eventListeners(this, event).slice();
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0,
                l = listeners.length; i < l; i++) {
              notifyListener(this, event, listeners[i], args);
            }
            listeners = this.supervisors || [];
            args = Array.prototype.slice.call(arguments);
            for (i = 0, l = listeners.length; i < l; ++i) {
              notifyListener(this, event, listeners[i], args);
            }
          },
          bind: function(object, events) {
            var method;
            if (!events) {
              for (method in object) {
                if (object.hasOwnProperty(method) && typeof object[method] == "function") {
                  this.addListener(method, object[method], object);
                }
              }
            } else if (typeof events == "string" || Object.prototype.toString.call(events) == "[object Array]") {
              events = typeof events == "string" ? [events] : events;
              for (var i = 0,
                  l = events.length; i < l; ++i) {
                this.addListener(events[i], object[events[i]], object);
              }
            } else {
              for (var prop in events) {
                if (events.hasOwnProperty(prop)) {
                  method = events[prop];
                  if (typeof method == "function") {
                    object[buster.functionName(method) || prop] = method;
                  } else {
                    method = object[events[prop]];
                  }
                  this.addListener(prop, method, object);
                }
              }
            }
            return object;
          }
        };
        buster.eventEmitter.on = buster.eventEmitter.addListener;
      }());
      if (typeof module != "undefined") {
        module.exports = buster.eventEmitter;
      }
    }, {"./buster-core": 44}],
    46: [function(require, module, exports) {
      var path = require("github:jspm/nodelibs@0.0.8/path");
      var fs = require("github:jspm/nodelibs@0.0.8/fs");
      module.exports = function defineVersionGetter(mod, dirname) {
        Object.defineProperty(mod, "VERSION", {get: function() {
            if (!this.version) {
              var pkgJSON = path.resolve(dirname, "..", "package.json");
              var pkg = JSON.parse(fs.readFileSync(pkgJSON, "utf8"));
              this.version = pkg.version;
            }
            return this.version;
          }});
      };
    }, {
      "fs": 19,
      "path": 20
    }]
  }, {}, [1, 2, 4, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  ;
})(require("github:jspm/nodelibs@0.0.8/buffer").Buffer, require("github:jspm/nodelibs@0.0.8/process"));
