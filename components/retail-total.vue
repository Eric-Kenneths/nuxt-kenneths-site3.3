<template>
  <div class="w-full">
    <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 text-base lg:text-lg">
      <!-- Subtotal -->
      <div class="min-w-0 text-left font-medium uppercase">
        Subtotal
      </div>
      <div class="text-right font-semibold whitespace-nowrap">
        {{ filterCurrency(retailGlobal.webOrderRetailCart.subTotal) }}
      </div>

      <!-- Shipping -->
      <div class="min-w-0 text-left font-medium uppercase">
        Shipping
      </div>
      <div class="text-right font-semibold whitespace-nowrap">
        {{ filterCurrency(retailGlobal.webOrderRetailCart.shippingAmount) }}
      </div>

      <!-- Tax -->
      <div class="min-w-0 text-left font-medium uppercase">
        Tax
      </div>
      <div class="text-right font-semibold whitespace-nowrap">
        {{ filterCurrency(retailGlobal.webOrderRetailCart.taxAmount) }}
      </div>

      <!-- Separator -->
      <div class="col-span-2">
        <hr class="border-primary-900/40 my-1" />
      </div>

      <!-- Total -->
      <div class="min-w-0 text-left text-lg lg:text-xl font-semibold uppercase">
        Total
      </div>
      <div class="text-right text-lg lg:text-xl font-bold whitespace-nowrap">
        {{ filterCurrency(retailGlobal.webOrderRetailCart.total) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { retailGlobal } from '~/composables/retailGlobal'
import { dataGlobal } from '~/composables/dataGlobal'

dataGlobal.sideBarVisible = false

const { filterCurrency } = useFilters()
</script>