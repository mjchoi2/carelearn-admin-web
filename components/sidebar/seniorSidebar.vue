<template>
  <div class="list-wrap-in addarea">
    <div class="list-name">
      <h5 class="font-semibold">어르신 정보</h5>
      <div class="flex justify-between items-center">
        <h6>총 <span class="allnum">3</span></h6>
        <span class="plus" @click="isShowReg = true">
          <img src="~assets/images/icon-carelearn-plus.svg" alt="플러스" />
        </span>
      </div>
    </div>
    <div class="list">
      <span class="closebtn" @click="$emit('close')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="size-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </span>
      <div class="list-info flex justify-start">
        <h6>이름</h6>
        <h6>생년월일</h6>
      </div>
      <ul class="nameid">
        <li @click="SET_SELECTED_SENIOR('all')">
          <NuxtLink
            to="/senior-management"
            class="allp"
            :class="{
              active: selectedSenior == 'all',
            }"
          >
            <p class="text-left">전체</p>
          </NuxtLink>
        </li>
        <li v-for="item in seniors" v-bind:key="item.study_idx">
          <a
            :class="{
              active: selectedSenior == item.study_idx,
            }"
            @click="showDetailSenior(item.study_idx)"
          >
            <p class="namearea" v-html="item.name"></p>
            <p v-html="item.birth.replaceAll('-', '').replace('19', '')"></p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
    <ModalSeniorAddModal v-if="isShowReg" @close="isShowReg = false" />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'SeniorSidebar',
  data: function () {
    return {
      isShowReg: false,
    };
  },
  computed: {
    ...mapState(['partners', 'seniors', 'selectedPartner', 'selectedSenior']),
  },
  methods: {
    ...mapMutations(['SET_SELECTED_PARTNER', 'SET_SELECTED_SENIOR']),
    showDetailSenior(id) {
      this.SET_SELECTED_SENIOR(id);
      this.$store.dispatch('fetchSeniors', this.selectedPartner);
      this.$router.push({
        name: 'senior-management-detail-senior',
        params: { senior: id },
      });
    },
  },
};
</script>
