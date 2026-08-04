import type { ResourceVisibility } from "./resourceNews";

export type ResearchCategory = "paper" | "patent" | "patent-application" | "rnd";

export type ResearchItem = {
  id: string;
  visibility: ResourceVisibility;
  category: ResearchCategory;
  year: string;
  title: string;
  titleEn: string;
};

export const RESOURCE_RESEARCH = [
  {
    id: "multimodal-emotion-diary-patent",
    visibility: "published",
    category: "patent-application",
    year: "2026",
    title: "멀티모달 감정인식 기반 감정일기 자동 생성 시스템",
    titleEn:
      "Automatic Emotion Diary Generation System Based on Multimodal Emotion Recognition",
  },
  {
    id: "generative-ai-emotional-diary-design",
    visibility: "published",
    category: "paper",
    year: "2025",
    title: "생성형 AI 기반 감정형 일기 앱 서비스 설계 연구",
    titleEn:
      "A Study on the Design of a Generative AI-Based Emotional Diary App Service",
  },
  {
    id: "emotional-diary-marketability",
    visibility: "published",
    category: "paper",
    year: "2025",
    title:
      "감정일기 어플리케이션의 시장성 분석: 키워드 트렌드 및 미디어 동향 기반 연구",
    titleEn:
      "Analysis of the Marketability of Emotional Diary Applications Based on Keyword Trends and Media Coverage",
  },
  {
    id: "stt-emotion-recognition-comparison",
    visibility: "published",
    category: "paper",
    year: "2025",
    title: "STT 기반 감정 인식 모델의 성능 비교 분석",
    titleEn:
      "A Comparative Study of Emotion Recognition Models Based on STT-Transcribed Text",
  },
  {
    id: "emotion-classification-accuracy",
    visibility: "published",
    category: "paper",
    year: "2025",
    title: "감정 분석 정확도 향상을 위한 솔루션의 제안",
    titleEn: "A Proposed Solution for Improving Emotion Classification Accuracy",
  },
  {
    id: "metaverse-nft-copyright-platform",
    visibility: "published",
    category: "patent",
    year: "2025",
    title:
      "블록체인 기반의 NFT를 이용한 메타버스 디자인 저작권 거래 플랫폼 제공 시스템 및 이를 이용한 메타버스 디자인 저작권 거래 서비스 방법",
    titleEn:
      "Metaverse Design Copyright Trading Platform Using Blockchain-Based NFTs",
  },
  {
    id: "generative-ai-emotion-content-rnd",
    visibility: "published",
    category: "rnd",
    year: "2025",
    title: "생성형 AI 기반 감성 분석 및 개인 맞춤형 콘텐츠 생성 기술",
    titleEn:
      "Generative AI-Based Emotion Analysis and Personalized Content Generation Technology",
  },
  {
    id: "blockchain-3d-content-copyright-rnd",
    visibility: "published",
    category: "rnd",
    year: "2024–2025",
    title:
      "블록체인 기술 기반 3D 콘텐츠 저작권 NFT 등록을 통한 저작권 보호 및 ERC-1155 토큰 시스템 기반 저작권 거래 기술 개발",
    titleEn:
      "Blockchain-Based 3D Content Copyright NFT Registration and ERC-1155 Copyright Trading Technology",
  },
  {
    id: "design-copyright-registration-platform",
    visibility: "published",
    category: "patent",
    year: "2024",
    title:
      "블록체인 기반 디자인 저작권 등록 플랫폼 시스템 및 이를 이용한 디자인 저작권 등록 서비스 제공방법",
    titleEn:
      "Blockchain-Based Design Copyright Registration Platform System and Service Method",
  },
] as const satisfies readonly ResearchItem[];
