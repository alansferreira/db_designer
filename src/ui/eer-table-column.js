function makeColumnsDraggable(){
    $('.eer-table .column').draggable({
        revert: true,
        handle: '.drag-handle',
        helper: "clone",
        stack: "div",
        distance: 0,
        grid: [ 3, 3 ], 
        onStart: function(el) {
            drag.zIndex = drag.zIndex +1;
            el.setStyle('z-index',drag.zIndex); //increment!
        }, 
        stop: function(event, ui){
        }
    });
}

Vue.component('eer-table-column', {
    props: ['table', 'column'],    
    template: "<div class='column' > \
                <span class='drag-handle'> \
                    <i class='fas fa-ellipsis-v' /> \
                </span> \
                <vie :model='column' \
                     :field-name='\"name\"' \
                     :class='\"vie-of-\" + table.name'\
                     :group-selector='\".vie-of-\" + table.name' \
                     :end-edit-on-tab-edges='true' \
                     @commit='vie_commit' \
                     @stoped-on-edge='stopedOnEdge' \
                > \
                </vie> \
                <span class='separator'></span> \
                <i class='fas' :class='{\"fa-key\": column.isPrimary}' /> \
                <i class='fas fa-trash' @click='remove'></i> \
                </div> \
    ",
    mounted: function() {
        makeColumnsDraggable();
        eerRedrawLines();
    },
    methods: {
        remove: function(){
            this.table.columns.splice(this.table.columns.indexOf(this.column), 1);
        },
        vie_commit: function(vie, oldValue, newValue) {
            this.$emit('renamed', vie, oldValue, newValue);
            console.log('column renamed from ' + oldValue + ' to ' + newValue);
        },
        stopedOnEdge: function(ev){
            this.$emit('stoped-on-edge', ev);
        }

    },
});
