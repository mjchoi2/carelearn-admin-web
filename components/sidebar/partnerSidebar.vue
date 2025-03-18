<template>
  <div>
    <div class="list-wrap-in" v-if="partners && partners.length > 0">
      <div class="list-name">
        <h5 class="font-semibold">지원사 목록</h5>
        <div class="flex justify-between items-center">
          <h6>
            총 <span class="allnum">{{ partners.length }}</span>
          </h6>
          <button @click="isShowReg = true">
            <span class="plus">
              <img src="~assets/images/icon-carelearn-plus.svg" alt="플러스" />
            </span>
          </button>
        </div>
      </div>
      <div class="list">
        <div class="list-info flex justify-start">
          <h6>이름</h6>
          <h6>아이디</h6>
        </div>
        <ul class="nameid">
          <li
            @click="SET_SELECTED_PARTNER('all')"
            v-if="!$route.name.includes('senior')"
          >
            <NuxtLink
              to="/partner-management"
              class="allp"
              :class="{
                active: selectedPartner == 'all',
              }"
            >
              <p class="text-left">전체</p>
            </NuxtLink>
          </li>
          <li v-for="item in partners" v-bind:key="item.id">
            <a
              :class="{
                active: selectedPartner == item.id,
              }"
              @click="showDetailPartner(item.id)"
            >
              <p class="namearea" v-html="item.name"></p>
              <p v-html="item.user_id"></p>
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
    </div>
    <div class="list-wrap-in" v-else>
      <div class="list-name">
        <h5 class="font-semibold">지원사 관리</h5>
        <div class="flex justify-between items-center">
          <span class="plus" @click="isShowReg = true">
            <img src="~assets/images/icon-carelearn-plus.svg" alt="플러스" />
          </span>
        </div>
      </div>
      <div class="list flex flex-col items-center justify-center">
        <p class="text-center mb-4">
          케어런을 사용하는 <br />생활지원사를 등록하세요.
        </p>
        <button class="btn bg-[#D9D9D9]" @click="isShowReg = true">
          생활 지원사 등록>
        </button>
      </div>
    </div>
    <ModalPartnerAddModal v-if="isShowReg" @close="isShowReg = false" />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'PartnerSidebar',
  data: function () {
    return {
      isShowReg: false,
      showId: 'all',
    };
  },
  computed: {
    ...mapState(['partners', 'selectedPartner']),
  },
  methods: {
    ...mapMutations(['SET_SELECTED_PARTNER']),
    showDetailPartner(id) {
      this.showId = id;
      this.$emit('selectPartner', id);
      if (!this.$route.name.includes('senior')) {
        this.$router.push({
          name: 'partner-management-detail-partner',
          params: { partner: id },
        });
      } else {
        this.$router.push({
          name: 'senior-management',
        });
      }
    },
  },
};
</script>
