

/*!
 * ngTagsInput v3.2.0
 * http://mbenford.github.io/ngTagsInput
 *
 * Copyright (c) 2013-2017 Michael Benford
 * License: MIT
 *
 * Generated at 2017-04-15 17:08:51 -0300
 */
(function() {
'use strict';

var KEYS = {
    backspace: 8,
    tab: 9,
    enter: 13,
    escape: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    delete: 46,
    comma: 188
};

var MAX_SAFE_INTEGER = 9007199254740991;
var SUPPORTED_INPUT_TYPES = ['text', 'email', 'url'];

var tagsInput = angular.module('ngTagsInput', []);

/**
 * @ngdoc directive
 * @name tagsInput
 * @module ngTagsInput
 *
 * @description
 * Renders an input box with tag editing support.
 *
 * @param {string} ngModel Assignable Angular expression to data-bind to.
 * @param {boolean=} [useStrings=false] Flag indicating that the model is an array of strings (EXPERIMENTAL).
 * @param {string=} [template=NA] URL or id of a custom template for rendering each tag.
 * @param {string=} [templateScope=NA] Scope to be passed to custom templates - of both tagsInput and
 *    autoComplete directives - as $scope.
 * @param {string=} [displayProperty=text] Property to be rendered as the tag label.
 * @param {string=} [keyProperty=text] Property to be used as a unique identifier for the tag.
 * @param {string=} [type=text] Type of the input element. Only 'text', 'email' and 'url' are supported values.
 * @param {string=} [text=NA] Assignable Angular expression for data-binding to the element's text.
 * @param {number=} tabindex Tab order of the control.
 * @param {string=} [placeholder=Add a tag] Placeholder text for the control.
 * @param {number=} [minLength=3] Minimum length for a new tag.
 * @param {number=} [maxLength=MAX_SAFE_INTEGER] Maximum length allowed for a new tag.
 * @param {number=} [minTags=0] Sets minTags validation error key if the number of tags added is less than minTags.
 * @param {number=} [maxTags=MAX_SAFE_INTEGER] Sets maxTags validation error key if the number of tags added is greater
 *    than maxTags.
 * @param {boolean=} [allowLeftoverText=false] Sets leftoverText validation error key if there is any leftover text in
 *    the input element when the directive loses focus.
 * @param {string=} [removeTagSymbol=×] (Obsolete) Symbol character for the remove tag button.
 * @param {boolean=} [addOnEnter=true] Flag indicating that a new tag will be added on pressing the ENTER key.
 * @param {boolean=} [addOnSpace=false] Flag indicating that a new tag will be added on pressing the SPACE key.
 * @param {boolean=} [addOnComma=true] Flag indicating that a new tag will be added on pressing the COMMA key.
 * @param {boolean=} [addOnBlur=true] Flag indicating that a new tag will be added when the input field loses focus.
 * @param {boolean=} [addOnPaste=false] Flag indicating that the text pasted into the input field will be split into tags.
 * @param {string=} [pasteSplitPattern=,] Regular expression used to split the pasted text into tags.
 * @param {boolean=} [replaceSpacesWithDashes=true] Flag indicating that spaces will be replaced with dashes.
 * @param {string=} [allowedTagsPattern=.+] Regular expression that determines whether a new tag is valid.
 * @param {boolean=} [enableEditingLastTag=false] Flag indicating that the last tag will be moved back into the new tag
 *    input box instead of being removed when the backspace key is pressed and the input box is empty.
 * @param {boolean=} [addFromAutocompleteOnly=false] Flag indicating that only tags coming from the autocomplete list
 *    will be allowed. When this flag is true, addOnEnter, addOnComma, addOnSpace and addOnBlur values are ignored.
 * @param {boolean=} [spellcheck=true] Flag indicating whether the browser's spellcheck is enabled for the input field or not.
 * @param {expression=} [tagClass=NA] Expression to evaluate for each existing tag in order to get the CSS classes to be used.
 *    The expression is provided with the current tag as $tag, its index as $index and its state as $selected. The result
 *    of the evaluation must be one of the values supported by the ngClass directive (either a string, an array or an object).
 *    See https://docs.angularjs.org/api/ng/directive/ngClass for more information.
 * @param {expression=} [onTagAdding=NA] Expression to evaluate that will be invoked before adding a new tag. The new
 *    tag is available as $tag. This method must return either a boolean value or a promise. If either a false value or a rejected
 *    promise is returned, the tag will not be added.
 * @param {expression=} [onTagAdded=NA] Expression to evaluate upon adding a new tag. The new tag is available as $tag.
 * @param {expression=} [onInvalidTag=NA] Expression to evaluate when a tag is invalid. The invalid tag is available as $tag.
 * @param {expression=} [onTagRemoving=NA] Expression to evaluate that will be invoked before removing a tag. The tag
 *    is available as $tag. This method must return either a boolean value or a promise. If either a false value or a rejected
 *    promise is returned, the tag will not be removed.
 * @param {expression=} [onTagRemoved=NA] Expression to evaluate upon removing an existing tag. The removed tag is available as $tag.
 * @param {expression=} [onTagClicked=NA] Expression to evaluate upon clicking an existing tag. The clicked tag is available as $tag.
 */
tagsInput.directive('tagsInput', ["$timeout", "$document", "$window", "$q", "tagsInputConfig", "tiUtil", function($timeout, $document, $window, $q, tagsInputConfig, tiUtil) {
    function TagList(options, events, onTagAdding, onTagRemoving) {
        var self = {}, getTagText, setTagText, canAddTag, canRemoveTag;

        getTagText = function(tag) {
            return tiUtil.safeToString(tag[options.displayProperty]);
        };

        setTagText = function(tag, text) {
            tag[options.displayProperty] = text;
        };

        canAddTag = function(tag) {
            var tagText = getTagText(tag);
            var valid = tagText &&
                        tagText.length >= options.minLength &&
                        tagText.length <= options.maxLength &&
                        options.allowedTagsPattern.test(tagText) &&
                        !tiUtil.findInObjectArray(self.items, tag, options.keyProperty || options.displayProperty);

            return $q.when(valid && onTagAdding({ $tag: tag })).then(tiUtil.promisifyValue);
        };

        canRemoveTag = function(tag) {
            return $q.when(onTagRemoving({ $tag: tag })).then(tiUtil.promisifyValue);
        };

        self.items = [];

        self.addText = function(text) {
            var tag = {};
            setTagText(tag, text);
            return self.add(tag);
        };

        self.add = function(tag) {
            var tagText = getTagText(tag);

            if (options.replaceSpacesWithDashes) {
                tagText = tiUtil.replaceSpacesWithDashes(tagText);
            }

            setTagText(tag, tagText);

            return canAddTag(tag)
                .then(function() {
                    self.items.push(tag);
                    events.trigger('tag-added', { $tag: tag });
                })
                .catch(function() {
                    if (tagText) {
                      events.trigger('invalid-tag', { $tag: tag });
                    }
                });
        };

        self.remove = function(index) {
            var tag = self.items[index];

            return canRemoveTag(tag).then(function() {
                self.items.splice(index, 1);
                self.clearSelection();
                events.trigger('tag-removed', { $tag: tag });
                return tag;
            });
        };

        self.select = function(index) {
            if (index < 0) {
                index = self.items.length - 1;
            }
            else if (index >= self.items.length) {
                index = 0;
            }

            self.index = index;
            self.selected = self.items[index];
        };

        self.selectPrior = function() {
            self.select(--self.index);
        };

        self.selectNext = function() {
            self.select(++self.index);
        };

        self.removeSelected = function() {
            return self.remove(self.index);
        };

        self.clearSelection = function() {
            self.selected = null;
            self.index = -1;
        };

        self.getItems = function() {
            return options.useStrings ? self.items.map(getTagText): self.items;
        };

        self.clearSelection();

        return self;
    }

    function validateType(type) {
        return SUPPORTED_INPUT_TYPES.indexOf(type) !== -1;
    }

    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            tags: '=ngModel',
            text: '=?',
            templateScope: '=?',
            tagClass: '&',
            onTagAdding: '&',
            onTagAdded: '&',
            onInvalidTag: '&',
            onTagRemoving: '&',
            onTagRemoved: '&',
            onTagClicked: '&',
        },
        replace: false,
        transclude: true,
        templateUrl: 'ngTagsInput/tags-input.html',
        controller: ["$scope", "$attrs", "$element", function($scope, $attrs, $element) {
            $scope.events = tiUtil.simplePubSub();

            tagsInputConfig.load('tagsInput', $scope, $attrs, {
                template: [String, 'ngTagsInput/tag-item.html'],
                type: [String, 'text', validateType],
                placeholder: [String, 'Add a tag'],
                tabindex: [Number, null],
                removeTagSymbol: [String, String.fromCharCode(215)],
                replaceSpacesWithDashes: [Boolean, true],
                minLength: [Number, 3],
                maxLength: [Number, MAX_SAFE_INTEGER],
                addOnEnter: [Boolean, true],
                addOnSpace: [Boolean, false],
                addOnComma: [Boolean, true],
                addOnBlur: [Boolean, true],
                addOnPaste: [Boolean, false],
                pasteSplitPattern: [RegExp, /,/],
                allowedTagsPattern: [RegExp, /.+/],
                enableEditingLastTag: [Boolean, false],
                minTags: [Number, 0],
                maxTags: [Number, MAX_SAFE_INTEGER],
                displayProperty: [String, 'text'],
                keyProperty: [String, ''],
                allowLeftoverText: [Boolean, false],
                addFromAutocompleteOnly: [Boolean, false],
                spellcheck: [Boolean, true],
                useStrings: [Boolean, false]
            });

            $scope.tagList = new TagList($scope.options, $scope.events,
                tiUtil.handleUndefinedResult($scope.onTagAdding, true),
                tiUtil.handleUndefinedResult($scope.onTagRemoving, true));

            this.registerAutocomplete = function() {
                var input = $element.find('input');

                return {
                    addTag: function(tag) {
                        return $scope.tagList.add(tag);
                    },
                    getTags: function() {
                        return $scope.tagList.items;
                    },
                    getCurrentTagText: function() {
                        return $scope.newTag.text();
                    },
                    getOptions: function() {
                        return $scope.options;
                    },
                    getTemplateScope: function() {
                        return $scope.templateScope;
                    },
                    on: function(name, handler) {
                        $scope.events.on(name, handler, true);
                        return this;
                    }
                };
            };

            this.registerTagItem = function() {
                return {
                    getOptions: function() {
                        return $scope.options;
                    },
                    removeTag: function(index) {
                        if ($scope.disabled) {
                            return;
                        }
                        $scope.tagList.remove(index);
                    }
                };
            };
        }],
        link: function(scope, element, attrs, ngModelCtrl) {
            var hotkeys = [KEYS.enter, KEYS.comma, KEYS.space, KEYS.backspace, KEYS.delete, KEYS.left, KEYS.right],
                tagList = scope.tagList,
                events = scope.events,
                options = scope.options,
                input = element.find('input'),
                validationOptions = ['minTags', 'maxTags', 'allowLeftoverText'],
                setElementValidity,
                focusInput;

            setElementValidity = function() {
                ngModelCtrl.$setValidity('maxTags', tagList.items.length <= options.maxTags);
                ngModelCtrl.$setValidity('minTags', tagList.items.length >= options.minTags);
                ngModelCtrl.$setValidity('leftoverText', scope.hasFocus || options.allowLeftoverText ? true : !scope.newTag.text());
            };

            focusInput = function() {
                $timeout(function() { input[0].focus(); });
            };

            ngModelCtrl.$isEmpty = function(value) {
                return !value || !value.length;
            };

            scope.newTag = {
                text: function(value) {
                    if (angular.isDefined(value)) {
                        scope.text = value;
                        events.trigger('input-change', value);
                    }
                    else {
                        return scope.text || '';
                    }
                },
                invalid: null
            };

            scope.track = function(tag) {
                return tag[options.keyProperty || options.displayProperty];
            };

            scope.getTagClass = function(tag, index) {
                var selected = tag === tagList.selected;
                return [
                    scope.tagClass({$tag: tag, $index: index, $selected: selected}),
                    { selected: selected }
                ];
            };

            scope.$watch('tags', function(value) {
                if (value) {
                    tagList.items = tiUtil.makeObjectArray(value, options.displayProperty);
                    if (options.useStrings) {
                        return;
                    }

                    scope.tags = tagList.items;
                }
                else {
                    tagList.items = [];
                }
            });

            scope.$watch('tags.length', function() {
                setElementValidity();

                // ngModelController won't trigger validators when the model changes (because it's an array),
                // so we need to do it ourselves. Unfortunately this won't trigger any registered formatter.
                ngModelCtrl.$validate();
            });

            attrs.$observe('disabled', function(value) {
                scope.disabled = value;
            });

            scope.eventHandlers = {
                input: {
                    keydown: function($event) {
                        events.trigger('input-keydown', $event);
                    },
                    focus: function() {
                        if (scope.hasFocus) {
                            return;
                        }

                        scope.hasFocus = true;
                        events.trigger('input-focus');
                    },
                    blur: function() {
                        $timeout(function() {
                            var activeElement = $document.prop('activeElement'),
                                lostFocusToBrowserWindow = activeElement === input[0],
                                lostFocusToChildElement = element[0].contains(activeElement);

                            if (lostFocusToBrowserWindow || !lostFocusToChildElement) {
                                scope.hasFocus = false;
                                events.trigger('input-blur');
                            }
                        });
                    },
                    paste: function($event) {
                        $event.getTextData = function() {
                            var clipboardData = $event.clipboardData || ($event.originalEvent && $event.originalEvent.clipboardData);
                            return clipboardData ? clipboardData.getData('text/plain') : $window.clipboardData.getData('Text');
                        };
                        events.trigger('input-paste', $event);
                    }
                },
                host: {
                    click: function() {
                        if (scope.disabled) {
                            return;
                        }
                        focusInput();
                    }
                },
                tag: {
                    click: function(tag) {
                        events.trigger('tag-clicked', { $tag: tag });
                    }
                }
            };

            events
                .on('tag-added', scope.onTagAdded)
                .on('invalid-tag', scope.onInvalidTag)
                .on('tag-removed', scope.onTagRemoved)
                .on('tag-clicked', scope.onTagClicked)
                .on('tag-added', function() {
                    scope.newTag.text('');
                })
                .on('tag-added tag-removed', function() {
                    scope.tags = tagList.getItems();
                    // Ideally we should be able call $setViewValue here and let it in turn call $setDirty and $validate
                    // automatically, but since the model is an array, $setViewValue does nothing and it's up to us to do it.
                    // Unfortunately this won't trigger any registered $parser and there's no safe way to do it.
                    ngModelCtrl.$setDirty();
                    focusInput();
                })
                .on('invalid-tag', function() {
                    scope.newTag.invalid = true;
                })
                .on('option-change', function(e) {
                    if (validationOptions.indexOf(e.name) !== -1) {
                        setElementValidity();
                    }
                })
                .on('input-change', function() {
                    tagList.clearSelection();
                    scope.newTag.invalid = null;
                })
                .on('input-focus', function() {
                    element.triggerHandler('focus');
                    ngModelCtrl.$setValidity('leftoverText', true);
                })
                .on('input-blur', function() {
                    if (options.addOnBlur && !options.addFromAutocompleteOnly) {
                        tagList.addText(scope.newTag.text());
                    }
                    element.triggerHandler('blur');
                    setElementValidity();
                })
                .on('input-keydown', function(event) {
                    var key = event.keyCode,
                        addKeys = {},
                        shouldAdd, shouldRemove, shouldSelect, shouldEditLastTag;

                    if (tiUtil.isModifierOn(event) || hotkeys.indexOf(key) === -1) {
                        return;
                    }

                    addKeys[KEYS.enter] = options.addOnEnter;
                    addKeys[KEYS.comma] = options.addOnComma;
                    addKeys[KEYS.space] = options.addOnSpace;

                    shouldAdd = !options.addFromAutocompleteOnly && addKeys[key];
                    shouldRemove = (key === KEYS.backspace || key === KEYS.delete) && tagList.selected;
                    shouldEditLastTag = key === KEYS.backspace && scope.newTag.text().length === 0 && options.enableEditingLastTag;
                    shouldSelect = (key === KEYS.backspace || key === KEYS.left || key === KEYS.right) && scope.newTag.text().length === 0 && !options.enableEditingLastTag;

                    if (shouldAdd) {
                        tagList.addText(scope.newTag.text());
                    }
                    else if (shouldEditLastTag) {
                        tagList.selectPrior();
                        tagList.removeSelected().then(function(tag) {
                            if (tag) {
                                scope.newTag.text(tag[options.displayProperty]);
                            }
                        });
                    }
                    else if (shouldRemove) {
                        tagList.removeSelected();
                    }
                    else if (shouldSelect) {
                        if (key === KEYS.left || key === KEYS.backspace) {
                            tagList.selectPrior();
                        }
                        else if (key === KEYS.right) {
                            tagList.selectNext();
                        }
                    }

                    if (shouldAdd || shouldSelect || shouldRemove || shouldEditLastTag) {
                        event.preventDefault();
                    }
                })
                .on('input-paste', function(event) {
                    if (options.addOnPaste) {
                        var data = event.getTextData();
                        var tags = data.split(options.pasteSplitPattern);

                        if (tags.length > 1) {
                            tags.forEach(function(tag) {
                                tagList.addText(tag);
                            });
                            event.preventDefault();
                        }
                    }
                });
        }
    };
}]);


/**
 * @ngdoc directive
 * @name tiTagItem
 * @module ngTagsInput
 *
 * @description
 * Represents a tag item. Used internally by the tagsInput directive.
 */
tagsInput.directive('tiTagItem', ["tiUtil", function(tiUtil) {
    return {
        restrict: 'E',
        require: '^tagsInput',
        template: '<ng-include src="$$template"></ng-include>',
        scope: {
            $scope: '=scope',
            data: '='
        },
        link: function(scope, element, attrs, tagsInputCtrl) {
            var tagsInput = tagsInputCtrl.registerTagItem(),
                options = tagsInput.getOptions();

            scope.$$template = options.template;
            scope.$$removeTagSymbol = options.removeTagSymbol;

            scope.$getDisplayText = function() {
                return tiUtil.safeToString(scope.data[options.displayProperty]);
            };
            scope.$removeTag = function() {
                tagsInput.removeTag(scope.$index);
            };

            scope.$watch('$parent.$index', function(value) {
                scope.$index = value;
            });
        }
    };
}]);


/**
 * @ngdoc directive
 * @name autoComplete
 * @module ngTagsInput
 *
 * @description
 * Provides autocomplete support for the tagsInput directive.
 *
 * @param {expression} source Expression to evaluate upon changing the input content. The input value is available as
 *    $query. The result of the expression must be a promise that eventually resolves to an array of strings.
 * @param {string=} [template=NA] URL or id of a custom template for rendering each element of the autocomplete list.
 * @param {string=} [displayProperty=tagsInput.displayText] Property to be rendered as the autocomplete label.
 * @param {number=} [debounceDelay=100] Amount of time, in milliseconds, to wait before evaluating the expression in
 *    the source option after the last keystroke.
 * @param {number=} [minLength=3] Minimum number of characters that must be entered before evaluating the expression
 *    in the source option.
 * @param {boolean=} [highlightMatchedText=true] Flag indicating that the matched text will be highlighted in the
 *    suggestions list.
 * @param {number=} [maxResultsToShow=10] Maximum number of results to be displayed at a time.
 * @param {boolean=} [loadOnDownArrow=false] Flag indicating that the source option will be evaluated when the down arrow
 *    key is pressed and the suggestion list is closed. The current input value is available as $query.
 * @param {boolean=} [loadOnEmpty=false] Flag indicating that the source option will be evaluated when the input content
 *    becomes empty. The $query variable will be passed to the expression as an empty string.
 * @param {boolean=} [loadOnFocus=false] Flag indicating that the source option will be evaluated when the input element
 *    gains focus. The current input value is available as $query.
 * @param {boolean=} [selectFirstMatch=true] Flag indicating that the first match will be automatically selected once
 *    the suggestion list is shown.
 * @param {expression=} [matchClass=NA] Expression to evaluate for each match in order to get the CSS classes to be used.
 *    The expression is provided with the current match as $match, its index as $index and its state as $selected. The result
 *    of the evaluation must be one of the values supported by the ngClass directive (either a string, an array or an object).
 *    See https://docs.angularjs.org/api/ng/directive/ngClass for more information.
 */
tagsInput.directive('autoComplete', ["$document", "$timeout", "$sce", "$q", "tagsInputConfig", "tiUtil", function($document, $timeout, $sce, $q, tagsInputConfig, tiUtil) {
    function SuggestionList(loadFn, options, events) {
        var self = {}, getDifference, lastPromise, getTagId;

        getTagId = function() {
            return options.tagsInput.keyProperty || options.tagsInput.displayProperty;
        };

        getDifference = function(array1, array2) {
            return array1.filter(function(item) {
                return !tiUtil.findInObjectArray(array2, item, getTagId(), function(a, b) {
                    if (options.tagsInput.replaceSpacesWithDashes) {
                        a = tiUtil.replaceSpacesWithDashes(a);
                        b = tiUtil.replaceSpacesWithDashes(b);
                    }
                    return tiUtil.defaultComparer(a, b);
                });
            });
        };

        self.reset = function() {
            lastPromise = null;

            self.items = [];
            self.visible = false;
            self.index = -1;
            self.selected = null;
            self.query = null;
        };
        self.show = function() {
            if (options.selectFirstMatch) {
                self.select(0);
            }
            else {
                self.selected = null;
            }
            self.visible = true;
        };
        self.load = tiUtil.debounce(function(query, tags) {
            self.query = query;

            var promise = $q.when(loadFn({ $query: query }));
            lastPromise = promise;

            promise.then(function(items) {
                if(!items) return
                if (promise !== lastPromise) {
                    return;
                }

                items = tiUtil.makeObjectArray(items.data || items, getTagId());
                items = getDifference(items, tags);
                self.items = items.slice(0, options.maxResultsToShow);

                if (self.items.length > 0) {
                    self.show();
                }
                else {
                    self.reset();
                }
            });
        }, options.debounceDelay);

        self.selectNext = function() {
            self.select(++self.index);
        };
        self.selectPrior = function() {
            self.select(--self.index);
        };
        self.select = function(index) {
            if (index < 0) {
                index = self.items.length - 1;
            }
            else if (index >= self.items.length) {
                index = 0;
            }
            self.index = index;
            self.selected = self.items[index];
            events.trigger('suggestion-selected', index);
        };

        self.reset();

        return self;
    }

    function scrollToElement(root, index) {
        var element = root.find('li').eq(index),
            parent = element.parent(),
            elementTop = element.prop('offsetTop'),
            elementHeight = element.prop('offsetHeight'),
            parentHeight = parent.prop('clientHeight'),
            parentScrollTop = parent.prop('scrollTop');

        if (elementTop < parentScrollTop) {
            parent.prop('scrollTop', elementTop);
        }
        else if (elementTop + elementHeight > parentHeight + parentScrollTop) {
            parent.prop('scrollTop', elementTop + elementHeight - parentHeight);
        }
    }

    return {
        restrict: 'E',
        require: '^tagsInput',
        scope: {
            source: '&',
            matchClass: '&'
        },
        templateUrl: 'ngTagsInput/auto-complete.html',
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
            $scope.events = tiUtil.simplePubSub();

            tagsInputConfig.load('autoComplete', $scope, $attrs, {
                template: [String, 'ngTagsInput/auto-complete-match.html'],
                debounceDelay: [Number, 100],
                minLength: [Number, 3],
                highlightMatchedText: [Boolean, true],
                maxResultsToShow: [Number, 10],
                loadOnDownArrow: [Boolean, false],
                loadOnEmpty: [Boolean, false],
                loadOnFocus: [Boolean, false],
                selectFirstMatch: [Boolean, true],
                displayProperty: [String, '']
            });

            $scope.suggestionList = new SuggestionList($scope.source, $scope.options, $scope.events);

            this.registerAutocompleteMatch = function() {
                return {
                    getOptions: function() {
                        return $scope.options;
                    },
                    getQuery: function() {
                        return $scope.suggestionList.query;
                    }
                };
            };
        }],
        link: function(scope, element, attrs, tagsInputCtrl) {
            var hotkeys = [KEYS.enter, KEYS.tab, KEYS.escape, KEYS.up, KEYS.down],
                suggestionList = scope.suggestionList,
                tagsInput = tagsInputCtrl.registerAutocomplete(),
                options = scope.options,
                events = scope.events,
                shouldLoadSuggestions;

            options.tagsInput = tagsInput.getOptions();

            shouldLoadSuggestions = function(value) {
                return value && value.length >= options.minLength || !value && options.loadOnEmpty;
            };

            scope.templateScope = tagsInput.getTemplateScope();

            scope.addSuggestionByIndex = function(index) {
                suggestionList.select(index);
                scope.addSuggestion();
            };

            scope.addSuggestion = function() {
                var added = false;

                if (suggestionList.selected) {
                    tagsInput.addTag(angular.copy(suggestionList.selected));
                    suggestionList.reset();
                    added = true;
                }
                return added;
            };

            scope.track = function(item) {
                return item[options.tagsInput.keyProperty || options.tagsInput.displayProperty];
            };

            scope.getSuggestionClass = function(item, index) {
                var selected = item === suggestionList.selected;
                return [
                    scope.matchClass({$match: item, $index: index, $selected: selected}),
                    { selected: selected }
                ];
            };

            tagsInput
                .on('tag-added tag-removed invalid-tag input-blur', function() {
                    suggestionList.reset();
                })
                .on('input-change', function(value) {
                    if (shouldLoadSuggestions(value)) {
                        suggestionList.load(value, tagsInput.getTags());
                    }
                    else {
                        suggestionList.reset();
                    }
                })
                .on('input-focus', function() {
                    var value = tagsInput.getCurrentTagText();
                    if (options.loadOnFocus && shouldLoadSuggestions(value)) {
                        suggestionList.load(value, tagsInput.getTags());
                    }
                })
                .on('input-keydown', function(event) {
                    var key = event.keyCode,
                        handled = false;

                    if (tiUtil.isModifierOn(event) || hotkeys.indexOf(key) === -1) {
                        return;
                    }

                    if (suggestionList.visible) {

                        if (key === KEYS.down) {
                            suggestionList.selectNext();
                            handled = true;
                        }
                        else if (key === KEYS.up) {
                            suggestionList.selectPrior();
                            handled = true;
                        }
                        else if (key === KEYS.escape) {
                            suggestionList.reset();
                            handled = true;
                        }
                        else if (key === KEYS.enter || key === KEYS.tab) {
                            handled = scope.addSuggestion();
                        }
                    }
                    else {
                        if (key === KEYS.down && scope.options.loadOnDownArrow) {
                            suggestionList.load(tagsInput.getCurrentTagText(), tagsInput.getTags());
                            handled = true;
                        }
                    }

                    if (handled) {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        return false;
                    }
                });

            events.on('suggestion-selected', function(index) {
                scrollToElement(element, index);
            });
        }
    };
}]);


/**
 * @ngdoc directive
 * @name tiAutocompleteMatch
 * @module ngTagsInput
 *
 * @description
 * Represents an autocomplete match. Used internally by the autoComplete directive.
 */
tagsInput.directive('tiAutocompleteMatch', ["$sce", "tiUtil", function($sce, tiUtil) {
    return {
        restrict: 'E',
        require: '^autoComplete',
        template: '<ng-include src="$$template"></ng-include>',
        scope: {
            $scope: '=scope',
            data: '='
        },
        link: function(scope, element, attrs, autoCompleteCtrl) {
            var autoComplete = autoCompleteCtrl.registerAutocompleteMatch(),
                options = autoComplete.getOptions();

            scope.$$template = options.template;
            scope.$index = scope.$parent.$index;

            scope.$highlight = function(text) {
                if (options.highlightMatchedText) {
                    text = tiUtil.safeHighlight(text, autoComplete.getQuery());
                }
                return $sce.trustAsHtml(text);
            };
            scope.$getDisplayText =  function() {
                return tiUtil.safeToString(scope.data[options.displayProperty || options.tagsInput.displayProperty]);
            };
        }
    };
}]);


/**
 * @ngdoc directive
 * @name tiTranscludeAppend
 * @module ngTagsInput
 *
 * @description
 * Re-creates the old behavior of ng-transclude. Used internally by tagsInput directive.
 */
tagsInput.directive('tiTranscludeAppend', function() {
    return function(scope, element, attrs, ctrl, transcludeFn) {
        transcludeFn(function(clone) {
            element.append(clone);
        });
    };
});

/**
 * @ngdoc directive
 * @name tiAutosize
 * @module ngTagsInput
 *
 * @description
 * Automatically sets the input's width so its content is always visible. Used internally by tagsInput directive.
 */
tagsInput.directive('tiAutosize', ["tagsInputConfig", function(tagsInputConfig) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            var threshold = tagsInputConfig.getTextAutosizeThreshold(),
                span, resize;

            span = angular.element('<span class="input"></span>');
            span.css('display', 'none')
                .css('visibility', 'hidden')
                .css('width', 'auto')
                .css('white-space', 'pre');

            element.parent().append(span);

            resize = function(originalValue) {
                var value = originalValue, width;

                if (angular.isString(value) && value.length === 0) {
                    value = attrs.placeholder;
                }

                if (value) {
                    span.text(value);
                    span.css('display', '');
                    width = span.prop('offsetWidth');
                    span.css('display', 'none');
                }

                element.css('width', width ? width + threshold + 'px' : '');

                return originalValue;
            };

            ctrl.$parsers.unshift(resize);
            ctrl.$formatters.unshift(resize);

            attrs.$observe('placeholder', function(value) {
                if (!ctrl.$modelValue) {
                    resize(value);
                }
            });
        }
    };
}]);

/**
 * @ngdoc directive
 * @name tiBindAttrs
 * @module ngTagsInput
 *
 * @description
 * Binds attributes to expressions. Used internally by tagsInput directive.
 */
tagsInput.directive('tiBindAttrs', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.tiBindAttrs, function(value) {
            angular.forEach(value, function(value, key) {
                attrs.$set(key, value);
            });
        }, true);
    };
});

/**
 * @ngdoc service
 * @name tagsInputConfig
 * @module ngTagsInput
 *
 * @description
 * Sets global configuration settings for both tagsInput and autoComplete directives. It's also used internally to parse and
 *  initialize options from HTML attributes.
 */
tagsInput.provider('tagsInputConfig', function() {
    var globalDefaults = {},
        interpolationStatus = {},
        autosizeThreshold = 3;

    /**
     * @ngdoc method
     * @name tagsInputConfig#setDefaults
     * @description Sets the default configuration option for a directive.
     *
     * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput' or 'autoComplete'.
     * @param {object} defaults Object containing options and their values.
     *
     * @returns {object} The service itself for chaining purposes.
     */
    this.setDefaults = function(directive, defaults) {
        globalDefaults[directive] = defaults;
        return this;
    };

    /**
     * @ngdoc method
     * @name tagsInputConfig#setActiveInterpolation
     * @description Sets active interpolation for a set of options.
     *
     * @param {string} directive Name of the directive to be configured. Must be either 'tagsInput' or 'autoComplete'.
     * @param {object} options Object containing which options should have interpolation turned on at all times.
     *
     * @returns {object} The service itself for chaining purposes.
     */
    this.setActiveInterpolation = function(directive, options) {
        interpolationStatus[directive] = options;
        return this;
    };

    /**
     * @ngdoc method
     * @name tagsInputConfig#setTextAutosizeThreshold
     * @description Sets the threshold used by the tagsInput directive to re-size the inner input field element based on its contents.
     *
     * @param {number} threshold Threshold value, in pixels.
     *
     * @returns {object} The service itself for chaining purposes.
     */
    this.setTextAutosizeThreshold = function(threshold) {
        autosizeThreshold = threshold;
        return this;
    };

    this.$get = ["$interpolate", function($interpolate) {
        var converters = {};
        converters[String] = function(value) { return value; };
        converters[Number] = function(value) { return parseInt(value, 10); };
        converters[Boolean] = function(value) { return value.toLowerCase() === 'true'; };
        converters[RegExp] = function(value) { return new RegExp(value); };

        return {
            load: function(directive, scope, attrs, options) {
                var defaultValidator = function() { return true; };

                scope.options = {};

                angular.forEach(options, function(value, key) {
                    var type, localDefault, validator, converter, getDefault, updateValue;

                    type = value[0];
                    localDefault = value[1];
                    validator = value[2] || defaultValidator;
                    converter = converters[type];

                    getDefault = function() {
                        var globalValue = globalDefaults[directive] && globalDefaults[directive][key];
                        return angular.isDefined(globalValue) ? globalValue : localDefault;
                    };

                    updateValue = function(value) {
                        scope.options[key] = value && validator(value) ? converter(value) : getDefault();
                    };

                    if (interpolationStatus[directive] && interpolationStatus[directive][key]) {
                        attrs.$observe(key, function(value) {
                            updateValue(value);
                            scope.events.trigger('option-change', { name: key, newValue: value });
                        });
                    }
                    else {
                        updateValue(attrs[key] && $interpolate(attrs[key])(scope.$parent));
                    }
                });
            },
            getTextAutosizeThreshold: function() {
                return autosizeThreshold;
            }
        };
    }];
});


/***
 * @ngdoc service
 * @name tiUtil
 * @module ngTagsInput
 *
 * @description
 * Helper methods used internally by the directive. Should not be called directly from user code.
 */
tagsInput.factory('tiUtil', ["$timeout", "$q", function($timeout, $q) {
    var self = {};

    self.debounce = function(fn, delay) {
        var timeoutId;
        return function() {
            var args = arguments;
            $timeout.cancel(timeoutId);
            timeoutId = $timeout(function() { fn.apply(null, args); }, delay);
        };
    };

    self.makeObjectArray = function(array, key) {
        if (!angular.isArray(array) || array.length === 0 || angular.isObject(array[0])) {
            return array;
        }

        var newArray = [];
        array.forEach(function(item) {
            var obj = {};
            obj[key] = item;
            newArray.push(obj);
        });
        return newArray;
    };

    self.findInObjectArray = function(array, obj, key, comparer) {
        var item = null;
        comparer = comparer || self.defaultComparer;

        array.some(function(element) {
            if (comparer(element[key], obj[key])) {
                item = element;
                return true;
            }
        });

        return item;
    };

    self.defaultComparer = function(a, b) {
        // I'm aware of the internationalization issues regarding toLowerCase()
        // but I couldn't come up with a better solution right now
        return self.safeToString(a).toLowerCase() === self.safeToString(b).toLowerCase();
    };

    self.safeHighlight = function(str, value) {
        str = self.encodeHTML(str);
        value = self.encodeHTML(value);

        if (!value) {
            return str;
        }

        function escapeRegexChars(str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
        }

        var expression = new RegExp('&[^;]+;|' + escapeRegexChars(value), 'gi');
        return str.replace(expression, function(match) {
            return match.toLowerCase() === value.toLowerCase() ? '<em>' + match + '</em>' : match;
        });
    };

    self.safeToString = function(value) {
        return angular.isUndefined(value) || value == null ? '' : value.toString().trim();
    };

    self.encodeHTML = function(value) {
        return self.safeToString(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    self.handleUndefinedResult = function(fn, valueIfUndefined) {
        return function() {
            var result = fn.apply(null, arguments);
            return angular.isUndefined(result) ? valueIfUndefined : result;
        };
    };

    self.replaceSpacesWithDashes = function(str) {
        return self.safeToString(str).replace(/\s/g, '-');
    };

    self.isModifierOn = function(event) {
        return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
    };

    self.promisifyValue = function(value) {
        value = angular.isUndefined(value) ? true : value;
        return $q[value ? 'when' : 'reject']();
    };

    self.simplePubSub = function() {
        var events = {};
        return {
            on: function(names, handler, first) {
                names.split(' ').forEach(function(name) {
                    if (!events[name]) {
                        events[name] = [];
                    }
                    var method = first ? [].unshift : [].push;
                    method.call(events[name], handler);
                });
                return this;
            },
            trigger: function(name, args) {
                var handlers = events[name] || [];
                handlers.every(function(handler) {
                    return self.handleUndefinedResult(handler, true)(args);
                });
                return this;
            }
        };
    };

    return self;
}]);


/* HTML templates */
tagsInput.run(["$templateCache", function($templateCache) {
    $templateCache.put('ngTagsInput/tags-input.html',
    "<div class=\"host\" tabindex=\"-1\" ng-click=\"eventHandlers.host.click()\" ti-transclude-append><div class=\"tags\" ng-class=\"{focused: hasFocus}\"><ul class=\"tag-list\"><li class=\"tag-item\" ng-repeat=\"tag in tagList.items track by track(tag)\" ng-class=\"getTagClass(tag, $index)\" ng-click=\"eventHandlers.tag.click(tag)\"><ti-tag-item scope=\"templateScope\" data=\"::tag\"></ti-tag-item></li></ul><input class=\"input\" autocomplete=\"off\" ng-model=\"newTag.text\" ng-model-options=\"{getterSetter: true}\" ng-keydown=\"eventHandlers.input.keydown($event)\" ng-focus=\"eventHandlers.input.focus($event)\" ng-blur=\"eventHandlers.input.blur($event)\" ng-paste=\"eventHandlers.input.paste($event)\" ng-trim=\"false\" ng-class=\"{'invalid-tag': newTag.invalid}\" ng-disabled=\"disabled\" ti-bind-attrs=\"{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}\" ti-autosize></div></div>"
  );

  $templateCache.put('ngTagsInput/tag-item.html',
    "<span ng-bind=\"$getDisplayText()\"></span> <a class=\"remove-button\" ng-click=\"$removeTag()\" ng-bind=\"::$$removeTagSymbol\"></a>"
  );

  $templateCache.put('ngTagsInput/auto-complete.html',
    "<div class=\"autocomplete\" ng-if=\"suggestionList.visible\"><ul class=\"suggestion-list\"><li class=\"suggestion-item\" ng-repeat=\"item in suggestionList.items track by track(item)\" ng-class=\"getSuggestionClass(item, $index)\" ng-click=\"addSuggestionByIndex($index)\" ng-mouseenter=\"suggestionList.select($index)\"><ti-autocomplete-match scope=\"templateScope\" data=\"::item\"></ti-autocomplete-match></li></ul></div>"
  );

  $templateCache.put('ngTagsInput/auto-complete-match.html',
    "<span ng-bind-html=\"$highlight($getDisplayText())\"></span>"
  );
}]);

}());


//# sourceURL=nginput.js

/**
 * @description keywords directive
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 */
var formApp = angular.module('org.ekstep.metadataform', ['ngTagsInput']);

formApp.directive('keywords', function() {
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");

    var keywordController = ['$scope', '$controller', function($scope, $controller) {
        $scope.contentMeta = $scope.$parent.contentMeta
        $scope.fieldConfig = $scope.config;
        $scope.cacheKeywords = {};
        $scope.loadKeywords = function($query) {
            if ($query.length >= 3) {
                return $scope.fetchKeywords($query).then(function(keywords) {
                    return keywords.filter(function(keyword) {
                        return keyword.lemma.toLowerCase().indexOf($query.toLowerCase()) != -1;
                    });
                })
            }
        };

        $scope.fetchKeywords = function($query) {
            return new Promise(function(resolve, reject) {
                var keyword = $scope.isKeywordExists($query);
                if (!keyword.isPresent) {
                    var requestData = {
                        "request": {
                            "text": $query,
                            "limit": 100,
                        }
                    }
                    if (ecEditor.getConfig('keywordsLimit')) {
                        requestData.request.limit = ecEditor.getConfig('keywordsLimit');
                    }
                    org.ekstep.services.metaService.suggestVocabulary(requestData, function(err, resp) {
                        if (resp) {
                            if (resp.data.result.terms) {
                                var result = {};
                                result[$query] = _.uniqBy(resp.data.result.terms, 'lemma');
                                $scope.storeKeywords(result);
                                resolve(result[$query]);
                            }
                        } else {
                            reject(false)
                        }
                    })
                } else {
                    resolve(keyword.value);
                }
            });
        };
        $scope.storeKeywords = function(data) {
            var instance = this;
            var items = $scope.cacheKeywords['collection_editor']
            if (items) {
                _.forEach(items, function(value, key) {
                    data[key] = value;
                })
            }
            $scope.cacheKeywords['collection_editor'] = data;
        };
        $scope.isKeywordExists = function($query) {
            var instance = this;
            var keywords = {}
            var obj = $scope.cacheKeywords['collection_editor'];
            if (obj) {
                _.forEach(obj, function(value, key) {
                    if (_.includes(key, $query)) {
                        keywords.isPresent = true;
                        keywords.value = value;
                    }
                });
            }
            return keywords
        }

    }]
    return {
        restrict: "EA",
        templateUrl: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/keywords/template.html"),
        controller: keywordController,
        transclude: true,
        scope: {
            config: "="
        },
    };
});

//# sourceURL=keywordDirective.js
/**
 * @description concept selector directive
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 */

formApp.directive('conceptselector', function() {
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");

    var conceptController = ['$scope', '$rootScope', '$controller', function($scope, $rootScope, $controller) {
        var selectedConcepts = [];
        $scope.contentMeta = $scope.$parent.contentMeta;
        $scope.conceptSelectorMessage = $scope.contentMeta.concepts ? '(' + $scope.contentMeta.concepts.length + ') concepts selected' : '(0) concepts selected'
        $scope.fieldConfig = $scope.config;
        if ($scope.contentMeta.concepts) {
            if ($scope.contentMeta.concepts.length)
                _.forEach($scope.contentMeta.concepts, function(concept) {
                    selectedConcepts.push(concept.identifier);
                });
        }
        $scope.templateId = (!_.isUndefined($scope.$parent.$parent.tempalteName)) ? $scope.$parent.$parent.tempalteName : 'metaform';
        $scope.conceptElementId = $scope.templateId + '-concept';
        $scope.invokeConceptSelector = function() {
            ecEditor.addEventListener('editor.concept.change', $scope.resetConcepts, this);
            ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
                element: $scope.conceptElementId,
                selectedConcepts: selectedConcepts,
                callback: $scope.callbackFn
            });
        }
        $scope.callbackFn = function(data) {
            console.log("Length", data)
            $scope.conceptSelectorMessage = '(' + data.length + ') concepts selected';
            $scope.contentMeta.concepts = _.map(data, function(concept) {
                return {
                    "identifier": concept.id,
                    "name": concept.name
                };
            });
            ecEditor.dispatchEvent('editor:form:change', {key: 'concepts', value: $scope.contentMeta.concepts, templateId: $scope.templateId});
            $rootScope.$safeApply();
        }
        $scope.resetConcepts = function(event, data){
            if(data.key == 'concepts' && data.value.length == 0){
                $scope.conceptSelectorMessage = '(0) concpets selected';
                $scope.contentMeta.concepts = [];

                ecEditor.dispatchEvent('org.ekstep.conceptselector:init', {
                    element: $scope.conceptElementId,
                    selectedConcepts: [],
                    callback: $scope.callbackFn
                });
                $rootScope.$safeApply();
            }    
        }
        $scope.invokeConceptSelector()
    }]
    return {
        restrict: "EA",
        templateUrl: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/conceptselector/template.html"),
        controller: conceptController,
        scope: {
            config: '='
        },
        transclude: true

    };
});

//# sourceURL=conceptDirective.js
/**
 * @description topic selector directive
 * @author Gourav More <gourav_m@tekditechnologies.com>
 */
formApp.directive('topicSelector', function() {
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");
    var topicController = ['$scope', '$rootScope', '$controller', '$timeout', function($scope, $rootScope, $controller, $timeout) {
        $scope.contentMeta = $scope.$parent.contentMeta;
        $scope.topicSelectorMessage = $scope.contentMeta.topic ? '(' + $scope.contentMeta.topic.length + ') topics selected' : '(0) topics selected';
        /**Added for more than one topic selector on same page, element id should be unique as per template **/
        $scope.framework = ($scope.$parent.$parent.tempalteName == "resourceFilterTemplate") ? ecEditor.getContext('resource_framework') : ecEditor.getContext('framework');
        $scope.templateId = (!_.isUndefined($scope.$parent.$parent.tempalteName)) ? $scope.$parent.$parent.tempalteName : 'metaform';
        $scope.topicElementId = $scope.templateId + '-topic';
        $scope.invokeTopicSelector = function() {
            ecEditor.addEventListener('editor.topic.change', $scope.resetTopics, this);
            ecEditor.dispatchEvent('org.ekstep.topicselector:init', {
                element: $scope.topicElementId,
                selectedTopics: $scope.contentMeta.topic || [],
                isCategoryDependant : true,
                callback: $scope.callbackFn,
                framework: $scope.framework
            });
        }
        $scope.callbackFn = function(data) {
            console.log("Length", data)
            $scope.topicSelectorMessage = '(' + data.length + ') topics selected';
            $scope.contentMeta.topic = _.map(data, function(topic) {
                return  topic.name;
            });
            $scope.$parent.onConfigChange({target: "#"+$scope.templateId, field:$scope.$parent.$parent.dynamicField, form:$scope.$parent.$parent.metaForm, value: $scope.contentMeta.topic})
            ecEditor.dispatchEvent('editor:form:change', {key: 'topic', value: $scope.contentMeta.topic, templateId: $scope.templateId});
            $rootScope.$safeApply();
        }
        $scope.resetTopics = function(event, data){
            if(data.key == 'topic' && data.value.length == 0){
                $scope.topicSelectorMessage = '(0) topics selected';
                $scope.contentMeta.topic = [];

                ecEditor.dispatchEvent('org.ekstep.topicselector:init', {
                    element: $scope.topicElementId,
                    selectedTopics: [],
                    isCategoryDependant : true,
                    callback: $scope.callbackFn
                });
                $rootScope.$safeApply();
            }    
        }
        $timeout(function(){
            $scope.invokeTopicSelector()
        }, 0);           
    }]
    return {
        restrict: "EA",
        templateUrl: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/topicselector/template.html"),
        controller: topicController,
        scope: {
            config: '='
        },
        transclude: true
    };
});

//# sourceURL=topicDirective.js
/**
 * @description - year directive
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 */

formApp.directive('year', function() {
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");

    var yearDropdownController = ['$scope', '$controller', function($scope, $controller) {
        $scope.years = [];
        $scope.contentMeta = $scope.$parent.contentMeta;
        $scope.fieldConfig = $scope.config;

        $scope.initYearDropDown = function() {
            $scope.currentYear = new Date().getFullYear();
            const FROM_YEAR_INDEX = 15;
            const TO_YEAR_INDEX = 5;
            $scope.fromYear = $scope.currentYear - FROM_YEAR_INDEX;
            $scope.toYear = $scope.currentYear + TO_YEAR_INDEX;
            for (var i = $scope.fromYear; i < $scope.toYear; i++) {
                $scope.years.push(i);
            }
        }
        $scope.initYearDropDown();
    }]
    return {
        restrict: "EA",
        templateUrl: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/year/template.html"),
        transclude: true,
        scope: {
            config: "="
        },
        controller: yearDropdownController

    };
});

//# sourceURL=yearDirective.js;
window.formConfigurations = {
  "templateName": "defaultTemplate",
  "action": "save",
  "fields": [{
    "code": "name",
    "dataType": "text",
    "description": "Title of the content",
    "editable": true,
    "inputType": "text",
    "label": "Title",
    "name": "Title",
    "placeholder": "Enter the Title ",
    "renderingHints": {},
    "required": false,
    "visible": true
  },
   
    {
      "code": "description",
      "dataType": "text",
      "description": "Brief description",
      "editable": true,
      "inputType": "textarea",
      "label": "Description",
      "name": "Description",
      "placeholder": "Description",
      "renderingHints": {},
      "required": false,
      "visible": true
    },
    {
      "code": "keywords",
      "dataType": "list",
      "description": "Keywords for the content",
      "editable": true,
      "inputType": "keywordsuggestion",
      "label": "keywords",
      "name": "Keywords",
      "placeholder": "Enter Keywords",
      "required": false,
      "visible": true
    },
    {
      "code": "appicon",
      "dataType": "url",
      "description": "App Icon",
      "editable": true,
      "index": 6,
      "inputType": "file",
      "label": "App Icon",
      "name": "App Icon",
      "placeholder": "App Icon",
      "renderingHints": {},
      "required": false,
      "visible": true
    },

    {
      "code": "board",
      "dataType": "text",
      "depends": [
        "gradeLevel"
      ],
      "description": "Curriculum",
      "editable": true,
      "index": 0,
      "inputType": "select",
      "label": "Curriculum",
      "name": "Curriculum",
      "placeholder": "Select Curriculum",
      "renderingHints": {},
      "required": true,
      "visible": true
    },
    {
      "code": "subject",
      "dataType": "text",
      "description": "",
      "editable": true,
      "index": 2,
      "inputType": "select",
      "label": "Subject",
      "name": "Subject",
      "placeholder": "Select Subject",
      "renderingHints": {},
      "required": true,
      "visible": true
    },
    {
      "code": "medium",
      "dataType": "text",
      "description": "",
      "editable": true,
      "index": 3,
      "inputType": "select",
      "label": "medium",
      "name": "medium",
      "placeholder": "Curriculum",
      "renderingHints": {},
      "required": true,
      "visible": true
    },
    {
      "code": "gradeLevel",
      "dataType": "list",
      "depends": [
        "subject"
      ],
      "description": "Class",
      "editable": true,
      "index": 1,
      "inputType": "multiselect",
      "label": "Class",
      "name": "Class",
      "placeholder": "Select Class",
      "renderingHints": {},
      "required": true,
      "visible": true
    },
    {
      "code": "year",
      "dataType": "text",
      "description": "",
      "editable": true,
      "index": 4,
      "inputType": "select",
      "label": "Year",
      "name": "Year",
      "placeholder": "Select Year",
      "renderingHints": {},
      "required": false,
      "visible": true
    },
    {
      "code": "license",
      "dataType": "text",
      "description": "License of the content",
      "editable": true,
      "index": 3,
      "inputType": "licenses",
      "label": "license",
      "name": "license",
      "placeholder": "license",
      "renderingHints": {},
      "required": true,
      "visible": true
    },
    {
      "code": "dialcode",
      "dataType": "text",
      "description": "",
      "editable": true,
      "index": 4,
      "inputType": "dialcode",
      "label": "dialcode",
      "name": "dialcode",
      "placeholder": "Select Year",
      "renderingHints": {},
      "required": true,
      "visible": true
    },
    {
      "code": "publisher",
      "dataType": "text",
      "description": "Publication",
      "editable": true,
      "index": 5,
      "inputType": "text",
      "label": "Publisher",
      "name": "Publisher",
      "placeholder": "Publication",
      "renderingHints": {},
      "required": false,
      "visible": true
    },
    {
      "code": "phone",
      "dataType": "text",
      "description": "Publication",
      "editable": true,
      "index": 5,
      "inputType": "number",
      "label": "Phone",
      "name": "Publisher",
      "placeholder": "Contact number",
      "renderingHints": {},
      "required": false,
      "visible": true
    },
    {
      "code": "topic",
      "dataType": "list",
      "description": "Choose a topic",
      "editable": true,
      "inputType": "topicselector",
      "label": "Topics",
      "name": "Topics",
      "placeholder": "Choose Topics",
      "renderingHints": {},
      "required": false,
      "visible": true
    }
  ]
};
window.formConfigs = {
  filterMetaDataTemplate: {
    "action": "question-filter-view",
    "templateName": "filterMetaDataTemplate",
    "fields": [
      {
        "code": "searchText",
        "dataType": "text",
        "description": " by question title",
        "editable": true,
        "inputType": "text",
        "label": "Search",
        "name": "Search",
        "index": 0,
        "placeholder": "Search by question title",
        "renderingHints": {},
        "required": false,
        "visible": true
      },
      {
        "code": "medium",
        "dataType": "text",
        "description": "",
        "editable": true,
        "index": 1,
        "inputType": "select",
        "label": "Language",
        "name": "medium",
        "placeholder": "Select Language",
        "renderingHints": {},
        "required": false,
        "visible": true
      },
      {
        "code": "level",
        "dataType": "text",
        "description": "Add Notes",
        "editable": true,
        "index": 2,
        "inputType": "select",
        "label": "Difficulty",
        "name": "level",
        "placeholder": "Select Level",
        "range": [
          "EASY",
          "MEDIUM",
          "DIFFICULT"
        ],
        "renderingHints": {},
        "required": false,
        "visible": true
      },
      {
        "code": "questionType",
        "dataType": "list",
        "description": "Class",
        "editable": true,
        "index": 3,
        "inputType": "multiselect",
        "label": "Question Type",
        "name": "Question Type",
        "placeholder": "Question Type",
        "range": [
          "Multiple Choice Questions",
          "Fill in the Blanks",
          "Match the Following"
        ],
        "renderingHints": {},
        "required": false,
        "visible": true
      },
      {
        "code": "gradeLevel",
        "dataType": "list",
        "description": "Class",
        "editable": true,
        "index": 4,
        "inputType": "multiselect",
        "label": "Grade Level",
        "name": "Class",
        "placeholder": "Select Class",
        "renderingHints": {},
        "required": false,
        "visible": true
      },
      {
        "code": "concepts",
        "dataType": "list",
        "description": "Choose a concept",
        "editable": true,
        "inputType": "conceptselector",
        "label": "Concepts",
        "name": "Concepts",
        "placeholder": "Choose Concepts",
        "renderingHints": {},
        "required": false,
        "visible": true,
        "index": 5
      },
      {
        "code": "myQuestions",
        "dataType": "toggle",
        "description": "My Questions",
        "editable": true,
        "inputType": "checkbox",
        "label": "My Questions",
        "name": "My Questions",
        "placeholder": "My Questions",
        "renderingHints": {},
        "required": false,
        "visible": true,
        "index": 6
      }
    ]
  },
  questionMetaDataTemplate: {
    "action": "question-meta-save",
    "templateName": "questionMetaDataTemplate",
    "fields": [
      {
        "code": "name",
        "dataType": "text",
        "description": "Title of the question",
        "editable": true,
        "inputType": "text",
        "label": "Title",
        "name": "Title",
        "index": 0,
        "placeholder": "Enter the Title",
        "renderingHints": {},
        "required": true,
        "visible": true
      },
      {
        "code": "medium",
        "dataType": "text",
        "description": "",
        "editable": true,
        "index": 1,
        "inputType": "select",
        "label": "Medium",
        "name": "medium",
        "placeholder": "Select Medium",
        "renderingHints": {},
        "required": true,
        "visible": true
      },
      {
        "code": "level",
        "dataType": "text",
        "description": "Add Notes",
        "editable": true,
        "index": 2,
        "inputType": "select",
        "label": "Level",
        "name": "level",
        "placeholder": "Select Level",
        "range": [
          "EASY",
          "MEDIUM",
          "DIFFICULT"
        ],
        "renderingHints": {},
        "required": true,
        "visible": true
      },
      {
        "code": "gradeLevel",
        "dataType": "list",
        "description": "Class",
        "editable": true,
        "index": 3,
        "inputType": "multiselect",
        "label": "Grade Level",
        "name": "Class",
        "placeholder": "Select Grade",
        "renderingHints": {},
        "required": true,
        "visible": true
      },
      {
        "code": "subject",
        "dataType": "text",
        "description": "Add subjects",
        "editable": true,
        "index": 4,
        "inputType": "select",
        "label": "Subject",
        "name": "subject",
        "placeholder": "Select Subject",
        "renderingHints": {},
        "required": true,
        "visible": true
      },
      {
        "code": "board",
        "dataType": "text",
        "description": "board",
        "editable": true,
        "index": 5,
        "inputType": "select",
        "label": "Board",
        "name": "Board",
        "placeholder": "Select Board",
        "renderingHints": {},
        "required": true,
        "visible": true
      },
      {
        "code": "max_score",
        "dataType": "text",
        "description": "",
        "editable": true,
        "index": 6,
        "inputType": "number",
        "label": "Max Score",
        "name": "max_score",
        "placeholder": "Enter the Max Score",
        "renderingHints": {},
        "required": true,
        "visible": true,
        "validation": [
          {
            "type": "min",
            "value": "1",
            "message": ""
          }
        ]
      },
      {
        "code": "concepts",
        "dataType": "list",
        "description": "Choose a concept",
        "editable": true,
        "inputType": "conceptselector",
        "label": "Concepts",
        "name": "Concepts",
        "placeholder": "Choose Concepts",
        "renderingHints": {},
        "required": true,
        "visible": true,
        "index": 7
      },
      {
        "code": "description",
        "dataType": "text",
        "description": "Brief description",
        "editable": true,
        "inputType": "textarea",
        "label": "Description",
        "name": "Description",
        "placeholder": "Enter the Description",
        "renderingHints": {},
        "required": false,
        "visible": true,
        "index": 8
      }/*,
      {
        "code": "topic",
        "dataType": "list",
        "description": "Choose a topics",
        "editable": true,
        "index": 9,
        "inputType": "topicselector",
        "label": "Topic",
        "name": "Topic",
        "placeholder": "Choose Topics",
        "renderingHints": {},
        "required": false,
        "visible": true
      }*/
    ]
  },
  filterLessonDataTemplate: {
    "action": "resource-filters",
    "templateName": "resourceFilterTemplate",
    "fields": [
        {
            "code": "contentType",
            "dataType": "list",
            "description": "Category",
            "editable": true,
            "index": 1,
            "inputType": "multiselect",
            "label": "contentType",
            "name": "contentType",
            "placeholder": "Select contentType",
            "renderingHints": {},
            "required": false,
            "range": [
              "Resource",
              "Collection",
              "Content"
            ],
            "visible": true
        },
        {
            "code": "board",
            "dataType": "text",
            "description": "Curriculum",
            "editable": true,
            "index": 2,
            "inputType": "select",
            "label": "Curriculum",
            "name": "Curriculum",
            "placeholder": "Select Curriculum",
            "renderingHints": {},
            "required": false,
            "visible": true
        },
        {
            "code": "gradeLevel",
            "dataType": "list",
            "description": "Class",
            "editable": true,
            "index": 3,
            "inputType": "multiselect",
            "label": "Class",
            "name": "Class",
            "placeholder": "Select Class",
            "renderingHints": {},
            "required": false,
            "visible": true
        },
        {
            "code": "subject",
            "dataType": "text",
            "description": "",
            "editable": true,
            "index": 4,
            "inputType": "select",
            "label": "Subject",
            "name": "Subject",
            "placeholder": "Select Subject",
            "renderingHints": {},
            "required": false,
            "visible": true
        },
        {
            "code": "medium",
            "dataType": "text",
            "description": "",
            "editable": true,
            "index": 5,
            "inputType": "select",
            "label": "Medium",
            "name": "medium",
            "placeholder": "Select Medium",
            "renderingHints": {},
            "required": false,
            "visible": true
        },
        {
            "code": "topic",
            "dataType": "list",
            "description": "Choose a Topics",
            "editable": true,
            "index": 6,
            "inputType": "topicselector",
            "label": "Topics",
            "name": "Topic",
            "placeholder": "Choose Topics",
            "renderingHints": {},
            "required": false,
            "visible": true
        }
    ]
  }
};
/**
 * @description Appicon directive
 * @author Manjunath Davanam <manjunathd@ilimi.in>
 */

formApp.directive('appIcon', function() {
    const ASSETBROWSER_SHOW_EVENT = 'org.ekstep.assetbrowser:show';
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");

    var appIconController = ['$scope', '$controller', function($scope, $controller) {
        $scope.contentMeta.appIcon = $scope.contentMeta.appIcon || undefined;
        $scope.appIconConfig = {}
        $scope.invokeAssetBrowser = function() {
            ecEditor.dispatchEvent(ASSETBROWSER_SHOW_EVENT, {
                type: 'image',
                search_filter: {},
                callback: function(data) {
                    $scope.contentMeta.appIcon = data.assetMedia.src;
                }
            });
        }

        $scope.configureAppIcon = function() {
            _.forEach($scope.fixedLayoutConfigurations, function(key, value) {
                if (key.inputType == 'file') {
                    $scope.appIconConfig = key;
                }
            })
        };
        $scope.configureAppIcon();
    }]
    return {
        restrict: "EA",
        templateUrl: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/appIcon/template.html"),
        controller: appIconController

    };
});

//# sourceURL=appIconDirective.js

/**
 * @author ManjunathDavanam 
 */


/**
 * @description         - Which removes the lemma keyword form the object
 */
function getArrayOfKeywords(keys) {
    return keys.map(function(a) {
        return a.lemma ? a.lemma : a
    })
};

function invokeDialCode() {
    if (ecEditor.jQuery("#collection-tree").length) {
        var configurations = {
            data: ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild(),
            contentId: org.ekstep.contenteditor.api.getContext('contentId')
        }
        ecEditor.dispatchEvent("editor:metadata:update:dialcode", configurations)
    }
}

/**
 * @description         - Which is used to convert to data to target data type format
 */
function convertToDataType(targetType, data) {
    switch (targetType.toUpperCase()) {
        case 'LIST':
            return _.isString(data) ? data.split(",") : data;
            break;
        case 'TEXT':
            return (_.isArray(data) || _.isNumber(data)) ? data.toString() : data;
            break;
        case 'BOOLEAN':
                return typeof data === 'string'  ? ( data === 'false' ? false : true) : data;
                break;
    }
}

/**
 * 
 * @description                 - Which is used to update the field data type values
 * @param {*} selectedFields 
 * @param {*} configurations 
 */
function getUpdateDataType(selectedFields, configurations) {
    var result = undefined;
    _.forEach(configurations, function(configureValue, configureKey) {
        _.forEach(selectedFields, function(selectedValue, selectedKey) {
            if (configureValue.code === selectedKey) {
                result = convertToDataType(configureValue.dataType, selectedValue);
                !_.isUndefined(result) && (selectedFields[selectedKey] = result);
            }
        })
    })
    return selectedFields
}

/**
 * 
 * @param {*} data 
 */
function logTelemetry(data, plugin) {
    ecEditor.getService('telemetry').interact({
        "type": data.type || "click",
        "subtype": data.subtype,
        "target": data.target,
        "pluginid": plugin.id,
        "pluginver": plugin.ver,
        "objectid": data.objectid || "",
        "targetid": data.targetid || "",
        "stage": data.stage || ecEditor.getCurrentStage().id
    })
}

function difference(object, base) {
    function changes(object, base) {
        return _.transform(object, function(result, value, key) {
            if (!_.isEqual(value, base[key])) {
                result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
}

function getUpdatedMetadata(currentMetadata, originalMetadata, fields) {
    var metadata = {};
    if (_.isEmpty(originalMetadata)) {
        _.forEach(currentMetadata, function(value, key) {
            metadata[key] = value;
        });
    } else {
        _.forEach(currentMetadata, function(value, key) {
            if (_.isUndefined(originalMetadata[key])) {
                metadata[key] = value;
            } else if (value != originalMetadata[key]) {
                metadata[key] = value;
            }
        });
    }
    if (metadata.keywords) {
        metadata.keywords = getArrayOfKeywords(metadata.keywords);
    }
    // Passing mandatory fields when save is invoked
    !metadata['name'] && (metadata['name'] = originalMetadata['name']);
    !metadata['contentType'] && (metadata['contentType'] = originalMetadata['contentType']);
    !metadata['mimeType'] && (metadata['mimeType'] = originalMetadata['mimeType']);
    return getUpdateDataType(metadata, fields)
}

//# sourceURL=metaDataUtil.js
/**
 * @description DIAL code directive
 * @author Archana Baskaran<archana.b@latitudefintech.com>
 */
angular.module('editorApp', ['ngDialog', 'oc.lazyLoad', 'Scope.safeApply']).directive('dialcode', function() {
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");

    template = ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/dialCode/template.html")
    var dialCodeController = ['$scope', '$controller', '$filter', function($scope, $controller, $filter) {
        $scope.mode = ecEditor.getConfig('editorConfig').mode;
        $scope.contentMeta = ecEditor.getService('content').getContentMeta(org.ekstep.contenteditor.api.getContext('contentId'));
        $scope.maxChar = 6;
        $scope.minChar = 0;
        $scope.editFlag = false;
        $scope.errorMessage = "";
        $scope.status = true;

    var stateService = org.ekstep.services.stateService;  

        $scope.searchDialCode = function(dialcode, callback){
            var channel = ecEditor.getContext('channel');
            var reqObj = {
                "request": {
                    "search": {
                        "identifier": dialcode
                    }
                }
            };
            ecEditor.getService('dialcode').getAllDialCodes(channel, reqObj, function(err, res) {
                if (!err) {
                    if (res.data.result.count){
                        ecEditor._.uniq(org.ekstep.services.collectionService.dialcodeList.push(res.data.result.dialcodes[0].identifier));
                        callback && callback({ isValid:true, dialcode:res.data.result.dialcodes });
                    } else{
                        callback && callback({ isValid:false, dialcode:undefined });
                    }
                }else{
                    console.error('Invalid QR Code!', err);
                }
            });
        }

        // validate the dialCode
        $scope.validateDialCode = function() {
            var instance = this;
            if (String(this.dialcodes).match(/^[A-Z0-9]{2,}$/)) {
                $scope.errorMessage = "";
                var node = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
                if (org.ekstep.collectioneditor.cache.nodesModified && org.ekstep.collectioneditor.cache.nodesModified[node.data.id]) {
                    org.ekstep.collectioneditor.cache.nodesModified[node.data.id].metadata["dialcodes"] = this.dialcodes;
                }
                if (ecEditor._.indexOf(org.ekstep.services.collectionService.dialcodeList, this.dialcodes) != -1) {
                    $scope.status = true;
                    _.has(stateService.state.invaliddialCodeMap, node.data.id) ? _.unset(stateService.state.invaliddialCodeMap, node.data.id) : "";
                    if ($scope.contentMeta.mimeType == 'application/vnd.ekstep.content-collection') {
                        if (!stateService.state.dialCodeMap) {
                            stateService.create('dialCodeMap');
                        }
                        stateService.setState('dialCodeMap', node.data.id, this.dialcodes);
                    }
                    $scope.editFlag = true;
                    ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
                }else{
                    $scope.searchDialCode(this.dialcodes, function(response){
                        if(response.isValid){
                            $scope.status = response.isValid;
                            _.has(stateService.state.invaliddialCodeMap, node.data.id) ? _.unset(stateService.state.invaliddialCodeMap, node.data.id) : "";
                            if ($scope.contentMeta.mimeType == 'application/vnd.ekstep.content-collection') {
                                if (!stateService.state.dialCodeMap) {
                                    stateService.create('dialCodeMap');
                                }
                                stateService.setState('dialCodeMap', node.data.id, instance.dialcodes);
                            }
                            $scope.editFlag = true;
                            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
                            $scope.$safeApply();
                        }else{
                            if (!stateService.state.invaliddialCodeMap) {
                                stateService.create('invaliddialCodeMap');
                            }
                            _.has(stateService.state.dialCodeMap, node.data.id) ? _.unset(stateService.state.dialCodeMap, node.data.id) : "";
                            stateService.setState('invaliddialCodeMap', node.data.id, instance.dialcodes);
                            $scope.status = response.isValid;
                            $scope.editFlag = true;
                            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
                            $scope.$safeApply();
                        }
                    });
                }
            } else {
                $scope.editFlag = false;
                $scope.errorMessage = "Please enter valid QR code";
            }
        }

        // dialCode edit 
        $scope.editDialCode = function() {
            $scope.editFlag = false;
        }

        // clear dial code values
        $scope.clearDialCode = function () {
            $scope.dialcodes = "";
            var currentNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild().data;
            _.has(stateService.state.invaliddialCodeMap, currentNode.id) ? _.unset(stateService.state.invaliddialCodeMap, currentNode.id) : "";
            _.has(stateService.state.dialCodeMap, currentNode.id) ? _.unset(stateService.state.dialCodeMap, currentNode.id) : "";
            if(currentNode.metadata && currentNode.metadata.dialcodes && currentNode.metadata.dialcodes.length){
                if (org.ekstep.collectioneditor.cache.nodesModified && org.ekstep.collectioneditor.cache.nodesModified[currentNode.id]) {
                    org.ekstep.collectioneditor.cache.nodesModified[currentNode.id].metadata["dialcodes"] = [];
                }
                if (!stateService.state.dialCodeMap) {
                    stateService.create('dialCodeMap');
                }
                stateService.setState('dialCodeMap', currentNode.id, "");
            }
            ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
        }

        $scope.changeDialCode = function () {
            var currentNode = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild().data;
            if(_.isEmpty(this.dialcodes)) {
                $scope.errorMessage = "";
                $scope.editFlag = false;
                _.has(stateService.state.invaliddialCodeMap, currentNode.id) ? _.unset(stateService.state.invaliddialCodeMap, currentNode.id) : "";
                _.has(stateService.state.dialCodeMap, currentNode.id) ? _.unset(stateService.state.dialCodeMap, currentNode.id) : "";
                if(currentNode.metadata && currentNode.metadata.dialcodes && currentNode.metadata.dialcodes.length){
                    if (org.ekstep.collectioneditor.cache.nodesModified && org.ekstep.collectioneditor.cache.nodesModified[currentNode.id]) {
                        org.ekstep.collectioneditor.cache.nodesModified[currentNode.id].metadata["dialcodes"] = [];
                    }
                    if (!stateService.state.dialCodeMap) {
                        stateService.create('dialCodeMap');
                    }
                    stateService.setState('dialCodeMap', currentNode.id, "");
                    ecEditor.dispatchEvent('org.ekstep.collectioneditor:node:modified');
                }
            } else {
                $scope.editFlag = false;
                $scope.errorMessage = (this.dialcodes.length && !String(this.dialcodes).match(/^[A-Z0-9]{6}$/)) ? "Please enter valid QR code" : "";
            }    
        }

        $scope.init = function () {
            if (ecEditor.jQuery("#collection-tree").length) {
                var configurations = {
                    data: ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild(),
                    contentId: org.ekstep.contenteditor.api.getContext('contentId')
                }
                $scope.updateDialCode(configurations);
            }
            // ecEditor.addEventListener("editor:dialcode:get", $scope.getCurrentDialCode, $scope);
            // ecEditor.addEventListener("editor:metadata:update:dialcode", $scope.updateDialCode);
        }

        $scope.updateDialCode = function (data) {
            $scope.dialcodes = "";
            if ($scope.contentMeta.mimeType == 'application/vnd.ekstep.content-collection') {
                var node = ecEditor.jQuery("#collection-tree").fancytree("getRootNode").getFirstChild();
                if (node.data.metadata.dialcodes) {
                    $scope.dialcodes = node.data.metadata.dialcodes
                } else if (!_.isEmpty(org.ekstep.collectioneditor.cache.nodesModified) && org.ekstep.collectioneditor.cache.nodesModified[node.data.id]) {
                    $scope.dialcodes = org.ekstep.collectioneditor.cache.nodesModified[node.data.id].metadata["dialcodes"]
                }
            } else {
                $scope.dialcodes = $scope.contentMeta.dialcodes;
            }
            if($scope.dialcodes){
                if(_.isArray($scope.dialcodes)){
                    $scope.dialcodes = $scope.dialcodes[0];
                }
                $scope.editFlag = ($scope.dialcodes && ($scope.dialcodes.length == $scope.maxChar)) ? true : false;
                if (ecEditor._.indexOf(org.ekstep.services.collectionService.dialcodeList, $scope.dialcodes) != -1) {
                    $scope.status = true;
                }else{
                    $scope.searchDialCode($scope.dialcodes, function(response){
                        $scope.status = response.isValid;
                        $scope.$safeApply();
                    });
                }
            } else{
                $scope.editFlag = false;
            }
            $scope.$safeApply();
        }

        $scope.retrunDialCode = function() {
            ecEditor.dispatchEvent("editor:content:dialcode", $scope.dialcodes);
        }

        $scope.getCurrentDialCode = function(event, options) {
            if (options && options.callback) {
                options.callback($scope.dialcodes);
            }
        }

        $scope.init()

    }]
    return {
        restrict: 'EA',
        templateUrl: template,
        controller: dialCodeController

    }
});
//# sourceURL=dialCodeForMeta.js
/**
 * @description : License supports to show content licensing
 * @author: Rahul Shukla <rahul.shukla@ilimi.in>
 * 
 */
formApp.directive('licenses', function() {
    const manifest = org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata");
    var licensesController = ['$scope', '$rootScope','$controller', function($scope, $rootScope , $controller) {
        $scope.data = {};
        $scope.licenseData= "";
        $scope.contentMeta = $scope.$parent.contentMeta;
        $scope.defaultLicense = (ecEditor.getContext("defaultLicense")) ? ecEditor.getContext("defaultLicense") : "";
        $scope.contentMimeType = ["application/pdf", "video/mp4", "application/epub", "video/webm", "application/vnd.ekstep.h5p-archive", "application/vnd.ekstep.html-archive", "application/vnd.ekstep.ecml-archive"]
        $scope.isDisableSelection = false;
        $scope.toggleLicenseDetails = false;
        $scope.isCopiedContent = false;


        /**
         * Function to get the license details from API 
         */
        $scope.getLicenseData = function() {
            var payload={"request":{"filters":{"objectType":"license","status":["Live"]}}}
            if (_.isFunction(ecEditor.getService('search').search)) {
                ecEditor.getService('search').search(payload, function(err, resp) {
                    if(!err && (_.has(resp.data.result, "license"))){
                        $scope.licenseList = [];
                        _.forEach(resp.data.result.license, function(license){
                            $scope.licenseList.push(license);
                        });
                        if(!$scope.contentMeta.license){
                            $scope.contentMeta.license = $scope.defaultLicense;
                        }
                        $rootScope.$safeApply();
                    }else{
                        $scope.toggleLicenseDetails = true
                    }
                    setTimeout(function() {
                        $(".ui.dropdown.license").dropdown({
                            useLabels: false,
                            forceSelection: true,
                        }) .dropdown('set selected', $scope.contentMeta.license);
                        $rootScope.$safeApply();
                    }, 0)
                })
            }
        }

        /**
         * Function to get the copied content and mimetype
         */
        $scope.getContentOrigin = function() {
            var contentId   = ecEditor.getContext('contentId');
            var origin      = ecEditor.getService('content').getContentMeta(contentId).origin;
            var mimeType    = ecEditor.getService('content').getContentMeta(contentId).mimeType;
            var license     = ecEditor.getService('content').getContentMeta(contentId).license
            // copied content should be having origin field
            /* istanbul ignore else */
            if(!_.isUndefined(origin)){
                $scope.defaultLicense = license;
                $scope.isDisableSelection = true
            }
            // Check for Mimetype other than youtube for asset upload
            /* istanbul ignore else */
            if(!_.isUndefined(mimeType)){
                if(_.findIndex($scope.contentMimeType, mimeType) > 0){
                    ($scope.defaultLicense = ((ecEditor.getContext("defaultLicense")) ? ecEditor.getContext("defaultLicense") : ""));
                    $scope.isDisableSelection = true
                } else if( mimeType == "video/x-youtube" ){
                    $scope.isDisableSelection = true
                }
            }
            $scope.$root.$safeApply();
        }

        

        $scope.getLicenseData();

        $scope.getContentOrigin();
        
        $scope.OnLicenseChange = function() {
            $scope.contentMeta.license = $scope.contentMeta.license;
            $rootScope.$safeApply();
        }
    }]
    return {
        restrict: "EA",
        templateUrl: ecEditor.resolvePluginResource(manifest.id, manifest.ver, "editor/directives/licenses/template.html"),
        transclude: true,
        scope: {
            config: "="
        },
        controller: licensesController
    };
});
//# sourceURL=licenseDirective.js;
org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.metadata","ver":"1.5","author":"Kartheek Palla, Manjunath Davanam, Gourav More, Jagadish Pujari and Rahul Shukla","title":"Metadata plugin","description":"","publishedDate":"","editor":{"main":"editor/plugin.js","dependencies":[{"plugin":"org.ekstep.conceptselector","ver":"1.1","type":"plugin"},{"plugin":"org.ekstep.topicselector","ver":"1.1","type":"plugin"},{"type":"js","src":"editor/libs/ng-tags-input.js"},{"type":"css","src":"editor/libs/ng-tags-input.css"},{"type":"js","src":"editor/directives/keywords/keyword.js"},{"type":"js","src":"editor/directives/conceptselector/conceptselector.js"},{"type":"js","src":"editor/directives/topicselector/topicselector.js"},{"type":"js","src":"editor/directives/year/yearDirective.js"},{"type":"js","src":"editor/config.js"},{"type":"js","src":"editor/directives/appIcon/appIcon.js"},{"type":"css","src":"editor/css/contentmetaform.css"},{"type":"js","src":"editor/utils/index.js"},{"type":"js","src":"editor/directives/dialCode/dialCodeDirective.js"},{"type":"js","src":"editor/directives/licenses/licenseDirective.js"}]}},org.ekstep.contenteditor.metadataPlugin=org.ekstep.contenteditor.basePlugin.extend({DEFAULT_TEMPLATE_NAME:"defaultTemplate",initialize:function(){this.manifest=manifest},validate:function(e){},resetFields:function(){},renderForm:function(){},showForm:function(){ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({template:"metadataTemplate",controller:"metadataForm",controllerAs:"$ctrl",width:900,showClose:!1,closeByEscape:!1,closeByDocument:!1})},loadTemplate:function(e,t){e=e||this.DEFAULT_TEMPLATE_NAME;var n=org.ekstep.pluginframework.pluginManager.getPluginManifest("org.ekstep.metadata"),o=ecEditor.resolvePluginResource(n.id,n.ver,"editor/templates/"+e+".html"),r=ecEditor.resolvePluginResource(n.id,n.ver,"editor/controller.js");ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(o,r).then(function(){t&&t(o,r)})},getFormFields:function(){},getTemplate:function(){},mapObject:function(t,e){return this.mapParents(t,function(e){t=e}),t.forEach(function(t){e.forEach(function(e){t.code===e.code&&(t.range=e.terms)})}),t},mapParents:function(r,e){return _.forEach(r,function(e,t){r[t].parent=[]}),_.forEach(r,function(o,e){o.depends&&_.forEach(o.depends,function(n){_.forEach(r,function(e,t){n===e.code&&r[t].parent.push(o.code)})})}),e(r)}}))