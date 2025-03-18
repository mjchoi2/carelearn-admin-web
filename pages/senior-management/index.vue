<template>
  <div>
    <h2>어르신 현황</h2>
    <table class="tab-com learn-status">
      <thead>
        <tr>
          <th><h4>총 어르신</h4></th>
          <th><h4>오늘까지 학습한 어르신</h4></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h4>{{ seniors.length.toLocaleString() }}명</h4>
          </td>
          <td><h4>81명</h4></td>
        </tr>
      </tbody>
    </table>
    <div class="mgtcom flex justify-between items-center">
      <h2 class="">어르신 관리</h2>
      <div class="inline-flex items-center">
        <button class="btn" @click="isShowGroupModal = true">
          <outline-UploadIcon class="w-4 h-4" />
          엑셀파일 업로드
        </button>
        <select class="select w-full">
          <option>생활지원사</option>
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
        <button class="btn" @click="isShowModal = true">
          <outline-PlusIcon class="w-4 h-4" />어르신 등록
        </button>
      </div>
    </div>
    <table class="tab-com">
      <thead>
        <th>No</th>
        <th>성명</th>
        <th>생년월일</th>
        <th>연락처</th>
        <th>생활지원사</th>
        <th>학습 시작일</th>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in showData" v-bind:key="item.key">
          <td>{{ propsLimitData * (curPage - 1) + idx + 1 }}</td>
          <td class="flex justify-center items-center">
            <span class="hover:underline">
              {{ item.name }}
            </span>
            <svg
              @click="isShowModal = true"
              class="inline-block ml-1"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.8 18.199C6.54654 18.4528 6.24554 18.6542 5.91421 18.7916C5.58288 18.9291 5.22771 18.9998 4.869 19H1V15.156C1 14.432 1.288 13.737 1.8 13.225M6.8 18.199L1.8 13.225M6.8 18.199L16.774 8.22095M1.8 13.225L11.784 3.22995L13.21 1.80196C13.4638 1.54781 13.7651 1.34618 14.0968 1.20857C14.4286 1.07097 14.7842 1.00009 15.1433 1C15.5024 0.999907 15.8581 1.0706 16.1899 1.20803C16.5217 1.34546 16.8231 1.54695 17.077 1.80096L18.203 2.92796C18.7155 3.44049 19.0035 4.13563 19.0035 4.86045C19.0035 5.58528 18.7155 6.28042 18.203 6.79296L16.774 8.22095M16.774 8.22095L11.783 3.22995"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </td>
          <td>{{ item.birth }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ getPartnerName(item.user_id) }}</td>
          <td>{{ item.created_at }}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>임현정</td>
          <td>1948-07-06</td>
          <td>010-1234-5679</td>
          <td>임현정</td>
          <td>2024-02-20 18:50</td>
        </tr>
      </tbody>
    </table>
    <CommonPagination
      :propsArr="seniors"
      :propsLimitData="propsLimitData"
      @update:showData="(newArr) => (showData = newArr)"
      @update:page="(newPage) => (curPage = newPage)"
    ></CommonPagination>
    <ModalSeniorAddModal v-if="isShowModal" @close="isShowModal = false" />
    <ModalSeniorGroupAddModal
      v-if="isShowGroupModal"
      @close="isShowGroupModal = false"
    />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'SeniorManagementHome',
  data() {
    return {
      showData: [],
      propsLimitData: 2,
      curPage: 1,
      isShowModal: false,
      isShowGroupModal: false,
    };
  },
  computed: {
    ...mapState(['partners', 'seniors', 'selectedPartner', 'selectedSenior']),
  },
  methods: {
    ...mapMutations(['SET_SELECTED_PARTNER', 'SET_SELECTED_SENIOR']),

    getPartnerName(partnerId) {
      console.log(partnerId);
      if (this.partners && this.partners.find((e) => e.user_id == partnerId)) {
        console.log('e');
        const partner = this.partners.find((e) => e.user_id == partnerId);
        return partner.name + ' 지원사';
      }
      // const selectedPartner = this.partners.find((e) => e.user_id == partnerId);
      // console.log(selectedPartner);
      return '지원사';
    },
  },
};
</script>
