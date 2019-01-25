const app = new Vue({
    el: '#app',
    data: {
        tables: [{
            name: 'table1',
            columns: [{ name: 'column1', isPrimary: true }, { name: 'column2' }]
        }]
    },
    methods: {
        addNewTable: function (event) {
            this.tables.push({name: 'table_' + this.tables.length, columns: [{
                name: 'id', 
                isPrimary: true,
                type: 'int',
                precision: 0,
                scale: 0,
                isNullable: false,
                isAutoIncrement: true,
                increment: {seed: 1, step: 1},
            }]})
        }
    }
});
