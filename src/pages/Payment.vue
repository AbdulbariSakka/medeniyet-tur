<template>
    <q-page class="q-ma-xl">
        <div class="q-pa-md">
            <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
            >
            <div class="row q-gutter-md">
                <div class="col-md-6">
                    <div class="row q-gutter-md">
                        <h5 class="col-12">Personal Information</h5>
                        <q-input
                            class="col-12 col-md-5"
                            v-model="name"
                            type="text"
                            label="name *"
                            maxlength="50"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type your name']"
                        />
                        <q-input
                            class="col-12 col-md-5"
                            v-model="surname"
                            type="text"
                            label="surname *"
                            maxlength="50"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type your surname']"
                        />
                        <q-input
                            class="col-12 col-md-5"
                            v-model="bornDate"
                            type="date"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type your born date']"
                        />
                        <q-input
                            class="col-12 col-md-5"
                            v-model="email"
                            label="Email *"
                            type="email"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type your surname']"
                        />
                        <q-input
                            class="col-12 col-md-5"
                            v-model="phoneNumber"
                            label="Phone number *"
                            type="number"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type your surname']"
                        />
                        <q-input
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            class="col-12 col-md-5"
                            v-model="tcNumber"
                            label="TC number *"
                            maxlength="11"
                            minlength="11"
                            type="number"
                            lazy-rules
                            :rules="[ val => val && val.length === 11 || 'Please type your surname']"
                        />
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="row q-gutter-md">
                        <h5 class="col-12">Payment</h5>
                        <q-input
                            class="col-12"
                            v-model="cardNumber"
                            type="number"
                            label="Card Number *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type your name']"
                        />
                        <q-input
                            class="col-12"
                            v-model="cardFullName"
                            type="text"
                            label="Full Name *"
                            maxlength="50"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type your surname']"
                        />
                        <q-select  class="col-5 col-md-3" v-model="month" :options="months" label="month" />
                        <q-select class="col-5 col-md-3" v-model="year" :options="years" label="year" />
                        <q-input
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            class="col-12 col-md-5"
                            v-model="cvv"
                            type="number"
                            label="CVV *"
                            lazy-rules
                            maxlength="3"
                            :rules="[ val => val && val.length > 0 || 'Please type your name']"
                        />
                    </div>
                </div>
            </div>
            
            <q-toggle v-model="accept" label="I accept the license and terms" />
            <q-toggle v-model="acceptNotifications" label="I want to be informed about opportunities and campaigns" />

            <div class="q-mx-lg">
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn label="Reset" type="reset" color="primary" class="q-ml-sm"/>
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
        const surname = ref(null);
        const bornDate = ref(null);
        const email = ref(null);
        const tcNumber = ref(null);

        const accept = ref(false);
        const acceptNotifications = ref(false);

        const month = ref(null);
        const year = ref(null);

        const cvv = ref(null);
        const cardNumber = ref(null);
        const cardFullName = ref(null);

        const months = [
            '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
        ]
        const years = [
            '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'
        ]

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

        const onReset = () => {
            name.value = null
            age.value = null
            accept.value = false
        }

        return{
            name,
            surname,
            bornDate,
            email,
            tcNumber,
            accept,
            acceptNotifications,

            cvv,
            cardNumber,
            cardFullName,

            months,
            years,

            onSubmit,
            onReset
        }
    },
}
</script>