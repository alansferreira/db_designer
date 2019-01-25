Vue.component('eer-table-column', {
    props: ['table', 'column'],    
    template: "<div class='column' :id='\"column_\" + table.name + \"_\" + column.name'> \
                <span>{{column.name}}</span> \
                <span class='separator'></span> \
                <i class='fas' v-bind:class='{\"fa-key\": column.isPk}' /> \
            </div>"
    ,
    mounted:() => {
        makeColumnsDraggable();
        eerRedrawLines();
    }
});
