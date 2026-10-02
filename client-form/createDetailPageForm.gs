/**
 * 주얼리 상세페이지 제작 전 클라이언트 사전 질문지 — 구글 폼 자동 생성 스크립트
 *
 * 사용 방법
 * 1. https://script.google.com 접속 → [새 프로젝트]
 * 2. 기본 코드를 모두 지우고 이 파일 내용을 붙여넣기 → 저장
 * 3. 상단 함수 선택에서 createDetailPageForm 선택 → [실행]
 * 4. 처음 실행 시 구글 계정 권한 승인
 * 5. [실행 로그]에 출력되는 "응답용 링크"를 클라이언트에게 전달
 *
 * 폼은 실행한 계정의 구글 드라이브에 저장됩니다.
 */

// 제품 정보 섹션 개수 (제품이 더 많으면 숫자만 늘리면 됩니다)
var MAX_PRODUCTS = 3;

function createDetailPageForm() {
  var form = FormApp.create('상세페이지 제작 사전 질문지');

  form
    .setDescription(
      '상세페이지 제작 전에 필요한 자료와 정보를 받기 위한 질문지입니다.\n\n' +
      '[필수] 항목은 작업에 꼭 필요하고, [선택] 항목은 있으면 결과물 완성도가 올라가는 자료예요.\n' +
      '준비가 어렵거나 관련없는 항목은 "없음"이라고 적어주시면 됩니다.\n\n' +
      '※ 로고·사진 등 파일은 구글 드라이브, 네이버 MYBOX, 위트랜스퍼 등에 올리신 뒤 ' +
      '"링크가 있는 모든 사용자 보기 가능"으로 공유한 링크를 붙여넣어 주세요.'
    )
    .setCollectEmail(true)
    .setAllowResponseEdits(true)
    .setProgressBar(true)
    .setConfirmationMessage(
      '작성해 주셔서 감사합니다! 보내주신 내용을 확인한 뒤 연락드릴게요.\n' +
      '응답 수정이 필요하시면 확인 메일의 [응답 수정] 링크를 이용해 주세요.'
    );

  // ───────────────────────── 1. 작업 기본 정보
  form.addSectionHeaderItem().setTitle('1. 작업 기본 정보');

  form.addTextItem().setTitle('[필수] 브랜드명').setRequired(true);

  form.addTextItem()
    .setTitle('[필수] 담당자 성함 / 연락처')
    .setHelpText('예: 홍길동 / 010-1234-5678')
    .setRequired(true);

  var shop = form.addCheckboxItem();
  shop
    .setTitle('[필수] 상세페이지가 올라갈 메인 판매처')
    .setHelpText('판매처마다 가로 폭과 규정이 달라요. 여러 곳이면 모두 선택해 주세요.')
    .setChoices([
      shop.createChoice('네이버 스마트스토어'),
      shop.createChoice('자사몰 (카페24)'),
      shop.createChoice('자사몰 (아임웹)'),
      shop.createChoice('29CM'),
      shop.createChoice('W컨셉'),
      shop.createChoice('쿠팡')
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[필수] 작업할 제품 수와 제품명')
    .setHelpText('예: 3개 — 루나 링, 루나 목걸이, 루나 귀걸이')
    .setRequired(true);

  form.addDateItem().setTitle('[필수] 오픈 희망일').setRequired(true);

  // ───────────────────────── 2. 레퍼런스
  form.addPageBreakItem()
    .setTitle('2. 레퍼런스')
    .setHelpText('원하시는 방향을 정확히 맞추기 위한 참고 자료예요.');

  form.addParagraphTextItem()
    .setTitle('[필수] 마음에 드는 상세페이지 2~3개 (링크나 캡처)')
    .setHelpText(
      '각각 어떤 점이 좋은지 한 줄씩 적어 주세요. 캡처는 드라이브 등에 올린 공유 링크로 보내주세요.\n' +
      '예)\n' +
      '1. https://... — 여백 많고 고급스러운 톤\n' +
      '2. https://... — 착용샷 위주 구성'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[선택] 피하고 싶은 스타일 1~2개')
    .setHelpText('예: 너무 화려함, 할인 강조형');

  form.addParagraphTextItem()
    .setTitle('[선택] 경쟁 브랜드나 벤치마킹 브랜드');

  // ───────────────────────── 3. 브랜드 정보
  form.addPageBreakItem().setTitle('3. 브랜드 정보');

  form.addTextItem()
    .setTitle('[필수] 로고 원본 파일 링크')
    .setHelpText('AI, SVG 파일 / 없는 경우 배경이 투명한 PNG 파일')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[필수] 브랜드 소개')
    .setHelpText('몇 줄이어도 괜찮아요. 예: 브랜드명의 의미, 시작한 계기, 추구하는 가치')
    .setRequired(true);

  form.addTextItem()
    .setTitle('[선택] 브랜드 컬러')
    .setHelpText('컬러코드가 있으면 함께 적어주세요. 예: 아이보리 #F5F0E6, 골드 #C9A86A');

  form.addParagraphTextItem()
    .setTitle('[선택] 주 고객층')
    .setHelpText('연령대, 라이프스타일, 구매 목적. 예: 20대 후반 직장인, 데일리용 / 선물용 / 커플템');

  form.addTextItem()
    .setTitle('[선택] 원하는 브랜드 분위기 키워드 3개')
    .setHelpText('예: 미니멀, 빈티지, 페미닌, 모던');

  form.addParagraphTextItem().setTitle('[선택] 사용 중인 지정 폰트나 슬로건');

  form.addParagraphTextItem()
    .setTitle('[선택] 브랜드 가이드북, 기존 인스타그램, 기존 홈페이지 링크');

  // ───────────────────────── 4. 제품 정보 (제품별)
  var productPages = [];
  var moreProductQuestions = [];

  for (var i = 1; i <= MAX_PRODUCTS; i++) {
    var page = form.addPageBreakItem()
      .setTitle('4. 제품 정보 — 제품 ' + i)
      .setHelpText(i === 1
        ? '제품별로 작성해 주세요. 제품이 여러 개면 이 섹션 마지막에서 다음 제품을 이어서 입력할 수 있어요.'
        : '제품 ' + i + '의 정보를 입력해 주세요.');
    productPages.push(page);
    addProductQuestions(form);

    if (i < MAX_PRODUCTS) {
      moreProductQuestions.push(
        form.addMultipleChoiceItem()
          .setTitle('추가로 입력할 제품이 있나요?')
          .setRequired(true)
      );
    }
  }

  // ───────────────────────── 5. 이미지 소스
  var imagePage = form.addPageBreakItem()
    .setTitle('5. 이미지 소스')
    .setHelpText(
      '사진은 압축되지 않은 원본으로 보내주세요. ' +
      '드라이브 폴더 하나에 모아 링크 하나로 보내주셔도 괜찮아요. ' +
      '이 경우 아래 항목마다 같은 링크를 적고, 폴더 안에서 구분되도록 파일명이나 하위 폴더를 나눠주세요.'
    );

  form.addTextItem()
    .setTitle('[필수] 제품 단독 컷')
    .setHelpText('정면, 측면, 디테일(각인, 잠금장치, 원석) 컷')
    .setRequired(true);

  form.addTextItem()
    .setTitle('[필수] 착용 컷')
    .setHelpText('손, 귀, 목 등 실제 착용 사이즈감이 보이는 컷')
    .setRequired(true);

  form.addTextItem()
    .setTitle('[필수] 사진 원본 파일')
    .setHelpText('보정 전/후 원본 (JPG 고해상도, RAW 등)')
    .setRequired(true);

  form.addTextItem().setTitle('[선택] 이미지 연출컷');

  form.addTextItem()
    .setTitle('[선택] 패키지 컷')
    .setHelpText('케이스, 쇼핑백, 보증서, 선물 포장');

  // ───────────────────────── 6. 구매 안내 정보
  form.addPageBreakItem().setTitle('6. 구매 안내 정보');

  form.addParagraphTextItem()
    .setTitle('[필수] 배송')
    .setHelpText(
      '택배사, 배송비, 무료배송 조건, 출고 소요일 (주문제작은 제작 기간 포함)\n' +
      '예: CJ대한통운 / 3,000원 / 5만원 이상 무료 / 기본 1~3일, 각인 제품 7~10일'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[필수] 교환·반품 규정')
    .setHelpText('특히 각인이나 사이즈 주문제작 제품의 반품 불가 여부를 적어주세요.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[필수] A/S 정책')
    .setHelpText('무상 수리 기간, 유상 수리 범위, 사이즈 조절 가능 여부')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[필수] 관리 방법')
    .setHelpText('보관법, 세척법, 피해야 할 것 (향수, 물, 온천 등)')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[선택] 사이즈 측정 방법 안내')
    .setHelpText('예: 반지 호수 재는 법');

  form.addParagraphTextItem().setTitle('[선택] 선물 포장이나 메시지 카드 제공 여부');

  // ───────────────────────── 7. 기타
  form.addPageBreakItem().setTitle('7. 기타');

  form.addParagraphTextItem()
    .setTitle('[선택] 고객이 자주 묻는 질문')
    .setHelpText('예: 물에 닿아도 되나요? 알러지 있어도 괜찮나요?');

  form.addParagraphTextItem().setTitle('[선택] 그 밖에 전달하고 싶은 내용');

  // ───────────────────────── 제품 추가 여부 분기 연결
  for (var j = 0; j < moreProductQuestions.length; j++) {
    var q = moreProductQuestions[j];
    q.setChoices([
      q.createChoice('네, 다음 제품도 입력할게요', productPages[j + 1]),
      q.createChoice('아니요, 이미지 소스로 넘어갈게요', imagePage)
    ]);
  }

  // 응답 정리용 스프레드시트 연결
  var sheet = SpreadsheetApp.create('상세페이지 제작 사전 질문지 (응답)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('응답용 링크 (클라이언트에게 전달): ' + form.getPublishedUrl());
  Logger.log('편집용 링크: ' + form.getEditUrl());
  Logger.log('응답 스프레드시트: ' + sheet.getUrl());
}

function addProductQuestions(form) {
  form.addParagraphTextItem()
    .setTitle('[필수] 제품명, 컬렉션명, 판매가')
    .setHelpText('예: 루나 링 / 문라이트 컬렉션 / 39,000원')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[필수] 소재')
    .setHelpText(
      '· 금속: 14K / 18K / 925 실버 / 써지컬 스틸 / 황동 등\n' +
      '· 도금: 종류와 두께 (예: 14K 골드 도금 2미크론)\n' +
      '· 원석·큐빅: 종류, 크기, 캐럿 (천연·랩그로운 구분 포함)'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[필수] 옵션 구성')
    .setHelpText('컬러, 사이즈, 각인 등')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[필수] 제품의 강점 3가지')
    .setHelpText('예: 니켈프리, 수작업 제작, 변색 방지 코팅, 레이어드하기 좋음')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[필수] 사이즈와 중량')
    .setHelpText(
      '· 반지: 제작 가능한 호수 범위, 밴드 두께\n' +
      '· 목걸이·팔찌: 체인 길이, 연장 체인 유무\n' +
      '· 귀걸이: 펜던트 크기, 침 소재와 길이, 잠금 방식'
    )
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('[선택] 디자인 의도나 제품 스토리')
    .setHelpText('모티브, 제품명의 의미');

  form.addParagraphTextItem()
    .setTitle('[선택] 보증서나 인증서 유무')
    .setHelpText('금 함량 각인, 감정서 등');
}
