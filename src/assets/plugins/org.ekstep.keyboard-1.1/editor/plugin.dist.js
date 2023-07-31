
/**
 * Plugin to Create directive for keyboard config
 * @class keyboardCtrl
 * Jagadish Pujari <jagadish.pujari@tarento.com>
 */
'use strict';
angular.module('keyBoardApp', [])
.directive('keyboardConfig', function() {
  return {
    restrict: 'AE',
    scope: {
      data: '='
    },
    templateUrl: ecEditor.resolvePluginResource('org.ekstep.keyboard', '1.1', 'editor/keyboard.directive.html'),
    link: function(scope) {
      scope.keyboardTypes = ['Device', 'English', 'Custom'];
      if (!_.isUndefined(scope.data) && !_.isUndefined(scope.data.keyboardType))
        scope.keyboardType = scope.data.keyboardType;
      if (!_.isUndefined(scope.data) && !_.isUndefined(scope.data.keyboardType) && scope.data.keyboardType == 'Custom'){
        scope.customTag = true;
        scope.keys = scope.data.customKeys;
        var keys = scope.keys.split(',');
        var editorKeywords = _.uniq(keys);
        scope.editorKeys = [];
        _.each(editorKeywords,function(item){
          if(item)
            scope.editorKeys.push(item);
        });
      }
      else{
        scope.customTag = false;
      }
      scope.selectKeyboardType = function() {
        scope.data.keyboardType = scope.keyboardType;
        if (scope.keyboardType == 'Custom') {
          scope.customTag = true;
          var optionsData = {
            "context": {
                'cdata': [{
                    "id": "question:keyboard:custom",
                    "type": "Feature"
                },{
                    "id":"SB-7813",
                    "type":"Task"
                }]
            }
        };
          scope.generateTelemetry({
            'type' : 'select',
            'id':'keyboard-select-type-custom'
          },optionsData)
        } else {
          scope.customTag = false;
        }
      };
      scope.tokenizeTags = function(event) {
        scope.data.customKeys = event.target.value;
      };
      scope.updateKeys = function () {
        if(scope.keys){
          scope.editorKeys = [];
          var splitWords = scope.keys.split(',');
          var editorKeywords = _.uniq(splitWords);
          _.each(editorKeywords,function(item){
            if(item)
              scope.editorKeys.push(item);
          });
        }else{
          scope.editorKeys = [];
        }
      };

      scope.generateTelemetry = function(data, options){
        ecEditor.getService('telemetry').interact({
          "type": data.type || '',
          "id": data.id || '',
          "plugin": {
              "id": 'org.ekstep.keyboard',
              "ver": ecEditor.getPlugin('org.ekstep.keyboard').m.ver
          }
      }, options)
      }
    }
  };
});

//# sourceURL=keyboardditorCtrl.js
org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.keyboard","ver":"1.1","author":"Jagadish","type":"plugin","title":"Keyboard","description":"","editor":{"main":"editor/plugin.js","dependencies":[{"type":"css","src":"editor/style.css"},{"type":"js","src":"editor/keyboard.js"}],"menu":[]},"renderer":{"main":"renderer/plugin.js","dependencies":[{"type":"js","src":"renderer/keyboard.js","scope":"renderer"},{"type":"css","src":"renderer/style/style.css","scope":"renderer"}]},"icon":"assets/icon.png","languages":["English"],"categories":[""],"keywords":[""]},org.ekstep.keyboard={},org.ekstep.keyboard.EditorPlugin=org.ekstep.contenteditor.basePlugin.extend({initialize:function(){var e=this,i=ecEditor.resolvePluginResource(e.manifest.id,e.manifest.ver,"editor/keyboard.directive.html"),e=ecEditor.resolvePluginResource(e.manifest.id,e.manifest.ver,"editor/keyboard.js");ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(i,e)},newInstance:function(){}}))