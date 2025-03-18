<template>
  <div class="font-NotoSans">
    <LayoutsHeader />
    <div class="allwrap">
      <sidebarContainer v-if="$auth.loggedIn == true"></sidebarContainer>
      <Nuxt />
    </div>
    <LayoutsFooter />
  </div>
</template>
<script>
export default {
  name: 'DefaultLayouts',
};
</script>
<style>
.allwrap {
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
  font-weight: 400; /* Regular */
  letter-spacing: -1px;
  /* display: flex;
  justify-content: flex-start;*/
  color: #000;

  width: 100%;
  transform: scale(1); /* 기본값 */
  transform-origin: top left; /* 축소 기준점 */
  display: flex;
  height: calc(100vh - 74px);
}
</style>
