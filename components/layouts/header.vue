<template>
  <div
    class="flex justify-between items-center bg-white px-7 py-4 border-b border-[#E7ECF4]"
  >
    <img src="~assets/images/logo-carelearn.svg" />
    <div class="gnb">
      <ul>
        <li>
          <NuxtLink to="/" :class="{ on: $route.name == 'index' }"
            >케어런 홈</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/partner-management"
            :class="{ on: $route.name.includes('partner-management') }"
            >지원사 관리</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/senior-management"
            :class="{ on: $route.name.includes('senior-management') }"
            >어르신 관리</NuxtLink
          >
        </li>
      </ul>
    </div>
    <div class="flex justify-center">
      <span v-if="$auth.loggedIn" class="mr-3 cursor-pointer text-black"
        ><span class="font-bold">{{ $auth.user.name }}</span
        >님</span
      >
      <span v-else class="mr-3 cursor-pointer text-black"
        ><span class="font-bold" @click="$router.push('auth/login')"
          >로그인</span
        ></span
      >
      <span
        v-if="$auth.loggedIn"
        class="cursor-pointer text-black"
        @click="logout"
        >로그아웃</span
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'DefaultHeader',
  methods: {
    async logout() {
      console.log(this.$auth);
      await this.$auth.logout();
      this.$auth.fetchUser();
      this.$router.push('/auth/login');
    },
  },
};
</script>
<style>
.gnb ul {
  display: flex;
  justify-content: center;
  column-gap: 70px;
}

.gnb ul li {
}

.gnb ul a {
  /* padding: 15px 0 7px; */
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
}

.gnb ul a.on {
  /* border-bottom: 3px solid #60B2FF; */
  color: #2f76ff;
}
</style>
