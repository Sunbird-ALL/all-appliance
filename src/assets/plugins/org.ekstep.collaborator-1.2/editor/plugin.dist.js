
!function(e){var t=function(e,t){var a,n=e.charCodeAt(t);return 55296>n||n>56319||e.length<=t+1||(a=e.charCodeAt(t+1),56320>a||a>57343)?e[t]:e.substring(t,t+2)},a=function(e,a,n){for(var i,r="",o=0,c=0,d=e.length;d>o;)i=t(e,o),c>=a&&n>c&&(r+=i),o+=i.length,c+=1;return r};e.fn.initial=function(t){var n,i=["#1abc9c","#16a085","#f1c40f","#f39c12","#2ecc71","#27ae60","#e67e22","#d35400","#3498db","#2980b9","#e74c3c","#c0392b","#9b59b6","#8e44ad","#bdc3c7","#34495e","#2c3e50","#95a5a6","#7f8c8d","#ec87bf","#d870ad","#f69785","#9ba37e","#b49255","#b49255","#a94136"];return this.each(function(){var r=e(this),o=e.extend({name:"Name",color:null,seed:0,charCount:1,textColor:"#ffffff",height:100,width:100,fontSize:60,fontWeight:400,fontFamily:"HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif",radius:0},t);o=e.extend(o,r.data());var c=a(o.name,0,o.charCount).toUpperCase(),d=e('<text text-anchor="middle"></text>').attr({y:"50%",x:"50%",dy:"0.35em","pointer-events":"auto",fill:o.textColor,"font-family":o.fontFamily}).html(c).css({"font-weight":o.fontWeight,"font-size":o.fontSize+"px"});if(null==o.color){var h=Math.floor((c.charCodeAt(0)+o.seed)%i.length);n=i[h]}else n=o.color;var f=e("<svg></svg>").attr({xmlns:"http://www.w3.org/2000/svg","pointer-events":"none",width:o.width,height:o.height}).css({"background-color":n,width:o.width+"px",height:o.height+"px","border-radius":o.radius+"px","-moz-border-radius":o.radius+"px"});f.append(d);var l=window.btoa(unescape(encodeURIComponent(e("<div>").append(f.clone()).html())));r.attr("src","data:image/svg+xml;base64,"+l)})}}(jQuery);
// # Angular-Inview
// - Author: [Nicola Peduzzi](https://github.com/thenikso)
// - Repository: https://github.com/thenikso/angular-inview
// - Install with: `npm install angular-inview`
// - Version: **3.0.0**
(function() {
'use strict';

// An [angular.js](https://angularjs.org) directive to evaluate an expression if
// a DOM element is or not in the current visible browser viewport.
// Use it in your AngularJS app by including the javascript and requireing it:
//
// `angular.module('myApp', ['angular-inview'])`
var moduleName = 'angular-inview';
angular.module(moduleName, [])

// ## in-view directive
//
// ### Usage
// ```html
// <any in-view="{expression}" [in-view-options="{object}"]></any>
// ```
.directive('inView', ['$parse', inViewDirective])

// ## in-view-container directive
.directive('inViewContainer', inViewContainerDirective);

// ## Implementation
function inViewDirective ($parse) {
  return {
    // Evaluate the expression passet to the attribute `in-view` when the DOM
    // element is visible in the viewport.
    restrict: 'A',
    require: '?^^inViewContainer',
    link: function inViewDirectiveLink (scope, element, attrs, container) {
      // in-view-options attribute can be specified with an object expression
      // containing:
      //   - `offset`: An array of values to offset the element position.
      //     Offsets are expressed as arrays of 4 numbers [top, right, bottom, left].
      //     Like CSS, you can also specify only 2 numbers [top/bottom, left/right].
      //     Instead of numbers, some array elements can be a string with a percentage.
      //     Positive numbers are offsets outside the element rectangle and
      //     negative numbers are offsets to the inside.
      //   - `viewportOffset`: Like the element offset but appied to the viewport.
      //   - `generateDirection`: Indicate if the `direction` information should
      //     be included in `$inviewInfo` (default false).
      //   - `generateParts`: Indicate if the `parts` information should
      //     be included in `$inviewInfo` (default false).
      //   - `throttle`: Specify a number of milliseconds by which to limit the
      //     number of incoming events.
      var options = {};
      if (attrs.inViewOptions) {
        options = scope.$eval(attrs.inViewOptions);
      }
      if (options.offset) {
        options.offset = normalizeOffset(options.offset);
      }
      if (options.viewportOffset) {
        options.viewportOffset = normalizeOffset(options.viewportOffset);
      }

      // Build reactive chain from an initial event
      var viewportEventSignal = signalSingle({ type: 'initial' })

      // Merged with the window events
      .merge(signalFromEvent(window, 'checkInView click ready wheel mousewheel DomMouseScroll MozMousePixelScroll resize scroll touchmove mouseup keydown'))

      // Merge with container's events signal
      if (container) {
        viewportEventSignal = viewportEventSignal.merge(container.eventsSignal);
      }

      // Throttle if option specified
      if (options.throttle) {
        viewportEventSignal = viewportEventSignal.throttle(options.throttle);
      }

      // Map to viewport intersection and in-view informations
      var inviewInfoSignal = viewportEventSignal

      // Inview information structure contains:
      //   - `inView`: a boolean value indicating if the element is
      //     visible in the viewport;
      //   - `changed`: a boolean value indicating if the inview status
      //     changed after the last event;
      //   - `event`: the event that initiated the in-view check;
      .map(function(event) {
        var viewportRect;
        if (container) {
          viewportRect = container.getViewportRect();
          // TODO merge with actual window!
        } else {
          viewportRect = getViewportRect();
        }
        viewportRect = offsetRect(viewportRect, options.viewportOffset);
        var elementRect = offsetRect(element[0].getBoundingClientRect(), options.offset);
        var isVisible = !!(element[0].offsetWidth || element[0].offsetHeight || element[0].getClientRects().length);
        var info = {
          inView: isVisible && intersectRect(elementRect, viewportRect),
          event: event,
          element: element,
          elementRect: elementRect,
          viewportRect: viewportRect
        };
        // Add inview parts
        if (options.generateParts && info.inView) {
          info.parts = {};
          info.parts.top = elementRect.top >= viewportRect.top;
          info.parts.left = elementRect.left >= viewportRect.left;
          info.parts.bottom = elementRect.bottom <= viewportRect.bottom;
          info.parts.right = elementRect.right <= viewportRect.right;
        }
        return info;
      })

      // Add the changed information to the inview structure.
      .scan({}, function (lastInfo, newInfo) {
        // Add inview direction info
        if (options.generateDirection && newInfo.inView && lastInfo.elementRect) {
          newInfo.direction = {
            horizontal: newInfo.elementRect.left - lastInfo.elementRect.left,
            vertical: newInfo.elementRect.top - lastInfo.elementRect.top
          };
        }
        // Calculate changed flag
        newInfo.changed =
          newInfo.inView !== lastInfo.inView ||
          !angular.equals(newInfo.parts, lastInfo.parts) ||
          !angular.equals(newInfo.direction, lastInfo.direction);
        return newInfo;
      })

      // Filters only informations that should be forwarded to the callback
      .filter(function (info) {
        // Don't forward if no relevant infomation changed
        if (!info.changed) {
          return false;
        }
        // Don't forward if not initially in-view
        if (info.event.type === 'initial' && !info.inView) {
          return false;
        }
        return true;
      });

      // Execute in-view callback
      var inViewExpression = $parse(attrs.inView);
      var dispose = inviewInfoSignal.subscribe(function (info) {
        scope.$applyAsync(function () {
          inViewExpression(scope, {
            '$inview': info.inView,
            '$inviewInfo': info
          });
        });
      });

      // Dispose of reactive chain
      scope.$on('$destroy', dispose);
    }
  }
}

function inViewContainerDirective () {
  return {
    restrict: 'A',
    controller: ['$element', function ($element) {
      this.element = $element;
      this.eventsSignal = signalFromEvent($element, 'scroll');
      this.getViewportRect = function () {
        return $element[0].getBoundingClientRect();
      };
    }]
  }
}

// ## Utilities

function getViewportRect () {
  var result = {
    top: 0,
    left: 0,
    width: window.innerWidth,
    right: window.innerWidth,
    height: window.innerHeight,
    bottom: window.innerHeight
  };
  if (result.height) {
    return result;
  }
  var mode = document.compatMode;
  if (mode === 'CSS1Compat') {
    result.width = result.right = document.documentElement.clientWidth;
    result.height = result.bottom = document.documentElement.clientHeight;
  } else {
    result.width = result.right = document.body.clientWidth;
    result.height = result.bottom = document.body.clientHeight;
  }
  return result;
}

function intersectRect (r1, r2) {
  return !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
}

function normalizeOffset (offset) {
  if (!angular.isArray(offset)) {
    return [offset, offset, offset, offset];
  }
  if (offset.length == 2) {
    return offset.concat(offset);
  }
  else if (offset.length == 3) {
    return offset.concat([offset[1]]);
  }
  return offset;
}

function offsetRect (rect, offset) {
  if (!offset) {
    return rect;
  }
  var offsetObject = {
    top: isPercent(offset[0]) ? (parseFloat(offset[0]) * rect.height / 100) : offset[0],
    right: isPercent(offset[1]) ? (parseFloat(offset[1]) * rect.width / 100) : offset[1],
    bottom: isPercent(offset[2]) ? (parseFloat(offset[2]) * rect.height / 100) : offset[2],
    left: isPercent(offset[3]) ? (parseFloat(offset[3]) * rect.width / 100) : offset[3]
  };
  // Note: ClientRect object does not allow its properties to be written to therefore a new object has to be created.
  return {
    top: rect.top - offsetObject.top,
    left: rect.left - offsetObject.left,
    bottom: rect.bottom + offsetObject.bottom,
    right: rect.right + offsetObject.right,
    height: rect.height + offsetObject.top + offsetObject.bottom,
    width: rect.width + offsetObject.left + offsetObject.right
  };
}

function isPercent (n) {
  return angular.isString(n) && n.indexOf('%') > 0;
}

// ## QuickSignal FRP
// A quick and dirty implementation of Rx to have a streamlined code in the
// directives.

// ### QuickSignal
//
// - `didSubscribeFunc`: a function receiving a `subscriber` as described below
//
// Usage:
//     var mySignal = new QuickSignal(function(subscriber) { ... })
function QuickSignal (didSubscribeFunc) {
  this.didSubscribeFunc = didSubscribeFunc;
}

// Subscribe to a signal and consume the steam of data.
//
// Returns a function that can be called to stop the signal stream of data and
// perform cleanup.
//
// A `subscriber` is a function that will be called when a new value arrives.
// a `subscriber.$dispose` property can be set to a function to be called uppon
// disposal. When setting the `$dispose` function, the previously set function
// should be chained.
QuickSignal.prototype.subscribe = function (subscriber) {
  this.didSubscribeFunc(subscriber);
  var dispose = function () {
    if (subscriber.$dispose) {
      subscriber.$dispose();
      subscriber.$dispose = null;
    }
  }
  return dispose;
}

QuickSignal.prototype.map = function (f) {
  var s = this;
  return new QuickSignal(function (subscriber) {
    subscriber.$dispose = s.subscribe(function (nextValue) {
      subscriber(f(nextValue));
    });
  });
};

QuickSignal.prototype.filter = function (f) {
  var s = this;
  return new QuickSignal(function (subscriber) {
    subscriber.$dispose = s.subscribe(function (nextValue) {
      if (f(nextValue)) {
        subscriber(nextValue);
      }
    });
  });
};

QuickSignal.prototype.scan = function (initial, scanFunc) {
  var s = this;
  return new QuickSignal(function (subscriber) {
    var last = initial;
    subscriber.$dispose = s.subscribe(function (nextValue) {
      last = scanFunc(last, nextValue);
      subscriber(last);
    });
  });
}

QuickSignal.prototype.merge = function (signal) {
  return signalMerge(this, signal);
};

QuickSignal.prototype.throttle = function (threshhold) {
  var s = this, last, deferTimer;
  return new QuickSignal(function (subscriber) {
    var chainDisposable = s.subscribe(function () {
      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          subscriber.apply(null, args);
        }, threshhold);
      } else {
        last = now;
        subscriber.apply(null, args);
      }
    });
    subscriber.$dispose = function () {
      clearTimeout(deferTimer);
      if (chainDisposable) chainDisposable();
    };
  });
};

function signalMerge () {
  var signals = arguments;
  return new QuickSignal(function (subscriber) {
    var disposables = [];
    for (var i = signals.length - 1; i >= 0; i--) {
      disposables.push(signals[i].subscribe(function () {
        subscriber.apply(null, arguments);
      }));
    }
    subscriber.$dispose = function () {
      for (var i = disposables.length - 1; i >= 0; i--) {
        if (disposables[i]) disposables[i]();
      }
    }
  });
}

// Returns a signal from DOM events of a target.
function signalFromEvent (target, event) {
  return new QuickSignal(function (subscriber) {
    var handler = function (e) {
      subscriber(e);
    };
    var el = angular.element(target);
    event.split(' ').map(e => el[0].addEventListener(e, handler, true));
    subscriber.$dispose = function () {
      event.split(' ').map(e => el[0].removeEventListener(e, handler, true));
    };
  });
}

function signalSingle (value) {
  return new QuickSignal(function (subscriber) {
    setTimeout(function() { subscriber(value); });
  });
}

// Module loaders exports
if (typeof define === 'function' && define.amd) {
  define(['angular'], moduleName);
} else if (typeof module !== 'undefined' && module && module.exports) {
  module.exports = moduleName;
}

})();

org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.collaborator","ver":"1.2","author":"Vivek Kasture","title":"Collaborator plugin","description":"","publishedDate":"","editor":{"main":"editor/plugin.js","dependencies":[{"type":"css","src":"editor/collaborator.css"},{"type":"js","src":"editor/libs/initial.min.js"},{"type":"js","src":"editor/libs/angular-inview.js"}]}},org.ekstep.contenteditor.basePlugin.extend({currentInstance:void 0,initialize:function(){var e=this,t=(ecEditor.addEventListener("org.ekstep.collaborator:add",this.loadBrowser,this),ecEditor.resolvePluginResource(e.manifest.id,e.manifest.ver,"editor/collaborator.html")),e=ecEditor.resolvePluginResource(e.manifest.id,e.manifest.ver,"editor/collaboratorApp.js");ecEditor.getService("popup").loadNgModules(t,e)},loadBrowser:function(e,t){(currentInstance=this).startLoadTime=new Date,ecEditor.getService("popup").open({template:"partials/collaborator",controller:"collaboratorCtrl",controllerAs:"$ctrl",resolve:{instance:function(){return currentInstance}},width:851,showClose:!1,closeByDocument:!1,closeByEscape:!0,className:"ngdialog-theme-plain"},function(){})}}))