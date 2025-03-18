<template>
  <div>
    <!-- 전체일때 -->
    <div v-if="selectedCategory == 'all'">
      <!-- 전체일때 -->

      <div class="learn-status tab-com flex">
        <div class="mgtcom w-3/4">
          <h2 class="">학습현황</h2>
          <table class="tab-com">
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
                  <h4>{{ seniors.length.toLocaleString() }}명</h4>
                </td>
                <td><h4>81명</h4></td>
                <td><h4>224명</h4></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- chart js 영역 -->
        <canvas id="seniorChart1" width="430" height="200"></canvas>
      </div>
      <h2 class="mgtcom flex justify-start items-baseline">
        스마트 워크북
        <p class="ml-1.5 font-normal">
          총 <span class="maincolor font-bold">180건</span> 학습
        </p>
      </h2>
      <CommonWorkbooktable></CommonWorkbooktable>
      <h2 class="mgtcom flex justify-start items-baseline">
        인지 게임
        <p class="ml-1.5 font-normal">
          총 <span class="maincolor font-bold">18건</span> 완료
        </p>
      </h2>
      <CommonGametable></CommonGametable>
      <div class="flex flex-row">
        <canvas id="seniorChart2" width="800" height="300"></canvas>
        <canvas id="seniorChart3" width="450" height="300"></canvas>
      </div>
    </div>
    <!-- 스마트 워크북일때 -->
    <div v-if="selectedCategory == 'workbook'">
      <div class="list-container">
        <h2>
          {{ selectedMonth }} 사용현황
          <span class="ml-8">진행율 70% / 총 ####건 학습</span>
        </h2>
        <CommonWorkbooktable></CommonWorkbooktable>
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

    <div v-if="selectedCategory == 'game'">
      <!-- 인지게임일때 -->
      <div class="list-container">
        <h2>
          {{ selectedMonth }} 사용현황
          <span class="ml-8">진행율 70% / 총 ####건 학습</span>
        </h2>
        <div class="mb-4">
          <CommonGametable></CommonGametable>
        </div>
      </div>
      <div class="list-container">
        <div class="flex justify-between">
          <h2>인지게임</h2>
          <div class="inline-flex">
            <select class="select select-bordered">
              <option>전체</option>
            </select>
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
              <th colspan="2" rowspan="2">학습명</th>
              <th rowspan="2">어르신명</th>
              <th rowspan="2">최종 학습일</th>
              <th colspan="3">최단 시간 기록</th>
            </tr>
            <tr>
              <th>이번 달</th>
              <th>지난 달 대비</th>
              <th>지난 달</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredItems" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.elder }}</td>
              <td>{{ item.progress }}</td>
              <td>{{ item.time }}</td>
              <td>지난 달 대비</td>
              <td>지난 달 대비</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { WORKBOOKCATE, GAMECATE } from '@/utils/constants.js';
import { Chart, registerables } from 'chart.js';
import { mapState } from 'vuex';
Chart.register(...registerables);
// 정보 있을때 chart 쇼
export default {
  name: 'HomeDetailList',
  data() {
    return {
      WORKBOOKCATE,
      GAMECATE,
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
    }),
    filteredItems() {
      return this.items.filter((item) => item.month === this.selectedMonth);
    },
  },
  watch: {
    selectedCategory() {
      this.$nextTick(() => {
        if (this.selectedCategory == 'all') this.drawChart();
      });
    },
  },
  mounted() {
    this.getContents();
  },
  methods: {
    getContents() {
      // draw chart;
      this.drawChart();
    },
    drawChart() {
      this.setChart1();
      this.setChart2();
      this.setChart3();
    },
    setChart1() {
      const ctx1 = document.getElementById('seniorChart1').getContext('2d');
      return new Chart(ctx1, {
        type: 'doughnut',
        data: {
          labels: ['학습', '미학습'],
          datasets: [
            {
              label: '인원 현황',
              data: [5, 300],
              backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(75, 192, 192)',
              ],
              borderColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(75, 192, 192)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          rotation: -90,
          circumference: 180,
          plugins: {
            title: {
              display: true,
              text: '총 어르신 305',
              position: 'bottom',
            },
          },
        },
      });
    },
    setChart2() {
      const ctx2 = document.getElementById('seniorChart2').getContext('2d');

      return new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: GAMECATE,
          datasets: [
            {
              label: '완료',
              data: [10, 50, 30, 40, 30],
              backgroundColor: 'rgba(54, 162, 235)',
            },
            {
              label: '미학습',
              data: [20, 30, 50, 60, 30],
              backgroundColor: 'rgba(255, 99, 132)',
            },
          ],
        },
        options: {
          responsive: false,
        },
      });
    },
    setChart3() {
      const ctx3 = document.getElementById('seniorChart3').getContext('2d');

      return new Chart(ctx3, {
        type: 'doughnut',
        data: {
          labels: ['인지', '보건', '영양', '우울', '신체', '사회적응'],
          datasets: [
            {
              label: '스마트 워크북',
              data: [7, 25, 100, 1231, 0, 64],
              backgroundColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(75, 192, 192)',
              ],
              borderColor: [
                'rgba(255, 99, 132)',
                'rgba(54, 162, 235)',
                'rgba(75, 192, 192)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            title: {
              display: true,
              text: '스마트 워크북',
              position: 'top',
            },
          },
        },
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
