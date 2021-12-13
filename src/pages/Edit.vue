<template>
    <q-page class="q-ma-xl">
        <div class="q-pa-md">
            <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
            >
            <h5 class="q-pl-md">Tur Information</h5>
            <div class="row q-gutter-md">
                <div class="col-md-6 q-pr-lg">
                    <div class="row q-gutter-md">
                        <q-input
                            class="col-12"
                            v-model="name"
                            type="text"
                            label="name *"
                            maxlength="50"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type your name']"
                        />
                        <q-input
                            class="col-12"
                            v-model="price"
                            type="text"
                            label="Price *"
                            maxlength="50"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type tur price']"
                        />
                        <q-input
                            class="col-12"
                            v-model="history"
                            type="text"
                            label="History *"
                            maxlength="50"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type tur history']"
                        />
                        
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="row q-gutter-md">
                        <q-input
                            class="col-12"
                            v-model="desc"
                            type="textarea"
                            label="Description *"
                            lazy-rules
                            maxlength="100"
                            :rules="[ val => val && val.length > 0 || 'Please type tur description']"
                        />
                        <!--<div class="col-12">
                            <q-img
                            :src="imageUrl"
                            :ratio="1"
                            />
                        </div>
                        -->
                        <q-input
                            @update:model-value="val => { file = val[0] }"
                            filled
                            type="file"
                        />

                    </div>
                </div>
            </div>
            
            <q-checkbox v-model="accept" label="Active tur" />

            <div class="q-mx-lg">
                <q-btn label="Submit" type="submit" color="primary" />
            </div>
            </q-form>

        </div>
    </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import axios from 'axios'

export default {
    setup() {
        const $q = useQuasar()

        const name = ref(null);
        const price = ref(null);
        const file = ref(null);
        const desc = ref(null);
        const history = ref(null);
        const id = ref(null);
        const image = ref(null);
        const accept = ref(false);

        //const imageUrl = ref(null);
        const getId = () => {
            id.value = localStorage.getItem("id");
            const getTur = () => {
                axios({
                    url: "http://localhost:58854/api/tur/" + id.value, 
                    method: "GET"
                }).then((res) => {
                    name.value = res.data.name;
                    price.value = res.data.price;
                    desc.value = res.data.description;
                    history.value = res.data.date;
                    image.value = res.data.image;
                    //imageUrl.value = "http://localhost:58854/image/"+ image.value;
                })
            };
            getTur();
        }
        getId();

        const onSubmit = () => {
                const formData = new FormData();
                formData.append('ImageFile', file.value);
                formData.append('Name', name.value);
                formData.append('Price', price.value);
                formData.append('Date', history.value);
                formData.append('Description' , desc.value);
                formData.append('Id' , id.value);
                if(file.value === null){
                    formData.append('Image' , image.value);
                }
                

                const headers = { 'Content-Type': 'multipart/form-data' };
                axios({
                url:"http://localhost:58854/api/tur",
                method: 'put', 
                headers: headers,
                data: formData
                });
            
        };

        return{
            name,
            price,
            desc,
            history,
            accept,
            file,
            //imageUrl,

            onSubmit
        }
    },
}
</script>