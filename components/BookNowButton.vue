<template>
  <a :href="href" rel="noopener"><slot>Book Now</slot></a>
</template>

<script setup>
// Link to Zenoti booking. Classes passed by the caller land on the anchor.
// `query` carries the legacy preset codes (e.g. 's=HC&fl=PL'); Zenoti ignores them for now.
const props = defineProps({
  query: { type: String, default: '' },
});

const { bookUrl } = useZenotiLinks();
const href = computed(() => bookUrl(props.query));
</script>
