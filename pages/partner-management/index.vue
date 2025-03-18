<template>
  <div>
    <h2>생활지원사 현황</h2>
    <ul class="flex gap-4 w-2/3 text-center mb-4">
      <li class="border w-full">
        <p class="border-b bg-[#D9D9D9]">총 사용자</p>
        <p>80명</p>
      </li>
      <li class="border w-full">
        <p class="border-b bg-[#D9D9D9]">오늘 사용자</p>
        <p>8명</p>
      </li>
    </ul>
    <div class="mgtcom flex justify-between items-center">
      <h2 class="">생활지원사 관리</h2>
      <div class="inline-flex items-center">
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
        <button class="btn" @click="isShowReg = true">생활지원사 등록</button>
      </div>
    </div>
    <table class="tab-com">
      <thead>
        <th>No</th>
        <th>태블릿</th>
        <th>성명</th>
        <th>아이디</th>
        <th>대상자</th>
        <th>최종 접속 시간</th>
        <th>학습 결과 전송 시간</th>
        <th>관리</th>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in showData" v-bind:key="item.key">
          <td>
            {{ propsLimitData * (curPage - 1) + idx + 1 }}
          </td>
          <td>SKN-200 RNRF2098ED</td>
          <td>{{ item.name }}</td>
          <td>imnami</td>
          <td>20명</td>
          <td>2024-02-20 18:50</td>
          <td>2024-02-20 18:50</td>
          <td>
            <button class="underline cursor-pointer" @click="changePartner()">
              사용자 변경
            </button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>SKN-200 RNRF2098ED</td>
          <td>임현정</td>
          <td>imnami</td>
          <td>20명</td>
          <td>2024-02-20 18:50</td>
          <td>2024-02-20 18:50</td>
          <td>
            <button class="underline cursor-pointer" @click="changePartner()">
              사용자 변경
            </button>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>SKN-200 RNRF2098ED</td>
          <td>임현정</td>
          <td>imnami</td>
          <td>20명</td>
          <td>2024-02-20 18:50</td>
          <td>2024-02-20 18:50</td>
          <td>
            <button class="underline cursor-pointer" @click="changePartner()">
              사용자 변경
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <CommonPagination
      :propsArr="seniors"
      :propsLimitData="propsLimitData"
      @update:showData="(newArr) => (showData = newArr)"
      @update:page="(newPage) => (curPage = newPage)"
    ></CommonPagination>
    <ModalPartnerAddModal
      v-if="isShowReg == true"
      @close="isShowReg = false"
    ></ModalPartnerAddModal>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'PartnerManagementIndex',
  data() {
    return {
      propsLimitData: 1,
      showData: [],
      isPopupOpen: false,
      isShowReg: false,
      curPage: 1,
    };
  },
  computed: {
    ...mapState(['seniors', 'selectedPartner', 'selectedSenior']),
  },
  created() {
    this.SET_SELECTED_PARTNER('all');
  },
  methods: {
    ...mapMutations(['SET_SELECTED_PARTNER']),
    changePartner() {
      console.log('changed partner');
      this.$swal.fire({
        title:
          '생활지원사를 변경하시겠습니까? \n소속된 어르신은 모두 변경된 생활지원사로 소속됩니다.',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCancelButton: true,
        reverseButtons: true,
      });
    },
  },
};
</script>
