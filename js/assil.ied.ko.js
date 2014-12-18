function IEDConfig() {
    var self = this;
    self.FullContents = ko.observable("CREATE TABLE Table ( id AS INT, desc AS VARCHAR(100) )");
    self.Name = ko.observable("");
    self.type = ko.observable("AlanSoft.IED.SQLite.TableFromScript");
    self.user = ko.observable("DSM\\BASE SAMPLES");
    self.password = ko.observable("");
    self.scriptsTypes = ko.observableArray([
        { Name: "AlanSoft.IED.Generic.SQL.TableFromScript", Category: "Database", Description: "Find definitions for tables, indexes and relationships of a Microsoft SQL Server Scripts.", Value: 0.0, DisplayName: "Generic Tables", DefaultFileExtenssions: [".sql", ".table", ".tbl"] },
        { Name: "AlanSoft.IED.IBMDB2.TableFromDCLGEN", Category: "Database", Description: "Find definitions for tables of IBM DB2 from DCLGEN definitions.", Value: 0.0, DisplayName: "IBM DB2 Tables from DCLGEN", DefaultFileExtenssions: [".dclgen", ".dgen"] },
        { Name: "AlanSoft.IED.IBMDB2.TableFromScript", Category: "Database", Description: "Find definitions for tables, indexes and relationships of a IBM DB2 Scripts.", Value: 0.0, DisplayName: "IBM DB2 Tables", DefaultFileExtenssions: [".sql", ".table", ".tbl"] },
        { Name: "AlanSoft.IED.MSSQL.TableFromScript", Category: "Database", Description: "Find definitions for tables, indexes and relationships of a Microsoft SQL Server Scripts.", Value: 0.0, DisplayName: "MS SQL Server Tables", DefaultFileExtenssions: [".sql", ".table", ".tbl"] },
        { Name: "AlanSoft.IED.SQLite.TableFromScript", Category: "Database", Description: "Find definitions for tables, indexes and relationships of a SQLite Scripts.", Value: 0.0, DisplayName: "SQLite Tables", DefaultFileExtenssions: [".sql.sqlite", ".table.sqlite", ".tbl.sqlite"] }
    ]);
}
