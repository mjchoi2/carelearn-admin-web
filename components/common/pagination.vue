<!-- eslint-disable vue/no-parsing-error -->
<template>
  <!-- <div class="join">
    <button class="join-item btn"><<</button>
    <button class="join-item btn"><</button>
    <button class="join-item btn">1</button>
    <button class="join-item btn btn-active">2</button>
    <button class="join-item btn">3</button>
    <button class="join-item btn">4</button>
    <button class="join-item btn">></button>
    <button class="join-item btn">>></button>
  </div> -->
  <div class="join flex justify-center my-4">
    <button
      class="join-item px-3 py-1 cursor-pointer"
      type="button"
      @click="onChangePage(0)"
    >
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.9999 12L12.3999 10.6L7.7999 6L12.3999 1.4L10.9999 0L4.9999 6L10.9999 12ZM1.9999 12V0H-9.72748e-05V12H1.9999Z"
          fill="black"
        />
      </svg>
    </button>
    <a
      v-for="num in newArray.length"
      :key="num"
      v-show="showpagination(num)"
      @click="onChangePage(num - 1)"
      class="join-item px-3 py-1 cursor-pointer"
      :class="{ maincolor: currentPage == num - 1 }"
    >
      {{ num }}
    </a>
    <button
      class="join-item px-3 py-1 cursor-pointer"
      type="button"
      @click="onChangePage(currentPage + 1)"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.175 6L0.275 2.1C0.0916668 1.91667 0 1.68333 0 1.4C0 1.11667 0.0916668 0.883333 0.275 0.7C0.458333 0.516666 0.691667 0.425 0.975 0.425C1.25833 0.425 1.49167 0.516666 1.675 0.7L6.275 5.3C6.375 5.4 6.446 5.50833 6.488 5.625C6.53 5.74167 6.55067 5.86667 6.55 6C6.54933 6.13333 6.52867 6.25833 6.488 6.375C6.44733 6.49167 6.37633 6.6 6.275 6.7L1.675 11.3C1.49167 11.4833 1.25833 11.575 0.975 11.575C0.691667 11.575 0.458333 11.4833 0.275 11.3C0.0916668 11.1167 0 10.8833 0 10.6C0 10.3167 0.0916668 10.0833 0.275 9.9L4.175 6ZM10.975 0C11.2583 0 11.496 0.0960001 11.688 0.288C11.88 0.48 11.9757 0.717333 11.975 1V11C11.975 11.2833 11.879 11.521 11.687 11.713C11.495 11.905 11.2577 12.0007 10.975 12C10.6923 11.9993 10.455 11.9033 10.263 11.712C10.071 11.5207 9.975 11.2833 9.975 11V1C9.975 0.716667 10.071 0.479333 10.263 0.288C10.455 0.0966668 10.6923 0.000666667 10.975 0Z"
          fill="black"
        />
      </svg>
    </button>
  </div>
</template>
<script>
export default {
  name: 'CommonPagination',
  props: {
    propsArr: {
      type: Array,
      default: () => {
        return [];
      },
    },
    propsLimitData: {
      type: Number,
    },
  },
  computed: {
    propsArrCnt() {
      return this.$props.propsArr.length;
    },
  },
  data() {
    return {
      setArr: this.$props.propsArr, //전체 배열 데이터
      setLimitData: this.$props.propsLimitData, //한 페이지당 보여줄 데이터 수
      newArray: [], //페이징처리에 맞게 자른 배열
      currentPage: 1, //현재 페이지
      upperPageLimit: 5, //한 화면에 보여줄 페이지 버튼의 수
      lowerPageLimit: 1,
      pageLimit: 5, // upperPageLimit 과 동일한 숫자로 맞추기
    };
  },
  watch: {
    propsArr() {
      this.setArr = this.$props.propsArr;
      this.spliceArr(this.setArr, this.setLimitData);
    },
    setLimitData() {
      this.spliceArr(this.setArr, this.setLimitData);
      this.$emit('setLimitData', this.setLimitData);
    },
  },
  mounted() {
    console.log('dd');
    this.spliceArr(this.setArr, this.setLimitData);
  },
  methods: {
    /** setArr 배열을 setLimitData 기준으로 쪼개서 length가 n인 newArray 배열을 만드는 메소드  */
    spliceArr(data, size) {
      this.newArray = [];
      let items = [];
      let page = 0;

      items = [...data];
      while (items.length) {
        this.newArray.push(items.splice(0, size));
      }

      if (this.$props.keepAlive) page = this.$props.page - 1;
      this.onChangePage(page);
    },
    onChangePage(idx) {
      console.log(idx);
      if (idx < 0) {
        idx = 0;
      } else if (idx > this.newArray.length - 1) {
        idx = this.newArray.length - 1;
      }
      this.currentPage = idx;

      if (this.currentPage >= this.upperPageLimit) {
        this.next();
      } else if (this.currentPage < this.lowerPageLimit - 1) {
        this.prev();
      }
      // if (this.$props.keepAlive)
      //   this.$router.push({ path: '', query: { page: idx + 1 } });
      this.setShowData(this.newArray[idx], idx + 1);
    },
    /** 부모컴포넌트로 데이터를 전달하는 메소드 */
    setShowData(showData, page) {
      this.$emit('update:showData', showData);
      this.$emit('update:page', page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    showpagination(value) {
      if (value <= this.upperPageLimit && value >= this.lowerPageLimit) {
        return true;
      } else {
        return false;
      }
    },
    next() {
      if (this.upperPageLimit < this.newArray.length) {
        this.lowerPageLimit += this.pageLimit;
        this.upperPageLimit += this.pageLimit;
      }
    },
    prev() {
      if (this.lowerPageLimit >= this.pageLimit) {
        this.lowerPageLimit -= this.pageLimit;
        this.upperPageLimit -= this.pageLimit;
      }
    },
  },
};
</script>
