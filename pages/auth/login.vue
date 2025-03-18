<template>
  <div
    class="flex min-h-full flex-col justify-center w-full px-6 py-12 lg:px-8"
  >
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center">로그인</h2>
      <div class="mt-2">
        <input
          id="email"
          v-model="userid"
          name="email"
          required
          placeholder="기관 아이디로 로그인해 주세요."
          class="input input-bordered w-full"
        />
      </div>

      <div class="mt-2">
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          autocomplete="current-password"
          required
          placeholder="비밀번호를 입력해 주세요."
          class="input input-bordered w-full"
          @keyup.enter="login()"
        />
      </div>

      <div>
        <button
          class="flex w-full justify-center rounded-md bg-[#E0593C] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E0593C] mt-8 cursor-pointer"
          @click="login()"
        >
          로그인
        </button>
        <div class="text-sm">
          <a href="#" class="font-semibold text-balck cursor-pointer"
            >아이디/비밀번호 찾기</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AuthLogin',
  data: function () {
    return {
      userid: '',
      password: '',
    };
  },
  methods: {
    validation() {
      if (this.userid === '') {
        this.$swal.fire({
          title: '아이디를 입력해 주세요.',
          confirmButtonText: '확인',
        });
        return false;
      } else if (this.password === '') {
        this.$swal.fire({
          title: '비밀번호를 입력해 주세요.',
          confirmButtonText: '확인',
        });
        return false;
      } else {
        return true;
      }
    },
    async login() {
      if (this.validation()) {
        await this.$auth
          // .loginWith('laravelPassport', {
          .loginWith('local', {
            data: {
              client_id: process.env.PASSWORD_GRANT_ID,
              client_secret: process.env.PASSWORD_GRANT_SECRET,
              grant_type: 'password',
              userid: this.userid,
              password: this.password,
              scope: '*',
              service: 'silveredu',
              // site:'Hyotalk',
            },
          })
          .then((res) => {
            console.log(res);
            if (res.data.message === 'none' || res.data.message === 'befound') {
              this.$swal.fire({
                title: '아이디, 비밀번호를 다시 확인해 주세요.',
                confirmButtonText: '확인',
              });
            } else {
              this.$auth.fetchUser();
              console.log(this.$auth);
              return this.$router.push('/');
            }
          });
      }
    },
  },
};
</script>
<style scoped></style>
