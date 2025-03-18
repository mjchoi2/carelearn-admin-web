<template>
  <div
    class="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-70"
  >
    <div
      class="bg-white w-11/12 max-w-lg popup px-6 pt-5 pb-8 shadow-lg max-h-[90vh] overflow-y-auto"
    >
      <div
        class="flex justify-between items-center border-b border-[#EBEEF2] pb-2"
      >
        <h1>어르신 등록</h1>
        <button class="btn">양식 다운로드</button>
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
      <div class="relative">
        <div
          v-show="isUpload"
          style="
            position: absolute;
            width: 100%;
            height: 120%;
            background: black;
            opacity: 0.6;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <span class="loading loading-spinner maincolor"></span>
        </div>
        <p class="text-sm text-stone-800 pb-4 pt-6">
          엑셀파일 양식을 다운로드 받아 어르신 정보를 한번에 등록할 수 있어요.
        </p>
        <div class="input-layout my-3">
          <label class="mr-4">담당 생활지원사</label>
          <select
            class="select select-bordered w-full max-w-40"
            v-model="selPartner"
          >
            <option disabled value="">선택</option>
            <option v-for="item in partners" v-bind:key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="input-layout">
          <input
            @change="readFile()"
            type="file"
            class="file-input file-input-bordered w-full max-w-xs"
          />
        </div>
        <button class="btn" @click="uploadFile()">어르신 정보 업로드</button>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx';
import { mapState } from 'vuex';
export default {
  name: 'seniorGroupAddModal',
  data: function () {
    return {
      selPartner: '',
      isUpload: false,
      excelJson: '',
      file: '',
    };
  },
  computed: {
    ...mapState(['partners', 'selectedPartner']),
  },
  methods: {
    readFile() {
      //init excel file
      console.log('readFile');

      this.file = event.target.files[0];
      let reader = new FileReader();
      let tmpResult = {};

      reader.onload = (e) => {
        console.log(e);
        let data = reader.result;
        let workbook = XLSX.read(data, { type: 'binary' });

        workbook.Sheets['어르신정보등록'].A1.w = 'Patient';
        workbook.Sheets['어르신정보등록'].B1.w = 'Gender';
        workbook.Sheets['어르신정보등록'].C1.w = 'Birth';
        workbook.Sheets['어르신정보등록'].D1.w = 'Admission_Date';
        workbook.Sheets['어르신정보등록'].E1.w = 'PhoneNumber';
        workbook.Sheets['어르신정보등록'].F1.w = 'PostCode';
        workbook.Sheets['어르신정보등록'].G1.w = 'Address';
        workbook.Sheets['어르신정보등록'].H1.w = 'Address_detail';
        workbook.Sheets['어르신정보등록'].I1.w = 'Approval_Number1';
        workbook.Sheets['어르신정보등록'].J1.w = 'Approval_Number2';
        workbook.Sheets['어르신정보등록'].K1.w = 'Approval_Grade';
        workbook.Sheets['어르신정보등록'].L1.w = 'Approval_StartDate';
        workbook.Sheets['어르신정보등록'].M1.w = 'Approval_EndDate';
        workbook.Sheets['어르신정보등록'].N1.w = 'Patient_detail';

        const roa = XLSX.utils.sheet_to_json(workbook.Sheets['어르신정보등록']);
        tmpResult = roa;

        this.excelJsonData = tmpResult;
      };
      reader.readAsBinaryString(this.file);
    },
    uploadFile() {
      console.log('upload');
      console.log(this.file);
      this.isUpload = true;
      // excel json data
    },
  },
};
</script>

<style scoped>
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
