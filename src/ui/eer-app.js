const app = new Vue({
    el: '#app',
    data: {
        tables: []
    },
    methods: {
        addNewTable: function (event) {
            const t = new Table('table_' + this.tables.length, 'default_schema');
            t.columns.push(new Column('id', true, true, 'int'));
            this.tables.push(t);
        },
    }
});
