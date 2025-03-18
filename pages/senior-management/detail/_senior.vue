<template>
  <div>
    <div class="my-4">
      <h2 id="senior-name">
        {{
          seniors.find((e) => e.study_idx == selectedSenior)
            ? seniors.find((e) => e.study_idx == selectedSenior).name
            : '유기현'
        }}&nbsp;어르신
      </h2>
      <table class="tab-com">
        <thead>
          <tr>
            <th>
              <h4>기본<br />정보</h4>
            </th>
            <td class="border-t border-[#ebeff5]"><h4>성명</h4></td>
            <td class="border-t border-[#ebeff5]">김숙자</td>
            <th><h4>생년월일</h4></th>
            <td class="border-t border-[#ebeff5]">1948-02-01</td>
            <th><h4>휴대전화</h4></th>
            <td class="border-t border-[#ebeff5]">010-1111-2222</td>
          </tr>
        </thead>
        <tr>
          <th><h4>비고</h4></th>
          <td colspan="2"></td>
          <th><h4>학습시작일</h4></th>
          <td>2025-02-01</td>
          <th><h4>생활지원사</h4></th>
          <td>임현정</td>
        </tr>
      </table>
    </div>
    <CommonUsagestats></CommonUsagestats>
    <SeniorDetailList></SeniorDetailList>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: 'seniorDetail',
  computed: {
    ...mapState(['selectedSenior', 'seniors']),
  },
  data() {
    return {};
  },
};
</script>
