<template>
  <div ref="scrollContainer">
    <div class="list-container">
      <h2>{{ selectedMonth }} 사용현황 / 총 ####건 학습</h2>
      <!-- 필터링된 데이터 표시 -->
      <CommonWorkbooktable></CommonWorkbooktable>
    </div>
    <div class="list-container mgtcom">
      <div class="flex justify-between items-center">
        <div class="flex justify-start items-center">
          <h2>스마트 워크북</h2>
          <div class="form-control ml-4">
            <label class="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                class="radio checked:bg-red-500"
                checked="checked"
                value="all"
                v-model="workbookStatus"
              />
              <span class="label-text text-base">전체</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                class="radio checked:bg-blue-500"
                checked="checked"
                value="완료"
                v-model="workbookStatus"
              />
              <span class="label-text text-base">완료</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                class="radio checked:bg-blue-500"
                checked="checked"
                value="학습 중"
                v-model="workbookStatus"
              />
              <span class="label-text text-base">학습중</span>
            </label>
          </div>
        </div>
        <!-- 검색영역 -->
        <div>
          <label class="input input-bordered flex items-center gap-2">
            <input type="text" class="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="h-4 w-4 opacity-70"
            >
              <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd"
              />
            </svg>
          </label>
        </div>
      </div>
      <!-- 필터링된 데이터 표시 -->
      <table class="tab-com">
        <thead>
          <tr>
            <th>학습명</th>
            <th>어르신명</th>
            <th>진도</th>
            <th>사용시간</th>
            <th>최종 학습일</th>
            <th>완료 여부</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.elder }}</td>
            <td>{{ item.progress }}</td>
            <td>{{ item.time }}</td>
            <td>{{ item.updated_at }}</td>
            <td>{{ item.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'PartnerDetailWorkbookList',
  data() {
    return {
      filteredSeniors: [],
      propsLimitData: 2,
      showData: [],
      curPage: 1,
      workbookStatus: 'all',
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
          month: '3월',
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
          month: '3월',
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
      if (this.workbookStatus != 'all')
        return this.items.filter(
          (item) =>
            item.month === this.selectedMonth &&
            item.status == this.workbookStatus,
        );
      else
        return this.items.filter((item) => item.month === this.selectedMonth);
    },
  },
  mounted() {
    this.filteredSeniors = this.seniors;
  },
  methods: {
    scrollToSenior() {
      this.$refs.seniorList.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    filtered(type) {
      // type : 학습 전, 학습후
      //senior 리스트 변경
      console.log(type);
      // this.filteredSeniors = this.seniors.
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
