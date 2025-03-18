<template>
  <div id="detailContainer" class="relative">
    <!-- 전체일때 -->
    <CommonXlsxdown></CommonXlsxdown>
    <div v-if="selectedCategory == 'all'">
      <div class="list-container">
        <h2 class="mgtcom flex justify-between items-baseline">
          스마트 워크북
          <p class="ml-1.5 font-normal float-right text-right">+ 더보기</p>
        </h2>
        <table class="tab-com smart-workbook">
          <thead>
            <tr>
              <th colspan="2"><h4>학습명</h4></th>
              <th><h4>진도</h4></th>
              <th><h4>최종 학습일</h4></th>
              <th><h4>완료여부</h4></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>인지</td>
              <td>같은 그림 찾기(하)</td>
              <td>3/10p</td>
              <td>2024-02-01</td>
              <td>학습 중</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="list-container">
        <h2 class="mgtcom flex justify-between items-baseline">
          스마트 워크북 유형별 완료
          <p class="ml-1.5 font-normal">총 11,529건 학습</p>
        </h2>
        <CommonWorkbooktable></CommonWorkbooktable>
        <table class="tab-com smart-workbook table-download">
          <thead>
            <tr>
              <th v-for="item in WORKBOOKCATE" v-bind:key="item.key">
                <h4>{{ item }}</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4><a href="javascript:;">7</a></h4>
              </td>
              <td>
                <h4><a href="javascript:;">25</a></h4>
              </td>
              <td>
                <h4><a href="javascript:;">100</a></h4>
              </td>
              <td>
                <h4><a href="javascript:;">1,234</a></h4>
              </td>
              <td>
                <h4><a href="javascript:;">0</a></h4>
              </td>
              <td>
                <h4><a href="javascript:;">84</a></h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="list-container flex gap-4 mgtcom">
        <div class="w-1/2">
          <h2 class="flex justify-between items-baseline">
            인지 게임
            <p class="ml-1.5 font-normal float-right text-right">+ 더보기</p>
          </h2>
          <table class="tab-com w-full table-download recognition-game">
            <thead>
              <th><h4>학습명</h4></th>
              <th><h4>최종 학습일</h4></th>
            </thead>
            <tbody>
              <tr>
                <td>바구니 돈 담기</td>
                <td>2024-02-01</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="w-1/2">
          <h2>학습현황</h2>
          <table class="tab-com w-full table-download">
            <thead>
              <th>오늘</th>
              <th>이번달</th>
            </thead>
            <tbody>
              <tr>
                <td>52분</td>
                <td>
                  <p>17시간 5분</p>
                  <p>(지난달 ▲ ▼ 4시간 5분)</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 스마트 워크북일때 -->
    <div v-if="selectedCategory == 'workbook'">
      <div class="list-container">
        <h2>{{ selectedMonth }} 사용현황 / 총 ####건 학습</h2>
        <!-- 필터링된 데이터 표시 -->
        <table class="tab-com">
          <thead>
            <tr>
              <th
                v-for="item in WORKBOOKCATE"
                v-bind:key="item.key"
                colspan="2"
              >
                <h4>{{ item }}</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="i in WORKBOOKCATE.length * 2" v-bind:key="i">
                {{ i % 2 == 1 ? '완료건' : '학습자' }}
              </td>
            </tr>
            <tr>
              <td v-for="i in WORKBOOKCATE.length * 2" v-bind:key="i">
                {{ i % 2 == 1 ? 4 : 1 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="list-container">
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
        <table class="tab-com table-download">
          <thead>
            <tr>
              <th>학습명</th>
              <th>진도</th>
              <th>사용시간</th>
              <th>최종 학습일</th>
              <th>완료 여부</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.progress }}P</td>
              <td>{{ item.time }}</td>
              <td>{{ item.updated_at }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="selectedCategory == 'game'">
      <!-- 인지게임일때 -->
      <div class="list-container">
        <h2>인지게임</h2>
        <!-- 필터링된 데이터 표시 -->
        <table class="tab-com table-download">
          <thead>
            <tr>
              <th rowspan="2" colspan="2">학습명</th>
              <th rowspan="2">최종 학습일</th>
              <th colspan="2">전체 기간 기록</th>
            </tr>
            <tr>
              <th>최단 기록</th>
              <th>최장 기록</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in SENIORGAMEDETAIL" :key="item.id">
              <td
                v-if="
                  key == 0 ||
                  SENIORGAMEDETAIL.findIndex(
                    (e) => e.category == item.category,
                  ) == key
                "
                :rowspan="
                  SENIORGAMEDETAIL.filter((e) => e.category == item.category)
                    .length
                "
              >
                {{ item.category }}
              </td>
              <td>{{ item.level }}</td>
              <td>{{ item.studyTime }}</td>
              <td>{{ item.created_at }}</td>
              <td>{{ item.updated_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  WORKBOOKCATE,
  GAMECATE,
  SENIORGAMEDETAIL,
  SENIORGAMEDETAIL2,
} from '@/utils/constants.js';
import { mapState } from 'vuex';
export default {
  name: 'SeniorDetailList',
  data() {
    return {
      GAMECATE,
      WORKBOOKCATE,
      SENIORGAMEDETAIL,
      SENIORGAMEDETAIL2,
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
          elder: '나숙자',
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
    ...mapState('filter', ['selectedMonth', 'selectedCategory']),
    filteredItems() {
      return this.items.filter((item) => item.month === this.selectedMonth);
      // return this.items.filter(
      //   (item) =>
      //     (this.selectedCategory === '전체' ||
      //       item.category === this.selectedCategory) &&
      //     item.month === this.selectedMonth,
      // );
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
