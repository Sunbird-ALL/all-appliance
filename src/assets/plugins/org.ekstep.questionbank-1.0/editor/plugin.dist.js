


/**
 * Plugin to add questions in question set
 * @class QuestionFormController
 * Swati singh <Swati.singh@tarento.com>
 */
'use strict';
angular.module('createquestionapp', [])
  .controller('QuestionFormController', ['$scope', 'pluginInstance', function ($scope, pluginInstance) {
    var savedFilters = null;
    var savedQuestions = null;
    $scope.currentUserId = ecEditor.getContext('user').id;
    $scope.isQuestionTab = true;
    $scope.selectedQuestions = [];
    $scope.showConfigForm = false;
    $scope.isQuestionSetConfig = false;
    $scope.selQuestionObj = {};
    $scope.questions = [];
    $scope.itemRange = [];
    $scope.Totalconcepts;
    $scope.totalTopics;
    $scope.selectedConceptsData;
    $scope.selectedTopicsData;
    $scope.selectedQueIndex;
    $scope.grades;
    $scope.languages;
    $scope.resultNotFound = 0;
    $scope.versions = [1, 2];
    $scope.filterForm = '';
    $scope.framework = ecEditor.getContext('framework');
    $scope.difficultyLevels = ['All', 'Easy', 'Medium', 'Difficult'];
    $scope.configScore = false;
    $scope.contentMetaData = ecEditor.getService(ServiceConstants.CONTENT_SERVICE).getContentMeta(ecEditor.getContext('contentId'));
    $scope.contentType = $scope.contentMetaData.contentType;
    $scope.questionTypes = [{
      "name": "Multiple Choice Questions",
      "value": "mcq"
    }, {
      "name": "Fill in the Blanks",
      "value": "ftb"
    }, {
      "name": "Match the Following",
      "value": "mtf"
    }];
    $scope.filterObj = {};
    $scope.selectedIndex;
    $scope.conceptsText = '(0) Concepts';
    $scope.topicsText = '(0) Topics';
    $scope.pluginIdObj = {
      "question_set_id": "org.ekstep.questionset",
      "question_create_id": "org.ekstep.question",
      "concepts_id": "org.ekstep.conceptselector",
      "topics_id": "org.ekstep.topicselector",
      "question_bank_id": "org.ekstep.questionbank"
    }
    $scope.filterData = {
      request: {
        "filters": {
          "objectType": [
            "AssessmentItem"
          ],
          "status": ["Live"]
        },
        "sort_by": {
          "lastUpdatedOn": "desc"
        },
        "limit": 200
      }
    };
    $scope.csspath = ecEditor.resolvePluginResource(pluginInstance.manifest.id, pluginInstance.manifest.ver, 'editor/style.css');
    $scope.questionnotfound = ecEditor.resolvePluginResource(pluginInstance.manifest.id, pluginInstance.manifest.ver, 'assets/contentnotfound.jpg');
    $scope.questionSetConfigObj = {
      "title": "",
      "max_score": 1,
      "allow_skip": true,
      "show_feedback": true,
      "shuffle_questions": false,
      "shuffle_options": false,
      "total_items": 1
    };
    $scope.questionSetConfigObj['show_feedback'] =  ($scope.contentType == 'SelfAssess')? false : true;

    $scope._constants = {
      previewPlugin: 'org.ekstep.questionset.preview',
      questionPlugin: 'org.ekstep.question',
      questionsetPlugin: 'org.ekstep.questionset',
      questionbankPlugin: 'org.ekstep.questionbank'
    };

    ecEditor.addEventListener('editor:form:change', function (event, data) {
      if (data.templateId == "filterMetaDataTemplate") {
        if (data.key.toLowerCase() == "concepts") {
          $scope.filterObj.concepts = [];
          _.forEach(data.value, function (id) {
            $scope.filterObj.concepts.push(id.identifier);
          });
        } else if (data.key.toLowerCase() == "topic") {
          $scope.filterObj.topics = [];
          _.forEach(data.value, function (id) {
            $scope.filterObj.topics.push(id);
          });
        }
        $scope.searchQuestions($scope.filterObj);
      }
    });

    $scope.searchQuestions = function (filterData, callback) {
      $scope.itemsLoading = true;
      var data = {
        request: {
          "filters": {
            "objectType": [
              "AssessmentItem"
            ],
            "version": [1,2],
            "status": ["Live"]
          },
          "sort_by": {
            "lastUpdatedOn": "desc"
          },
          "limit": 200
        }
      };
      if (filterData) {
        $scope.filterObj = filterData;
      }
      savedFilters = $scope.filterObj;
      if ($scope.filterObj.myQuestions) {
        var userId = $scope.currentUserId;
        data.request.filters.createdBy = userId;
      } else {}
      // setting filters values and title to request data
      ecEditor._.forEach($scope.filterObj, function (value, key) {
        if (value) {
          switch (key) {
            case "searchText":
              data.request.query = value;
              break;
            case "gradeLevel":
              if (value.length) {
                data.request.filters.gradeLevel = value;
              }
              break;
            case "medium":
              data.request.filters.medium = value;
              break;
            case "level":
              data.request.filters.qlevel = value;
              break;
            case "board":
              data.request.filters.board = value;
              break;
            case "subject":
              data.request.filters.subject = value;
              break;
            case "questionType":
              data.request.filters.type = [];
              _.each(value, function(val){
                data.request.filters.type.push(_.find($scope.questionTypes, { 'name': val}).value);
              });
              break;
            case "concepts":
              data.request.filters.concepts = [];
              value.forEach(function (v) {
                if (_.isString(v)) {
                  data.request.filters.concepts.push(v);
                } else {
                  if (v && v.identifier) {
                    data.request.filters.concepts.push(v.identifier);
                  }
                }
              });
              break;
            case "topics":
              data.request.filters.topic = value;
              break;
          }
        }
      });
      // get Questions from questions api
      ecEditor.getService('assessment').getQuestions(data, function (err, resp) {
        if (!err) {
          if (resp.data.result.count > 0) {
            $scope.questions = resp.data.result.items;
            savedQuestions = $scope.questions;
            $scope.resultNotFound = resp.data.result.count;
            for (var i = 0; i < $scope.selectedQuestions.length; i++) {
              for (var j = 0; j < $scope.questions.length; j++) {
                if ($scope.selectedQuestions[i].identifier == $scope.questions[j].identifier) {
                  $scope.questions[j].isSelected = true;
                }
              }
            }
          } else {
            $scope.resultNotFound = resp.data.result.count;
            $scope.questions = [];
          }
          $scope.itemsLoading = false;
          $scope.$safeApply();
          if (_.isFunction(callback)) {
            callback($scope.questions);
          }
        } else {
          $scope.errorMessage = true;
          $scope.$safeApply();
          return;
        }
      });
    };
    /**
     *  init funtion is called when html is loaded
     *  @memberof QuestionFormController
     */
    $scope.init = function () {
      // $scope.searchQuestions();
      $scope.selectedIndex = undefined;
      ecEditor.addEventListener('editor:template:loaded', function (event, object) {
        if (object.formAction == 'question-filter-view') {
          $scope.filterForm = object.templatePath;
        }
      });
      ecEditor.addEventListener(pluginInstance.manifest.id + ":saveQuestion", function (event, data) {
    
        $scope.selectedQuestions = [data];
        $scope.$safeApply();
      });
     
    }

    /**
     *  creating range of number of items to display as per number of question selected
     *  @memberof QuestionFormController
     */
    $scope.createTotalItemRange = function () {
      $scope.itemRange = [];
      for (var i = 1; i <= $scope.selectedQuestions.length; i++) {
        $scope.itemRange.push(i);
      }
      $scope.$safeApply();
    }

    /**
     *  Creating list of selected questions for creating question set
     *  @memberof QuestionFormController
     *  @param {Object} selQuestion Selected question object
     */
    $scope.selectQuestion = function (selQuestion) {
      //play preview
      $scope.previewItem(selQuestion, true);
      var isQuestionSelected = selQuestion.isSelected;
      if (ecEditor._.isUndefined(selQuestion.body)) {
        $scope.getItem(selQuestion, function (selQuestion) {
          var selObjindex = _.findLastIndex($scope.questions, {
            identifier: selQuestion.identifier
          });
          if (selObjindex > -1) {
            $scope.questions[selObjindex] = selQuestion;
            $scope.questions[selObjindex].isSelected = !isQuestionSelected;
          }
          $scope.$safeApply();
          $scope.selectQuestionData(selQuestion);
        });
      } else {
        $scope.selectQuestionData(selQuestion);
      }
    }

    /**
     *  Creating list of selected questions for creating question set
     *  @memberof QuestionFormController
     *  @param {Object} selQuestion Selected question object
     */
    $scope.selectQuestionData = function (selQuestion) {
      var selObjindex = _.findLastIndex($scope.selectedQuestions, {
        identifier: selQuestion.identifier
      });
      // var selObjindex = $scope.selectedQuestions.indexOf(selQuestion);
      if (selObjindex > -1) {
        $scope.selectedQuestions.splice(selObjindex, 1);
      } else {
        $scope.selectedQuestions.push(selQuestion);
      }
      $scope.$safeApply();
    }
    /**
     *  Funtion to edit the config data of question
     *  @memberof QuestionFormController
     *  @param {Object} quesObj Question Object
     *  @param {int} index Index of the question object
     */
    $scope.editConfig = function (quesObj, index) {
      $scope.selectedIndex = index;
      $scope.selQuestionObj = {};
      $scope.selQuestionObj = quesObj;
      //$scope.showConfigForm = true;
    }

    /**
     *  Funtion to remove question from selected question list
     *  @memberof QuestionFormController
     *  @param {Object} selQuestion Selected question object
     */
    $scope.removeQuestion = function (selQuestion) {
      var selObjindex = $scope.selectedQuestions.indexOf(selQuestion);
      if (selObjindex > -1) {
        $scope.selectedQuestions.splice(selObjindex, 1);
        if ($scope.selectedIndex == selObjindex) {
          if ($scope.selectedIndex > ($scope.selectedQuestions.length - 1)) {
            $scope.editConfig($scope.selectedQuestions[$scope.selectedIndex - 1], ($scope.selectedIndex - 1));
          } else {
            $scope.editConfig($scope.selectedQuestions[$scope.selectedIndex], ($scope.selectedIndex));
          }
        }
      }

      selObjindex = _.findLastIndex($scope.questions, {
        identifier: selQuestion.identifier
      });
      if (selObjindex > -1) {
        $scope.questions[selObjindex].isSelected = false;
      }
      $scope.$safeApply();
      $scope.setDisplayandScore();
    }

    /**
     *  Funtion to remove question from selected question list
     *  @memberof QuestionFormController
     */
    $scope.saveConfig = function () {

      //Update max_score question->config->metadata
      var qBody = JSON.parse($scope.selQuestionObj.body);
      qBody.data.config.metadata.max_score = $scope.selQuestionObj.max_score;
      $scope.selQuestionObj.body = JSON.stringify(qBody);

      var selectedObjIndex = _.findLastIndex($scope.questions, {
        identifier: $scope.selQuestionObj.identifier
      });
      if (selectedObjIndex > -1) {
        $scope.questions[selectedObjIndex] = $scope.selQuestionObj;
      }
      delete $scope.questionObj;
    }

    $scope.closeConfigForm = function () {
      $scope.selQuestionObj = {};
      $scope.showConfigForm = false;
    }

    $scope.setDisplayandScore = function () {
      var length = $scope.selectedQuestions.length;
      $scope.questionSetConfigObj.total_items = length;
      var score = 0;
      for (var i = 0; i < length; i++) {
        score = score + $scope.selectedQuestions[i].max_score;
      }
      $scope.questionSetConfigObj.max_score = score;
      setTimeout(function() {
                        $(".questionCount").dropdown({
                            useLabels: false,
                            forceSelection: true,
                        }) .dropdown('set selected', length);
                        $rootScope.$safeApply();
      }, 0);
      $scope.$safeApply();
      $scope.createTotalItemRange();
    }

    /**
     *  Funtion to save question set
     *  @memberof QuestionFormController
     */
    $scope.createQuestionSet = function () {
      _.each($scope.selectedQuestions, function (question) {
        if (question.version == 1 && question.template_id) {
          $scope.getv1Template(question.template_id, question, function (controller) {
            question.template = controller.template;
            if (controller.mediamanifest) question.mediamanifest = controller.mediamanifest;
          });
        }
      });
      $scope.isQuestionSetConfig = true;
      $scope.isQuestionTab = false;
      $scope.createTotalItemRange();
      //$scope.setDisplayandScore();
      //$scope.previewItem($scope.selectedQuestions[0], true);
      //$scope.editConfig($scope.selectedQuestions[0], 0);
    }

    /**
     *  Funtion to add question set to editor. It dispatch an event to question set plugin for adding question set
     *  @memberof QuestionFormController
     */
    $scope.addQuestionSet = function () {
      var questionSet = {};
      var callback = pluginInstance.callback;
      questionSet.data = [];
      questionSet.config = $scope.questionSetConfigObj;
      questionSet.data = $scope.selectedQuestions;
      ecEditor.dispatchEvent($scope.pluginIdObj.question_set_id + ":addQS", {
        callback: callback,
        data: questionSet
      });
      $scope.closeThisDialog();
    }

    $scope.showSelectedQue = function (index) {
      delete $scope.selectedQueIndex;
      $scope.selectedQueIndex = index;
      var filterMetaData = {};
      ecEditor.dispatchEvent('org.ekstep.editcontentmeta:showpopup', {
        action: 'question-filter-view',
        subType: 'questions',
        framework: ecEditor.getContext('framework'),
        rootOrgId: ecEditor.getContext('channel'),
        type: 'content',
        popup: false,
        metadata: filterMetaData
      });
    }

    /**  Funtion to dispatch event to question creation plugin for creating new questions
     *  @memberof QuestionFormController
     */
    $scope.createQuestion = function () {
      ecEditor.dispatchEvent($scope.pluginIdObj.question_create_id + ":showpopup", {});
    }

    $scope.editQuestion = function (questionObj) {
      if (ecEditor._.isUndefined(questionObj.body)) {
        $scope.getItem(questionObj, function (questionObj) {
          ecEditor.dispatchEvent($scope.pluginIdObj.question_create_id + ":showpopup", questionObj);
        });
      } else {
        ecEditor.dispatchEvent($scope.pluginIdObj.question_create_id + ":showpopup", questionObj);
      }
    }
    $scope.copyQuestion = function (questionObj) {
      //save question on server
      if (ecEditor._.isUndefined(questionObj.body)) {
        $scope.getItem(questionObj, function (questionObj) {
          $scope.saveCopiedQuestion(questionObj);
        });
      } else {
        $scope.saveCopiedQuestion(questionObj);
      }
    }

    $scope.saveCopiedQuestion = function (qData) {
      var assessmentId = undefined;
      var questionBody = JSON.parse(qData.body);
      if (qData.framework != ecEditor.getContext('framework')) {
        qData.identifier = "";
        qData.name = "Copy of - " + qData.name;
        qData.title = "Copy of - " + qData.title;
        ecEditor.dispatchEvent($scope.pluginIdObj.question_create_id + ":showpopup", qData);
      } else {
        questionBody.data.config.metadata.title = "Copy of - " + questionBody.data.config.metadata.title;
        questionBody.data.config.metadata.level = questionBody.data.config.metadata.qlevel || questionBody.data.config.metadata.level;
        var outRelations = [];
        _.each(questionBody.data.config.metadata.concepts, function (concept) {
          outRelations.push({
            "endNodeId": concept.endNodeId,
            "relationType": "associatedTo"
          });
        });
        var metadata = {
          "code": "NA",
          "name": "Copy of - " + questionBody.data.config.metadata.name,
          "title": "Copy of - " + questionBody.data.config.metadata.name,
          "medium": questionBody.data.config.metadata.medium,
          "max_score": questionBody.data.config.metadata.max_score,
          "gradeLevel": questionBody.data.config.metadata.gradeLevel,
          "subject": questionBody.data.config.metadata.subject,
          "board": questionBody.data.config.metadata.board,
          "qlevel": questionBody.data.config.metadata.level,
          "question": questionBody.data.data.question.text,
          "isShuffleOption": questionBody.data.config.isShuffleOption,
          "body": JSON.stringify(questionBody),
          "itemType": "UNIT",
          "version": 2,
          "category": questionBody.data.config.metadata.category,
          "description": questionBody.data.config.metadata.description,
          "createdBy": window.context.user.id,
          "channel": ecEditor.getContext('channel'),
          "type": questionBody.data.config.metadata.category.toLowerCase(), // backward compatibility
          "template": "NA", // backward compatibility
          "template_id": "NA", // backward compatibility
          "topic": questionBody.data.config.metadata.topic,
          "framework": ecEditor.getContext('framework')
        };
        var dynamicOptions = [{
          "answer": true,
          "value": {
            "type": "text",
            "asset": "1"
          }
        }];
        var mtfoptions = [{
          "value": {
            "type": "mixed",
            "text": "इक",
            "image": "",
            "count": "",
            "audio": "",
            "resvalue": "इक",
            "resindex": 0
          },
          "index": 0
        }];
        switch (questionBody.data.config.metadata.category) {
          case 'MCQ':
            metadata.options = dynamicOptions;
            break;
          case 'FTB':
            metadata.answer = dynamicOptions;
            break;
          case 'MTF':
            metadata.lhs_options = mtfoptions;
            metadata.rhs_options = mtfoptions;
            break;
          default:
            metadata.options = dynamicOptions;
            break;
        }
        var qFormData = {
          "request": {
            "assessment_item": {
              "objectType": "AssessmentItem",
              "metadata": metadata,
              "outRelations": outRelations
            }
          }
        };
        ecEditor.getService('assessment').saveQuestionV3(assessmentId, qFormData, function (err, resp) {
          if (!err) {
            var qMetadata = qFormData.request.assessment_item.metadata;
            qMetadata.identifier = resp.data.result.node_id;
            ecEditor.dispatchEvent($scope.pluginIdObj.question_bank_id + ':saveQuestion', qMetadata);
            ecEditor.dispatchEvent($scope.pluginIdObj.question_create_id + ":showpopup", qMetadata);
          } else {
            ecEditor.dispatchEvent("org.ekstep.toaster:error", {
              title: 'Failed to copy question...',
              position: 'topCenter',
            });
          }
        });
      }
    }
    $scope.deleteQuestion = function (questionObj) {
      $scope.assessmentId = questionObj.identifier;
      ecEditor.getService('assessment').deleteQuestion($scope.assessmentId, $scope.deleteCallBack);
    }

    $scope.deleteCallBack = function (err, resp) { // eslint-disable-line no-unused-vars
      if (!err) {
        _.each($scope.questions, function (question, key) {
          if (!_.isUndefined(question) && !_.isUndefined(question.identifier)) {
            if (question.identifier == $scope.assessmentId) {
              $scope.questions.splice(key, 1);
            }
          }
        })
        //after deleting question the selection question updated
        _.each($scope.selectedQuestions, function (question, key) {
          if (!_.isUndefined(question) && !_.isUndefined(question.identifier)) {
            if (question.identifier == $scope.assessmentId) {
              $scope.selectedQuestions.splice(key, 1);
            }
          }
        })
      } else {
        ecEditor.dispatchEvent("org.ekstep.toaster:error", {
          title: 'Failed to delete question...',
          position: 'topCenter',
        });
      }
      $scope.$safeApply();
    }

    $scope.deleteQuestionHandler = function (questionObj) {
      var config = {
        template: ecEditor.resolvePluginResource(pluginInstance.manifest.id, pluginInstance.manifest.ver, "editor/deletepopup.html"),
        controller: ['$scope', 'mainCtrlScope', function ($scope, mainCtrlScope) {
          $scope.delete = function () {
            mainCtrlScope.deleteQuestion(questionObj);
            $scope.closeThisDialog();
          }

          $scope.cancel = function () {
            $scope.closeThisDialog();
          }
          $scope.fireTelemetry = function (data, event) {
            mainCtrlScope.generateTelemetry({
              type: 'click',
              subtype: data.subtype,
              target: data.target
            }, event);
          }
        }],
        resolve: {
          mainCtrlScope: function () {
            return $scope;
          }
        },
        showClose: false
      };

      org.ekstep.contenteditor.api.getService('popup').open(config);
    }

    $scope.shuffleWarnPopUp = function () {
      if ($scope.questionSetConfigObj.shuffle_questions) {
        $scope.configScore = true;
        $scope.questionSetConfigObj.max_score = $scope.selectedQuestions.length;
        _.each($scope.selectedQuestions, function (question, key) {
          $scope.selectedQuestions[key].max_score = 1;
          if ($scope.selectedQuestions[key].body == undefined) {
            $scope.selectedQuestions[key].max_score = 1;
          } else {
            JSON.parse($scope.selectedQuestions[key].body).data.config.metadata.max_score = 1;
          }
          $scope.selQuestionObj.max_score = 1;
        });
        ecEditor.dispatchEvent("org.ekstep.toaster:info", {
          title: 'Each question will carry equal weightage of 1 mark when using Shuffle. To provide different weightage to individual questions please turn off Shuffle.',
          position: 'topCenter',
        });
      } else {
        $scope.configScore = false;
      }
    }

    $scope.previewItem = function (question, bool) { // eslint-disable-line no-unused-vars
      if (ecEditor._.isUndefined(question.body)) {
        $scope.getItem(question, function (questionData) {
          var selObjindex = _.findLastIndex($scope.questions, {
            identifier: questionData.identifier
          });
          if (selObjindex > -1) {
            $scope.questions[selObjindex] = questionData;
          }
          $scope.$safeApply();
          $scope.showPreview(questionData);
        });
      } else {
        $scope.showPreview(question);
      }
    }

    $scope.generateImpression = function(data) {
      if (data){
        ecEditor.getService('telemetry').impression({
          "type": data.type,
          "subtype": data.subtype || "",
          "pageid": data.pageid || "",
          "uri": window.location.href,
          "visits": [],
          "duration": (new Date()) - pluginInstance.pluginLoadStartTime
        });
      }
    }

    $scope.showPreview = function (question, bool) { // eslint-disable-line no-unused-vars
      if (question.version == 1) {
        var templateRef = question.template_id;
        if (templateRef)
          $scope.getv1Template(templateRef, question, function (controller) {
            $scope.sendForPreview(controller, question.version);
          });
      } else {
        var questionBody;
        if (_.isString(question.body))
          questionBody = JSON.parse(question.body);
        else
          questionBody = question.body;
        $scope.sendForPreview(questionBody, question.version);
      }
    }

    $scope.getv1Template = function (templateRef, question, callback) {
      ecEditor.getService('assessment').getTemplate(templateRef, function (err, response) {
        if (!err) {
          var x2js = new X2JS({ // eslint-disable-line no-undef
            attributePrefix: 'none',
            enableToStringFunc: false
          });
          var templateJson = x2js.xml_str2json(response.data.result.content.body); // eslint-disable-line no-undef
          var questionSets = {},
            config = {},
            quesBody = {
              "questionnaire": {},
              "template": [],
              "mediamanifest": {
                "media": []
              }
            };
          questionSets[question.identifier] = [];
          questionSets[question.identifier].push(question);
          if (_.isArray(question.media)) {
            question.media.forEach(function (mediaItem) {
              quesBody.mediamanifest.media.push(mediaItem);
            });
          }
          quesBody.questionnaire["items"] = questionSets;
          quesBody.questionnaire["item_sets"] = [{
            "count": "1",
            "id": question.identifier
          }]
          quesBody["questionnaire"] = ecEditor._.assign(quesBody.questionnaire, config);
          quesBody["template"].push(templateJson.theme.template);
          if (!(ecEditor._.isUndefined(templateJson.theme.manifest)) && !(ecEditor._.isUndefined(templateJson.theme.manifest.media)) && _.isArray(templateJson.theme.manifest.media)) {
            templateJson.theme.manifest.media.forEach(function (mediaItem) {
              quesBody.mediamanifest.media.push(mediaItem);
            });
          } else if (!(ecEditor._.isUndefined(templateJson.theme.manifest)) && !(ecEditor._.isUndefined(templateJson.theme.manifest.media))) {
            quesBody.mediamanifest.media.push(templateJson.theme.manifest.media);
          }
          callback(quesBody);
        }
      });
    }

    $scope.sendForPreview = function (quesBody, version) {
      var qObj;
      if (version == 1) {
        qObj = {
          "data": {
            __cdata: JSON.stringify(quesBody)
          },
          "config": {
            __cdata: JSON.stringify({
              "type": "items",
              "var": "item"
            })
          },
          "pluginId": "org.ekstep.questionset.quiz",
          "pluginVer": "1.0",
          "id": "80532057-749a-4534-812b-ec702c99b4b8",
          "type": "mcq",
          "templateId": "horizontalMCQ",
          "rotate": "0",
          "z-index": "0",
          "w": "80",
          "x": "9",
          "h": "85",
          "y": "6"
        };
      } else {
        qObj = {
          "config": JSON.stringify(quesBody.data.config),
          "data": JSON.stringify(quesBody.data.data),
          "id": "c943d0a907274471a0572e593eab49c2",
          "pluginId": quesBody.data.plugin.id,
          "pluginVer": quesBody.data.plugin.version,
          "templateId": quesBody.data.plugin.templateId,
          "type": "unit"
        };
      }
      var questions = [];
      var data = {
        "org.ekstep.questionset": {}
      }
      questions.push(qObj);
      data[$scope._constants.questionsetPlugin][$scope._constants.questionPlugin] = questions;
      var confData = {
        "contentBody": {},
        "parentElement": true,
        "element": "#itemIframe"
      };

      var pluginInstances = ecEditor.getPluginInstances();
      var previewInstance = _.find(pluginInstances, function (pi) {
        return pi.manifest.id === $scope._constants.previewPlugin
      });
      if (_.isUndefined(previewInstance)) {
        previewInstance = ecEditor.instantiatePlugin($scope._constants.previewPlugin);
      }
      confData.contentBody = previewInstance.getQuestionPreviwContent(data[$scope._constants.questionsetPlugin]);
      ecEditor.dispatchEvent("atpreview:show", confData);
    }

    $scope.cancel = function () {
      $scope.closeThisDialog();
    }

    $scope.getItem = function (item, callback) {
      ecEditor.getService('assessment').getItem(item.identifier, function (err, resp) {
        if (!err) {
          item = resp.data.result.assessment_item ? resp.data.result.assessment_item : item;
        }
        callback(item);
      });
    }

    $scope.generateTelemetry = function (data, event) {
      var eventId;
      if (event.target) eventId = event.target.id;
      else eventId = event;
      if (data) ecEditor.getService('telemetry').interact({
        "type": data.type,
        "subtype": data.subtype,
        "id": data.id,
        "pageId": ecEditor.getCurrentStage().id,
        "target": {
          "id": eventId,
          "ver": "1.0",
          "type": data.type
        },
        "plugin": {
          "id": pluginInstance.manifest.id,
          "ver": pluginInstance.manifest.ver
        }
      })
    }
  }]);

//# sourceURL=questionbankctrl.js

org.ekstep.pluginframework.pluginManager.registerPlugin({"id":"org.ekstep.questionbank","ver":"1.0","shortId":"questionbank","author":"Swati Singh","type":"plugin","title":"Question Bank Plugin","description":"Plugin to browse existing questions and add them to question set","editor":{"main":"editor/plugin.js","dependencies":[{"type":"plugin","plugin":"org.ekstep.question","ver":"1.0"},{"type":"plugin","plugin":"org.ekstep.questionset.preview","ver":"1.1"},{"type":"plugin","plugin":"org.ekstep.toaster","ver":"1.0"},{"type":"js","src":"editor/questionbankcontroller.js"}],"menu":[],"help":{"src":"editor/help.md","dataType":"text"}},"renderer":{"main":"renderer/plugin.js","dependencies":[{"type":"plugin","plugin":"org.ekstep.questionset.preview","ver":"1.1"}]}},org.ekstep.questionbank={},org.ekstep.questionbank.EditorPlugin=org.ekstep.contenteditor.basePlugin.extend({type:"org.ekstep.questionbank",initialize:function(){ecEditor.addEventListener(this.manifest.id+":showpopup",this.loadHtml,this);var e=ecEditor.resolvePluginResource(this.manifest.id,this.manifest.ver,"editor/questionbankmodal.html"),t=ecEditor.resolvePluginResource(this.manifest.id,this.manifest.ver,"editor/questionbankcontroller.js");ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(e,t)},loadHtml:function(e,t){var i=this;i.callback=t.callback,i.editData=ecEditor._.isUndefined(t.data)?"":t.data,i.pluginLoadStartTime=new Date,ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({template:"QuestionFormTemplate",controller:"QuestionFormController",controllerAs:"$ctrl",resolve:{pluginInstance:function(){return i}},closeByEscape:!1,closeByDocument:!1})}}))