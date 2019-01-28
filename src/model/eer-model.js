

class ColumnIncrement {
    /**
     * 
     * @param {number} seed 
     * @param {number} step 
     */
    constructor(seed, step){
        /** @type {number} */this.seed = (seed ? seed : 1);
        /** @type {number} */this.step = (step ? step : 1);
    }
}

class Column {
    /**
     * 
     * @param {string} name 
     * @param {boolean} isPrimary 
     * @param {boolean} isAutoIncrement 
     * @param {string} type 
     * @param {number} precision 
     * @param {number} scale 
     * @param {boolean} isNullable 
     * @param {string} defaultValue 
     */
    constructor(name, isPrimary, isAutoIncrement, type, precision, scale, isNullable, defaultValue){
        /** @type {string} */           this.name = name || ''; 
        /** @type {boolean} */          this.isPrimary = !!isPrimary;
        /** @type {string} */           this.type = type || 'int';
        /** @type {number} */           this.precision = precision  ||  0;
        /** @type {number} */           this.scale = scale || 0;
        /** @type {boolean} */          this.isNullable = !!isNullable;
        /** @type {boolean} */          this.isAutoIncrement = !!isAutoIncrement;
        /** @type {ColumnIncrement} */  this.increment = (isAutoIncrement ? new ColumnIncrement(1,1) : null);
        /** @type {string} */           this.defaultValue = (defaultValue ? defaultValue : null);
        
    }
}

class ForeignKeyReferences{
    /**
     * 
     * @param {string} columnName 
     * @param {string} referenceColumnName 
     */
    constructor(columnName, referenceColumnName){
        /** @type {string}*/ this.columnName = columnName;
        /** @type {string}*/ this.referenceColumnName = referenceColumnName;
    }
}
class ForeignKey{
    /**
     * 
     * @param {Table} table 
     * @param {Column[]} columns 
     * @param {Table} referenceTable 
     * @param {Column[]} referenceColumns 
     */
    constructor(table, columns, referenceTable, referenceColumns) {        
        /** @type {string} */ this.name = `${table.name}_${referenceTable.name}_${generateQuickGuid()}_FK`;
        /** @type {ForeignKeyReferences[]} */ this.references = [];

        for (let c = 0; c < columns.length; c++) {
            const column = columns[c];
            this.references.push(new ForeignKeyReferences(column.name, referenceColumns[c].name));
        }
    }
    
}
class Table {
    /**
     * 
     * @param {string} name 
     * @param {string} schema 
     */
    constructor(name, schema){
        /** @type {string} */ this.name = name; 
        /** @type {string} */ this.schema = schema; 
        /** @type {Column[]} */ this.columns = [];
        /** @type {ForeignKey[]} */ this.foreignKeys = [];
        /** @type {IndexesKey[]} */ this.indexesKeys = [];
    }
}