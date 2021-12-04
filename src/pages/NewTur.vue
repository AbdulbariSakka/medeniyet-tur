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

export default {
    setup() {
        const $q = useQuasar()

        const name = ref(null);
        const price = ref(null);
        const file = ref(null);
        const desc = ref(null);
        const history = ref(null);

        const accept = ref(false);
        const onSubmit = () => {
            if (accept.value !== true) {
            $q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'You need to accept the license and terms first'
            })
            }
            else {
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted'
            })
            }
        };

        return{
            name,
            price,
            desc,
            history,
            accept,
            file,

            onSubmit
        }
    },
}
</script>