mySVG = $('body').connect();
mySVG.drawLine({ left_node:'#column_table1_column1', right_node:'#column_table_1_id', horizantal_gap:10, error:true, });  
function eerRedrawLines(){
    mySVG.redrawLines();
}