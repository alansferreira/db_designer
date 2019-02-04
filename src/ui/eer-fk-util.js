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

function makeColumnsDroppable(){
    $('.eer-table .column').droppable({
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
            const dragTable = ui.draggable.get(0).__vue__.$props.table;
            const dragColumn = ui.draggable.get(0).__vue__.$props.column;
            const dropTable = event.target.__vue__.$props.table;
            const dropColumn = event.target.__vue__.$props.column;
            /** @type {ForeingKey} */ let fk = null;
            
            if(dropColumn.isPrimary){
                fk = new ForeignKey(dragTable, [dragColumn], dropTable, [dropColumn]);
            }else{
                fk = new ForeignKey(dropTable, [dropColumn], dragTable, [dragColumn]);
            }
            console.log(fk);
            const left_node = '#' + fk.tableSchema + '_' + fk.table + '_' + fk.references[0].columnName;
            const right_node = '#' + fk.referenceSchema + '_' + fk.referenceTable + '_' + fk.references[0].referenceColumnName;
            mySVG.drawLine({ left_node: left_node, right_node: right_node, horizantal_gap:10, error:true, });  
            dragTable.foreignKeys.push(fk);

            // console.log(ui);
            console.log('dropped' + $(ui.draggable).text());
        }
    });
}

function makeColumnsDraggable(){
    $('.eer-table .column').draggable({
        revert: true,
        handle: '.drag-handle',
        // stack: "div",
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
