Vue.component('eer-designer', {
    props: ['tables'],    
    template: "<div> \
                <eer-table v-for='table in tables' \
                           v-bind:table='table' \
                           v-bind:key='table.name' \
                ></eer-table> \
            </div>"
});
