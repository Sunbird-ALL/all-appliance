
/**
 * Angular Service to help reuse code across MTF, FTB and MCQ templates for logging 
 * telemetry events and also to invoke the asset browser. This is a place holder for
 * any functionality that needs to be reused across these templates.
 * 
 * @author: Siva K (sivashanmugam.kannan@funtoot.com), Ram J (ram.j@funtoot.com)
 */
var orgEkstepQuestion = angular.module('orgEkstepQuestion',[]);
orgEkstepQuestion.service('questionServices', ['$http', function ($http) {
    this.invokeAssetBrowser = function (callbackObj) {
        ecEditor.dispatchEvent('org.ekstep.assetbrowser:show', callbackObj);
    }

    this.generateTelemetry = function (data) {
        if (data) ecEditor.getService('telemetry').interact({
            "type": data.type,
            "id": data.id,
            "pageid": data.form,
            "target": {
                "id": data.target.id,
                "ver": data.target.ver,
                "type": data.target.type
            },
            "plugin": data.plugin
        })
    }
}]);

/**
 * Angular directive for uniform handling of media (image and audio) selected into 
 * question elements (Question or Options). 
 *
 * @author: Siva K (sivashanmugam.kannan@funtoot.com), Ram J (ram.j@funtoot.com)
 */
angular.module('org.ekstep.question').directive('selectedMediaContainer', function () {
    return {
        scope: {
            formdata: '=',
            callbacks: '=mediaCallbacks',
            qEleType: '@mediaType',
            mediaIndex: '@mediaIndex'
        },
        template: '<div ng-if="(formdata.image.length > 0) || (formdata.audio.length > 0)">\
      <div class="question-selected-media-container">\
        <div class="selected-image-container" ng-if="formdata.image.length > 0">\
            <div class="image-container">\
                <img ng-click="callbacks.addMedia(qEleType, mediaIndex, \'image\');" src="{{formdata.image}}" class="selected-image" />\
            </div>\
            <div class="delete-media-container">\
                <a href="" ng-click="callbacks.deleteMedia(qEleType, mediaIndex, \'image\');" class="deleteMedia" data-tooltip="Delete image" data-inverted="">\
                    <i class="trash alternate outline large icon delete-icon" ></i>\
                </a>\
            </div>\
        </div>\
        <div class="selected-audio-container" ng-if="formdata.audio.length > 0">\
          <div class="audio-name-delete-container">\
            <div class="audio-container">\
              <audio src="{{formdata.audio}}" controls controlsList="nodownload" preload="none" class="selected-audio"\
                 data-tooltip="Play audio" data-inverted="">\
              </audio>\
              <i ng-click="callbacks.addMedia(qEleType, mediaIndex, \'audio\');" class="music icon"></i><p ng-click="callbacks.addMedia(qEleType, mediaIndex, \'audio\');">{{formdata.audioName}}</p>\
                </div>\
                <div class="delete-media-container">\
                    <a href="" ng-click="callbacks.deleteMedia(qEleType, mediaIndex, \'audio\');" class="deleteMedia" data-tooltip="Delete audio" data-inverted="">\
                        <i class="trash alternate outline large icon delete-icon"></i>\
                    </a>\
                </div>\
            </div>\
        </div>\
      </div>\
    </div>\
  '
    };
});

//# sourceURL=questionunit-util.js
org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.questionunit","ver":"1.2","author":"Jagadish Pujari, Rahul Shukla","type":"plugin","title":"Question Unit Base Plugin","description":"Question Unit Base Plugin that declares the interfaces that Question Unit Plugins must define.","publishedDate":"","editor":{"main":"editor/plugin.js","dependencies":[{"type":"css","src":"editor/styles/styles.css"},{"type":"js","src":"editor/js/util.js"},{"type":"plugin","plugin":"org.ekstep.mathtext","ver":"1.0"},{"type":"plugin","plugin":"org.ekstep.libs.ckeditor","ver":"1.1"}],"help":{"src":"editor/help.md","dataType":"text"}},"renderer":{"main":"renderer/plugin.js","dependencies":[{"type":"image","src":"renderer/assets/audio-icon.png","id":"org.ekstep.questionunit.renderer.audioicon","assetId":"org.ekstep.questionunit.renderer.audioicon"},{"type":"image","src":"renderer/assets/down_arrow.png","id":"org.ekstep.questionunit.renderer.downarrow","assetId":"org.ekstep.questionunit.renderer.downarrow"},{"type":"image","src":"renderer/assets/zoom.png","id":"org.ekstep.questionunit.renderer.zoom","assetId":"org.ekstep.questionunit.renderer.zoom"},{"type":"image","src":"renderer/assets/audio-icon1.png","id":"org.ekstep.questionunit.renderer.audio-icon1","assetId":"org.ekstep.questionunit.renderer.audio-icon1"},{"type":"js","src":"renderer/components/js/components.js"},{"type":"css","src":"renderer/components/css/components.css"}]}},org.ekstep.contenteditor.questionUnitPlugin=org.ekstep.contenteditor.basePlugin.extend({type:"org.ekstep.contenteditor.questionUnitPlugin",_data:{},initialize:function(){this.beforeInit(),this.afterInit(),ecEditor.addEventListener(this.manifest.id+":changeFontSize",this.questionUnitFontChange,this)},beforeInit:function(){},afterInit:function(){},renderForm:function(t){this._data=t;var e=this;ecEditor.addEventListener("org.ekstep.questionunit:ready",function(){ecEditor.dispatchEvent(e.manifest.id+":editquestion",t)})},validateForm:function(n){var i=this;ecEditor.dispatchEvent(this.manifest.id+":validateform",function(t,e){i._data=e,_.isFunction(n)&&n(t,e)})},questionUnitFontChange:function(t,e){t=t.target;t.data.data.question.text=this.changeFontSize(t.data.data.question),t.data=this.questionFontSizeChange(t.data),e(t)},questionFontSizeChange:function(t){var e=this,n=t,i=t;switch(t.plugin.id){case"org.ekstep.questionunit.mcq":case"org.ekstep.questionunit.sequence":i.data.options=e.optionsTextFontChange(i.data.options,t.config.metadata.category),t=i;break;case"org.ekstep.questionunit.mtf":i.data.option.optionsLHS=e.optionsTextFontChange(i.data.option.optionsLHS,t.config.metadata.category),i.data.option.optionsRHS=e.optionsTextFontChange(i.data.option.optionsRHS,t.config.metadata.category),t=i}return n},optionsTextFontChange:function(t,e){var n=this,i=t;return"mcq"==e||"MCQ"==e?_.each(t,function(t,e){i[e].text=n.changeFontSize(t)}):"mtf"==e&&_.each(t,function(t,e){i[e].text='<p style="font-size:1.28em">'+i[e].text+"</p>"}),i},changeFontSize:function(t){var e,n;return 0==t.text.indexOf("<p><span")?(e=$($.parseHTML(t.text)),n=$(e)[0].children[0].style.fontSize,parseFloat(n)<1.285&&($(e)[0].children[0].style.fontSize="1.285em",t.text=$(e).prop("outerHTML")),t.text):t.text.replace(/<p>/g,"<p style='font-size:1.285em;'>")}}))