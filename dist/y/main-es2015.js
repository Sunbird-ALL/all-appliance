(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/hindi-version/hindi-version.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/hindi-version/hindi-version.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<header>\n    <nav class=\"level-nav\">\n    </nav>\n</header>\n<section class=\"mt-3\">\n    <div class=\"container-fluid\">\n        <div class=\"accordion\" id=\"accordionPanelsStayOpenExample\">\n            <div class=\"accordion-item\">\n                <h2 class=\"accordion-header w-25 ms-auto\">\n                    <button class=\"accordion-button cl fw-700\" type=\"button\" data-bs-toggle=\"collapse\"\n                        data-bs-target=\"#panelsStayOpen-collapseOne\" aria-expanded=\"true\"\n                        aria-controls=\"panelsStayOpen-collapseOne\">Speak with Me\n                    </button>\n                </h2>\n                <div id=\"panelsStayOpen-collapseOne\" class=\"accordion-collapse collapse show\">\n                    <div class=\"accordion-body bg-color mt--68\">\n                        <div class=\"d-flex align-items-start row-dic\">\n                            <div class=\"nav flex-column nav-pills mt-68 w-23 bg-border\" id=\"v-pills-tab\" role=\"tablist\"\n                                aria-orientation=\"vertical\">\n                                <button (click)=\"showExploreandLearn()\"\n                                    class=\"nav-link active text-left fs-14 text-black\" id=\"v-pills-home-tab\"\n                                    data-bs-toggle=\"pill\" data-bs-target=\"#v-pills-home\" type=\"button\" role=\"tab\"\n                                    aria-controls=\"v-pills-home\" aria-selected=\"true\">Explore & Learn</button>\n                                <button (click)=\"showLearnandplay()\" class=\"nav-link text-left fs-14 text-black\"\n                                    id=\"v-pills-profile-tab\" data-bs-toggle=\"pill\" data-bs-target=\"#v-pills-profile\"\n                                    type=\"button\" role=\"tab\" aria-controls=\"v-pills-profile\" aria-selected=\"false\">Play\n                                    & Learn</button>\n                                <button (click)=\"showPlaygame()\" class=\"nav-link text-left fs-14 text-black\"\n                                    id=\"v-pills-messages-tab\" data-bs-toggle=\"pill\" data-bs-target=\"#v-pills-messages\"\n                                    type=\"button\" role=\"tab\" aria-controls=\"v-pills-messages\"\n                                    aria-selected=\"false\">Learn with a Friend</button>\n                                <button (click)=\"showVideoHelp()\" class=\"nav-link text-left fs-14 text-black\"\n                                    id=\"v-pills-video-tab\" data-bs-toggle=\"pill\" data-bs-target=\"#v-pills-video\"\n                                    type=\"button\" role=\"tab\" aria-controls=\"v-pills-video\" aria-selected=\"false\">Video\n                                    help</button>\n                            </div>\n                            <div class=\"tab-content bg-white w-74\" id=\"v-pills-tabContent\">\n                                <div *ngIf=\"exploreandlearn\" class=\"tab-pane p-4 fade show active\" id=\"v-pills-home\"\n                                    role=\"tabpanel\" aria-labelledby=\"v-pills-home-tab\" tabindex=\"0\">\n                                    <iframe\n                                        src=\"/assets/hindi-all/index.html#/proto3/all?source=/assets/hindi-all/db/proto3.json\"\n                                        frameborder=\"0\" height=\"600px\" width=\"100%\"></iframe>\n                                </div>\n                                <div *ngIf=\"learnandplay\" class=\"tab-pane fade p-4 show active\" id=\"v-pills-profile\"\n                                    role=\"tabpanel\" aria-labelledby=\"v-pills-profile-tab\" tabindex=\"0\">\n                                    <iframe\n                                        src=\"/assets/hindi-all/index.html#/proto4/all?source=/assets/hindi-all/db/proto4.json\"\n                                        frameborder=\"0\" height=\"600px\" width=\"100%\"></iframe>\n                                </div>\n                                <div *ngIf=\"playgame\" class=\"tab-pane fade p-4 show active\" id=\"v-pills-messages\"\n                                    role=\"tabpanel\" aria-labelledby=\"v-pills-messages-tab\" tabindex=\"0\">\n                                    <iframe src=\"/assets/games/index.html\" frameborder=\"0\" height=\"600px\"\n                                        width=\"100%\"></iframe>\n                                </div>\n                                <div *ngIf=\"videohelp\" class=\"tab-pane fade p-4 show active\" id=\"v-pills-video\"\n                                    role=\"tabpanel\" aria-labelledby=\"v-pills-video-tab\" tabindex=\"0\">\n                                    <iframe src=\"/assets/explore_and_learn.mp4\" frameborder=\"0\" height=\"600px\"\n                                        width=\"100%\"></iframe>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n\n<!-- <div class=\"tab-pane active flex-center w-75 mb-5 mt-3\" id=\"tab1\">\n  <a class=\"btnNext cursor px-5 py-3 rounded bg-primary border-0 text-white fs-4\">Next</a>\n</div> -->\n\n<footer>\n    <div class=\"footer-level-img footer\" style=\"position:relative!important\"></div>\n    <!-- hitwebcounter Code START -->\n    <span>Visitors Counter: </span>\n    <!-- Start of CuterCounter Code -->\n    <a href=\"https://www.cutercounter.com/\" target=\"_blank\"><img\n            src=\"https://www.cutercounter.com/hits.php?id=hemxnakfa&nd=6&style=3\" border=\"0\" alt=\"hit counter\"></a>\n    <!-- End of CuterCounter Code -->\n    <div>Device Id: {{this.getFingerPrintJsId()}}</div>\n</footer>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/tamil-version/tamil-version.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/tamil-version/tamil-version.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<header>\n    <nav class=\"level-nav\">\n    </nav>\n</header>\n<section class=\"mt-3\">\n    <div class=\"container-fluid\">\n        <div class=\"accordion\" id=\"accordionPanelsStayOpenExample\">\n            <div class=\"accordion-item\">\n                <h2 class=\"accordion-header w-25 ms-auto\">\n                    <button class=\"accordion-button cl fw-700\" type=\"button\" data-bs-toggle=\"collapse\"\n                        data-bs-target=\"#panelsStayOpen-collapseOne\" aria-expanded=\"true\"\n                        aria-controls=\"panelsStayOpen-collapseOne\">Speak with Me\n                    </button>\n                </h2>\n                <div id=\"panelsStayOpen-collapseOne\" class=\"accordion-collapse collapse show\">\n                    <div class=\"accordion-body bg-color mt--68\">\n                        <div class=\"d-flex align-items-start row-dic\">\n                            <div class=\"nav flex-column nav-pills mt-68 w-23 bg-border\" id=\"v-pills-tab\" role=\"tablist\"\n                                aria-orientation=\"vertical\">\n                                <button (click)=\"showExploreandLearn()\"\n                                    class=\"nav-link active text-left fs-14 text-black\" id=\"v-pills-home-tab\"\n                                    data-bs-toggle=\"pill\" data-bs-target=\"#v-pills-home\" type=\"button\" role=\"tab\"\n                                    aria-controls=\"v-pills-home\" aria-selected=\"true\">Explore & Learn</button>\n                                <button (click)=\"showLearnandplay()\" class=\"nav-link text-left fs-14 text-black\"\n                                    id=\"v-pills-profile-tab\" data-bs-toggle=\"pill\" data-bs-target=\"#v-pills-profile\"\n                                    type=\"button\" role=\"tab\" aria-controls=\"v-pills-profile\" aria-selected=\"false\">Play\n                                    & Learn</button>\n                                <button (click)=\"showPlaygame()\" class=\"nav-link text-left fs-14 text-black\"\n                                    id=\"v-pills-messages-tab\" data-bs-toggle=\"pill\" data-bs-target=\"#v-pills-messages\"\n                                    type=\"button\" role=\"tab\" aria-controls=\"v-pills-messages\"\n                                    aria-selected=\"false\">Learn with a Friend</button>\n                                <button (click)=\"showVideoHelp()\" class=\"nav-link text-left fs-14 text-black\"\n                                    id=\"v-pills-video-tab\" data-bs-toggle=\"pill\" data-bs-target=\"#v-pills-video\"\n                                    type=\"button\" role=\"tab\" aria-controls=\"v-pills-video\" aria-selected=\"false\">Video\n                                    help</button>\n                            </div>\n                            <div class=\"tab-content bg-white w-74\" id=\"v-pills-tabContent\">\n                                <div *ngIf=\"exploreandlearn\" class=\"tab-pane p-4 fade show active\" id=\"v-pills-home\"\n                                    role=\"tabpanel\" aria-labelledby=\"v-pills-home-tab\" tabindex=\"0\">\n                                    <iframe\n                                        src=\"/assets/sb-all/index.html#/proto3/all?source=/assets/sb-all/db/proto3.json\"\n                                        frameborder=\"0\" height=\"600px\" width=\"100%\"></iframe>\n                                </div>\n                                <div *ngIf=\"learnandplay\" class=\"tab-pane fade p-4 show active\" id=\"v-pills-profile\"\n                                    role=\"tabpanel\" aria-labelledby=\"v-pills-profile-tab\" tabindex=\"0\">\n                                    <iframe\n                                        src=\"/assets/sb-all/index.html#/proto4/all?source=/assets/sb-all/db/proto4.json\"\n                                        frameborder=\"0\" height=\"600px\" width=\"100%\"></iframe>\n                                </div>\n                                <div *ngIf=\"playgame\" class=\"tab-pane fade p-4 show active\" id=\"v-pills-messages\"\n                                    role=\"tabpanel\" aria-labelledby=\"v-pills-messages-tab\" tabindex=\"0\">\n                                    <iframe src=\"/assets/games/index.html\" frameborder=\"0\" height=\"600px\"\n                                        width=\"100%\"></iframe>\n                                </div>\n                                <div *ngIf=\"videohelp\" class=\"tab-pane fade p-4 show active\" id=\"v-pills-video\"\n                                    role=\"tabpanel\" aria-labelledby=\"v-pills-video-tab\" tabindex=\"0\">\n                                    <iframe src=\"/assets/explore_and_learn.mp4\" frameborder=\"0\" height=\"600px\"\n                                        width=\"100%\"></iframe>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n\n<!-- <div class=\"tab-pane active flex-center w-75 mb-5 mt-3\" id=\"tab1\">\n  <a class=\"btnNext cursor px-5 py-3 rounded bg-primary border-0 text-white fs-4\">Next</a>\n</div> -->\n\n<footer>\n    <div class=\"footer-level-img footer\" style=\"position:relative!important\"></div>\n    <!-- hitwebcounter Code START -->\n    <span>Visitors Counter: </span>\n    <!-- Start of CuterCounter Code -->\n    <a href=\"https://www.cutercounter.com/\" target=\"_blank\"><img\n            src=\"https://www.cutercounter.com/hits.php?id=hemxnakfa&nd=6&style=3\" border=\"0\" alt=\"hit counter\"></a>\n    <!-- End of CuterCounter Code -->\n    <div>Device Id: {{this.getFingerPrintJsId()}}</div>\n</footer>");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _hindi_version_hindi_version_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hindi-version/hindi-version.component */ "./src/app/hindi-version/hindi-version.component.ts");
/* harmony import */ var _tamil_version_tamil_version_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tamil-version/tamil-version.component */ "./src/app/tamil-version/tamil-version.component.ts");





const routes = [
    { path: '', component: _tamil_version_tamil_version_component__WEBPACK_IMPORTED_MODULE_4__["TamilVersionComponent"] },
    { path: 'hi', component: _hindi_version_hindi_version_component__WEBPACK_IMPORTED_MODULE_3__["HindiVersionComponent"] },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@import url('https://fonts.googleapis.com/css2?family=EB+Garamond&family=Inter&family=Roboto:wght@300;400&display=swap');\r\nbody , html{\r\n    margin: 0;\r\n    padding: 0;\r\n    box-sizing: border-box;\r\n    background: #F5F5F5;\r\n    color: #000000;\r\n    font-family: 'Inter', sans-serif;\r\n    font-weight: 400;\r\n}\r\n.fs-14{\r\n    font-size: 14px;\r\n}\r\n.flex-center{\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.fw-700{\r\n    font-weight: 700;\r\n}\r\n.cursor{\r\n    cursor: pointer;\r\n}\r\n.text-left{\r\n    text-align: start !important;\r\n}\r\na{\r\n    text-decoration: none !important;\r\n}\r\n.row-dic{\r\n    flex-direction: row-reverse !important;\r\n    justify-content: space-between;\r\n    \r\n}\r\n.cl{\r\n    background: #F2EEF4 !important;\r\n    color: #333333 !important;\r\n}\r\n.bg-color{\r\n    background: #F5F5F5;\r\n}\r\n.w-23{\r\n    width: 23%;\r\n}\r\n.mt--68{\r\n    margin-top: -68px !important;\r\n}\r\n.mt-68{\r\n    margin-top: 68px !important;\r\n}\r\n.w-74{\r\n    width: 74%;\r\n}\r\nh5, .h5 {\r\n    font-size: 1rem !important;\r\n}\r\n.nav-pills .nav-link.active{\r\n    background: #cbb1df !important;\r\n    color: #662D91 !important;\r\n    font-weight: 700 !important;\r\n    border-radius: unset !important;\r\n}\r\n.bg-border{\r\n    border: 1px solid #C8BAD2;\r\n    border-radius: 8px;\r\n    background-color: white;\r\n}\r\n.accordion-item{\r\n    border: none !important;\r\n}\r\n.accordion-button:not(.collapsed)::after{\r\n    content: \"\\F286\";\r\n    font-family: bootstrap-icons !important;\r\n    border-radius: 50% !important;\r\n    background: #662D91;\r\n    font-size: 18px;\r\n    border-radius: 50%;\r\n    height: 25px;\r\n    width: 25px;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 0;\r\n    color: #fff !important;\r\n}\r\n.accordion-button::after{\r\n    content: \"\\F286\";\r\n    font-family: bootstrap-icons !important;\r\n    border-radius: 50% !important;\r\n    background: #662D91;\r\n    font-size: 18px;\r\n    border-radius: 50%;\r\n    height: 25px;\r\n    width: 25px;\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n    padding: 0;\r\n    color: #fff !important;\r\n}\r\n.level-nav{\r\n    padding: 19px 0;\r\n    left: 0px;\r\n    top: 0px;\r\n    background: #662D91;\r\n    margin-bottom: 8px;\r\n}\r\n.accordion-item{\r\n    background: #F5F5F5;\r\n}\r\n.footer-level-img{\r\n    margin-top: 50px;\r\n    background-image: url('level-footer.png');\r\n    height: 474px;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n    background-position: left;\r\n  }\r\n.footer{\r\n    display: flex;\r\n    justify-content: right;\r\n}\r\n/* .content{\r\n    position: absolute !important;\r\n    margin: 2%;\r\n    bottom: 2%;\r\n    color: #fff;\r\n} */\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0hBQXdIO0FBQ3hIO0lBQ0ksU0FBUztJQUNULFVBQVU7SUFDVixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLGNBQWM7SUFDZCxnQ0FBZ0M7SUFDaEMsZ0JBQWdCO0FBQ3BCO0FBQ0E7SUFDSSxlQUFlO0FBQ25CO0FBQ0E7SUFDSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksZ0JBQWdCO0FBQ3BCO0FBQ0E7SUFDSSxlQUFlO0FBQ25CO0FBQ0E7SUFDSSw0QkFBNEI7QUFDaEM7QUFDQTtJQUNJLGdDQUFnQztBQUNwQztBQUNBO0lBQ0ksc0NBQXNDO0lBQ3RDLDhCQUE4Qjs7QUFFbEM7QUFDQTtJQUNJLDhCQUE4QjtJQUM5Qix5QkFBeUI7QUFDN0I7QUFDQTtJQUNJLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksVUFBVTtBQUNkO0FBQ0E7SUFDSSw0QkFBNEI7QUFDaEM7QUFDQTtJQUNJLDJCQUEyQjtBQUMvQjtBQUNBO0lBQ0ksVUFBVTtBQUNkO0FBQ0E7SUFDSSwwQkFBMEI7QUFDOUI7QUFDQTtJQUNJLDhCQUE4QjtJQUM5Qix5QkFBeUI7SUFDekIsMkJBQTJCO0lBQzNCLCtCQUErQjtBQUNuQztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGtCQUFrQjtJQUNsQix1QkFBdUI7QUFDM0I7QUFDQTtJQUNJLHVCQUF1QjtBQUMzQjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLHVDQUF1QztJQUN2Qyw2QkFBNkI7SUFDN0IsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFdBQVc7SUFDWCxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixVQUFVO0lBQ1Ysc0JBQXNCO0FBQzFCO0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsdUNBQXVDO0lBQ3ZDLDZCQUE2QjtJQUM3QixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osV0FBVztJQUNYLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixzQkFBc0I7QUFDMUI7QUFDQTtJQUNJLGVBQWU7SUFDZixTQUFTO0lBQ1QsUUFBUTtJQUNSLG1CQUFtQjtJQUNuQixrQkFBa0I7QUFDdEI7QUFDQTtJQUNJLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLHlDQUF1RDtJQUN2RCxhQUFhO0lBQ2IsNEJBQTRCO0lBQzVCLHNCQUFzQjtJQUN0Qix5QkFBeUI7RUFDM0I7QUFDQTtJQUNFLGFBQWE7SUFDYixzQkFBc0I7QUFDMUI7QUFDQTs7Ozs7R0FLRyIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9RUIrR2FyYW1vbmQmZmFtaWx5PUludGVyJmZhbWlseT1Sb2JvdG86d2dodEAzMDA7NDAwJmRpc3BsYXk9c3dhcCcpO1xyXG5ib2R5ICwgaHRtbHtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgYmFja2dyb3VuZDogI0Y1RjVGNTtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG4gICAgZm9udC1mYW1pbHk6ICdJbnRlcicsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG59XHJcbi5mcy0xNHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxufVxyXG4uZmxleC1jZW50ZXJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcbi5mdy03MDB7XHJcbiAgICBmb250LXdlaWdodDogNzAwO1xyXG59XHJcbi5jdXJzb3J7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuLnRleHQtbGVmdHtcclxuICAgIHRleHQtYWxpZ246IHN0YXJ0ICFpbXBvcnRhbnQ7XHJcbn1cclxuYXtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50O1xyXG59XHJcbi5yb3ctZGlje1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlICFpbXBvcnRhbnQ7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBcclxufVxyXG4uY2x7XHJcbiAgICBiYWNrZ3JvdW5kOiAjRjJFRUY0ICFpbXBvcnRhbnQ7XHJcbiAgICBjb2xvcjogIzMzMzMzMyAhaW1wb3J0YW50O1xyXG59XHJcbi5iZy1jb2xvcntcclxuICAgIGJhY2tncm91bmQ6ICNGNUY1RjU7XHJcbn1cclxuLnctMjN7XHJcbiAgICB3aWR0aDogMjMlO1xyXG59XHJcbi5tdC0tNjh7XHJcbiAgICBtYXJnaW4tdG9wOiAtNjhweCAhaW1wb3J0YW50O1xyXG59XHJcbi5tdC02OHtcclxuICAgIG1hcmdpbi10b3A6IDY4cHggIWltcG9ydGFudDtcclxufVxyXG4udy03NHtcclxuICAgIHdpZHRoOiA3NCU7XHJcbn1cclxuaDUsIC5oNSB7XHJcbiAgICBmb250LXNpemU6IDFyZW0gIWltcG9ydGFudDtcclxufVxyXG4ubmF2LXBpbGxzIC5uYXYtbGluay5hY3RpdmV7XHJcbiAgICBiYWNrZ3JvdW5kOiAjY2JiMWRmICFpbXBvcnRhbnQ7XHJcbiAgICBjb2xvcjogIzY2MkQ5MSAhaW1wb3J0YW50O1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMCAhaW1wb3J0YW50O1xyXG4gICAgYm9yZGVyLXJhZGl1czogdW5zZXQgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmJnLWJvcmRlcntcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNDOEJBRDI7XHJcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxufVxyXG4uYWNjb3JkaW9uLWl0ZW17XHJcbiAgICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDtcclxufVxyXG4uYWNjb3JkaW9uLWJ1dHRvbjpub3QoLmNvbGxhcHNlZCk6OmFmdGVye1xyXG4gICAgY29udGVudDogXCJcXEYyODZcIjtcclxuICAgIGZvbnQtZmFtaWx5OiBib290c3RyYXAtaWNvbnMgIWltcG9ydGFudDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJSAhaW1wb3J0YW50O1xyXG4gICAgYmFja2dyb3VuZDogIzY2MkQ5MTtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIGhlaWdodDogMjVweDtcclxuICAgIHdpZHRoOiAyNXB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xyXG59XHJcbi5hY2NvcmRpb24tYnV0dG9uOjphZnRlcntcclxuICAgIGNvbnRlbnQ6IFwiXFxGMjg2XCI7XHJcbiAgICBmb250LWZhbWlseTogYm9vdHN0cmFwLWljb25zICFpbXBvcnRhbnQ7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCUgIWltcG9ydGFudDtcclxuICAgIGJhY2tncm91bmQ6ICM2NjJEOTE7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgICBoZWlnaHQ6IDI1cHg7XHJcbiAgICB3aWR0aDogMjVweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgY29sb3I6ICNmZmYgIWltcG9ydGFudDtcclxufVxyXG4ubGV2ZWwtbmF2e1xyXG4gICAgcGFkZGluZzogMTlweCAwO1xyXG4gICAgbGVmdDogMHB4O1xyXG4gICAgdG9wOiAwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjNjYyRDkxO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcbi5hY2NvcmRpb24taXRlbXtcclxuICAgIGJhY2tncm91bmQ6ICNGNUY1RjU7XHJcbn1cclxuLmZvb3Rlci1sZXZlbC1pbWd7XHJcbiAgICBtYXJnaW4tdG9wOiA1MHB4O1xyXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vLi4vYXNzZXRzL2ltZy9sZXZlbC1mb290ZXIucG5nKTtcclxuICAgIGhlaWdodDogNDc0cHg7XHJcbiAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGxlZnQ7XHJcbiAgfVxyXG4gIC5mb290ZXJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiByaWdodDtcclxufVxyXG4vKiAuY29udGVudHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luOiAyJTtcclxuICAgIGJvdHRvbTogMiU7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxufSAqLyJdfQ== */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'speak-with-me';
        this.getFingerPrintJsId = () => {
            const fpDetails_v2 = localStorage.getItem("did");
            return fpDetails_v2;
        };
    }
    ngOnInit() {
        // $(document).ready(function() {
        //   $('.btnNext').click(function(){
        //     $('.active').next('.nav-link').trigger('click');
        //     });
        // });
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _hindi_version_hindi_version_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hindi-version/hindi-version.component */ "./src/app/hindi-version/hindi-version.component.ts");
/* harmony import */ var _tamil_version_tamil_version_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tamil-version/tamil-version.component */ "./src/app/tamil-version/tamil-version.component.ts");







let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _hindi_version_hindi_version_component__WEBPACK_IMPORTED_MODULE_5__["HindiVersionComponent"],
            _tamil_version_tamil_version_component__WEBPACK_IMPORTED_MODULE_6__["TamilVersionComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/hindi-version/hindi-version.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/hindi-version/hindi-version.component.ts ***!
  \**********************************************************/
/*! exports provided: HindiVersionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HindiVersionComponent", function() { return HindiVersionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let HindiVersionComponent = class HindiVersionComponent {
    constructor() {
        this.title = 'speak-with-me';
        this.exploreandlearn = true;
        this.learnandplay = false;
        this.playgame = false;
        this.videohelp = false;
        this.getFingerPrintJsId = () => {
            const fpDetails_v2 = localStorage.getItem("did");
            return fpDetails_v2;
        };
    }
    ngOnInit() {
        // $(document).ready(function() {
        //   $('.btnNext').click(function(){
        //     $('.active').next('.nav-link').trigger('click');
        //     });
        // });
    }
    showExploreandLearn() {
        this.exploreandlearn = true;
        this.learnandplay = false;
        this.playgame = false;
        this.videohelp = false;
    }
    showLearnandplay() {
        this.exploreandlearn = false;
        this.learnandplay = true;
        this.playgame = false;
        this.videohelp = false;
    }
    showPlaygame() {
        this.exploreandlearn = false;
        this.learnandplay = false;
        this.playgame = true;
        this.videohelp = false;
    }
    showVideoHelp() {
        this.exploreandlearn = false;
        this.learnandplay = false;
        this.playgame = false;
        this.videohelp = true;
    }
};
HindiVersionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-hindi-version',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./hindi-version.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/hindi-version/hindi-version.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ../app.component.css */ "./src/app/app.component.css")).default]
    })
], HindiVersionComponent);



/***/ }),

/***/ "./src/app/tamil-version/tamil-version.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/tamil-version/tamil-version.component.ts ***!
  \**********************************************************/
/*! exports provided: TamilVersionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TamilVersionComponent", function() { return TamilVersionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let TamilVersionComponent = class TamilVersionComponent {
    constructor() {
        this.title = 'speak-with-me';
        this.exploreandlearn = true;
        this.learnandplay = false;
        this.playgame = false;
        this.videohelp = false;
        this.getFingerPrintJsId = () => {
            const fpDetails_v2 = localStorage.getItem("did");
            return fpDetails_v2;
        };
    }
    ngOnInit() {
        // $(document).ready(function() {
        //   $('.btnNext').click(function(){
        //     $('.active').next('.nav-link').trigger('click');
        //     });
        // });
    }
    showExploreandLearn() {
        this.exploreandlearn = true;
        this.learnandplay = false;
        this.playgame = false;
        this.videohelp = false;
    }
    showLearnandplay() {
        this.exploreandlearn = false;
        this.learnandplay = true;
        this.playgame = false;
        this.videohelp = false;
    }
    showPlaygame() {
        this.exploreandlearn = false;
        this.learnandplay = false;
        this.playgame = true;
        this.videohelp = false;
    }
    showVideoHelp() {
        this.exploreandlearn = false;
        this.learnandplay = false;
        this.playgame = false;
        this.videohelp = true;
    }
};
TamilVersionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tamil-version',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./tamil-version.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/tamil-version/tamil-version.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ../app.component.css */ "./src/app/app.component.css")).default]
    })
], TamilVersionComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\office_work\tekdi_technologies\all-appliance\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map