// full modal

easteregg = 0;

$(function () {
  $(".md-trigger").on("click", function () {
    $(".md-modal").addClass("md-show");
  });

  $(".md-close").on("click", function () {
    $(".md-modal").removeClass("md-show");
  });
});

// modal

// smooth

$(document).on("click", 'a[href^="#"]', function (event) {
  event.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $($.attr(this, "href")).offset().top,
    },
    900
  );
});

// end

// Circle

!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.CircleType = e())
    : (t.CircleType = e());
})("undefined" != typeof self ? self : this, function () {
  return (function (t) {
    function e(r) {
      if (n[r]) return n[r].exports;
      var i = (n[r] = {
        i: r,
        l: !1,
        exports: {},
      });
      return t[r].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
    }
    var n = {};
    return (
      (e.m = t),
      (e.c = n),
      (e.d = function (t, n, r) {
        e.o(t, n) ||
          Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: r,
          });
      }),
      (e.n = function (t) {
        var n =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return e.d(n, "a", n), n;
      }),
      (e.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (e.p = ""),
      e((e.s = 29))
    );
  })([
    function (t, e, n) {
      var r = n(24)("wks"),
        i = n(12),
        o = n(1).Symbol,
        u = "function" == typeof o;
      (t.exports = function (t) {
        return r[t] || (r[t] = (u && o[t]) || (u ? o : i)("Symbol." + t));
      }).store = r;
    },
    function (t, e) {
      var n = (t.exports =
        "undefined" != typeof window && window.Math == Math
          ? window
          : "undefined" != typeof self && self.Math == Math
          ? self
          : Function("return this")());
      "number" == typeof __g && (__g = n);
    },
    function (t, e) {
      var n = (t.exports = {
        version: "2.5.6",
      });
      "number" == typeof __e && (__e = n);
    },
    function (t, e, n) {
      var r = n(4),
        i = n(11);
      t.exports = n(6)
        ? function (t, e, n) {
            return r.f(t, e, i(1, n));
          }
        : function (t, e, n) {
            return (t[e] = n), t;
          };
    },
    function (t, e, n) {
      var r = n(5),
        i = n(34),
        o = n(35),
        u = Object.defineProperty;
      e.f = n(6)
        ? Object.defineProperty
        : function (t, e, n) {
            if ((r(t), (e = o(e, !0)), r(n), i))
              try {
                return u(t, e, n);
              } catch (t) {}
            if ("get" in n || "set" in n)
              throw TypeError("Accessors not supported!");
            return "value" in n && (t[e] = n.value), t;
          };
    },
    function (t, e, n) {
      var r = n(10);
      t.exports = function (t) {
        if (!r(t)) throw TypeError(t + " is not an object!");
        return t;
      };
    },
    function (t, e, n) {
      t.exports = !n(17)(function () {
        return (
          7 !=
          Object.defineProperty({}, "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      });
    },
    function (t, e) {
      var n = {}.hasOwnProperty;
      t.exports = function (t, e) {
        return n.call(t, e);
      };
    },
    function (t, e) {
      var n = Math.ceil,
        r = Math.floor;
      t.exports = function (t) {
        return isNaN((t = +t)) ? 0 : (t > 0 ? r : n)(t);
      };
    },
    function (t, e) {
      t.exports = function (t) {
        if (void 0 == t) throw TypeError("Can't call method on  " + t);
        return t;
      };
    },
    function (t, e) {
      t.exports = function (t) {
        return "object" == typeof t ? null !== t : "function" == typeof t;
      };
    },
    function (t, e) {
      t.exports = function (t, e) {
        return {
          enumerable: !(1 & t),
          configurable: !(2 & t),
          writable: !(4 & t),
          value: e,
        };
      };
    },
    function (t, e) {
      var n = 0,
        r = Math.random();
      t.exports = function (t) {
        return "Symbol(".concat(
          void 0 === t ? "" : t,
          ")_",
          (++n + r).toString(36)
        );
      };
    },
    function (t, e) {
      t.exports = {};
    },
    function (t, e, n) {
      var r = n(24)("keys"),
        i = n(12);
      t.exports = function (t) {
        return r[t] || (r[t] = i(t));
      };
    },
    function (t, e) {
      t.exports = !1;
    },
    function (t, e, n) {
      var r = n(1),
        i = n(2),
        o = n(3),
        u = n(19),
        c = n(20),
        f = function (t, e, n) {
          var a,
            s,
            l,
            p,
            h = t & f.F,
            d = t & f.G,
            v = t & f.S,
            y = t & f.P,
            _ = t & f.B,
            m = d ? r : v ? r[e] || (r[e] = {}) : (r[e] || {}).prototype,
            g = d ? i : i[e] || (i[e] = {}),
            x = g.prototype || (g.prototype = {});
          d && (n = e);
          for (a in n)
            (s = !h && m && void 0 !== m[a]),
              (l = (s ? m : n)[a]),
              (p =
                _ && s
                  ? c(l, r)
                  : y && "function" == typeof l
                  ? c(Function.call, l)
                  : l),
              m && u(m, a, l, t & f.U),
              g[a] != l && o(g, a, p),
              y && x[a] != l && (x[a] = l);
        };
      (r.core = i),
        (f.F = 1),
        (f.G = 2),
        (f.S = 4),
        (f.P = 8),
        (f.B = 16),
        (f.W = 32),
        (f.U = 64),
        (f.R = 128),
        (t.exports = f);
    },
    function (t, e) {
      t.exports = function (t) {
        try {
          return !!t();
        } catch (t) {
          return !0;
        }
      };
    },
    function (t, e, n) {
      var r = n(10),
        i = n(1).document,
        o = r(i) && r(i.createElement);
      t.exports = function (t) {
        return o ? i.createElement(t) : {};
      };
    },
    function (t, e, n) {
      var r = n(1),
        i = n(3),
        o = n(7),
        u = n(12)("src"),
        c = Function.toString,
        f = ("" + c).split("toString");
      (n(2).inspectSource = function (t) {
        return c.call(t);
      }),
        (t.exports = function (t, e, n, c) {
          var a = "function" == typeof n;
          a && (o(n, "name") || i(n, "name", e)),
            t[e] !== n &&
              (a && (o(n, u) || i(n, u, t[e] ? "" + t[e] : f.join(String(e)))),
              t === r
                ? (t[e] = n)
                : c
                ? t[e]
                  ? (t[e] = n)
                  : i(t, e, n)
                : (delete t[e], i(t, e, n)));
        })(Function.prototype, "toString", function () {
          return ("function" == typeof this && this[u]) || c.call(this);
        });
    },
    function (t, e, n) {
      var r = n(36);
      t.exports = function (t, e, n) {
        if ((r(t), void 0 === e)) return t;
        switch (n) {
          case 1:
            return function (n) {
              return t.call(e, n);
            };
          case 2:
            return function (n, r) {
              return t.call(e, n, r);
            };
          case 3:
            return function (n, r, i) {
              return t.call(e, n, r, i);
            };
        }
        return function () {
          return t.apply(e, arguments);
        };
      };
    },
    function (t, e, n) {
      var r = n(42),
        i = n(9);
      t.exports = function (t) {
        return r(i(t));
      };
    },
    function (t, e) {
      var n = {}.toString;
      t.exports = function (t) {
        return n.call(t).slice(8, -1);
      };
    },
    function (t, e, n) {
      var r = n(8),
        i = Math.min;
      t.exports = function (t) {
        return t > 0 ? i(r(t), 9007199254740991) : 0;
      };
    },
    function (t, e, n) {
      var r = n(2),
        i = n(1),
        o = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});
      (t.exports = function (t, e) {
        return o[t] || (o[t] = void 0 !== e ? e : {});
      })("versions", []).push({
        version: r.version,
        mode: n(15) ? "pure" : "global",
        copyright: "© 2018 Denis Pushkarev (zloirock.ru)",
      });
    },
    function (t, e) {
      t.exports =
        "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
          ","
        );
    },
    function (t, e, n) {
      var r = n(4).f,
        i = n(7),
        o = n(0)("toStringTag");
      t.exports = function (t, e, n) {
        t &&
          !i((t = n ? t : t.prototype), o) &&
          r(t, o, {
            configurable: !0,
            value: e,
          });
      };
    },
    function (t, e, n) {
      var r = n(9);
      t.exports = function (t) {
        return Object(r(t));
      };
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", {
        value: !0,
      });
      var r = Math.PI / 180;
      e.default = function (t) {
        return t * r;
      };
    },
    function (t, e, n) {
      "use strict";
      n(30);
      var r = n(54),
        i = (function (t) {
          return t && t.__esModule
            ? t
            : {
                default: t,
              };
        })(r);
      t.exports = i.default;
    },
    function (t, e, n) {
      n(31), n(47), (t.exports = n(2).Array.from);
    },
    function (t, e, n) {
      "use strict";
      var r = n(32)(!0);
      n(33)(
        String,
        "String",
        function (t) {
          (this._t = String(t)), (this._i = 0);
        },
        function () {
          var t,
            e = this._t,
            n = this._i;
          return n >= e.length
            ? {
                value: void 0,
                done: !0,
              }
            : ((t = r(e, n)),
              (this._i += t.length),
              {
                value: t,
                done: !1,
              });
        }
      );
    },
    function (t, e, n) {
      var r = n(8),
        i = n(9);
      t.exports = function (t) {
        return function (e, n) {
          var o,
            u,
            c = String(i(e)),
            f = r(n),
            a = c.length;
          return f < 0 || f >= a
            ? t
              ? ""
              : void 0
            : ((o = c.charCodeAt(f)),
              o < 55296 ||
              o > 56319 ||
              f + 1 === a ||
              (u = c.charCodeAt(f + 1)) < 56320 ||
              u > 57343
                ? t
                  ? c.charAt(f)
                  : o
                : t
                ? c.slice(f, f + 2)
                : u - 56320 + ((o - 55296) << 10) + 65536);
        };
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(15),
        i = n(16),
        o = n(19),
        u = n(3),
        c = n(13),
        f = n(37),
        a = n(26),
        s = n(46),
        l = n(0)("iterator"),
        p = !([].keys && "next" in [].keys()),
        h = function () {
          return this;
        };
      t.exports = function (t, e, n, d, v, y, _) {
        f(n, e, d);
        var m,
          g,
          x,
          b = function (t) {
            if (!p && t in M) return M[t];
            switch (t) {
              case "keys":
              case "values":
                return function () {
                  return new n(this, t);
                };
            }
            return function () {
              return new n(this, t);
            };
          },
          O = e + " Iterator",
          w = "values" == v,
          j = !1,
          M = t.prototype,
          S = M[l] || M["@@iterator"] || (v && M[v]),
          P = S || b(v),
          A = v ? (w ? b("entries") : P) : void 0,
          T = "Array" == e ? M.entries || S : S;
        if (
          (T &&
            (x = s(T.call(new t()))) !== Object.prototype &&
            x.next &&
            (a(x, O, !0), r || "function" == typeof x[l] || u(x, l, h)),
          w &&
            S &&
            "values" !== S.name &&
            ((j = !0),
            (P = function () {
              return S.call(this);
            })),
          (r && !_) || (!p && !j && M[l]) || u(M, l, P),
          (c[e] = P),
          (c[O] = h),
          v)
        )
          if (
            ((m = {
              values: w ? P : b("values"),
              keys: y ? P : b("keys"),
              entries: A,
            }),
            _)
          )
            for (g in m) g in M || o(M, g, m[g]);
          else i(i.P + i.F * (p || j), e, m);
        return m;
      };
    },
    function (t, e, n) {
      t.exports =
        !n(6) &&
        !n(17)(function () {
          return (
            7 !=
            Object.defineProperty(n(18)("div"), "a", {
              get: function () {
                return 7;
              },
            }).a
          );
        });
    },
    function (t, e, n) {
      var r = n(10);
      t.exports = function (t, e) {
        if (!r(t)) return t;
        var n, i;
        if (e && "function" == typeof (n = t.toString) && !r((i = n.call(t))))
          return i;
        if ("function" == typeof (n = t.valueOf) && !r((i = n.call(t))))
          return i;
        if (!e && "function" == typeof (n = t.toString) && !r((i = n.call(t))))
          return i;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function (t, e) {
      t.exports = function (t) {
        if ("function" != typeof t) throw TypeError(t + " is not a function!");
        return t;
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(38),
        i = n(11),
        o = n(26),
        u = {};
      n(3)(u, n(0)("iterator"), function () {
        return this;
      }),
        (t.exports = function (t, e, n) {
          (t.prototype = r(u, {
            next: i(1, n),
          })),
            o(t, e + " Iterator");
        });
    },
    function (t, e, n) {
      var r = n(5),
        i = n(39),
        o = n(25),
        u = n(14)("IE_PROTO"),
        c = function () {},
        f = function () {
          var t,
            e = n(18)("iframe"),
            r = o.length;
          for (
            e.style.display = "none",
              n(45).appendChild(e),
              e.src = "javascript:",
              t = e.contentWindow.document,
              t.open(),
              t.write("<script>document.F=Object</script>"),
              t.close(),
              f = t.F;
            r--;

          )
            delete f.prototype[o[r]];
          return f();
        };
      t.exports =
        Object.create ||
        function (t, e) {
          var n;
          return (
            null !== t
              ? ((c.prototype = r(t)),
                (n = new c()),
                (c.prototype = null),
                (n[u] = t))
              : (n = f()),
            void 0 === e ? n : i(n, e)
          );
        };
    },
    function (t, e, n) {
      var r = n(4),
        i = n(5),
        o = n(40);
      t.exports = n(6)
        ? Object.defineProperties
        : function (t, e) {
            i(t);
            for (var n, u = o(e), c = u.length, f = 0; c > f; )
              r.f(t, (n = u[f++]), e[n]);
            return t;
          };
    },
    function (t, e, n) {
      var r = n(41),
        i = n(25);
      t.exports =
        Object.keys ||
        function (t) {
          return r(t, i);
        };
    },
    function (t, e, n) {
      var r = n(7),
        i = n(21),
        o = n(43)(!1),
        u = n(14)("IE_PROTO");
      t.exports = function (t, e) {
        var n,
          c = i(t),
          f = 0,
          a = [];
        for (n in c) n != u && r(c, n) && a.push(n);
        for (; e.length > f; ) r(c, (n = e[f++])) && (~o(a, n) || a.push(n));
        return a;
      };
    },
    function (t, e, n) {
      var r = n(22);
      t.exports = Object("z").propertyIsEnumerable(0)
        ? Object
        : function (t) {
            return "String" == r(t) ? t.split("") : Object(t);
          };
    },
    function (t, e, n) {
      var r = n(21),
        i = n(23),
        o = n(44);
      t.exports = function (t) {
        return function (e, n, u) {
          var c,
            f = r(e),
            a = i(f.length),
            s = o(u, a);
          if (t && n != n) {
            for (; a > s; ) if ((c = f[s++]) != c) return !0;
          } else
            for (; a > s; s++)
              if ((t || s in f) && f[s] === n) return t || s || 0;
          return !t && -1;
        };
      };
    },
    function (t, e, n) {
      var r = n(8),
        i = Math.max,
        o = Math.min;
      t.exports = function (t, e) {
        return (t = r(t)), t < 0 ? i(t + e, 0) : o(t, e);
      };
    },
    function (t, e, n) {
      var r = n(1).document;
      t.exports = r && r.documentElement;
    },
    function (t, e, n) {
      var r = n(7),
        i = n(27),
        o = n(14)("IE_PROTO"),
        u = Object.prototype;
      t.exports =
        Object.getPrototypeOf ||
        function (t) {
          return (
            (t = i(t)),
            r(t, o)
              ? t[o]
              : "function" == typeof t.constructor && t instanceof t.constructor
              ? t.constructor.prototype
              : t instanceof Object
              ? u
              : null
          );
        };
    },
    function (t, e, n) {
      "use strict";
      var r = n(20),
        i = n(16),
        o = n(27),
        u = n(48),
        c = n(49),
        f = n(23),
        a = n(50),
        s = n(51);
      i(
        i.S +
          i.F *
            !n(53)(function (t) {
              Array.from(t);
            }),
        "Array",
        {
          from: function (t) {
            var e,
              n,
              i,
              l,
              p = o(t),
              h = "function" == typeof this ? this : Array,
              d = arguments.length,
              v = d > 1 ? arguments[1] : void 0,
              y = void 0 !== v,
              _ = 0,
              m = s(p);
            if (
              (y && (v = r(v, d > 2 ? arguments[2] : void 0, 2)),
              void 0 == m || (h == Array && c(m)))
            )
              for (e = f(p.length), n = new h(e); e > _; _++)
                a(n, _, y ? v(p[_], _) : p[_]);
            else
              for (l = m.call(p), n = new h(); !(i = l.next()).done; _++)
                a(n, _, y ? u(l, v, [i.value, _], !0) : i.value);
            return (n.length = _), n;
          },
        }
      );
    },
    function (t, e, n) {
      var r = n(5);
      t.exports = function (t, e, n, i) {
        try {
          return i ? e(r(n)[0], n[1]) : e(n);
        } catch (e) {
          var o = t.return;
          throw (void 0 !== o && r(o.call(t)), e);
        }
      };
    },
    function (t, e, n) {
      var r = n(13),
        i = n(0)("iterator"),
        o = Array.prototype;
      t.exports = function (t) {
        return void 0 !== t && (r.Array === t || o[i] === t);
      };
    },
    function (t, e, n) {
      "use strict";
      var r = n(4),
        i = n(11);
      t.exports = function (t, e, n) {
        e in t ? r.f(t, e, i(0, n)) : (t[e] = n);
      };
    },
    function (t, e, n) {
      var r = n(52),
        i = n(0)("iterator"),
        o = n(13);
      t.exports = n(2).getIteratorMethod = function (t) {
        if (void 0 != t) return t[i] || t["@@iterator"] || o[r(t)];
      };
    },
    function (t, e, n) {
      var r = n(22),
        i = n(0)("toStringTag"),
        o =
          "Arguments" ==
          r(
            (function () {
              return arguments;
            })()
          ),
        u = function (t, e) {
          try {
            return t[e];
          } catch (t) {}
        };
      t.exports = function (t) {
        var e, n, c;
        return void 0 === t
          ? "Undefined"
          : null === t
          ? "Null"
          : "string" == typeof (n = u((e = Object(t)), i))
          ? n
          : o
          ? r(e)
          : "Object" == (c = r(e)) && "function" == typeof e.callee
          ? "Arguments"
          : c;
      };
    },
    function (t, e, n) {
      var r = n(0)("iterator"),
        i = !1;
      try {
        var o = [7][r]();
        (o.return = function () {
          i = !0;
        }),
          Array.from(o, function () {
            throw 2;
          });
      } catch (t) {}
      t.exports = function (t, e) {
        if (!e && !i) return !1;
        var n = !1;
        try {
          var o = [7],
            u = o[r]();
          (u.next = function () {
            return {
              done: (n = !0),
            };
          }),
            (o[r] = function () {
              return u;
            }),
            t(o);
        } catch (t) {}
        return n;
      };
    },
    function (t, e, n) {
      "use strict";

      function r(t) {
        return t && t.__esModule
          ? t
          : {
              default: t,
            };
      }

      function i(t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(e, "__esModule", {
        value: !0,
      });
      var o = (function () {
          function t(t, e) {
            for (var n = 0; n < e.length; n++) {
              var r = e[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                "value" in r && (r.writable = !0),
                Object.defineProperty(t, r.key, r);
            }
          }
          return function (e, n, r) {
            return n && t(e.prototype, n), r && t(e, r), e;
          };
        })(),
        u = n(55),
        c = r(u),
        f = n(56),
        a = r(f),
        s = n(57),
        l = r(s),
        p = n(58),
        h = r(p),
        d = n(59),
        v = r(d),
        y = Math.PI,
        _ = Math.max,
        m = Math.min,
        g = (function () {
          function t(e, n) {
            i(this, t),
              (this.element = e),
              (this.originalHTML = this.element.innerHTML);
            var r = document.createElement("div"),
              o = document.createDocumentFragment();
            r.setAttribute("aria-label", e.innerText),
              (r.style.position = "relative"),
              (this.container = r),
              (this._letters = (0, a.default)(e, n)),
              this._letters.forEach(function (t) {
                return o.appendChild(t);
              }),
              r.appendChild(o),
              (this.element.innerHTML = ""),
              this.element.appendChild(r);
            var u = window.getComputedStyle(this.element),
              f = u.fontSize,
              s = u.lineHeight;
            (this._fontSize = parseFloat(f)),
              (this._lineHeight = parseFloat(s) || this._fontSize),
              (this._metrics = this._letters.map(c.default));
            var l = this._metrics.reduce(function (t, e) {
              return t + e.width;
            }, 0);
            (this._minRadius = l / y / 2 + this._lineHeight),
              (this._dir = 1),
              (this._forceWidth = !1),
              (this._forceHeight = !0),
              (this._radius = this._minRadius),
              this._invalidate();
          }
          return (
            o(t, [
              {
                key: "radius",
                value: function (t) {
                  return void 0 !== t
                    ? ((this._radius = _(this._minRadius, t)),
                      this._invalidate(),
                      this)
                    : this._radius;
                },
              },
              {
                key: "dir",
                value: function (t) {
                  return void 0 !== t
                    ? ((this._dir = t), this._invalidate(), this)
                    : this._dir;
                },
              },
              {
                key: "forceWidth",
                value: function (t) {
                  return void 0 !== t
                    ? ((this._forceWidth = t), this._invalidate(), this)
                    : this._forceWidth;
                },
              },
              {
                key: "forceHeight",
                value: function (t) {
                  return void 0 !== t
                    ? ((this._forceHeight = t), this._invalidate(), this)
                    : this._forceHeight;
                },
              },
              {
                key: "refresh",
                value: function () {
                  return this._invalidate();
                },
              },
              {
                key: "destroy",
                value: function () {
                  return (this.element.innerHTML = this.originalHTML), this;
                },
              },
              {
                key: "_invalidate",
                value: function () {
                  var t = this;
                  return (
                    cancelAnimationFrame(this._raf),
                    (this._raf = requestAnimationFrame(function () {
                      t._layout();
                    })),
                    this
                  );
                },
              },
              {
                key: "_layout",
                value: function () {
                  var t = this,
                    e = this._radius,
                    n = this._dir,
                    r = -1 === n ? -e + this._lineHeight : e,
                    i = "center " + r / this._fontSize + "em",
                    o = e - this._lineHeight,
                    u = (0, v.default)(this._metrics, o),
                    c = u.rotations,
                    f = u.θ;
                  if (
                    (this._letters.forEach(function (e, r) {
                      var o = e.style,
                        u = (-0.5 * f + c[r]) * n,
                        a = (-0.5 * t._metrics[r].width) / t._fontSize,
                        s = "translateX(" + a + "em) rotate(" + u + "deg)";
                      (o.position = "absolute"),
                        (o.bottom = -1 === n ? 0 : "auto"),
                        (o.left = "50%"),
                        (o.transform = s),
                        (o.transformOrigin = i),
                        (o.webkitTransform = s),
                        (o.webkitTransformOrigin = i);
                    }),
                    this._forceHeight)
                  ) {
                    var a =
                      f > 180
                        ? (0, l.default)(e, f)
                        : (0, l.default)(o, f) + this._lineHeight;
                    this.container.style.height = a / this._fontSize + "em";
                  }
                  if (this._forceWidth) {
                    var s = (0, h.default)(e, m(180, f));
                    this.container.style.width = s / this._fontSize + "em";
                  }
                  return this;
                },
              },
            ]),
            t
          );
        })();
      e.default = g;
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", {
        value: !0,
      }),
        (e.default = function (t) {
          var e = t.getBoundingClientRect();
          return {
            height: e.height,
            left: e.left + window.pageXOffset,
            top: e.top + window.pageYOffset,
            width: e.width,
          };
        });
    },
    function (t, e, n) {
      "use strict";

      function r(t) {
        if (Array.isArray(t)) {
          for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
          return n;
        }
        return Array.from(t);
      }
      Object.defineProperty(e, "__esModule", {
        value: !0,
      }),
        (e.default = function (t, e) {
          var n = document.createElement("span"),
            i = t.innerText.trim();
          return (e ? e(i) : [].concat(r(i))).map(function (t) {
            var e = n.cloneNode();
            return (
              e.insertAdjacentHTML("afterbegin", " " === t ? "&nbsp;" : t), e
            );
          });
        });
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", {
        value: !0,
      });
      var r = n(28),
        i = (function (t) {
          return t && t.__esModule
            ? t
            : {
                default: t,
              };
        })(r);
      e.default = function (t, e) {
        return t * (1 - Math.cos((0, i.default)(e / 2)));
      };
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", {
        value: !0,
      });
      var r = n(28),
        i = (function (t) {
          return t && t.__esModule
            ? t
            : {
                default: t,
              };
        })(r);
      e.default = function (t, e) {
        return 2 * t * Math.sin((0, i.default)(e / 2));
      };
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", {
        value: !0,
      });
      var r = n(60),
        i = (function (t) {
          return t && t.__esModule
            ? t
            : {
                default: t,
              };
        })(r);
      e.default = function (t, e) {
        return t.reduce(
          function (t, n) {
            var r = n.width,
              o = (0, i.default)(r / e);
            return {
              θ: t.θ + o,
              rotations: t.rotations.concat([t.θ + o / 2]),
            };
          },
          {
            θ: 0,
            rotations: [],
          }
        );
      };
    },
    function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", {
        value: !0,
      });
      var r = 180 / Math.PI;
      e.default = function (t) {
        return t * r;
      };
    },
  ]);
});

// end circle
