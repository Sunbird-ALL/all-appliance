var dependency = {
    fields: undefined,
    init: function(fields) {
        this.fields = fields;
        const DROPDOWN_INPUT_TYPES = ['select', 'multiSelect'];
    },
    getTargetField: function(target){
        var object = [];
        this.fields.forEach(function(field){
            if (field.code === target.getAttribute("code")){
                object = field;
            }               
        })
        return object;
    },
    updateForm: function(object) {
        if (object && object.range) {
            dependency.getAssociations($('#df_' + object.code).val(), object.range, function(associations) {
                var data = dependency.getFormValues();
                dependency.getParentAssociations(object, associations, data, function(commonAssociations){
                    dependency.applyDependencyRules(object, commonAssociations, true);
                })
            });
        }
    },
    getFormValues: function(){
        var updatedFormData = new Object();
        this.fields.forEach(function(field){
            updatedFormData[field.code] = $('#df_' + field.code).val();
            var count = Array.isArray(updatedFormData[field.code]) ? updatedFormData[field.code].length : (updatedFormData[field.code] ? 1 : 0) ;
            $("#selectedCount_" + field.code).text(count);
        });
        return updatedFormData;
    },
    getParentAssociations: function(field, associations, formData, callback) {
        if (field.parent && field.parent.length){
            field.parent.forEach(function(val) {
                dependency.fields.forEach(function(field) {
                    if (field.code === val){
                        field.range.forEach(function(range) {
                            if(Array.isArray(formData[val]) && formData[val].length > 0){
                                formData[val].forEach(function(metadata) {
                                    if (range.name === metadata){
                                        associations = dependency.getCommonAssociations(range.associations, associations);
                                    }
                                });
                            }else{
                                if (range.name === formData[val]){
                                    associations = dependency.getCommonAssociations(range.associations, associations);
                                }
                            }
                        });
                    }
                });
            })
        }  
        callback(associations);
    },
    getCommonAssociations: function(parentAssociations, childAssociations){
        var intersectionData = [];
        if (parentAssociations && parentAssociations.length){
            parentAssociations.forEach(function(parent){
                childAssociations.forEach(function(child){
                    if (parent.code === child.code) intersectionData.push(child)
                })
            })
                //value => childAssociations.includes(value))
            //intersectionData = _.filter(parentAssociations, function(e) { return _.find(childAssociations, e)});
        }
        return intersectionData;
    },
    getAssociations: function(keys, range, callback) {
        var names = [];
        var associations = [];
        var filteredAssociations = [];
        if (typeof keys === "string") {
            names.push(keys);
        } else {
            names = []
        }
        range.forEach(function(res) {
            names.forEach(function(value, key) {
                if (res.name === value) {
                    filteredAssociations.push(res)
                }
            });
        });
        filteredAssociations.forEach(function(val, index) {
            if (val.associations) {
                val.associations.forEach(function(key, value) {
                    associations.push(key);
                })
            }
        });
        callback && callback(associations);
    },
    applyDependencyRules: function(field, associations) {
        var dependedValues, groupdFields;
        if (field.depends && field.depends.length) {
            field.depends.forEach(function(id) {
                dependedValues = [];
                associations.forEach(function(association){
                    if (id == association.category){
                        dependedValues.push(association)
                    }
                })
                var obj;
                dependency.fields.forEach(function(field){
                    if (id == field.code){
                        obj = field;
                        return;
                    }
                })
                if (dependedValues.length) dfElements.setOptions(obj, dependedValues);
            });
        }
    },
    mapObject: function(destination, source, callback) {
        var instance = this;
        instance.mapParents(destination, function(mappedParents){
            destination = mappedParents;
        })

        destination.forEach(function(dest) {
            source.forEach(function(src) {
                if (dest.code === src.code) {
                    dest.range = src.terms;
                }
            })
        });
        callback(destination);
    },
    mapParents: function(data, callback) {
        data.forEach(function(val, index) {
            data[index].parent = [];
        });
        data.forEach(function(field, index) {
            if(field.depends){
                field.depends.forEach(function(depend){
                   data.forEach(function(category, index) {
                       if (depend === category.code){
                           data[index].parent.push(field.code);
                       }
                    });

                })
            }
        });
        return callback(data)
    }
}
window.dependency = dependency;

var dfElements = {
    create: function() {

    },
    createElement: function(obj, showSelectedCount) {
        switch(obj.inputType) {
            case "text": dfElements.addElement(obj, 'input'); break;
            case "textarea": dfElements.addElement(obj, 'textarea'); break;
            case "checkbox": dfElements.addElement(obj, 'input', 'checkbox'); break;
            case "checkboxstandard": dfElements.addElement(obj, 'input', 'checkboxstandard'); break;
            case "radio": dfElements.addElement(obj, 'input', 'radio', undefined, showSelectedCount); break;          
            case "select": dfElements.addElement(obj, 'select', undefined, showSelectedCount); break;
            case "multiselect": dfElements.addElement(obj, 'select', undefined, showSelectedCount); break;
            case "label": dfElements.addElement(obj, 'label'); break;
            default: console.log("no element added");
        }
    },
    addElement: function(obj, tag, type, showSelectedCount) {
        var ele = $('[name ="'+ obj.code+'"]');
        if(ele) {
            var parentEle = ele[0];
            if (showSelectedCount){
                var eleStr = '<div><span>'+obj.name+'</span> (<span id="selectedCount_'+obj.code+'">0</span>)</div><' + tag + ' id="df_' + obj.code + '" onChange="dfElements.updateForm(this)" code="'+obj.code +'" data="'+obj.name+'"></' + tag + '>' ;
            }else{
                var eleStr = '<span>'+obj.name+'</span><' + tag + ' id="df_' + obj.code + '" onChange="dfElements.updateForm(this)" code="'+obj.code +'" data="'+obj.name+'"></' + tag + '>' ;
            }
            
            if (obj.inputType === "multiselect"){
                $('#df_'+obj.code).attr('multiple', true);
            }
            $(parentEle).html(eleStr);
            if(type) $('#df_'+obj.code).attr('type', type);
        }
    },
    updateForm: function(target){
        var field = dependency.getTargetField(target);
        dependency.updateForm(field)
    },
    getSortedOptions: function(options){
        options = options.sort(function(a, b) {
            var optionA = a.name.toUpperCase(); 
            var optionB = b.name.toUpperCase();
            if (optionA < optionB) {
                return -1;
            }
            if (optionA > optionB) {
                return 1;
            }
            return 0;
        });
        return options;
    },
    getUniqOptions: function(options){
        let uniqueOptions = [];
        let itemsFound = {};
        for(let val of options) {
            if(itemsFound[val.name]){
                continue;
            }
            uniqueOptions.push(val);
            itemsFound[val.name] = true;
        }
        return uniqueOptions;
    },
    setOptions: function(obj, optionData){
        //optionData = this.getUniqOptions(optionData);
        //optionData = this.getSortedOptions(optionData);
        if (obj.inputType == "select" || obj.inputType =="multiselect"){
            var select = $('#df_' + obj.code);
            select.empty();
            if (select.length){
                if(select.prop) {
                    var options = select.prop('options');
                }
                else {
                    var options = select.attr('options');
                }
                options[0] = new Option(obj.placeholder, "");
                $.each(optionData, function(index, option) {
                    options[index + 1] = (option.name) ? new Option(option.name, option.name) : new Option(option, option)
                });
            }
        }
    },
    setSelect: function(pID, pSelectedValue)
    {
        $('#df_'+pID + ' option:selected').removeAttr('selected');
        $('#df_'+pID + ' option[value='+pSelectedValue+']').attr('selected', true);   
    },
    setMetadata: function(code, data){
        var element = $('#df_' + code);
        if (element.length &&  Array.isArray(data)){
            dfElements.setSelect(code, data[0]);
            var count = data.length || 0 ;
            $("#selectedCount_" + code).text(count);
        }else{
            $('#df_' + code).val(data);
            var count = data ? 1 : 0;
            $("#selectedCount_" + code).text(count);
        }
    }
}
window.dfElements = dfElements;

(function() {
    $.fn.SBdynamicForm = function(options) {
        const COLUMN = "col";
        const ROW = "row";
        const SELECT = "select";
        const MULTISELECT = "multiselect";
        var createEleInterval,
            init,
            config,
            createDiv,
            startInterval,
            createLayout,
            createRowOrCol,
            createFormField,
            setMetadata;
        config = {
            id: 'dynamicFormDiv',
            config: config,
            data: metadata,
            showSelectedCount: false,
            addHtml: function(node) {
                return false;
            },
            submitId: "submit",
            getFormData: function(){
                return false;
            },
            error: function(cb){
                cb()
            },
            addDirective: function(evnetName, cb){
                cb()
            }
        };
        $.extend(config, options);
        /**
        * @description    - When the SBdynamicForm lib is initialized
        */
        init = function (){
            var templateLayout = options.config.templateLayout;
            if (Object.keys(templateLayout).length === 0) options.error(true);
            if (Object.keys(templateLayout)[0] == ROW) {
                createLayout(templateLayout[ROW], "dynamicFormDiv", ROW);
            } else {
                createLayout(templateLayout[COLUMN], "dynamicFormDiv", COLUMN);
            }

            $("#" + config.submitId).click(function() {
                var data = dependency.getFormValues();
                console.log(data);
                options.getFormData(data)
            });
        };
        validate = function (){
            return true; 
        }
        /**
        * @description                  - When createDiv method is called
        *
        * @param {string} parentId      - Which contains a parent element id
        *
        * @param {string} id            - Which contains a element id
        *
        * @param {Object} data          - Which contains a callback method and other options
        */
        createDiv = function (parentId, id, data){
            startInterval();
            var parentEle = $('#' + parentId);
            var eleId = data.name ? 'cont_' + data.name : id;
            console.log( "eleId", eleId)
            if(data.code && !data.directive){
                var divStr = '<div id="' + id + '" name="' + data.code + '"><p>' + data.name + '</p></div>';
            }else if(data.code && data.directive){
                options.addDirective(directivename, cb){
                    dfElements.createElement("", config.showSelectedCount);
                }
                var divStr = '<'+ data.directive + ' id="' + id + '"></'+ data.directive +'>';
            }else{
                var divStr = '<div id="' + id + '"><p>' + data.name + '</p></div>';
            }
            parentEle.append(divStr);
            var divEle = $('#' + id);
            var style = {
                "flex-grow": data.style && data.style.width ? data.style.width/100 : "1"
            }
            divEle.css(style);
            if (data && data.class) divEle.addClass(data.class);
        };
        /**
        * @description              - start interval time to create dynamic fields
        */
        startInterval = function (){
            if(createEleInterval)  clearTimeout(createEleInterval)
            createEleInterval = setTimeout(function() { 
                createFormField();
            }, 200);
        };
        /**
        * @description                   - When create layout method called
        *
        * @param {Array} arr             - Which contains a row or column objects
        *
        * @param {string} parentId       - Which contains a parent div id
        *
        * @param {string} type            - Which contains what type of div should be created row/column
        */
        createLayout = function (arr, parentId, type){
            if (arr instanceof Array) {
                arr.forEach(function (obj) {
                    createRowOrCol(obj, parentId, type);
                })
            } else {
                createRowOrCol(arr, parentId, type);
            }
        };
        /**
        * @description                    - To create row and colomn
        *
        * @param {Object} obj             - Which contains a row or column data
        *
        * @param {string} parentId       - Which contains a parent div id
        *
        * @param {string} type           - Which contains a type of div row/column
        */
        createRowOrCol = function (obj, parentId, type){
            clearInterval(createEleInterval);
            obj.class = type+ "-container";
            var divId = type + Math.random().toString(36).substring(2, 15)
            createDiv(parentId, divId, obj);
            var nextObj;
            if (obj[ROW]) { 
                nextObj = obj[ROW];
                createLayout(nextObj, divId, ROW);
            } else if(obj[COLUMN]) {
                nextObj = obj[COLUMN];
                createLayout(nextObj, divId, COLUMN);
            }
        };
        /**
        * @description              - to create form fields from the configuration
        */
        createFormField = function (){
            var dynamicFields = options.config.fields;
            var formData = options.config.formData;
            dynamicFields.forEach(function (obj) {
                dfElements.createElement(obj, config.showSelectedCount);
                if (obj.inputType == SELECT || obj.inputType == MULTISELECT) {
                    dfElements.setOptions(obj, obj.range);
                }
            });
            setMetadata(function(){
                dependency.mapObject(dynamicFields, formData, function(fields){
                    dependency.init(fields)
                });
            });
        };
        /**
        * @description                    - Set metadata to the created form element
        *
        * @param {callback} callback      - callback method which will call after the setmedata exicution
        */
        setMetadata = function (callback){
            $.each(config.data, function( code, data ){
                dfElements.setMetadata(code, data)
            });
            callback();
        };
        return init();
        //export method
    };
}).call(this);
//# sourceURL=SBdynamicForm.js

setTimeout(function () {
    console.log("Loading form with default data");
    jQuery('#dynamicFormDiv').SBdynamicForm({
        id: "dynamicFormDiv",
        config: formConfig,
        data: metadata
    });    
}, 0)
