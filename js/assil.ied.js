if (typeof IED !== 'object') {
    IED = {};
}

$(function () {

    IED.url = 'http://assil.com.br/ASSILServices/IED';    //production instance
    //IED.url = 'http://localhost:9061/IED';                  //debuger
    //IED.url = 'http://localhost:9081/ASSILServices/IED';  //local instance
    IED.interpret = function (FullContents, Name, type, user, password, returnType) {
        return $.post(IED.url + "/Interpret", { FullContents: FullContents, Name: Name, Type: type, user: user, password: password, returnType: !returnType ? 'json' : returnType });
    };
    IED.interpretJSON = function (FullContents, Name, type, user, password) {
        return $.post(IED.url + "/Interpret", { FullContents: FullContents, Name: Name, Type: type, user: user, password: password, returnType: 'json'});
    };
    IED.interpretXML = function (FullContents, Name, type, user, password) {
        return $.ajax(IED.url + "/Interpret", {
            dataType: 'xml',
            data: { FullContents: FullContents, Name: Name, Type: type, user: user, password: password, returnType: 'XML'},
            type: 'POST'
        });
    };
    IED.interpretSync = function (FullContents, Name, type, user, password, returnType) {
        return $.ajax({
            url:IED.url + "/Interpret", 
            data: { FullContents: FullContents, Name: Name, Type: type, user: user, password: password, returnType: returnType }
        });
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
