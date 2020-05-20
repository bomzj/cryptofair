<template>
  <section class="container mx-auto p-6">
    <h2 class="text-4xl font-semibold text-center mb-8">Peer-to-Peer Exchange Benefits</h2>
    <div class="flex flex-wrap justify-around text-gray-800 ">
      <div class="flex flex-col w-1/3">
        <img src="./cards.svg" width="64" class="mb-2"/>
        <h2 class="text-xl font-medium mb-2">All Payment Methods Available</h2>
        <p class="mb-2 text-gray-800">
          More than 250+ payment methods available for our customers with the most popular
        </p>
        <ul class="text-gray-800 list-disc">
            <li>Bank/SWIFT/SEPA Transfer</li>
            <li>Credit/Debit Card</li>
            <li>PayPal, Skrill</li>
            <li>Cash</li>
          </ul>
      </div>
      <div class="flex flex-col w-1/3">
        <img src="./piggy-bank.svg" width="64" class="mb-2"/>
        <h2 class="text-xl font-medium mb-2">No Hidden Fees</h2>
        <ul class="text-gray-800 list-disc">
            <li>All fees are calculated and included in final price</li>
            <li>No other additional markups and fees</li>
            <li>You see only the final price</li>
        </ul>
      </div>
      <div class="flex flex-col">
        <img src="./ninja.svg" width="64" class="mb-2"/>
        <h2 class="text-xl font-medium mb-2">Be Anonymous</h2>
        <ul class="text-gray-800 list-disc">
          <li>Simple Registration Process</li>
          <li>No KYC/AML</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
