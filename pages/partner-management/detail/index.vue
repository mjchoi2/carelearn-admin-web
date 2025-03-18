<template>
  <div>
    <CommonUsagestats></CommonUsagestats>
    <div class="learn-status tab-com">
      <table>
        <thead>
          <tr>
            <th><h4>총 어르신</h4></th>
            <th><h4>오늘까지 학습한 어르신</h4></th>
            <th><h4>아직 학습 전 어르신</h4></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><h4>305명</h4></td>
            <td><h4>81명</h4></td>
            <td><h4>224명</h4></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="mgtcom flex justify-start items-baseline">
      스마트 워크북
      <p class="ml-1.5 font-normal">
        총 <span class="maincolor font-bold">180건</span> 학습
      </p>
    </h2>
    <table class="tab-com smart-workbook">
      <thead>
        <tr>
          <th v-for="item in WORKBOOKCATE" v-bind:key="item.key">
            <h4>{{ item }}</h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <h4><a href="javascript:;">7</a></h4>
          </td>
          <td>
            <h4><a href="javascript:;">25</a></h4>
          </td>
          <td>
            <h4><a href="javascript:;">100</a></h4>
          </td>
          <td>
            <h4><a href="javascript:;">1,234</a></h4>
          </td>
          <td>
            <h4><a href="javascript:;">0</a></h4>
          </td>
          <td>
            <h4><a href="javascript:;">84</a></h4>
          </td>
        </tr>
      </tbody>
    </table>
    <h2 class="mgtcom flex justify-start items-baseline">
      인지 게임
      <p class="ml-1.5 font-normal">
        총 <span class="maincolor font-bold">18건</span> 완료
      </p>
    </h2>
    <table class="tab-com recognition-game">
      <thead>
        <tr>
          <th>
            <h4><a href="javascript:;">바구니 돈 담기</a></h4>
          </th>
          <th>
            <h4><a href="javascript:;">속담 맞추기</a></h4>
          </th>
          <th>
            <h4><a href="javascript:;">단어 그림 맞추기</a></h4>
          </th>
          <th>
            <h4><a href="javascript:;">그림 맞추기</a></h4>
          </th>
          <th>
            <h4><a href="javascript:;">키오스크 체험</a></h4>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <ul>
              <li>
                <span>완료</span>
                <span>미학습</span>
              </li>
              <li>
                <span>20</span>
                <span>105</span>
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li>
                <span>완료</span>
                <span>미학습</span>
              </li>
              <li>
                <span>20</span>
                <span>105</span>
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li>
                <span>완료</span>
                <span>미학습</span>
              </li>
              <li>
                <span>20</span>
                <span>105</span>
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li>
                <span>완료</span>
                <span>미학습</span>
              </li>
              <li>
                <span>20</span>
                <span>105</span>
              </li>
            </ul>
          </td>
          <td>
            <ul>
              <li>
                <span>완료</span>
                <span>미학습</span>
              </li>
              <li>
                <span>20</span>
                <span>105</span>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { WORKBOOKCATE } from '@/utils/constants.js';
export default {
  name: 'PartnerManagementHome',
  data() {
    return {
      WORKBOOKCATE,
      isPopupOpen: false,
    };
  },
};
</script>
