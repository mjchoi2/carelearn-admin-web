<template>
  <div class="downloadh2 !absolute right-0">
    <button class="flexstart" @click="downLoadXlsx()">
      <span>학습현황 다운로드</span>
      <span>
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
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </span>
    </button>
  </div>
</template>
<script>
import XLSX from 'xlsx';
export default {
  name: 'CommonXlsxdown',
  props: {
    list: {
      Array,
      Object,
    },
  },
  methods: {
    downLoadXlsx() {
      console.log('excel download');

      // 테이블 그대로 보여줄지 아니면 데이터 따로 조회해서 보여줄지?

      var workBook = XLSX.utils.book_new(); // 새로운 workbook 생성

      const seniorName = document
        .getElementById('senior-name')
        .innerHTML.split('&')[0]
        .replaceAll(/[^가-힣^]/g, ''); // 어르신 이름
      console.log(seniorName);

      // 스마트워크북
      const workbookTable =
        document.getElementsByClassName('smart-workbook')[0];

      var stdData = XLSX.utils.table_to_sheet(workbookTable, {
        origin: 'B3',
        raw: true,
      });

      stdData['B1'] = {
        v: `${seniorName.replaceAll(/[^가-힣^]/g)} 어르신`,
        s: { font: { name: 'Arial', sz: 16, bold: true } },
      };
      stdData['B2'] = {
        v: `스마트 워크북 사용 현황`,
        s: { font: { bold: true } },
      };

      XLSX.utils.book_append_sheet(workBook, stdData, `스마트 워크북`); // stdData 워크시트로 시트 생성, 해당 시트 이름 명명

      // 인지게임
      const gameTable = document.getElementsByClassName('recognition-game')[0];

      var gameData = XLSX.utils.table_to_sheet(gameTable, {
        origin: 'B3',
        raw: true,
      });

      gameData['B1'] = {
        v: `${seniorName.replaceAll(/[^가-힣^]/g)} 어르신`,
        s: { font: { name: 'Arial', sz: 16, bold: true } },
      };
      gameData['B2'] = {
        v: `인지 게임 사용 현황`,
        s: { font: { bold: true } },
      };

      XLSX.utils.book_append_sheet(workBook, gameData, `인지게임`); // stdData 워크시트로 시트 생성, 해당 시트 이름 명명

      console.log(workBook);
      XLSX.writeFile(workBook, '학습현황.xlsx'); // '직원정보.xlsx'라는 이름을 가진 파일 생성;
    },
  },
};
</script>
