export const COMPANY_METRICS = {
  founded: {
    value: "2022",
    labelKo: "설립연도",
    labelEn: "Founded",
    noteKo: "2022년 9월 22일 법인 설립",
    noteEn: "Incorporated on September 22, 2022",
  },

  revenue2024: {
    valueKo: "5억 원",
    valueEn: "KRW 500M",
    labelKo: "2024년 매출",
    labelEn: "2024 Revenue",
    noteKo: "회계 자료 기준",
    noteEn: "Based on accounting records",
  },

  revenue2025: {
    valueKo: "7.5억 원",
    valueEn: "KRW 750M",
    labelKo: "2025년 매출",
    labelEn: "2025 Revenue",
    noteKo: "회계 자료 기준",
    noteEn: "Based on accounting records",
  },

  globalPartners: {
    value: "20+",
    labelKo: "글로벌 파트너",
    labelEn: "Global Partners",
    noteKo: "콘텐츠·기술·투자·유통 파트너",
    noteEn: "Content, technology, investment and distribution partners",
  },

  creatorNetwork: {
    value: "100+",
    labelKo: "크리에이터 네트워크",
    labelEn: "Creator Network",
    noteKo: "국내외 크리에이터 네트워크",
    noteEn: "Domestic and global creator network",
  },

  registeredPatents: {
    value: "2",
    labelKo: "등록 특허",
    labelEn: "Registered Patents",
    noteKo: "특허 등록 2건",
    noteEn: "2 registered patents",
  },

  patentApplications: {
    value: "1",
    labelKo: "특허 출원",
    labelEn: "Patent Application",
    noteKo: "특허 출원 1건",
    noteEn: "1 patent application",
  },
} as const;

export type AnnualGrowthMetric = {
  year: string;
  cumulativeProjects: number | null;
  cumulativePartners: number | null;
};

export const ANNUAL_GROWTH_METRICS: AnnualGrowthMetric[] = [
  {
    year: "2024",
    cumulativeProjects: null,
    cumulativePartners: null,
  },
  {
    year: "2025",
    cumulativeProjects: null,
    cumulativePartners: null,
  },
];
