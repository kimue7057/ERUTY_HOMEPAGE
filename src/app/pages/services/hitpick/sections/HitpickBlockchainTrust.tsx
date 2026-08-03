import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  FileCheck2,
  FilePenLine,
  IdCard,
  PackageCheck,
  PieChart,
  ReceiptText,
  ShieldCheck,
  Truck,
  UserCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { useLanguage } from "../../../../context/LanguageContext";

type TrackId = "logistics" | "rights";
type VerificationId = "evidence" | "history" | "participants" | "settlement";

type LocalizedText = { ko: string; en: string };

type TrustStep = {
  number: string;
  label: LocalizedText;
  description: LocalizedText;
  status: LocalizedText;
  verification: VerificationId;
  icon: LucideIcon;
};

const LOGISTICS_STEPS: TrustStep[] = [
  {
    number: "01",
    label: { ko: "출고", en: "Dispatch" },
    description: { ko: "상품 출고 기록", en: "Dispatch record" },
    status: { ko: "기록 생성", en: "Record created" },
    verification: "evidence",
    icon: PackageCheck,
  },
  {
    number: "02",
    label: { ko: "수출·통관", en: "Export & Customs" },
    description: { ko: "통관 문서 검증", en: "Customs documents" },
    status: { ko: "문서 연결", en: "Documents linked" },
    verification: "evidence",
    icon: FileCheck2,
  },
  {
    number: "03",
    label: { ko: "배송", en: "Delivery" },
    description: { ko: "배송 상태 추적", en: "Delivery tracking" },
    status: { ko: "이력 갱신", en: "History updated" },
    verification: "evidence",
    icon: Truck,
  },
  {
    number: "04",
    label: { ko: "고객 도달", en: "Customer Receipt" },
    description: { ko: "수령 결과 확인", en: "Receipt confirmed" },
    status: { ko: "도달 확인", en: "Arrival checked" },
    verification: "participants",
    icon: UserCheck,
  },
  {
    number: "05",
    label: { ko: "정산", en: "Settlement" },
    description: { ko: "정산 근거 연결", en: "Settlement evidence" },
    status: { ko: "정산 준비", en: "Ready to settle" },
    verification: "settlement",
    icon: ReceiptText,
  },
];

const RIGHTS_STEPS: TrustStep[] = [
  {
    number: "01",
    label: { ko: "IP 등록", en: "IP Registration" },
    description: { ko: "권리 정보 등록", en: "Rights information" },
    status: { ko: "권리 등록", en: "Rights registered" },
    verification: "evidence",
    icon: BadgeCheck,
  },
  {
    number: "02",
    label: { ko: "계약·권리 설정", en: "Rights Setup" },
    description: { ko: "사용 조건 기록", en: "Usage terms recorded" },
    status: { ko: "계약 연결", en: "Contract linked" },
    verification: "history",
    icon: FilePenLine,
  },
  {
    number: "03",
    label: { ko: "사용 이력", en: "Usage History" },
    description: { ko: "콘텐츠 활용 추적", en: "Content usage tracked" },
    status: { ko: "이력 기록", en: "History recorded" },
    verification: "history",
    icon: BarChart3,
  },
  {
    number: "04",
    label: { ko: "수익 배분", en: "Revenue Share" },
    description: { ko: "배분 기준 연결", en: "Share rules linked" },
    status: { ko: "배분 확인", en: "Share confirmed" },
    verification: "settlement",
    icon: PieChart,
  },
  {
    number: "05",
    label: { ko: "라이선싱", en: "Licensing" },
    description: { ko: "권리 사용 승인", en: "Rights use approved" },
    status: { ko: "승인 기록", en: "Approval recorded" },
    verification: "settlement",
    icon: IdCard,
  },
];

const COPY = {
  ko: {
    heading: "상품의 이동과\n콘텐츠의 권리를,\n검증 가능한 기록으로 연결합니다.",
    description: "물류와 권리의 흐름을\n검증 가능한 기록으로 연결합니다.",
    button: "자세히 보기",
    keywords: ["물류 검증", "권리 기록", "정산 확장"],
    logisticsDescription: "출고부터 고객 도달과 정산까지 거래 이력을 검증합니다.",
    rightsDescription: "권리 등록부터 사용 이력과 수익 배분까지 연결합니다.",
    verificationItems: {
      evidence: "거래 증빙",
      history: "변경 이력",
      participants: "참여자 확인",
      settlement: "정산 연결",
    },
  },
  en: {
    heading: "Connect product movement\nand content rights\nthrough verifiable records.",
    description: "Connect logistics and rights flows\nthrough verifiable records.",
    button: "Learn more",
    keywords: ["Logistics proof", "Rights records", "Settlement scale"],
    logisticsDescription: "Verify transaction history from dispatch to customer receipt and settlement.",
    rightsDescription: "Connect rights registration with usage history and revenue distribution.",
    verificationItems: {
      evidence: "Transaction proof",
      history: "Change history",
      participants: "Participant check",
      settlement: "Settlement link",
    },
  },
} as const;

const TRACKS: Record<TrackId, TrustStep[]> = {
  logistics: LOGISTICS_STEPS,
  rights: RIGHTS_STEPS,
};

const VERIFICATION_IDS: VerificationId[] = ["evidence", "history", "participants", "settlement"];
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

type TrustTrackProps = {
  track: TrackId;
  title: string;
  description: string;
  steps: TrustStep[];
  activeTrack: TrackId;
  activeIndex: number;
  hasEntered: boolean;
  reduceMotion: boolean;
  onSelect: (track: TrackId, index: number) => void;
  onPause: (reason: string) => void;
  onResume: (reason: string, delay?: number) => void;
  onTrackIntent: (track: TrackId | null) => void;
  onScroll: (track: TrackId) => void;
  setScroller: (track: TrackId, element: HTMLDivElement | null) => void;
};

function TrustTrack({
  track,
  title,
  description,
  steps,
  activeTrack,
  activeIndex,
  hasEntered,
  reduceMotion,
  onSelect,
  onPause,
  onResume,
  onTrackIntent,
  onScroll,
  setScroller,
}: TrustTrackProps) {
  const { lang } = useLanguage();
  const isCurrentTrack = activeTrack === track;
  const progress = track === "logistics" && activeTrack === "rights" ? 1 : isCurrentTrack ? activeIndex / 4 : 0;
  const headerDelay = track === "logistics" ? 0.38 : 0.94;
  const cardDelay = track === "logistics" ? 0.48 : 1.04;
  const trackReason = `track-${track}`;

  return (
    <motion.article
      className={`hp-trust-track hp-trust-track--${track}`}
      aria-labelledby={`hp-${track}-track-title`}
      onMouseEnter={() => {
        onTrackIntent(track);
        onPause(trackReason);
      }}
      onMouseLeave={() => {
        onTrackIntent(null);
        onResume(trackReason);
      }}
      onFocusCapture={() => {
        onTrackIntent(track);
        onPause(trackReason);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          onTrackIntent(null);
          onResume(trackReason);
        }
      }}
    >
      <motion.header
        className="hp-trust-track-header"
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={hasEntered ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, delay: reduceMotion ? 0 : headerDelay, ease: REVEAL_EASE }}
      >
        <div>
          <span className="hp-trust-track-mark" aria-hidden="true" />
          <h3 id={`hp-${track}-track-title`}>{title}</h3>
        </div>
        <p>{description}</p>
      </motion.header>

      <div
        className="hp-trust-scroll"
        ref={(element) => setScroller(track, element)}
        onScroll={() => onScroll(track)}
      >
        <div className="hp-trust-canvas">
          <div
            className="hp-trust-rail"
            style={{ "--hp-trust-progress": progress } as CSSProperties}
            aria-hidden="true"
          >
            <span className="hp-trust-rail-base" />
            <span className="hp-trust-rail-progress" />
          </div>

          <ol className="hp-trust-steps">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = isCurrentTrack && activeIndex === index;
              const isComplete = (isCurrentTrack && index <= activeIndex) || (track === "logistics" && activeTrack === "rights");

              return (
                <motion.li
                  key={`${track}-${step.number}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                  animate={hasEntered ? { opacity: 1, y: 0, scale: 1 } : undefined}
                  transition={{
                    duration: 0.48,
                    delay: reduceMotion ? 0 : cardDelay + index * 0.085,
                    ease: REVEAL_EASE,
                  }}
                >
                  <button
                    type="button"
                    className={`hp-trust-card${isActive ? " is-active" : ""}${isComplete ? " is-complete" : ""}`}
                    data-step-index={index}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`${title} ${step.number} ${step.label[lang]}: ${step.description[lang]}`}
                    onMouseEnter={() => onSelect(track, index)}
                    onFocus={() => onSelect(track, index)}
                    onClick={() => {
                      onSelect(track, index);
                      onPause("selection");
                      onResume("selection");
                    }}
                    onPointerDown={(event) => {
                      if (event.pointerType === "touch") {
                        onPause("touch");
                        onSelect(track, index);
                      }
                    }}
                    onPointerUp={(event) => {
                      if (event.pointerType === "touch") onResume("touch");
                    }}
                    onPointerCancel={() => onResume("touch")}
                  >
                    <span className="hp-trust-node">{step.number}</span>
                    <span className="hp-trust-card-icon" aria-hidden="true">
                      <Icon size={23} strokeWidth={1.75} />
                    </span>
                    <strong>{step.label[lang]}</strong>
                    <span className="hp-trust-card-description">{step.description[lang]}</span>
                    <span className="hp-trust-status">
                      <i aria-hidden="true" />
                      {step.status[lang]}
                    </span>
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </motion.article>
  );
}

export function HitpickBlockchainTrust() {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollersRef = useRef<Record<TrackId, HTMLDivElement | null>>({ logistics: null, rights: null });
  const programmaticScrollRef = useRef<Record<TrackId, boolean>>({ logistics: false, rights: false });
  const programmaticScrollTimersRef = useRef<Record<TrackId, number | null>>({ logistics: null, rights: null });
  const pauseReasonsRef = useRef(new Set<string>());
  const resumeTimersRef = useRef(new Map<string, number>());
  const verificationPulseTimerRef = useRef<number | null>(null);
  const [activeTrack, setActiveTrack] = useState<TrackId>("logistics");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [intentTrack, setIntentTrack] = useState<TrackId | null>(null);
  const [verificationPulse, setVerificationPulse] = useState(false);

  const pause = useCallback((reason: string) => {
    const pendingResume = resumeTimersRef.current.get(reason);
    if (pendingResume) window.clearTimeout(pendingResume);
    resumeTimersRef.current.delete(reason);
    pauseReasonsRef.current.add(reason);
    setIsPaused(true);
  }, []);

  const resume = useCallback((reason: string, delay = 2500) => {
    const pendingResume = resumeTimersRef.current.get(reason);
    if (pendingResume) window.clearTimeout(pendingResume);

    const timer = window.setTimeout(() => {
      resumeTimersRef.current.delete(reason);
      pauseReasonsRef.current.delete(reason);
      setIsPaused(pauseReasonsRef.current.size > 0);
    }, delay);
    resumeTimersRef.current.set(reason, timer);
  }, []);

  const selectStep = useCallback((track: TrackId, index: number) => {
    setActiveTrack(track);
    setActiveIndex(index);

    if (index === 4) {
      if (verificationPulseTimerRef.current) window.clearTimeout(verificationPulseTimerRef.current);
      setVerificationPulse(true);
      verificationPulseTimerRef.current = window.setTimeout(() => setVerificationPulse(false), 820);
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.18;
        setIsVisible(visible);
        if (visible) setHasEntered(true);
      },
      { threshold: [0, 0.18, 0.45] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isPaused || reduceMotion) return;

    const delay = activeTrack === "rights" && activeIndex === 4 ? 1850 : 1450;
    const timer = window.setTimeout(() => {
      if (activeTrack === "logistics" && activeIndex < 4) {
        selectStep("logistics", activeIndex + 1);
      } else if (activeTrack === "logistics") {
        selectStep("rights", 0);
      } else if (activeIndex < 4) {
        selectStep("rights", activeIndex + 1);
      } else {
        selectStep("logistics", 0);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [activeIndex, activeTrack, isPaused, isVisible, reduceMotion, selectStep]);

  useEffect(() => {
    const scroller = scrollersRef.current[activeTrack];
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth + 4) return;

    const activeCard = scroller.querySelector<HTMLElement>(`[data-step-index="${activeIndex}"]`);
    if (!activeCard) return;

    const previousTimer = programmaticScrollTimersRef.current[activeTrack];
    if (previousTimer) window.clearTimeout(previousTimer);
    programmaticScrollRef.current[activeTrack] = true;
    const target = activeCard.offsetLeft - (scroller.clientWidth - activeCard.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: reduceMotion ? "auto" : "smooth" });
    programmaticScrollTimersRef.current[activeTrack] = window.setTimeout(() => {
      programmaticScrollRef.current[activeTrack] = false;
    }, reduceMotion ? 0 : 700);
  }, [activeIndex, activeTrack, reduceMotion]);

  useEffect(() => {
    const resumeTimers = resumeTimersRef.current;
    const programmaticScrollTimers = programmaticScrollTimersRef.current;

    return () => {
      resumeTimers.forEach((timer) => window.clearTimeout(timer));
      (Object.keys(programmaticScrollTimers) as TrackId[]).forEach((track) => {
        const timer = programmaticScrollTimers[track];
        if (timer) window.clearTimeout(timer);
      });
      if (verificationPulseTimerRef.current) window.clearTimeout(verificationPulseTimerRef.current);
    };
  }, []);

  const handleScroll = useCallback(
    (track: TrackId) => {
      if (programmaticScrollRef.current[track]) return;
      const reason = `scroll-${track}`;
      pause(reason);
      resume(reason);
    },
    [pause, resume],
  );

  const currentStep = TRACKS[activeTrack][activeIndex];
  const activeVerification = currentStep.verification;

  return (
    <section
      ref={sectionRef}
      className={`hp-section hp-blockchain${isVisible ? " is-in-view" : ""}`}
      aria-labelledby="hp-blockchain-title"
    >
      <div className="hp-shell hp-blockchain-grid">
        <header className="hp-blockchain-copy">
          <motion.span
            className="hp-eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: REVEAL_EASE }}
          >
            BLOCKCHAIN TRUST LAYER
          </motion.span>
          <motion.h2
            id="hp-blockchain-title"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.08, ease: REVEAL_EASE }}
          >
            {copy.heading.split("\n").map((line) => <span key={line}>{line}</span>)}
          </motion.h2>
          <motion.div
            className="hp-blockchain-copy-detail"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.52, delay: reduceMotion ? 0 : 0.18, ease: REVEAL_EASE }}
          >
            <p>{copy.description}</p>
            <ul className="hp-blockchain-keywords" aria-label={lang === "ko" ? "핵심 기능" : "Core capabilities"}>
              {copy.keywords.map((keyword) => <li key={keyword}>{keyword}</li>)}
            </ul>
            <Link className="hp-blockchain-link" to="/technology">
              {copy.button}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </motion.div>
        </header>

        <motion.div
          className={`hp-trust-panel${intentTrack ? ` is-${intentTrack}-intent` : ""}${isVisible ? " is-in-view" : ""}`}
          initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={hasEntered ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.62, delay: reduceMotion ? 0 : 0.28, ease: REVEAL_EASE }}
        >
          <div className="hp-trust-panel-network" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>

          <TrustTrack
            track="logistics"
            title="LOGISTICS & TRADE"
            description={copy.logisticsDescription}
            steps={LOGISTICS_STEPS}
            activeTrack={activeTrack}
            activeIndex={activeIndex}
            hasEntered={hasEntered}
            reduceMotion={reduceMotion}
            onSelect={selectStep}
            onPause={pause}
            onResume={resume}
            onTrackIntent={setIntentTrack}
            onScroll={handleScroll}
            setScroller={(track, element) => {
              scrollersRef.current[track] = element;
            }}
          />

          <TrustTrack
            track="rights"
            title="IP & CONTENT RIGHTS"
            description={copy.rightsDescription}
            steps={RIGHTS_STEPS}
            activeTrack={activeTrack}
            activeIndex={activeIndex}
            hasEntered={hasEntered}
            reduceMotion={reduceMotion}
            onSelect={selectStep}
            onPause={pause}
            onResume={resume}
            onTrackIntent={setIntentTrack}
            onScroll={handleScroll}
            setScroller={(track, element) => {
              scrollersRef.current[track] = element;
            }}
          />

          <div className="hp-trust-convergence" aria-hidden="true">
            <i />
            <i />
            <span />
          </div>

          <motion.footer
            className={`hp-verification-record${verificationPulse ? " is-pulsing" : ""}`}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={hasEntered ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.52, delay: reduceMotion ? 0 : 1.54, ease: REVEAL_EASE }}
          >
            <div className="hp-verification-heading">
              <span className="hp-verification-icon" aria-hidden="true">
                <ShieldCheck size={24} strokeWidth={1.8} />
              </span>
              <strong>VERIFICATION RECORD</strong>
            </div>
            <div className="hp-verification-chips">
              {VERIFICATION_IDS.map((id) => (
                <span key={id} className={activeVerification === id ? "is-active" : undefined}>
                  <i aria-hidden="true" />
                  {copy.verificationItems[id]}
                </span>
              ))}
            </div>
          </motion.footer>

          <span className="hp-sr-only" aria-live="polite">
            {`${activeTrack === "logistics" ? "LOGISTICS & TRADE" : "IP & CONTENT RIGHTS"}, ${currentStep.number} ${currentStep.label[lang]}, ${currentStep.status[lang]}`}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
