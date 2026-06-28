// ============================================================
//  메디고라운드 — 사이트 설정
//  이 파일의 값만 바꾸면 사이트 전체 내용이 바뀝니다.
// ============================================================

export const SITE = {
  // ─── 연락처 ───────────────────────────────────────
  email: "medigoroundstrategy@gmail.com",
  kakaoOpenChat: "https://open.kakao.com/me/medigo_marketing",
  instagram: "@medigo_round",

  // ─── Google Apps Script (구글 시트 저장) ──────────
  formEndpoint: "https://script.google.com/macros/s/AKfycbwBzerMNvNlIoHusdIW0aIEVe9tpbshdKvQOitHW5oxxVSO5mlEuw2HgQoDy8gLd3Ku/exec",

  // ─── 회사 정보 (푸터) ─────────────────────────────
  companyName: "메디고라운드",
  ceo: "김병권, 송세용",
  bizNumber: "487-87-03559",
  address: "경기 남양주시 다산지금로 202 현대테라타워 AF07동 0049호",
};

// ─── 신뢰 지표 (랜딩 카운터) ──────────────────────────
export const STATS = [
  { value: 50, suffix: "+", label: "2년, 블로그 마케팅·홈페이지 의뢰 건수 — 이유 있는 선택" },
];

// ─── 네이버 마케팅 요금제 ─────────────────────────────
export const NAVER_PLANS = [
  {
    badge: "효율집중형",
    name: "메디고 Essential",
    tag: "핵심 채널 중심의 합리적 시작",
    originalPrice: "1,800,000원",
    price: "1,600,000",
    unit: "원 / 월",
    items: [
      "네이버 플레이스 운영 관리 (상시 운영·이벤트 배너·이미지·키워드)",
      "브랜드 블로그 월 4회",
      "네이버 기자단 후기글 월 4회",
      "영수증 리뷰 월 2회",
    ],
    excludedItem: null,
    monthlyReviews: 10,
    yearlyReviews: 120,
    highlight: false,
  },
  {
    badge: "안정성장형",
    name: "메디고 Growth",
    tag: "핵심 채널 중심의 집중적 투자",
    originalPrice: "2,300,000원",
    price: "2,000,000",
    unit: "원 / 월",
    items: [
      "네이버 플레이스 운영 관리 (상시 운영·이벤트 배너·이미지·키워드)",
      "브랜드 블로그 월 6회",
      "네이버 기자단 후기글 월 6회",
      "영수증 리뷰 월 5회",
    ],
    excludedItem: null,
    monthlyReviews: 17,
    yearlyReviews: 204,
    highlight: true,
  },
];

// ─── 홈페이지 제작 요금제 ─────────────────────────────
export const WEB_PLANS = [
  {
    name: "원페이지",
    tag: "단일 랜딩페이지",
    originalPrice: "450만원",
    price: "380",
    unit: "만원",
    desc: "병원 소개·진료 안내·예약 연동을\n한 페이지로 압축합니다.\n\n빠르게 온라인 존재감을 만들어야 할 때,\n가장 효율적인 선택입니다.",
    highlight: false,
  },
  {
    name: "브랜드형 홈페이지",
    tag: "다카테고리 홈페이지",
    originalPrice: "800만원",
    price: "700",
    unit: "만원",
    desc: "질환별·치료별 페이지를 갖춘\n풀구성 홈페이지.\n\n기획·콘텐츠 집필·디자인·\n반응형 구축·의료광고법 검수 전부 포함.",
    highlight: true,
  },
];

// ─── 고객 후기 ───────────────────────────────────────
export const REVIEWS = [
  {
    text: "블로그 작업뿐 아니라 악성 리뷰 관리까지 확실히 해주셔서 좋습니다. 이전에 맡겼던 업체보다 전문성이 확실히 달라요.",
    author: "원장님",
    clinic: "다산 ○○ 정형외과",
  },
  {
    text: "비만 클리닉 위주로 글을 올려달라는 피드백도 바로바로 수용해 주시고, 하나부터 열까지 다 맡아주시니 정말 편합니다.",
    author: "원장님",
    clinic: "지축 ○○○ 의원",
  },
  {
    text: "캡슐 한약 홍보가 필요했는데, 블로그 작업 이후 실제로 멀리서도 환자분들이 캡슐 한약을 알고 찾아오십니다.",
    author: "원장님",
    clinic: "마곡 ○○ 한의원",
  },
];
