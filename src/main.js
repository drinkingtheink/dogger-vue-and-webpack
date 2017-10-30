require('./main.scss');
import Vue from 'vue';

import dog_gallery from './components/dog_gallery.vue';

new Vue({
    el: '#app',
    components: {
        dog_gallery
    }
});
