org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.reviewercomments","ver":"1.0","author":"Revathi P","title":"Reviewer Comments","description":"","publishedDate":"","editor":{"main":"editor/plugin.js","dependencies":[{"type":"css","src":"editor/comments.css"}],"menu":[],"sidebarMenu":[{"id":"comments","type":"icon","toolTip":"comments","title":"comments","iconClass":"comment icon","templateURL":"editor/partials/sidebarCommentsTemplate.html"}]}},org.ekstep.contenteditor.basePlugin.extend({NO_COMMENTS:"No Reviewer Comments",initialize:function(){ecEditor.addEventListener("stage:render:complete",this.initializeComments,this)},initializeComments:function(e,t){var n,o=this;null==o.comments?(this.context=org.ekstep.contenteditor.globalContext,ecEditor._.get(this.context.contentId)||(o=this,n=ecEditor.getService("content").getContentMeta(org.ekstep.contenteditor.api.getContext("contentId")).pkgVersion,n={request:{contextDetails:{contentId:ecEditor.getContext("contentId"),contentType:ecEditor.getService("content").getContentMeta(org.ekstep.contenteditor.api.getContext("contentId")).mimeType,contentVer:_.isUndefined(n)?"0":n.toString()}}},ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getComments(n,function(e,t){try{t&&t.data.responseCode&&t.data.result.comments&&o.showComments(t.data.result.comments)}catch(e){o.displayNoComments(),ecEditor.dispatchEvent("org.ekstep.toaster:error",{message:"Error in fetching comments, please try again!",position:"topCenter",icon:"fa fa-warning"}),ecEditor.getService("telemetry").error({env:"content",stage:ecEditor.getCurrentStage().id,action:"review comments",objectid:"",objecttype:"",err:e.status,type:"API",data:e,severity:"fatal"}),console.warn("error in fetching review comments: ",e)}}))):o.displayStageComments(o.comments)},showComments:function(e){e&&(e=_.sortBy(e,function(e){return new Date(e.createdOn)}),this.mapComment(e))},displayNoComments:function(){jQuery('a[data-content ="comments"]').removeClass("highlight"),ecEditor.jQuery("#reviewerComments").html("<div>"+this.NO_COMMENTS+"</div>")},getMonthName:function(e){return(e=new Date(e)).toLocaleString("en-us",{month:"long"}).toString().substr(0,3)+" "+e.getDate()},mapComment:function(e){var n=this,o=[];_.map(e,function(e){var t={};t.username=e.userInfo.name,t.logo=e.userInfo.logo||ecEditor.resolvePluginResource(n.manifest.id,n.manifest.ver,"assets/reviewer_icon.png"),t.username=e.userInfo.name,t.date=n.getMonthName(e.createdOn),t.body=e.body,t.stageId=e.stageId,o.push(t)});n.comments=o,n.displayStageComments()},filterComments:function(){return _.filter(this.comments,["stageId",ecEditor.getCurrentStage().id])},displayStageComments:function(){var e;filteredComments=[],0<(filteredComments=this.filterComments()).length?(e=_.template('<% _.each(filteredComments, function(item) { %><div class="comment"> <div class="avatar"><img src= " <%-item.logo %> "/></div><div class="content"><div class="flex-class"><span class="author"><%- item.username %></span><span class="date"><%- item.date %> </span></div><div class="text"> <%-item.body  %> </div></div></div><% }); %>'),ecEditor.jQuery('a[data-content ="comments"]').addClass("highlight"),ecEditor.jQuery("#reviewerComments").html(e)):this.displayNoComments()}}))