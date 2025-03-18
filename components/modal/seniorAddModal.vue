<template>
  <div
    class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-70"
  >
    <div
      class="bg-white w-11/12 max-w-xl popup px-6 pt-5 pb-8 shadow-lg max-h-[90vh] overflow-y-auto"
    >
      <div
        class="flex justify-between items-center border-b border-[#EBEEF2] pb-2 mb-6"
      >
        <h1>어르신 등록</h1>
        <span class="text-black cursor-pointer" @click="$emit('close')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </span>
      </div>
      <table class="w-full mb-4">
        <tr>
          <td><span class="text-[#FD0B0F]">*</span>성명</td>
          <td>
            <input
              id="name"
              type="text"
              name="name"
              class="input input-sm input-bordered form-control"
            />
          </td>
          <td><span class="text-[#FD0B0F]">*</span>생년월일</td>
          <td>
            <input
              id="orderMname"
              type="text"
              name="orderMname"
              placeholder="예시 1950-01-01"
              class="input input-sm input-bordered form-control"
            />
          </td>
        </tr>
        <tr>
          <td><span class="text-[#FD0B0F]">*</span>휴대전화</td>
          <td>
            <input
              id="name"
              type="text"
              name="name"
              class="input input-sm input-bordered form-control"
              placeholder="(예시 010-1234-5678)"
            />
          </td>
        </tr>
        <tr>
          <td>비고</td>
          <td>
            <input
              id="etc"
              type="text"
              name="etc"
              class="input input-sm input-bordered w-full form-control"
            />
          </td>
        </tr>
        <tr>
          <td><span class="text-[#FD0B0F]">*</span>학습시작일</td>
          <td>
            <input
              id="start_date"
              type="date"
              name="start_date"
              class="input input-sm input-bordered form-control"
            />
          </td>
          <td>담당<br />생활지원사</td>
          <td>
            <select class="select select-bordered">
              <option>xx</option>
              <option v-for="item in partners" v-bind:key="item.id">
                {{ item.name }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>학습종료일</td>
          <td>
            <input
              id="start_date"
              type="date"
              name="start_date"
              class="input input-sm input-bordered form-control"
            />
          </td>
        </tr>
      </table>
      <div class="popbtn2s">
        <button>수정</button>
        <button>저장</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'seniorAddModal',
  data: function () {
    return { isSearch: false, userId: '', username: '' };
  },
  computed: {
    ...mapState(['partners', 'selectedPartner']),
  },
  methods: {
    searchUserId() {
      console.log(this.userId);

      this.$axios
        .get('https://api.silveredu.net/api/userinfo/getuserinfofind', {
          params: {
            userid: this.userId,
          },
        })
        .then((response) => {
          console.log(response);
          if (response && response.data.user_id === this.userId) {
            // 이름 마스킹처리
            let firstChar = response.data.realname.charAt(0); // '김'
            let lastTwoChars = response.data.realname.slice(-1); // '은'

            this.username = firstChar + '*' + lastTwoChars;
            this.isSearch = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addPartner() {
      console.log('a');
      this.$swal.fire({
        title: '검색한 회원을 생활지원사로\n 등록하시겠습니까?',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCancelButton: true,
        reverseButtons: true,
      });
    },
  },
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/gh/whimsy/pretendard/dist/web/pretendard.css');
@font-face {
  font-family: 'Pretendard';
  src:
    url('/fonts/Pretendard-Regular.woff2') format('woff2'),
    url('/fonts/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Pretendard';
  src:
    url('/fonts/Pretendard-Regular.woff2') format('woff2'),
    url('/fonts/Pretendard-Regular.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}
.popup {
  font-family:
    'Pretendard',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  color: #000;
}
.popup h1 {
  font-size: 24px;
  font-weight: 600;
}

.input-layout {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 6px;
}

.input-layout label {
  font-size: 18px;
  font-weight: 400;
}

.input-layout .form-control {
  background: #fff;
  border: 1px solid #e1e1e1;
  font-size: 18px;
  color: #000;
  padding: 9px 12px;
  letter-spacing: 0px;
  margin: 0 5px 0 10px;
}

input::placeholder {
  color: #b4b4b4;
  font-size: 17px;
}

input:disabled {
  -webkit-text-fill-color: #848484 !important;
  background: #f5f5f5 !important;
}

.input-layout button {
  background: #959595;
  color: #fff;
  border-radius: 4px;
  padding: 11px 16px;
}

.popbtn2s {
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 6px;
}

.popbtn2s button {
  padding: 9px 0;
  width: 94px;
  font-size: 17px;
  border-radius: 4px;
  background: #959595;
  color: #fff;
}

.popbtn2s button:last-child {
  background: #2f76ff;
}
</style>
