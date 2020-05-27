<template>
    <BaseLayout>
      <IntroHero />
      <OurBenefits />
      <!-- <SupportedExchanges /> -->
    </BaseLayout>
</template>

<script>
import BaseLayout from '@/layout/BaseLayout'
import IntroHero from './IntroHero'
import OurBenefits from './our-benefits/OurBenefits'
//import SupportedExchanges from './SupportedExchanges.vue'

export default {
  name: 'HomePage',
  components: {
    BaseLayout, IntroHero, OurBenefits, /*SupportedExchanges*/
  }
}
</script>