if (typeof RED !== 'object') {
    RED = {};
}

$(function () {

    //RED.url = 'http://assil.com.br/ASSILServices/RED';
    //RED.url = 'http://localhost:9061/RED';
    RED.url = 'http://localhost:9081/ASSILServices/RED';
    RED.ApplyTemplateToMemory = function (objects, templates, user, password, objectFormat) {
        var objs = new Array();
        $.each(objects, function (iObj, obj) {
            objs.push(obj.replaceAll("<", "&lt;").replaceAll(">", "&gt;"));
        });
        return $.post(RED.url + "/ApplyTemplateToMemory", { objects: JSON.stringify(objs), templates: JSON.stringify(templates), user: user, password: password, objectFormat: !objectFormat ? 'json' : objectFormat });
    };
});

//var c = {
//    "Table":
//        [{
//            "@SchemaName": "", "@FullName": "teste", "@ConstraintCheck": "", "@UserDefaultDisplay": "teste", "@FullTypeName": "AlanSoft.DSM.MSSQL.Table", "@Name": "teste", "@Description": "", "@DateFormat": "yyyy-MM-dd HH:mm:ss", "@LowerCaseName": "teste", "@UpperCaseName": "TESTE", "@CustomName": "teste", "@CustomNameCaseName": "None", "@CustomNameCase": "0", "@CustomNameSeparator": "", "@LowerCaseCustomName": "teste", "@UpperCaseCustomName": "TESTE", "@LowerCamelCaseName": "teste", "@UpperCamelCaseName": "Teste", "@ClearedName": "teste", "@LowerClearedCaseName": "teste", "@UpperClearedCaseName": "TESTE",
//            "Column": [{ "@IsOutput": "True", "@OutputAlias": "", "@IsFiltered": "False", "@DefaultValue": "", "@DataType": "int", "@Precision": "0", "@IsPrimary": "False", "@Size": "0", "@Scale": "0", "@IsNullable": "True", "@SourceTable": "", "@SourceColumn": "", "@IsIndexed": "False", "@ConstraintCheck": "", "@IsIdentity": "False", "@SourceForeignKey": "", "@DateFormat": "yyyy-MM-dd HH:mm:ss", "@FullTypeName": "AlanSoft.DSM.MSSQL.Column", "@Description": "", "@Name": "id", "@UserDefaultDisplay": "id AS int", "@LowerCaseName": "id", "@UpperCaseName": "ID", "@CustomName": "ID", "@CustomNameCaseName": "UPPERCASE", "@CustomNameCase": "1", "@CustomNameSeparator": "_", "@LowerCaseCustomName": "id", "@UpperCaseCustomName": "ID", "@LowerCamelCaseName": "id", "@UpperCamelCaseName": "Id", "@ClearedName": "id", "@LowerClearedCaseName": "id", "@UpperClearedCaseName": "ID" }, { "@IsOutput": "True", "@OutputAlias": "", "@IsFiltered": "False", "@DefaultValue": "", "@DataType": "varchar", "@Precision": "100", "@IsPrimary": "False", "@Size": "0", "@Scale": "0", "@IsNullable": "True", "@SourceTable": "", "@SourceColumn": "", "@IsIndexed": "False", "@ConstraintCheck": "", "@IsIdentity": "False", "@SourceForeignKey": "", "@DateFormat": "yyyy-MM-dd HH:mm:ss", "@FullTypeName": "AlanSoft.DSM.MSSQL.Column", "@Description": "", "@Name": "nome", "@UserDefaultDisplay": "nome AS varchar(100) NULL", "@LowerCaseName": "nome", "@UpperCaseName": "NOME", "@CustomName": "NOME", "@CustomNameCaseName": "UPPERCASE", "@CustomNameCase": "1", "@CustomNameSeparator": "_", "@LowerCaseCustomName": "nome", "@UpperCaseCustomName": "NOME", "@LowerCamelCaseName": "nome", "@UpperCamelCaseName": "Nome", "@ClearedName": "nome", "@LowerClearedCaseName": "nome", "@UpperClearedCaseName": "NOME" }]
//        }, {
//            "@SchemaName": "", "@FullName": "teste1", "@ConstraintCheck": "", "@UserDefaultDisplay": "teste1", "@FullTypeName": "AlanSoft.DSM.MSSQL.Table", "@Name": "teste1", "@Description": "", "@DateFormat": "yyyy-MM-dd HH:mm:ss", "@LowerCaseName": "teste1", "@UpperCaseName": "TESTE1", "@CustomName": "teste1", "@CustomNameCaseName": "None", "@CustomNameCase": "0", "@CustomNameSeparator": "", "@LowerCaseCustomName": "teste1", "@UpperCaseCustomName": "TESTE1", "@LowerCamelCaseName": "teste1", "@UpperCamelCaseName": "Teste1", "@ClearedName": "teste1", "@LowerClearedCaseName": "teste1", "@UpperClearedCaseName": "TESTE1",
//            "Column":
//                [{ "@IsOutput": "True", "@OutputAlias": "", "@IsFiltered": "False", "@DefaultValue": "", "@DataType": "int", "@Precision": "0", "@IsPrimary": "False", "@Size": "0", "@Scale": "0", "@IsNullable": "True", "@SourceTable": "", "@SourceColumn": "", "@IsIndexed": "False", "@ConstraintCheck": "", "@IsIdentity": "False", "@SourceForeignKey": "", "@DateFormat": "yyyy-MM-dd HH:mm:ss", "@FullTypeName": "AlanSoft.DSM.MSSQL.Column", "@Description": "", "@Name": "id", "@UserDefaultDisplay": "id AS int", "@LowerCaseName": "id", "@UpperCaseName": "ID", "@CustomName": "ID", "@CustomNameCaseName": "UPPERCASE", "@CustomNameCase": "1", "@CustomNameSeparator": "_", "@LowerCaseCustomName": "id", "@UpperCaseCustomName": "ID", "@LowerCamelCaseName": "id", "@UpperCamelCaseName": "Id", "@ClearedName": "id", "@LowerClearedCaseName": "id", "@UpperClearedCaseName": "ID" }, { "@IsOutput": "True", "@OutputAlias": "", "@IsFiltered": "False", "@DefaultValue": "", "@DataType": "varchar", "@Precision": "100", "@IsPrimary": "False", "@Size": "0", "@Scale": "0", "@IsNullable": "True", "@SourceTable": "", "@SourceColumn": "", "@IsIndexed": "False", "@ConstraintCheck": "", "@IsIdentity": "False", "@SourceForeignKey": "", "@DateFormat": "yyyy-MM-dd HH:mm:ss", "@FullTypeName": "AlanSoft.DSM.MSSQL.Column", "@Description": "", "@Name": "nome", "@UserDefaultDisplay": "nome AS varchar(100) NULL", "@LowerCaseName": "nome", "@UpperCaseName": "NOME", "@CustomName": "NOME", "@CustomNameCaseName": "UPPERCASE", "@CustomNameCase": "1", "@CustomNameSeparator": "_", "@LowerCaseCustomName": "nome", "@UpperCaseCustomName": "NOME", "@LowerCamelCaseName": "nome", "@UpperCamelCaseName": "Nome", "@ClearedName": "nome", "@LowerClearedCaseName": "nome", "@UpperClearedCaseName": "NOME" }]
//        }]
//};
