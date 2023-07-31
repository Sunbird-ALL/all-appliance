org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.scribblepad","ver":"1.0","author":"Santhosh Vasabhaktula","title":"Scribblepad Plugin","description":"","displayName":"Scribble","publishedDate":"","editor":{"main":"editor/plugin.js","dependencies":[],"menu":[{"id":"scribblepad","category":"main","type":"icon","toolTip":"Add Scribblepad","title":"scribblepad","iconClass":"icon-scribble icon","onclick":{"id":"org.ekstep.scribblepad:create","data":{"type":"roundrect","y":20,"x":25,"fill":"#3399FF","w":27,"h":60,"stroke":"rgba(255, 255, 255, 0)","strokeWidth":2,"opacity":0.3}},"media":[{"id":"eraserImage","src":"assets/EraserImage.png","type":"image"}]}],"configManifest":[{"propertyName":"color","title":"Fill color","description":"Choose a color from the color picker","dataType":"colorpicker","required":true,"defaultValue":"#3399FF"},{"propertyName":"opacity","title":"Transparency","description":"Set the transparency for element","dataType":"rangeslider","labelSuffix":"%","required":true,"minimumValue":0,"maximumValue":100}],"help":{"src":"editor/help.md","dataType":"text"}},"renderer":{"main":"renderer/scribblepadplugin.js"}},org.ekstep.contenteditor.basePlugin.extend({type:"org.ekstep.scribblepad",initialize:function(){},newInstance:function(){var t=this.convertToFabric(this.attributes);t.stroke=this.attributes.stroke,t.strokeWidth=this.attributes.strokeWidth,t.fill=this.attributes.fill,"roundrect"===this.attributes.type&&(this.editorObj=new fabric.Rect(t),this.addMedia({id:"org.ekstep.scribblepad.eraser",src:"/assets/public/content/1460624453530trash.png",assetId:"org.ekstep.scribblepad.eraser",type:"image",preload:!0}))},updateAttributes:function(){var i=this;i&&ecEditor._.forEach({radius:"radius",opacity:"opacity",stroke:"stroke","stroke-width":"stroke-width",scaleX:"scaleX",scaleY:"scaleY"},function(t,e){i.attributes[e]=i.editorObj.get(t)})},onConfigChange:function(t,e){"color"===t&&(this.editorObj.setFill(e),this.attributes.fill=e),ecEditor.render(),ecEditor.dispatchEvent("object:modified",{target:ecEditor.getEditorObject()})},getAttributes:function(){var t=this._super();return delete t.strokeDashArray,t["stroke-width"]=1,t.thickness=2,t},getConfig:function(){var t=this._super();return t.color=this.attributes.fill,t.opacity=100*this.attributes.opacity,t}}))