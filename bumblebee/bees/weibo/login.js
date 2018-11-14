KISSY.config({
    combine: !0
}),
KISSY.add("login/guidehook", function(a) {
    return function(b) {
        var c = a.one("#J_SC_Guide");
        c && a.isFunction(b) && c.on("click", function(a) {
            a.halt(),
            b({
                type: "click"
            })
        })
    }
}, {
    requires: ["node", "event"]
}),
KISSY.ready(function(a) {
    a.use("node, ua", function(a) {
        var b = a.one
          , c = (a.all,
        a.unparam(window.location.search.slice(1)))
          , d = {
            elLogin: b("#J_Login"),
            elStaticForm: b("#J_StaticForm"),
            elSignedForm: b("#J_SignedForm"),
            elSSOBox: b("#J_QuickLogin"),
            elSSOForm: b("#J_SSOForm"),
            bMini: c && c.style ? !!c.style.match(/^(?:mini|b2b)/) : !1,
            bDaily: window.location.host.indexOf("daily.taobao.net") >= 0 ? !0 : !1,
            bHttps: "https:" === window.location.protocol
        }
          , e = window.loginConfig
          , f = window.havanaConfig || {};
        if (f.havanaEnable = !!f.enable,
        e) {
            var g = window.location.hostname.split(".").slice(-2).join(".");
            -1 !== g.indexOf("taobao") && (document.domain = g),
            a.use("login/page", function(a, b) {
                b.init(a.merge(e, f, d))
            })
        }
    })
}),
KISSY.add("login/inputclear", function(a) {
    var b = function(c) {
        return this instanceof b ? (this.input = a.one(c.input),
        this.uid = a.now(),
        this.el = null,
        this.force = !!c.force,
        void this._init()) : new b(c)
    };
    return a.augment(b, {
        _init: function() {
            !this.input || !this.force && this.nativeSupport() || (this.wrap = this.input.parent(),
            this.input.on("valuechange", function() {
                this.input.val().length ? this.show() : this.hide()
            }, this),
            this.input.fire("valuechange"))
        },
        _create: function() {
            var b = a.DOM.create("<span>", {
                id: "J_NickX" + this.uid,
                "class": "nickx",
                href: "javascript:void(0)"
            });
            this.wrap.append(b),
            this.el = a.one("#J_NickX" + this.uid),
            a.one(this.el).on("click", function(a) {
                a.halt(),
                this.input.val(""),
                this.input[0].focus(),
                this.hide()
            }, this)
        },
        nativeSupport: function() {
            return a.UA.ie && a.UA.ie >= 10
        },
        show: function() {
            return this.el || this._create(),
            this.el[0].style.display = "block",
            this
        },
        hide: function() {
            return this.el && (this.el[0].style.display = "none"),
            this
        }
    }),
    b
}),
KISSY.add("login/message", function(a) {
    var b = function(c) {
        return this instanceof b ? (c = c || {},
        this.el = a.one(c.el),
        void this._init()) : new b(c)
    };
    return a.augment(b, {
        _init: function() {
            return this.el ? this : void 0
        },
        show: function(a, b) {
            this.el && (this.el.html(a).attr("class", b || "message error"),
            this.el[0].style.display = "block")
        },
        hide: function() {
            this.el && (this.el[0].style.display = "none")
        },
        reset: function() {
            this.el && (this.hide(),
            this.el.html(""))
        }
    }),
    b
}, {
    requires: ["node"]
}),
KISSY.add("login/page", function(a, b, c, d, e, f) {
    var g = {
        cfg: {
            defaultView: "static"
        },
        init: function(a) {
            this.initialize(a)
        },
        initialize: function(g) {
            g && (this.cfg = a.merge(this.cfg, g));
            var h = this;
            this.messageSSO = c({
                el: "#J_MessageSSO"
            }),
            this.messageSigned = c({
                el: "#J_MessageSigned"
            }),
            this.messageStatic = c({
                el: "#J_MessageStatic"
            }),
            a.each(a.all(".ph-label"), function(a) {
                d({
                    label: a
                })
            });
            var i = b(h.cfg);
            g.disableQuickLogin ? (i.switchTo(g.defaultView),
            "quick" === g.defaultView && g.elLogin && g.elLogin.hasClass("quickx") && g.elLogin.addClass("quickxn")) : a.use("login/sso/index", function(a, b) {
                b(a.merge(h.cfg, {
                    callback: function(b) {
                        switch (b = b || {},
                        b.stat) {
                        case "ready":
                            i.switchTo("quick");
                            break;
                        case "error":
                        case "nouser":
                        case "loginfail":
                        case "loginerror":
                            i.switchTo(g.defaultView),
                            "quick" === g.defaultView && g.elLogin && g.elLogin.hasClass("quickx") && g.elLogin.addClass("quickxn")
                        }
                        window._submit_t_ && window._lgst_ && (window._submit_t_.loading = a.now())
                    }
                }))
            });
            var j = e(a.merge(h.cfg, {
                message: h.messageStatic
            }))
              , k = f(a.merge(h.cfg, {
                message: h.messageSigned
            }));
            i.on("switch", function(a) {
                h.messageStatic.reset(),
                h.messageSSO.reset(),
                h.messageSigned.reset(),
                "static" === a.module && j.refreshEdit(),
                "signed" === a.module && k.refreshEdit()
            })
        }
    };
    return g
}, {
    requires: ["login/switcher", "login/message", "login/placeholder", "login/static/index", "login/signed/index"]
}),
KISSY.add("login/password", function(a, b, c, d, e, f, g) {
    var h = function(b) {
        return this instanceof h ? (this.cfg = b = b || {},
        this._safeon = !!b.safeon,
        this.safeon = !1,
        this.input = a.one(b.input),
        this.inputContainer = a.one(b.inputContainer),
        this.form = a.one(b.form),
        this.editChk = a.one(b.chk),
        this.editContainer = a.one(b.editContainer),
        this.editTmpContainer = a.one(b.editTmpContainer),
        this.prevInput = a.one(b.prevInput),
        this.available = !0,
        void this._init()) : new h(b)
    };
    return a.augment(h, {
        _init: function() {
            if (!this.input || !this.editChk)
                return void (this.available = !1);
            var b = this;
            return this.editContainer.hide(),
            this.safeedit = e({
                mode: "password",
                container: this.editContainer
            }),
            this.safeedit.envsupport ? (this.safeedit.on("enter_keydown", function() {
                b.form.fire("submit")
            }),
            this.cacheedit = g(this.cfg),
            a.later(function() {
                this.safeedit && this.safeedit.support && this._safeon && !this.cacheedit.check() ? this.showEdit() : (this.hideEdit(),
                this.input.val().length > 20 && this.input.val(""))
            }, 50, !1, this),
            this.editChk.on("click", function() {
                b._editChkClicked = !0;
                var a = b.editChk.prop("checked");
                a ? b.showEdit() : b.hideEdit()
            }),
            this.safeeditTmp = e({
                container: this.editTmpContainer,
                width: 0,
                height: 0
            }),
            void (this.prevInput && !this.safeedit.tabsupport && this.prevInput && this.prevInput.on("keydown", function(c) {
                9 === c.keyCode && !b._editChkClicked && b.safeon && (b.hideEdit(),
                a.later(function() {
                    b.focus()
                }, 50))
            }))) : (this.editChk.parent().hide(),
            void this.editChk.prop("disabled", !0))
        },
        val: function() {
            return this.available ? this.safeon ? this.safeedit.val() : this.input.val() : void 0
        },
        focus: function() {
            this.available && (this.safeon || this.input[0].focus())
        },
        showEdit: function() {
            if (this.available) {
                if (!this.safeedit.support)
                    return f.show(),
                    void this.editChk.prop("checked", !1);
                this.inputContainer[0].style.display = "none",
                this.editContainer[0].style.display = "block",
                this.safeon = !0,
                this.editChk.prop("checked", !0),
                this.form[0].elements.loginType.value = 4,
                this.input.val("").attr("maxlength", 1e3)
            }
        },
        hideEdit: function() {
            this.available && (this.inputContainer[0].style.display = "block",
            this.editContainer[0].style.display = "none",
            this.safeon = !1,
            this.editChk.prop("checked", !1),
            this.form[0].elements.loginType.value = 3,
            this.input.val("").attr("maxlength", 20))
        },
        ci1: function() {
            return this.safeon && this.safeedit ? this.safeedit.ci1() : this.safeeditTmp ? this.safeeditTmp.ci1() : ""
        },
        ci2: function() {
            return this.safeon && this.safeedit ? this.safeedit.ci2() : this.safeeditTmp ? this.safeeditTmp.ci2() : ""
        },
        refreshEdit: function() {
            this.available && this.editChk.prop("checked") && (this.editContainer[0].style.visibility = "hidden",
            a.later(function() {
                this.editContainer[0].style.visibility = "visible"
            }, 50, !1, this))
        }
    }),
    h
}, {
    requires: ["node", "dom", "ua", "login/safeedit/index", "login/safeedit/pluginpop", "login/static/cacheedit"]
}),
KISSY.add("login/placeholder", function(a) {
    var b = function(c) {
        return this instanceof b ? (c = c || {},
        this.label = c.label ? a.one(c.label) : null,
        this.wrap = this.label ? this.label.parent() : null,
        this.input = (c.input ? a.one(c.input) : null) || (this.wrap ? this.wrap.one("input") : null),
        void this._init()) : new b(c)
    };
    return a.augment(b, {
        _init: function() {
            this.input && this.label && (this._bind(),
            a.later(function() {
                this.input.fire("valuechange")
            }, 50, !1, this))
        },
        _bind: function() {
            this.label.on("click", function(a) {
                this.input[0].focus()
            }, this),
            this.input.on("blur", function(a) {
                this.input.val() ? this._hide() : this._show(),
                this._focusing = !1
            }, this).on("focus", function(a) {
                this.input.val() ? this._hide() : this._focus(),
                this._focusing = !0
            }, this).on("valuechange", function(a) {
                this.input.val() ? this._hide() : this._focusing ? this._focus() : this._show()
            }, this)
        },
        _show: function() {
            this.label.removeClass("ph-focus").removeClass("ph-hide")
        },
        _hide: function() {
            this.label.removeClass("ph-focus").addClass("ph-hide")
        },
        _focus: function() {
            this.label.removeClass("ph-hide").addClass("ph-focus")
        }
    }),
    b
}, {
    requires: ["node"]
}),
KISSY.add("login/submitbutton", function(a) {
    var b = function(c) {
        return this instanceof b ? (c = c || {},
        this.el = a.one(c.el),
        void this._init()) : new b(c)
    };
    return a.augment(b, {
        _init: function() {
            return this.el ? (this.text = this.el.text(),
            this) : void 0
        },
        ing: function(a) {
            return this.el.text(a),
            this
        },
        reset: function() {
            return this.el.prop("disabled", !1),
            this.el.text(this.text),
            this
        }
    }),
    b
}),
KISSY.add("login/switcher", function(a) {
    var b = a.Event
      , c = "signed"
      , d = "quick"
      , e = "logged"
      , f = "static"
      , g = "module-signed"
      , h = "module-logged"
      , i = "module-quick"
      , j = "module-static"
      , k = function(a) {
        return this instanceof k ? (this.cfg = a || {},
        this.elLogin = a.elLogin,
        void this._init()) : new k(a)
    };
    return a.augment(k, b.Target, {
        _init: function() {
            var b = this;
            this.cfg.elLogin && !this.cfg.elLogin.hasClass("quickx") && a.all(".other-account").on("click", function(a) {
                a.halt(),
                b.switchTo(f)
            })
        },
        switchTo: function(a) {
            switch (this.elLogin.removeClass("loading"),
            a) {
            case f:
                this.elLogin.addClass(j).removeClass(i).removeClass(g).removeClass(h),
                this.fire("switch", {
                    module: f
                });
                break;
            case c:
                this.elLogin.addClass(g).removeClass(j).removeClass(i).removeClass(h),
                this.fire("switch", {
                    module: c
                });
                break;
            case e:
                this.elLogin.addClass(h).removeClass(j).removeClass(i).removeClass(g),
                this.fire("switch", {
                    module: e
                });
                break;
            case d:
                this.elLogin.addClass(i).removeClass(j).removeClass(g).removeClass(h),
                this.fire("switch", {
                    module: d
                })
            }
        }
    }),
    k
}, {
    requires: ["node", "event"]
}),
KISSY.add("login/tracknick", function(a) {
    var b = function(a) {
        return this instanceof b ? (a = a || {},
        this.cookiename = a.bCBU ? "lid" : "tracknick",
        void this._init()) : new b(a)
    };
    return a.augment(b, {
        _init: function() {},
        get: function() {
            var b = a.Cookie.get(this.cookiename);
            return b = b ? window.unescape(b.replace(/(?:#88)$/, "").replace(/\\u/g, "%u")) : ""
        }
    }),
    b
}, {
    requires: ["cookie"]
}),
KISSY.add("login/um", function(a) {
    return {
        ready: function(b) {
            if (a.isFunction(b)) {
                var c, d = a.one("#um_to"), e = window.um, f = 1500, g = 200, h = 0;
                return d ? void (e && e.getStatus ? c = a.later(function() {
                    h += g,
                    (e.getStatus() || h >= f) && (d.val(window.parseInt(d.val(), 10) + h),
                    c.cancel(),
                    b())
                }, g, !0) : b()) : void b()
            }
        }
    }
}),
KISSY.add("login/validator", function(a) {
    var b = a.all
      , c = (a.one,
    function(b) {
        return this instanceof c ? (b = b || {},
        this.message = b.message,
        this.type = a.isString(b.type) ? b.type : "",
        this.checkcode = b.checkcode,
        this.password = b.password,
        this.elUserName = b.elUserName,
        void this._init()) : new c(b)
    }
    )
      , d = {
        on: function(a) {
            b(a).addClass("i-hl")
        },
        off: function(a) {
            b(a).removeClass("i-hl")
        }
    };
    return a.augment(c, {
        _init: function() {
            !this.message || !this.type
        },
        check: function() {
            var a = "";
            switch (this.type) {
            case "static":
                a = this._checkStaticForm();
                break;
            case "logged":
                a = this._checkSignedForm()
            }
            return a ? (this.message && this.message.show(a),
            !1) : !0
        },
        _checkStaticForm: function() {
            var b = ""
              , c = this.elUserName ? a.trim(this.elUserName.val()) : ""
              , e = this.checkcode ? a.trim(this.checkcode.val()) : ""
              , f = this.password ? this.password.val() : "";
            return c ? this.elUserName && d.off(this.elUserName) : (b = "\u8d26\u6237\u540d",
            this.elUserName && d.on(this.elUserName)),
            f ? this.password && d.off(this.password.input) : (b ? b += "\u548c\u5bc6\u7801" : (b = "\u5bc6\u7801",
            this.password && this.password.focus()),
            this.password && d.on(this.password.input)),
            this.checkcode && this.checkcode.on && !e && (b ? d.off(this.checkcode.input) : (b = "\u9a8c\u8bc1\u7801",
            this.checkcode.focus(),
            d.on(this.checkcode.input))),
            b ? "\u8bf7\u8f93\u5165" + b : ""
        },
        _checkSignedForm: function() {
            var b = ""
              , c = this.checkcode ? a.trim(this.checkcode.val()) : ""
              , e = this.password ? this.password.val() : "";
            return e ? this.password && d.off(this.password.input) : (b ? b += "\u548c\u5bc6\u7801" : (b = "\u5bc6\u7801",
            this.password && this.password.focus()),
            this.password && d.on(this.password.input)),
            this.checkcode && this.checkcode.on && !c && (b ? d.off(this.checkcode.input) : (b = "\u9a8c\u8bc1\u7801",
            this.checkcode.focus(),
            d.on(this.checkcode.input))),
            b ? "\u8bf7\u8f93\u5165" + b : ""
        }
    }),
    c
}),
KISSY.add("login/xlogin", function(a, b, c, d, e, f, g) {
    var h = function(a) {
        return this instanceof h ? void 0 : new h(a)
    };
    return a.augment(h, {
        _init: function() {
            this.form && (this.validator = d(a.merge(this.cfg, {
                message: this.message
            })),
            this.submitbutton = e({
                el: a.one(".J_Submit", this.form)
            }),
            this._bind())
        },
        _ci: function() {
            try {
                this.form[0].elements.tid.value = this.password.ci1(),
                a.UA.ie && (this.form[0].elements.poy.value = this.password.ci2())
            } catch (b) {}
        },
        _bind: function() {
            var b = this;
            this.form.on("submit", function(d) {
                d.halt(),
                window._submit_t_ && window._lgst_ && (window._submit_t_.t1 = "STATIC" === b.type ? "static" : "logged",
                window._submit_t_.t2 = a.now()),
                b.submitbutton && b.submitbutton.ing("\u6b63\u5728\u767b\u5f55..."),
                c.ready(function() {
                    b.validator.check() ? b._login() : b.submitbutton && b.submitbutton.reset()
                })
            })
        },
        _updateCacheEdit: function() {
            this.cacheedit = this.cacheedit || g(this.cfg),
            this.cacheedit.update()
        },
        _login: function() {
            var b = this;
            return ("STATIC" === this.type || "SIGNED" === this.type) && (this.password.safeon ? this.password.input.val(this.password.val()) : a.isFunction(window.PwdIntensity) && (this.form[0].elements.pstrong.value = window.PwdIntensity(this.password.val())),
            this._ci(),
            this._updateCacheEdit()),
            this.havanaEnable ? void this._getToken(function(c) {
                return c ? (b.havanalogin = b.havanalogin || f(a.merge({
                    success: function(a) {
                        a.top ? window.top.location.href = a.url : window.location.href = a.url
                    },
                    error: function(a) {
                        a && a.message ? (b.message.show(a.message, "error"),
                        b.submitbutton.reset()) : b._submit()
                    }
                }, {
                    url: b.cfg.vstUrl,
                    applyStUrl: b.cfg.applyStUrl,
                    miniLoginCheckUrl: b.cfg.miniLoginCheckUrl,
                    site: b.cfg.site,
                    params: b.cfg.vstParams
                })),
                void b.havanalogin.login({
                    token: c
                })) : void b._submit()
            }) : void this._submit()
        },
        _getToken: function(b) {
            if (a.isFunction(b)) {
                try {
                    var c = this.form[0].elements.newlogin
                      , d = this.form[0].elements.callback;
                    c && (c.value = "1"),
                    d && (d.value = "1")
                } catch (e) {}
                var f = this;
                a.io({
                    type: "post",
                    dataType: "json",
                    cache: !1,
                    url: this.getTokenURL,
                    form: this.form,
                    timeout: 2,
                    success: function(c) {
                        if (!c)
                            return void f._submit();
                        if (c.state)
                            c.data && c.data.token ? b(c.data.token) : f._submit();
                        else {
                            var d = c.data ? c.data.code : 0;
                            if (!d)
                                return void f._submit();
                            if (c.data.needrefresh && c.data.url)
                                return void (window.top.location.href = c.data.url);
                            f.message && c.message && f.message.show(c.message || "\u51fa\u9519\u4e86\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01", "error"),
                            f.submitbutton && f.submitbutton.reset(),
                            3425 === d || 1e3 === d ? (c.data.ccurl && a.one("#J_CodeImage1").attr("data-src", c.data.ccurl),
                            f.checkcode && f.checkcode.isShow() ? f.checkcode.refresh().focus() : f.checkcode && f.checkcode.show().focus()) : f.checkcode && f.checkcode.isShow() && f.checkcode.refresh()
                        }
                    },
                    error: function() {
                        f._submit()
                    }
                })
            }
        },
        _submit: function() {
            var a = this.form[0];
            try {
                var b = a.elements.newlogin
                  , c = a.elements.callback;
                b && (b.value = "0"),
                c && (c.value = "")
            } catch (d) {}
            a.submit()
        }
    }),
    h
}, {
    requires: ["event", "login/um", "login/validator", "login/submitbutton", "login/havana/havanalogin", "login/static/cacheedit"]
}),
KISSY.add("login/checkcode/audiocheckcode", function(a) {
    var b = a.DOM
      , c = function(b) {
        return this instanceof c ? (b = b || {},
        this.url = b.url || "",
        this.input = b.input && a.one(b.input),
        this.handle = b.handle && a.one(b.handle),
        this.player = null,
        void this._init()) : new c(b)
    };
    return a.augment(c, {
        _init: function() {
            if (!this.url || !this.input || !this.handle)
                return this;
            var b = this;
            this.handle.on("click", function(c) {
                c.halt(),
                b.play(),
                a.later(function() {
                    b.input[0].focus()
                }, 10)
            })
        },
        playHTML: function() {
            var b, c = -1 !== navigator.userAgent.indexOf("Windows");
            try {
                b = "Audio"in window && (new window.Audio).canPlayType("audio/x-wav;") ? function() {
                    return "<audio autoplay hidden></audio>"
                }
                : a.UA.ie ? function() {
                    return "<bgsound></bgsound>"
                }
                : function() {
                    return "<embed " + (c ? 'type="application/x-mplayer2"' : 'type="audio/x-wav"') + ' autostart="true" hidden="true" />'
                }
            } catch (d) {
                b = a.UA.ie ? function() {
                    return "<bgsound></bgsound>"
                }
                : function() {
                    return "<embed " + (c ? 'type="application/x-mplayer2"' : 'type="audio/x-wav"') + ' autostart="true" hidden="true" />'
                }
            }
            return this.playHTML = b,
            b()
        },
        play: function() {
            this.player && this.player.parentNode.removeChild(this.player),
            this.player = b.create(this.playHTML(), {
                src: this.url + "&t=" + (new Date).getTime()
            }),
            b.append(this.player, document.body || document.documentElement)
        }
    }),
    c
}),
KISSY.add("login/checkcode/index", function(a, b, c) {
    var d = function(b) {
        return this instanceof d ? (b = b || {},
        this.form = a.one(b.form),
        this.input = a.one(b.input),
        this.img = a.one(b.img),
        this.handler = a.one(b.handler),
        this.wrap = this.input ? this.input.parent() : null,
        this.elNeedCheckCode = this.form ? a.one(this.form[0].elements.need_check_code) : null,
        this.src = this.img ? this.img.attr("data-src") : "",
        this.bMini = b.bMini,
        this._refreshed = !1,
        void this._init()) : new d(b)
    };
    return a.augment(d, {
        _init: function() {
            if (this.img && this.handler && this.wrap) {
                var a = this;
                this.handler.on("click", function(b) {
                    b.halt(),
                    a.refresh(),
                    a.focus()
                }),
                this.img.on("click", function() {
                    a.refresh(),
                    a.focus()
                }),
                this.isShow() && this.refresh()
            }
        },
        refresh: function() {
            return this.src = this.img ? this.img.attr("data-src") : "",
            this.img.attr("src", this.src + (this.src.indexOf("?") > 0 ? "&" : "?") + "_r_=" + a.now()),
            this._refreshed = !0,
            this
        },
        show: function() {
            return (this.img.attr("src").indexOf("blank") >= 0 || !this._refreshed && this.bMini && this.isShow()) && this.refresh(),
            this.wrap.removeClass("hidden"),
            this.input.val(""),
            this.elNeedCheckCode && this.elNeedCheckCode.val("true"),
            this.on = !0,
            this
        },
        hide: function() {
            return this.wrap.addClass("hidden"),
            this.input.val(""),
            this.elNeedCheckCode && this.elNeedCheckCode.val(""),
            this.on = !1,
            this
        },
        val: function() {
            return this.input.val()
        },
        isShow: function() {
            return this.on = !this.wrap.hasClass("hidden"),
            this.on
        },
        focus: function() {
            return this.input[0].focus(),
            this
        }
    }),
    d
}, {
    requires: ["node", "event"]
}),
KISSY.add("login/havana/havanalogin", function(a) {
    var b = function(c) {
        return this instanceof b ? (c = c || {},
        this.url = c.url,
        this.token = c.token,
        this.applyStUrl = c.applyStUrl,
        this.miniLoginCheckUrl = c.miniLoginCheckUrl,
        this.vstData = {
            site: c.site
        },
        this.token && (this.vstData.token = c.token),
        this.params = a.isArray(c.params) ? c.params : null,
        this.success = a.isFunction(c.success) ? c.success : null,
        this.error = a.isFunction(c.error) ? c.error : null,
        void this._init()) : new b(c)
    };
    return a.augment(b, {
        _init: function() {
            !this.url || !this.getVSTURL
        },
        login: function(b) {
            b = b || {},
            b.token && (this.token = this.vstData.token = b.token),
            this.success = a.isFunction(b.success) ? b.success : this.success,
            this.error = a.isFunction(b.error) ? b.error : this.error,
            (this.success || this.error) && this._getVST()
        },
        _login: function() {
            var b = this;
            a.io({
                url: this.url,
                dataType: "jsonp",
                cache: !1,
                scriptCharset: "utf-8",
                timeout: 5,
                data: {
                    st: this.st,
                    params: this._params()
                },
                complete: function(c) {
                    return c && c.data && c.data.url ? (window._goldlog_submit_ && window._goldlog_submit_(a.now()),
                    void (b.success && b.success({
                        url: c.data.url,
                        top: !!c.data.script
                    }))) : void (b.error && b.error(c))
                }
            })
        },
        _getVST: function() {
            var b = this;
            this.getVSTURL = this.token ? this.applyStUrl : this.miniLoginCheckUrl;
            var c = "vstCallback" + a.guid()
              , d = a.merge(this.vstData, {
                callback: c
            })
              , e = this.getVSTURL + (this.getVSTURL.indexOf("?") > 0 ? "&" : "?") + a.param(d);
            window[c] = function(a) {
                return b["CALLBACKED_" + c] ? void 0 : (b["CALLBACKED_" + c] = !0,
                a && 200 === a.code && a.data && a.data.st ? (b.st = a.data.st,
                void b._login()) : void (b.error && b.error(a)))
            }
            ,
            a.getScript(e, {
                charset: "utf-8",
                timeout: 1,
                success: function(d) {
                    a.log(d),
                    a.later(function() {
                        !b["CALLBACKED_" + c] && b.error && (a.log("getscript error"),
                        b["CALLBACKED_" + c] = !0,
                        b.error(d))
                    }, 100)
                },
                error: function(a) {
                    b["CALLBACKED_" + c] || (b["CALLBACKED_" + c] = !0,
                    b.error && b.error(a))
                }
            })
        },
        _params: function() {
            if (!this.params || !this.params.length)
                return "";
            var b = {};
            return a.each(this.params, function(c) {
                var d = a.one(c);
                if (d) {
                    var e = d.attr("name");
                    if (e) {
                        var f = "TPL_redirect_url" === e ? window.encodeURIComponent(d.val()) : d.val();
                        b[e] = f
                    }
                }
            }),
            a.param(b)
        }
    }),
    b
}),
KISSY.add("login/havana/havanauser", function(a) {
    var b = function(c) {
        return this instanceof b ? (c = c || {},
        this.url = c.url,
        this.success = a.isFunction(c.success) ? c.success : function() {}
        ,
        this.error = a.isFunction(c.error) ? c.error : function() {}
        ,
        void this._init()) : new b(c)
    };
    return a.augment(b, {
        _init: function() {
            this.url && (this.success || this.error) && this._get()
        },
        _get: function() {
            var b = this;
            a.io({
                url: this.url,
                dataType: "jsonp",
                cache: !1,
                timeout: 1,
                scriptCharset: "utf-8",
                complete: function(c) {
                    return c && 200 === c.code && a.isArray(c.data) && c.data.length ? void b.success(c.data) : void b.error(c)
                }
            })
        }
    }),
    b
}, {
    requires: ["ajax"]
}),
KISSY.add("login/safeedit/index", function(a, b, c, d, e) {
    var f = function() {
        var a = null;
        if (window.ActiveXObject)
            try {
                a = new window.ActiveXObject("Aliedit.EditCtrl")
            } catch (b) {
                return !1
            }
        else
            a = navigator.plugins["Alipay security control"] || navigator.plugins["Aliedit Plug-In"] || navigator.plugins.Aliedit;
        return !!a
    }
      , g = function(b) {
        return this instanceof g ? (this.mode = a.isString(b.mode) ? b.mode.toUpperCase() : "",
        this.container = a.one(b.container),
        this.classid = b.classid || "clsid:488A4255-3236-44B3-8F27-FA1AECAA8844",
        this.codebase = b.codebase || "https://img.alipay.com/download/2121/aliedit.cab",
        this.width = a.isNumber(b.width) ? b.width : 238,
        this.height = a.isNumber(b.height) ? b.height : 26,
        this.uid = a.now(),
        void this._init()) : new g(b)
    };
    return a.augment(g, a.EventTarget, {
        _init: function() {
            ("PASSWORD" !== this.mode || this.container) && (this.container = "PASSWORD" === this.mode || this.container ? this.container : a.one("body"),
            this.support && this.create(),
            "PASSWORD" === this.mode && e({
                edit: this.ctrl
            }))
        },
        ready: function(b) {
            this.timer = a.later(function() {
                this.clock = this.clock ? this.clock += 20 : 0;
                try {
                    this.clock <= 1e3 && this.ctrl && !a.isUndefined(this.ctrl.TextData) ? (b.call(this),
                    this.timer.cancel()) : this.clock > 1e3 && this.timer.cancel()
                } catch (c) {}
            }, 20, !0, this)
        },
        support: f(),
        tabsupport: !a.UA.chrome && !a.UA.safari && !a.UA.opera,
        envsupport: function() {
            var b = a.UA
              , c = b.os;
            if ("macintosh" === c) {
                if (b.firefox || b.safari || b.chrome)
                    return !0
            } else if ("windows" === c && (b.firefox || b.safari || b.chrome || b.ie || b.opera))
                return !0;
            return !1
        }(),
        create: function() {
            if (this.support) {
                var b = this
                  , c = a.UA.ie ? "" : '<embed type="application/aliedit" id="J_SafeeditNotIE{uid}" width="{width}" height="{height}">'
                  , d = '<object id="J_Safeedit{uid}" classid="{classid}" codebase="{codebase}" type="application/aliedit" width="{width}" height="{height}"><param name="cm5ts" value="0613110323" /><param name="cm5pk" value="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDS92pDVyWNT7dzG9zH0opH44z9FayCZTX5iqGUxUjPi667IkyaqrsmDPqKsJp47lJ29lzs+Qv8zjPPdmnxjFteMrfpc4ui24gL1iZnchwX87Ox/+Xrm8HFmKlhmUO9n/QgTT+Nz1RGMEN1+HijvsoAhS0TS8XjSfzRkrwvK2pJQIDAQAB" /><param name="CryptoMode" value="4" /><param name="PasswordMode" value="{mode}">' + c + "</object>";
                d = a.substitute(d, {
                    uid: this.uid,
                    mode: "PASSWORD" === this.mode ? 1 : 0,
                    width: "PASSWORD" === this.mode ? this.width : 0,
                    height: "PASSWORD" === this.mode ? this.height : 0,
                    classid: this.classid,
                    codebase: this.codebase
                }),
                this.container.append(d),
                this.ctrl = a.all("#J_SafeeditNotIE" + this.uid)[0] || a.all("#J_Safeedit" + this.uid)[0],
                this.ctrl && (this.ctrl.onkeydown = function(a) {
                    a || (a = window.event),
                    13 === a.keyCode && b.fire("enter_keydown")
                }
                )
            }
        },
        val: function() {
            return this.ctrl ? this.ctrl.TextData : ""
        },
        ci1: function() {
            try {
                return this.ctrl ? this.ctrl.ci1() : ""
            } catch (a) {
                return ""
            }
        },
        ci2: function() {
            return this.ctrl ? this.ctrl.ci2() : ""
        },
        ver: function() {
            return this.ctrl ? this.ctrl.alieditVersion() : ""
        }
    }),
    g
}, {
    requires: ["node", "dom", "event", "login/safeedit/safeedittab"]
}),
KISSY.add("login/safeedit/pluginpop", function(a, b, c, d, e) {
    var f = e.Popup
      , g = a.one("#J_PluginPopup");
    if (g) {
        var h, i = g.one(".J_Close"), j = a.one("#J_DlEdit"), k = {
            mac: "http://download.alipay.com/sec/edit/wkaliedit.dmg",
            notmac: "http://download.alipay.com/sec/edit/aliedit.exe"
        };
        i.on("click", function() {
            h.hide()
        }),
        j && j.attr("href", "macintosh" === a.UA.os ? k.mac : k.notmac);
        var l = {
            show: function() {
                g && (h || (g.show().appendTo("body"),
                h = new f({
                    srcNode: g,
                    width: 300,
                    mask: !0,
                    zIndex: 1e5,
                    align: {
                        points: ["cc", "cc"]
                    }
                })),
                h.show())
            },
            hide: function() {
                h && h.hide()
            }
        };
        return l
    }
}, {
    requires: ["node", "dom", "ua", "overlay"]
}),
KISSY.add("login/safeedit/safeedittab", function(a) {
    var b = function(c) {
        return this instanceof b ? (c = c || {},
        this.edit = c.edit && a.one(c.edit),
        void this._init()) : new b(c)
    };
    return a.augment(b, {
        _init: function() {
            if (!this.edit || a.UA.ie)
                return this;
            var b = this;
            this.edit[0].addEventListener("keypress", function(a) {
                if (9 === a.keyCode) {
                    var c;
                    c = a.shiftKey ? b.prevSource(b.edit, b.filter) : b.nextSource(b.edit, b.filter),
                    c && c[0].focus()
                }
            }, !1)
        },
        nextSource: function(a, b) {
            var c = a.first();
            c || (c = a.next());
            for (var d = a; !c && (d = d.parent()); )
                c = d.next();
            return c ? this.filter(c) ? c : this.nextSource(c, b) : null
        },
        prevSource: function(b, c) {
            var d = a.one(b[0].lastChild);
            d || (d = b.prev());
            for (var e = b; !d && (e = e.parent()); )
                d = e.prev();
            return d ? this.filter(d) ? d : this.prevSource(d, c) : null
        },
        filter: function(a) {
            return 1 === a[0].nodeType && a[0].offsetHeight && a[0].offsetWidth && a.attr("tabindex") >= 0
        }
    }),
    b
}),
KISSY.add("login/signed/index", function(a, b, c, d, e) {
    return function(f) {
        return a.isObject(f) ? (checkcode = c(a.merge(f, {
            form: f.elSignedForm,
            input: "#J_CodeInput2",
            img: "#J_CodeImage2",
            handler: "#J_CodeHandler2"
        })),
        password = b(a.merge(f, {
            safeon: !1,
            input: "#J_Pwd2",
            inputContainer: "#J_Pwd2Container",
            form: f.elSignedForm,
            chk: "#J_ChkEdit2",
            editContainer: "#J_Edit2Container",
            editTmpContainer: "#J_EditTmp"
        })),
        d(a.merge(f, {
            form: f.elSignedForm,
            password: password,
            checkcode: checkcode
        })),
        e(function() {
            pasword && password.hideEdit && password.hideEdit()
        }),
        {
            refreshEdit: function() {
                password.refreshEdit()
            }
        }) : void 0
    }
}, {
    requires: ["login/password", "login/checkcode/index", "login/signed/login", "login/guidehook"]
}),
KISSY.add("login/signed/login", function(a, b, c, d) {
    var e = function(a) {
        return this instanceof e ? (this.cfg = a = a || {},
        this.havanaEnable = a.havanaEnable,
        this.getTokenURL = a.loginUrl,
        this.form = a.form,
        this.message = a.message,
        this.password = a.password,
        this.checkcode = a.checkcode,
        this.type = "SIGNED",
        void this._init()) : new e(a)
    };
    return a.augment(e, d, {
        _init: function() {
            this.form && (this.validator = b(a.merge(this.cfg, {
                type: "logged",
                message: this.message,
                password: this.password,
                checkcode: this.checkcode
            })),
            this.submitbutton = c({
                el: a.one("#J_SignedSubmit")
            }),
            this._bind())
        }
    }),
    e
}, {
    requires: ["login/validator", "login/submitbutton", "login/xlogin"]
}),
KISSY.add("login/sso/havana", function(a, b, c) {
    var d = function(b) {
        return this instanceof d ? (this.cfg = b = b || {},
        this.success = a.isFunction(b.success) ? b.success : function() {}
        ,
        this.error = a.isFunction(b.error) ? b.error : function() {}
        ,
        void this._init()) : new d(b)
    };
    return a.augment(d, {
        _init: function() {
            if (!this.cfg.url)
                return void this.error();
            var a = this;
            b({
                url: this.cfg.url,
                success: function(b) {
                    a.success(b)
                },
                error: function(b) {
                    a.error(b)
                }
            }),
            this.havanalogin = c({
                url: this.cfg.vstUrl,
                applyStUrl: this.cfg.applyStUrl,
                miniLoginCheckUrl: this.cfg.miniLoginCheckUrl,
                site: this.cfg.site,
                params: this.cfg.vstParams
            })
        },
        login: function(b) {
            a.isObject(b) && (b.success || b.error) && this.havanalogin.login({
                success: b.success,
                error: b.error
            })
        }
    }),
    d
}, {
    requires: ["login/havana/havanauser", "login/havana/havanalogin"]
}),
KISSY.add("login/sso/index", function(a, b) {
    var c = function(b) {
        return this instanceof c ? (this.cfg = b = b || {},
        this.callback = a.isFunction(b.callback) ? b.callback : function() {}
        ,
        void this._init()) : new c(b)
    };
    return a.augment(c, {
        _init: function() {
            var c = this;
            b(a.merge(this.cfg, {
                havanaEnable: this.cfg.enable && !1,
                vstUrl: c.cfg.vstUrl,
                applyStUrl: c.cfg.applyStUrl,
                miniLoginCheckUrl: c.cfg.miniLoginCheckUrl,
                site: c.cfg.site,
                vstParams: c.cfg.vstParams,
                ul: this.cfg.elSSOBox ? this.cfg.elSSOBox.one(".userlist") : null,
                form: this.cfg.elSSOForm,
                callback: this.callback
            }))
        }
    }),
    c
}, {
    requires: ["login/sso/userlist"]
}),
KISSY.add("login/sso/userlist", function(a, b, c, d, e, f, g, h) {
    var i = function(b) {
        return this instanceof i ? (this.cfg = b = b || {},
        this.box = b.elSSOBox,
        this.ul = b.ul,
        this.form = b.form,
        this.bCBU = b.bCBU,
        this.bDaily = b.bDaily,
        this.bHttps = b.bHttps,
        this.havanaEnable = b.havanaEnable,
        this.callback = a.isFunction(b.callback) ? b.callback : function() {}
        ,
        this.elButton = a.one("#J_SubmitQuick"),
        this.clickLogin = this.cfg.elLogin && this.cfg.elLogin.hasClass("quickx"),
        void this._init()) : new i(b)
    };
    return a.augment(i, {
        _init: function() {
            if (!this.ul || !this.form)
                return void this.switchToStatic("error");
            var b = this;
            this.tracknick = f(this.cfg).get(),
            this.wangwang = g(this.cfg),
            this.wwUserList = this.wangwang.userlist,
            this.wwUserList && this.wwUserList.length && (window._submit_t_ && window._lgst_ && (window._submit_t_.ww = a.now()),
            this._fireReady()),
            this.havanaEnable ? this.havana = h({
                url: this.cfg.havanaTopUrl,
                vstUrl: this.cfg.vstUrl,
                applyStUrl: this.cfg.applyStUrl,
                miniLoginCheckUrl: this.cfg.miniLoginCheckUrl,
                site: this.cfg.site,
                vstParams: this.cfg.vstParams,
                success: function(c) {
                    window._submit_t_ && window._lgst_ && (window._submit_t_.havana = a.now()),
                    b.havanaUserList = c,
                    b._fireReady(),
                    b._uniq(),
                    b._ui()
                },
                error: function() {
                    window._submit_t_ && window._lgst_ && (window._submit_t_.havana = a.now()),
                    b._ui()
                }
            }) : this._ui()
        },
        _fireReady: function() {
            this._readyFired || (this.callback({
                stat: "ready"
            }),
            this._readyFired = !0)
        },
        _ui: function() {
            return this.usersize = (this.wwUserList ? this.wwUserList.length : 0) + (this.havanaUserList ? this.havanaUserList.length : 0),
            this.usersize > 1 && this.box && this.box.removeClass("ql-single"),
            this.usersize ? (this._wwdata(),
            this._havanadata(),
            this._wwui(),
            this._havanaui(),
            void this._bind()) : void this.callback({
                stat: "nouser"
            })
        },
        _wwui: function() {
            if (this.wwUserList && this.wwUserList.length) {
                var b = '<li class="item-sso-user {cls}"><input data-index="{index}" data-type="ww" id="ra-{index}" class="r-sso-user r-wwuser" name="user" value="{fullNick}" type="radio" {checked} /> <label' + (this.clickLogin ? ' title="\u70b9\u6b64\u5feb\u901f\u767b\u5f55"' : "") + ' class="l-sso-user" data-index="{index}" data-type="ww" for="ra-{index}">{nick}</label></li>'
                  , c = "";
                a.each(this.wwUserList, function(d, e) {
                    c = a.substitute(b, d) + c
                }),
                this.ul.append(c)
            }
        },
        _wwdata: function() {
            if (this.wwUserList && this.wwUserList.length)
                for (var b, c = this.wwUserList.length; c-- && (b = this.wwUserList[c]); )
                    this.tracknick && this.tracknick === b.nick ? (this._resetdata(),
                    this.userIndex = b.index,
                    this._userIndex = c,
                    b.cls = "active",
                    b.checked = "checked",
                    this.loginType = "WANGWANG") : a.isUndefined(this.userIndex) && !c && (this.userIndex = b.index,
                    this._userIndex = c,
                    b.cls = "active",
                    b.checked = "checked",
                    this.loginType = "WANGWANG")
        },
        _havanaui: function() {
            if (this.havanaUserList && this.havanaUserList.length) {
                var b = '<li class="item-sso-user {cls}"><input data-index="{index}" data-type="ha" id="ha-{index}" class="r-sso-user r-hauser" name="user" value="{nick}" type="radio" {checked} /> <label' + (this.clickLogin ? ' title="\u70b9\u6b64\u5feb\u901f\u767b\u5f55"' : "") + ' class="l-sso-user" data-index="{index}" for="ha-{index}" data-type="ha">{nick}</label></li>'
                  , c = "";
                a.each(this.havanaUserList, function(d, e) {
                    c = a.substitute(b, d) + c
                }),
                this.ul.append(c)
            }
        },
        _havanadata: function() {
            if (this.havanaUserList && this.havanaUserList.length)
                for (var b, c = this.havanaUserList.length; c-- && (b = this.havanaUserList[c]); )
                    b.index = b.index || c,
                    b.email && (b.shortEmail = b.email.replace(/([^@]{7})(?:[^@]{3,})@([^@]+)/, "$1...@$2")),
                    b.nick = (this.bCBU ? b.cbuLoginId : b.taobaoNick) || b.shortEmail || b.mobile,
                    b.nonick = this.bCBU ? (b.cbuLoginId,
                    "") : b.taobaoNick ? "" : "\uff08\u672a\u5f00\u901a\u6dd8\u5b9d\uff09",
                    this.tracknick && this.tracknick === b.nick ? (this._resetdata(),
                    this.userIndex = b.index,
                    this._userIndex = c,
                    b.cls = "active",
                    b.checked = "checked",
                    this.loginType = "HAVANA") : a.isUndefined(this.userIndex) && !c && (this.userIndex = b.index,
                    this._userIndex = c,
                    b.cls = "active",
                    b.checked = "checked",
                    this.loginType = "HAVANA")
        },
        _resetdata: function() {
            a.isUndefined(this._userIndex) || ("HAVANA" === this.loginType && this.havanaUserList[this._userIndex] ? (this.havanaUserList[this._userIndex].checked = "",
            this.havanaUserList[this._userIndex].cls = "") : "WANGWANG" === this.loginType && this.wwUserList[this._userIndex] && (this.wwUserList[this._userIndex].checked = "",
            this.wwUserList[this._userIndex].cls = ""))
        },
        _uniq: function() {
            if (this.wwUserList && this.havanaUserList) {
                var b = []
                  , c = this;
                a.each(this.wwUserList, function(d, e) {
                    var f = !1;
                    a.each(c.havanaUserList, function(a, b) {
                        var c = a.taobaoNick || a.cbuLoginId;
                        d.nick === c && (f = !0)
                    }),
                    f || b.push(d)
                }),
                this.wwUserList = b
            }
        },
        _bind: function() {
            var b = this;
            d.delegate(this.ul, "click", b.clickLogin ? ".l-sso-user" : ".r-sso-user", function(c) {
                var d = a.one(c.currentTarget);
                b.loginType = "ww" === d.attr("data-type") ? "WANGWANG" : "HAVANA",
                "WANGWANG" === b.loginType && (b.userIndex = window.parseInt(d.attr("data-index"))),
                b.ul.all("li.active").removeClass("active"),
                d.parent().addClass("active"),
                b.clickLogin && b._login()
            }),
            this.clickLogin && (d.delegate(this.ul, "mouseover", ".item-sso-user", function(b) {
                var c = a.one(b.currentTarget);
                c.addClass("item-hover")
            }),
            d.delegate(this.ul, "mouseout", ".item-sso-user", function(b) {
                var c = a.one(b.currentTarget);
                c.removeClass("item-hover")
            })),
            this.clickLogin || this._bindLogin()
        },
        _bindLogin: function() {
            var b = this;
            this.form.on("submit", function(c) {
                c.halt(),
                window._submit_t_ && window._lgst_ && (window._submit_t_.t1 = "WANGWANG" === b.loginType ? "ww" : "havana",
                window._submit_t_.t2 = a.now()),
                a.isUndefined(b.userIndex) || b.userIndex < 0 || (!b.button && b.elButton && (b.button = e({
                    el: b.elButton
                })),
                b.button && b.button.ing("\u6b63\u5728\u767b\u5f55..."),
                b._login())
            })
        },
        _login: function() {
            "WANGWANG" === this.loginType ? this._wwLogin() : this._havanaLogin()
        },
        _wwLogin: function() {
            function b(a) {
                var b = d._getValByName(a);
                b && e && (e[a] = b)
            }
            var c, d = this, e = {};
            if (this.bCBU)
                c = a.one("#J_TPL_redirect_url") && a.one("#J_TPL_redirect_url").val() || "http://china.alibaba.com";
            else {
                c = this.bDaily ? "http://www.daily.taobao.net" : "http://www.taobao.com",
                e = a.unparam(window.location.search.slice(1)),
                this.bHttps && (e.c_isScure = !0),
                e.quicklogin = !0;
                var f = window.loginClient;
                f && (e.oslanguage = f.lang,
                e.sr = f.ratio,
                e.osVer = f.os,
                e.naviVer = f.browser),
                b("from"),
                b("not_duplite_str"),
                b("guf"),
                b("wbp"),
                b("allp"),
                c += "?" + a.param(e)
            }
            window._goldlog_submit_ && window._goldlog_submit_(a.now()),
            this.wangwang.login(this.userIndex, c, function(a) {
                a || d.switchToStatic("loginerror")
            })
        },
        _havanaLogin: function() {
            var a = this;
            this.havana.login({
                success: function(a) {
                    a.top ? window.top.location.href = a.url : window.location.href = a.url
                },
                error: function(b) {
                    a.switchToStatic("loginerror")
                }
            })
        },
        _getValByName: function(b) {
            return a.isString(b) && document.getElementsByName(b).length ? document.getElementsByName(b)[0].value : void 0
        },
        switchToStatic: function(a) {
            this.callback({
                stat: a
            }),
            this.button && this.button.reset()
        }
    }),
    i
}, {
    requires: ["dom", "node", "event", "login/submitbutton", "login/tracknick", "login/sso/wangwang/index", "login/sso/havana"]
}),
KISSY.add("login/static/cacheedit", function(a, b) {
    var c = function(a) {
        return this instanceof c ? (this.cfg = a || {},
        this.elEditChk = a.elEditChk,
        void this._init()) : new c(a)
    };
    return a.augment(c, {
        _init: function() {
            !this.elUserName || !this.elEditChk
        },
        _get: function() {
            try {
                return a.Cookie.get("_lg_nse_")
            } catch (b) {
                return this._set(),
                !0
            }
        },
        check: function() {
            return !!this._get()
        },
        _set: function() {
            var b = new Date;
            b.setFullYear(b.getFullYear() + 1),
            a.Cookie.set("_lg_nse_", a.now(), b)
        },
        _unset: function() {
            a.Cookie.set("_lg_nse_", "")
        },
        update: function() {
            this.elUserName && a.trim(this.elUserName.val()) && this.elEditChk && (this.elEditChk.prop("checked") ? this._unset() : a.trim(this.elUserName.val()) && this._set())
        }
    }),
    c
}, {
    requires: ["cookie"]
}),
KISSY.add("login/static/index", function(a, b, c, d, e, f) {
    return function(g) {
        return a.isObject(g) ? (checkcode = d(a.merge(g, {
            form: g.elStaticForm,
            input: "#J_CodeInput1",
            img: "#J_CodeImage1",
            handler: "#J_CodeHandler1"
        })),
        password = c(a.merge(g, {
            safeon: !1,
            input: "#J_Pwd1",
            inputContainer: "#J_Pwd1Container",
            form: g.elStaticForm,
            chk: "#J_ChkEdit1",
            editContainer: "#J_Edit1Container",
            editTmpContainer: "#J_EditTmp",
            prevInput: "#J_Un1"
        })),
        username = b(a.merge(g, {
            checkcode: checkcode
        })),
        e(a.merge(g, {
            form: g.elStaticForm,
            password: password,
            checkcode: checkcode
        })),
        f(function() {
            pasword && password.hideEdit && password.hideEdit()
        }),
        {
            refreshEdit: function() {
                password.refreshEdit()
            }
        }) : void 0
    }
}, {
    requires: ["login/static/username/index", "login/password", "login/checkcode/index", "login/static/login", "login/guidehook"]
}),
KISSY.add("login/static/login", function(a, b, c, d) {
    var e = function(a) {
        return this instanceof e ? (this.cfg = a = a || {},
        this.havanaEnable = a.havanaEnable,
        this.getTokenURL = a.loginUrl,
        this.form = a.form,
        this.message = a.message,
        this.password = a.password,
        this.checkcode = a.checkcode,
        this.type = "STATIC",
        void this._init()) : new e(a)
    };
    return a.augment(e, d, {
        _init: function() {
            this.form && (this.validator = b(a.merge(this.cfg, {
                type: "static",
                message: this.message,
                password: this.password,
                checkcode: this.checkcode,
                elUserName: a.one("#J_Un1")
            })),
            this.submitbutton = c({
                el: a.one("#J_StaticSubmit")
            }),
            this._bind())
        }
    }),
    e
}, {
    requires: ["login/validator", "login/submitbutton", "login/xlogin"]
}),
KISSY.add("login/sso/wangwang/cbuwangwang", function(a) {
    var b = function() {
        if (!window.ActiveXObject)
            return !1;
        var a;
        try {
            if ((a = window.external) && "undefined" != typeof a.msActiveXFilteringEnabled && a.msActiveXFilteringEnabled())
                return !1
        } catch (b) {}
        return !0
    }()
      , c = function() {
        var a;
        if (b)
            try {
                a = new ActiveXObject("AliIMSSOLoginM.SSOLoginCtrl.1")
            } catch (c) {}
        return !!a
    }
      , d = function() {
        return this instanceof d ? (this.support = c(),
        this.ctrl = null,
        this.userNum = 0,
        this.uid = a.now(),
        void this._init()) : new d
    };
    return a.augment(d, {
        _init: function() {
            if (this.support) {
                this._create();
                try {
                    this.ctrl && this.ctrl.CreateSSOData && this.ctrl.InitSSOLoginCtrl && this.ctrl.InitSSOLoginCtrl(this.ctrl.CreateSSOData(), 0)
                } catch (a) {}
                return this._getUserList(),
                this
            }
        },
        _create: function() {
            b ? this.ctrl = new ActiveXObject("AliIMSSOLoginM.SSOLoginCtrl.1") : (this.ctrl = a.DOM.create("<object>", {
                id: "J_CBUWangWangPlugin" + this.uid,
                type: "application/npAliSSOLogin",
                width: 0,
                height: 0
            }),
            this.ctrlWrap = a.one(a.DOM.create("<div>", {
                style: "width:0;height:0;overflow:hidden;"
            })),
            this.ctrlWrap.append(this.ctrl),
            a.one("body").append(this.ctrlWrap));
            try {
                this.WWVersion = this.ctrl.GetWWClientVersion(),
                this.ctrlVersion = this.ctrl.GetSSOLoginCtrlVersion()
            } catch (c) {}
        },
        _getUserList: function() {
            this.oUserList = null,
            this.userlist = [];
            var a, b = this.userNum = 0;
            try {
                if (this.oUserList = this.ctrl.GetUserList(2, 0),
                null === this.oUserList)
                    return;
                for (this.userNum = this.oUserList.GetSize(); b < this.userNum && (a = this.oUserList.GetItemData(b)); )
                    this.userlist.push({
                        index: b,
                        nick: a.GetDataStr("strKey_ShortUserID"),
                        fullNick: a.GetDataStr("strKey_FullUserID"),
                        site: a.GetDataStr("strKey_SiteID"),
                        siteDesc: a.GetDataStr("strKey_SiteID_Description")
                    }),
                    b++
            } catch (c) {}
            return this.userlist
        },
        login: function(b, c, d) {
            if (!a.isNumber(b) || !c || 0 > b || b > this.userNum)
                return void (a.isFunction(d) && d(!1));
            var e, f, g, d = a.isFunction(d) ? d : function() {}
            , h = {};
            h.url = c;
            try {
                if (g = this.oUserList.GetItemData(b),
                e = this.ctrl.BeginSSOLogin(0, g),
                f = e ? e.GetDataStr("strKey_GOResult") : null,
                "1" === f) {
                    var c = e.GetDataStr("strKey_ResultURL");
                    c || d(!1);
                    var i = a.now();
                    window["jsonpCallback" + i] = function(a) {
                        a && a.success && a.url ? (d(!0),
                        window.location.assign(a.url)) : d(!1)
                    }
                    ,
                    h.callback = "jsonpCallback" + i,
                    c += c.indexOf("?") > 0 ? "&" + a.param(h) : "?" + a.param(h),
                    a.getScript(c, {
                        success: function() {},
                        error: function() {
                            d(!1)
                        }
                    })
                } else
                    d(!1)
            } catch (j) {
                a.log(j.message),
                e = !1,
                d(e)
            }
            return !!e
        }
    }),
    d
}),
KISSY.add("login/sso/wangwang/index", function(a, b, c) {
    var d = function(a) {
        return this instanceof d ? (a = a || {},
        this.bCBU = a.bCBU,
        this.type = this.bCBU ? 2 : 1,
        void this._init()) : new d(a)
    };
    return a.augment(d, {
        _init: function() {
            this.ww = b({
                type: this.type
            }),
            this.ww.support && this.ww.userlist || !this.bCBU || (this.ww = c()),
            this._getUserList()
        },
        _getUserList: function() {
            this.ww.support && (this.userlist = this.ww.userlist)
        },
        login: function(a, b, c) {
            this.ww.support && this.ww.userlist && this.ww.login(a, b, c)
        }
    }),
    d
}, {
    requires: ["login/sso/wangwang/wangwang", "login/sso/wangwang/cbuwangwang"]
}),
KISSY.add("login/sso/wangwang/wangwang", function(a) {
    var b = (function() {
        if (!window.ActiveXObject)
            return !1;
        var a;
        try {
            if ((a = window.external) && "undefined" != typeof a.msActiveXFilteringEnabled && a.msActiveXFilteringEnabled())
                return !1
        } catch (b) {}
        return !0
    }(),
    function() {
        var a;
        try {
            a = new window.ActiveXObject("AliIMSSOLogin.SSOLoginCtrl.1")
        } catch (b) {
            a = window.navigator.plugins["AliSSOLogin plugin"]
        }
        return !!a
    }
    )
      , c = function(d) {
        return this instanceof c ? (d = d || {},
        this.type = a.isNumber(d.type) && d.type >= 0 && d.type <= 2 ? d.type : 0,
        this.sub = d.sub ? 1 : 0,
        this.support = b(),
        this.ctrlType = "AliIMSSOLogin",
        this.ctrl = null,
        this.userNum = 0,
        this.uid = a.now(),
        void this._init()) : new c(d)
    };
    return a.augment(c, {
        _init: function() {
            if (this.support) {
                this._create();
                try {
                    this.ctrl && this.ctrl.CreateSSOData && this.ctrl.InitSSOLoginCtrl && this.ctrl.InitSSOLoginCtrl(this.ctrl.CreateSSOData(), 0)
                } catch (a) {}
                return this._getUserList(),
                this
            }
        },
        _create: function() {
            try {
                this.ctrl = new ActiveXObject("AliIMSSOLogin.SSOLoginCtrl.1")
            } catch (b) {
                this.ctrl = a.DOM.create("<object>", {
                    id: "J_WangWangPlugin" + this.uid,
                    type: "application/npAliSSOLogin",
                    width: 0,
                    height: 0
                }),
                this.ctrlWrap = a.one(a.DOM.create("<div>", {
                    style: "width:0;height:0;overflow:hidden;"
                })),
                this.ctrlWrap.append(this.ctrl),
                a.one("body").append(this.ctrlWrap)
            }
            try {
                this.WWVersion = this.ctrl.GetWWClientVersion(),
                this.ctrlVersion = this.ctrl.GetSSOLoginCtrlVersion()
            } catch (b) {}
        },
        _getUserList: function() {
            this.oUserList = null,
            this.userlist = [];
            var a, b = this.userNum = 0;
            try {
                if (this.oUserList = this.ctrl.GetUserList(this.type, this.sub),
                null === this.oUserList)
                    return;
                for (this.userNum = this.oUserList.GetSize(); b < this.userNum && (a = this.oUserList.GetItemData(b)); )
                    this.userlist.push({
                        index: b,
                        nick: a.GetDataStr("strKey_ShortUserID"),
                        fullNick: a.GetDataStr("strKey_FullUserID"),
                        site: a.GetDataStr("strKey_SiteID"),
                        siteDesc: a.GetDataStr("strKey_SiteID_Description")
                    }),
                    b++
            } catch (c) {}
            return this.userlist
        },
        login: function(b, c, d) {
            if (!a.isNumber(b) || !c || 0 > b || b > this.userNum - 1)
                return void (a.isFunction(d) && d(!1));
            var e, f;
            try {
                f = this.oUserList.GetItemData(b),
                f.SetDataStr("strKey_SrcURL", c),
                e = this.ctrl.Go(0, f),
                this.retData = e ? e.GetDataStr("strKey_GOResult") : null
            } catch (g) {
                a.log(g.message),
                e = !1
            }
            return a.isFunction(d) && d(!!e),
            !!e
        }
    }),
    c
}, {
    requires: ["dom", "node"]
}),
KISSY.add("login/static/username/index", function(a, b, c, d, e) {
    var f = function(b) {
        return this instanceof f ? (b = b || {},
        this.input = a.one("#J_Un1"),
        this.checkURL = b.checkURL,
        this.usePhoneTips = !!b.usePhoneTips,
        this.bCBU = b.bCBU,
        this.url = b.checkUserNameURL,
        this.checkcode = b.checkcode,
        this.CACHE = {},
        this.img = a.one("#J_CodeImage1"),
        void this._init()) : new f(b)
    };
    return a.augment(f, {
        _init: function() {
            if (this.input) {
                var b = c({
                    bCBU: this.bCBU
                }).get();
                b && !this.input.val() && this.input.val(b),
                d({
                    input: this.input
                }),
                this.usePhoneTips && (this.phonetips = e({
                    wrap: this.input.parent()
                }).on("click", function(a) {
                    this.phonetips.hide()
                }, this));
                var f = this;
                a.later(function() {
                    f._check()
                }, 300, !1),
                this.input.on("blur", function() {
                    f._check(),
                    f.usePhoneTips && !f.phonetips.onover && f.phonetips.hide()
                }).on("keyup focus", function() {
                    f.usePhoneTips && (/^\d+$/.test(f.input.val()) || f.input.val().length >= 2 ? f.phonetips.hide() : f.phonetips.show())
                })
            }
        },
        _checkCode: function(a) {
            this.checkcode && (a ? this.checkcode.isShow() ? this.checkcode.refresh() : this.checkcode.show() : this.checkcode.hide())
        },
        _check: function() {
            var b = window.encodeURIComponent(a.trim(this.input.val()));
            if (b) {
                if (this.CACHE.hasOwnProperty(b) && !a.isUndefined(this.CACHE[b].needcode))
                    return void this._checkCode(this.CACHE[b].needcode);
                if (!this._checking) {
                    this._checking = !0;
                    var c = this;
                    a.io({
                        type: "get",
                        url: this.url + "&username=" + b,
                        cache: !1,
                        dataType: "json",
                        success: function(a) {
                            c.CACHE[b] = a,
                            a.url && c.img.attr("data-src", a.url),
                            c._checkCode(a.needcode),
                            c._checking = !1
                        },
                        error: function() {
                            c._checking = !1
                        }
                    })
                }
            }
        }
    }),
    f
}, {
    requires: ["ajax", "login/tracknick", "login/inputclear", "login/static/username/phonetips"]
}),
KISSY.add("login/static/username/phonetips", function(a) {
    var b = function(c) {
        return this instanceof b ? (c = c || {},
        this.wrap = c.wrap ? a.one(c.wrap) : null,
        this.el = null,
        this.onover = !1,
        void this._init()) : new b(c)
    };
    return a.augment(b, a.EventTarget, {
        _init: function() {
            !this.wrap
        },
        _create: function() {
            this.wrap.append('<div class="phone-tips" id="J_PhoneTips"><i></i>\u624b\u673a\u53f7\u7801\u4e5f\u53ef\u4f5c\u4e3a\u8d26\u6237\u540d\u54e6<a href="http://service.taobao.com/support/knowledge-1119899.htm?dkey=catview" target="_blank">?</a></div>'),
            this.el = a.one("#J_PhoneTips"),
            this.el.on("mouseover", function() {
                this.onover = !0
            }, this).on("mouseout", function() {
                this.onover = !1
            }, this).on("click", function() {
                this.fire("click")
            }, this)
        },
        show: function() {
            this.el || this._create(),
            this.el.show().addClass("show")
        },
        hide: function() {
            this.el && this.el.hide().removeClass("show")
        }
    }),
    b
}, {
    requires: ["event"]
});
