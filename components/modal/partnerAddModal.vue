<template>
  <div
    class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-70"
  >
    <div
      class="bg-white w-11/12 max-w-lg popup px-6 pt-5 pb-8 shadow-lg max-h-[90vh] overflow-y-auto"
    >
      <div
        class="flex justify-between items-center border-b border-[#EBEEF2] pb-2 mb-6"
      >
        <h1>생활지원사 등록</h1>
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
      <div class="input-layout">
        <label>태블릿</label>
        <input
          id="orderMname"
          type=""
          name="orderMname"
          placeholder="고유번호를 입력해주세요."
          class="form-control"
        />
      </div>
      <div class="input-layout">
        <label>아이디</label>
        <input
          id="n_mag_id_name"
          type="text"
          name="id_name"
          class="form-control"
          v-model="userId"
          v-bind:disabled="isSearch"
          title="아이디"
        />
        <button @click="searchUserId()">검색</button>
      </div>
      <div class="text-sm text-stone-800 ml-14" v-if="!isSearch">
        <p>실버에듀넷 가입 아이디를 조회하여 등록하실 수 있어요.</p>
      </div>
      <div v-if="isSearch">
        <div class="flex justify-start items-center gap-x-2 ml-14 text-[15px]">
          <span>회원명</span>
          <span class="text-[#2f76ff]">{{ username }}</span>
        </div>
        <div class="w-full border-b border-[#EBEEF2] mt-6 mb-5"></div>
        <div class="text-center text-lg mb-2">
          검색된 회원을 등록하시겠습니까?
        </div>
        <div class="popbtn2s">
          <button>다시검색</button>
          <button @click="addPartner()">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'partnerAddModal',
  data: function () {
    return { isSearch: false, userId: '', username: '' };
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
  width: 240px;
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
