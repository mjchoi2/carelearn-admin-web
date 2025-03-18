<template>
  <table class="tab-com recognition-game table-download">
    <thead>
      <tr>
        <th v-for="item in GAMECATE" v-bind:key="item.key" colspan="2">
          <h4>{{ item }}</h4>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for="i in GAMECATE.length * 2" v-bind:key="i">
          {{ i % 2 == 1 ? '완료건' : '학습자' }}
        </td>
      </tr>
      <tr>
        <td v-for="i in GAMECATE.length * 2" v-bind:key="i">
          {{ i % 2 == 1 ? 4 : 1 }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { GAMECATE } from '@/utils/constants.js';
export default {
  name: 'CommonGametable',
  data() {
    return {
      GAMECATE,
    };
  },
};
</script>
