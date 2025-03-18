<template>
  <div ref="scrollContainer">
    <!-- 인지게임일때 -->
    <div class="list-container mgtcom">
      <h2>{{ selectedMonth }} 사용현황 / 총 ####건 학습</h2>
      <CommonGametable></CommonGametable>
    </div>
    <div class="list-container mgtcom">
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
          <template v-for="game in games">
            <tr
              v-for="(player, playerIndex) in game.players"
              :key="playerIndex"
            >
              <!-- 학습명 (첫 번째 행에만 표시하고 병합) -->
              <td v-if="playerIndex === 0" :rowspan="game.players.length">
                {{ game.name }}
              </td>
              <td>난이도 {{ player.level }}</td>
              <td>{{ player.name }}</td>
              <td>{{ player.lastStudyDate }}</td>
              <td>
                <span>{{ player.currentTime }}</span>
              </td>
              <td>
                <span
                  :class="
                    player.diffTime.startsWith('-')
                      ? 'up text-blue-500'
                      : 'down text-red-500'
                  "
                >
                  {{ player.diffTime.startsWith('-') ? '▲' : '▼' }}
                  {{ player.diffTime.replace('-', '') }}
                </span>
              </td>
              <td>
                <span>{{ player.prevTime }}</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'PartnerDetailList',
  data() {
    return {
      filteredSeniors: [],
      propsLimitData: 2,
      showData: [],
      curPage: 1,
      games: [
        {
          name: '바구니 돈 담기',
          players: [
            {
              name: '김수자',
              level: 1,
              lastStudyDate: '2024-03-16',
              currentTime: '00:15:00',
              diffTime: '-00:01:00',
              prevTime: '00:16:00',
            },
            {
              name: '나춘자',
              level: 2,
              lastStudyDate: '2024-03-05',
              currentTime: '00:03:10',
              diffTime: '+00:02:10',
              prevTime: '00:01:00',
            },
            {
              name: '김정일',
              level: 1,
              lastStudyDate: '2024-03-04',
              currentTime: '00:00:30',
              diffTime: '-00:00:10',
              prevTime: '00:00:40',
            },
          ],
        },
        {
          name: '속담 맞추기',
          players: [
            {
              name: '나춘자',
              level: 1,
              lastStudyDate: '2024-03-05',
              currentTime: '00:03:10',
              diffTime: '+00:02:10',
              prevTime: '00:01:00',
            },
            {
              name: '김정일',
              level: 1,
              lastStudyDate: '2024-03-04',
              currentTime: '00:00:30',
              diffTime: '-00:00:10',
              prevTime: '00:00:40',
            },
          ],
        },
        {
          name: '그림 맞추기',
          players: [
            {
              name: '나춘자',
              level: 1,
              lastStudyDate: '2024-03-05',
              currentTime: '00:03:10',
              diffTime: '+00:02:10',
              prevTime: '00:01:00',
            },
            {
              name: '김정일',
              level: 1,
              lastStudyDate: '2024-03-04',
              currentTime: '00:00:30',
              diffTime: '-00:00:10',
              prevTime: '00:00:40',
            },
            {
              name: '나춘자A',
              level: 1,
              lastStudyDate: '2024-03-05',
              currentTime: '00:03:10',
              diffTime: '+00:02:10',
              prevTime: '00:01:00',
            },
            {
              name: '나춘자B',
              level: 1,
              lastStudyDate: '2024-03-05',
              currentTime: '00:03:10',
              diffTime: '+00:02:10',
              prevTime: '00:01:00',
            },
          ],
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
      return this.games.filter((item) => item.month === this.selectedMonth);
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
