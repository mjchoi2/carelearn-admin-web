<template>
  <div class="right-area">
    <CommonUsagestats></CommonUsagestats>
    <HomeDetailList></HomeDetailList>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'HomeIndex',
  created() {
    this.SET_SELECTED_PARTNER('all');
  },
  methods: {
    ...mapMutations(['SET_SELECTED_PARTNER']),
  },
};
</script>
