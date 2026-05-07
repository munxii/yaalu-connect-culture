export type User = {
  id: string;
  name: string;
  nationality: string;
  flag: string;
  university: string;
  major: string;
  year: number;
  mbti: string;
  interests: string[];
  avatar: string;
  isKorean: boolean;
};

const av = (seed: string) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=ffd5dc,ffdfbf,c0aede,b6e3f4`;

export const ME: User = {
  id: "me",
  name: "이은지",
  nationality: "대한민국",
  flag: "🇰🇷",
  university: "경성대학교",
  major: "디지털미디어학과",
  year: 3,
  mbti: "ENFP",
  interests: ["영화", "K-pop", "음식"],
  avatar: av("eunji"),
  isKorean: true,
};

export const USERS: User[] = [
  ME,
  { id: "u2", name: "김민준", nationality: "대한민국", flag: "🇰🇷", university: "경성대", major: "경영학과", year: 3, mbti: "ENTP", interests: ["영화", "게임", "여행"], avatar: av("minjun"), isKorean: true },
  { id: "u3", name: "Linh Nguyen", nationality: "베트남", flag: "🇻🇳", university: "경성대", major: "한국어학과", year: 2, mbti: "INFP", interests: ["K-pop", "음식", "언어교환"], avatar: av("linh"), isKorean: false },
  { id: "u4", name: "Wang Xinyi", nationality: "중국", flag: "🇨🇳", university: "경성대", major: "국제통상학과", year: 3, mbti: "ENFJ", interests: ["영화", "음식", "취업"], avatar: av("xinyi"), isKorean: false },
  { id: "u5", name: "박서연", nationality: "대한민국", flag: "🇰🇷", university: "경성대", major: "영어영문학과", year: 2, mbti: "ISFJ", interests: ["언어교환", "여행", "음식"], avatar: av("seoyeon"), isKorean: true },
  { id: "u6", name: "사토 유키", nationality: "일본", flag: "🇯🇵", university: "경성대", major: "관광경영학과", year: 3, mbti: "INTJ", interests: ["여행", "K-pop", "게임"], avatar: av("yuki"), isKorean: false },
  { id: "u7", name: "Emma Carter", nationality: "미국", flag: "🇺🇸", university: "경성대", major: "국제학부", year: 4, mbti: "ESTP", interests: ["운동", "K-pop", "언어교환"], avatar: av("emma"), isKorean: false },
  { id: "u8", name: "최도현", nationality: "대한민국", flag: "🇰🇷", university: "경성대", major: "신문방송학과", year: 4, mbti: "ENTJ", interests: ["영화", "취업", "운동"], avatar: av("dohyun"), isKorean: true },
];

export const MY_TEAM = [USERS[0], USERS[1], USERS[2], USERS[3]];

export type Quest = {
  id: string;
  track: "kculture" | "general";
  title: string;
  description: string;
  durationMin: number;
  points: number;
  difficulty: 1 | 2 | 3;
  location: string;
  image: string;
  tip: string;
};

export const QUESTS: Quest[] = [
  { id: "q1", track: "kculture", title: "부산국제영화제 동반 관람", description: "BIFF 상영작을 함께 보고 감상을 나눠요. 영화관 입장 → 관람 → 카페에서 짧은 토크.", durationMin: 180, points: 150, difficulty: 3, location: "영화의전당", image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&q=80", tip: "상영 30분 전 모이기" },
  { id: "q2", track: "kculture", title: "감천문화마을 단체 콘텐츠 제작", description: "감천문화마을의 골목을 함께 걸으며 4명이 등장하는 짧은 릴스를 제작해요.", durationMin: 120, points: 200, difficulty: 2, location: "감천문화마을", image: "https://images.unsplash.com/photo-1601370690183-1c7796ecec48?w=800&q=80", tip: "오후 햇살이 가장 예뻐요" },
  { id: "q3", track: "kculture", title: "K-pop 댄스 클래스 함께 참여", description: "서면의 댄스 스튜디오에서 1시간 원포인트 클래스. 함께 영상 촬영.", durationMin: 60, points: 120, difficulty: 2, location: "서면 댄스스튜디오", image: "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=800&q=80", tip: "편한 운동복 필수" },
  { id: "q4", track: "kculture", title: "경성대 학내 공연·전시 단체 관람", description: "캠퍼스 내 진행 중인 공연/전시를 함께 관람하고 인증샷.", durationMin: 90, points: 100, difficulty: 1, location: "경성대 예노소극장", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80", tip: "학생증 지참" },
  { id: "q5", track: "kculture", title: "광안리 야시장 음식 미션", description: "광안리 야시장에서 4개 나라의 음식을 골라 함께 시식하기.", durationMin: 90, points: 130, difficulty: 2, location: "광안리 해변", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80", tip: "현금 챙겨가기" },
  { id: "q6", track: "general", title: "학교 근처 카페에서 나라별 추천 메뉴 교환", description: "각자 자기 나라에서 인기 있는 음료를 추천하고 함께 시도해 봐요.", durationMin: 60, points: 80, difficulty: 1, location: "경성대 인근 카페", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", tip: "사진 4컷 챌린지" },
  { id: "q7", track: "general", title: "함께 식사하며 음식 문화 토론", description: "한 식당에서 식사하며 각 나라의 식문화 차이에 대해 이야기.", durationMin: 90, points: 90, difficulty: 1, location: "남포동", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80", tip: "랜덤 질문 카드 활용" },
  { id: "q8", track: "general", title: "도서관 그룹 스터디", description: "관심 주제 한 가지를 정해 1시간 스터디 + 30분 토론.", durationMin: 120, points: 100, difficulty: 2, location: "경성대 중앙도서관", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80", tip: "노트북/필기구" },
  { id: "q9", track: "general", title: "캠퍼스 사진 챌린지", description: "지정된 5개 장소를 함께 돌며 단체 사진 미션.", durationMin: 60, points: 80, difficulty: 1, location: "경성대 캠퍼스", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", tip: "스마트폰만 있으면 OK" },
  { id: "q10", track: "general", title: "부산 사투리 vs 표준어 vs 외국어 미니 클래스", description: "각자 한 단어씩 가르치는 미니 강의 + 퀴즈.", durationMin: 60, points: 90, difficulty: 1, location: "스터디카페", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", tip: "단어 5개씩 준비" },
];

export type ChatMessage = {
  id: string;
  senderId: string;
  content: string;
  translated?: string;
  time: string;
};

export const CHAT_SEED: ChatMessage[] = [
  { id: "m1", senderId: "u3", content: "안녕하세요! 만나서 반가워요 😊", translated: "Hi everyone! Nice to meet you 😊", time: "14:02" },
  { id: "m2", senderId: "me", content: "Linh 한국어 진짜 잘하시네요!", translated: "Linh, your Korean is amazing!", time: "14:03" },
  { id: "m3", senderId: "u4", content: "감천문화마을 가본 적 없어서 기대돼요", translated: "I've never been to Gamcheon, so excited!", time: "14:05" },
  { id: "m4", senderId: "u2", content: "내일 2시 영화의전당역 1번 출구 어떠세요?", translated: "How about 2pm at BIFF station exit 1 tomorrow?", time: "14:07" },
  { id: "m5", senderId: "u3", content: "좋아요! 사진도 많이 찍어요 📸", translated: "Sounds great! Let's take lots of photos 📸", time: "14:08" },
  { id: "m6", senderId: "u4", content: "👍👍 기대돼요!", translated: "👍👍 Can't wait!", time: "14:09" },
];

export const REWARDS = [
  { tier: "Bronze", title: "제휴 카페 음료 쿠폰", desc: "경성대 인근 제휴 카페에서 사용 가능한 아메리카노 쿠폰", min: 0, color: "from-orange-400 to-amber-600", icon: "☕" },
  { tier: "Silver", title: "한국어·영어 교환 수업 쿠폰", desc: "1:1 언어 교환 4회권", min: 300, color: "from-slate-300 to-slate-500", icon: "💬" },
  { tier: "Gold", title: "경성대 공식 글로컬 인증 배지", desc: "포트폴리오·이력서에 활용 가능한 공식 배지", min: 700, color: "from-yellow-400 to-amber-600", icon: "🏅" },
  { tier: "Platinum", title: "글로컬 앰버서더 임명장", desc: "차년도 학생 홍보대사 자격 + 장학금 추천", min: 1200, color: "from-cyan-300 to-indigo-500", icon: "👑" },
];
