fabric.ITextbox = fabric.util.createClass(fabric.Textbox, fabric.Observable, {
    type: "i-textbox",
    initialize: function(text, options) {
        this.ctx = fabric.util.createCanvasElement().getContext("2d");
        this.callSuper("initialize", text, options);
    },
    _measureText: function(ctx, text, lineIndex, charOffset) {
        return ctx.measureText(text).width;
    },
    _measureLine: function(ctx, lineIndex) {
        var line = this._textLines[lineIndex],
            width = ctx.measureText(line).width,
            additionalSpace = 0, charCount, finalWidth;
        /* istanbul ignore next*/
        if (this.charSpacing !== 0) {
            charCount = line.split('').length;
            additionalSpace = (charCount - 1) * this._getWidthOfCharSpacing();
        }
        finalWidth = width + additionalSpace;
        return finalWidth > 0 ? finalWidth : 0;
    },
    /**
     * This method orerride the fabric text _setTextStyles function
     * called internally by fabric text plugin
     */
    _setTextStyles: function(ctx) {
        ctx.textAlign = "left";
        ctx.font = this._getFontDeclaration();
    }
});
/* istanbul ignore next*/
fabric.ITextbox.fromObject = function(object) {
    return new fabric.ITextbox(object.text, fabric.util.object.clone(object));
};
fabric.ITextbox.instances = [];

var textEditor = (function() {
    var $editor = ecEditor.jQuery("#authoringTextEditor"),
        $doneBtn = ecEditor.jQuery("#authoringTextEditorBtn"),
        $cancelBtn = ecEditor.jQuery("#authoringTextEditorCancel"),
        $btnGrpParent = ecEditor.jQuery('<div>',{style:"margin-top: 6px; margin-right: 6px;"})
        $buttonGrp = ecEditor.jQuery('<div>', { class: 'ui buttons', id: 'texteditorBtnGrp', style:"float: right;" });
    $orBtn = ecEditor.jQuery('<div>', { class: 'or' });
    pluginId = undefined,
        editorText = undefined;

    function _removeObject() {
        ecEditor.getPluginInstance(pluginId).editorObj.remove();
        ecEditor.render();
        ecEditor.dispatchEvent('object:modified', { id: pluginId });
    }

    function _commonBtnClickAction() {
        $buttonGrp.hide();
        $cancelBtn.hide();
        $editor.hide();
        $doneBtn.hide();
        ecEditor.jQuery("#toolbarOptions").show();
    }

    function generateTelemetry(data) {
        if(data){
            ecEditor.getService(ServiceConstants.TELEMETRY_SERVICE).interact({
                "id": data.id,
                "type": data.type, "subtype": data.subtype, "target": data.target,
                "pluginid": "org.ekstep.text", "pluginver": "1.0", "objectid": "",
                "stage": ecEditor.getCurrentStage().id
            });
        }
    }

    function showEditor(id) {
        pluginId = id;
        editorText = ecEditor.getPluginInstance(pluginId).editorObj.text;
        if (!$editor.length) {
            var form = ecEditor.jQuery("<div>", { class: "ui form", id: "textEditorContainer", style:"margin-left: 10px; margin-top: 10px;" });
            form.css({
                "top": ecEditor.jQuery("#canvas").offset().top,
                "left": ecEditor.jQuery("#canvas").offset().left,
                "position": "absolute"
            });
            var field = ecEditor.jQuery("<div>", { class: "field" });
            form.appendTo("body");
            field.appendTo(form)
            ecEditor.jQuery(document.createElement("textarea"))
                .text(editorText)
                .attr({ "id": "authoringTextEditor", "placeholder": "Add text here", "rows": 12 })
                .css({ "width": "30.5em" })
                .appendTo(field);
            $editor = ecEditor.jQuery("#authoringTextEditor");
            $btnGrpParent.insertAfter($editor);
            $btnGrpParent.append($buttonGrp);
        } else {
            $editor.show().val(editorText);
        }

        if (!$doneBtn.length) {
            $doneBtn = ecEditor.jQuery("<button>",{text: 'Done',id: 'authoringTextEditorBtn', class: 'ui primary button'})
                .click(function() {
                    generateTelemetry({id: 'button', type: 'click', subtype: 'done', target: 'addString'});
                    _commonBtnClickAction();
                    if ($editor.val().trim().length) {
                        ecEditor.getPluginInstance(pluginId).editorObj.text = $editor.val();
                        ecEditor.getPluginInstance(pluginId).config.text = $editor.val();
                        ecEditor.render();
                        ecEditor.dispatchEvent('object:modified', { target: ecEditor.getPluginInstance(pluginId).editorObj });
                        ecEditor.jQuery("#toolbarOptions").show();
                    } else {
                        _removeObject();
                    }
                    $editor.val("");
                });
        } else {
            $doneBtn.show();
        }

        if (!$cancelBtn.length) {
            $cancelBtn = ecEditor.jQuery('<button>',{text: 'Cancel',id: 'authoringTextEditorCancel', class: 'ui secondary button'})
                .click(function() {
                    generateTelemetry({id: 'button', type: 'click', subtype: 'cancel', target: 'cancelTextEditor'});
                    _commonBtnClickAction();
                    /* istanbul ignore next*/
                    if (!editorText.trim().length) {
                        _removeObject();
                    }
                });
        } else {
            $cancelBtn.show();
        }
        $buttonGrp.append($cancelBtn);
        $buttonGrp.append($orBtn);
        $buttonGrp.append($doneBtn);
        //$buttonGrp.css({position:'absolute', 'top': $editor.offset().top+$editor.height()/2+64,'left': $editor.offset().left+22})
        $buttonGrp.show();
        var angScope = ecEditor.getAngularScope();
        ecEditor.ngSafeApply(angScope, function () {
          angScope.configStyle = "";
        });
    }

    function hideEditor() {
        $editor.val("").hide();
        $buttonGrp.hide();
        $doneBtn.hide();
        $cancelBtn.hide();
        var angScope = ecEditor.getAngularScope();
        ecEditor.ngSafeApply(angScope, function () {
          angScope.configStyle = "";
        });
    }
    return {
        showEditor: showEditor,
        hide: hideEditor,
        generateTelemetry: generateTelemetry
    };
})();

org.ekstep.text = {};
/**
 * @class  org.ekstep.plugins.text.MultilineTransliterator
 */
org.ekstep.text.MultilineTransliterator = Class.extend({
    error:"error",
    init: function($q, transliterateService) {
        this.$q = $q;
        this.transliterateService = transliterateService;
    },
    /**
     * This method Takes an English string and a language code and returns a
     * transliterated text in the given language.
     * @param {string} text -  Orignial text in english. Can have line breaks.
     * @param {string} languageCode - language code
     * @param {function} callback - callback function to be called when API call returns
     * @returns {void}
     */
    transliterate: function(text, languageCode, callback) {
        var instance = this;
        var $q = this.$q;
        var texts = _.map(text.split('\n'), encodeURI);

        var promisify = function(method, data) {
            var deferer = $q.defer();
            method(data, function(err, data) {
                if (err) {
                    deferer.reject(err)
                } else {
                    deferer.resolve(data);
                }
            });
            return deferer.promise;
        }

        var promises = _.map(texts, function(text) {
            var data = {};
            data.text = text;
            data.languages = [languageCode];

            if (text == "") {
                data.text = " ";
            }

            return promisify(instance.transliterateService.getTransliteration.bind(instance.transliterateService), data);
        });

        var mapValues = function(obj, callback) {
            if (angular.isArray(obj))
                return obj.map(callback)

            var ret = {}
            Object.keys(obj).forEach(function(key, val) {
                ret[key] = callback(obj[key], key)
            })
            return ret
        };

        var allSettled = function(promises) {
            return $q.all(mapValues(promises, function(promiseOrValue) {
                if (!promiseOrValue.then)
                    return { state: 'fulfilled', value: promiseOrValue }

                return promiseOrValue.then(function(value) {
                    return { state: 'fulfilled', value: value }
                }, function(reason) {
                    return { state: 'rejected', reason: reason }
                })
            }))
        };

        allSettled(promises).then(function(result) {

           instance.error = "";
            var transliteratedText = _.map(result, function(item, index) {
                if (item.state == 'fulfilled' && item.value.data.result.transliterations[languageCode] != undefined) {
                    var val = item['value']['data']['result']['transliterations'][languageCode]['output'];
                    if (val){
                        return decodeURIComponent(val);
                    }
                    else{
                        instance.error = "Transliteration unavailable at the moment";
                        return decodeURIComponent(texts[index]);
                    }
                } else {
                    instance.error = "Transliteration unavailable at the moment";
                    return decodeURIComponent(texts[index]);
                }
            }).join('\n');
            callback(instance.error, transliteratedText);
        })


    }

})

org.ekstep.text.MultilineTransliterator.create = function($q, transliterateService) {
    return new org.ekstep.text.MultilineTransliterator($q, transliterateService)
}

/**
 * @class  org.ekstep.plugins.text.WordExtractor
 */
org.ekstep.text.WordExtractor = Class.extend({
    /**
     * Get the currently selected object on the stage. If its a text plugin,
     * retuns the text else returns undefined.
     * @returns {string} plugin.editorObj.text - text being displayed by the text plugin
     */
    extractText: function() {
        var plugin = org.ekstep.contenteditor.api.getCurrentObject();
        if (plugin && plugin.manifest.id == "org.ekstep.text") {
            return plugin.editorObj.text;
        }
        return undefined;
    }
});

 window.TextWYSIWYG = (function() {
    // Hashmap for text wysiwyg for fabricjs & createjs
    fontMap = {
        'NotoSans': {offsetY: 0.04, lineHeight: 1},
        'NotoSansKannada': {offsetY: 0.24, lineHeight: 1},
        'NotoNastaliqUrdu': {offsetY: -0.65, align: 'right', lineHeight: 2},
        "default": {offsetY: 0.2, lineHeight: 1}
    };
    _constants = {
        textType: 'text', // We are only supporting 'text' type for WYSIWYG. 'htext' & 'wordInfo' is not available for WYSIWYG, htext & wordinfo render as html elemnent in content-renderer
        lineHeight: 'lineHeight',
        align: 'align',
        offsetY: 'offsetY',
        default: 'default'
    };
    _textInstance = undefined;
    /**
     * This will return the fontMap value for font family used text instance
     * @returns {object} fontMap data
     */
    function getFontProperties() {
        return (fontMap[_textInstance.attributes.fontFamily] || fontMap[_constants.default]);
    }
    /**
     * Update the properties of text instance
     * @param {string} prop - properties which should be updated.
     * @param {string} value - value of properties.
     * @returns {void}
     */
    function setProperties(prop, value) {
        switch (prop) {
            case _constants.lineHeight:
                _textInstance.attributes.lineHeight = value;
                _textInstance.editorObj.lineHeight = value;
                break;
            case _constants.align:
                _textInstance.attributes.align = value;
                _textInstance.editorObj.setTextAlign(value);
                break;
            case _constants.offsetY:
                _textInstance.attributes.offsetY = value;
                break;
        }
    }
    /**
     * This function will set all WYSIWYG values of new text element.
     * @param {object} textInstance - text instance.
     * @returns {void}
     */
    function setInstance(textInstance) {
        if (textInstance.attributes.textType === _constants.textType) {
            _textInstance = textInstance // Setting Instance to private variable
            var fontProperties = getFontProperties();
            setProperties(_constants.lineHeight, fontProperties.lineHeight);
            setProperties(_constants.offsetY, fontProperties.offsetY);
            // if (fontProperties.align && !_textInstance.attributes.align) {
                // setProperties(_constants.align, fontProperties.align);
            // }
            ecEditor.render();
        }
    }
    /**
     * This will reset all WYSIWYG properties of text instance.
     * @param {object} textInstance - text instance.
     * @returns {void}
     */
    function resetProperties(instance) {
        delete instance.attributes.offsetY;
        delete instance.attributes.lineHeight;
        delete instance.editorObj.lineHeight;
    }
    return {
        setInstance: setInstance,
        resetProperties: resetProperties
    };
})();

//# sourceURL=textWYSIWYG.js
org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.text","ver":"1.2","shortId":"org.ekstep.text","displayName":"Text","author":"Santhosh Vasabhaktula","title":"Text Plugin","description":"","publishedDate":"","editor":{"main":"editor/plugin.js","dependencies":[{"type":"js","src":"editor/texteditor.js"},{"type":"js","src":"editor/multilineTransliterator.js"},{"type":"js","src":"editor/textWYSIWYG.js"},{"type":"css","src":"editor/style/plugin.css"}],"views":[{"template":"./delete_confirmation_dialog.html","controller":""},{"template":"./transliterationconfig.html","controller":"./transliterationapp.js"}],"menu":[{"id":"org.ekstep.text","category":"main","type":"icon","toolTip":"Add Text","title":"Text","iconClass":"fa fa-font","onclick":{"id":"org.ekstep.text:create","data":{"__text":"","x":10,"y":20,"fontFamily":"'Noto Sans', 'Noto Sans Bengali', 'Noto Sans Malayalam', 'Noto Sans Gurmukhi', 'Noto Sans Devanagari', 'Noto Sans Gujarati', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Oriya', 'Noto Nastaliq Urdu', -apple-system, BlinkMacSystemFont, Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue'","fontSize":18,"minWidth":20,"w":35,"maxWidth":500,"fill":"#000000","fontStyle":"normal","fontWeight":"normal","stroke":"rgba(255, 255, 255, 0)","strokeWidth":1,"opacity":1,"editable":false,"lineHeight":1,"version":"V2","offsetY":0.2}},"submenu":[{"id":"beginning","type":"icon","title":"Add Richtext","iconClass":"","onclick":{"id":"org.ekstep.richtext:showpopup"}}]}],"behaviour":{"rotatable":true},"configManifest":[{"type":"custom_template","controllerURL":"editor/config-controller.js","templateURL":"editor/configTemplate.html"}],"help":{"src":"editor/help.md","dataType":"text"},"init-data":{"__text":"","x":10,"y":20,"font-family":"'Noto Sans', 'Noto Sans Bengali', 'Noto Sans Malayalam', 'Noto Sans Gurmukhi', 'Noto Sans Devanagari', 'Noto Sans Gujarati', 'Noto Sans Telugu', 'Noto Sans Tamil', 'Noto Sans Kannada', 'Noto Sans Oriya', 'Noto Nastaliq Urdu', -apple-system, BlinkMacSystemFont, Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue'","fontSize":18,"minWidth":20,"w":35,"maxWidth":500,"fill":"#000000","fontStyle":"normal","fontWeight":"normal"}},"renderer":{"main":"renderer/supertextplugin.js"}},org.ekstep.contenteditor.basePlugin.extend({type:"org.ekstep.text",magicNumber:1920,editorWidth:720,supportedFonts:["NotoSans","NotoSansBengali","NotoSansDevanagari","NotoSansGujarati","NotoSansGurmukhi","NotoSansKannada","NotoSansMalayalam","NotoSansOriya","NotoSansTamil","NotoSansTelugu","NotoNastaliqUrdu"],constants:{v2supportedText:"text",createJsLineHeight:1.3},initialize:function(){var t=this;ecEditor.addEventListener(this.type+":showpopup",this.loadHtml,this),ecEditor.addEventListener("object:unselected",this.objectUnselected,this),ecEditor.addEventListener("stage:unselect",this.stageUnselect,this),ecEditor.addEventListener(this.type+":readalong:show",this.showReadalong,this),ecEditor.addEventListener(this.type+":wordinfo:show",this.showWordInfo,this),ecEditor.addEventListener(this.type+":delete:enhancement",this.deleteEnhancement,this),ecEditor.addEventListener(this.type+":modified",this.modifyText,this),ecEditor.resolvePluginResource(t.manifest.id,t.manifest.ver,"editor/delete_confirmation_dialog.html"),ecEditor.getService("popup").loadNgModules(require("./delete_confirmation_dialog.html"),void 0,!0),ecEditor.resolvePluginResource(t.manifest.id,t.manifest.ver,"editor/transliterationconfig.html"),ecEditor.resolvePluginResource(t.manifest.id,t.manifest.ver,"editor/transliterationapp.js");org.ekstep.contenteditor.api.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(require("./transliterationconfig.html"),require("./transliterationapp.js"),!0)},modifyText:function(t){this.checkMigrate(),this.dblClickHandler(t)},checkMigrate:function(){this.isV2Plugin(ecEditor.getCurrentObject())||ecEditor.dispatchEvent(this.type+":migrate",ecEditor.getCurrentObject())},loadHtml:function(){var t=this;org.ekstep.contenteditor.api.getService(ServiceConstants.POPUP_SERVICE).open({template:"transliteration",controller:"transliterationController",controllerAs:"$ctrl",resolve:{instance:function(){return t}},width:900,showClose:!1})},createTransliteratedText:function(t){var e=org.ekstep.contenteditor.api.getCurrentObject(),t={__text:t,x:30,y:30,w:300,h:500,fontFamily:"NotoSans",fontSize:18,minWidth:20,maxWidth:500,fill:"#000"};e&&(t.x=e.attributes.x,t.y=e.attributes.y,t.w=e.attributes.w,t.h=e.attributes.h,t.fontFamily=e.attributes.fontFamily,t.fontSize=e.attributes.fontSize,t.minWidth=e.attributes.minWidth,t.maxWidth=e.attributes.maxWidth,t.color=e.attributes.color,this.pixelToPercent(t),t=this.getOffsetPosition(t)),org.ekstep.contenteditor.api.instantiatePlugin(e.type,t,org.ekstep.contenteditor.api.getCurrentStage())},getOffsetPosition:function(t){return t.x+t.w<50?t.x=50:50<=t.x?t.x=12:t.y+t.h<50?t.y=50:50<=t.y?t.y=12:(t.x+=20,t.y+=20),t},newInstance:function(){var t=this.convertToFabric(this.attributes);delete t.__text,ecEditor._.isUndefined(this.config.text)&&(this.config.text=ecEditor._.isUndefined(this.attributes.__text)?"":this.attributes.__text),ecEditor._.isUndefined(this.attributes.__text)||delete this.attributes.__text,t.editable=!1,this.editorObj=new fabric.ITextbox(this.config.text,t),""==this.config.text&&textEditor.showEditor(this.id),ecEditor._.isUndefined(this.attributes.timings)&&"readalong"!==this.attributes.textType?ecEditor._.isUndefined(this.attributes.words)&&"wordinfo"!==this.attributes.textType?this.attributes.textType="text":(this.addMedia({id:"org.ekstep.text.popuptint",src:ecEditor.resolvePluginResource(this.manifest.id,this.manifest.ver,"assets/popuptint.png"),type:"image",assetId:"org.ekstep.text.popuptint"}),this.addWordinfoconfigManifest(this)):(ecEditor._.isUndefined(this.attributes.textType)&&(this.attributes.textType="readalong",this.config.audio=this.attributes.audio,this.config.timings=this.attributes.timings,this.config.highlight=this.attributes.highlight,this.config.autoplay=this.attributes.autoplay,(t=ecEditor.getMedia(this.attributes.audio)).src=org.ekstep.contenteditor.mediaManager.getMediaOriginURL(t.src),ecEditor._.isUndefined(t.preload)&&(t.preload=!0),this.config.audioObj=t),this.addMedia(this.config.audioObj),this.addReadalongconfigManifest(this)),this.isV2Plugin()&&TextWYSIWYG.setInstance(this)},selected:function(t){fabric.util.addListener(fabric.document,"dblclick",this.dblClickHandler)},deselected:function(t,e,i){fabric.util.removeListener(fabric.document,"dblclick",this.dblClickHandler)},objectUnselected:function(t,e){fabric.util.removeListener(fabric.document,"dblclick",this.dblClickHandler)},dblClickHandler:function(t){var e=ecEditor.getCurrentObject().editorObj.getBoundingRect(),i=ecEditor.jQuery("#canvas").offset().left+ecEditor.getCurrentObject().editorObj.left,o=i+ecEditor.getCurrentObject().editorObj.width,n=ecEditor.jQuery("#canvas").offset().top+ecEditor.getCurrentObject().editorObj.top,r=n+ecEditor.getCurrentObject().editorObj.height;_.isObject(e)&&(i=ecEditor.jQuery("#canvas").offset().left+e.left,eftEnd=i+e.width,r=(n=ecEditor.jQuery("#canvas").offset().top+e.top)+e.height),t.clientX>i&&t.clientX<o&&t.clientY>n&&t.clientY<r&&textEditor.showEditor(ecEditor.getEditorObject().id),textEditor.generateTelemetry({type:"click",subtype:"doubleClick",target:"textEditor"})},stageUnselect:function(t){textEditor.hide()},getAttributes:function(){var t=ecEditor._.omit(ecEditor._.clone(this.attributes),["top","left","width","height","fontFamily","fontfamily","fontSize","fontstyle","fontweight","scaleX","scaleY"]),e=(t.font=this.editorObj.get("fontFamily"),t.fontsize=this.updateFontSize(this.editorObj.get("fontSize"),!1),!ecEditor._.isUndefined(this.editorObj.get("fontWeight"))&&"bold"===this.editorObj.get("fontWeight")?"bold":""),i=!ecEditor._.isUndefined(this.editorObj.get("fontStyle"))&&"italic"===this.editorObj.get("fontStyle")?"italic":"";return t.weight=(e+" "+i).trim(),t},onConfigChange:function(t,e){switch(t){case"fontweight":this.editorObj.setFontWeight(e?"bold":"normal"),this.attributes.fontweight=e;break;case"fontstyle":this.editorObj.setFontStyle(e?"italic":"normal"),this.attributes.fontstyle=e;break;case"fontfamily":this.editorObj.setFontFamily(e),this.attributes.fontFamily=e,this.attributes.fontfamily=e;break;case"fontsize":this.editorObj.setFontSize(e),this.attributes.fontSize=e;break;case"textcolor":this.editorObj.setFill(e),this.attributes.color=e;break;case"align":this.editorObj.setTextAlign(e),this.attributes.align=e;break;case"highlightcolorpicker":this.config.highlight=e;break;case"autoplay":this.config.autoplay=e;break;case"wordfontcolorpicker":this.config.wordfontcolor=e;break;case"wordhighlightcolorpicker":this.config.wordhighlightcolor=e;break;case"wordunderlinecolorpicker":this.config.wordunderlinecolor=e}this.isV2Plugin()&&TextWYSIWYG.setInstance(this),ecEditor.render(),ecEditor.dispatchEvent("object:modified",{target:ecEditor.getEditorObject()})},getConfig:function(){var t=this._super();return t.color=this.attributes.color||this.attributes.fill,t.fontfamily=this.attributes.fontFamily,t.fontsize=this.attributes.fontSize,t.fontweight=this.attributes.fontweight||!1,t.fontstyle=this.attributes.fontstyle||!1,t.align=this.attributes.align||"left",t},getProperties:function(){var t=ecEditor._.omitBy(ecEditor._.clone(this.attributes),ecEditor._.isObject);return delete(t=ecEditor._.omitBy(t,ecEditor._.isNaN)).__text,t.text=this.editorObj.text,this.pixelToPercent(t),t},updateFontSize:function(t,e){var i,o;return e?(i=this.attributes.w*(this.magicNumber/100),o=this.editorWidth*this.attributes.w/100,parseInt(Math.round(t*(o/i)).toString())):(i=this.editorObj.width/this.magicNumber*100,o=this.editorObj.width/this.editorWidth*100,e=t*(this.editorObj.scaleX||1),parseFloat((o/i*e).toFixed(2)))},convertToFabric:function(t){var e,i=ecEditor._.clone(t);return t.x&&(i.left=t.x),t.y&&(i.top=t.y),t.w&&(i.width=t.w),t.h&&(i.height=t.h),t.color&&(i.fill=t.color),t.weight&&ecEditor._.includes(t.weight,"bold")?(i.fontWeight="bold",t.fontweight=!0):t.fontweight=!1,t.weight&&ecEditor._.includes(t.weight,"italic")?(i.fontStyle="italic",t.fontstyle=!0):t.fontstyle=!1,t.font&&(i.fontFamily=t.font,t.fontFamily=t.font),t.fontsize&&(e=this.updateFontSize(t.fontsize,!0),i.fontSize=e,t.fontSize=e),t.align&&(i.textAlign=t.align,i.align=t.align),t.rotate&&(i.angle=t.rotate),this.isV2Plugin()||delete i.lineHeight,i},getConfigManifest:function(){var t=this._super();return ecEditor._.remove(t,function(t){return"stroke"===t.propertyName}),t},showReadalong:function(){var t=ecEditor.getCurrentObject();ecEditor.dispatchEvent("org.ekstep.readalongbrowser:showpopup",{textObj:t,callback:this.convertTexttoReadalong})},convertTexttoReadalong:function(t){var e=ecEditor.getCurrentObject(),i=ecEditor.getPluginInstance(e.id),t=(TextWYSIWYG.resetProperties(e),e.config.text=e.editorObj.text=t.text,e.config.audio=t.audio,e.config.timings=t.timings,e.config.highlight=t.highlight,e.config.audioObj=t.audioObj,e.config.autoplay=t.autoplay,e.attributes.autoplay=t.autoplay,e.attributes.textType="readalong",textEditor.hide(),t.audioObj);ecEditor._.isUndefined(t)||(t.src=org.ekstep.contenteditor.mediaManager.getMediaOriginURL(t.src)),e.addMedia(t),i.addReadalongconfigManifest(e),ecEditor.dispatchEvent("config:show"),ecEditor.render()},showWordInfo:function(){var t=ecEditor.getCurrentObject();ecEditor.dispatchEvent("org.ekstep.wordinfobrowser:showpopup",{textObj:t,callback:this.convertTexttoWordinfo})},convertTexttoWordinfo:function(t,e){var i=ecEditor.getCurrentObject(),o=ecEditor.getPluginInstance(i.id);TextWYSIWYG.resetProperties(i),i.data=e,i.config.text=i.editorObj.text=t.text,i.config.words=t.words,i.config.wordfontcolor=t.wordfontcolor,i.config.wordhighlightcolor=t.wordhighlightcolor,i.config.wordunderlinecolor=t.wordunderlinecolor,i.attributes.textType="wordinfo",i.addMedia({id:"org.ekstep.text.popuptint",src:ecEditor.resolvePluginResource(o.manifest.id,o.manifest.ver,"assets/popuptint.png"),type:"image",assetId:"org.ekstep.text.popuptint"}),o.addWordinfoconfigManifest(i),ecEditor.dispatchEvent("config:show"),ecEditor.render()},deleteEnhancement:function(){ecEditor.getService("popup").open({template:"deleteConfirmationDialog",controller:["$scope",function(e){e.warningMessage="readalong"==ecEditor.getCurrentObject().attributes.textType?"Read-Along":"Word Info Popup",e.delete=function(){e.closeThisDialog();var t=ecEditor.getCurrentObject();"readalong"==t.attributes.textType?(delete t.config.audio,delete t.config.timings,delete t.config.highlight,delete t.config.audioObj,delete t.config.autoplay,delete t.attributes.autoplay):(delete t.data,delete t.config.words,delete t.config.wordfontcolor,delete t.config.wordhighlightcolor,delete t.config.wordunderlinecolor),t.attributes.textType="text",ecEditor.dispatchEvent("config:show"),this.isV2Plugin()&&TextWYSIWYG.setInstance(this),ecEditor.render()}}],width:520,showClose:!1,closeByEscape:!1,closeByDocument:!1})},addReadalongconfigManifest:function(t){ecEditor.dispatchEvent("org.ekstep.text:addReadAlong",t)},addWordinfoconfigManifest:function(t){ecEditor.dispatchEvent("org.ekstep.text:addWordInfo",t)},getMedia:function(){return"text"===this.attributes.textType?{}:this._super()},toECML:function(){var t=this._super();return t.textType!==this.constants.v2supportedText&&(t.lineHeight=this.constants.createJsLineHeight),t},fromECML:function(){this._super(this.editorData),this.attributes.textType!==this.constants.v2supportedText&&delete this.attributes.lineHeight},isV2Plugin:function(t){t=t||this;return!(!t.attributes.version||"V2"!==t.attributes.version)}}))