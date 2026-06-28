import { useState, useEffect, useRef } from "react";
import { SITE, STATS, REVIEWS, NAVER_PLANS, WEB_PLANS } from "./config";
import logo from "./assets/logo_bg_rm.png";
import marketerImg from "./assets/marketer.png";
import marketer2Img from "./assets/marketer2.png";
import otherCompanyImg from "./assets/other_company.jpg";
import questionLogo from "./assets/question_logo.png";
import searchBgImg from "./assets/medigo_bg/search_bg.png";
import sturdyBgImg from "./assets/medigo_bg/sturdy_bg.png";
import calendarBgImg from "./assets/medigo_bg/calendar_bg.png";
import review1Img from "./assets/medigo_customer_review/communication1.jpeg";
import review2Img from "./assets/medigo_customer_review/communication2.jpeg";
import review3Img from "./assets/medigo_customer_review/communication3.jpeg";
import "./App.css";
import "./tailwind.css";

// ─── 스크롤 진입 애니메이션 ──────────────────────────
function Reveal({ children, direction = "up", delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal reveal--${direction}${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [view]);
  return (
    <div className="site">
      <Header view={view} setView={setView} />
      <main>
        {view === "home" && <Landing setView={setView} />}
        {view === "naver" && <NaverPage />}
        {view === "web" && <WebPage />}
      </main>
      <ContactSection />
      <Footer setView={setView} />
      <FloatingKakao />
      <FloatingMobileNav view={view} setView={setView} />
    </div>
  );
}

// ─── 헤더 ─────────────────────────────────────────────
function Header({ view, setView }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const nav = [
    { id: "home", label: "홈" },
    { id: "naver", label: "네이버 마케팅" },
    { id: "web", label: "홈페이지 제작" },
  ];
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="container header__inner">
        <button className="logo" onClick={() => setView("home")}>
          <img src={logo} alt="메디고라운드 로고" className="logo__img" />
          <span>메디고라운드<span className="logo__sub">마케팅 팀</span></span>
        </button>
        <nav className={`nav${open ? " nav--open" : ""}`}>
          {nav.map((n) => (
            <button
              key={n.id}
              className={`nav__link${view === n.id ? " is-active" : ""}`}
              onClick={() => { setView(n.id); setOpen(false); }}
            >
              {n.label}
            </button>
          ))}
          <a className="nav__cta" href="#contact" onClick={() => setOpen(false)}>문의하기</a>
        </nav>
        <button className="hamburger" aria-label="메뉴 열기" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

// ─── 카운트업 ─────────────────────────────────────────
function CountUp({ end, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const dur = 1400, t0 = performance.now();
          const tick = (t) => {
            const p = Math.min((t - t0) / dur, 1);
            setN(Math.round(end * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

// ─── 랜딩 ────────────────────────────────────────────
function Landing({ setView }) {
  const problemFindings = [
    [
      "01",
      <>진짜 의료계 출신이 하는 마케팅이<br className="br-mo" />없었습니다.</>,
      <>대부분이 그냥 대행사였습니다. 실제로 연락해보면<br className="br-mo" />병원·법률·부동산 마케팅을 함께<br className="br-mo" />진행하고 있었습니다.</>,
    ],
    ["02", "의학을 모르니, 글도 형편없었습니다.", "진짜 '마케팅'이라 부를 만한 콘텐츠가 거의 없었습니다."],
    ["03", "형편없는 글조차 하청을 맡기고 있었습니다.", "대부분 일반인 블로거에게 의학 원고를 떠넘깁니다.\n키워드만 전달받아 원고를 씁니다."],
  ];
  return (
    <>
      <section className="hero">
        <div className="hero__orb hero__orb--1" aria-hidden="true" />
        <div className="hero__orb hero__orb--2" aria-hidden="true" />
        <div className="hero__orb hero__orb--3" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow hero__eyebrow">의료·병원 전문 마케팅</p>
            <h1 className="hero__title">
              의학을 아는 사람들이<br />직접 만드는<br /><span className="accent">병원 마케팅</span>
            </h1>
            <p className="hero__sub">
              원장님은 진료에만 집중하세요.<br />
              의사와 의대생이 직접 만드는 병의원 전문 마케팅<br/>개원 컨설팅부터 GEO, SEO까지
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#contact">무료 상담 신청</a>
              <button className="btn btn--ghost" onClick={() => setView("naver")}>서비스 둘러보기</button>
            </div>
          </div>
          <div className="hero__visual">
            <MarketerDuo />
          </div>
        </div>
      </section>

      {/* ② 문제 제시 */}
      <section className="why problem-intro">
        <div className="container">
          <Reveal direction="up">
            <div className="problem-intro__panel">
              <p className="eyebrow problem-intro__eyebrow">병원 마케팅의 현실</p>
              <h2 className="section__title problem-intro__title">
                "의사들의 돈은 눈먼 돈"<br className="br-mo" />이라는 말,<br />
                <span>들어보셨나요?</span>
              </h2>
              <p className="problem-intro__desc">
                의학을 모르는 사람들이<br className="br-mo" />원장님께 말도 안 되는 비용을 청구하고,<br className="br-mo" />정작 품질은 형편없습니다.<br /><br className="br-mo" />직접 업체들에게 연락해봤습니다.<br className="br-mo" />결과는 충격적이었습니다.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="why why--problem-detail">
        <div className="container">
          <div className="problem__evidence">
            <Reveal direction="left">
              <img src={otherCompanyImg} alt="전문성 없는 일반 마케팅 대행사 사례" />
            </Reveal>
            <Reveal direction="right" delay={80}>
              <div className="problem__evidence-text">
                <p className="problem__quote">"이 글, 누가 쓰나요?"</p>
                <p className="problem__evidence-label">실제 크몽 '병원 마케팅' 검색 결과</p>
                <div className="problem__findings">
                  {problemFindings.map(([no, title, desc]) => (
                    <div key={no} className="problem__finding">
                      <span className="problem__no">{no}</span>
                      <div>
                        <strong>{title}</strong>
                        <p>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ③ 솔루션 */}
      <section className="services approach">
        <div className="container">
          <Reveal direction="up">
            <h2 className="section__title center approach__title">
              <span className="approach__crayon">그래서</span><br />
              <span className="approach__crayon approach__title-accent">의학을 아는 사람이 직접 합니다</span>
            </h2>
            <p className="approach__story">
              메디고라운드는 <strong>정형외과 전문의 선생님</strong>이 주변 지인들의 개원을 도우며 시작됐습니다.
              <br />개원 입지 분석부터 의약품 납품, 이제는 마케팅까지
              <br /><strong>실제 개원과 브랜딩의 전 과정을 직접 경험한 사람들</strong>이 모였습니다.
            </p>
            <div className="approach__note">
              <p>
                병원을 직접 이해하고, 환자가 실제로 궁금해하는 언어로 정리합니다.
                <strong> 병원 방문과 사진 촬영</strong>, <strong>의학 기반 콘텐츠 기획</strong>,
                <strong> GEO에 맞는 웹사이트 제작</strong>, <strong>환자 눈높이에 맞춘 진료 안내</strong>까지
                필요한 일만 정직하게 설계합니다.
              </p>
              <p>
                네이버 브랜딩에만 머무르지 않습니다. 검색과 AI 답변 환경에서 병원의 전문성이 제대로 읽히도록,
                진짜 의학적인 내용과 환자가 이해할 수 있는 구조를 함께 만듭니다.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="stats">
        <div className="container stats__grid">
          <Reveal direction="up">
            <div className="stat">
              <p className="stat__eyebrow">이유있는 선택</p>
              <p className="stat__label">블로그 마케팅, 홈페이지 의뢰 건수</p>
              <div className="stat__num"><CountUp end={50} suffix="건+" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">SERVICES</p>
            <h2 className="section__title center">지금 병원에 가장 필요한 서비스는 무엇인가요?</h2>
          </Reveal>
          <div className="services__grid">
            <Reveal direction="left" delay={100}>
              <ServiceCard
                tag="Naver Marketing"
                title="병의원 전문 네이버 마케팅"
                desc="SEO 최적화 · 네이버 지도 세팅 · 브랜드 블로그 · 기자단·영수증 리뷰 — 의학을 아는 사람이 직접 씁니다."
                points={["네이버 플레이스 최적화", "브랜드 블로그·기자단 운영", "의료광고법 검수 포함"]}
                onClick={() => setView("naver")}
              />
            </Reveal>
            <Reveal direction="right" delay={100}>
              <ServiceCard
                tag="Web Design"
                title="병원 맞춤 홈페이지 제작"
                desc="기획·의료 콘텐츠·디자인·반응형 구축·의료광고법 검수까지 전 과정을 한 사람이 직접."
                points={["기획·콘텐츠 대행 포함", "모바일 반응형", "의료광고법 검수"]}
                onClick={() => setView("web")}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ④ USP */}
      <section className="why">
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">왜 메디고라운드인가</p>
            <h2 className="section__title center">누가 쓰는지가 결과를 바꾸니까</h2>
          </Reveal>
          <div className="why__grid">
            {[
              {
                title: "진짜 의사·의대생이 직접 작성·검수",
                desc: "질환·시술 설명을 의학적으로 정확하게. 글 하나하나 의사와 의대생이 직접 쓰고 검수합니다.",
                vs: "타 대행 업체 |\n키워드만 전달받은 일반인 블로거가 원고 작성",
              },
              {
                title: "담당 마케터 월 1회 직접 방문",
                desc: "진료 현장의 사진·자료를 직접 수집해 콘텐츠에 반영합니다. 온라인으로만 자료를 요청하지 않습니다.",
                vs: "타 대행 업체 |\n온라인으로만 자료 요청, 현장감 부족",
              },
              {
                title: "의료광고법 검수 · 어뷰징 없는 안전 발행",
                desc: "발행 전 모든 표현을 의료광고법 기준으로 점검합니다. 발행 패턴·간격도 관리해 저품질·블락 위험을 최소화합니다.",
                vs: "타 대행 업체 |\n위반 표현 방치, 대량 발행 어뷰징으로 복구 불가",
              },
            ].map(({ title, desc, vs }, i) => (
              <Reveal key={title} direction={["left","up","right"][i]} delay={(i+1)*80}>
                <div className="usp-card">
                  <h4 className="usp-title">{title}</h4>
                  <p className="usp-desc">{desc}</p>
                  {vs && (
                    <span className="usp-vs">
                      <strong className="usp-vs__label">{vs.split('\n')[0]}</strong>
                      {'\n'}{vs.split('\n').slice(1).join('\n')}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ 증거 */}
      <section className="reviews">
        <div className="container">
          <Reveal direction="up">
            <h2 className="section__title center">실제 원장님들과 만든 결과입니다</h2>
            <p className="pricing__sub">여전히 메디고라운드 마케팅을 선택하는 이유.<br/>단순히 양질의 컨텐츠 뿐 아니라, 저희는 직접 소통하고 직접 일합니다.</p>
          </Reveal>
          <div className="reviews__grid">
            {[
              { src: review1Img, ...REVIEWS[0] },
              { src: review2Img, ...REVIEWS[1] },
              { src: review3Img, ...REVIEWS[2] },
            ].map(({ src, text, clinic }, i) => (
              <Reveal key={i} direction="up" delay={i * 100}>
                <div className="review-card">
                  <img src={src} alt={`${clinic} 원장님 후기`} />
                  <div className="review-card__overlay">
                    <blockquote className="review-card__quote">"{text}"</blockquote>
                    <cite className="review-card__clinic">{clinic} 원장님</cite>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥ CTA */}
      <section className="final-cta">
        <img className="final-cta__mark" src={logo} alt="" aria-hidden="true" />
        <div className="container">
          <Reveal direction="up">
            <h2 className="section__title center final-cta__title">
              원장님은 진료만 보세요.<br />
              마케팅은 <span>메디고라운드</span>가 하겠습니다.
            </h2>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ tag, title, desc, points, onClick }) {
  return (
    <article className="card">
      <p className="card__tag">{tag}</p>
      <h3 className="card__title">{title}</h3>
      <p className="card__desc">{desc}</p>
      <ul className="card__points">{points.map((p) => <li key={p}>{p}</li>)}</ul>
      <button className="card__link" onClick={onClick}>자세히 보기 →</button>
    </article>
  );
}

// ─── 담당자 사진 ──────────────────────────────────────
function MarketerDuo() {
  return (
    <div className="marketer-duo">
      <img src={marketer2Img} className="marketer-duo__photo marketer-duo__photo--front" alt="예비의사 김해원" />
      <img src={marketerImg}  className="marketer-duo__photo marketer-duo__photo--back"  alt="의대생 마케터 권태희" />
      <span className="marketer-duo__caption marketer-duo__caption--left">예비의사 마케터 김해원</span>
      <span className="marketer-duo__caption marketer-duo__caption--right">의대생 마케터 권태희</span>
    </div>
  );
}

// ─── 네이버 마케팅 페이지 ────────────────────────────
function NaverPage() {
  const features = [
    ["01", "병원 직접 방문 & 현장 취재", "담당 마케터가 실제로 병원을 방문해 사진을 촬영하고, 병원의 새로운 이벤트·진료 내용을 직접 파악합니다. 실제 진료 과정을 이해한 뒤 콘텐츠를 만듭니다.", "left"],
    ["02", "네이버 브랜드 블로그 글쓰기", "의학적으로 정확하고, 잠재 환자에게 실질적으로 도움이 되는 브랜드 블로그 콘텐츠를 발행합니다.", "right"],
    ["03", "기자단 & 영수증 리뷰 발행", "실제 방문 기반의 자연스러운 후기와 실사용 영수증 리뷰를 함께 쌓아, 신뢰도 높은 평판을 만듭니다.", "left"],
    ["04", "네이버 지도(플레이스) 세팅", "초기 플레이스 세팅과 보수 작업을 진행해 검색 노출의 기반을 다집니다.", "right"],
    ["05", "의료광고법 검수", "발행 전 모든 표현을 의료광고법 기준으로 점검합니다. 법적 표현 리스크를 사전 차단해 행정처분 위험을 줄입니다.", "left"],
  ];
  const whyCards = [
    ["🩺", "모든 콘텐츠, 의대생 직접 작성·검수", "질환·시술 설명을 의학적으로 정확하게. 글 하나하나 의대생이 직접 검수합니다.", "일반 대행사 → 외주 작가의 짜깁기, 의학적 오류 빈번"],
    ["🔑", "SEO 로직 기반 키워드 설계", "검색 의도·지역·시즌을 분석해 실제로 노출되는 키워드를 선정합니다.", "일반 대행사 → 인기 키워드만 복붙, 경쟁 과열로 노출 실패"],
    ["🚗", "담당 마케터 월 1회 직접 방문", "진료 현장의 사진·자료를 직접 수집·정리해 콘텐츠에 반영합니다.", "일반 대행사 → 온라인으로만 자료 요청, 현장감 부족"],
    ["⚖️", "의료광고법 사전 검수", "발행 전 모든 표현을 의료광고법 기준으로 점검해 리스크를 차단합니다.", "일반 대행사 → 위반 표현 방치, 행정처분 위험"],
    ["🛡️", "어뷰징 회피 안전 발행 설계", "발행 패턴·간격을 관리해 저품질·블락 위험을 최소화합니다.", "일반 대행사 → 대량 발행 후 어뷰징, 복구 불가"],
  ];
  const casestudies = [
    { clinic: "마곡 OO한의원", result: "브랜드 블로그 1페이지 노출", img: review1Img },
    { clinic: "지축 OOO의원", result: "기자단 블로그 탭 1위", img: review2Img },
    { clinic: "다산 정형외과", result: "기자단 키워드 상위노출", img: review1Img },
    { clinic: "안산 피부과", result: "브랜드 블로그 키워드 1페이지 1위", img: null },
    { clinic: "분당 한의원", result: "블로그탭 키워드 1위 노출", img: null },
  ];
  return (
    <article className="subpage">

      {/* STEP B-1: 페이지 헤더 */}
      <header className="subhero subhero--naver">
        <div className="container subhero__split-inner">
          <div className="subhero__text">
            <p className="eyebrow subhero__badge subhero__badge--naver">NAVER MARKETING</p>
            <h1 className="subhero__title">병의원 전문<br />네이버 브랜딩 마케팅</h1>
            <p className="subhero__sub">'우리 병원 지역명 + 진료과목' 검색 시, 네이버 1페이지 노출을 만듭니다.<br />SEO 최적화 · 네이버 지도 세팅 · 브랜드 블로그 · 블로그 기자단 · 영수증 리뷰</p>
          </div>
        </div>
      </header>

      {/* STEP B-2: 핵심 차별점 */}
      <section className="why">
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">왜 메디고라운드인가?</p>
            <h2 className="section__title center">누가 하는가에 따라<br/><span className="brand-gradient brand-gradient--rose">우리 병원의 브랜딩은 달라지니까</span></h2>
            <p className="pricing__sub">
              메디고라운드의 모든 콘텐츠는 <strong>진짜 의사와 의대생이 직접 작성</strong>합니다.<br/>원고 작성부터 검토까지, 의학을 아는 의학도들이 전 과정을 직접 책임집니다.<br /><br />
              다른 업체에 한 번 물어보세요.<br/><span className="impact-question">"이 글, 누가 쓰나요?"</span><br/>대부분은 <strong>하청의 하청</strong>으로 굴러갑니다.<br/>키워드만 전달받은 일반인 블로거가 원고를 대신 씁니다.
            </p>
          </Reveal>
          <Reveal direction="up">
            <ComparisonBoard items={whyCards} />
          </Reveal>
        </div>
      </section>

      {/* STEP B-3 + B-4: 합쳐진 섹션 */}
      <section className="process">
        <div className="container">
          <Reveal direction="up">
            <h2 className="section__title center">이제는 <span className="kw-gradient">'어뷰징'</span>이 아니라<br/><span className="kw-gradient">'질적 평가'</span>의 시대입니다</h2>
            <p className="pricing__sub">
              네이버 알고리즘은 점점 더 콘텐츠의 '질'을 평가하는 방향으로 강화되고 있습니다.<br/>의학적 사실을 정확하게 전달하면서, 일반인이 이해하기 쉽게 풀어낸 <strong>체류시간이 긴 글</strong>이 좋은 평가를 받습니다.<br /><br />
              정확하게 알고, 쉽게 전달할 수 있는 사람<br/>그게 바로 <strong>의대생</strong>입니다.
            </p>
          </Reveal>
          <Reveal direction="up">
            <h2 className="section__title center b34-divider">우리는 <span className="kw-gradient">'필요한 것'</span>만 합니다</h2>
            <p className="pricing__sub">
              네이버 플레이스 순위를 높여준다며 어뷰징·불법 트래픽 작업을 영업하는 업체들이 있습니다.<br/>요즘은 그런 방식이 통하지 않습니다. 적발 시 복구조차 어렵습니다.<br /><br />
              메디고라운드는 <strong>문제 없는 마케팅만</strong> 합니다.<br/>의학도가 실제로 잘할 수 있는 마케팅만으로 서비스를 구성했습니다.<br/>어뷰징으로 위험을 떠안는 대신, 정직한 질적 콘텐츠로 승부합니다.<br/><br/>
              그래서 저희의 제안은 언제나 <strong>브랜드 블로그 · 기자단 리뷰 · 영수증 리뷰</strong>에 집중합니다.<br/>의학적 신뢰와 검색 노출, 두 가지를 동시에 잡을 수 있는 영역이기 때문입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STEP B-5: 서비스 구성 */}
      <section style={{
        backgroundImage: [
          'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.85) 5%, transparent 14%, transparent 86%, rgba(255,255,255,0.85) 95%, white 100%)',
          'linear-gradient(to right, white 0%, rgba(255,255,255,0.55) 18%, transparent 38%, transparent 62%, rgba(255,255,255,0.55) 82%, white 100%)',
          `url(${sturdyBgImg})`
        ].join(', '),
        backgroundPosition: 'left top, left top, center center',
        backgroundSize: '100% 100%, 100% 100%, cover',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="container feature-list">
          <Reveal direction="up">
            <h2 className="section__title center">메디고라운드가 직접 하는 것들</h2>
          </Reveal>
          {features.map(([no, title, desc, dir]) => (
            <Reveal key={no} direction={dir}>
              <FeatureRow no={no} title={title} desc={desc} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* STEP B-6: 실제 성과 */}
      <section className="why">
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">RESULTS</p>
            <h2 className="section__title center">실제 성과</h2>
            <p className="pricing__sub">숫자로 증명하는 메디고라운드의 네이버 마케팅 결과입니다.</p>
          </Reveal>
          <div className="perf-grid">
            <Reveal direction="left" delay={0}>
              <div className="perf-card perf-card--green">
                <div className="perf-num"><CountUp end={100} suffix="%" /></div>
                <h4 className="perf-label">재계약 연장율</h4>
                <p className="perf-desc">함께한 병원 원장님들 모두<br/>여전히 메디고라운드를 선택하십니다.</p>
              </div>
            </Reveal>
            <Reveal direction="up" delay={100}>
              <div className="perf-card perf-card--blue">
                <div className="perf-num"><CountUp end={90} suffix="%+" /></div>
                <h4 className="perf-label">블로그 탭 1페이지 노출율</h4>
                <p className="perf-desc">발행한 의학 콘텐츠의 90% 이상이<br/>네이버 의학 인기글/블로그 탭 1페이지에<br/>노출됐습니다.</p>
              </div>
            </Reveal>
            <Reveal direction="right" delay={200}>
              <div className="perf-card perf-card--purple">
                <div className="perf-num"><CountUp end={0} suffix="건" /></div>
                <h4 className="perf-label">어뷰징 적발 사례</h4>
                <p className="perf-desc">정직한 콘텐츠 마케팅만을 고집한 결과,<br/>단 한 건의 적발도 없었습니다.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STEP B-7: 가격 안내 — 3가지 라인업 */}
      <section className="pricing">
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">PRICING</p>
            <h2 className="section__title center">병의원 맞춤 프로그램<br/>2가지 라인업</h2>
            <p className="pricing__sub">목표와 지역 특성에 따라 제안드립니다.</p>
            <p className="pricing__adjust">월별 발행량은 원장님과의 협의를 통해 조정하실 수 있습니다.</p>
          </Reveal>
          <div className="pricing__grid">
            {NAVER_PLANS.map((plan, i) => (
              <Reveal key={plan.name} direction={i === 0 ? "left" : "right"} delay={100}>
                <div className={`plan-card${plan.highlight ? " plan-card--highlight" : ""}`}>
                  <span className="plan-badge">{plan.badge}</span>
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-tag">{plan.tag}</div>
                  {plan.originalPrice && <div className="plan-original">{plan.originalPrice}</div>}
                  <div className="plan-price">{plan.price}<small>{plan.unit}</small></div>
                  <ul className="plan-items">
                    {plan.items.map((item) => <li key={item}>{item}</li>)}
                    {plan.excludedItem && <li className="plan-item--excluded">{plan.excludedItem}</li>}
                  </ul>
                  {plan.monthlyReviews && (
                    <div className="plan-review">
                      월 리뷰수 <strong>{plan.monthlyReviews}회</strong> · 연간 <strong>{plan.yearlyReviews}회</strong>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <p className="pricing__note">VAT 별도</p>
        </div>
      </section>

      {/* STEP B-8: 서비스 상세 안내 */}
      <section className="svc-detail">
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">SERVICE DETAIL</p>
            <h2 className="section__title center">서비스 상세 안내</h2>
            <p className="pricing__sub">Essential · Growth 공통 포함 사항</p>
          </Reveal>
          <div className="svc-grid">
            <Reveal direction="left" delay={0}>
              <div className="svc-card">
                <div className="svc-icon">📍</div>
                <h3 className="svc-name">네이버 플레이스 운영</h3>
                <span className="svc-badge">공통</span>
                <ul className="svc-list">
                  <li>병원 정보 상시 업데이트 관리</li>
                  <li>진료시간·소개·키워드·사진 관리</li>
                  <li>월간 이벤트 배너 제작 및 업로드</li>
                  <li>연휴 진료 일정 배너 제작 및 반영</li>
                  <li>시즌 키워드 반영 및 소개글 리터치</li>
                  <li>대표·병원 이미지 교체 반영</li>
                </ul>
              </div>
            </Reveal>
            <Reveal direction="up" delay={80}>
              <div className="svc-card">
                <div className="svc-icon">✍️</div>
                <h3 className="svc-name">브랜드 블로그</h3>
                <span className="svc-badge">공통</span>
                <ul className="svc-list">
                  <li>포스팅 + 이미지 카드 자체 제작</li>
                  <li>병원 맞춤형 블로그 설계</li>
                  <li>지역·질환·시술 키워드 분기/월별/시즌별 전략</li>
                  <li>전용 블로그 스킨·썸네일·카테고리 설정</li>
                  <li>카드뉴스형 시각 자료 디자인 포함</li>
                  <li>의료광고법 심의 기준 사전 검수</li>
                </ul>
              </div>
            </Reveal>
            <Reveal direction="right" delay={160}>
              <div className="svc-card">
                <div className="svc-icon">⭐</div>
                <h3 className="svc-name">기자단 · 영수증 리뷰</h3>
                <span className="svc-badge">공통</span>
                <ul className="svc-list">
                  <li>네이버 플레이스 노출 및 순위 확보 목적</li>
                  <li>블로거 리뷰와 영수증 리뷰 형태로 진행</li>
                  <li>플레이스 방문자 수 및 리뷰 수 확보</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  );
}

// ─── 홈페이지 제작 페이지 ────────────────────────────
function WebPage() {
  const features = [
    ["01", "기획·콘텐츠 직접 대행", "원장님이 원고를 쓰실 필요가 없습니다. 진료시간·주요 질환·치료 방식을 간단히 말씀해 주시면 기획·문안 작성·페이지 구성까지 직접 처리합니다. 미팅 한 번이면 충분합니다.", "left"],
    ["02", "모바일 반응형 구축", "환자 대부분은 모바일로 병원을 찾습니다. 작은 화면에서도 빠르고 편하게 작동하도록 모바일을 우선해 설계합니다. 아임웹 기반으로 오픈 후 수정도 간편합니다.", "right"],
    ["03", "의료광고법 검수 포함", "모든 콘텐츠를 의료광고법 기준으로 점검한 뒤 오픈합니다. 의학을 공부하는 팀이 직접 검수하기 때문에 법적 표현 리스크를 원천 차단합니다.", "left"],
    ["04", "오픈 후 지속 유지보수", "진료 정보 변경, 이벤트 팝업 등록, 의료진 교체 등 오픈 이후에도 같은 담당자가 계속 대응합니다. 카카오톡 한 줄이면 바로 처리됩니다.", "right"],
  ];
  const faqItems = [
    { q: "아임웹으로 만들면 GEO 작업에 불리한 것 아닌가요?", a: "아닙니다. 아임웹은 사용자 편의성을 돕는 장점이 큰 서비스이며, 메타 태그 등 검색 최적화에 필요한 작업을 모두 직접 처리해 드리기 때문에 GEO(생성형 검색 최적화) 작업에 불리한 점이 없습니다." },
    { q: "네이버 플레이스가 있는데 홈페이지가 꼭 필요한가요?", a: "플레이스는 \"병원이 존재한다\"는 사실을 알립니다. 홈페이지는 \"이 병원이 내 증상을 잘 보는지\"를 납득시킵니다. 환자는 플레이스로 관심을 갖고, 홈페이지를 보고 예약을 결정합니다. 역할이 다릅니다." },
    { q: "바빠서 시간을 낼 수가 없습니다.", a: "원장님이 쓰는 시간은 짧은 미팅 한 번과 컨펌이 전부입니다. 진료시간·주요 질환·치료 방식만 말씀해 주시면 기획·원고·디자인을 모두 직접 처리합니다. \"원고 써서 주세요\"라고 하지 않습니다." },
    { q: "의대생에게 맡겨도 될까요?", a: "2024년 에이전시 소속으로 시작해 2년간 20개 이상 제작, 이후 개인사업자로 독립해 현재까지 41개 홈페이지를 직접 제작·운영하고 있습니다. 하청 없이 처음부터 끝까지 한 사람이 만듭니다." },
    { q: "만들고 나면 관리가 복잡하지 않나요?", a: "아임웹 기반이라 수정이 간단합니다. 진료시간 변경, 의료진 교체, 팝업 등록 모두 카톡 한 줄이면 됩니다. 오픈 이후에도 동일한 담당자가 계속 대응합니다." },
  ];
  return (
    <article className="subpage">

      {/* STEP C-1: 페이지 헤더 */}
      <header className="subhero subhero--web">
        <div className="container">
          <p className="eyebrow subhero__badge subhero__badge--web">WEB DESIGN & DEVELOPMENT</p>
          <h1 className="subhero__title">병원 맞춤 홈페이지 제작</h1>
          <p className="subhero__sub">기획 · 의료 콘텐츠 작성 · 디자인 · 반응형 구축 · 의료광고법 검수 — 전 과정을 한 사람이 직접. 비용은 낮추고, 완성도는 끝까지 책임집니다.</p>
        </div>
      </header>

      {/* STEP C-2: 왜 지금 홈페이지인가 */}
      <section className="why why--search-bg" style={{ backgroundImage: `linear-gradient(to bottom, white 0%, rgba(255,255,255,0.65) 12%, rgba(255,255,255,0.65) 88%, white 100%), url(${searchBgImg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">왜 지금 홈페이지가 있어야 하는가</p>
            <h2 className="section__title center">환자는 예약 전에<br/>이미 병원을 평가하고 있습니다</h2>
          </Reveal>
          <div className="why__grid">
            <Reveal direction="left" delay={80}>
              <WhyCard
                keyword="신뢰"
                title="방문 전, 환자는 이미 비교 중"
                desc={"허리·무릎이 아픈 환자가 병원을 고르는 기준은 단순히 \"가까운 곳\"이 아닙니다. \"이 병원에서 내 증상을 보는지, 어떤 장비로 치료하는지\"를 홈페이지에서 먼저 확인합니다. 답이 없으면 환자는 답이 있는 다른 병원으로 갑니다."}
              />
            </Reveal>
            <Reveal direction="up" delay={160}>
              <WhyCard
                keyword="전환"
                title="설득의 마지막 창구"
                desc="플레이스와 블로그로 관심을 끌었어도, 예약 버튼을 누르기 직전 환자가 찾는 건 홈페이지입니다. 치료 방식·의료진·장비가 갖춰진 홈페이지는 24시간 작동하는 환자 설득 도구입니다."
              />
            </Reveal>
            <Reveal direction="right" delay={240}>
              <WhyCard
                keyword="자산"
                title="광고는 멈추지만, 홈페이지는 남는다"
                desc="네이버 광고는 예산이 떨어지면 사라집니다. 잘 만든 홈페이지는 비용 없이 계속 남아, 검색하는 환자에게 병원을 소개하는 영구 자산이 됩니다."
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* C-5: 3가지 강점 */}
      <section className="why why--strengths">
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">STRENGTHS</p>
            <h2 className="section__title center">다른 제작사가 동시에 갖지 못한<br/><span className="handwritten-green">세 가지</span></h2>
          </Reveal>
          <div className="why__grid">
            <Reveal direction="left" delay={80}>
              <WhyCard
                keyword="가격경쟁력"
                title="기획·디자인·반응형, 모두 포함하고 가격은 낮게"
                desc={"41개 제작 경력을 바탕으로\n기획·의료 콘텐츠·디자인·반응형 구축을\n모두 포함하면서도 가격을 낮췄습니다."}
                vs={"일반 제작사는 기획까지 포함하면\n1,000만 원 이상을 청구합니다.\n\n저가 업체는 기획이 없어\n원장님이 원고를 직접 작성해야 합니다."}
              />
            </Reveal>
            <Reveal direction="up" delay={160}>
              <WhyCard
                keyword="신뢰"
                title="계약한 사람이 직접 만듭니다"
                desc={"하청도, 잠적도, 추가 비용 청구도 없습니다.\n계약부터 오픈까지 모든 단계 직접 진행하며,\n늘 직접적으로 소통합니다.\n\n의학을 알기에\n의학 용어·질환·치료를 정확히 이해해\n의료광고법도 직접 검수합니다."}
                vs={"가격이 비싸다고 품질이 보장되지는 않습니다.\n실제로 누가 만드는지가 결과물의 수준을 결정합니다."}
              />
            </Reveal>
            <Reveal direction="right" delay={240}>
              <WhyCard
                keyword="기획 대행"
                title="원장님은 진료에만 집중하세요"
                desc={"대부분의 업체는\n\"원고 주시면 넣어드립니다\"라고 합니다.\n\n메디고라운드는 다릅니다.\n\n진료 질환과 치료 방식을 간단히 말씀해 주시면,\n의학적으로 정확하고\n환자가 이해하기 쉬운 콘텐츠를\n직접 기획·작성합니다."}
                vs={"대부분의 업체는 원고를 직접 주어야만 작업을 시작합니다.\n기획과 작성까지 맡기면 비용은 급격히 올라갑니다."}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* STEP C-3 + C-4: 가격 비교 + 상품 구성 */}
      <section className="c34-combined" style={{
        background: 'linear-gradient(to bottom, white 0%, #edf0fc 7%, #edf0fc 93%, white 100%)',
      }}>
        <div className="container">
          <Reveal direction="up">
            <h2 className="section__title center">같은 퀄리티인데<br/><span className="cheaper-highlight">메디고라운드가 더 저렴하니까요</span></h2>
          </Reveal>
          <div className="cmp-grid">
            <Reveal direction="left" delay={0}>
              <div className="cmp-card">
                <h4 className="cmp-name cmp-name--red">실력은 있지만,<br/>양심이 없는 고가 업체</h4>
                <div className="cmp-price cmp-price--red">1,000<span className="cmp-price__unit">만 원~</span></div>
                <p className="cmp-desc">기획·디자인 포함 시 1,000만 원 이상.<br/>병원 전문 업체는 단가가 더 올라갑니다.</p>
              </div>
            </Reveal>
            <Reveal direction="up" delay={80}>
              <div className="cmp-card">
                <h4 className="cmp-name cmp-name--red">양심은 있지만,<br/>실력이 없는 저가 업체</h4>
                <div className="cmp-price cmp-price--red">300<span className="cmp-price__unit">만 원~</span></div>
                <p className="cmp-desc">기획이 없습니다.<br/>원장님이 직접 원고를 써서 넘겨야 하고,<br/>결과물은 템플릿 수준입니다.</p>
              </div>
            </Reveal>
            <Reveal direction="right" delay={160}>
              <div className="cmp-card cmp-card--medigo">
                <h4 className="cmp-name cmp-name--gradient">실력도, 양심도 있는<br/>메디고라운드</h4>
                <div className="cmp-price cmp-price--medigo">380<span className="cmp-price__unit">만 원 /</span>700<span className="cmp-price__unit">만 원</span></div>
                <p className="cmp-desc">기획 + 의료 콘텐츠 작성<br/>+ 디자인 + 반응형 구축<br/>모두 포함.</p>
              </div>
            </Reveal>
          </div>
          <Reveal direction="up">
            <div className="pricing__addendum">
              저가 업체는 기획을 빼서 단가를 낮추고, 고가 업체는 기획을 넣어 단가를 올립니다.<br/>
              <strong>메디고라운드는 두 가지를 모두 포함하면서 가격은 낮췄습니다.</strong>
            </div>
          </Reveal>

          <div className="c34-divider" />

          <Reveal direction="up">
            <p className="eyebrow center">PRICING</p>
            <h2 className="section__title center">2가지 플랜</h2>
            <p className="pricing__sub">기획 · 콘텐츠 · 디자인 · 구축 전부 포함</p>
          </Reveal>
          <div className="pricing__grid">
            {WEB_PLANS.map((plan, i) => (
              <Reveal key={plan.name} direction={i === 0 ? "left" : "right"} delay={100}>
                <div className={`plan-card${plan.highlight ? " plan-card--highlight" : ""}`}>
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-tag">{plan.tag}</div>
                  <div className="plan-original">{plan.originalPrice}</div>
                  <div className="plan-price">{plan.price}<small>{plan.unit}</small></div>
                  <p className="web-plan__desc">{plan.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="pricing__addendum">두 플랜 모두 <strong>원장님이 원고를 쓰실 필요가 없습니다.</strong><br/>의료 콘텐츠 기획·집필, 의료광고법 검수, 오픈 후 안정화 지원이 모두 포함됩니다.</div>
          <p className="pricing__note">VAT 별도 · 아임웹 호스팅 비용(도메인·SSL·월정액) 별도 · 선택형 월 유지보수 30만원</p>
        </div>
      </section>

      {/* STEP C-6: 진행 절차 */}
      <section className="process" style={{
        backgroundImage: [
          'linear-gradient(to bottom, white 0%, rgba(255,255,255,0.72) 10%, rgba(255,255,255,0.72) 90%, white 100%)',
          `url(${calendarBgImg})`
        ].join(', '),
        backgroundSize: '100% 100%, cover',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat',
      }}>
        <div className="container">
          <Reveal direction="up"><h2 className="section__title center">계약부터 오픈까지<br/><span className="duration-highlight">약 4~6주</span></h2></Reveal>
          <div className="process__grid">
            {[
              ["WEEK 1~2\n기획·미팅", "진료시간·질환·치료 방식 청취 → 카테고리·페이지 구성·디자인 방향 기획 → 컨펌 후 착수"],
              ["WEEK 3~4\n콘텐츠·디자인", "문안 작성 및 시안 디자인 1차 공유"],
              ["WEEK 5\n구축·검토", "반응형 구축, 원장님 검토 및 수정 반영"],
              ["WEEK 6\n최종 오픈", "의료광고법 검수 후 정식 오픈"],
            ].map(([t, d], i) => (
              <Reveal key={t} direction="up" delay={i * 80}>
                <div className="process__step">
                  <span className="process__no">{i + 1}</span>
                  <h4>{t}</h4><p>{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up">
            <div className="pricing__addendum pricing__addendum--brown">
              원장님이 쓰는 시간은 <strong>미팅 한 번, 컨펌 한 번</strong>이 전부입니다.
            </div>
          </Reveal>
        </div>
      </section>

      {/* STEP C-7: 홈페이지 구성안 */}
      <section className="why why--sitemap">
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">SITEMAP</p>
            <h2 className="section__title center">환자가 필요한 정보를 빠르게 찾는 구성</h2>
            <p className="pricing__sub">정형외과의원을 예시로 구성한 내용입니다.<br/>진료과목에 따라 조정 가능합니다.</p>
          </Reveal>
          <div className="why__grid">
            {[
              ["01", "병원 소개", "의료진 소개, 진료 철학, 시설 안내"],
              ["02", "진료 안내", "척추(디스크·협착증), 관절(무릎·어깨·발목), 스포츠 손상, 골절 등 질환별 구성"],
              ["03", "치료장비 안내", "체외충격파(ESWT), 도수치료, 주사치료, 견인치료기 등"],
              ["04", "물리·재활치료", "전기·온열·견인치료, 운동 재활 프로그램"],
              ["05", "진료 시간·예약", "네이버 예약·전화 버튼 연동"],
              ["06", "오시는 길", "지도·주차·대중교통 안내"],
            ].map(([no, title, desc], i) => (
              <Reveal key={no} direction="up" delay={i * 60}>
                <div className="why-card">
                  <div className="why-card__emoji">{no}</div>
                  <h4 className="why-card__title">{title}</h4>
                  <p className="why-card__desc">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STEP C-8: FAQ */}
      <section className="process">
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">FAQ</p>
            <h2 className="section__title center">자주 묻는 질문</h2>
          </Reveal>
          <section className="container feature-list">
            {faqItems.map(({ q, a }, i) => (
              <Reveal key={i} direction="up" delay={i * 60}>
                <FeatureRow no={`Q${i + 1}`} title={q} desc={a} />
              </Reveal>
            ))}
          </section>
        </div>
      </section>

      {/* STEP C-9: 추가 비용 */}
      <section className="pricing c9-section">
        <div className="container">
          <Reveal direction="up">
            <p className="eyebrow center">HOSTING & EXTRAS</p>
            <h2 className="section__title center">숨겨진 비용 없이, 투명하게</h2>
          </Reveal>
          <div className="c9-grid">
            <Reveal direction="left" delay={100}>
              <div className="c9-card">
                <h4 className="c9-title">원장님 별도 부담 항목<br/><span>아임웹 기본 호스팅</span></h4>
                <ul className="c9-list">
                  <li>도메인 등록비 <strong>25,000원 / 1년</strong></li>
                  <li>SSL 인증서 <strong>35,000원 / 1년</strong></li>
                  <li>아임웹 Starter <strong>16,000원 / 월</strong> (1년 결제)</li>
                </ul>
                <p className="c9-note">제작비와 별도 항목입니다.<br />원장님이 직접 결제하거나 메디고라운드 대행 결제 후 청구 가능합니다.<br />이 항목으로 메디고라운드의 이익은 발생하지 않습니다.</p>
              </div>
            </Reveal>
            <Reveal direction="right" delay={100}>
              <div className="c9-card">
                <h4 className="c9-title">추가 선택 옵션<br/><span>유지보수 + 원내 시안 제작</span></h4>
                <ul className="c9-list">
                  <li>의료진 정보 추가·수정 / 진료 안내·시간 변경 대응</li>
                  <li>이벤트·공지 팝업 등록·관리 / 기타 콘텐츠 수정</li>
                  <li>병원 내 게시·안내용 인쇄물 디자인 시안 제작</li>
                  <li>월 비용 <strong>300,000원</strong></li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STEP C-10: 마무리 CTA */}
      <section className="web-cta">
        <div className="container web-cta__inner">
          <Reveal direction="up">
            <h2 className="web-cta__title">만드는 것보다,<br/>제대로 만드는 것이 중요합니다.</h2>
            <p className="web-cta__desc">환자는 이미 검색하고 있습니다.<br/>병원의 홈페이지가 그 환자에게 답을 줄 수 있도록,<br/>메디고라운드가 기획부터 오픈까지 직접 책임지겠습니다.</p>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

function FeatureRow({ no, title, desc }) {
  return (
    <div className="feature">
      <span className="feature__no">{no}</span>
      <div className="feature__body">
        <h3 className="feature__title">{title}</h3>
        <p className="feature__desc">{desc}</p>
      </div>
    </div>
  );
}

function WhyCard({ emoji, title, desc, vs, keyword }) {
  return (
    <div className="why-card">
      {keyword ? (
        <>
          <p className="why-card__keyword">{keyword}</p>
          <h4 className="why-card__keyword-sub">{title}</h4>
        </>
      ) : (
        <>
          <div className="why-card__emoji">{emoji}</div>
          <h4 className="why-card__title">{title}</h4>
        </>
      )}
      <p className="why-card__desc">{desc}</p>
      {vs && <span className="why-card__vs">{vs}</span>}
    </div>
  );
}

function ComparisonBoard({ items }) {
  const agencyItems = [
    "일반인 마케터가 외주를 통해 글 작성",
    "구글/네이버에서 인기글을 단순 재가공",
    "병원 측에 사진을 찍어 보내줄 것을 요구",
    "의료광고법에 대한 이해 부족",
    "어뷰징/불법 트래픽 작업을 홍보",
  ];
  return (
    <div className="comparison-board">
      <div className="comparison-board__vs" aria-hidden="true"><span>V</span><span>S</span></div>

      <section className="comparison-panel comparison-panel--agency">
        <img className="comparison-panel__question" src={questionLogo} alt="" aria-hidden="true" />
        <p className="comparison-panel__label comparison-panel__label--agency">타 대행 업체</p>
        <ul className="comparison-panel__list">
          {agencyItems.map((item, index) => (
            <li key={item}>
              <strong>{index + 1}. {agencyItems[index]}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="comparison-panel comparison-panel--medigo">
        <img className="comparison-panel__logo" src={logo} alt="" aria-hidden="true" />
        <p className="comparison-panel__label">메디고라운드</p>
        <ul className="comparison-panel__list">
          {items.map(([emoji, title, desc]) => (
            <li key={title}>
              <strong><span>{emoji}</span>{title}</strong>
              <p>{desc}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function ComparisonCard({ emoji, title, desc, vs }) {
  const competitor = vs.replace(/^일반 대행사\s*→\s*/, "");
  return (
    <article className="comparison-card">
      <div className="comparison-card__side comparison-card__side--agency">
        <p className="comparison-card__label">타 대행 업체</p>
        <p className="comparison-card__text">{competitor}</p>
      </div>
      <div className="comparison-card__side comparison-card__side--medigo">
        <img className="comparison-card__logo" src={logo} alt="" aria-hidden="true" />
        <p className="comparison-card__label">메디고라운드</p>
        <h4 className="comparison-card__title"><span>{emoji}</span>{title}</h4>
        <p className="comparison-card__text">{desc}</p>
      </div>
    </article>
  );
}

// ─── 서비스 선택 피커 ─────────────────────────────────
function ServicePicker({ value, onChange }) {
  const options = ["네이버 마케팅", "홈페이지 제작", "둘 다 / 기타"];
  return (
    <div className="service-picker">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`service-pill${value === opt ? " is-selected" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
      <input type="hidden" name="service" value={value} />
    </div>
  );
}

// ─── 문의 섹션 ─────────────────────────────────────────
function formatPhone(val) {
  const digits = val.replace(/\D/g, "").slice(0, 11);
  if (digits.length < 4) return digits;
  if (digits.length < 8) return digits.slice(0, 3) + "-" + digits.slice(3);
  return digits.slice(0, 3) + "-" + digits.slice(3, 7) + "-" + digits.slice(7);
}

function ContactSection() {
  const [status, setStatus] = useState("idle");
  const [service, setService] = useState("네이버 마케팅");
  const [phone, setPhone] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.target);
    const body = JSON.stringify({
      name:    fd.get("name"),
      phone:   fd.get("phone"),
      service: service,
    });
    try {
      await fetch(SITE.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        mode: "no-cors",
      });
      setStatus("ok");
      e.target.reset();
      setService("네이버 마케팅");
      setPhone("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        <Reveal direction="left">
          <div className="contact__intro">
            <p className="eyebrow">CONTACT</p>
            <h2 className="section__title">병원 성장의 시작,<br />지금 상담받으세요.</h2>
            <p className="contact__desc">24시간 이내에 빠르게 연락드립니다.<br/>카카오톡 오픈 프로필로도 문의 가능합니다.</p>
            <div className="contact__direct">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a className="contact__kakao" href={SITE.kakaoOpenChat} target="_blank" rel="noreferrer">카카오톡 오픈채팅 →</a>
            </div>
          </div>
        </Reveal>

        <Reveal direction="right">
          {status === "ok" ? (
            <div className="form form--success">
              <p className="form__msg form__msg--ok">문의가 접수되었습니다. 빠르게 연락드리겠습니다.</p>
            </div>
          ) : (
            <form className="form" onSubmit={handleSubmit}>
              <label className="field">
                <span>병원/담당자명</span>
                <input name="name" type="text" required placeholder="홍길동" />
              </label>
              <label className="field">
                <span>연락처</span>
                <input
                  name="phone" type="tel" required placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                />
              </label>
              <div className="field field--full">
                <span>관심 서비스</span>
                <ServicePicker value={service} onChange={setService} />
              </div>
              <button className="btn btn--primary form__submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "보내는 중..." : "상담 신청하기"}
              </button>
              {status === "error" && (
                <p className="form__msg form__msg--err">전송에 실패했습니다. 카카오톡 오픈채팅으로 직접 문의해 주세요.</p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

// ─── 푸터 ─────────────────────────────────────────────
function Footer({ setView }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">{SITE.companyName}</div>
          <p>의학을 아는 사람이 직접 만드는 병의원 전문 마케팅</p>
        </div>
        <nav className="footer__nav">
          <button onClick={() => setView("home")}>홈</button>
          <button onClick={() => setView("naver")}>네이버 마케팅</button>
          <button onClick={() => setView("web")}>홈페이지 제작</button>
        </nav>
        <div className="footer__info">
          <p>대표 : {SITE.ceo} &nbsp;|&nbsp; 사업자등록번호 : {SITE.bizNumber}</p>
          <p>{SITE.address}</p>
          <p>Mail. {SITE.email}</p>
          {SITE.instagram && <p>Instagram. @medigo_round</p>}
        </div>
      </div>
      <div className="footer__copy">© {new Date().getFullYear()} {SITE.companyName}. All rights reserved.</div>
    </footer>
  );
}

// ─── 플로팅 카카오 ─────────────────────────────────────
function FloatingMobileNav({ view, setView }) {
  const tabs = [
    { id: "home", label: "홈" },
    { id: "naver", label: "네이버 마케팅" },
    { id: "web", label: "홈페이지 제작" },
  ];
  return (
    <nav className="mobile-nav-float" aria-label="페이지 이동">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`mobile-nav-float__btn${view === t.id ? " is-active" : ""}`}
          onClick={() => setView(t.id)}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}

function FloatingKakao() {
  return (
    <a className="floating-kakao" href={SITE.kakaoOpenChat} target="_blank" rel="noreferrer" aria-label="카카오톡 오픈채팅 문의">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M12 3C6.48 3 2 6.58 2 11c0 2.79 1.86 5.23 4.65 6.64-.2.72-.73 2.62-.84 3.03-.13.5.18.5.39.36.16-.11 2.6-1.77 3.66-2.49.71.1 1.44.16 2.14.16 5.52 0 10-3.58 10-8C24 6.58 19.52 3 12 3z"/>
      </svg>
    </a>
  );
}
