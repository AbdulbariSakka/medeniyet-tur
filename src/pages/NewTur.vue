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
                            type="number"
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
                        <q-input
                            @update:model-value="val => { file = val[0] }"
                            filled
                            type="file"
                            required = 'required'
                        />

                    </div>
                </div>
            </div>
            
            <q-checkbox v-model="accept" label="Active tur" />

            <div class="q-mx-lg">
                <q-btn label="Submit" type="submit" color="primary" class="q-mr-md"/>
                <q-btn label="Back" to="/admin" color="primary"/>

            </div>
            </q-form>
            <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
                 <q-card class="bg-teal text-white" style="width: 300px">


                    <q-card-section>
                        {{response}}
                    </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="OK" to="/admin" v-if="response == 'Tur eklendi'"/>
                    <q-btn flat label="OK" v-close-popup v-else/>

                </q-card-actions>
                 </q-card>
            </q-dialog>
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

        const dialog = ref(false)

        const name = ref(null);
        const price = ref(null);
        const file = ref(null);
        const desc = ref(null);
        const history = ref(null);

        const accept = ref(false);
        
        const response = ref(null)
        const position = ref("top")
        const onSubmit = () => {
                const formData = new FormData();
                formData.append('ImageFile', file.value);
                formData.append('Name', name.value);
                formData.append('Price', parseFloat(price.value));
                formData.append('Date', history.value);
                formData.append('Description' , desc.value);
                const headers = { 'Content-Type': 'multipart/form-data' };
                axios({
                url:"http://localhost:4000/api/tur",
                method: 'post', 
                headers: headers,
                data: formData
                }).then((res) => {
                    if(res.status === 200 || res.status === 204){
                        dialog.value = true
                        response.value = "Tur eklendi"
                    }
                    else{
                        dialog.value = true
                        response.value = "Tur eklenmedi"
                    }
                })

            const onReset = () => {
                name.value = null
                        price.value = null
                        file.value = null
                        desc.value = null
                        history.value = null
                        accept.value = false
            }    

        };

        return{
            name,
            price,
            desc,
            history,
            accept,
            file,

            response,
            position,
            dialog,

            onSubmit
        }
    },
}
</script>