export const state = () => ({
  partners: [], // 지원사 목록
  seniors: [], // 어르신 목록
  selectedPartner: 'all',
  selectedSenior: 'all',
});

export const mutations = {
  SET_PARTNERS(state, partners) {
    state.partners = partners;
  },
  SET_SENIORS(state, seniors) {
    state.seniors = seniors;
  },
  SET_SELECTED_PARTNER(state, partner) {
    state.selectedPartner = partner;
    localStorage.setItem('selectedPartner', JSON.stringify(partner));
  },
  SET_SELECTED_SENIOR(state, senior) {
    state.selectedSenior = senior;
    localStorage.setItem('selectedSenior', JSON.stringify(senior));
  },
  LOAD_FROM_STORAGE(state) {
    const savedSelectedPartners = localStorage.getItem('selectedPartner');
    const savedSelectedSeniors = localStorage.getItem('selectedSenior');

    if (savedSelectedPartners)
      state.selectedPartner = JSON.parse(savedSelectedPartners);
    if (savedSelectedSeniors)
      state.selectedSenior = JSON.parse(savedSelectedSeniors);
  },
};
export const actions = {
  async loadInitialData({ commit, state, dispatch }) {
    await commit('LOAD_FROM_STORAGE');
    await dispatch('fetchPartners');
    if (state.selectedPartner != 'all') {
      await dispatch('fetchSeniors', state.selectedPartner);
    }
  },
  async fetchPartners({ commit }) {
    const partners = [
      { id: 1, name: '임현정', user_id: 'imami' },
      { id: 2, name: '이한나', user_id: 'hnlee47' },
      { id: 3, name: '서정진', user_id: 'vmflfa' },
      { id: 4, name: '관리자', user_id: 'tester' },
    ];
    commit('SET_PARTNERS', partners);
  },
  async fetchSeniors({ state, commit }, partnerId) {
    try {
      // 전체를 불러서 filter 로 돌릴지?
      const partner = state.partners.find((e) => e.id === partnerId);
      if (!partner) throw new Error('Partner not found');

      const { user_id } = partner;
      const data = await this.$axios.$get(`/api/dashboard/getstudyuser`, {
        params: { type: 'list', user_id },
      });

      commit('SET_SENIORS', data || []);
      commit('SET_SELECTED_PARTNER', partnerId || []);
    } catch (error) {
      console.error('Error fetching seniors:', error.message);
      commit('SET_SENIORS', []);
    }
  },
  async fetchUsers({ commit }) {
    try {
      const response = await this.$axios.$get(
        '/api/dashboard/getstudyuser?type=list&user_id=tester',
      ); // API 호출
      commit('SET_USERS', response);
    } catch (error) {
      console.error('사용자 목록을 불러오는 중 오류 발생:', error);
    }
  },
};
