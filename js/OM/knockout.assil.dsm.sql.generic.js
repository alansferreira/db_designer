/**
************  S A M P L E  ************
        var FK = {};
        var t1 = new Table("table_1");
        new Column(t1, false, "column_1", var DataTypes.VARCHAR);

        new IX(t1, "ix1", new IXColumnSpec(t1.columns[0], var IXSortMode.ASC));

        alert(t1.name);
**/
var DisplayModes = {
    FULL: "FULL",
    COMPACT: "COMPACT",
}
function DesignerOptions() {
    var self = this;
    self.isChanged = ko.observable(false);
    self.isSaved = ko.observable(false);
    self.isSelected = ko.observable(false);
    self.toggleSelection = function () {self.isSelected(!self.isSelected());};

    self.displayCommands = ko.observable(false);
    self.showCommands = function () {
        self.displayCommands(true);
    };
    self.hideCommands = function () {
        self.displayCommands(true);
    };
    
}
function Table(name) {
    var self = this;
    self.designerOptions = ko.observable(new DesignerOptions());
    self.designerOptions().showCommands = function () {
        self.designerOptions().displayCommands(true);
    };
    self.designerOptions().hideCommands = function () {
        self.designerOptions().displayCommands(true);
    };

    self.name = ko.observable(name);
    self.columns = ko.observableArray([]);

    self.indexes = ko.observableArray([]);
    self.foreingkeys = ko.observableArray([]);

    self.addNewEmptyColumn = function () {
        self.addColumn(false, "", DataTypes[0], 0, 0, true);
    };
    self.addColumn = function (isPrimary, name, datatype, precision, scale, isNullable, isIdentity) {
        self.columns.push(new Column(self, isPrimary, name, datatype, precision, scale, isNullable, isIdentity));
    };
    self.removeColumn = function (column) {
        self.columns.remve(column);
    };

    self.displayMode = ko.observable(DisplayModes.FULL);
    self.toggleDisplayMode = function () {
        switch (self.displayMode()) {
            case DisplayModes.FULL:
                self.displayMode(DisplayModes.COMPACT);
                break;
            case DisplayModes.COMPACT:
                self.displayMode(DisplayModes.FULL);
                break;
            //case "FULL":
            //    break;
        }
    };
    self.buildScript = function () {
        var result = self.name();

        $.each(ko.toJS(self.columns()), function (cIndex, col) {
            result += "\r\n" + (col.isPrimary ? "PK" : "") + "\t" + col.name + "\t" + col.datatype + "\t" +
                (col.isIdentity ? "true" : "false") + "\t" + 
                (col.isNullable ? "" : "NOT ") + "NULL";
        });

        IED.interpret(result, self.name(), "AlanSoft.IED.GenericSQL.TableFromTabularFormat", "DSM\BASE SAMPLES", "", "XML")
        .complete(function () {
            RED.ApplyTemplateToMemory([arguments[0].responseText], ["MSSQL\/Table\/ToSQL\/Full Queries\/CREATE TABLE @Name.sql"], "DSM\/BASE SAMPLES", "").complete(function () {
                alert(arguments[0].responseText);
            });
            //alert('');
        });

    };
};
function Column (table, isPrimary, name, datatype, precision, scale, isNullable, isIdentity) {
    var self = this;
    self.designerOptions = ko.observable(new DesignerOptions());
    self.designerOptions().showCommands = function () {
        self.designerOptions().displayCommands(true);
    };
    self.designerOptions().hideCommands = function () {
        self.designerOptions().displayCommands(true);
    };


    self.table = ko.observable(table);

    self.name = ko.observable(name);

    self.datatype = ko.observable(datatype);
    self.precision = ko.observable(precision == null ? 0 : precision);
    self.scale = ko.observable(scale == null ? 0 : scale);

    self.isPrimary = ko.observable(isPrimary == null ? false : isPrimary);
    self.isNullable = ko.observable(isNullable == null ? true : isNullable);
    self.isIdentity = ko.observable(isIdentity == null ? false : isIdentity);

    self.toggleIsPrimary = function () { self.isPrimary(!self.isPrimary()); };
    self.toggleIsNullable = function () { self.isNullable(!self.isNullable()); };
    self.toggleIsIdentity = function () { self.isIdentity(!self.isIdentity()); };

};
function DataTypeSpecification(declare, defaultDeclare) {
    var self = this;
    self.declare = ko.observable(declare);
    if (defaultDeclare == null) {
        self.defaultDeclare = ko.observable(declare);
    } else {
        self.defaultDeclare = ko.observable(defaultDeclare);
    }
};

function DataType(name, specification) {
    var self = this;
    self.name = ko.observable(name);
    self.specification = ko.observable(specification);
};

var DataTypes = [
    "INT",
    "NUMERIC",
    "DECIMAL",

    "BOOLEAN",

    "DATE", 
    "TIME", 
    "DATETIME", 

    "CHAR",
    "VARCAHR",
];

//var DataTypes = [
//    ko.observable(new DataType("INT", new DataTypeSpecification("INT"))),
//    ko.observable(new DataType("NUMERIC", new DataTypeSpecification("NUMERIC({precision =INT}, {scale =INT})"))),
//    ko.observable(new DataType("DECIMAL", new DataTypeSpecification("DECIMAL({precision =INT}, {scale =INT})"))),

//    ko.observable(new DataType("BOOLEAN", new DataTypeSpecification("BOOLEAN"))),

//    ko.observable(new DataType("DATE", new DataTypeSpecification("DATE"))),
//    ko.observable(new DataType("TIME", new DataTypeSpecification("TIME"))),
//    ko.observable(new DataType("DATETIME", new DataTypeSpecification("DATETIME"))),

//    ko.observable(new DataType("CHAR", new DataTypeSpecification("CHAR({precision =INT})"))),
//    ko.observable(new DataType("VARCAHR", new DataTypeSpecification("VARCHAR({precision =INT})"))),
//];

var IXSortMode = { ASC: "ASC", DESC: "DESC" };
function IXColumnSpec(columnName, sortMode) {
    var self = this;
    self.column = ko.observable(columnName);
    self.sortMode = ko.observable(sortMode);
};
function IX(table, name, columnsSpecs) {
    var self = this;
    self.table = ko.observable(table);
    self.name = ko.observable(name);
    self.columnsSpecs = ko.observableArray(columnsSpecs);

    self.addColumnSpec = function (columnName, sortMode) {
        self.columnsSpecs.push(new IXColumnSpec(columnName, sortMode));
    };
    self.removeColumnSpec = function (columnSpec) {
        self.columnsSpecs.remve(columnSpec);
    };

};

function FK_ColumnSpec(columnName, srcColumnName) {
    var self = this;
    self.columnName = ko.observable(columnName);
    self.sourceColumnName = ko.observable(srcColumnName);

}
function FK(name, tableName, primaryTableName) {
    var self = this;
    self.name = ko.observable(name);
    self.tableName = ko.observable(tableName);
    self.primaryTableName = ko.observable(primaryTableName);
    self.columnsSpecs = ko.observableArray([]);

    self.addColumnSpec = function (columnName, srcColumnName) {
        self.columnsSpecs.push(new FK_ColumnSpec(columnName, srcColumnName));
    };
    self.removeColumnSpec = function (columnSpec) {
        self.columnsSpecs.remve(columnSpec);
    };

    if (name == null) {
        self.name("FK_" + self.primaryTableName + "_" + self.tableName);
    }
}

//var $script_change_output;
$(function () {
    
    ko.extenders.required = function (target, overrideMessage) {
        //add some sub-observables to our observable
        target.hasError = ko.observable();
        target.validationMessage = ko.observable();

        //define a function to do validation
        function validate(newValue) {
            target.hasError(newValue ? false : true);
            target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
        }

        //initial validation
        validate(target());

        //validate whenever the value changes
        target.subscribe(validate);

        //return the original observable
        return target;
    };

    //function logChange() {

    //}
    //ko.bindingHandlers.columnNameChange = {
    //    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    //        var el = $(element);
    //        el.data("lastColNamVal", valueAccessor()());
    //        el.change(function () {
    //            globalConsole1.logs.push(new Log("{0}.{1} to {0}.{2}".format(bindingContext.$parent.name(), el.data("lastColNamVal"), valueAccessor()())));
    //            el.data("lastColNamVal", valueAccessor()());
    //        });
    //        var value = ko.unwrap(valueAccessor());
    //        $(element).toggle(value);
    //    }
    //};
    //ko.bindingHandlers.columnTypeChange = {
    //    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    //        var el = $(element);
    //        el.data("lastColTypeVal", valueAccessor()());
    //        el.change(function () {
    //            globalConsole1.logs.push(new Log("{0}.{1} changed to {2}".format(bindingContext.$parent.name(), bindingContext.$data.name(), valueAccessor()())));
    //            el.data("lastTypeNamVal", valueAccessor()());
    //        });
    //        var value = ko.unwrap(valueAccessor());
    //        $(element).toggle(value);
    //    }
    //};

    
    //ko.bindingHandlers.sortable = {
    //    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    //        var el = $(element);
    //        var bodyItemsSelector = "#" + bindingContext.$parent.name() + " .ui-table-design-body";
    //        $(bodyItemsSelector).sortable();


    //    }
    //};

});