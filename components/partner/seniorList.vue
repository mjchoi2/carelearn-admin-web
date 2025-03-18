<template>
  <div>
    <!-- 전체일때 -->
    <div ref="seniorList" class="mgtcom">
      <div class="flex justify-between items-center">
        <h2>어르신 학습현황</h2>
        <div class="inline-flex">
          <label class="input input-bordered flex items-center gap-2">
            <input
              type="text"
              class="grow"
              placeholder="Search"
              v-model="seniorName"
              @keyup.enter="searchName()"
            />
            <svg
              @click="searchName()"
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
          <th><h4>No</h4></th>
          <th><h4>성명</h4></th>
          <th><h4>생년월일</h4></th>
          <th><h4>학습여부</h4></th>
          <th><h4>최종 학습일</h4></th>
          <th><h4>학습현황</h4></th>
        </thead>
        <tbody>
          <tr v-for="(senior, idx) in showData" v-bind:key="idx">
            <td>{{ propsLimitData * (curPage - 1) + idx + 1 }}</td>
            <td>{{ senior.name }}</td>
            <td>{{ senior.birth }}</td>
            <td>
              <p
                :class="
                  (senior.workbook && senior.workbook.length > 0) ||
                  (senior.game && senior.game.length > 0)
                    ? 'text-[#0B6BFD]'
                    : 'text-[#FD0B0F]'
                "
              >
                {{
                  (seniors.workbook && senior.workbook.length > 0) ||
                  (senior.game && senior.game.length > 0)
                    ? '학습'
                    : '미학습'
                }}
              </p>
            </td>
            <td>{{ senior.updated_at }}</td>
            <td>
              <button @click="goToPage(senior.study_idx, 'workbook')">
                스마트 워크북
              </button>
              <NuxtLink
                :to="{
                  name: 'senior-management-detail-senior',
                  params: { senior: senior.study_idx },
                  query: { mode: 'workbook' },
                }"
                class="mr-4 underline"
              >
                스마트 워크북<outline-ExternalLinkIcon
                  class="inline-block w-4 h-4"
                />
              </NuxtLink>
              <button class="underline">
                인지게임<outline-ExternalLinkIcon
                  class="inline-block w-4 h-4"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <CommonPagination
        :propsArr="filteredSeniors"
        :propsLimitData="propsLimitData"
        @update:showData="(newArr) => (showData = newArr)"
        @update:page="(newPage) => (curPage = newPage)"
      ></CommonPagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'PartnerSeniorList',
  data() {
    return {
      propsLimitData: 2,
      showData: [],
      curPage: 1,
      seniorName: '',
    };
  },
  computed: {
    ...mapState({
      seniors: 'seniors',
      selectedMonth: (state) => state.filter.selectedMonth,
      selectedCategory: (state) => state.filter.selectedCategory,
    }),
    filteredSeniors() {
      if (this.seniorName)
        return this.seniors.filter((e) => e.name.includes(this.seniorName));
      else return this.seniors;
    },
  },
  mounted() {
    this.filteredSeniors = this.seniors;
  },
  methods: {
    ...mapMutations('filter', ['SET_CATEGORY']),
    filtered(type) {
      // type : 학습 전, 학습후
      console.log(type);
      this.filteredSeniors = this.seniors.filter((e) => e.gameStudy != '{}');
    },
    goToPage(seniorid, type) {
      this.SET_CATEGORY(type);
      console.log(type);

      this.$router.push({
        name: 'senior-management-detail-senior',
        params: { senior: seniorid },
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
