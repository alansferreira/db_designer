Vue.component('eer-table', {
    props: ['table'],
    template: "<div class='eer-table' :id='table.name'> \
                <div class='header'><i class='fas fa-th'></i>{{table.name}}</div> \
                <div class='column-group'>Columns</div> \
                <eer-table-column \
                                    v-for='column in table.columns' \
                                    v-bind:table='table' \
                                    v-bind:column='column' \
                                    v-bind:key='\"column_\" + table.name + column.name' \
                > \
                </eer-table-column> \
                <div class='constraints-group'>Constraints</div> \
               </div>"
    ,
    mounted:() => {
        makeTablesDraggable();
        makeTablesDroppable();
        eerRedrawLines();
    }
});

