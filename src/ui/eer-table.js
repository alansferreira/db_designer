
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
        makeColumnsDroppable();
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
        stopedOnEdge: function(args){
            // const { vie, index } = args;
            // console.log('stoped on ' + index);
            // const isEnd = (index > 0 );

            // if(!isEnd) return;

            // if(vie.$props.model.name.trim() === '' ) return;

            // this.table.columns.push({});


        }

    },
});

