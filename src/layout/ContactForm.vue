<template>
  <article class="flex flex-col my-4">
    <h3 class="page-title text-center mb-4">Contact us</h3>
    <div class="flex flex-col my-4" v-if="!isFormSent">
      <input v-model="mail" class="form-input block my-2" placeholder="Your email address" :readonly="isFormSending"/>
      <textarea v-model="message" class="form-textarea block flex-grow my-2" rows="6" placeholder="Message" :readonly="isFormSending"/>
      <button class="button button-outline-primary self-end" @click="submitForm" :disabled="isFormSending">Submit</button>
    </div>
    <p v-else class="self-center text-lg text-gray-600 font-normal">Thank you for the feedback!</p>
    <p v-if="isErrorOccured" class="self-center">Error occured. The message has not been sent. Try Again.</p>
    <!-- <transition name="fade">
      <div class="alert alert-success" v-show="isFormSent" @click="isFormSent = false">
        <strong>Заказ отправлен!</strong> Мы свяжемся с Вами для подтверждения заказа.
      </div>	
    </transition> -->
    <!-- <transition name="fade">
      <div class="alert alert-danger" v-show="isErrorAlertShowing" @click="isErrorAlertShowing = false">
        <strong>Произошла ошибка!</strong> Попробуйте отправить заказ еще раз или перезвоните нам.
      </div>
    </transition>
    <transition name="fade">
      <div class="alert alert-warning" v-show="isWholesaleWarninigAlertShowing" @click="isWholesaleWarninigAlertShowing = false">
        <strong>Внимание!</strong> Минимальный оптовый заказ - от {{ wholesalePriceThreshold }} руб.
      </div>
    </transition> -->
  </article>
</template>

<script>
import getHttpClient from '@/http-client'
const http = getHttpClient(0)

export default {
  data() {
    return {
      mail: '',
      message: '',
      isFormSending: false,
      isFormSent: false,
      isErrorOccured: false
    }
  },
  methods: {
    async submitForm() {
      this.isFormSending = true
      
      // let response = await http('/.netlify/functions/send-mail' +
      //                           '?subject=CryptoFair Feedback' +
      //                           '&from=' + this.mail +
      //                           '&body=' + this.message)

      this.isFormSending = false
      this.isFormSent = true
      //console.log(response)
    }
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul li {
  @apply my-4;
}
</style>