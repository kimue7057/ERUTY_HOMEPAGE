import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  Check,
  CircleCheck,
  Database,
  FileCheck2,
  Fingerprint,
  GitBranch,
  Globe2,
  Link2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
} from "lucide-react";
import type { Lang } from "../../context/LanguageContext";

const BLUE = "#3737F2";
const INK = "#18191B";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SURFACE = "#F5F6F8";

type ArchitectureStage = {
  title: string;
  items: string[];
  icon: LucideIcon;
};

const architectureCopy: Record<Lang, ArchitectureStage[]> = {
  ko: [
    { title: "데이터 입력", items: ["시장 · 소비자", "콘텐츠 · 상품", "업무 · 계약"], icon: Database },
    { title: "분석 및 판단", items: ["수집 · 정제 · 분류", "분석 · 스코어링", "추천"], icon: BrainCircuit },
    { title: "실행 설계", items: ["전략 생성", "업무 흐름 설계", "우선순위화"], icon: GitBranch },
    { title: "AX 자동화", items: ["AI 에이전트", "API · 사람 승인", "시스템 실행"], icon: Bot },
    { title: "신뢰 레이어", items: ["계약 · 권리", "이력 · 정산 조건", "검증 기록"], icon: ShieldCheck },
    { title: "서비스 적용", items: ["Hitpick", "이룸터", "성과 데이터 축적"], icon: Boxes },
  ],
  en: [
    { title: "Data input", items: ["Market · consumer", "Content · product", "Work · contract"], icon: Database },
    { title: "Analysis", items: ["Collect · normalize", "Score · analyze", "Recommend"], icon: BrainCircuit },
    { title: "Execution design", items: ["Generate strategy", "Design workflow", "Prioritize"], icon: GitBranch },
    { title: "AX automation", items: ["AI agents", "API · approval", "System action"], icon: Bot },
    { title: "Trust layer", items: ["Contracts · rights", "History · terms", "Verification"], icon: ShieldCheck },
    { title: "Services", items: ["Hitpick", "Erumter", "Learning loop"], icon: Boxes },
  ],
};

export function ArchitectureDiagram({ lang }: { lang: Lang }) {
  const stages = architectureCopy[lang];

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white p-4 md:p-6" style={{ borderColor: BORDER }}>
      <div className="absolute left-[8%] right-[8%] top-[57px] hidden h-px bg-[#D9DDFE] lg:block" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={stage.title} className="relative flex min-w-0 flex-col rounded-xl border bg-white p-4" style={{ borderColor: BORDER }}>
              <div className="relative z-10 mb-5 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "#EEF0FF", color: BLUE }}>
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.16em]" style={{ color: "#A1A5AF", fontFamily: "var(--font-mono)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-3 text-sm font-bold eruty-keep-all" style={{ color: INK }}>{stage.title}</h3>
              <ul className="space-y-1.5">
                {stage.items.map((item) => (
                  <li key={item} className="text-xs eruty-keep-all" style={{ color: MUTED }}>{item}</li>
                ))}
              </ul>
              {index < stages.length - 1 && (
                <span className="absolute -bottom-3 left-1/2 z-10 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border bg-white text-[#A1A5AF] lg:-right-[19px] lg:bottom-auto lg:left-auto lg:top-9 lg:translate-x-0" style={{ borderColor: BORDER }} aria-hidden="true">
                  <ArrowRight size={12} className="rotate-90 lg:rotate-0" />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HeroTechVisual({ lang }: { lang: Lang }) {
  const labels = lang === "ko"
    ? ["시장 데이터", "AI 분석", "실행 설계", "AX 자동화", "신뢰 기록", "서비스 적용"]
    : ["Market data", "AI analysis", "Execution", "AX automation", "Trust record", "Services"];

  return (
    <div
      className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-4 shadow-2xl shadow-blue-950/40 md:p-6"
      role="img"
      aria-label={lang === "ko" ? "데이터에서 서비스 적용까지 이어지는 ERUTY 기술 구조" : "ERUTY technology stack from data to service execution"}
    >
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#6F8BFF]" />
          <span className="text-[11px] font-semibold tracking-[0.16em] text-white/70" style={{ fontFamily: "var(--font-mono)" }}>ERUTY TECH STACK</span>
        </div>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/45">LIVE STRUCTURE</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {labels.map((label, index) => (
          <div key={label} className="relative min-h-[104px] rounded-xl border border-white/10 bg-[#0D1830]/80 p-3.5">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18336C] text-[#7EA2FF]">
                {[Database, BrainCircuit, GitBranch, Bot, ShieldCheck, Boxes].map((Icon, iconIndex) =>
                  iconIndex === index ? <Icon key={label} size={16} aria-hidden="true" /> : null,
                )}
              </span>
              <span className="text-[10px] text-white/30" style={{ fontFamily: "var(--font-mono)" }}>0{index + 1}</span>
            </div>
            <div className="text-xs font-semibold text-white/85 eruty-keep-all">{label}</div>
            <div className="absolute bottom-0 left-3.5 right-3.5 h-px bg-gradient-to-r from-[#4071FF] to-transparent" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-[#416CF0]/30 bg-[#15327B]/45 px-4 py-3">
        <span className="text-xs text-white/65">{lang === "ko" ? "하나의 실행 구조로 연결" : "Connected in one execution system"}</span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8BA9FF]">
          ERUTY <Sparkles size={12} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

function MockupShell({ title, badge, children, ariaLabel }: { title: string; badge: string; children: React.ReactNode; ariaLabel: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-[0_18px_60px_rgba(24,25,27,0.08)]" style={{ borderColor: BORDER }} role="img" aria-label={ariaLabel}>
      <div className="flex items-center justify-between border-b px-4 py-3 md:px-5" style={{ borderColor: BORDER }}>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
            <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
            <span className="h-2 w-2 rounded-full bg-[#D9DCE3]" />
          </div>
          <span className="truncate text-[11px] font-bold text-[#33416B] md:text-xs">{title}</span>
        </div>
        <span className="ml-2 shrink-0 rounded-md bg-[#F1F3F7] px-2 py-1 text-[9px] font-medium text-[#747B8C]">{badge}</span>
      </div>
      {children}
    </div>
  );
}

export function MarketIntelligenceMockup({ lang }: { lang: Lang }) {
  const ko = lang === "ko";
  const markets = [
    [ko ? "미국" : "United States", 86],
    [ko ? "일본" : "Japan", 78],
    [ko ? "인도네시아" : "Indonesia", 72],
    [ko ? "베트남" : "Vietnam", 66],
  ] as const;

  return (
    <MockupShell title="Market Intelligence Dashboard" badge={ko ? "전체 시장" : "All markets"} ariaLabel={ko ? "국가 우선순위, 브랜드 적합도, 크리에이터 후보와 다음 액션을 보여주는 시장 인텔리전스 대시보드 목업" : "Market intelligence dashboard mockup showing ranking, fit score, creator match and next actions"}>
      <div className="grid gap-2 bg-[#F8F9FB] p-3 md:grid-cols-12 md:p-4">
        <div className="rounded-xl border bg-white p-3 md:col-span-5" style={{ borderColor: "#EBEDF1" }}>
          <div className="mb-3 text-[10px] font-bold text-[#4F5668]">Target Market Ranking</div>
          <div className="space-y-2.5">
            {markets.map(([name, value], index) => (
              <div key={name} className="grid grid-cols-[14px_70px_1fr_24px] items-center gap-1.5 text-[9px] text-[#697083]">
                <span>{index + 1}</span><span className="truncate">{name}</span>
                <span className="h-1.5 overflow-hidden rounded-full bg-[#EEF0F4]"><span className="block h-full rounded-full bg-[#4772F5]" style={{ width: `${value}%` }} /></span>
                <span className="text-right font-semibold text-[#454B5B]">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-white p-3 md:col-span-3" style={{ borderColor: "#EBEDF1" }}>
          <div className="mb-2 text-[10px] font-bold text-[#4F5668]">Brand Fit Score</div>
          <div className="flex items-center gap-3">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full" style={{ background: "conic-gradient(#3737F2 0 82%, #EEF0F4 82% 100%)" }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-extrabold text-[#2E4DA8]">82</div>
            </div>
            <div className="min-w-0">
              <div className="text-[9px] text-[#9A9FAD]">FIT / 100</div>
              <div className="mt-1 text-[10px] font-semibold text-[#29A36A]">High potential</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-white p-3 md:col-span-4" style={{ borderColor: "#EBEDF1" }}>
          <div className="mb-2 flex items-center justify-between text-[10px] font-bold text-[#4F5668]"><span>Trend Signals</span><span className="text-[#2DA56C]">+18.4%</span></div>
          <svg viewBox="0 0 220 72" className="h-[72px] w-full" aria-hidden="true">
            <defs><linearGradient id="market-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#527BF6" stopOpacity=".24"/><stop offset="1" stopColor="#527BF6" stopOpacity="0"/></linearGradient></defs>
            <path d="M2 62 L28 48 L54 53 L80 35 L106 39 L132 24 L158 31 L184 16 L218 8 L218 70 L2 70 Z" fill="url(#market-area)" />
            <path d="M2 62 L28 48 L54 53 L80 35 L106 39 L132 24 L158 31 L184 16 L218 8" fill="none" stroke="#527BF6" strokeWidth="2" />
          </svg>
        </div>
        <div className="rounded-xl border bg-white p-3 md:col-span-5" style={{ borderColor: "#EBEDF1" }}>
          <div className="mb-2 text-[10px] font-bold text-[#4F5668]">Creator Match</div>
          <div className="grid grid-cols-3 gap-2">
            {[91, 87, 84].map((score, index) => (
              <div key={score} className="rounded-lg bg-[#F7F8FA] p-2 text-center">
                <span className="mx-auto mb-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#E5E9F8] text-[8px] font-bold text-[#6071A9]">C{index + 1}</span>
                <div className="text-[9px] font-semibold text-[#4C5363]">{score}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-white p-3 md:col-span-7" style={{ borderColor: "#EBEDF1" }}>
          <div className="mb-2 text-[10px] font-bold text-[#4F5668]">Suggested Next Action</div>
          <div className="space-y-2">
            {(ko ? ["미국 시장 검증 캠페인 설계", "상위 크리에이터 3명 접촉", "반응 데이터 재수집"] : ["Design US validation campaign", "Contact top 3 creators", "Collect response signals"]).map((item, index) => (
              <div key={item} className="flex items-center gap-2 text-[9px] text-[#606779]"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#EEF0FF] text-[#3737F2]">{index + 1}</span>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export function WorkflowMockup({ lang }: { lang: Lang }) {
  const ko = lang === "ko";
  const columns = [
    { title: "Incoming Request", icon: FileCheck2, items: ko ? ["거래 검토 요청", "미팅 준비 요청"] : ["Review request", "Meeting brief"] },
    { title: "AI Agent", icon: Bot, items: ko ? ["문서 분석", "초안 생성"] : ["Analyze files", "Generate draft"] },
    { title: "Approval", icon: UserCheck, items: ko ? ["담당자 검토", "예외 승인"] : ["Owner review", "Exception approval"] },
    { title: "System Action", icon: Workflow, items: ko ? ["계약서 생성", "ERP 반영"] : ["Create contract", "Update ERP"] },
  ];

  return (
    <MockupShell title="Workflow Orchestration Board" badge={ko ? "운영 중" : "Active"} ariaLabel={ko ? "업무 요청부터 AI 에이전트, 사람 승인, 시스템 실행과 로그까지 이어지는 자동화 보드 목업" : "Workflow automation board mockup from incoming request to AI agent, approval, system action and logs"}>
      <div className="bg-[#F8F9FB] p-3 md:p-4">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-[repeat(4,minmax(0,1fr))_0.9fr]">
          {columns.map((column, columnIndex) => {
            const Icon = column.icon;
            return (
              <div key={column.title} className="relative rounded-xl border bg-white p-3" style={{ borderColor: "#EBEDF1" }}>
                <div className="mb-3 flex items-center gap-2 text-[9px] font-bold text-[#40517E]"><Icon size={13} className="text-[#4772F5]" aria-hidden="true" />{column.title}</div>
                <div className="space-y-2">
                  {column.items.map((item, index) => (
                    <div key={item} className="rounded-lg border bg-[#FAFBFC] p-2.5" style={{ borderColor: "#EEF0F3" }}>
                      <div className="mb-1 text-[9px] font-semibold text-[#565D6D]">{item}</div>
                      <div className="flex items-center justify-between text-[8px] text-[#A0A5B0]"><span>{index === 0 ? "10:31" : "10:38"}</span><span className="h-1.5 w-1.5 rounded-full bg-[#4D7CF8]" /></div>
                    </div>
                  ))}
                </div>
                {columnIndex < columns.length - 1 && <span className="absolute -bottom-2.5 left-1/2 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border bg-white text-[#7A91D9] sm:hidden" style={{ borderColor: BORDER }}><ArrowRight size={10} className="rotate-90" /></span>}
              </div>
            );
          })}
          <div className="rounded-xl border bg-[#111F3D] p-3 text-white sm:col-span-2 xl:col-span-1">
            <div className="mb-3 flex items-center justify-between text-[9px] font-bold"><span>Status / Log</span><span className="h-2 w-2 rounded-full bg-[#54D694]" /></div>
            <div className="mb-3 inline-flex rounded-full bg-[#153E39] px-2 py-1 text-[8px] font-semibold text-[#69E4AC]">Completed</div>
            <div className="space-y-2.5">
              {(ko ? ["요청 접수", "AI 분석 완료", "담당자 승인", "시스템 반영"] : ["Request received", "AI analysis", "Owner approved", "System updated"]).map((item, index) => (
                <div key={item} className="grid grid-cols-[24px_1fr] text-[8px] text-white/55"><span>10:{31 + index * 3}</span><span>{item}</span></div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-2 text-[8px] text-white/55">Exception handling · 0</div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export function TrustLedgerMockup({ lang }: { lang: Lang }) {
  const ko = lang === "ko";
  return (
    <MockupShell title="Trust & Rights Ledger" badge={ko ? "검증 기록" : "Verified record"} ariaLabel={ko ? "계약, 권리자, 이벤트 기록, 수익 배분과 정산 상태를 보여주는 신뢰 원장 목업" : "Trust ledger mockup showing contract, rights holder, event records, revenue split and settlement status"}>
      <div className="bg-[#F8F9FB] p-3 md:p-4">
        <div className="mb-2 flex flex-col justify-between gap-3 rounded-xl border bg-white p-3 sm:flex-row sm:items-center" style={{ borderColor: "#EBEDF1" }}>
          <div><div className="text-[8px] uppercase tracking-wider text-[#9AA0AD]">Contract ID</div><div className="mt-1 text-[11px] font-bold text-[#3F485A]">CT-2026-000627</div></div>
          <div className="flex items-center gap-2"><span className="text-[8px] text-[#9AA0AD]">Status</span><span className="rounded-full bg-[#E5F8ED] px-2.5 py-1 text-[8px] font-semibold text-[#20945B]">Active</span></div>
        </div>
        <div className="grid gap-2 md:grid-cols-12">
          <div className="rounded-xl border bg-white p-3 md:col-span-3" style={{ borderColor: "#EBEDF1" }}>
            <div className="mb-3 text-[10px] font-bold text-[#40517E]">Rights Holder</div>
            {["ERUTY Co., Ltd.", "Brand A"].map((name, index) => (
              <div key={name} className="mb-2 flex items-center gap-2 rounded-lg border p-2" style={{ borderColor: "#EEF0F3" }}>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EEF1FF] text-[#4D74EF]"><Fingerprint size={13} aria-hidden="true" /></span>
                <div className="min-w-0"><div className="truncate text-[9px] font-semibold text-[#4C5363]">{name}</div><div className="text-[7px] text-[#A0A5B0]">0x{index ? "8A...8729" : "ERUTY...A3F5"}</div></div>
              </div>
            ))}
          </div>
          <div className="rounded-xl border bg-white p-3 md:col-span-4" style={{ borderColor: "#EBEDF1" }}>
            <div className="mb-3 text-[10px] font-bold text-[#40517E]">Event / Delivery Record</div>
            <div className="space-y-3">
              {(ko ? ["계약 체결", "콘텐츠 전달 완료", "판매 실행", "성과 데이터 제출"] : ["Contract signed", "Content delivered", "Sales activated", "Performance filed"]).map((item, index) => (
                <div key={item} className="relative flex gap-2.5 pl-1 text-[8px] text-[#626A7A]"><span className="mt-0.5 h-2 w-2 shrink-0 rounded-full border-2 border-[#6B8DFA] bg-white" /><span>{item}<span className="mt-0.5 block text-[7px] text-[#ADB1BA]">2026-06-{String(index * 5 + 1).padStart(2, "0")}</span></span></div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border bg-white p-3 md:col-span-2" style={{ borderColor: "#EBEDF1" }}>
            <div className="mb-3 text-[10px] font-bold text-[#40517E]">Revenue Split</div>
            <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: "conic-gradient(#3737F2 0 40%, #4F7CF2 40% 80%, #4BC58A 80% 100%)" }}><div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#465064]">100%</div></div>
            <div className="space-y-1 text-[7px] text-[#798091]"><div className="flex justify-between"><span>ERUTY</span><b>40%</b></div><div className="flex justify-between"><span>Creator</span><b>40%</b></div><div className="flex justify-between"><span>Brand</span><b>20%</b></div></div>
          </div>
          <div className="rounded-xl border bg-white p-3 md:col-span-3" style={{ borderColor: "#EBEDF1" }}>
            <div className="mb-3 text-[10px] font-bold text-[#40517E]">Settlement Status</div>
            <div className="rounded-lg bg-[#F7F9FB] p-2.5"><div className="text-[8px] text-[#9AA0AD]">{ko ? "정산 검토" : "Settlement review"}</div><div className="mt-1 text-[10px] font-bold text-[#3F485A]">2026-06-30</div></div>
            <div className="mt-2 rounded-lg bg-[#F7F9FB] p-2.5"><div className="text-[8px] text-[#9AA0AD]">Tx Hash</div><div className="mt-1 truncate text-[8px] font-semibold text-[#596172]">0x8a7b...3c8d</div></div>
            <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#152650] px-2.5 py-2 text-[8px] font-semibold text-white"><CircleCheck size={11} className="text-[#79A3FF]" aria-hidden="true" />Verified History</div>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export function FlowTriplet({ labels, sections }: { labels: [string, string, string]; sections: [string[], string[], string[]] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {sections.map((items, index) => (
        <div key={labels[index]} className="rounded-xl border bg-white p-4" style={{ borderColor: BORDER }}>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold" style={{ background: index === 1 ? BLUE : "#EEF0FF", color: index === 1 ? "white" : BLUE }}>{index + 1}</span>
            <span className="text-xs font-bold" style={{ color: INK }}>{labels[index]}</span>
          </div>
          <ul className="space-y-1.5">
            {items.map((item) => <li key={item} className="flex items-start gap-1.5 text-xs eruty-keep-all" style={{ color: MUTED }}><Check size={12} className="mt-1 shrink-0" style={{ color: "#7690E8" }} aria-hidden="true" />{item}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

export const serviceIcons = { Globe2, Workflow, BarChart3, Link2 };
export const technologyColors = { BLUE, INK, MUTED, BORDER, SURFACE };

