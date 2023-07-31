
/**
 * @author Harish kumar Gangula<harishg@ilimi.in>
 */
org.ekstep.pluginframework.draftRepo = new(org.ekstep.pluginframework.iRepo.extend({
    id: "draft",
    discoverManifest: function(pluginId, pluginVer, callback, publishedTime) {
        var instance = this;
        org.ekstep.pluginframework.resourceManager.loadResource(this.resolveResource(pluginId, pluginVer, "manifest.json"), "json", function(err, response) {
            callback(undefined, { "manifest": response, "repo": instance });
        }, publishedTime);
    },
    resolveResource: function(id, ver, resource) {
    	return "/content-plugins/" + id + "-snapshot" + "/" + resource;
    }
}));

/**
 * @author Harish kumar Gangula<harishg@ilimi.in>
 */
org.ekstep.pluginframework.hostRepo = new(org.ekstep.pluginframework.iRepo.extend({
    id: "host",
    basePath: "https://localhost:8081",
    connected: false,
    init: function() {
    	this.checkConnection();
    },
    checkConnection: function(cb) {
    	var instance = this;
    	org.ekstep.pluginframework.resourceManager.loadResource(this.basePath + "/list", "json", function(err, res) {
            if(!err) {
                instance.connected = true;
            }
        });
    },
    discoverManifest: function(pluginId, pluginVer, callback, publishedTime) {
        if(this.connected) {
            var instance = this;
            org.ekstep.pluginframework.resourceManager.loadResource(this.resolveResource(pluginId, pluginVer, "manifest.json"), "json", function(err, response) {
                callback(undefined, { "manifest": response, "repo": instance });
            }, publishedTime);
        } else {
            callback(undefined, { "manifest": undefined, "repo": undefined });
        }
    },
    resolveResource: function(pluginId, pluginVer, resource) {
    	return this.basePath + "/" + pluginId + "-" + pluginVer + "/" + resource;
    }
}));

org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.developer","ver":"1.0","author":"Harishkumar Gangula","title":"Developer Plugin","description":"","publishedDate":"","editor":{"main":"editor/plugin.js","dependencies":[{"type":"css","src":"editor/developer.css"},{"type":"js","src":"editor/draft-repo.js"},{"type":"js","src":"editor/host-repo.js"}],"menu":[],"sidebarMenu":[{"id":"developer","state":"HIDE","category":"config","type":"icon","toolTip":"Developer","title":"Developers","iconClass":"code icon","templateURL":"editor/partials/sidebarDeveloperTemplate.html"}]},"renderer":{"main":"renderer/plugin.js","dependencies":[{"type":"js","src":"editor/draft-repo.js"},{"type":"js","src":"editor/host-repo.js"}]}},org.ekstep.contenteditor.basePlugin.extend({initialize:function(){ecEditor.addEventListener("org.ekstep.developer:loadplugin",this.loadPlugin,this),ecEditor.addEventListener("org.ekstep.developer:getPlugins",this.listPlugins,this),ecEditor.addEventListener("org.ekstep.developer:updateLocalServerPath",this.updateLocalServerPath,this);var e=ecEditor.getAngularScope();e.localServerPath=e.localServerPath||org.ekstep.pluginframework.hostRepo.basePath,e.configMenus=e.configMenus||[],e.developerMode&&(org.ekstep.contenteditor.api.updateSidebarMenu({id:"developer",state:"SHOW"}),ecEditor.addResourceRepository(org.ekstep.pluginframework.hostRepo,0),ecEditor.addResourceRepository(org.ekstep.pluginframework.draftRepo,1)),e.localServerPathEdit=!1,org.ekstep.contenteditor.api.ngSafeApply(e,function(){}),this.listPlugins()},loadPlugin:function(e,t){org.ekstep.contenteditor.api.getAngularScope();var o=t.plugin.lastIndexOf("-"),n=t.plugin.substr(0,o),o=t.plugin.substr(o+1,t.plugin.length);org.ekstep.contenteditor.api.loadAndInitPlugin(n,o,(new Date).getTime())},listPlugins:function(e,t){var o=org.ekstep.contenteditor.api.getAngularScope();o.localPlugins=[],o.contributedPluginMessageClass="",o.contributedPluginMessage="",org.ekstep.contenteditor.api.jQuery.ajax({type:"GET",url:org.ekstep.pluginframework.hostRepo.basePath+"/list",beforeSend:function(){o.localPluginsPlugins=!0,org.ekstep.contenteditor.api.ngSafeApply(o,function(){})},success:function(e){org.ekstep.contenteditor.api._.isArray(e)&&0===e.length&&(o.contributedPluginMessageClass="info",o.contributedPluginMessage="No plugins found."),org.ekstep.contenteditor.api._.isArray(e)&&(o.localPlugins=e),org.ekstep.contenteditor.api.ngSafeApply(o,function(){})},error:function(e){o.contributedPluginMessageClass="error",o.contributedPluginMessage="Unable to loadPlugins."},complete:function(){o.loadingContributedPlugins=!1,org.ekstep.contenteditor.api.ngSafeApply(o,function(){})}})},updateLocalServerPath:function(e,t){var o=org.ekstep.contenteditor.api.getAngularScope();org.ekstep.pluginframework.hostRepo.basePath=t.path,org.ekstep.pluginframework.hostRepo.checkConnection(),o.localServerPathEdit=!1,org.ekstep.contenteditor.api.ngSafeApply(o,function(){}),this.listPlugins()}}))