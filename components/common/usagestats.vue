<template>
  <div>
    <h2>
      {{ $route.name.includes('senior') ? '학습현황(전체)' : '사용현황' }}
    </h2>
    <div class="usage-status">
      <table>
        <tr>
          <th>월</th>
          <td class="month flexstart">
            <div class="text-[23px] font-bold leading-none">
              {{ selectedYear }}
            </div>
            <div class="yearbtn flexstart">
              <span
                v-if="selectedYear >= 2025"
                @click="setYear(selectedYear - 1)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </span>
              <span @click="setYear(parseInt(selectedYear) + 1)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>
            </div>
            <ul class="">
              <li v-for="i in 12" v-bind:key="i" @click="setMonth(`${i}월`)">
                <a :class="{ mon: `${i}월` == selectedMonth }">{{ i }}월</a>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>주</th>
          <td class="week flexstart">
            <div class="all" @click="SET_WEEK(0)">
              <a :class="{ weekon: selectedWeek == 0 }"><p>전체</p></a>
            </div>
            <ul class="">
              <li
                v-for="(week, key) in weekArr"
                v-bind:key="key"
                @click="SET_WEEK(key + 1)"
              >
                <a
                  class="flexstart"
                  :class="{ weekon: selectedWeek == key + 1 }"
                >
                  <p>{{ key + 1 }}주차</p>
                  <p>{{ week[0] }}~{{ week[1] }}</p>
                </a>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>일</th>
          <td>
            <div class="custom-select">
              <select>
                <option>전체</option>
                <option
                  v-for="i in new Date(
                    new Date().getFullYear(),
                    selectedMonth.replaceAll(/[^0-9]/g, ''),
                    0,
                  ).getDate()"
                  v-bind:key="i"
                >
                  {{ i }}
                </option>
              </select>
            </div>
          </td>
        </tr>
        <tr v-show="$route.name != 'index'">
          <th>구분</th>
          <td class="flexstart gap-x-5">
            <div class="check-item-checkall" @click="setCategory('all')">
              <div class="checkbox">
                <input
                  id="chk_all"
                  type="radio"
                  name="chktype"
                  class="cart_check-all"
                  data-type="all"
                  value="all"
                  v-model="selectedCategory"
                />
                <label for="chk_all" class="check-item-label"
                  ><span data-v-dfdac958="" class="ek-sr-only"></span
                ></label>
              </div>
              <label for="chk_all" class="check-item-label">전체</label>
            </div>
            <div class="check-item-checkall" @change="setCategory('workbook')">
              <div class="checkbox">
                <input
                  id="chk_all2"
                  type="radio"
                  name="chktype"
                  class="cart_check-all"
                  data-type="all"
                  value="workbook"
                  v-model="selectedCategory"
                />
                <label for="chk_all2" class="check-item-label"
                  ><span data-v-dfdac958="" class="ek-sr-only"></span
                ></label>
              </div>
              <label for="chk_all2" class="check-item-label"
                >스마트워크북</label
              >
            </div>
            <div class="check-item-checkall" @change="setCategory('game')">
              <div class="checkbox">
                <input
                  id="chk_all3"
                  type="radio"
                  name="chktype"
                  class="cart_check-all"
                  data-type="all"
                  value="game"
                  v-model="selectedCategory"
                />
                <label for="chk_all3" class="check-item-label"
                  ><span data-v-dfdac958="" class="ek-sr-only"></span
                ></label>
              </div>
              <label for="chk_all3" class="check-item-label">인지 게임</label>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'CommonUsagestats',
  data: function () {
    return {
      weekArr: [],
    };
  },
  computed: {
    ...mapState('filter', [
      'selectedYear',
      'selectedMonth',
      'selectedWeek',
      'selectedCategory',
    ]),
  },
  created() {
    // this.SET_CATEGORY('all');
    this.SET_MONTH(`${new Date().getMonth() + 1}월`);
    this.setweek();

    if (this.weekArr) {
      let i = 0;
      const today = new Date();
      while (
        (this.weekArr[i][0] && new Date(this.weekArr[i][0]) <= today) ||
        today >= new Date(this.weekArr[i][1])
      ) {
        i++;
      }
      this.SET_WEEK(0);
    }
  },
  methods: {
    ...mapMutations('filter', [
      'SET_YEAR',
      'SET_MONTH',
      'SET_WEEK',
      'SET_CATEGORY',
    ]),
    setYear(year) {
      this.SET_YEAR(year);
      this.setMonth('1월');
    },
    setMonth(month) {
      this.SET_MONTH(month);
      this.SET_WEEK(0);
      this.setweek();
    },
    setweek() {
      this.weekArr = [];
      const year = this.selectedYear;
      const month = parseInt(this.selectedMonth.replaceAll(/[^0-9]/g, '')) - 1;

      let firstDay = new Date(year, month, 1);
      let firstSunday;
      if (firstDay.getDay() >= 4) {
        firstSunday = new Date(year, month, 1 + (7 - firstDay.getDay()));
      } else {
        firstSunday = new Date(year, month, 1 - firstDay.getDay());
      }

      while (
        firstSunday.getMonth() === month ||
        (firstDay.getDay() <= 4 && firstSunday.getMonth() == month - 1) ||
        (firstDay.getDay() <= 4 && firstSunday.getMonth() + 1 == 12)
      ) {
        let weekStart = new Date(firstSunday);
        let weekEnd = new Date(firstSunday);
        weekEnd.setDate(weekEnd.getDate() + 6); // 토요일 계산

        this.weekArr.push([
          `${weekStart.getFullYear()}-${weekStart.getMonth() + 1 > 9 ? weekStart.getMonth() + 1 : '0' + (weekStart.getMonth() + 1)}-${weekStart.getDate() > 9 ? weekStart.getDate() : '0' + weekStart.getDate()}`,
          `${weekEnd.getFullYear()}-${weekEnd.getMonth() + 1 > 9 ? weekEnd.getMonth() + 1 : '0' + (weekEnd.getMonth() + 1)}-${weekEnd.getDate() > 9 ? weekEnd.getDate() : '0' + weekEnd.getDate()}`,
        ]);

        firstSunday.setDate(firstSunday.getDate() + 7);
      }
    },
    setCategory(category) {
      this.SET_CATEGORY(category);
    },
  },
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse; /* 테두리가 겹치지 않게 설정 */
  background: #fff;
  /* table-layout: fixed; */
  margin-top: 4px;
}

.usage-status table {
  border-top: 1px solid #e9edf4;
  border-bottom: 1px solid #e9edf4;
}

.usage-status td {
  padding: 10px 15px;
}

.usage-status th {
  width: 4%;
  border-right: 1px solid #e9edf4;
  background: #ebeff5;
}

.usage-status td,
.usage-status th {
  border-bottom: 1px solid #e9edf4 !important;
}

.usage-status tr:last-child td,
.usage-status tr:last-child th {
  border-bottom: none !important;
}

.month {
  align-items: center;
}

.yearbtn {
  margin: 0 8px;
}

.yearbtn span {
  border: 1px solid #dde2e9;
  cursor: pointer;
  padding: 0 3px;
  margin: 0 2px;
}

.yearbtn span svg {
  width: 1rem;
  color: #b6bdc7;
}

.month ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none; /* 기본 리스트 스타일 제거 */
  width: 80%;
}

.month ul li {
  /*flex: 1;
min-width:40px;   최소 너비로 설정 */
  margin-right: 5px;
  box-sizing: border-box;
}

.month ul li a {
  width: 100%;
  display: inline-block;
  color: #000;
  border: 1px solid #dbdbdb;
  background: #fff;
  border-radius: 2px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  padding: 0 8px;
}

.month ul li a.mon,
.month ul li a:hover {
  background: #2f76ff;
  color: #fff;
  border: 1px solid #2f76ff;
}

.week .all {
  margin-right: 4px;
}

.week .all a {
  background: #fff;
  color: #000;
  border: 1px solid #dbdbdb;
  padding: 4px 12px;
  display: inline-block;
  border-radius: 2px;
}

.week .all a p {
  white-space: nowrap;
}

.flexstart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.week ul {
  /*display: grid;
  grid-template-columns: repeat(4, 1fr);*/
  display: flex;
  column-gap: 8px;
  align-items: center;
  list-style: none; /* 기본 리스트 스타일 제거 */
  white-space: nowrap;
}

.week ul li {
  flex-shrink: 0;
  cursor: pointer;
}

.week ul li a {
  border: 1px solid #dbdbdb;
  background: #fff;
  border-radius: 2px;
  padding: 4px 13px 4px 8px;
}

.week ul li a p:first-child {
  background: #f4f4f4;
  padding: 0px 6px;
  border-radius: 4px;
  margin-right: 3px;
  font-size: 14px;
}

.week ul li a.weekon,
.week .all a.weekon,
.week .all a:hover,
.week ul li a:hover {
  background: #2f76ff;
  color: #fff;
  border: 1px solid #2f76ff;
}
.week ul li a.weekon p:first-child,
.week ul li a:hover p:first-child {
  background: #6a9af7;
}

/* 커스텀 select를 감싸는 div */
.custom-select {
  position: relative;
  width: 20%;
}

/* select 요소 기본 스타일 */
select {
  width: 100%;
  padding: 4px 0 4px 12px; /* 오른쪽에 화살표 공간 확보 */
  font-size: 16px;
  border: 1px solid #dbdbdb;
  appearance: none; /* 기본 드롭다운 화살표 숨기기 */
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
}

/* 화살표 이미지 넣기 */
.custom-select::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 8px;
  width: 24px;
  height: 24px;
  background-image: url('assets/images/select-down.svg'); /* 화살표 이미지 경로 */
  background-size: contain;
  background-repeat: no-repeat;
  transform: translateY(-50%);
  pointer-events: none; /* 화살표 클릭 방지 */
}

/*체크박스*/
.check-item-checkall {
  display: flex;
  align-items: center;
  gap: 4px;
}

.check-item-checkall .check-item-label,
.chk_box_label {
  cursor: pointer;
}

.checkbox {
  height: 1.625rem;
  border: none;
  position: relative;
  top: 1px;
}

input[type='radio'] {
  display: none;
}

input[type='radio'] + label,
input[type='radio'] + label:after,
input:checked + label:after {
  width: 1.45rem;
  height: 1.45rem;
}

input[type='radio'] + label {
  position: relative;
  display: inline-block;
  border: 1px solid #d9d9d9;
}

/*체크 안했을시*/
input[type='radio'] + label:after {
  /* background-image: url("assets/images/checkbox.svg"); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: 14px;
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #e0e0e0;
  text-align: center;
  /* font-size: 25px */
}

/*체크 후*/
input:checked + label {
  /* border: 1px solid #0890fe */
}

input:checked + label:after {
  background-image: url('assets/images/checkbox.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 14px;
  /* background-color: #0890fe; */
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #e0e0e0;
  text-align: center;
  /* font-size: 25px */
}

input:disabled + label,
input:disabled + label:after {
  border-color: #cacaca;
  background-color: #cacaca;
  cursor: not-allowed;
}

input:disabled + label:after {
  background-image: none;
  color: #f5f5f5;
  cursor: not-allowed;
}

label.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 창 크기에 따라 전체 페이지 축소 */
@media (max-width: 1730px) {
  .usage-status th {
    width: 50px;
    min-width: 50px;
    max-width: 50px;
  }
}

@media (max-width: 1400px) {
  .month ul {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    row-gap: 7px;
  }

  .week ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 7px 6px;
  }
}
</style>
