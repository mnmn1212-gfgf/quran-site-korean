import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#D4AF37";
const CTA_DARK = "#0F172A";

const OUTER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(12,18,38,0.96)_0%,rgba(112,28,50,0.92)_52%,rgba(212,175,55,0.78)_100%)]";
const INNER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(12,18,38,0.96)_0%,rgba(112,28,50,0.92)_52%,rgba(212,175,55,0.78)_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.2, 0.45, 0.2],
  scale: [1, 1.03, 1],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass =
  `border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_12px_30px_rgba(0,0,0,0.24)]`;
const softCard = `rounded-[2rem] ${glass}`;
const gradientOuterCard = `rounded-[2rem] border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_8px_22px_rgba(0,0,0,0.14)]`;

const navItems = [
  { label: "소개", href: "#about" },
  { label: "특징", href: "#features" },
  { label: "우리의 작업", href: "#portfolio" },
  { label: "성공 파트너", href: "#partners" },
  { label: "문의하기", href: "#contact" },
];

const stats = [
  { value: "+100", label: "지원 대상 글로벌 언어" },
  { value: "24/7", label: "지속적인 글로벌 도달" },
  { value: "114", label: "완전한 수라" },
  { value: "HQ", label: "고품질 오디오 및 비주얼" },
];

const heroCards = [
  { value: "114", label: "완전한 수라" },
  { value: "30", label: "꾸란 30주즈" },
  { value: "완성도 높음", label: "시청각 프레젠테이션" },
];

const heroBadges = [
  { icon: Sparkles, title: "꾸란의 빛과 아름다움" },
  { icon: Globe, title: "세계를 향한 메시지" },
];

const identityCards = [
  {
    icon: Users,
    title: "소개",
    text: "Sana는 꾸란의 의미를 전 세계에 전하기 위한 와크프 프로젝트입니다. 아름다운 낭송과 정확한 번역을 결합한 오디오·비주얼 채널을 통해, 하나님의 말씀을 세계 여러 언어로 사람들의 마음에 더 가깝게 전하는 통합적이고 깊이 있는 신앙 경험을 제공합니다.",
  },
  {
    icon: Eye,
    title: "비전",
    text: "아름다움, 완성도, 현대 기술을 결합한 세련된 방식으로 모든 사람에게 그의 언어로 꾸란의 의미를 전하는 세계적인 선도 플랫폼이 되는 것입니다.",
  },
  {
    icon: Target,
    title: "미션",
    text: "번역된 오디오·비주얼 꾸란 콘텐츠를 제공하여 꾸란의 의미를 쉽고 명확하게 이해할 수 있도록 하고, 감동적이고 매력적인 방식으로 인도와 하나님의 말씀을 세상에 전합니다.",
  },
];

const features = [
  {
    icon: Languages,
    title: "다국어 번역",
    desc: "의미와 메시지를 충실히 반영하는 명확하고 정확한 방식으로, 각 민족의 언어로 꾸란의 의미를 전달합니다.",
  },
  {
    icon: Headphones,
    title: "통합 오디오·비주얼 경험",
    desc: "감동적인 낭송과 번역 자막을 결합하여, 꾸란의 위엄에 어울리는 차분한 경험을 제공합니다.",
  },
  {
    icon: Globe,
    title: "지속적인 세계 확산",
    desc: "디지털 및 위성 플랫폼을 통해 전 세계 여러 대륙과 플랫폼에서 24시간 접근할 수 있습니다.",
  },
  {
    icon: HeartHandshake,
    title: "하나님을 위한 와크프",
    desc: "전 세계를 향한 다와 메시지로, 이를 전파하거나 지원하거나 혜택을 받는 모든 이가 그 보상에 함께합니다.",
  },
];

const channels = [
  {
    icon: Radio,
    title: "위성 및 라디오 채널",
    desc: "여러 민족에게 그들의 언어로 도달하는 오디오·비주얼 채널을 통해 꾸란의 의미를 전합니다.",
  },
  {
    icon: MonitorPlay,
    title: "소셜 미디어 및 웹사이트",
    desc: "계속 새로워지는 디지털 존재감으로 꾸란 콘텐츠에 쉽게 접근하고 널리 확산할 수 있습니다.",
  },
  {
    icon: Layers3,
    title: "다양한 앱과 디지털 미디어",
    desc: "다양한 기기와 플랫폼에 맞는 방식으로 꾸란 콘텐츠를 따라갈 수 있는 현대적이고 다양한 경험을 제공합니다.",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "샤리아 기관 및 이슬람 단체",
    desc: "공인된 꾸란 의미 번역을 제공하는 데 기여하여 정확성과 샤리아적 근거를 보장한 기관들입니다.",
  },
  {
    icon: Mic2,
    title: "감동적인 목소리의 낭송자들",
    desc: "경건하고 감동적인 낭송으로 프로젝트를 풍성하게 하여, 친근하고 매력적인 방식으로 사람들의 마음에 다가간 이들입니다.",
  },
  {
    icon: Headphones,
    title: "오디오 및 기술 제작사",
    desc: "고품질 녹음과 전문적인 오디오·비주얼 후처리를 제공한 회사들입니다.",
  },
  {
    icon: Users,
    title: "프로듀서와 자원봉사자",
    desc: "콘텐츠 개발과 배포에 기여하여 전 세계 최대한 많은 사람들에게 도달하도록 도운 이들입니다.",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "글로벌 도달",
    desc: "꾸란의 메시지는 여러 언어로 전 세계 여러 나라의 가정에 닿아, 사람들에게 그들의 모국어로 다가갑니다.",
  },
  {
    icon: Languages,
    title: "신뢰할 수 있는 번역",
    desc: "의미의 정확성을 보장하기 위해 신뢰할 수 있는 학술 기관의 감독 아래 정확한 꾸란 의미 번역이 제공되었습니다.",
  },
  {
    icon: Headphones,
    title: "완성도 높은 경험",
    desc: "경건한 낭송과 시각 번역을 결합한 콘텐츠로, 감동적이면서 이해하기 쉬운 신앙 경험을 제공합니다.",
  },
  {
    icon: Send,
    title: "계속 이어지는 메시지",
    desc: "이 프로젝트는 다양한 계층에 도달하는 현대적인 방식으로 인도를 전하고 하나님의 말씀을 세상에 소개하는 데 기여합니다.",
  },
];

const portfolioVideos = [
  `${import.meta.env.BASE_URL}videos/v1.mp4`,
  `${import.meta.env.BASE_URL}videos/v2.mp4`,
  `${import.meta.env.BASE_URL}videos/v3.mp4`,
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] px-4 py-2.5 text-xs font-semibold ${textColor} backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] px-5 py-3 text-base font-bold backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.14)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: ACCENT }}
    >
      <Icon className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT +
          mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [HALF_BARS, MAX_BAR_HEIGHT, MIN_BAR_HEIGHT, idleBars, isPlaying, isMobile]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className="mt-5 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.94)_0%,rgba(112,28,50,0.88)_52%,rgba(212,175,55,0.22)_100%)] p-3 sm:p-4">
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-white/10 bg-black/10 px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-[linear-gradient(180deg,#0C1226_0%,#701C32_52%,#D4AF37_100%)] opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] text-white transition hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
          aria-label={isPlaying ? "일시 정지" : "재생"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] text-white transition hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
          aria-label="뒤로 이동"
        >
          <SkipBack className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] text-white transition hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
          aria-label="다시 재생"
        >
          <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] text-white transition hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
          aria-label="앞으로 이동"
        >
          <SkipForward className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] text-white transition hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
          aria-label="오디오"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]">
          <div
            className="absolute inset-y-0 right-0 rounded-full bg-[linear-gradient(135deg,#0C1226_0%,#701C32_52%,#D4AF37_100%)]"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.32)_100%)] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D4AF37]/12">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.94)_0%,rgba(112,28,50,0.88)_52%,rgba(212,175,55,0.22)_100%)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.32)_100%)] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D4AF37]/12">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.94)_0%,rgba(112,28,50,0.88)_52%,rgba(212,175,55,0.22)_100%)] px-4 py-4 text-white/80 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-4 sm:p-5`}
    >
      <div className="h-full rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.32)_100%)] px-4 py-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#D4AF37]/12">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.94)_0%,rgba(112,28,50,0.88)_52%,rgba(212,175,55,0.22)_100%)] px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({
  video,
  index,
  isMobile,
  videoId,
  registerVideo,
  unregisterVideo,
  requestExclusivePlay,
}) {
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    registerVideo(videoId, element);

    const onLoaded = () => {
      setDuration(element.duration || 0);
      setIsReady(true);
    };

    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);

    const onPlay = () => {
      requestExclusivePlay(videoId);
      setIsPlaying(true);
    };

    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("canplay", onLoaded);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);

    return () => {
      unregisterVideo(videoId);
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("canplay", onLoaded);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
    };
  }, [registerVideo, requestExclusivePlay, unregisterVideo, videoId]);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    requestExclusivePlay(videoId);
    el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      playVideo();
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    requestExclusivePlay(videoId);
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} p-3 sm:p-4`}
    >
      <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[rgba(7,11,22,0.82)]">
        <video
          ref={videoRef}
          src={video}
          className="aspect-video w-full object-cover"
          playsInline
          preload="auto"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-[rgba(12,18,38,0.24)] transition hover:bg-[rgba(12,18,38,0.16)]"
            aria-label="동영상 재생"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] backdrop-blur-md shadow-[0_0_22px_rgba(16,185,129,0.16)] sm:h-18 sm:w-18">
              <Play className="mr-1 h-7 w-7 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-[rgba(12,18,38,0.72)] px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
          {isReady ? "재생 전 미리보기가 표시됩니다" : "미리보기를 준비 중입니다"}
        </div>
      </div>

      <div className="mt-4 rounded-[1.3rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.94)_0%,rgba(112,28,50,0.88)_52%,rgba(212,175,55,0.22)_100%)] p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] text-white transition hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
            aria-label="음소거 또는 음소거 해제"
          >
            <Volume2
              className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] text-white transition hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
            aria-label="다시 재생"
          >
            <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] text-white transition hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
            aria-label={isPlaying ? "일시 정지" : "재생"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" style={{ color: ACCENT }} />
            ) : (
              <Play className="h-4 w-4" style={{ color: ACCENT }} />
            )}
          </button>

          <div className="min-w-[52px] text-xs text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]">
            <div
              className="absolute inset-y-0 right-0 rounded-full bg-[linear-gradient(135deg,#0C1226_0%,#701C32_52%,#D4AF37_100%)]"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const videoElementsRef = useRef({});

  const registerVideo = (videoId, element) => {
    videoElementsRef.current[videoId] = element;
  };

  const unregisterVideo = (videoId) => {
    delete videoElementsRef.current[videoId];
  };

  const requestExclusivePlay = (activeVideoId) => {
    Object.entries(videoElementsRef.current).forEach(([videoId, element]) => {
      if (videoId !== String(activeVideoId) && element && !element.paused) {
        element.pause();
      }
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        dir="ltr"
        className="relative min-h-screen overflow-hidden bg-transparent text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(112,28,50,0.18),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(25,35,68,0.22),transparent_26%),linear-gradient(180deg,#070B16_0%,#0D1326_45%,#180E1A_100%)]" />

        {!isMobile && (
          <>
            <motion.div
              className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#D4AF37]/16 blur-3xl"
              animate={pulseGlow}
            />
            <div className="absolute inset-0 opacity-[0.06]">
              <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>
          </>
        )}

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.5rem] px-3 py-3 sm:rounded-[2rem] sm:px-4 ${glass}`}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#D4AF37]/30 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] shadow-[0_0_20px_rgba(212,175,55,0.18)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="Sana Quran Channels 로고"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-wide sm:text-xl">
                  Sana Quran Channels
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] px-4 py-2 text-sm font-medium text-white/85 transition hover:border-[#D4AF37]/40 hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] hover:text-[#F8E7A1]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div className={`mt-3 rounded-[1.4rem] p-3 md:hidden sm:rounded-[1.6rem] sm:p-4 ${glass}`}>
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] px-4 py-3 text-sm text-white/85 sm:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="order-1 lg:order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] px-4 py-2 text-xs backdrop-blur-md sm:text-sm"
                style={{ color: ACCENT }}
              >
                <Stars className="h-4 w-4" style={{ color: ACCENT }} />
                <span>Sana... A Message to the Worlds</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-3xl font-black leading-[1.25] sm:text-5xl lg:text-7xl"
              >
                <span className="block bg-[linear-gradient(135deg,#F8E7A1_0%,#D4AF37_48%,#FFF3C4_100%)] bg-clip-text text-transparent">
                  Sana Quran Channels
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl"
              >
                전 세계 모든 언어를 위한 꾸란 의미 번역 오디오·비주얼 채널 - 하나님을 위한 와크프.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_8px_20px_rgba(8,8,32,0.24)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    backgroundColor: CTA_DARK,
                    borderColor: "rgba(243,231,179,0.18)",
                    color: ACCENT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: ACCENT }}
                  />
                  플랫폼 둘러보기
                </a>

                <a
                  href="https://www.youtube.com/channel/UCjOCIOWXc0yrmrOvs1b6oJQ"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15 sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" />
                  우리 채널 방문하기
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="rounded-3xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] p-3 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:p-4"
                  >
                    <div className="text-xl font-black sm:text-2xl" style={{ color: ACCENT }}>
                      {item.value}
                    </div>
                    <div className="mt-2 text-xs text-white/70 sm:text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative lg:order-2"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={isMobile ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className={`relative mx-auto max-w-2xl p-3 sm:p-4 ${softCard}`}
              >
                <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.30)_100%)] p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-white/60 sm:text-sm">현재 언어</p>
                      <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                        아랍어 꾸란
                      </h3>
                    </div>
                    <div className="w-fit rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/16 px-4 py-2 text-xs text-[#F8E7A1] sm:text-sm">
                      라이브 방송
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.96)_0%,rgba(112,28,50,0.90)_52%,rgba(212,175,55,0.24)_100%)] p-4 sm:mt-8 sm:p-6">
                    <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                      <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-[#F8E7A1] sm:mt-0" />
                      <span>꾸란 의미의 시각적 표시와 함께 낭송을 들어보세요</span>
                    </div>

                    {!isMobile && (
                      <div className="space-y-3">
                        {[65, 88, 42].map((w, idx) => (
                          <motion.div
                            key={idx}
                            animate={{ width: [`${w - 14}%`, `${w}%`, `${w - 8}%`] }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-3 rounded-full bg-[linear-gradient(135deg,#0C1226_0%,#701C32_52%,#D4AF37_100%)]"
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8 sm:gap-3">
                      {heroCards.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] p-3 sm:p-4"
                        >
                          <div className="text-sm font-bold sm:text-lg" style={{ color: ACCENT }}>
                            {item.value}
                          </div>
                          <div className="mt-1 text-[11px] text-white/60 sm:text-xs">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <HeroAudioPlayer isMobile={isMobile} />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="w-full rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] px-5 py-4 text-center backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:min-w-[220px] sm:w-auto sm:rounded-[1.6rem]"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                        </div>
                        <div className="text-sm font-bold text-white sm:text-base">{item.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge icon={BookOpen} text="글로벌 꾸란 정체성" />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge icon={Building2} text="실행 및 감독" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${gradientOuterCard}`}
            >
              {!isMobile && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(250,204,21,0.10),transparent_32%)]" />
              )}

              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.94)_0%,rgba(112,28,50,0.88)_52%,rgba(212,175,55,0.20)_100%)] p-4 sm:p-6">
                    <div className="h-full rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] p-4 sm:p-5">
                      <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        신뢰할 수 있는 실행 파트너십
                      </h2>
                      <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                        프로젝트{" "}
                        <span className="font-bold text-white">Sana Quran Channels</span>{" "}
                        는{" "}
                        <span className="font-bold" style={{ color: ACCENT }}>
                          Saudi Jordanian Satellite Broadcasting Company (JASCO)
                        </span>{" "}
                        — based in Amman, Jordan, with leading expertise in media production and broadcasting.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.96)_0%,rgba(112,28,50,0.90)_52%,rgba(212,175,55,0.24)_100%)] p-4 sm:p-6">
                    <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] p-4 sm:p-5">
                      <div className="text-sm text-white/60">공식 웹사이트</div>
                      <div className="mt-2 text-xl font-bold sm:text-2xl">Jasco Media City</div>
                      <a
                        href="https://jascomediacity.net/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/14 px-5 py-3 text-sm text-[#F8E7A1] transition hover:bg-[#D4AF37]/22 sm:text-base"
                      >
                        Jasco 웹사이트 방문
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "플랫폼 특징")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Sana... A Message to the Worlds
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                최신 수단을 활용해 꾸란의 의미를
                전 세계에 전하는 꾸란 플랫폼으로, 샤리아적 기반과 현대 기술을 결합합니다.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "배포 및 도달 채널")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">다양한 채널에서의 존재감</h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "우리의 작업")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">우리 작업의 예시</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                아름다운 꾸란 낭송과 꾸란 구절 의미의 다양한 언어 번역,
                세계를 위한 Sana... A Message to the Worlds.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                  videoId={i}
                  registerVideo={registerVideo}
                  unregisterVideo={unregisterVideo}
                  requestExclusivePlay={requestExclusivePlay}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "프로젝트의 영향")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                프로젝트의 영향과 세계적 확산
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                신뢰할 수 있는 번역을 제공하고 깊은 감동의 경험을 선사한 글로벌 꾸란 메시지로,
                꾸란의 의미가 전 세계 가정에 전달되도록 기여했습니다.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "성공 파트너")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">협력으로 이루어진 성공</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                이 프로젝트의 성공은 여러 뛰어난 기관들의 협력 덕분이며, 그중에는
                샤리아 기관, 미디어 기관, 제작사, 그리고 자원봉사자들이 포함됩니다.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] px-5 py-3 text-base font-semibold backdrop-blur-md shadow-[0_6px_16px_rgba(0,0,0,0.12)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: ACCENT }}
                >
                  <Sparkles className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                  <span>문의하기</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/75 sm:text-lg">
                  Sana는 전 세계를 향한 다와 메시지이며, 여러분과 소통하고
                  문의, 제안, 파트너십 요청을 언제든지 명확하고 직접적인 방식으로 받게 되어 기쁩니다.
                </p>
              </div>

              <div
                className={`mt-8 rounded-[2rem] p-4 sm:p-6 md:p-8 ${gradientOuterCard}`}
              >
                <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.96)_0%,rgba(112,28,50,0.90)_52%,rgba(212,175,55,0.24)_100%)] p-4 sm:p-6">
                  <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] p-4 sm:p-5">
                    <div className="mb-4 text-xl font-bold sm:text-2xl">연락하기</div>
                    <div className="space-y-3 text-white/75">
                      <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] px-4 py-3 text-sm sm:text-base">
                        저희 팀은 기꺼이 도와드리며 가능한 한 빠르게 답변드리겠습니다.
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/14 px-4 py-3 text-center text-sm font-semibold text-[#F8E7A1] transition hover:bg-[#D4AF37]/22 sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                        보내기
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div className={`rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 ${glass}`}>
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div
                  className={`rounded-[1.8rem] border border-white/10 p-4 text-center sm:p-6 ${INNER_GRADIENT} flex h-full flex-col items-center justify-center`}
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] shadow-[0_0_18px_rgba(255,255,255,0.06)] backdrop-blur-md sm:h-24 sm:w-24">
                    <img
                      src={sanaLogo}
                      alt="Sana 로고"
                      className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                      Sana Quran Channels
                    </span>
                  </div>

                  <div className="mt-4 text-2xl font-black sm:text-3xl" style={{ color: ACCENT }}>
                    Sana... A Message to the Worlds
                  </div>

                  <p className="mx-auto mt-4 max-w-[30rem] rounded-[1.4rem] border border-white/10 bg-[rgba(38,67,57,0.55)] px-4 py-4 text-sm leading-7 text-white/78 sm:px-5 sm:text-base sm:leading-8">
                    전 세계 모든 언어를 위한 꾸란 의미 번역 오디오·비주얼 채널로, 표현의 아름다움과 의미의 정확성, 메시지의 정신을 결합한 와크프 프로젝트입니다.
                  </p>
                </div>

                <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] p-4 sm:p-5 flex flex-col items-center justify-center text-center">
                  <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
                      <MessageCircle className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <span>상세 정보</span>
                  </div>

                  <div className="w-full space-y-4 text-white/72">
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className="flex items-center justify-center gap-3 break-all rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.94)_0%,rgba(112,28,50,0.88)_52%,rgba(212,175,55,0.20)_100%)] px-4 py-3 text-sm transition hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)] sm:text-base"
                    >
                      <Mail className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      snachannel159@gmail.com
                    </a>

                    <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.94)_0%,rgba(112,28,50,0.88)_52%,rgba(212,175,55,0.20)_100%)] px-4 py-3 text-sm sm:text-base">
                      <MapPin className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      암만 - 요르단
                    </div>
                  </div>

                  <div className="mt-6 w-full rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.94)_0%,rgba(112,28,50,0.88)_52%,rgba(212,175,55,0.20)_100%)] p-4">
                    <a
                      href="http://facebook.com/people/%EC%82%AC%EB%82%98%ED%95%9C%EA%B5%AD%EC%96%B4/61586818682642/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
                    >
                      <Globe className="h-4 w-4" style={{ color: ACCENT }} />
                      페이스북에서 팔로우하기
                    </a>

                    <p className="mt-4 text-center text-sm leading-6 text-white/70">
                      지금 꾸란 여정을 시작하세요
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.96)_0%,rgba(112,28,50,0.92)_52%,rgba(212,175,55,0.78)_100%)] p-4 backdrop-blur-md sm:p-5 flex flex-col items-center justify-center text-center">
                  <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] shadow-[0_8px_18px_rgba(0,0,0,0.14)]">
                      <Link2 className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <span>앱 링크</span>
                  </div>

                  <div className="w-full rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.94)_0%,rgba(112,28,50,0.88)_52%,rgba(212,175,55,0.20)_100%)] p-4">
                    <p className="mb-4 text-sm leading-7 text-white/65">
                      앱을 다운로드하고 공식 플랫폼을 통해 꾸란 콘텐츠를 쉽게 이용해 보세요.
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] p-4 transition hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#D4AF37]/12 text-white">
                            <GooglePlayIcon />
                          </div>
                          <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                            Google Play
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-[1.3rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.88)_0%,rgba(112,28,50,0.82)_52%,rgba(212,175,55,0.22)_100%)] p-4 transition hover:-translate-y-0.5 hover:bg-[linear-gradient(135deg,rgba(12,18,38,0.92)_0%,rgba(112,28,50,0.86)_52%,rgba(212,175,55,0.26)_100%)]"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#D4AF37]/12 text-white">
                            <AppStoreIcon />
                          </div>
                          <span className="text-sm font-bold text-white sm:text-base">
                            App Store
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className="mt-5 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,18,38,0.96)_0%,rgba(112,28,50,0.90)_52%,rgba(212,175,55,0.22)_100%)] p-4">
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65">
                        <span>⭐ 평점 4.9</span>
                        <span>🌍 100개국 이상</span>
                      </div>

                      <a
                        href="https://www.youtube.com/channel/UCjOCIOWXc0yrmrOvs1b6oJQ"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/14 py-3 text-sm font-bold text-[#F8E7A1] transition hover:scale-[1.01] hover:bg-[#D4AF37]/22"
                      >
                        <Sparkles className="h-4 w-4" />
                        지금 시작
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-white/55 sm:text-sm">
                모든 권리 보유 © Sana Quran Channels.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}
