
/*
 jQuery UI Sortable plugin wrapper

 @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
 */
angular.module('ui.sortable', [])
  .value('uiSortableConfig',{
    // the default for jquery-ui sortable is "> *", we need to restrict this to
    // ng-repeat items
    // if the user uses
    items: '> [ng-repeat],> [data-ng-repeat],> [x-ng-repeat]'
  })
  .directive('uiSortable', [
    'uiSortableConfig', '$timeout', '$log',
    function(uiSortableConfig, $timeout, $log) {
      return {
        require:'?ngModel',
        scope: {
          ngModel:'=',
          uiSortable:'=',
          ////Expression bindings from html.
          create:'&uiSortableCreate',
          // helper:'&uiSortableHelper',
          start:'&uiSortableStart',
          activate:'&uiSortableActivate',
          // sort:'&uiSortableSort',
          // change:'&uiSortableChange',
          // over:'&uiSortableOver',
          // out:'&uiSortableOut',
          beforeStop:'&uiSortableBeforeStop',
          update:'&uiSortableUpdate',
          remove:'&uiSortableRemove',
          receive:'&uiSortableReceive',
          deactivate:'&uiSortableDeactivate',
          stop:'&uiSortableStop'
        },
        link: function(scope, element, attrs, ngModel) {
          var savedNodes;
          var helper;

          function combineCallbacks(first, second){
            var firstIsFunc = typeof first === 'function';
            var secondIsFunc = typeof second === 'function';
            if(firstIsFunc && secondIsFunc) {
              return function() {
                first.apply(this, arguments);
                second.apply(this, arguments);
              };
            } else if (secondIsFunc) {
              return second;
            }
            return first;
          }

          function getSortableWidgetInstance(element) {
            // this is a fix to support jquery-ui prior to v1.11.x
            // otherwise we should be using `element.sortable('instance')`
            var data = element.data('ui-sortable');
            if (data && typeof data === 'object' && data.widgetFullName === 'ui-sortable') {
              return data;
            }
            return null;
          }

          function patchSortableOption(key, value) {
            if (callbacks[key]) {
              if( key === 'stop' ){
                // call apply after stop
                value = combineCallbacks(
                  value, function() { scope.$apply(); });

                value = combineCallbacks(value, afterStop);
              }
              // wrap the callback
              value = combineCallbacks(callbacks[key], value);
            } else if (wrappers[key]) {
              value = wrappers[key](value);
            }

            // patch the options that need to have values set
            if (!value && (key === 'items' || key === 'ui-model-items')) {
              value = uiSortableConfig.items;
            }

            return value;
          }

          function patchUISortableOptions(newVal, oldVal, sortableWidgetInstance) {
            function addDummyOptionKey(value, key) {
              if (!(key in opts)) {
                // add the key in the opts object so that
                // the patch function detects and handles it
                opts[key] = null;
              }
            }
            // for this directive to work we have to attach some callbacks
            angular.forEach(callbacks, addDummyOptionKey);

            // only initialize it in case we have to
            // update some options of the sortable
            var optsDiff = null;

            if (oldVal) {
              // reset deleted options to default
              var defaultOptions;
              angular.forEach(oldVal, function(oldValue, key) {
                if (!newVal || !(key in newVal)) {
                  if (key in directiveOpts) {
                    if (key === 'ui-floating') {
                      opts[key] = 'auto';
                    } else {
                      opts[key] = patchSortableOption(key, undefined);
                    }
                    return;
                  }

                  if (!defaultOptions) {
                    defaultOptions = angular.element.ui.sortable().options;
                  }
                  var defaultValue = defaultOptions[key];
                  defaultValue = patchSortableOption(key, defaultValue);

                  if (!optsDiff) {
                    optsDiff = {};
                  }
                  optsDiff[key] = defaultValue;
                  opts[key] = defaultValue;
                }
              });
            }

            // update changed options
            angular.forEach(newVal, function(value, key) {
              // if it's a custom option of the directive,
              // handle it approprietly
              if (key in directiveOpts) {
                if (key === 'ui-floating' && (value === false || value === true) && sortableWidgetInstance) {
                  sortableWidgetInstance.floating = value;
                }

                opts[key] = patchSortableOption(key, value);
                return;
              }

              value = patchSortableOption(key, value);

              if (!optsDiff) {
                optsDiff = {};
              }
              optsDiff[key] = value;
              opts[key] = value;
            });

            return optsDiff;
          }

          function getPlaceholderElement (element) {
            var placeholder = element.sortable('option','placeholder');

            // placeholder.element will be a function if the placeholder, has
            // been created (placeholder will be an object).  If it hasn't
            // been created, either placeholder will be false if no
            // placeholder class was given or placeholder.element will be
            // undefined if a class was given (placeholder will be a string)
            if (placeholder && placeholder.element && typeof placeholder.element === 'function') {
              var result = placeholder.element();
              // workaround for jquery ui 1.9.x,
              // not returning jquery collection
              result = angular.element(result);
              return result;
            }
            return null;
          }

          function getPlaceholderExcludesludes (element, placeholder) {
            // exact match with the placeholder's class attribute to handle
            // the case that multiple connected sortables exist and
            // the placeholder option equals the class of sortable items
            var notCssSelector = opts['ui-model-items'].replace(/[^,]*>/g, '');
            var excludes = element.find('[class="' + placeholder.attr('class') + '"]:not(' + notCssSelector + ')');
            return excludes;
          }

          function hasSortingHelper (element, ui) {
            var helperOption = element.sortable('option','helper');
            return helperOption === 'clone' || (typeof helperOption === 'function' && ui.item.sortable.isCustomHelperUsed());
          }

          function getSortingHelper (element, ui/*, savedNodes*/) {
            var result = null;
            if (hasSortingHelper(element, ui) &&
                element.sortable( 'option', 'appendTo' ) === 'parent') {
              // The .ui-sortable-helper element (that's the default class name)
              result = helper;
            }
            return result;
          }

          // thanks jquery-ui
          function isFloating (item) {
            return (/left|right/).test(item.css('float')) || (/inline|table-cell/).test(item.css('display'));
          }

          function getElementContext(elementScopes, element) {
            for (var i = 0; i < elementScopes.length; i++) {
              var c = elementScopes[i];
              if (c.element[0] === element[0]) {
                return c;
              }
            }
          }

          function afterStop(e, ui) {
            ui.item.sortable._destroy();
          }

          // return the index of ui.item among the items
          // we can't just do ui.item.index() because there it might have siblings
          // which are not items
          function getItemIndex(item) {
            return item.parent()
              .find(opts['ui-model-items'])
              .index(item);
          }

          var opts = {};

          // directive specific options
          var directiveOpts = {
            'ui-floating': undefined,
            'ui-model-items': uiSortableConfig.items
          };

          var callbacks = {
            create: null,
            start: null,
            activate: null,
            // sort: null,
            // change: null,
            // over: null,
            // out: null,
            beforeStop: null,
            update: null,
            remove: null,
            receive: null,
            deactivate: null,
            stop: null
          };

          var wrappers = {
            helper: null
          };

          angular.extend(opts, directiveOpts, uiSortableConfig, scope.uiSortable);

          if (!angular.element.fn || !angular.element.fn.jquery) {
            $log.error('ui.sortable: jQuery should be included before AngularJS!');
            return;
          }

          function wireUp () {
            // When we add or remove elements, we need the sortable to 'refresh'
            // so it can find the new/removed elements.
            scope.$watchCollection('ngModel', function() {
              // Timeout to let ng-repeat modify the DOM
              $timeout(function() {
                // ensure that the jquery-ui-sortable widget instance
                // is still bound to the directive's element
                if (!!getSortableWidgetInstance(element)) {
                  element.sortable('refresh');
                }
              }, 0, false);
            });

            callbacks.start = function(e, ui) {
              if (opts['ui-floating'] === 'auto') {
                // since the drag has started, the element will be
                // absolutely positioned, so we check its siblings
                var siblings = ui.item.siblings();
                var sortableWidgetInstance = getSortableWidgetInstance(angular.element(e.target));
                sortableWidgetInstance.floating = isFloating(siblings);
              }

              // Save the starting position of dragged item
              var index = getItemIndex(ui.item);
              ui.item.sortable = {
                model: ngModel.$modelValue[index],
                index: index,
                source: element,
                sourceList: ui.item.parent(),
                sourceModel: ngModel.$modelValue,
                cancel: function () {
                  ui.item.sortable._isCanceled = true;
                },
                isCanceled: function () {
                  return ui.item.sortable._isCanceled;
                },
                isCustomHelperUsed: function () {
                  return !!ui.item.sortable._isCustomHelperUsed;
                },
                _isCanceled: false,
                _isCustomHelperUsed: ui.item.sortable._isCustomHelperUsed,
                _destroy: function () {
                  angular.forEach(ui.item.sortable, function(value, key) {
                    ui.item.sortable[key] = undefined;
                  });
                },
                _connectedSortables: [],
                _getElementContext: function (element) {
                  return getElementContext(this._connectedSortables, element);
                }
              };
            };

            callbacks.activate = function(e, ui) {
              var isSourceContext = ui.item.sortable.source === element;
              var savedNodesOrigin = isSourceContext ?
                                     ui.item.sortable.sourceList :
                                     element;
              var elementContext = {
                element: element,
                scope: scope,
                isSourceContext: isSourceContext,
                savedNodesOrigin: savedNodesOrigin
              };
              // save the directive's scope so that it is accessible from ui.item.sortable
              ui.item.sortable._connectedSortables.push(elementContext);

              // We need to make a copy of the current element's contents so
              // we can restore it after sortable has messed it up.
              // This is inside activate (instead of start) in order to save
              // both lists when dragging between connected lists.
              savedNodes = savedNodesOrigin.contents();
              helper = ui.helper;

              // If this list has a placeholder (the connected lists won't),
              // don't inlcude it in saved nodes.
              var placeholder = getPlaceholderElement(element);
              if (placeholder && placeholder.length) {
                var excludes = getPlaceholderExcludesludes(element, placeholder);
                savedNodes = savedNodes.not(excludes);
              }
            };

            callbacks.update = function(e, ui) {
              // Save current drop position but only if this is not a second
              // update that happens when moving between lists because then
              // the value will be overwritten with the old value
              if (!ui.item.sortable.received) {
                ui.item.sortable.dropindex = getItemIndex(ui.item);
                var droptarget = ui.item.closest('[ui-sortable], [data-ui-sortable], [x-ui-sortable]');
                ui.item.sortable.droptarget = droptarget;
                ui.item.sortable.droptargetList = ui.item.parent();

                var droptargetContext = ui.item.sortable._getElementContext(droptarget);
                ui.item.sortable.droptargetModel = droptargetContext.scope.ngModel;

                // Cancel the sort (let ng-repeat do the sort for us)
                // Don't cancel if this is the received list because it has
                // already been canceled in the other list, and trying to cancel
                // here will mess up the DOM.
                element.sortable('cancel');
              }

              // Put the nodes back exactly the way they started (this is very
              // important because ng-repeat uses comment elements to delineate
              // the start and stop of repeat sections and sortable doesn't
              // respect their order (even if we cancel, the order of the
              // comments are still messed up).
              var sortingHelper = !ui.item.sortable.received && getSortingHelper(element, ui, savedNodes);
              if (sortingHelper && sortingHelper.length) {
                // Restore all the savedNodes except from the sorting helper element.
                // That way it will be garbage collected.
                savedNodes = savedNodes.not(sortingHelper);
              }
              var elementContext = ui.item.sortable._getElementContext(element);
              savedNodes.appendTo(elementContext.savedNodesOrigin);

              // If this is the target connected list then
              // it's safe to clear the restored nodes since:
              // update is currently running and
              // stop is not called for the target list.
              if (ui.item.sortable.received) {
                savedNodes = null;
              }

              // If received is true (an item was dropped in from another list)
              // then we add the new item to this list otherwise wait until the
              // stop event where we will know if it was a sort or item was
              // moved here from another list
              if (ui.item.sortable.received && !ui.item.sortable.isCanceled()) {
                scope.$apply(function () {
                  ngModel.$modelValue.splice(ui.item.sortable.dropindex, 0,
                                             ui.item.sortable.moved);
                });
                scope.$emit('ui-sortable:moved', ui);
              }
            };

            callbacks.stop = function(e, ui) {
              // If the received flag hasn't be set on the item, this is a
              // normal sort, if dropindex is set, the item was moved, so move
              // the items in the list.
              var wasMoved = ('dropindex' in ui.item.sortable) &&
                              !ui.item.sortable.isCanceled();

              if (wasMoved && !ui.item.sortable.received) {

                scope.$apply(function () {
                  ngModel.$modelValue.splice(
                    ui.item.sortable.dropindex, 0,
                    ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0]);
                });
                scope.$emit('ui-sortable:moved', ui);
              } else if (!wasMoved &&
                         !angular.equals(element.contents().toArray(), savedNodes.toArray())) {
                // if the item was not moved
                // and the DOM element order has changed,
                // then restore the elements
                // so that the ngRepeat's comment are correct.

                var sortingHelper = getSortingHelper(element, ui, savedNodes);
                if (sortingHelper && sortingHelper.length) {
                  // Restore all the savedNodes except from the sorting helper element.
                  // That way it will be garbage collected.
                  savedNodes = savedNodes.not(sortingHelper);
                }
                var elementContext = ui.item.sortable._getElementContext(element);
                savedNodes.appendTo(elementContext.savedNodesOrigin);
              }

              // It's now safe to clear the savedNodes and helper
              // since stop is the last callback.
              savedNodes = null;
              helper = null;
            };

            callbacks.receive = function(e, ui) {
              // An item was dropped here from another list, set a flag on the
              // item.
              ui.item.sortable.received = true;
            };

            callbacks.remove = function(e, ui) {
              // Workaround for a problem observed in nested connected lists.
              // There should be an 'update' event before 'remove' when moving
              // elements. If the event did not fire, cancel sorting.
              if (!('dropindex' in ui.item.sortable)) {
                element.sortable('cancel');
                ui.item.sortable.cancel();
              }

              // Remove the item from this list's model and copy data into item,
              // so the next list can retrive it
              if (!ui.item.sortable.isCanceled()) {
                scope.$apply(function () {
                  ui.item.sortable.moved = ngModel.$modelValue.splice(
                    ui.item.sortable.index, 1)[0];
                });
              }
            };

            // setup attribute handlers
            angular.forEach(callbacks, function(value, key) {
              callbacks[key] = combineCallbacks(callbacks[key],
                function () {
                  var attrHandler = scope[key];
                  var attrHandlerFn;
                  if (typeof attrHandler === 'function' &&
                      ('uiSortable' + key.substring(0,1).toUpperCase() + key.substring(1)).length &&
                      typeof (attrHandlerFn = attrHandler()) === 'function') {
                    attrHandlerFn.apply(this, arguments);
                  }
                });
            });


            wrappers.helper = function (inner) {
              if (inner && typeof inner === 'function') {
                return function (e, item) {
                  var oldItemSortable = item.sortable;
                  var index = getItemIndex(item);
                  item.sortable = {
                    model: ngModel.$modelValue[index],
                    index: index,
                    source: element,
                    sourceList: item.parent(),
                    sourceModel: ngModel.$modelValue,
                    _restore: function () {
                      angular.forEach(item.sortable, function(value, key) {
                        item.sortable[key] = undefined;
                      });

                      item.sortable = oldItemSortable;
                    }
                  };

                  var innerResult = inner.apply(this, arguments);
                  item.sortable._restore();
                  item.sortable._isCustomHelperUsed = item !== innerResult;
                  return innerResult;
                };
              }
              return inner;
            };

            scope.$watchCollection('uiSortable', function(newVal, oldVal) {
              // ensure that the jquery-ui-sortable widget instance
              // is still bound to the directive's element
              var sortableWidgetInstance = getSortableWidgetInstance(element);
              if (!!sortableWidgetInstance) {
                var optsDiff = patchUISortableOptions(newVal, oldVal, sortableWidgetInstance);

                if (optsDiff) {
                  element.sortable('option', optsDiff);
                }
              }
            }, true);

            patchUISortableOptions(opts);
          }

          function init () {
            if (ngModel) {
              wireUp();
            } else {
              $log.info('ui.sortable: ngModel not provided!', element);
            }

            // Create sortable
            element.sortable(opts);
          }

          function initIfEnabled () {
            if (scope.uiSortable && scope.uiSortable.disabled) {
              return false;
            }

            init();

            // Stop Watcher
            initIfEnabled.cancelWatcher();
            initIfEnabled.cancelWatcher = angular.noop;

            return true;
          }

          initIfEnabled.cancelWatcher = angular.noop;

          if (!initIfEnabled()) {
            initIfEnabled.cancelWatcher = scope.$watch('uiSortable.disabled', initIfEnabled);
          }
        }
      };
    }
  ]);

var quizBrowserUtil = (function() {

    function getQuestionPreviwContent(tempalteData, itemJson) {
        try {
            if (!tempalteData) {
                throw "Template cannot be empty";
            }
            var story = { "theme": { "manifest": { "media": [] }, "template": [], "controller": [{ "name": "assessment", "type": "items", "id": "assessment", "__cdata": {} }], "startStage": "assessmentStage", "id": "theme", "ver": 0.3, "stage": [{ "id": "baseStage", "preload": true, "image": [], "audio": [], "voice": [] }, { "id": "assessmentStage", "x": 0, "y": 0, "w": 100, "h": 100, "g": [{ "embed": { "template": "item", "var-item": "item" }, "x": 10, "y": 0, "w": 80, "h": 90 }], "iterate": "assessment", "var": "item" }] } };
            story.theme.controller[0].__cdata = { "total_items": 1, "SET_TYPE": "MATERIALISED_SET", "SET_OBJECT_TYPE_KEY": "AssessmentItem", "item_sets": [{ "id": "itemSet", "count": 1 }], "items": { "itemSet": [itemJson] }, "identifier": "itemSet" };
            ecEditor._.forEach(tempalteData, function(t) {
                if (t && ecEditor._.findIndex(story.theme.template, function(st) {
                        return st.id == t.id
                    }) < 0) {
                    story.theme.template.push(t);
                }
            });
            if (itemJson.media) {
                story = addMediaToStory(story, itemJson.media);
            }
            story = addMediaToStory(story, ecEditor.getCurrentObject().media);
            return story;
        } catch (err) {
            return { "error": err };
        };
    }
    function addMediaToStory(story, media) {
        var questionMedia = [], idIndex, srcIndex;
        if(!ecEditor._.isUndefined(media)){
            if(!ecEditor._.isArray(media)){
                _.each(media, function(value){
                    questionMedia.push(value);
                });
                media = questionMedia;
            }
        }
        ecEditor._.forEach(media, function(m) {
            if (m.id && m.src) {
                srcIndex = ecEditor._.findIndex(story.theme.manifest.media, function(sm) {
                    return sm.src === m.src;
                });
                idIndex = ecEditor._.findIndex(story.theme.manifest.media, function(sm) {
                    return sm.id === m.id;
                });
                if (idIndex === -1) story.theme.manifest.media.push(m);
                if (idIndex !== -1 && srcIndex === -1) {
                    var newMedia = { "id": m.id, "src": m.src, "type": m.type };
                    if (m.assetId) newMedia.assetId = m.assetId;
                    story.theme.manifest.media[idIndex] = newMedia;
                }
            }
        });
        return story;
    }
    return {
        getQuestionPreviwContent: getQuestionPreviwContent
    }
})();

//# sourceURL=quizUtil.js
org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.quiz","ver":"1.1","author":"Manju dr","title":"Question Set Plugin","description":"","publishedDate":"","editor":{"main":"editor/plugin.js","help":{"src":"editor/help.md","dataType":"text"},"dependencies":[{"type":"plugin","plugin":"org.ekstep.assessmentbrowser","ver":"1.1"},{"type":"js","src":"libs/sortable.js"},{"type":"js","src":"editor/js/quizUtil.js"}],"menu":[{"id":"assessment","category":"main","type":"icon","toolTip":"Add Question Set","title":"Question Set","iconClass":"icon-questions icon","onclick":{"id":"org.ekstep.quiz:showPopup"}}],"configManifest":[{"propertyName":"assessmentbrowser","title":"assessment Browser","description":"Choose a  from the browser","dataType":"browser","required":true,"onclick":{"id":"org.ekstep.quiz:showPopup","type":"quiz"}},{"propertyName":"quizConfig","title":"question config","dataType":"browser","description":"quizConfig","iconClass":"settings icon","required":true,"onclick":{"id":"org.ekstep.quiz:showQuizConfig","type":"quiz"}},{"propertyName":"title","title":"Assessment Title","description":"Assessment Title","dataType":"input","valueType":"text","required":true},{"propertyName":"shuffle","title":"Shuffle Questions","description":"Shuffle of the Questions","dataType":"boolean","required":true},{"propertyName":"optionShuffle","title":"Shuffle Options","description":"Shuffle the options","dataType":"boolean","required":true},{"propertyName":"showImmediateFeedback","title":"Show Immediate Feedback","description":"Show the feedback popup","dataType":"boolean","required":true},{"propertyName":"total_items","title":"Display","description":"Toal marks to display","dataType":"input","valueType":"number","required":true,"minimumValue":"0"},{"propertyName":"max_score","title":"Total Marks","description":"Toal marks to display","dataType":"input","valueType":"number","required":true,"minimumValue":"1","maximumValue":"99"}]},"renderer":{"main":"renderer/plugin.js"}},org.ekstep.contenteditor.basePlugin.extend({type:"org.ekstep.quiz",initialize:function(){var e=this,t=(ecEditor.addEventListener(this.manifest.id+":showPopup",this.openAssessmentBrowser,this),ecEditor.addEventListener(this.manifest.id+":renderQuiz",this.renderQuiz,this),ecEditor.addEventListener(this.manifest.id+":showQuizConfig",this.showQuizConfig,this),ecEditor.resolvePluginResource(e.manifest.id,e.manifest.ver,"editor/templates/quizconfig.html")),e=ecEditor.resolvePluginResource(e.manifest.id,e.manifest.ver,"editor/js/quizconfigapp.js");ecEditor.getService("popup").loadNgModules(t,e)},mediaObj:{},hasTemplateMedia:!0,newInstance:function(){var i=this,s=(delete i.configManifest,i.attributes.w=80,i.attributes.h=85,i.attributes.x=9,i.attributes.y=6,i.addMediaFromConfig(),i.percentToPixel(i.attributes),i.data.questionnaire),n=(i.data.questionnaire.optionShuffle=!!_.isUndefined(s.optionShuffle)||s.optionShuffle,i.getItems(s.items,"templateId")),o=(_.isUndefined(this.config.media)&&(i.hasTemplateMedia=!1,i.getItems(s.items,"media").forEach(function(e,t){i.addMediatoManifest(e)})),this.parent),a=(this.parent=void 0,[]),r=[],d=0;if((ecEditor._.isUndefined(i.data.template)||0==i.data.template.length||!i.hasTemplateMedia)&&0<_.size(n))for(var e in n)ecEditor.getService("assessment").getTemplate(n[e],function(e,t){try{if(!t)throw d++,r.push(e.config.url),Error(e);d++,!_.isUndefined(t.data.result.content)&&t.data.result.content.body?a.push(i.convert(t)):r.push(t.config.url)}catch(e){console.warn("Invalid Template",e)}d>=_.size(n)&&(i.showpopupMessage(n,_.uniq(r),o),0===_.size(r))&&i.showQuizbgImage(s,o),i.data.template=i.getTemplateData(a)});else i.showQuizbgImage(s,o)},showQuizbgImage:function(i,s){var n=this,e=ecEditor.resolvePluginResource(n.manifest.id,n.manifest.ver,"editor/assets/QuizImage.png");fabric.Image.fromURL(e,function(e){var t=i.total_items+"/"+n.getItems(i.items),t=n.getPropsForEditor(i.title,t,i.max_score);n.editorObj=new fabric.Group([e,t]),n.parent=s,n.postInit()},n.convertToFabric(n.attributes))},getItems:function(e,t){var i,s=[],n=[];for(i in e)s=e[i];return"templateId"===t?_.uniq(_.filter(_.map(s,"template_id"),Boolean)):"media"===t?(s.forEach(function(e,t){n.push(e.media)}),n):s.length},getTemplateData:function(e){var i=this,s=[];return e.forEach(function(e,t){_.isNull(e)||(_.isArray(e.template)?$.merge(s,e.template):s.push(e.template),_.isUndefined(e.manifest))||i.addMediatoManifest(e.manifest.media)}),s.filter(Boolean)},renderQuiz:function(e,t){var i=this,s=[];_.each(t.items,function(e){_.isUndefined(e)||(e=i.parseItem(e)),s.push(e)}),i.setQuizdata(s,t.config)},showpopupMessage:function(e,t,i){var s=this,n=[],o=s.data.questionnaire;for(id in e)for(errId in t)-1<t[errId].indexOf(e[id])&&n.push(e[id]);_.size(n)===_.size(t)&&0<_.size(n)&&ecEditor.getService("popup").open({showClose:!1,closeByEscape:!1,closeByDocument:!1,template:ecEditor.resolvePluginResource(s.manifest.id,s.manifest.ver,"editor/templates/warning.html"),controller:["$scope",function(e){e.callClear=function(){s.clearItem(o,n,function(){s.showQuizbgImage(o,i)}),e.closeThisDialog()},e.dontClear=function(){e.closeThisDialog()},e.header="Clean-up Question Set",e.errorMessage="There are few invalid questions in the question set being created. Would you like to remove the questions?",e.invalidQuestioncount=s.getInvlidQuestioncount(o,n)}]})},clearItem:function(i,s,e){console.info("Error Template_id List:",s);var n=i.item_sets[0].id;i.items[n].forEach(function(e,t){s.includes(e.template_id)?delete i.items[n][t]:console.info("Item is not deleted")}),i.items[n]=_.filter(i.items[n],Boolean),i.item_sets[0].count=i.items[n].length,i.total_items=i.item_sets[0].count,e()},getInvlidQuestioncount:function(e,i){var t=e.item_sets[0].id,s=0;return e.items[t].forEach(function(e,t){i.includes(e.template_id)?s++:console.info("Not presetn")}),s+" out of "+e.total_items+" questions will be removed. "},setQuizdata:function(e,t){var i={},s={},n={questionnaire:{}};i[e[0].identifier]=e,n.questionnaire.items=i,n.questionnaire.item_sets=[{count:t.total_items,id:e[0].identifier}],n.questionnaire=ecEditor._.assign(n.questionnaire,t),this.addConfig("type","items"),this.addConfig("var","item"),this.setData(n),s.data={__cdata:JSON.stringify(n)},s.config={__cdata:JSON.stringify({type:"items",var:"item"})},ecEditor.dispatchEvent(this.manifest.id+":create",s)},parseItem:function(i){return $.each(i,function(e,t){"options"!==e&&"lhs_options"!==e&&"rhs_options"!==e&&"model"!==e&&"answer"!==e&&"media"!==e||(i[e]=_.isObject(i[e])?i[e]:JSON.parse(i[e]))}),i},addMediatoManifest:function(i){var s=this;_.isUndefined(i)||(_.isArray(i)?i.forEach(function(e,t){_.isNull(i[t].id)||_.isNull(i[t].src)||(i[t].preload="true",s.addMedia(i[t]),s.addMediaToConfig(i[t]))}):(i.preload="true",s.addMedia(i),s.addMediaToConfig(i)))},addMediaToConfig:function(e){e.src&&(org.ekstep.contenteditor.mediaManager.getMediaOriginURL(e.src),this.mediaObj[e.id]=e,this.addConfig("media",this.mediaObj))},addMediaFromConfig:function(){var i=this;_.isUndefined(this.config.media)||_.forIn(this.config.media,function(e,t){i.addMedia(e)})},convert:function(e){var t=new X2JS({attributePrefix:"none"});if(!_.isNull(e))return(0===e.data.result.content.body.lastIndexOf("{",0)?JSON.parse(e.data.result.content.body):t.xml_str2json(e.data.result.content.body)).theme},getPropsForEditor:function(e,t,i){return e=new fabric.Text(e.toUpperCase(),{fontSize:15,fill:"black",textAlign:"center",top:32,left:105}),t=new fabric.Text(t+"  Questions,",{fontSize:12,fill:"black",top:49,left:105}),i=new fabric.Text(i+" Marks",{fontSize:12,fill:"black",top:49,left:190}),fabricGroup=new fabric.Group([e,t,i])},onConfigChange:function(e,t){if(!_.isUndefined(t)){var i=this.getItems(this.data.questionnaire.items);switch(e){case"title":this.config.title=t,this.data.questionnaire.title=t,this.editorObj._objects[1]._objects[0].setText(t.toUpperCase());break;case"total_items":this.config.total_items=t,this.data.questionnaire.total_items=t,this.editorObj._objects[1]._objects[1].setText(t+"/"+i+"Questions,");break;case"max_score":this.config.max_score=t,this.data.questionnaire.max_score=t,this.editorObj._objects[1]._objects[2].setText(t+"Marks");break;case"shuffle":this.config.shuffle=t,this.data.questionnaire.shuffle=t;break;case"showImmediateFeedback":this.config.showImmediateFeedback=t,this.data.questionnaire.showImmediateFeedback=t;break;case"optionShuffle":this.config.optionShuffle=t,this.data.questionnaire.optionShuffle=t;break;case"browser":ecEditor.dispatchEvent("delete:invoke"),ecEditor.dispatchEvent(this.manifest.id+":renderQuiz",{items:t.items,config:t.config})}}ecEditor.render(),ecEditor.dispatchEvent("object:modified",{target:ecEditor.getEditorObject()})},showQuizConfig:function(e,t){var i=ecEditor.getCurrentObject();ecEditor.getService("popup").open({template:"quizconfig",controller:"quizconfigcontroller",controllerAs:"$ctrl",resolve:{quizInstance:function(){return i}},width:900,showClose:!1,closeByEscape:!1,closeByDocument:!1,className:"ngdialog-theme-plain"})},getConfig:function(){var e=this._super();return e.shuffle=this.data.questionnaire.shuffle,e.total_items=this.data.questionnaire.total_items,e.showImmediateFeedback=this.data.questionnaire.showImmediateFeedback,e.max_score=this.data.questionnaire.max_score,e.title=this.data.questionnaire.title,e.optionShuffle=this.data.questionnaire.optionShuffle,e},openAssessmentBrowser:function(e,t){var i=this,s=void 0;ecEditor._.isUndefined(t)?t=function(e){e={items:e.items,config:e.config};ecEditor.dispatchEvent(i.manifest.id+":renderQuiz",e)}:(t=t.callback,s=ecEditor.getCurrentObject().data),ecEditor.dispatchEvent("org.ekstep.assessmentbrowser:show",{callback:t,data:s})},getSummary:function(){var t={totalQuestions:0,totalScore:0,questions:[]},e=this.data.questionnaire.total_items;return t.totalQuestions=e,t.totalScore=e,_.forEach(this.data.questionnaire.items[this.data.questionnaire.item_sets[0].id],function(e){t.questions.push({identifier:e.identifier})}),t}}))