var topicModal;
/* istanbul ignore next */
(function() {
    $.fn.topicTreePicker = function(options) {
        var actionButtons, config, count, initialize, initializeNodeList, initializeNodes, loadNodes, modal, nodeClicked, nodeIsPicked, nodes, pickNode, picked, recursiveNodeSearch, renderList, renderTree, showPicked, showSearch, showTree, tabs, unpickNode, updatePickedIds, updatePickedNodes, widget;
        widget = $(this);
        picked = [];
        nodes = [];
        tabs = {};
        $("#" + options.nodeName).length == 0 ? '' : $("#" + options.nodeName).remove();
        modal = $("<div id=" + options.nodeName + " class=\"ui tree-picker small modal\">\n  <div class=\"header\">\n    " + options.name + "\n\n    <div class=\"ui menu\">\n      <a class=\"active tree item\">\n        <i class=\"list icon\"></i> Topics\n      </a>\n      <a class=\"picked item\">\n        <i class=\"checkmark icon\"></i> Selected Topics <span class=\"count\"></span>\n      </a>\n    </div>\n  </div>\n  <div class=\"ui search form\">\n    <div class=\"field\">\n      <div class=\"ui icon input\">\n        <input type=\"text\" placeholder=\"Search\">\n        <i class=\"search icon\"></i>\n      </div>\n    </div>\n  </div>\n  <div class=\"content\">\n <div class=\"ui warning hidden message\"><i class=\"close icon\"></i><div class=\"header\">No topic/subtopic is available with provided Board, Grade, and Subject combinations.</div>Please verify the provided values for Board, Grade, and Subject</div><div class=\"ui active inverted dimmer\"><div class=\"ui text loader\">Loading data</div></div>\n    <div class=\"topic-tree-tab\">\n      <div style=\"height: 300px\"></div>\n    </div>\n\n    <div class=\"topic-search-tab\">\n    </div>\n\n    <div class=\"topic-picked-tab\">\n    </div>\n  </div>\n  <div class=\"actions\">\n    <a class=\"pick-search\"><i class=\"checkmark icon\"></i> Choose All</a>\n    <a class=\"unpick-search\"><i class=\"remove icon\"></i> Remove All</a>\n    <a class=\"unpick-picked\"><i class=\"remove icon\"></i> Remove All</a>\n    \n    <a class=\"ui button close cancel\">Cancel</a>\n<a class=\"ui blue button accept\">Done</a>\n  </div>\n</div>").modal({
            duration: 200,
            allowMultiple: true,
            closable: false,
            onDeny: function() {
                if (config.onCancel) {
                    config.onCancel();
                }
                return true;
            }
        });
        topicModal = modal;
        count = $('.count', modal);
        tabs = {
            tree: $('.topic-tree-tab', modal),
            search: $('.topic-search-tab', modal),
            picked: $('.topic-picked-tab', modal)
        };
        actionButtons = {
            pickSearch: $('.actions .pick-search', modal),
            unpickSearch: $('.actions .unpick-search', modal),
            unpickPicked: $('.actions .unpick-picked', modal)
        };
        config = {
            childrenKey: 'nodes',
            singlePick: false,
            minSearchQueryLength: 3,
            apiResponseTimeout: 1000,
            hidden: function(node) {
                return false;
            },
            disabled: function(node) {
                return false;
            },
            displayFormat: function(picked) {
                return options.name + " (Selected " + picked.length + ")";
            }
        };
        $.extend(config, options);
        initialize = function() {
            if (config.data) {
                nodes = config.data;
            }
            if (config.picked) {
                config.picked = config.picked;
            } else if (widget.attr("data-picked-ids")) {
                widget.attr("data-picked-ids").split(",");
            }

            if (config.picked) {
                if (nodes.length) {
                    updatePickedNodes();
                    widget.html(config.displayFormat(picked));
                } else {
                    widget.html(config.displayFormat(config.picked));
                }
            } else {
                widget.html(config.displayFormat([]));
            }
            widget.unbind("click");
            widget.on('click', function(e) {
                console.log('click event received', nodes);
                modal.modal('show');
                showTree();
                if (!nodes.length) {
                    if (config.url) {
                        return loadNodes(config.url, {}, function(nodes) {
                            $('.ui.active.dimmer', modal).removeClass('active');
                            $(".ui.tree-picker.small.modal .field").removeClass("disabled");
                            return initializeNodes(nodes);
                        });
                    } else {
                        setTimeout(function() {
                            $('.ui.active.dimmer', modal).removeClass('active');
                            $(".ui.tree-picker.small.modal .field").addClass("disabled");
                            $(".ui.tree-picker.modal .ui.warning.message").removeClass("hidden");
                        }, config.apiResponseTimeout);
                    }
                } else {
                    $('.ui.active.dimmer', modal).removeClass('active');
                    $(".ui.tree-picker.small.modal .field").removeClass("disabled");
                    return initializeNodes(nodes);
                }
            });
            $('.actions .accept', modal).on('click', function(e) {
                modal.modal('hide');
                if (config.onSubmit) {
                    config.onSubmit(picked);
                }
                return widget.html(config.displayFormat(picked));
            });
            $('.actions .close', modal).on('click', function(e) {
                modal.modal('hide');
                if (config.onCancel) {
                    config.onCancel();
                }
            });

            actionButtons.pickSearch.on('click', function(e) {
                return $('.topic-search-tab .node:not(.picked) .name', modal).trigger('click');
            });
            actionButtons.unpickSearch.on('click', function(e) {
                return $('.topic-search-tab .node.picked .name', modal).trigger('click');
            });
            actionButtons.unpickPicked.on('click', function(e) {
                var tree;
                $('.node.picked', modal).removeClass('picked');
                picked = config.picked = [];
                updatePickedIds();
                tree = renderTree([], {
                    height: '300px',
                    overflowY: 'auto'
                });
                tabs.picked.show().html(tree);
            });
            $('.menu .tree', modal).on('click', function(e) {
                return showTree();
            });
            $('.menu .picked', modal).on('click', function(e) {
                return showPicked();
            });
            return $('.search input', modal).on('keyup', function(e) {
                return showSearch($(this).val());
            });
        };
        loadNodes = function(url, params, success) {
            if (params == null) {
                params = {};
            }
            return $.get(url, params, function(response) {
                if (response.constructor === String) {
                    nodes = $.parseJSON(response);
                } else {
                    nodes = response;
                }
                return success(nodes);
            });
        };
        initializeNodes = function(nodes) {
            var tree;
            updatePickedNodes();
            tree = renderTree(nodes, {
                height: '300px',
                overflowY: 'auto'
            });
            tabs.tree.html(tree);
            return initializeNodeList(tree);
        };
        updatePickedNodes = function() {
            var i, id, len, ref, results1, searchResult;
            if (config.picked) {
                picked = [];
                ref = config.picked;
                results1 = [];
                for (i = 0, len = ref.length; i < len; i++) {
                    id = ref[i];
                    searchResult = recursiveNodeSearch(nodes, function(node) {
                        return ("" + node.name) === ("" + id);
                    });
                    if (searchResult.length) {
                        results1.push(picked.push(searchResult[0]));
                    } else {
                        results1.push(void 0);
                    }
                }
                return results1;
            }
        };
        showTree = function() {
            $('.menu .item', modal).removeClass('active');
            $('.menu .tree', modal).addClass('active');
            tabs.tree.show();
            tabs.search.hide();
            tabs.picked.hide();
            return modal.attr('data-mode', 'tree');
        };
        showSearch = function(query) {
            var foundNodes, list;
            var formatedNodes = [];
            if (query !== null && query.length >= config.minSearchQueryLength) {
                foundNodes = recursiveNodeSearch(nodes, function(node) {
                    return node.name && node.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
                ecEditor._.forEach(foundNodes, function(value) {
                    if (value.selectable === 'selectable') {
                        formatedNodes.push(value);
                    }
                });
                foundNodes = formatedNodes;
                list = renderList(foundNodes, {
                    height: '300px',
                    overflowY: 'auto'
                });
                $('.menu .item', modal).removeClass('active');
                tabs.search.show().html(list);
                tabs.tree.hide();
                tabs.picked.hide();
                modal.attr('data-mode', 'search');
                initializeNodeList(list);
                return $('.name', list).each(function() {
                    var name, regex;
                    name = $(this).text();
                    regex = RegExp('(' + query + ')', 'gi');
                    name = name.replace(regex, "<strong class='search-query'>$1</strong>");
                    return $(this).html(name);
                });
            } else {
                return showTree();
            }
        };
        showPicked = function() {
            var list;
            list = renderList(picked, {
                height: '300px',
                overflowY: 'auto'
            });
            $('.menu .item', modal).removeClass('active');
            $('.menu .picked', modal).addClass('active');
            tabs.picked.show().html(list);
            tabs.tree.hide();
            tabs.search.hide();
            modal.attr('data-mode', 'picked');
            return initializeNodeList(list);
        };
        renderTree = function(nodes, css) {
            var i, len, node, nodeElement, tree;
            if (css == null) {
                css = {};
            }
            tree = $('<div class="ui tree-picker tree"></div>').css(css);
            for (i = 0, len = nodes.length; i < len; i++) {
                node = nodes[i];
                if (config.hidden(node)) {
                    continue;
                }
                nodeElement = $("<div class=\"node\" data-id=\"" + node.id + "\" data-name=\"" + node.name + "\">\n  <div class=\"head " + node.selectable + "\">\n    <i class=\"add circle icon\"></i>\n    <i class=\"minus circle icon\"></i>\n    <i class=\"radio icon\"></i>\n    <a class=\"name\">" + node.name + "</a>\n    <i class=\"checkmark icon\"></i>\n  </div>\n  <div class=\"content\"></div>\n</div>").appendTo(tree);
                if (config.disabled(node)) {
                    nodeElement.addClass('disabled');
                }
                if (node[config.childrenKey] && node[config.childrenKey].length) {
                    $('.content', nodeElement).append(renderTree(node[config.childrenKey]));
                } else {
                    nodeElement.addClass("childless");
                }
            }
            return tree;
        };
        renderList = function(nodes, css) {
            var i, len, list, node, nodeElement;
            if (css == null) {
                css = {};
            }
            list = $('<div class="ui tree-picker list"></div>').css(css);
            for (i = 0, len = nodes.length; i < len; i++) {
                node = nodes[i];
                if (config.hidden(node)) {
                    continue;
                }
                nodeElement = $("<div class=\"node\" data-id=\"" + node.id + "\" data-name=\"" + node.name + "\">\n  <div class=\"head " + node.selectable + "\">\n    <a class=\"name\">" + node.name + "</a>\n    <i class=\"checkmark icon\"></i>\n  </div>\n  <div class=\"content\"></div>\n</div>").appendTo(list);
                if (config.disabled(node)) {
                    nodeElement.addClass('disabled');
                }
            }
            return list;
        };
        initializeNodeList = function(tree) {
            return $('.node', tree).each(function() {
                var content, head, node;
                node = $(this);
                head = $('>.head', node);
                content = $('>.content', node);
                $('>.name', head).on('click', function(e) {
                    return nodeClicked(node);
                });
                if (nodeIsPicked(node)) {
                    node.addClass('picked');
                }
                if (!node.hasClass('childless')) {
                    $('>.icon', head).on('click', function(e) {
                        node.toggleClass('opened');
                        return content.slideToggle();
                    });
                }
                return updatePickedIds();
            });
        };

        nodeClicked = function(node) {
            if (!node.hasClass('disabled')) {
                if (config.singlePick) {
                    $('.node.picked', modal).removeClass('picked');
                    picked = [];
                }
                node.toggleClass('picked');
                if (node.hasClass('picked')) {
                    return pickNode(node);
                } else {
                    return unpickNode(node);
                }
            }
        };
        pickNode = function(node) {
            var id;
            config.picked = null;
            id = node.attr('data-id');
            picked.push({
                id: id,
                name: node.attr('data-name')
            });
            updatePickedIds();
            return $(".node[data-id=" + id + "]", modal).addClass('picked');
        };
        unpickNode = function(node) {
            var id;
            config.picked = null;
            id = node.attr('data-id');
            picked = picked.filter(function(n) {
                return ("" + n.id) !== ("" + id);
            });
            updatePickedIds();
            return $(".node[data-id=" + id + "]", modal).removeClass('picked');
        };
        nodeIsPicked = function(node) {
            return picked.filter(function(n) {
                return ("" + n.id) === node.attr('data-id');
            }).length;
        };
        updatePickedIds = function() {
            widget.attr('data-picked-ids', picked.map(function(n) {
                return n.id;
            }));
            if (picked.length) {
                count.closest('.item').addClass('highlighted');
                return count.html("(" + picked.length + ")");
            } else {
                count.closest('.item').removeClass('highlighted');
                return count.html("");
            }
        };
        recursiveNodeSearch = function(nodes, comparator) {
            var i, len, node, results;
            results = [];
            for (i = 0, len = nodes.length; i < len; i++) {
                node = nodes[i];
                if (comparator(node)) {
                    results.push({
                        id: node.id,
                        name: node.name,
                        selectable: node.selectable
                    });
                }
                if (node[config.childrenKey] && node[config.childrenKey].length) {
                    results = results.concat(recursiveNodeSearch(node[config.childrenKey], comparator));
                }
            }
            return results;
        };
        return initialize();
    };

}).call(this);
//# sourceURL=semantic-ui-tree-picker.js
org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.topicselector","ver":"1.1","author":"Gourav More","title":"Topic Selector Plugin","description":"Topic and subtopic selector plugin","publishedDate":"","editor":{"main":"editor/plugin.js","dependencies":[{"type":"js","src":"editor/topic-semantic-ui-tree-picker.js"},{"type":"css","src":"editor/topic-semantic-ui-tree-picker.css"}]}},org.ekstep.contenteditor.basePlugin.extend({framework:void 0,topicData:[],response:[],terms:[],selectedFilters:[],topics:[],categories:[],data:[],isPopupInitialized:!1,template:void 0,initialize:function(){ecEditor.addEventListener(this.manifest.id+":init",this.initTopicBrowser,this),ecEditor.addEventListener("editor:field:association",this.applyFilters,this)},initTopicBrowser:function(e,t){var i=this;i.data=t,i.framework=t.framework||ecEditor.getService("content").getContentMeta(ecEditor.getContext("contentId")).framework,i.terms=[],i.getCategory(function(){0<i.categories.length?i.getTopics(i.categories,function(t){i.topicData=ecEditor._.uniqBy(t,"id"),i.topics=i.topicData,i.isPopupInitialized=!0,i.selectedFilters=[],i.data.isCategoryDependant?i.getFormData(function(t){i.setAssociations(t,function(){i.setFiltersData(function(){i.showTopicBrowser(e,i.data)})})}):i.showTopicBrowser(e,i.data)}):(i.isPopupInitialized=!0,i.showTopicBrowser(e,i.data))})},getFormConfig:function(e){var i=this;ecEditor.dispatchEvent("editor:form:getconfig",function(t){i.template=t.template;t=_.map(_.filter(t.fields,_.matches({depends:["topic"]})),"code");i.terms=t,e(t)})},getFormData:function(i){var t=this;t.getFormConfig(function(e){ecEditor.dispatchEvent("metadata:form:getdata",{target:"#"+t.template,callback:function(t){t=_.pick(t,e);i(t)}})})},getTopics:function(o,a){var n=this,c=[];o&&o.length?ecEditor._.forEach(o,function(t,e){var i={};i.id=t.identifier,i.name=t.name,i.selectable="selectable",i.nodes=n.getSubtopics(t.children),c.push(i),e===o.length-1&&a(c)}):a(c)},getSubtopics:function(t){var i=this,o=[];return ecEditor._.forEach(t,function(t){var e={};e.id=t.identifier,e.name=t.name,e.selectable="selectable",e.nodes=i.getSubtopics(t.children),o.push(e)}),ecEditor._.uniqBy(o,"id")},getCategory:function(i){var o=this,t=o.framework;t?ecEditor.getService(ServiceConstants.META_SERVICE).getCategorys(t,function(t,e){t||(o.response=e.data.result.framework.categories,ecEditor._.forEach(o.response,function(t,e){"topic"==t.code&&(o.categories=t.terms||[])})),i()}):i()},applyFilters:function(i,o){var a=this;a.selectedFilters=[],a.isPopupInitialized&&o.field.depends&&o.field.depends.length&&_.forEach(o.field.depends,function(t){var e;"topic"==t&&o.resetSelected&&(a.data.selectedTopics=[],ecEditor.dispatchEvent("editor.topic.change",{key:"topic",value:[]}),o.target&&(e=o.target.replace("#","")),ecEditor.dispatchEvent("metadata:form:getdata",{target:o.target,callback:function(t){a.setAssociations(t,function(){a.setFiltersData(function(){e&&(a.data.element=e+"-topic"),a.showTopicBrowser(i,a.data)})})}}))})},setFiltersData:function(n){var c=this,s=[];0<c.selectedFilters.length?ecEditor._.forEach(c.selectedFilters,function(t,e){var i,o,a;0<t.association.length&&(i=[],ecEditor._.forEach(t.association[0],function(t,e){"topic"==t.category&&i.push(t.identifier)}),0<i.length)&&s.push(i),e===c.selectedFilters.length-1&&(o=_.intersection.apply(_,s),a=[],ecEditor._.forEach(c.topics,function(e,t){ecEditor._.forEach(o,function(t){e.id==t&&a.push(e)})}),c.topicData=a,n())}):n()},setAssociations:function(a,t){var n=this;n.terms=ecEditor._.uniq(n.terms),ecEditor._.forEach(n.terms,function(e,t){var o,i;a[e]&&((o={}).name=e,o.value=a[e],o.association=[],i=_.find(n.response,function(t){return t.code===e}).terms,ecEditor._.forEach(i,function(i,t){ecEditor._.isUndefined(i.associations)||(_.isArray(a[e])&&0<i.associations.length?ecEditor._.forEach(a[e],function(t,e){i.name==t&&0<o.association.length?(i.associations=_.union(o.association[0],i.associations),o.association=i.associations):i.name==t&&o.association.push(i.associations)}):i.name==a[e]&&0<i.associations.length&&o.association.push(i.associations))}),n.selectedFilters.push(o))}),t()},showTopicBrowser:function(t,e){var i=this;i.data=e,console.log("topics:- ",i.topicData.length),ecEditor.jQuery("#"+e.element).topicTreePicker({data:i.topicData,name:"Topic",picked:e.selectedTopics,onSubmit:function(t){e.callback(t),e.selectedTopics=_.map(t,"name"),i.generateTelemetry({type:"click",subtype:"submit",target:"TopicSelectorSubmit"})},onCancel:function(){i.showTopicBrowser(t,e)},nodeName:"topicSelector_"+e.element,minSearchQueryLength:1})},generateTelemetry:function(t){t&&ecEditor.getService("telemetry").interact({type:t.type,subtype:t.subtype,id:t.target,pageid:org.ekstep.contenteditor.api.getCurrentStage().id||"",target:{id:t.targetid||"",type:"plugin",ver:""},plugin:{id:this.manifest.id,ver:this.manifest.ver,category:"core"},ver:"3.0"})}}))