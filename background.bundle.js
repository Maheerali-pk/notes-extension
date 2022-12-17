(() => {
   var e = {
         32867: (e, t, n) => {
            e.exports = n(44322);
         },
         30803: (e, t, n) => {
            "use strict";
            var r = n(69814),
               o = n(96145),
               a = n(47970),
               i = n(79537),
               s = n(96415),
               c = n(59210),
               u = n(48870),
               l = n(1511),
               f = n(1050),
               p = n(40455);
            e.exports = function (e) {
               return new Promise(function (t, n) {
                  var h,
                     d = e.data,
                     m = e.headers,
                     y = e.responseType;
                  function b() {
                     e.cancelToken && e.cancelToken.unsubscribe(h),
                        e.signal && e.signal.removeEventListener("abort", h);
                  }
                  r.isFormData(d) && delete m["Content-Type"];
                  var g = new XMLHttpRequest();
                  if (e.auth) {
                     var v = e.auth.username || "",
                        w = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                     m.Authorization = "Basic " + btoa(v + ":" + w);
                  }
                  var _ = s(e.baseURL, e.url);
                  function x() {
                     if (g) {
                        var r = "getAllResponseHeaders" in g ? c(g.getAllResponseHeaders()) : null,
                           a = {
                              data: y && "text" !== y && "json" !== y ? g.response : g.responseText,
                              status: g.status,
                              statusText: g.statusText,
                              headers: r,
                              config: e,
                              request: g,
                           };
                        o(
                           function (e) {
                              t(e), b();
                           },
                           function (e) {
                              n(e), b();
                           },
                           a
                        ),
                           (g = null);
                     }
                  }
                  if (
                     (g.open(e.method.toUpperCase(), i(_, e.params, e.paramsSerializer), !0),
                     (g.timeout = e.timeout),
                     "onloadend" in g
                        ? (g.onloadend = x)
                        : (g.onreadystatechange = function () {
                             g &&
                                4 === g.readyState &&
                                (0 !== g.status || (g.responseURL && 0 === g.responseURL.indexOf("file:"))) &&
                                setTimeout(x);
                          }),
                     (g.onabort = function () {
                        g && (n(l("Request aborted", e, "ECONNABORTED", g)), (g = null));
                     }),
                     (g.onerror = function () {
                        n(l("Network Error", e, null, g)), (g = null);
                     }),
                     (g.ontimeout = function () {
                        var t = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded",
                           r = e.transitional || f.transitional;
                        e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                           n(l(t, e, r.clarifyTimeoutError ? "ETIMEDOUT" : "ECONNABORTED", g)),
                           (g = null);
                     }),
                     r.isStandardBrowserEnv())
                  ) {
                     var E = (e.withCredentials || u(_)) && e.xsrfCookieName ? a.read(e.xsrfCookieName) : void 0;
                     E && (m[e.xsrfHeaderName] = E);
                  }
                  "setRequestHeader" in g &&
                     r.forEach(m, function (e, t) {
                        void 0 === d && "content-type" === t.toLowerCase() ? delete m[t] : g.setRequestHeader(t, e);
                     }),
                     r.isUndefined(e.withCredentials) || (g.withCredentials = !!e.withCredentials),
                     y && "json" !== y && (g.responseType = e.responseType),
                     "function" == typeof e.onDownloadProgress && g.addEventListener("progress", e.onDownloadProgress),
                     "function" == typeof e.onUploadProgress &&
                        g.upload &&
                        g.upload.addEventListener("progress", e.onUploadProgress),
                     (e.cancelToken || e.signal) &&
                        ((h = function (e) {
                           g && (n(!e || (e && e.type) ? new p("canceled") : e), g.abort(), (g = null));
                        }),
                        e.cancelToken && e.cancelToken.subscribe(h),
                        e.signal && (e.signal.aborted ? h() : e.signal.addEventListener("abort", h))),
                     d || (d = null),
                     g.send(d);
               });
            };
         },
         44322: (e, t, n) => {
            "use strict";
            var r = n(69814),
               o = n(11984),
               a = n(84874),
               i = n(1713),
               s = (function e(t) {
                  var n = new a(t),
                     s = o(a.prototype.request, n);
                  return (
                     r.extend(s, a.prototype, n),
                     r.extend(s, n),
                     (s.create = function (n) {
                        return e(i(t, n));
                     }),
                     s
                  );
               })(n(1050));
            (s.Axios = a),
               (s.Cancel = n(40455)),
               (s.CancelToken = n(10462)),
               (s.isCancel = n(94652)),
               (s.VERSION = n(91141).version),
               (s.all = function (e) {
                  return Promise.all(e);
               }),
               (s.spread = n(98396)),
               (s.isAxiosError = n(44240)),
               (e.exports = s),
               (e.exports.default = s);
         },
         40455: (e) => {
            "use strict";
            function t(e) {
               this.message = e;
            }
            (t.prototype.toString = function () {
               return "Cancel" + (this.message ? ": " + this.message : "");
            }),
               (t.prototype.__CANCEL__ = !0),
               (e.exports = t);
         },
         10462: (e, t, n) => {
            "use strict";
            var r = n(40455);
            function o(e) {
               if ("function" != typeof e) throw new TypeError("executor must be a function.");
               var t;
               this.promise = new Promise(function (e) {
                  t = e;
               });
               var n = this;
               this.promise.then(function (e) {
                  if (n._listeners) {
                     var t,
                        r = n._listeners.length;
                     for (t = 0; t < r; t++) n._listeners[t](e);
                     n._listeners = null;
                  }
               }),
                  (this.promise.then = function (e) {
                     var t,
                        r = new Promise(function (e) {
                           n.subscribe(e), (t = e);
                        }).then(e);
                     return (
                        (r.cancel = function () {
                           n.unsubscribe(t);
                        }),
                        r
                     );
                  }),
                  e(function (e) {
                     n.reason || ((n.reason = new r(e)), t(n.reason));
                  });
            }
            (o.prototype.throwIfRequested = function () {
               if (this.reason) throw this.reason;
            }),
               (o.prototype.subscribe = function (e) {
                  this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
               }),
               (o.prototype.unsubscribe = function (e) {
                  if (this._listeners) {
                     var t = this._listeners.indexOf(e);
                     -1 !== t && this._listeners.splice(t, 1);
                  }
               }),
               (o.source = function () {
                  var e;
                  return {
                     token: new o(function (t) {
                        e = t;
                     }),
                     cancel: e,
                  };
               }),
               (e.exports = o);
         },
         94652: (e) => {
            "use strict";
            e.exports = function (e) {
               return !(!e || !e.__CANCEL__);
            };
         },
         84874: (e, t, n) => {
            "use strict";
            var r = n(69814),
               o = n(79537),
               a = n(40962),
               i = n(47281),
               s = n(1713),
               c = n(53111),
               u = c.validators;
            function l(e) {
               (this.defaults = e), (this.interceptors = { request: new a(), response: new a() });
            }
            (l.prototype.request = function (e) {
               "string" == typeof e ? ((e = arguments[1] || {}).url = arguments[0]) : (e = e || {}),
                  (e = s(this.defaults, e)).method
                     ? (e.method = e.method.toLowerCase())
                     : this.defaults.method
                     ? (e.method = this.defaults.method.toLowerCase())
                     : (e.method = "get");
               var t = e.transitional;
               void 0 !== t &&
                  c.assertOptions(
                     t,
                     {
                        silentJSONParsing: u.transitional(u.boolean),
                        forcedJSONParsing: u.transitional(u.boolean),
                        clarifyTimeoutError: u.transitional(u.boolean),
                     },
                     !1
                  );
               var n = [],
                  r = !0;
               this.interceptors.request.forEach(function (t) {
                  ("function" == typeof t.runWhen && !1 === t.runWhen(e)) ||
                     ((r = r && t.synchronous), n.unshift(t.fulfilled, t.rejected));
               });
               var o,
                  a = [];
               if (
                  (this.interceptors.response.forEach(function (e) {
                     a.push(e.fulfilled, e.rejected);
                  }),
                  !r)
               ) {
                  var l = [i, void 0];
                  for (Array.prototype.unshift.apply(l, n), l = l.concat(a), o = Promise.resolve(e); l.length; )
                     o = o.then(l.shift(), l.shift());
                  return o;
               }
               for (var f = e; n.length; ) {
                  var p = n.shift(),
                     h = n.shift();
                  try {
                     f = p(f);
                  } catch (e) {
                     h(e);
                     break;
                  }
               }
               try {
                  o = i(f);
               } catch (e) {
                  return Promise.reject(e);
               }
               for (; a.length; ) o = o.then(a.shift(), a.shift());
               return o;
            }),
               (l.prototype.getUri = function (e) {
                  return (e = s(this.defaults, e)), o(e.url, e.params, e.paramsSerializer).replace(/^\?/, "");
               }),
               r.forEach(["delete", "get", "head", "options"], function (e) {
                  l.prototype[e] = function (t, n) {
                     return this.request(s(n || {}, { method: e, url: t, data: (n || {}).data }));
                  };
               }),
               r.forEach(["post", "put", "patch"], function (e) {
                  l.prototype[e] = function (t, n, r) {
                     return this.request(s(r || {}, { method: e, url: t, data: n }));
                  };
               }),
               (e.exports = l);
         },
         40962: (e, t, n) => {
            "use strict";
            var r = n(69814);
            function o() {
               this.handlers = [];
            }
            (o.prototype.use = function (e, t, n) {
               return (
                  this.handlers.push({
                     fulfilled: e,
                     rejected: t,
                     synchronous: !!n && n.synchronous,
                     runWhen: n ? n.runWhen : null,
                  }),
                  this.handlers.length - 1
               );
            }),
               (o.prototype.eject = function (e) {
                  this.handlers[e] && (this.handlers[e] = null);
               }),
               (o.prototype.forEach = function (e) {
                  r.forEach(this.handlers, function (t) {
                     null !== t && e(t);
                  });
               }),
               (e.exports = o);
         },
         96415: (e, t, n) => {
            "use strict";
            var r = n(26788),
               o = n(46188);
            e.exports = function (e, t) {
               return e && !r(t) ? o(e, t) : t;
            };
         },
         1511: (e, t, n) => {
            "use strict";
            var r = n(55474);
            e.exports = function (e, t, n, o, a) {
               var i = new Error(e);
               return r(i, t, n, o, a);
            };
         },
         47281: (e, t, n) => {
            "use strict";
            var r = n(69814),
               o = n(36072),
               a = n(94652),
               i = n(1050),
               s = n(40455);
            function c(e) {
               if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
                  throw new s("canceled");
            }
            e.exports = function (e) {
               return (
                  c(e),
                  (e.headers = e.headers || {}),
                  (e.data = o.call(e, e.data, e.headers, e.transformRequest)),
                  (e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers)),
                  r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {
                     delete e.headers[t];
                  }),
                  (e.adapter || i.adapter)(e).then(
                     function (t) {
                        return c(e), (t.data = o.call(e, t.data, t.headers, e.transformResponse)), t;
                     },
                     function (t) {
                        return (
                           a(t) ||
                              (c(e),
                              t &&
                                 t.response &&
                                 (t.response.data = o.call(
                                    e,
                                    t.response.data,
                                    t.response.headers,
                                    e.transformResponse
                                 ))),
                           Promise.reject(t)
                        );
                     }
                  )
               );
            };
         },
         55474: (e) => {
            "use strict";
            e.exports = function (e, t, n, r, o) {
               return (
                  (e.config = t),
                  n && (e.code = n),
                  (e.request = r),
                  (e.response = o),
                  (e.isAxiosError = !0),
                  (e.toJSON = function () {
                     return {
                        message: this.message,
                        name: this.name,
                        description: this.description,
                        number: this.number,
                        fileName: this.fileName,
                        lineNumber: this.lineNumber,
                        columnNumber: this.columnNumber,
                        stack: this.stack,
                        config: this.config,
                        code: this.code,
                        status: this.response && this.response.status ? this.response.status : null,
                     };
                  }),
                  e
               );
            };
         },
         1713: (e, t, n) => {
            "use strict";
            var r = n(69814);
            e.exports = function (e, t) {
               t = t || {};
               var n = {};
               function o(e, t) {
                  return r.isPlainObject(e) && r.isPlainObject(t)
                     ? r.merge(e, t)
                     : r.isPlainObject(t)
                     ? r.merge({}, t)
                     : r.isArray(t)
                     ? t.slice()
                     : t;
               }
               function a(n) {
                  return r.isUndefined(t[n]) ? (r.isUndefined(e[n]) ? void 0 : o(void 0, e[n])) : o(e[n], t[n]);
               }
               function i(e) {
                  if (!r.isUndefined(t[e])) return o(void 0, t[e]);
               }
               function s(n) {
                  return r.isUndefined(t[n]) ? (r.isUndefined(e[n]) ? void 0 : o(void 0, e[n])) : o(void 0, t[n]);
               }
               function c(n) {
                  return n in t ? o(e[n], t[n]) : n in e ? o(void 0, e[n]) : void 0;
               }
               var u = {
                  url: i,
                  method: i,
                  data: i,
                  baseURL: s,
                  transformRequest: s,
                  transformResponse: s,
                  paramsSerializer: s,
                  timeout: s,
                  timeoutMessage: s,
                  withCredentials: s,
                  adapter: s,
                  responseType: s,
                  xsrfCookieName: s,
                  xsrfHeaderName: s,
                  onUploadProgress: s,
                  onDownloadProgress: s,
                  decompress: s,
                  maxContentLength: s,
                  maxBodyLength: s,
                  transport: s,
                  httpAgent: s,
                  httpsAgent: s,
                  cancelToken: s,
                  socketPath: s,
                  responseEncoding: s,
                  validateStatus: c,
               };
               return (
                  r.forEach(Object.keys(e).concat(Object.keys(t)), function (e) {
                     var t = u[e] || a,
                        o = t(e);
                     (r.isUndefined(o) && t !== c) || (n[e] = o);
                  }),
                  n
               );
            };
         },
         96145: (e, t, n) => {
            "use strict";
            var r = n(1511);
            e.exports = function (e, t, n) {
               var o = n.config.validateStatus;
               n.status && o && !o(n.status)
                  ? t(r("Request failed with status code " + n.status, n.config, null, n.request, n))
                  : e(n);
            };
         },
         36072: (e, t, n) => {
            "use strict";
            var r = n(69814),
               o = n(1050);
            e.exports = function (e, t, n) {
               var a = this || o;
               return (
                  r.forEach(n, function (n) {
                     e = n.call(a, e, t);
                  }),
                  e
               );
            };
         },
         1050: (e, t, n) => {
            "use strict";
            var r = n(69814),
               o = n(20517),
               a = n(55474),
               i = { "Content-Type": "application/x-www-form-urlencoded" };
            function s(e, t) {
               !r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
            }
            var c,
               u = {
                  transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
                  adapter:
                     (("undefined" != typeof XMLHttpRequest ||
                        ("undefined" != typeof process &&
                           "[object process]" === Object.prototype.toString.call(process))) &&
                        (c = n(30803)),
                     c),
                  transformRequest: [
                     function (e, t) {
                        return (
                           o(t, "Accept"),
                           o(t, "Content-Type"),
                           r.isFormData(e) ||
                           r.isArrayBuffer(e) ||
                           r.isBuffer(e) ||
                           r.isStream(e) ||
                           r.isFile(e) ||
                           r.isBlob(e)
                              ? e
                              : r.isArrayBufferView(e)
                              ? e.buffer
                              : r.isURLSearchParams(e)
                              ? (s(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString())
                              : r.isObject(e) || (t && "application/json" === t["Content-Type"])
                              ? (s(t, "application/json"),
                                (function (e, t, n) {
                                   if (r.isString(e))
                                      try {
                                         return (0, JSON.parse)(e), r.trim(e);
                                      } catch (e) {
                                         if ("SyntaxError" !== e.name) throw e;
                                      }
                                   return (0, JSON.stringify)(e);
                                })(e))
                              : e
                        );
                     },
                  ],
                  transformResponse: [
                     function (e) {
                        var t = this.transitional || u.transitional,
                           n = t && t.silentJSONParsing,
                           o = t && t.forcedJSONParsing,
                           i = !n && "json" === this.responseType;
                        if (i || (o && r.isString(e) && e.length))
                           try {
                              return JSON.parse(e);
                           } catch (e) {
                              if (i) {
                                 if ("SyntaxError" === e.name) throw a(e, this, "E_JSON_PARSE");
                                 throw e;
                              }
                           }
                        return e;
                     },
                  ],
                  timeout: 0,
                  xsrfCookieName: "XSRF-TOKEN",
                  xsrfHeaderName: "X-XSRF-TOKEN",
                  maxContentLength: -1,
                  maxBodyLength: -1,
                  validateStatus: function (e) {
                     return e >= 200 && e < 300;
                  },
                  headers: { common: { Accept: "application/json, text/plain, */*" } },
               };
            r.forEach(["delete", "get", "head"], function (e) {
               u.headers[e] = {};
            }),
               r.forEach(["post", "put", "patch"], function (e) {
                  u.headers[e] = r.merge(i);
               }),
               (e.exports = u);
         },
         91141: (e) => {
            e.exports = { version: "0.24.0" };
         },
         11984: (e) => {
            "use strict";
            e.exports = function (e, t) {
               return function () {
                  for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
                  return e.apply(t, n);
               };
            };
         },
         79537: (e, t, n) => {
            "use strict";
            var r = n(69814);
            function o(e) {
               return encodeURIComponent(e)
                  .replace(/%3A/gi, ":")
                  .replace(/%24/g, "$")
                  .replace(/%2C/gi, ",")
                  .replace(/%20/g, "+")
                  .replace(/%5B/gi, "[")
                  .replace(/%5D/gi, "]");
            }
            e.exports = function (e, t, n) {
               if (!t) return e;
               var a;
               if (n) a = n(t);
               else if (r.isURLSearchParams(t)) a = t.toString();
               else {
                  var i = [];
                  r.forEach(t, function (e, t) {
                     null != e &&
                        (r.isArray(e) ? (t += "[]") : (e = [e]),
                        r.forEach(e, function (e) {
                           r.isDate(e) ? (e = e.toISOString()) : r.isObject(e) && (e = JSON.stringify(e)),
                              i.push(o(t) + "=" + o(e));
                        }));
                  }),
                     (a = i.join("&"));
               }
               if (a) {
                  var s = e.indexOf("#");
                  -1 !== s && (e = e.slice(0, s)), (e += (-1 === e.indexOf("?") ? "?" : "&") + a);
               }
               return e;
            };
         },
         46188: (e) => {
            "use strict";
            e.exports = function (e, t) {
               return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
            };
         },
         47970: (e, t, n) => {
            "use strict";
            var r = n(69814);
            e.exports = r.isStandardBrowserEnv()
               ? {
                    write: function (e, t, n, o, a, i) {
                       var s = [];
                       s.push(e + "=" + encodeURIComponent(t)),
                          r.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()),
                          r.isString(o) && s.push("path=" + o),
                          r.isString(a) && s.push("domain=" + a),
                          !0 === i && s.push("secure"),
                          (document.cookie = s.join("; "));
                    },
                    read: function (e) {
                       var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                       return t ? decodeURIComponent(t[3]) : null;
                    },
                    remove: function (e) {
                       this.write(e, "", Date.now() - 864e5);
                    },
                 }
               : {
                    write: function () {},
                    read: function () {
                       return null;
                    },
                    remove: function () {},
                 };
         },
         26788: (e) => {
            "use strict";
            e.exports = function (e) {
               return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
            };
         },
         44240: (e) => {
            "use strict";
            function t(e) {
               return (
                  (t =
                     "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                        ? function (e) {
                             return typeof e;
                          }
                        : function (e) {
                             return e &&
                                "function" == typeof Symbol &&
                                e.constructor === Symbol &&
                                e !== Symbol.prototype
                                ? "symbol"
                                : typeof e;
                          }),
                  t(e)
               );
            }
            e.exports = function (e) {
               return "object" === t(e) && !0 === e.isAxiosError;
            };
         },
         48870: (e, t, n) => {
            "use strict";
            var r = n(69814);
            e.exports = r.isStandardBrowserEnv()
               ? (function () {
                    var e,
                       t = /(msie|trident)/i.test(navigator.userAgent),
                       n = document.createElement("a");
                    function o(e) {
                       var r = e;
                       return (
                          t && (n.setAttribute("href", r), (r = n.href)),
                          n.setAttribute("href", r),
                          {
                             href: n.href,
                             protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                             host: n.host,
                             search: n.search ? n.search.replace(/^\?/, "") : "",
                             hash: n.hash ? n.hash.replace(/^#/, "") : "",
                             hostname: n.hostname,
                             port: n.port,
                             pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname,
                          }
                       );
                    }
                    return (
                       (e = o(window.location.href)),
                       function (t) {
                          var n = r.isString(t) ? o(t) : t;
                          return n.protocol === e.protocol && n.host === e.host;
                       }
                    );
                 })()
               : function () {
                    return !0;
                 };
         },
         20517: (e, t, n) => {
            "use strict";
            var r = n(69814);
            e.exports = function (e, t) {
               r.forEach(e, function (n, r) {
                  r !== t && r.toUpperCase() === t.toUpperCase() && ((e[t] = n), delete e[r]);
               });
            };
         },
         59210: (e, t, n) => {
            "use strict";
            var r = n(69814),
               o = [
                  "age",
                  "authorization",
                  "content-length",
                  "content-type",
                  "etag",
                  "expires",
                  "from",
                  "host",
                  "if-modified-since",
                  "if-unmodified-since",
                  "last-modified",
                  "location",
                  "max-forwards",
                  "proxy-authorization",
                  "referer",
                  "retry-after",
                  "user-agent",
               ];
            e.exports = function (e) {
               var t,
                  n,
                  a,
                  i = {};
               return e
                  ? (r.forEach(e.split("\n"), function (e) {
                       if (
                          ((a = e.indexOf(":")),
                          (t = r.trim(e.substr(0, a)).toLowerCase()),
                          (n = r.trim(e.substr(a + 1))),
                          t)
                       ) {
                          if (i[t] && o.indexOf(t) >= 0) return;
                          i[t] = "set-cookie" === t ? (i[t] ? i[t] : []).concat([n]) : i[t] ? i[t] + ", " + n : n;
                       }
                    }),
                    i)
                  : i;
            };
         },
         98396: (e) => {
            "use strict";
            e.exports = function (e) {
               return function (t) {
                  return e.apply(null, t);
               };
            };
         },
         53111: (e, t, n) => {
            "use strict";
            function r(e) {
               return (
                  (r =
                     "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                        ? function (e) {
                             return typeof e;
                          }
                        : function (e) {
                             return e &&
                                "function" == typeof Symbol &&
                                e.constructor === Symbol &&
                                e !== Symbol.prototype
                                ? "symbol"
                                : typeof e;
                          }),
                  r(e)
               );
            }
            var o = n(91141).version,
               a = {};
            ["object", "boolean", "number", "function", "string", "symbol"].forEach(function (e, t) {
               a[e] = function (n) {
                  return r(n) === e || "a" + (t < 1 ? "n " : " ") + e;
               };
            });
            var i = {};
            (a.transitional = function (e, t, n) {
               function r(e, t) {
                  return "[Axios v" + o + "] Transitional option '" + e + "'" + t + (n ? ". " + n : "");
               }
               return function (n, o, a) {
                  if (!1 === e) throw new Error(r(o, " has been removed" + (t ? " in " + t : "")));
                  return (
                     t &&
                        !i[o] &&
                        ((i[o] = !0),
                        console.warn(
                           r(o, " has been deprecated since v" + t + " and will be removed in the near future")
                        )),
                     !e || e(n, o, a)
                  );
               };
            }),
               (e.exports = {
                  assertOptions: function (e, t, n) {
                     if ("object" !== r(e)) throw new TypeError("options must be an object");
                     for (var o = Object.keys(e), a = o.length; a-- > 0; ) {
                        var i = o[a],
                           s = t[i];
                        if (s) {
                           var c = e[i],
                              u = void 0 === c || s(c, i, e);
                           if (!0 !== u) throw new TypeError("option " + i + " must be " + u);
                        } else if (!0 !== n) throw Error("Unknown option " + i);
                     }
                  },
                  validators: a,
               });
         },
         69814: (e, t, n) => {
            "use strict";
            function r(e) {
               return (
                  (r =
                     "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                        ? function (e) {
                             return typeof e;
                          }
                        : function (e) {
                             return e &&
                                "function" == typeof Symbol &&
                                e.constructor === Symbol &&
                                e !== Symbol.prototype
                                ? "symbol"
                                : typeof e;
                          }),
                  r(e)
               );
            }
            var o = n(11984),
               a = Object.prototype.toString;
            function i(e) {
               return "[object Array]" === a.call(e);
            }
            function s(e) {
               return void 0 === e;
            }
            function c(e) {
               return null !== e && "object" === r(e);
            }
            function u(e) {
               if ("[object Object]" !== a.call(e)) return !1;
               var t = Object.getPrototypeOf(e);
               return null === t || t === Object.prototype;
            }
            function l(e) {
               return "[object Function]" === a.call(e);
            }
            function f(e, t) {
               if (null != e)
                  if (("object" !== r(e) && (e = [e]), i(e)))
                     for (var n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
                  else for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && t.call(null, e[a], a, e);
            }
            e.exports = {
               isArray: i,
               isArrayBuffer: function (e) {
                  return "[object ArrayBuffer]" === a.call(e);
               },
               isBuffer: function (e) {
                  return (
                     null !== e &&
                     !s(e) &&
                     null !== e.constructor &&
                     !s(e.constructor) &&
                     "function" == typeof e.constructor.isBuffer &&
                     e.constructor.isBuffer(e)
                  );
               },
               isFormData: function (e) {
                  return "undefined" != typeof FormData && e instanceof FormData;
               },
               isArrayBufferView: function (e) {
                  return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
                     ? ArrayBuffer.isView(e)
                     : e && e.buffer && e.buffer instanceof ArrayBuffer;
               },
               isString: function (e) {
                  return "string" == typeof e;
               },
               isNumber: function (e) {
                  return "number" == typeof e;
               },
               isObject: c,
               isPlainObject: u,
               isUndefined: s,
               isDate: function (e) {
                  return "[object Date]" === a.call(e);
               },
               isFile: function (e) {
                  return "[object File]" === a.call(e);
               },
               isBlob: function (e) {
                  return "[object Blob]" === a.call(e);
               },
               isFunction: l,
               isStream: function (e) {
                  return c(e) && l(e.pipe);
               },
               isURLSearchParams: function (e) {
                  return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;
               },
               isStandardBrowserEnv: function () {
                  return (
                     ("undefined" == typeof navigator ||
                        ("ReactNative" !== navigator.product &&
                           "NativeScript" !== navigator.product &&
                           "NS" !== navigator.product)) &&
                     "undefined" != typeof window &&
                     "undefined" != typeof document
                  );
               },
               forEach: f,
               merge: function e() {
                  var t = {};
                  function n(n, r) {
                     u(t[r]) && u(n)
                        ? (t[r] = e(t[r], n))
                        : u(n)
                        ? (t[r] = e({}, n))
                        : i(n)
                        ? (t[r] = n.slice())
                        : (t[r] = n);
                  }
                  for (var r = 0, o = arguments.length; r < o; r++) f(arguments[r], n);
                  return t;
               },
               extend: function (e, t, n) {
                  return (
                     f(t, function (t, r) {
                        e[r] = n && "function" == typeof t ? o(t, n) : t;
                     }),
                     e
                  );
               },
               trim: function (e) {
                  return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
               },
               stripBOM: function (e) {
                  return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
               },
            };
         },
         87751: (e, t, n) => {
            function r(e) {
               return (
                  (r =
                     "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                        ? function (e) {
                             return typeof e;
                          }
                        : function (e) {
                             return e &&
                                "function" == typeof Symbol &&
                                e.constructor === Symbol &&
                                e !== Symbol.prototype
                                ? "symbol"
                                : typeof e;
                          }),
                  r(e)
               );
            }
            var o = (function (e) {
               "use strict";
               var t,
                  n = Object.prototype,
                  o = n.hasOwnProperty,
                  a = "function" == typeof Symbol ? Symbol : {},
                  i = a.iterator || "@@iterator",
                  s = a.asyncIterator || "@@asyncIterator",
                  c = a.toStringTag || "@@toStringTag";
               function u(e, t, n) {
                  return (
                     Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }), e[t]
                  );
               }
               try {
                  u({}, "");
               } catch (e) {
                  u = function (e, t, n) {
                     return (e[t] = n);
                  };
               }
               function l(e, t, n, r) {
                  var o = t && t.prototype instanceof b ? t : b,
                     a = Object.create(o.prototype),
                     i = new U(r || []);
                  return (
                     (a._invoke = (function (e, t, n) {
                        var r = p;
                        return function (o, a) {
                           if (r === d) throw new Error("Generator is already running");
                           if (r === m) {
                              if ("throw" === o) throw a;
                              return k();
                           }
                           for (n.method = o, n.arg = a; ; ) {
                              var i = n.delegate;
                              if (i) {
                                 var s = L(i, n);
                                 if (s) {
                                    if (s === y) continue;
                                    return s;
                                 }
                              }
                              if ("next" === n.method) n.sent = n._sent = n.arg;
                              else if ("throw" === n.method) {
                                 if (r === p) throw ((r = m), n.arg);
                                 n.dispatchException(n.arg);
                              } else "return" === n.method && n.abrupt("return", n.arg);
                              r = d;
                              var c = f(e, t, n);
                              if ("normal" === c.type) {
                                 if (((r = n.done ? m : h), c.arg === y)) continue;
                                 return { value: c.arg, done: n.done };
                              }
                              "throw" === c.type && ((r = m), (n.method = "throw"), (n.arg = c.arg));
                           }
                        };
                     })(e, n, i)),
                     a
                  );
               }
               function f(e, t, n) {
                  try {
                     return { type: "normal", arg: e.call(t, n) };
                  } catch (e) {
                     return { type: "throw", arg: e };
                  }
               }
               e.wrap = l;
               var p = "suspendedStart",
                  h = "suspendedYield",
                  d = "executing",
                  m = "completed",
                  y = {};
               function b() {}
               function g() {}
               function v() {}
               var w = {};
               u(w, i, function () {
                  return this;
               });
               var _ = Object.getPrototypeOf,
                  x = _ && _(_(R([])));
               x && x !== n && o.call(x, i) && (w = x);
               var E = (v.prototype = b.prototype = Object.create(w));
               function j(e) {
                  ["next", "throw", "return"].forEach(function (t) {
                     u(e, t, function (e) {
                        return this._invoke(t, e);
                     });
                  });
               }
               function S(e, t) {
                  function n(a, i, s, c) {
                     var u = f(e[a], e, i);
                     if ("throw" !== u.type) {
                        var l = u.arg,
                           p = l.value;
                        return p && "object" === r(p) && o.call(p, "__await")
                           ? t.resolve(p.__await).then(
                                function (e) {
                                   n("next", e, s, c);
                                },
                                function (e) {
                                   n("throw", e, s, c);
                                }
                             )
                           : t.resolve(p).then(
                                function (e) {
                                   (l.value = e), s(l);
                                },
                                function (e) {
                                   return n("throw", e, s, c);
                                }
                             );
                     }
                     c(u.arg);
                  }
                  var a;
                  this._invoke = function (e, r) {
                     function o() {
                        return new t(function (t, o) {
                           n(e, r, t, o);
                        });
                     }
                     return (a = a ? a.then(o, o) : o());
                  };
               }
               function L(e, n) {
                  var r = e.iterator[n.method];
                  if (r === t) {
                     if (((n.delegate = null), "throw" === n.method)) {
                        if (e.iterator.return && ((n.method = "return"), (n.arg = t), L(e, n), "throw" === n.method))
                           return y;
                        (n.method = "throw"), (n.arg = new TypeError("The iterator does not provide a 'throw' method"));
                     }
                     return y;
                  }
                  var o = f(r, e.iterator, n.arg);
                  if ("throw" === o.type) return (n.method = "throw"), (n.arg = o.arg), (n.delegate = null), y;
                  var a = o.arg;
                  return a
                     ? a.done
                        ? ((n[e.resultName] = a.value),
                          (n.next = e.nextLoc),
                          "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                          (n.delegate = null),
                          y)
                        : a
                     : ((n.method = "throw"),
                       (n.arg = new TypeError("iterator result is not an object")),
                       (n.delegate = null),
                       y);
               }
               function T(e) {
                  var t = { tryLoc: e[0] };
                  1 in e && (t.catchLoc = e[1]),
                     2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                     this.tryEntries.push(t);
               }
               function O(e) {
                  var t = e.completion || {};
                  (t.type = "normal"), delete t.arg, (e.completion = t);
               }
               function U(e) {
                  (this.tryEntries = [{ tryLoc: "root" }]), e.forEach(T, this), this.reset(!0);
               }
               function R(e) {
                  if (e) {
                     var n = e[i];
                     if (n) return n.call(e);
                     if ("function" == typeof e.next) return e;
                     if (!isNaN(e.length)) {
                        var r = -1,
                           a = function n() {
                              for (; ++r < e.length; ) if (o.call(e, r)) return (n.value = e[r]), (n.done = !1), n;
                              return (n.value = t), (n.done = !0), n;
                           };
                        return (a.next = a);
                     }
                  }
                  return { next: k };
               }
               function k() {
                  return { value: t, done: !0 };
               }
               return (
                  (g.prototype = v),
                  u(E, "constructor", v),
                  u(v, "constructor", g),
                  (g.displayName = u(v, c, "GeneratorFunction")),
                  (e.isGeneratorFunction = function (e) {
                     var t = "function" == typeof e && e.constructor;
                     return !!t && (t === g || "GeneratorFunction" === (t.displayName || t.name));
                  }),
                  (e.mark = function (e) {
                     return (
                        Object.setPrototypeOf
                           ? Object.setPrototypeOf(e, v)
                           : ((e.__proto__ = v), u(e, c, "GeneratorFunction")),
                        (e.prototype = Object.create(E)),
                        e
                     );
                  }),
                  (e.awrap = function (e) {
                     return { __await: e };
                  }),
                  j(S.prototype),
                  u(S.prototype, s, function () {
                     return this;
                  }),
                  (e.AsyncIterator = S),
                  (e.async = function (t, n, r, o, a) {
                     void 0 === a && (a = Promise);
                     var i = new S(l(t, n, r, o), a);
                     return e.isGeneratorFunction(n)
                        ? i
                        : i.next().then(function (e) {
                             return e.done ? e.value : i.next();
                          });
                  }),
                  j(E),
                  u(E, c, "Generator"),
                  u(E, i, function () {
                     return this;
                  }),
                  u(E, "toString", function () {
                     return "[object Generator]";
                  }),
                  (e.keys = function (e) {
                     var t = [];
                     for (var n in e) t.push(n);
                     return (
                        t.reverse(),
                        function n() {
                           for (; t.length; ) {
                              var r = t.pop();
                              if (r in e) return (n.value = r), (n.done = !1), n;
                           }
                           return (n.done = !0), n;
                        }
                     );
                  }),
                  (e.values = R),
                  (U.prototype = {
                     constructor: U,
                     reset: function (e) {
                        if (
                           ((this.prev = 0),
                           (this.next = 0),
                           (this.sent = this._sent = t),
                           (this.done = !1),
                           (this.delegate = null),
                           (this.method = "next"),
                           (this.arg = t),
                           this.tryEntries.forEach(O),
                           !e)
                        )
                           for (var n in this)
                              "t" === n.charAt(0) && o.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t);
                     },
                     stop: function () {
                        this.done = !0;
                        var e = this.tryEntries[0].completion;
                        if ("throw" === e.type) throw e.arg;
                        return this.rval;
                     },
                     dispatchException: function (e) {
                        if (this.done) throw e;
                        var n = this;
                        function r(r, o) {
                           return (
                              (s.type = "throw"),
                              (s.arg = e),
                              (n.next = r),
                              o && ((n.method = "next"), (n.arg = t)),
                              !!o
                           );
                        }
                        for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                           var i = this.tryEntries[a],
                              s = i.completion;
                           if ("root" === i.tryLoc) return r("end");
                           if (i.tryLoc <= this.prev) {
                              var c = o.call(i, "catchLoc"),
                                 u = o.call(i, "finallyLoc");
                              if (c && u) {
                                 if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                                 if (this.prev < i.finallyLoc) return r(i.finallyLoc);
                              } else if (c) {
                                 if (this.prev < i.catchLoc) return r(i.catchLoc, !0);
                              } else {
                                 if (!u) throw new Error("try statement without catch or finally");
                                 if (this.prev < i.finallyLoc) return r(i.finallyLoc);
                              }
                           }
                        }
                     },
                     abrupt: function (e, t) {
                        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                           var r = this.tryEntries[n];
                           if (r.tryLoc <= this.prev && o.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                              var a = r;
                              break;
                           }
                        }
                        a && ("break" === e || "continue" === e) && a.tryLoc <= t && t <= a.finallyLoc && (a = null);
                        var i = a ? a.completion : {};
                        return (
                           (i.type = e),
                           (i.arg = t),
                           a ? ((this.method = "next"), (this.next = a.finallyLoc), y) : this.complete(i)
                        );
                     },
                     complete: function (e, t) {
                        if ("throw" === e.type) throw e.arg;
                        return (
                           "break" === e.type || "continue" === e.type
                              ? (this.next = e.arg)
                              : "return" === e.type
                              ? ((this.rval = this.arg = e.arg), (this.method = "return"), (this.next = "end"))
                              : "normal" === e.type && t && (this.next = t),
                           y
                        );
                     },
                     finish: function (e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                           var n = this.tryEntries[t];
                           if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), O(n), y;
                        }
                     },
                     catch: function (e) {
                        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                           var n = this.tryEntries[t];
                           if (n.tryLoc === e) {
                              var r = n.completion;
                              if ("throw" === r.type) {
                                 var o = r.arg;
                                 O(n);
                              }
                              return o;
                           }
                        }
                        throw new Error("illegal catch attempt");
                     },
                     delegateYield: function (e, n, r) {
                        return (
                           (this.delegate = { iterator: R(e), resultName: n, nextLoc: r }),
                           "next" === this.method && (this.arg = t),
                           y
                        );
                     },
                  }),
                  e
               );
            })("object" === r((e = n.nmd(e))) ? e.exports : {});
            try {
               regeneratorRuntime = o;
            } catch (e) {
               "object" === ("undefined" == typeof globalThis ? "undefined" : r(globalThis))
                  ? (globalThis.regeneratorRuntime = o)
                  : Function("r", "regeneratorRuntime = r")(o);
            }
         },
      },
      t = {};
   function n(r) {
      var o = t[r];
      if (void 0 !== o) return o.exports;
      var a = (t[r] = { id: r, loaded: !1, exports: {} });
      return e[r](a, a.exports, n), (a.loaded = !0), a.exports;
   }
   (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
   }),
      (n.d = (e, t) => {
         for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      }),
      (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (n.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
      (() => {
         "use strict";
         var e,
            t,
            r = n(32867),
            o = n.n(r);
         n(87751);
         var a,
            i = { reminderList: [], reminderUpdateRequired: !0 },
            s = { topBarUpdateRequired: !0, topBarList: [] },
            c = { followUpList: null, followUpListUpdateRequired: !0 };
         function u() {
            return new Promise(function (e, t) {
               chrome.identity.getAuthToken({ interactive: !0 }, function (t, n) {
                  console.log("user credentials", t, n), t && e(t);
               });
            });
         }
         function l(e, n) {
            fetch("https://eazybe.com/api/v1/whatzapp/sendReferralMail", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ userMobile: e.value, userName: t || "", referralMails: e.data }),
            })
               .then(function (e) {
                  return e.json();
               })
               .then(function (e) {
                  return n(e);
               })
               .catch(function (e) {
                  return console.log("failed to send referral mail", e);
               });
         }

         chrome.runtime.onMessage.addListener(function (n, r, f) {
            switch ((console.log(r.tab ? "from a content script:" + r.tab.url : "from the extension"), n.key)) {
               case "auto_sign_up":
                  (e = n.value),
                     fetch("https://eazybe.com/api/v1/whatzapp/autosignup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ mobile: n.value }),
                     })
                        .then(function (e) {
                           return e.json();
                        })
                        .then(function (e) {
                           return f(e);
                        })
                        .catch(function (e) {
                           return console.log("failed to call auto signup", e);
                        });
                  break;
               case "login":
                  u()
                     .then(function (e) {
                        fetch("https://openidconnect.googleapis.com/v1/userinfo", {
                           method: "GET",
                           headers: { "Content-Type": "application/json", Authorization: "Bearer ".concat(e) },
                        })
                           .then(function (e) {
                              return e.json();
                           })
                           .then(function (e) {
                              console.log("login response", e), (t = e.name), f(e);
                           })
                           .catch(function (e) {
                              return console.log("error in login", e);
                           });
                     })
                     .catch(function (e) {
                        return console.log("error in login auth", e);
                     });
                  break;
               case "logout":
                  break;
               case "get_topbar_labels":
                  fetch(
                     "https://eazybe.com/api/v1/whatzapp/getAllTopBarData?user_mobile=".concat(n.value, "&is_main=1")
                  )
                     .then(function (e) {
                        return e.json();
                     })
                     .then(function (e) {
                        (s.topBarUpdateRequired = !1), (s.topBarList = e.data), f(e.data);
                     })
                     .catch(function (e) {
                        return console.log("failed to fetch topbar data", e);
                     });
                  break;
               case "getUserCurrencyData":
                  new Promise(function (e, t) {
                     o()
                        .get("https://ipapi.co/json")
                        .then(function (t) {
                           console.log("ipapi in background", t), e(t);
                        })
                        .catch(function (e) {
                           console.log("error", e), t(e);
                        });
                  })
                     .then(function (e) {
                        return f(e);
                     })
                     .catch(function (e) {
                        return console.log("error  in currency", e);
                     });
                  break;
               case "referral_emails":
                  u()
                     .then(function (e) {
                        fetch("https://people.googleapis.com/v1/otherContacts?readMask=emailAddresses", {
                           method: "GET",
                           headers: { "Content-Type": "application/json", Authorization: "Bearer ".concat(e) },
                        })
                           .then(function (e) {
                              return e.json();
                           })
                           .then(function (e) {
                              console.log("referral emails", e), f(e);
                           })
                           .catch(function (e) {
                              return console.log("error in referral response", e);
                           });
                     })
                     .catch(function (e) {
                        return console.log("error in referral response", e);
                     });
                  break;
               case "notification_reminder":
                  i.reminderUpdateRequired
                     ? ((d = n.value ? n.value : e),
                       (m = "https://eazybe.com/api/v1/whatzapp/getReminder?userMobile=".concat(d)),
                       fetch(m, { method: "GET", headers: { "Content-Type": "application/json" } }))
                          .then(function (e) {
                             return e.json();
                          })
                          .then(function (e) {
                             if ((console.log("reminder list", e), (i.reminderUpdateRequired = !1), e.status)) {
                                var t = e.data;
                                (i.reminderList = t),
                                   console.log("reminder sorted list", i.reminderList),
                                   f(i.reminderList);
                             } else f(i.reminderList);
                          })
                          .catch(function (e) {
                             return console.log("error in reminder fetch", e);
                          })
                     : f(i.reminderList);
                  break;
               case "update_reminder":
                  console.log("update reminder requested"),
                     (i.reminderUpdateRequired = !0),
                     f(i.reminderUpdateRequired);
                  break;
               case "update_reminder_setting":
                  fetch(
                     "https://eazybe.com/api/v1/whatzapp/updateReminderSettings?userMobile="
                        .concat(e, "&chatId=")
                        .concat(n.data.chatId, "&reminderId=")
                        .concat(n.data.reminderId, "&reminderDateTime=")
                        .concat(n.data.reminderDateTime, "&isReminderSeen=")
                        .concat(n.data.isReminderSeen, "&isDone=")
                        .concat(n.data.isDone),
                     { method: "PATCH" }
                  )
                     .then(function (e) {
                        return e.json();
                     })
                     .then(function (e) {
                        (i.reminderUpdateRequired = !0), f(e);
                     })
                     .catch(function (e) {
                        return console.log("Failed to update reminder setting");
                     });
                  break;
               case "review_done":
                  fetch("https://eazybe.com/api/v1/whatzapp/checkIsReviewDone?user_mobile=".concat(n.value), {
                     method: "GET",
                  })
                     .then(function (e) {
                        return e.json();
                     })
                     .then(function (e) {
                        return f(e);
                     })
                     .catch(function (e) {
                        return console.log("Failed to mark review");
                     });
                  break;
               case "update_topbar_label":
                  console.log("data", n.data),
                     fetch(
                        "https://eazybe.com/api/v1/whatzapp/editTopBarLabelById?user_mobile="
                           .concat(n.value, "&parent_id=")
                           .concat(n.data.parent_id, "&parent_label_name=")
                           .concat(n.data.parent_label, "&colour_hex=%23")
                           .concat(n.data.parent_color.slice(1, 7)),
                        { method: "PUT" }
                     )
                        .then(function (e) {
                           return e.json();
                        })
                        .then(function (e) {
                           return f(e);
                        })
                        .catch(function (e) {
                           return console.log("Failed to update parent label", e);
                        });
                  break;
               case "update_topbar_sublabels":
                  var p = n.data ? n.data : [];
                  p.length > 0 &&
                     p.forEach(function (e) {
                        fetch(
                           "https://eazybe.com/api/v1/whatzapp/editTopBarSubLabelName?user_mobile="
                              .concat(n.value, "&child_id=")
                              .concat(e.child_id, "&newSubLabelName=")
                              .concat(e.child_name),
                           { method: "PUT" }
                        )
                           .then(function (e) {
                              return e.json();
                           })
                           .then(function (e) {
                              return f(e);
                           })
                           .catch(function (e) {
                              return console.log("Failed to update sub label", e);
                           });
                     });
                  break;
               case "add_topbar_sublabels":
                  var h = {
                     method: "POST",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({
                        user_mobile: n.value,
                        parent_id: n.data.parent_id,
                        colour_hex: n.data.parent_color,
                        child_label_names: n.data.addList,
                     }),
                  };
                  console.log(h),
                     fetch("https://eazybe.com/api/v1/whatzapp/addChildLabelToParent", h)
                        .then(function (e) {
                           return e.json();
                        })
                        .then(function (e) {
                           return f(e);
                        })
                        .catch(function (e) {
                           return console.log("failed to add sublabel", e);
                        });
                  break;
               case "delete_topbar_label":
                  fetch(
                     "https://eazybe.com/api/v1/whatzapp/deleteTopBarLabelById?user_mobile="
                        .concat(n.value, "&parent_id=")
                        .concat(n.data.parent_id),
                     { method: "DELETE" }
                  )
                     .then(function (e) {
                        return e.json();
                     })
                     .then(function (e) {
                        return f(e);
                     })
                     .catch(function (e) {
                        return console.log("failed to delete label", e);
                     });
                  break;
               case "delete_topbar_sublabel":
                  fetch(
                     "https://eazybe.com/api/v1/whatzapp/deleteChildLabel?user_mobile="
                        .concat(n.value, "&child_id=")
                        .concat(n.data.child_id),
                     { method: "DELETE" }
                  )
                     .then(function (e) {
                        return e.json();
                     })
                     .then(function (e) {
                        return f(e);
                     })
                     .catch(function (e) {
                        return console.log("failed to delete sub label", e);
                     });
                  break;
               case "get_all_customer_followup":
                  c.followUpListUpdateRequired
                     ? fetch("https://eazybe.com/api/v1/whatzapp/allCustomerFollowups?user_mobile_No=".concat(n.value))
                          .then(function (e) {
                             return e.json();
                          })
                          .then(function (e) {
                             f(e), (c.followUpList = e), (c.followUpListUpdateRequired = !1);
                          })
                          .catch(function (e) {
                             return console.log("failed to fetch all customer followup", e);
                          })
                     : f(c.followUpList);
                  break;
               case "get_credit_history":
                  a
                     ? f(a)
                     : fetch("https://eazybe.com/api/v1/whatzapp/getCreditHistory?mobile=".concat(n.value), {
                          method: "GET",
                       })
                          .then(function (e) {
                             return e.json();
                          })
                          .then(function (e) {
                             e.status && ((a = e), f(e));
                          })
                          .catch(function (e) {
                             return console.log("failed to fet credit history", e);
                          });
                  break;
               case "create_follow_up":
                  fetch(
                     "https://eazybe.com/api/v1/whatzapp/createFollowUp?user_mobile="
                        .concat(n.value, "&customer_mobile=")
                        .concat(n.data.customerMobile, "&chat_Id=")
                        .concat(n.data.activechat, "&name=")
                        .concat(n.data.name, "&customer_email=")
                        .concat(n.data.email, "&value=")
                        .concat(n.data.amount, "&priority=")
                        .concat(n.data.priority, "&follow_up_date=")
                        .concat(n.data.followDate, "&noteDate=")
                        .concat(n.data.noteDate, "&noteComment=")
                        .concat(n.data.comment),
                     { method: "POST", headers: { "Content-Type": "application/json" } }
                  )
                     .then(function (e) {
                        return e.json();
                     })
                     .then(function (e) {
                        (c.followUpListUpdateRequired = !0), (i.reminderUpdateRequired = !0), f(e);
                     })
                     .catch(function (e) {
                        return console.log("failed to create follow up", e);
                     });
                  break;
               case "update_follow_up":
                  fetch("https://eazybe.com/api/v1/whatzapp/updateFollowUp", {
                     method: "PUT",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({
                        user_mobile: n.value,
                        customer_mobile: n.data.customerMobile,
                        follow_up_date: n.data.followDate,
                        date: n.data.noteDate,
                        note: n.data.comment,
                     }),
                  })
                     .then(function (e) {
                        return e.json();
                     })
                     .then(function (e) {
                        (c.followUpListUpdateRequired = !0), (i.reminderUpdateRequired = !0), f(e);
                     })
                     .catch(function (e) {
                        return console.log("failed to update followup", e);
                     });
                  break;
               case "update_follow_up_customer":
                  fetch(
                     "https://eazybe.com/api/v1/whatzapp/updateFollowUpCustomerDetails?user_mobile="
                        .concat(n.value, "&customer_mobile=")
                        .concat(n.data.customerMobile, "&chat_Id=")
                        .concat(n.data.activechat, "&name=")
                        .concat(n.data.name, "&email=")
                        .concat(n.data.email, "&value=")
                        .concat(n.data.amount, "&priority=")
                        .concat(n.data.priority),
                     { method: "PUT", headers: { "Content-Type": "application/json" } }
                  )
                     .then(function (e) {
                        return e.json();
                     })
                     .then(function (e) {
                        (c.followUpListUpdateRequired = !0), f(e);
                     });
                  break;
               case "send_referral_invite":
                  t
                     ? l(n, f)
                     : u()
                          .then(function (e) {
                             fetch("https://openidconnect.googleapis.com/v1/userinfo", {
                                method: "GET",
                                headers: { "Content-Type": "application/json", Authorization: "Bearer ".concat(e) },
                             })
                                .then(function (e) {
                                   return e.json();
                                })
                                .then(function (e) {
                                   console.log("login response", e), (t = e.name), l(n, f);
                                })
                                .catch(function (e) {
                                   return console.log("error in login", e);
                                });
                          })
                          .catch(function (e) {
                             return console.log("error in login auth", e);
                          });
                  break;
               case "open_reminder_panel":
                  chrome.windows.create(
                     { type: "popup", url: "https://www.google.com", height: 350, width: 650, left: 350, top: 250 },
                     function (e) {
                        return console.log("window created", e);
                     }
                  ),
                     f(!0);
                  break;
               case "create_reminder":
                  fetch("https://eazybe.com/api/v1/whatzapp/createReminder", {
                     headers: { Accept: "application/json", "Content-Type": "application/json" },
                     method: "POST",
                     body: n.data,
                  })
                     .then(function (e) {
                        return e.json();
                     })
                     .then(function (e) {
                        (i.reminderUpdateRequired = !0), f(e);
                     })
                     .catch(function (e) {
                        return console.log("failed to create reminder", e);
                     });
            }
            var d, m;
            return !0;
         }),
            chrome.runtime.onMessageExternal.addListener(function (t, n, r) {
               "eazybe_user_mobile" === t.key && r(e);
            }),
            console.log("backscrip is running dist");
      })();
})();
