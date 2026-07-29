// ── Open Positions ────────────────────────────────────────────────────────────
// To add a new job: copy one of the example entries, fill in all fields,
// and set status to "published". Set to "draft" to hide from the public UI.
// Set to "hidden" to permanently suppress an entry.
//
// This file is the single source of truth for CareersPage job listings.

export type FilterKey = "all" | "content" | "technology" | "global" | "design";

export interface Position {
  id: string;
  status: "published" | "draft" | "hidden";
  title: string;
  titleEn: string;
  team: string;
  teamEn: string;
  teamKey: FilterKey;
  type: string;      // "Full-time" | "Contract" | "Internship"
  level: string;     // "Junior" | "Mid" | "Senior" | "Lead"
  location: string;
  deadline: string;  // ISO date string or display string
  overview: string;
  overviewEn: string;
  responsibilities: string[];
  responsibilitiesEn: string[];
  required: string[];
  requiredEn: string[];
  preferred: string[];
  preferredEn: string[];
}

// ── Active Positions ──────────────────────────────────────────────────────────
// Add real positions here when they become available.

export const openPositions: Position[] = [
  // Example entry (status: "hidden" — not shown in public UI):
  // {
  //   id: "example-001",
  //   status: "hidden",
  //   title: "AI 연구 엔지니어",
  //   titleEn: "AI Research Engineer",
  //   team: "기술",
  //   teamEn: "Technology",
  //   teamKey: "technology",
  //   type: "Full-time",
  //   level: "Mid",
  //   location: "Seoul / Remote",
  //   deadline: "2025-03-31",
  //   overview: "이루티 AI 연구소에서 콘텐츠 추천 알고리즘을 연구·개발합니다.",
  //   overviewEn: "Research and develop content recommendation algorithms at ERUTY AI Lab.",
  //   responsibilities: ["AI 모델 설계 및 학습", "데이터 파이프라인 구축"],
  //   responsibilitiesEn: ["Design and train AI models", "Build data pipelines"],
  //   required: ["Python 3년 이상", "PyTorch 또는 TensorFlow 경험"],
  //   requiredEn: ["3+ years Python", "Experience with PyTorch or TensorFlow"],
  //   preferred: ["NLP 또는 추천 시스템 연구 경험"],
  //   preferredEn: ["Research experience in NLP or recommendation systems"],
  // },
];
