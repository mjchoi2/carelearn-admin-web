<template>
  <div ref="scrollContainer">
    <!-- 전체일때 -->
    <div v-if="selectedCategory == 'all'">
      <!-- 전체일때 -->
      <div class="my-4">
        <h2>
          {{
            partners.find((e) => e.id == selectedPartner)
              ? partners.find((e) => e.id == selectedPartner).name
              : ''
          }}
          지원사
        </h2>
        <div class="learn-status tab-com">
          <table>
            <thead>
              <tr>
                <th><h4>총 어르신</h4></th>
                <th><h4>오늘까지 학습한 어르신</h4></th>
                <th><h4>아직 학습 전 어르신</h4></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h4>
                    {{ seniors.length.toLocaleString() }}명
                    <button @click="scrollToSenior()">
                      <outline-ExternalLinkIcon class="inline-block w-4 h-4" />
                    </button>
                  </h4>
                </td>
                <td>
                  <button @click="filtered('work')">
                    <h4 class="underline">5명</h4>
                  </button>
                </td>
                <td>
                  <button @click="filtered('work')">
                    <h4 class="underline">5명</h4>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mb-4">
        <h2 class="mgtcom flex justify-start items-baseline">
          스마트 워크북
          <p class="ml-1.5 font-normal">
            진행률 <span class="maincolor font-bold">70%</span> / 총
            <span class="maincolor font-bold">180건</span> 학습
          </p>
        </h2>
        <CommonWorkbooktable></CommonWorkbooktable>
      </div>
      <div class="mb-4">
        <h2 class="mgtcom flex justify-start items-baseline">
          인지 게임
          <p class="ml-1.5 font-normal">
            총 <span class="maincolor font-bold">18건</span> 완료
          </p>
        </h2>
        <CommonGametable></CommonGametable>
      </div>
      <div ref="seniorList">
        <PartnerSeniorList></PartnerSeniorList>
      </div>
    </div>

    <!-- 스마트 워크북일때 -->
    <div v-if="selectedCategory == 'workbook'" class="relative">
      <CommonXlsxdown></CommonXlsxdown>
      <!-- 엑셀 다운로드 기능 추가 -->
      <PartnerWorkbookList :receiver="'partner'"></PartnerWorkbookList>
    </div>

    <div v-if="selectedCategory == 'game'">
      <PartnerGameList></PartnerGameList>
    </div>
  </div>
</template>

<script>
import { WORKBOOKCATE, GAMECATE } from '@/utils/constants.js';
import { mapState } from 'vuex';
export default {
  name: 'PartnerDetailList',
  data() {
    return {
      WORKBOOKCATE,
      GAMECATE,
      propsLimitData: 2,
      showData: [],
      curPage: 1,
      items: [
        {
          id: 1,
          category: '인지',
          name: '인지 문제 풀기',
          elder: '김수자',
          progress: '3/10',
          time: '12:04',
          updated_at: '2025-03-10 13:51:53',
          status: '학습 중',
          month: '2월',
        },
        {
          id: 2,
          category: '인지',
          name: '두뇌 강화 게임',
          elder: '나숙숙자',
          progress: '28/28',
          time: '57:00',
          updated_at: '2025-03-10 13:51:53',
          status: '완료',
          month: '2월',
        },
        {
          id: 3,
          category: '신체',
          name: '기억력 테스트',
          elder: '이한나',
          progress: '3/10',
          time: '13:67',
          updated_at: '2025-03-10 13:51:53',
          status: '학습 중',
          month: '3월',
        },
      ],
    };
  },
  computed: {
    ...mapState({
      selectedPartner: 'selectedPartner',
      partners: 'partners',
      seniors: 'seniors',
      selectedMonth: (state) => state.filter.selectedMonth,
      selectedCategory: (state) => state.filter.selectedCategory,
    }), // filter 모듈에서 가져옴
    filteredItems() {
      return this.items.filter((item) => item.month === this.selectedMonth);
    },
  },
  methods: {
    scrollToSenior() {
      this.$refs.seniorList.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
  },
};
</script>
<style>
.list-container:first-child {
  @apply mt-4;
}
.list-container {
  @apply mb-4;
}
</style>
