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
            console.log(ui);
            console.log('dropped' + $(ui.draggable).text());
        }
    });
}
function makeColumnsDraggable(){
    $('.eer-table .column').draggable({
        revert: true,
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


Vue.component('eer-designer', {
    props: ['tables'],    
    template: "<div> \
                <eer-table v-for='table in tables' \
                           v-bind:table='table' \
                           v-bind:key='table.name' \
                ></eer-table> \
            </div>"
});
