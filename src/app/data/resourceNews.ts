export type ResourceVisibility = "published" | "draft" | "hidden";

export type NewsItem = {
  id: string;
  visibility: ResourceVisibility;
  publishedAt: string;
  category: string;
  title: string;
  summary: string;
  publisher: string;
  sourceUrl: string;
  image: string;
  imageAlt: string;
  imageCredit?: string;
  imageSourceUrl?: string;
};

export const RESOURCE_NEWS = {
  ko: [
    {
      id: "gitex-ai-europe-2026",
      image: "/images/resources/news/gitex-ai-europe-2026.webp",
      imageAlt: "GITEX AI Europe 2026 독일 현장의 ERUTY 부스",
      imageCredit: "이미지 제공: 이루티",
      imageSourceUrl: "https://www.eruty.co.kr/images/news/news_GITEX.png",
      visibility: "published",
      publishedAt: "2026-07-08",
      category: "글로벌",
      title: "이루티, GITEX AI Europe 2026 참가",
      summary:
        "이루티가 독일에서 열린 GITEX AI Europe 2026에 부산 지역 블록체인 기업들과 함께 참가해 글로벌 투자사와 바이어를 대상으로 기술과 사업을 소개했습니다.",
      publisher: "뉴스핌",
      sourceUrl: "https://www.newspim.com/news/view/20260708000075",
    },
    {
      id: "hitpick-official-launch",
      image: "/images/resources/news/hitpick-official-launch.webp",
      imageAlt: "히트픽 서비스 구성과 글로벌 유통 흐름을 설명한 대표 이미지",
      imageCredit: "이미지 제공: 이루티",
      imageSourceUrl:
        "https://besuccess.com/wp-content/uploads/2026/04/unnamed-1-1-scaled.jpg",
      visibility: "published",
      publishedAt: "2026-04-08",
      category: "제품",
      title: "이루티, 콘텐츠 통합 플랫폼 ‘히트픽’ 정식 출시",
      summary:
        "이루티가 콘텐츠 제작과 제작 참여, 글로벌 유통을 하나의 흐름으로 연결하는 통합 플랫폼 히트픽을 정식 출시했습니다.",
      publisher: "beSUCCESS",
      sourceUrl: "https://besuccess.com/?p=181884",
    },
    {
      id: "ces-2026",
      image: "/images/resources/news/ces-2026.webp",
      imageAlt: "CES 2026에서 방문객에게 Hitpick을 소개하는 ERUTY 부스",
      imageCredit: "부산테크노파크",
      imageSourceUrl:
        "https://www.btp.or.kr/attach/IMAGE/Board/36/2026/1/1Ix9UXIeW6tMxdT7.JPG",
      visibility: "published",
      publishedAt: "2026-01-14",
      category: "글로벌",
      title: "이루티, CES 2026서 Hitpick 글로벌 협력 기회 모색",
      summary:
        "이루티가 CES 2026 통합부산관에 참가해 AI 기반 콘텐츠 분석과 블록체인 저작권 정산 기술을 소개하고 해외 투자사 및 콘텐츠 기업과 후속 협력 가능성을 논의했습니다.",
      publisher: "부산테크노파크",
      sourceUrl:
        "https://www.btp.or.kr/webzine/CMS/WebzineMgr/view.do?category_seq=2&content_seq=9581375&mCode=MN019&month=01&year=2026",
    },
    {
      id: "switch-2025",
      image: "/images/resources/news/switch-2025.webp",
      imageAlt: "SWITCH 2025 코카나잇에서 피칭하는 이루티",
      imageCredit: "한국콘텐츠진흥원",
      imageSourceUrl: "https://www.kocca.kr/download/news/news_251103_3_4.jpg",
      visibility: "published",
      publishedAt: "2025-11-04",
      category: "글로벌",
      title: "이루티, SWITCH 2025 K-콘텐츠 파빌리온 참가",
      summary:
        "이루티가 싱가포르 SWITCH 2025 K-콘텐츠 파빌리온에 참가해 현지 투자사와 콘텐츠 기업을 대상으로 사업을 소개하고 피칭을 진행했습니다.",
      publisher: "한국콘텐츠진흥원",
      sourceUrl: "https://welcon.kocca.kr/ko/info/business/1956513",
    },
    {
      id: "gitex-2025-global-mou",
      image: "/images/resources/news/gitex-2025-global-mou.webp",
      imageAlt: "GITEX 2025 ERUTY 부스에서 글로벌 파트너와 체결한 업무협약",
      imageCredit: "이미지 제공: 이루티",
      imageSourceUrl: "https://www.eruty.co.kr/images/news/news_mou.png",
      visibility: "published",
      publishedAt: "2025-10-17",
      category: "파트너십",
      title: "이루티, GITEX 2025서 글로벌 4개사와 MOU 체결",
      summary:
        "이루티가 두바이 GITEX 2025 블록체인 한국관에 참가해 AI 기반 콘텐츠 분석과 블록체인 저작권 정산 기술을 소개하고 글로벌 파트너 4곳과 업무협약을 체결했습니다.",
      publisher: "코리아스타트업포스트",
      sourceUrl: "https://www.kspost.biz/ko-kr/articles/1777",
    },
    {
      id: "neo-entertainment-mou",
      image: "/images/resources/news/neo-entertainment-mou.webp",
      imageAlt: "이루티와 네오엔터테인먼트 로고",
      imageCredit: "이미지 제공: 이루티",
      imageSourceUrl:
        "https://cdn.www.kspost.biz/w1200/q100/f_jpg/article-images/202509/1613_1399_4915.jpg",
      visibility: "published",
      publishedAt: "2025-09-09",
      category: "파트너십",
      title: "이루티, 네오엔터테인먼트와 콘텐츠 투자·IP 제공 업무협약 체결",
      summary:
        "이루티가 네오엔터테인먼트와 콘텐츠 IP 공동 활용, 투자용 콘텐츠 기획 정보 공유와 콘텐츠 제작 협력을 위한 업무협약을 체결했습니다.",
      publisher: "머니투데이",
      sourceUrl:
        "https://www.mt.co.kr/amp/industry/2025/09/09/2025090909410834550",
    },
    {
      id: "park-sang-il-appointment",
      image: "/images/resources/news/park-sang-il-appointment.webp",
      imageAlt: "박상일 이루티 부대표 프로필 사진",
      imageCredit: "이미지 제공: 이루티",
      imageSourceUrl: "https://www.eruty.co.kr/images/news/news_coo_wide.png",
      visibility: "published",
      publishedAt: "2025-09-03",
      category: "기업",
      title: "이루티, 박상일 전 카사코리아 COO 부대표로 영입",
      summary:
        "이루티가 금융과 디지털 자산 분야의 사업 경험을 보유한 박상일 전 카사코리아 COO를 신임 부대표 겸 COO·CBO로 영입했습니다.",
      publisher: "데이터넷",
      sourceUrl: "https://www.datanet.co.kr/news/articleView.html?idxno=204975",
    },
    {
      id: "prep-vietnam-2025",
      image: "/images/resources/news/prep-vietnam-2025.webp",
      imageAlt: "스스로 프로젝트 Prep 베트남 발대식 참가자 단체 사진",
      imageCredit: "이미지 제공: 이루티",
      imageSourceUrl: "https://www.eruty.co.kr/images/news/news_vietnam_wide.png",
      visibility: "published",
      publishedAt: "2025-06-30",
      category: "글로벌",
      title: "이루티, ‘스스로 프로젝트 Prep 베트남’ 참가기업 선정",
      summary:
        "이루티가 비수도권 스타트업의 베트남 진출을 지원하는 글로벌 액셀러레이팅 프로그램에 선정돼 현지 전시, 비즈니스 밋업과 후속 사업화를 추진했습니다.",
      publisher: "한국남부발전",
      sourceUrl: "https://www.kospo.co.kr/bbs/kospo/95/109904/artclView.do",
    },
    {
      id: "seoul-fintech-lab-2025",
      image: "/images/resources/news/seoul-fintech-lab-2025.webp",
      imageAlt: "서울핀테크랩 로고",
      imageCredit: "서울핀테크랩",
      imageSourceUrl: "https://www.vtimes.kr/news/photo/202506/52458_29037_522.jpg",
      visibility: "published",
      publishedAt: "2025-06-20",
      category: "기업",
      title: "이루티, 서울핀테크랩 2025년 상반기 멤버십 기업 선정",
      summary:
        "이루티가 서울핀테크랩의 2025년 상반기 신규 멤버십 기업으로 선정돼 글로벌 진출, 투자 연계와 핀테크 사업 고도화 지원을 받게 됐습니다.",
      publisher: "벤처타임즈",
      sourceUrl: "https://www.vtimes.kr/news/articleView.html?idxno=52458",
    },
    {
      id: "busan-xr-metaverse-ir-award",
      image: "/images/resources/news/busan-xr-metaverse-ir-award.webp",
      imageAlt: "부산 XR·메타버스 IR라운드 수상자 단체 사진",
      imageCredit: "이미지 제공: 이루티",
      imageSourceUrl: "https://www.eruty.co.kr/images/news/news_meta_wide.png",
      visibility: "published",
      publishedAt: "2024-12-19",
      category: "수상",
      title: "이루티, 부산 XR·메타버스 기업 육성 IR라운드 우수상 수상",
      summary:
        "이루티가 블록체인 기반 콘텐츠 저작권 보호와 유통 관리 기술을 발표해 부산 XR·메타버스 기업 육성 액셀러레이팅 프로그램 IR라운드에서 우수상을 수상했습니다.",
      publisher: "아시아경제",
      sourceUrl: "https://www.asiae.co.kr/article/2024121914023843998",
    },
  ],
  en: [
    {
      id: "gitex-ai-europe-2026",
      image: "/images/resources/news/gitex-ai-europe-2026.webp",
      imageAlt: "ERUTY booth at GITEX AI Europe 2026 in Germany",
      imageCredit: "Image provided by ERUTY",
      imageSourceUrl: "https://www.eruty.co.kr/images/news/news_GITEX.png",
      visibility: "published",
      publishedAt: "2026-07-08",
      category: "Global",
      title: "ERUTY Participates in GITEX AI Europe 2026",
      summary:
        "ERUTY joined GITEX AI Europe 2026 in Germany with blockchain companies from Busan, presenting its technology and business to global investors and buyers.",
      publisher: "NewsPim",
      sourceUrl: "https://www.newspim.com/news/view/20260708000075",
    },
    {
      id: "hitpick-official-launch",
      image: "/images/resources/news/hitpick-official-launch.webp",
      imageAlt: "HITPICK service overview and global distribution flow",
      imageCredit: "Image provided by ERUTY",
      imageSourceUrl:
        "https://besuccess.com/wp-content/uploads/2026/04/unnamed-1-1-scaled.jpg",
      visibility: "published",
      publishedAt: "2026-04-08",
      category: "Product",
      title: "ERUTY Officially Launches HITPICK",
      summary:
        "ERUTY officially launched HITPICK, an integrated platform connecting content production, participation, and global distribution.",
      publisher: "beSUCCESS",
      sourceUrl: "https://besuccess.com/?p=181884",
    },
    {
      id: "ces-2026",
      image: "/images/resources/news/ces-2026.webp",
      imageAlt: "ERUTY introduces HITPICK to visitors at CES 2026",
      imageCredit: "Busan Techno Park",
      imageSourceUrl:
        "https://www.btp.or.kr/attach/IMAGE/Board/36/2026/1/1Ix9UXIeW6tMxdT7.JPG",
      visibility: "published",
      publishedAt: "2026-01-14",
      category: "Global",
      title: "ERUTY Explores Global Collaboration at CES 2026",
      summary:
        "ERUTY presented its AI-powered content analysis and blockchain-based copyright settlement technology at CES 2026 and discussed potential collaboration with global investors and content companies.",
      publisher: "Busan Techno Park",
      sourceUrl:
        "https://www.btp.or.kr/webzine/CMS/WebzineMgr/view.do?category_seq=2&content_seq=9581375&mCode=MN019&month=01&year=2026",
    },
    {
      id: "switch-2025",
      image: "/images/resources/news/switch-2025.webp",
      imageAlt: "ERUTY pitches at KOCCA Night during SWITCH 2025",
      imageCredit: "KOCCA",
      imageSourceUrl: "https://www.kocca.kr/download/news/news_251103_3_4.jpg",
      visibility: "published",
      publishedAt: "2025-11-04",
      category: "Global",
      title: "ERUTY Participates in the K-Content Pavilion at SWITCH 2025",
      summary:
        "ERUTY joined the K-Content Pavilion at SWITCH 2025 in Singapore, presenting its business and pitching to local investors and content companies.",
      publisher: "KOCCA",
      sourceUrl: "https://welcon.kocca.kr/ko/info/business/1956513",
    },
    {
      id: "gitex-2025-global-mou",
      image: "/images/resources/news/gitex-2025-global-mou.webp",
      imageAlt: "ERUTY signs an MOU with a global partner at its GITEX 2025 booth",
      imageCredit: "Image provided by ERUTY",
      imageSourceUrl: "https://www.eruty.co.kr/images/news/news_mou.png",
      visibility: "published",
      publishedAt: "2025-10-17",
      category: "Partnership",
      title: "ERUTY Signs MOUs with Four Global Partners at GITEX 2025",
      summary:
        "ERUTY participated in the Korea Blockchain Pavilion at GITEX 2025 in Dubai and signed memoranda of understanding with four global partners.",
      publisher: "Korea Startup Post",
      sourceUrl: "https://www.kspost.biz/ko-kr/articles/1777",
    },
    {
      id: "neo-entertainment-mou",
      image: "/images/resources/news/neo-entertainment-mou.webp",
      imageAlt: "ERUTY and Neo Entertainment logos",
      imageCredit: "Image provided by ERUTY",
      imageSourceUrl:
        "https://cdn.www.kspost.biz/w1200/q100/f_jpg/article-images/202509/1613_1399_4915.jpg",
      visibility: "published",
      publishedAt: "2025-09-09",
      category: "Partnership",
      title: "ERUTY Signs an MOU with Neo Entertainment",
      summary:
        "ERUTY signed an MOU with Neo Entertainment to collaborate on content IP utilization, project information sharing, and content planning and production.",
      publisher: "MoneyToday",
      sourceUrl:
        "https://www.mt.co.kr/amp/industry/2025/09/09/2025090909410834550",
    },
    {
      id: "park-sang-il-appointment",
      image: "/images/resources/news/park-sang-il-appointment.webp",
      imageAlt: "Portrait of ERUTY Vice President Park Sang-il",
      imageCredit: "Image provided by ERUTY",
      imageSourceUrl: "https://www.eruty.co.kr/images/news/news_coo_wide.png",
      visibility: "published",
      publishedAt: "2025-09-03",
      category: "Company",
      title: "ERUTY Appoints Park Sang-il as COO and CBO",
      summary:
        "ERUTY appointed former Kasa Korea COO Park Sang-il as Vice President, COO, and CBO to strengthen its business and global expansion capabilities.",
      publisher: "DataNet",
      sourceUrl: "https://www.datanet.co.kr/news/articleView.html?idxno=204975",
    },
    {
      id: "prep-vietnam-2025",
      image: "/images/resources/news/prep-vietnam-2025.webp",
      imageAlt: "Participants at the Prep Vietnam launch event",
      imageCredit: "Image provided by ERUTY",
      imageSourceUrl: "https://www.eruty.co.kr/images/news/news_vietnam_wide.png",
      visibility: "published",
      publishedAt: "2025-06-30",
      category: "Global",
      title: "ERUTY Selected for the Prep Vietnam Global Acceleration Program",
      summary:
        "ERUTY was selected for a global acceleration program supporting regional startups entering Vietnam, including local exhibitions, business meetings, and follow-up commercialization.",
      publisher: "Korea Southern Power",
      sourceUrl: "https://www.kospo.co.kr/bbs/kospo/95/109904/artclView.do",
    },
    {
      id: "seoul-fintech-lab-2025",
      image: "/images/resources/news/seoul-fintech-lab-2025.webp",
      imageAlt: "Seoul Fintech Lab logo",
      imageCredit: "Seoul Fintech Lab",
      imageSourceUrl: "https://www.vtimes.kr/news/photo/202506/52458_29037_522.jpg",
      visibility: "published",
      publishedAt: "2025-06-20",
      category: "Company",
      title: "ERUTY Selected as a Seoul Fintech Lab Membership Company",
      summary:
        "ERUTY was selected as a new Seoul Fintech Lab membership company for the first half of 2025, gaining access to global expansion, investment, and fintech growth support.",
      publisher: "Venture Times",
      sourceUrl: "https://www.vtimes.kr/news/articleView.html?idxno=52458",
    },
    {
      id: "busan-xr-metaverse-ir-award",
      image: "/images/resources/news/busan-xr-metaverse-ir-award.webp",
      imageAlt: "Award recipients at the Busan XR and Metaverse IR round",
      imageCredit: "Image provided by ERUTY",
      imageSourceUrl: "https://www.eruty.co.kr/images/news/news_meta_wide.png",
      visibility: "published",
      publishedAt: "2024-12-19",
      category: "Award",
      title: "ERUTY Wins an Excellence Award at the Busan XR and Metaverse IR Round",
      summary:
        "ERUTY received an Excellence Award after presenting its blockchain-based technology for content copyright protection, distribution management, and revenue settlement.",
      publisher: "Asia Economy",
      sourceUrl: "https://www.asiae.co.kr/article/2024121914023843998",
    },
  ],
} satisfies Record<"ko" | "en", readonly NewsItem[]>;
