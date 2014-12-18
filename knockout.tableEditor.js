var dbModel1 = null;
var globalConsole1 = null;
function Constraints() {
    var self = this;
    self.nameMap = ko.observable({});
    self.all = ko.observableArray([]);
    self.add = function (fk) {
        self.nameMap()[ko.unwrap(fk.name)] = fk;
        self.all.push(fk);
    };
}
function FK_Config() {
    var self = this;
    self.primary_table = ko.observable({
        columns: ko.observableArray([])
    });
    self.table = ko.observable({
        columns: ko.observableArray([])
    });

    self.primary_columns = ko.computed(function () {
        if (!self.primary_table()) return [];
        if (!self.primary_table().columns) return [];

        return self.primary_table().columns();
    });
    self.columns = ko.computed(function () {
        if (!self.table()) return [];
        if (!self.table().columns) return [];

        return self.table().columns();
    });
    self.addColumnMap = function (col, primaryCol) {
        self.columns_map.push({
            primary_column: ko.observable(null),
            column: ko.observable(null)
        });
    };

    self.columns_map = ko.observableArray([
        {
            primary_column: ko.observable(null),
            column: ko.observable(null)
        }
    ]);

    self.isConfirmed = ko.observable(false);
    self.isCreateNew = ko.observable(true);

};
function KO_DBModel() {
    var self = this;
    self.iedConfig = new IEDConfig();
    self.fk_config = new FK_Config();

    self.dataTypes = ko.observableArray(DataTypes);

    self.tables = ko.observableArray([]);
    self.constraints = ko.observable(Constraints);

    self.selectedTable = ko.observable(null);


    self.addNewTable = function () {
        var n = ("Table" + self.tables().length).toString();

        var t1 = new Table(n);
        t1.addColumn(true, "id", self.dataTypes()[0], 0, 0, false);

        self.tables.push(t1);

        setup_ui_tables();
        return t1;
    };
    self.import = function () {
        //self.iedConfig().FullContents(ui_ied_content.toString());
        var iedC = ko.toJS(self.iedConfig);

        IED.interpret(iedC.FullContents, iedC.Name, iedC.type, iedC.user, iedC.password, "XML")
        .done(function (data, status, response) {
            var xmlDom = $.parseXML("<root>" + data + "<\/root>");

            not_enter_jsPlumbConnection = true;

            $.each(xmlDom.firstChild.childNodes, function (tIx, table) {
                //var table = $(this);
                var t = new Table($(table).attr("Name"));
                t.displayMode(DisplayModes.COMPACT);

                $.each(table.getElementsByTagName("Column"), function (cIx, column) {
                    t.addColumn($(column).attr("IsPrimary").toLowerCase() == "true",
                        $(column).attr("Name"),
                        $(column).attr("DataType").toUpperCase(),
                        $(column).attr("Precision"),
                        $(column).attr("Scale"),
                        $(column).attr("IsNullable").toLowerCase() == "true",
                        $(column).attr("IsIdentity").toLowerCase() == "true");

                });

                $.each(table.getElementsByTagName("FK"), function (fkIx, fk) {
                    var new_fk = new FK($(fk).attr("Name"), $(table).attr("Name"), $(fk).attr("SourceTableName"));

                    $.each(fk.getElementsByTagName("FK_ColumnSpec"), function (fkSpecI, fkSpec) {
                        new_fk.addColumnSpec($(fkSpec).attr("Name"), $(fkSpec).attr("SourceColumnName"));
                    });

                    t.foreingkeys.push(new_fk);
                });

                $.each(table.getElementsByTagName("IX"), function (ixIx, ix) {
                    var new_ix = new IX($(table).attr("Name"), $(ix).attr("Name"));

                    $.each(ix.getElementsByTagName("IX_ColumnSpec"), function (ixSpecI, ixSpec) {
                        new_ix.addColumnSpec($(ixSpec).attr("Name"), $(ixSpec).attr("SortModeName"));
                    });

                    t.indexes.push(new_ix);
                });

                self.tables.push(t);

            });

            setup_ui_tables();

            $.each(xmlDom.firstChild.childNodes, function (tIx, table) {
                //var t = new Table($(table).attr("Name"));
                $.each(table.getElementsByTagName("FK"), function (fkIx, fk) {
                    var conn = jsPlumb.connect({
                        source: $(table).attr("Name"),
                        target: $(fk).attr("SourceTableName")
                    });
                    conn.getOverlay("label").setLabel($(fk).attr("Name"));
                });
            });

            not_enter_jsPlumbConnection = false;

        }).always(function () {
        });
    };
}

$(function () {
    dbModel1 = new KO_DBModel();
    globalConsole1 = new KO_GlobalConsole();

    ko.applyBindings(dbModel1, $(".db-model1").get(0));

    ko.applyBindings(globalConsole1, $(".global-console1").get(0));

});
