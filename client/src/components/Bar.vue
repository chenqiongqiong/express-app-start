<template>
  <div>bar{{test}}</div>
</template>

<script>
export default {
  name: 'bar-component',
  props: {
    test: String,
  },
};
</script>
