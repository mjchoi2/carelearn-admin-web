export const state = () => ({
  selectedYear: 2025, //기본값
  selectedMonth: 1, // 기본값
  selectedWeek: 0, //기본값
  selectedCategory: '전체', // 카테고리 (인지, 생활, 체육)
});

export const mutations = {
  SET_YEAR(state, year) {
    state.selectedYear = year;
  },
  SET_MONTH(state, month) {
    state.selectedMonth = month;
  },
  SET_WEEK(state, week) {
    state.selectedWeek = week;
  },
  SET_CATEGORY(state, category) {
    state.selectedCategory = category;
  },
};
