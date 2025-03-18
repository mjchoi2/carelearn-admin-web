<template>
  <div class="left-area bg-white">
    <div class="institution">
      <h1>실버노인종합복지관</h1>
    </div>
    <div class="list-wrap flex">
      <SidebarPartnerSidebar
        @open="senior = true"
        @selectPartner="loadSeniors"
      ></SidebarPartnerSidebar>
      <SidebarSeniorSidebar
        v-if="$route.name.includes('senior')"
        @open="senior = true"
        @close="senior = false"
      ></SidebarSeniorSidebar>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'sidebarContainer',
  data: function () {
    return {
      senior: false,
    };
  },
  computed: {
    ...mapState('filter/selectedPartner'),
  },
  methods: {
    loadSeniors(partner) {
      this.$store.commit('SET_SELECTED_PARTNER', partner);
      this.$store.dispatch('fetchSeniors', partner);
    },
  },
};
</script>

<style scroped>
.institution {
  text-align: center;
  border-bottom: 1px solid #e7ecf4;
  height: 85px;
  line-height: 85px;
}

.institution .closebtn svg {
  width: 0.8rem;
  height: 0.8rem;
}
.list-wrap {
  background: #fff;
  padding: 30px 20px 22px;
  height: calc(100vh - 182px);
}

.list-wrap-in {
  width: 224px;
  height: 100%;
}

.addarea {
  margin-left: 16px;
}

.list-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eff2f7;
  padding-bottom: 15px;
}

.list-name .plus {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

.list-name .plus img {
  width: 77%;
}

.allnum {
  @apply font-bold text-xl text-[#2f76ff] ml-0.5 mr-0.5 relative top-[1px];
}

.list {
  background: #f6f7f9;
  border-radius: 6px;
  padding: 16px;
  margin-top: 16px;
  /* height:69vh; */
  height: calc(100% - 44.5px);
  position: relative;
}

.list .closebtn {
  position: absolute;
  top: 0;
  right: 0;
  background: #5f5f5f;
  color: #fff;
  padding: 4px;
  cursor: pointer;
}

.list-info {
  margin: 0 0 4px 16px;
}

.list-info h6:last-child {
  margin-left: 33px;
}

.r-in {
  width: 100%;
}

.allwrap .list .nameid li {
  margin-bottom: 8px;
}

.allwrap .list .nameid a {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #fff;
  padding: 14px 0;
  border-radius: 6px;
  cursor: pointer;
}

.allwrap .list .nameid .allp {
  display: inline-block;
  width: 100%;
  padding: 14px 15px;
}

.allwrap .list .nameid a .namearea {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 52px;
}

.allwrap .list .nameid a p:nth-child(2) {
  width: 70px;
  color: #8b8b8b;
}

.allwrap .list .nameid a.active,
.allwrap .list .nameid a:hover {
  background: #2f76ff;
  color: #fff;
}

.allwrap .list .nameid a.active p:nth-child(2),
.allwrap .list .nameid a:hover p:nth-child(2) {
  color: #ffffffa6;
}

.allwrap .list .nameid svg {
  width: 1rem;
}
</style>
