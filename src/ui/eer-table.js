function makeTablesDraggable(){
    const eerTables = $('.eer-table');
    eerTables.draggable({
        handle: '.header',
        grid: [ 3, 3 ],
        preventDefault: true,
        drag: function(){
            //document.getElementById("svg-canvas").remove();
            mySVG.redrawLines();
        },
        onStop: function(){
            //document.getElementById("svg-canvas").remove();
            mySVG.redrawLines();
        }
    }); 
}

function makeTablesDroppable(){
    $('.eer-table').droppable({
        accept: ".eer-table .column",
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        onStart: function(el) {
            drag.zIndex = drag.zIndex +1;
            el.setStyle('z-index',drag.zIndex); //increment!
        }, 
        drop: function( event, ui ) {
            // console.log(ui);
            // console.log('dropped' + $(ui.draggable).text());
        }
    });
}

Vue.component('eer-table', {
    props: ['table'],
    template: "<div class='eer-table'> \
                <div class='header'> \
                    <i class='fas fa-th'></i> \
                    <vie :model='table' \
                        :field-name='\"schema\"' \
                        :class='\"vie-of-\" + table.name'\
                        :group-selector='\".vie-of-\" + table.name' \
                        :end-edit-on-tab-edges='true' \
                        @commit='schema_renamed' \
                        @stoped-on-edge='stopedOnEdge' \
                    > \
                    </vie> \
                    . \
                    <vie :model='table' \
                        :field-name='\"name\"' \
                        :class='\"vie-of-\" + table.name'\
                        :group-selector='\".vie-of-\" + table.name' \
                        :end-edit-on-tab-edges='true' \
                        @commit='table_renamed' \
                        @stoped-on-edge='stopedOnEdge' \
                    > \
                    </vie> \
                </div> \
                <div class='column-group'>Columns <i class='fas fa-plus' @click='addNewColumn'></i></div> \
                <div class='column-wrapper'> \
                    <eer-table-column v-for='column in table.columns' \
                                      :table='table' \
                                      :column='column' \
                                      :key='\"column_\" + table.name + column.name' \
                                      @renamed='column_renamed' \
                                      @stoped-on-edge='stopedOnEdge' \
                    > \
                    </eer-table-column> \
                </div> \
                <div class='constraints-group'>Constraints</div> \
               </div>"
    ,
    mounted:() => {
        makeTablesDraggable();
        makeTablesDroppable();
        eerRedrawLines();
    },
    updated: function(){
        console.log('table-updated');
    },
    methods: {
        schema_renamed: function(vie, oldValue, newValue) {
            console.log('schema renamed from ' + oldValue + ' to ' + newValue);
        },
        table_renamed: function(vie, oldValue, newValue) {
            console.log('table renamed from ' + oldValue + ' to ' + newValue);
        },
        column_renamed: function(vie, oldValue, newValue) {
            console.log('column renamed from ' + oldValue + ' to ' + newValue);
        },
        addNewColumn: function() {
            
            this.table.columns.push(new Column('column_' + Math.random().toString(36).substring(2, 4)));
        },
        stopedOnEdge: function(ev){
            const { vie, index } = ev;
            console.log('stoped on ' + index);
            

        }

    },
});

