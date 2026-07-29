import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

const techLayers = {
  ko: [
    {
      id: "ai", index: "01",
      name: "AI & 데이터 인텔리전스",
      tagline: "시장, 콘텐츠, 오디언스를 대규모로 이해합니다.",
      description: "이루티의 AI·데이터 레이어는 콘텐츠 신호, 오디언스 행동, 시장 트렌드, 국가별 데이터를 수집·분석해 비즈니스 의사결정을 위한 실질적인 인텔리전스를 제공합니다.",
      capabilities: [
        { label: "콘텐츠 데이터 처리", desc: "콘텐츠 메타데이터, 포맷, 톤, 시장 적합도를 수집·분석합니다." },
        { label: "오디언스 인텔리전스", desc: "크로스 플랫폼 오디언스 세그멘테이션, 행동 및 선호도 모델링" },
        { label: "시장 트렌드 분석", desc: "OTT, 브랜드, 커머스 분야 국가별 신호 모니터링" },
        { label: "브랜드 적합도 평가", desc: "오디언스·가치 정렬 기반 콘텐츠 자산과 브랜드 파트너 매칭" },
        { label: "비즈니스 기회 분석", desc: "배급·라이선싱·파트너십 기회의 자동화된 도출" },
        { label: "생성형 AI 응용", desc: "LLM 기반 문서 생성, 분석, 추천 시스템" },
      ],
      systemFlow: ["원시 데이터 수집", "특징 추출", "모델 추론", "신호 출력", "비즈니스 실행"],
      accent: "#3737F2",
    },
    {
      id: "automation", index: "02",
      name: "자동화 시스템",
      tagline: "반복적인 비즈니스 운영을 지능형 에이전트로 대체합니다.",
      description: "이루티의 자동화 시스템은 데이터 수집·분석·문서 생성·의사결정 지원이 가능한 AI 에이전트로 수동 워크플로우를 대체합니다.",
      capabilities: [
        { label: "AI 에이전트 오케스트레이션", desc: "리서치, 초안 작성, 실행 업무를 위한 다단계 자율 에이전트" },
        { label: "워크플로우 자동화", desc: "기업 프로세스를 엔드투엔드로 매핑·재설계·자동화" },
        { label: "데이터 수집 시스템", desc: "검증 레이어를 갖춘 웹·API·데이터베이스 자동 수집" },
        { label: "문서 생성", desc: "구조화된 입력으로 보고서·계약서·제안서를 AI로 자동 생성" },
        { label: "보고서 자동화", desc: "운영·영업·리더십을 위한 정기 인텔리전스 보고서" },
        { label: "내부 운영 시스템", desc: "운영 가시성을 위한 맞춤 어드민 툴·대시보드" },
      ],
      systemFlow: ["트리거 / 입력", "에이전트 처리", "툴 실행", "검증", "출력 / 실행"],
      accent: "#8B5CF6",
    },
    {
      id: "blockchain", index: "03",
      name: "블록체인 & 권리 인프라",
      tagline: "IP, 계약, 수익 흐름을 위한 불변 기록 시스템",
      description: "이루티는 IP 등록, 라이선스 계약, 수익 배분 구조, 권한 관리를 처리하는 블록체인 기반 권리 관리 인프라를 구축했습니다.",
      capabilities: [
        { label: "IP 자산 등록소", desc: "출처·소유권 기록과 함께 콘텐츠 IP의 온체인 등록" },
        { label: "스마트 계약 라이선싱", desc: "라이선스 발행·갱신·집행 자동화" },
        { label: "권리 관리", desc: "실시간 상태 추적이 가능한 세분화된 접근·사용 권한" },
        { label: "수익 배분", desc: "거래 이벤트 실행 시 프로그래밍 가능한 로열티 분배" },
        { label: "정산 인프라", desc: "다자 계약의 자동화된 감사 가능 결제 정산" },
        { label: "권한 관리", desc: "기업 및 파트너 시스템을 위한 역할 기반 접근 제어" },
      ],
      systemFlow: ["IP 등록", "라이선스 발행", "사용 추적", "수익 배분", "정산"],
      accent: "#F59E0B",
    },
    {
      id: "engineering", index: "04",
      name: "제품 엔지니어링",
      tagline: "비즈니스 플랫폼과 AI 제품을 위한 풀스택 개발",
      description: "이루티 엔지니어링팀은 콘텐츠 플랫폼부터 기업 어드민 시스템, AI 기반 애플리케이션까지 프로덕션 수준의 웹·모바일·SaaS 제품을 구축합니다.",
      capabilities: [
        { label: "웹 & 앱 개발", desc: "반응형 웹 애플리케이션, React 프론트엔드, 네이티브 모바일 앱" },
        { label: "SaaS 아키텍처", desc: "구독·접근 관리를 갖춘 멀티테넌트 SaaS 플랫폼" },
        { label: "어드민 플랫폼", desc: "내부 및 파트너용 백오피스·운영 대시보드" },
        { label: "API 연동", desc: "OTT 플랫폼·CRM·금융·물류 등 서드파티 서비스 연동" },
        { label: "인프라", desc: "클라우드 네이티브 서버 아키텍처, 데이터베이스, CDN, 모니터링" },
        { label: "운영 & 유지보수", desc: "지속적 배포, 가동률 모니터링, 반복적 개선" },
      ],
      systemFlow: ["요구사항", "아키텍처", "개발", "QA & 테스트", "배포 & 모니터링"],
      accent: "#22C55E",
    },
    {
      id: "rd", index: "05",
      name: "연구 & 개발",
      tagline: "AI와 콘텐츠 인텔리전스 최전선의 응용 연구",
      description: "이루티 R&D 부문은 감성 AI, 콘텐츠 개인화, 자동화 프레임워크 등 독자 모델·시스템을 개발합니다. 정부 지원 연구 및 특허 출원도 병행합니다.",
      capabilities: [
        { label: "생성형 AI 연구", desc: "LLM 파인튜닝, 프롬프트 엔지니어링, 응용별 모델 개발" },
        { label: "감성 분석", desc: "감성 톤·공명·오디언스 반응을 평가하는 AI 시스템" },
        { label: "콘텐츠 인텔리전스 모델", desc: "콘텐츠 품질·장르 적합도·시장 호환성 독자 모델" },
        { label: "개인화 시스템", desc: "사용자 적응형 추천 및 콘텐츠 전달 엔진" },
        { label: "자동화 모델 연구", desc: "복잡한 비즈니스 업무를 위한 신규 에이전트 아키텍처·의사결정 시스템" },
        { label: "특허 & 정부 R&D", desc: "특허 출원 진행 및 정부 지원 연구 프로그램 참여" },
      ],
      systemFlow: ["연구 질문", "가설", "실험", "검증", "프로덕션"],
      accent: "#EC4899",
    },
  ],
  en: [
    {
      id: "ai", index: "01",
      name: "AI & Data Intelligence",
      tagline: "Understanding markets, content, and audiences at scale.",
      description: "ERUTY's AI & data layer collects and analyzes content signals, audience behavior, market trends, and country-level data to provide actionable intelligence for business decisions.",
      capabilities: [
        { label: "Content Data Processing", desc: "Collect and analyze content metadata, format, tone, and market fit." },
        { label: "Audience Intelligence", desc: "Cross-platform audience segmentation, behavior and preference modeling." },
        { label: "Market Trend Analysis", desc: "Country-level signal monitoring across OTT, brand, and commerce sectors." },
        { label: "Brand Fit Evaluation", desc: "Match content assets with brand partners based on audience and value alignment." },
        { label: "Business Opportunity Analysis", desc: "Automated identification of distribution, licensing, and partnership opportunities." },
        { label: "Generative AI Applications", desc: "LLM-based document generation, analysis, and recommendation systems." },
      ],
      systemFlow: ["Raw Data Ingestion", "Feature Extraction", "Model Inference", "Signal Output", "Business Execution"],
      accent: "#3737F2",
    },
    {
      id: "automation", index: "02",
      name: "Automation Systems",
      tagline: "Replacing repetitive business operations with intelligent agents.",
      description: "ERUTY's automation systems replace manual workflows with AI agents capable of data collection, analysis, document generation, and decision support.",
      capabilities: [
        { label: "AI Agent Orchestration", desc: "Multi-step autonomous agents for research, drafting, and execution tasks." },
        { label: "Workflow Automation", desc: "End-to-end mapping, redesign, and automation of enterprise processes." },
        { label: "Data Collection Systems", desc: "Automated web, API, and database collection with validation layers." },
        { label: "Document Generation", desc: "AI-powered auto-generation of reports, contracts, and proposals from structured inputs." },
        { label: "Report Automation", desc: "Regular intelligence reports for operations, sales, and leadership." },
        { label: "Internal Operations Systems", desc: "Custom admin tools and dashboards for operational visibility." },
      ],
      systemFlow: ["Trigger / Input", "Agent Processing", "Tool Execution", "Validation", "Output / Execution"],
      accent: "#8B5CF6",
    },
    {
      id: "blockchain", index: "03",
      name: "Blockchain & Rights Infrastructure",
      tagline: "Immutable record system for IP, contracts, and revenue flows.",
      description: "ERUTY has built a blockchain-based rights management infrastructure that handles IP registration, license agreements, revenue distribution structures, and access management.",
      capabilities: [
        { label: "IP Asset Registry", desc: "On-chain registration of content IP with provenance and ownership records." },
        { label: "Smart Contract Licensing", desc: "Automated issuance, renewal, and enforcement of licenses." },
        { label: "Rights Management", desc: "Granular access and usage permissions with real-time status tracking." },
        { label: "Revenue Distribution", desc: "Programmable royalty distribution triggered on transaction events." },
        { label: "Settlement Infrastructure", desc: "Automated, auditable payment settlement for multi-party agreements." },
        { label: "Access Management", desc: "Role-based access control for enterprise and partner systems." },
      ],
      systemFlow: ["IP Registration", "License Issuance", "Usage Tracking", "Revenue Distribution", "Settlement"],
      accent: "#F59E0B",
    },
    {
      id: "engineering", index: "04",
      name: "Product Engineering",
      tagline: "Full-stack development for business platforms and AI products.",
      description: "ERUTY's engineering team builds production-grade web, mobile, and SaaS products — from content platforms to enterprise admin systems and AI-powered applications.",
      capabilities: [
        { label: "Web & App Development", desc: "Responsive web applications, React frontends, native mobile apps." },
        { label: "SaaS Architecture", desc: "Multi-tenant SaaS platforms with subscription and access management." },
        { label: "Admin Platforms", desc: "Back-office and operations dashboards for internal and partner use." },
        { label: "API Integration", desc: "Third-party service integration: OTT platforms, CRM, fintech, logistics." },
        { label: "Infrastructure", desc: "Cloud-native server architecture, databases, CDN, and monitoring." },
        { label: "Operations & Maintenance", desc: "Continuous deployment, uptime monitoring, and iterative improvement." },
      ],
      systemFlow: ["Requirements", "Architecture", "Development", "QA & Testing", "Deploy & Monitor"],
      accent: "#22C55E",
    },
    {
      id: "rd", index: "05",
      name: "Research & Development",
      tagline: "Applied research at the frontier of AI and content intelligence.",
      description: "ERUTY's R&D division develops proprietary models and systems in sentiment AI, content personalization, and automation frameworks. Government-funded research and patent applications are conducted in parallel.",
      capabilities: [
        { label: "Generative AI Research", desc: "LLM fine-tuning, prompt engineering, and application-specific model development." },
        { label: "Sentiment Analysis", desc: "AI systems for evaluating emotional tone, resonance, and audience response." },
        { label: "Content Intelligence Models", desc: "Proprietary models for content quality, genre fit, and market compatibility." },
        { label: "Personalization Systems", desc: "User-adaptive recommendation and content delivery engines." },
        { label: "Automation Model Research", desc: "New agent architectures and decision systems for complex business tasks." },
        { label: "Patents & Government R&D", desc: "Active patent applications and participation in government-funded research programs." },
      ],
      systemFlow: ["Research Question", "Hypothesis", "Experiment", "Validation", "Production"],
      accent: "#EC4899",
    },
  ],
};

const UI = {
  ko: {
    badge: "기술",
    headline: "실제 비즈니스를 위해\n설계된 기술",
    desc: "이루티는 자체 기술을 설계·구축합니다. 콘텐츠, 시장 데이터, 비즈니스 인풋을 인텔리전스·자동화·제품으로 전환합니다.",
    archLabel: "기술 아키텍처",
    layerPrefix: "레이어",
    ctaHeadline: "이루티 기술을 비즈니스에 연동할 준비가 되셨나요?",
    ctaBtn1: "프로젝트 시작",
    ctaBtn2: "서비스 보기",
  },
  en: {
    badge: "Technology",
    headline: "Technology Designed\nfor Real Business.",
    desc: "ERUTY designs and builds its own technology — transforming content, market data, and business inputs into intelligence, automation, and products.",
    archLabel: "Technology Architecture",
    layerPrefix: "Layer",
    ctaHeadline: "Ready to connect ERUTY technology to your business?",
    ctaBtn1: "Start a Project",
    ctaBtn2: "View Services",
  },
};

export function TechnologyPage() {
  const { lang } = useLanguage();
  const layers = techLayers[lang];
  const ui = UI[lang];
  const [activeLayer, setActiveLayer] = useState(layers[0]);

  const syncedLayer = layers.find((l) => l.id === activeLayer.id) || layers[0];

  return (
    <div className="pt-16" style={{ background: "#FFFFFF" }}>
      {/* 히어로 */}
      <section className="py-32" style={{ borderBottom: "1px solid #E4E6EA" }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-block text-xs mb-8 px-3 py-1.5 tracking-widest uppercase" style={{ color: "#3737F2", border: "1px solid rgba(55,55,242,0.3)", fontFamily: "var(--font-mono)" }}>
                {ui.badge}
              </div>
              <h1 className="mb-8" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05, color: "#18191B", letterSpacing: "-0.02em", whiteSpace: "pre-line" }}>
                {ui.headline}
              </h1>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#737780", maxWidth: 480 }}>
                {ui.desc}
              </p>
            </div>

            {/* 레이어 시각화 */}
            <div className="relative p-8" style={{ background: "#F5F6F8", border: "1px solid #E4E6EA" }}>
              <div className="text-xs mb-6" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>
                {ui.archLabel}
              </div>
              <div className="flex flex-col gap-2">
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer)}
                    className="flex items-center gap-4 p-3 text-left transition-all cursor-pointer"
                    style={{
                      background: syncedLayer.id === layer.id ? "#FFFFFF" : "transparent",
                      border: `1px solid ${syncedLayer.id === layer.id ? layer.accent + "40" : "#E4E6EA"}`,
                    }}
                  >
                    <div className="text-xs" style={{ color: layer.accent, fontFamily: "var(--font-mono)", width: 24 }}>
                      {layer.index}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm" style={{ color: syncedLayer.id === layer.id ? "#18191B" : "#737780", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                        {layer.name}
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{ background: syncedLayer.id === layer.id ? layer.accent : "#E4E6EA" }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 기술 레이어 상세 */}
      <section className="py-24">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 내비게이션 */}
            <div className="flex flex-col gap-px">
              {layers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer)}
                  className="text-left p-5 transition-all cursor-pointer"
                  style={{
                    background: syncedLayer.id === layer.id ? "#F5F6F8" : "transparent",
                    border: `1px solid ${syncedLayer.id === layer.id ? "#E4E6EA" : "transparent"}`,
                    borderLeft: syncedLayer.id === layer.id ? `2px solid ${layer.accent}` : "2px solid transparent",
                  }}
                >
                  <div className="text-xs mb-1" style={{ color: layer.accent, fontFamily: "var(--font-mono)" }}>
                    {layer.index}
                  </div>
                  <div className="text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: syncedLayer.id === layer.id ? "#18191B" : "#737780" }}>
                    {layer.name}
                  </div>
                </button>
              ))}
            </div>

            {/* 상세 패널 */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={syncedLayer.id + lang}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-8 mb-4" style={{ background: "#FFFFFF", border: `1px solid ${syncedLayer.accent}20`, borderTop: `2px solid ${syncedLayer.accent}` }}>
                    <div className="text-xs mb-3 tracking-widest uppercase" style={{ color: syncedLayer.accent, fontFamily: "var(--font-mono)" }}>
                      {ui.layerPrefix} {syncedLayer.index}
                    </div>
                    <h2 className="mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "2rem", color: "#18191B", lineHeight: 1.15 }}>
                      {syncedLayer.name}
                    </h2>
                    <p className="mb-2 italic" style={{ color: "#737780", fontFamily: "var(--font-body)", fontWeight: 300 }}>
                      {syncedLayer.tagline}
                    </p>
                    <p style={{ color: "#333438", lineHeight: 1.7, fontSize: "0.95rem" }}>
                      {syncedLayer.description}
                    </p>
                  </div>

                  {/* 시스템 플로우 */}
                  <div className="p-6 mb-4 flex items-center gap-0 overflow-x-auto" style={{ background: "#F5F6F8", border: "1px solid #E4E6EA" }}>
                    {syncedLayer.systemFlow.map((step, i) => (
                      <div key={step} className="flex items-center flex-shrink-0">
                        <div
                          className="px-4 py-2 text-xs whitespace-nowrap"
                          style={{
                            background: i === 0 ? syncedLayer.accent : "#FFFFFF",
                            color: i === 0 ? "#FFFFFF" : "#737780",
                            border: `1px solid ${i === 0 ? syncedLayer.accent : "#E4E6EA"}`,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {step}
                        </div>
                        {i < syncedLayer.systemFlow.length - 1 && (
                          <div style={{ color: "#E4E6EA", padding: "0 4px", fontSize: "0.75rem" }}>→</div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 역량 그리드 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "#E4E6EA" }}>
                    {syncedLayer.capabilities.map((cap) => (
                      <div key={cap.label} className="p-5" style={{ background: "#FFFFFF" }}>
                        <div className="text-sm mb-1.5" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#18191B" }}>
                          {cap.label}
                        </div>
                        <div className="text-xs" style={{ color: "#737780", lineHeight: 1.6 }}>
                          {cap.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: "#F5F6F8", borderTop: "1px solid #E4E6EA" }}>
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#18191B", lineHeight: 1.15 }}>
              {ui.ctaHeadline}
            </h2>
          </div>
          <div className="flex gap-4">
            <Link
              to="/start-a-project"
              className="flex items-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ background: "#18191B", color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#3737F2")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#18191B")}
            >
              {ui.ctaBtn1} <ArrowUpRight size={14} />
            </Link>
            <Link
              to="/services/hitpick"
              className="flex items-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ border: "1px solid #E4E6EA", color: "#18191B", fontFamily: "var(--font-body)" }}
            >
              {ui.ctaBtn2}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
