<template>
    <div class="dog_gallery">
        <div class="selection">
            <h1>Name That Dog!</h1>

            <section class="portrait_wrapper">
                <img v-if="dog_exists" :src="dog" />
                <button @click="get_dog" v-show="dog_exists">Different Dog, Please</button>

            </section>

            <section class="names" v-show="dog_exists">
                <h2>What name is worthy of this magnificent creature?</h2>

                <section class="name_list">
                    <span
                            class="name"
                            v-for="(name, index) in names"
                            :key="index"
                            @click="select_name(name.name)"
                    >
                        {{ name.name }}
                    </span>
                </section>

                <div class="actions">
                    <button @click="get_names">Refresh Names List</button>
                </div>

                <cite><a href="https://dog.ceo/dog-api/" target="_blank">Dogs provided by Dog API</a> | <a href="https://uinames.com/" target="_blank">Names provided by UI Names</a></cite>

            </section>
        </div>

        <section class="kennel">
            <h1>Your Pooch Stable</h1>

            <p v-show="kennel_count < 1">You currently have no pooches :(</p>

            <div class="kennel_gallery">
                <span
                        class="dog_in_kennel"
                        v-for="(doggie, index) in kennel"
                        :key="index"
                >
                    <img :src="doggie.dog" />

                    <span class="dog_name">{{ doggie.name }}</span>
                    <a href="#" class="remove_dog" @click.prevent="remove_from_kennel(doggie)">X</a>
                </span>
            </div>

        </section>

    </div>
</template>

<script>
    const _ = require('lodash');

    export default {
        data() {
            return {
                names: null,
                dog: null,
                kennel: []
            }
        },

        mounted() {
            this.get_dog();
            this.get_names();
        },

        methods: {
            get_dog(){
                let vm = this;
                $.ajax({
                    url: 'https://dog.ceo/api/breeds/image/random',
                    dataType: 'json',
                    type: 'GET',
                }).done(function(response) {
                    let response_returned = !!(response);

                    if(response_returned){
                        vm.dog = response.message;
                    }
                });
            },
            get_names(){
                let vm = this;
                $.ajax({
                    url: 'https://uinames.com/api/?amount=10',
                    dataType: 'json',
                    type: 'GET',
                }).done(function(response) {
                    let response_returned = !!(response);

                    if(response_returned){
                        vm.names = response;
                    }
                });
            },
            select_name(dog_name){
                let dog_in_queue = {
                    name: dog_name,
                    dog: this.dog
                };
                // add it to dog for kennel
                this.kennel.unshift(dog_in_queue);

                // remove it from name array
                const new_names_list = _.filter(this.names, function(name) { return (name.name != dog_name); });
                this.names = new_names_list;

                // refresh dog image
                this.get_dog();
            },
            remove_from_kennel(doggie){
                const new_kennel = _.filter(this.kennel, function(dog) { return (dog.name != doggie.name); });
                this.kennel = new_kennel;
            }
        },

        computed: {
            dog_exists(){
                return !!(this.dog && this.dog.length > 0);
            },
            names_exist(){
                return !!(this.names);
            },
            name_count(){
                return this.names_exist ? this.names.length : 0;
            },
            kennel_has_dogs(){
                return (this.kennel && this.kennel.length > 0);
            },
            kennel_count() {
                return this.kennel_has_dogs ? this.kennel.length : 0;
            }
        }
    }
</script>