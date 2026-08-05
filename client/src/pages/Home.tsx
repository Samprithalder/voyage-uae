/**
 * Voyage UAE — Atlas of Warm Stone.
 * This page follows an editorial travel route with emerald structure, champagne captions, and restrained map-like motion.
 */

import { useMemo, useState, type MouseEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Compass,
  Leaf,
  MapPinned,
  ScanLine,
  Volume2,
} from "lucide-react";
import {
  durationOptions,
  emirateOptions,
  generateItinerary,
  interestOptions,
  type Duration,
  type Emirate,
  type Interest,
} from "../script";
import "../styles.css";
import { getImageUrl } from "../imageLoader";
import BorderGlow from "../components/ui/BorderGlow";
import SpecularButton from "../components/ui/SpecularButton";

type LandmarkTab = "all" | "culture" | "nature" | "modern";

const landmarkCards = [
  {
    image: "/assets/louvre-abu-dhabi.jpg",
    name: "Louvre Abu Dhabi",
    emirate: "Abu Dhabi",
    groups: ["all", "culture", "modern"],
  },
  {
    image: "/assets/al-fahidi.jpg",
    name: "Al Fahidi",
    emirate: "Dubai",
    groups: ["all", "culture"],
  },
  {
    image: "/assets/jebel-jais.jpg",
    name: "Jebel Jais",
    emirate: "Ras Al Khaimah",
    groups: ["all", "nature"],
  },
  {
    image: "/assets/burj-khalifa.jpg",
    name: "Burj Khalifa",
    emirate: "Dubai",
    groups: ["all", "modern"],
  },
  {
    image: "/assets/grand-mosque.jpg",
    name: "Sheikh Zayed Grand Mosque",
    emirate: "Abu Dhabi",
    groups: ["all", "culture"],
  },
];

const tabs: { id: LandmarkTab; label: string }[] = [
  { id: "all", label: "All UAE" },
  { id: "culture", label: "Culture & Heritage" },
  { id: "nature", label: "Nature & Mountains" },
  { id: "modern", label: "Modern Landmarks" },
];

function setSpotlightPosition(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
}

function setMagnetPosition(event: MouseEvent<HTMLButtonElement>) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const x = (event.clientX - rect.left - rect.width / 2) * 0.1;
  const y = (event.clientY - rect.top - rect.height / 2) * 0.1;
  button.style.setProperty("--magnet-x", `${x}px`);
  button.style.setProperty("--magnet-y", `${y}px`);
}

function resetMagnetPosition(event: MouseEvent<HTMLButtonElement>) {
  event.currentTarget.style.setProperty("--magnet-x", "0px");
  event.currentTarget.style.setProperty("--magnet-y", "0px");
}

function RouteRail({ index, title }: { index: string; title: string }) {
  return (
    <aside className="route-rail" aria-hidden="true">
      <span className="section-index">{index}</span>
      <span className="section-name">{title}</span>
      <span className="route-coordinate">Atlas stop {index}</span>
    </aside>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<LandmarkTab>("all");
  const [emirate, setEmirate] = useState<Emirate>("All UAE");
  const [interest, setInterest] = useState<Interest>("Culture & Heritage");
  const [duration, setDuration] = useState<Duration>("3 Days");
  const [itinerary, setItinerary] = useState(() =>
    generateItinerary("All UAE", "Culture & Heritage", "3 Days"),
  );

  const visibleLandmarks = useMemo(
    () => landmarkCards.filter((landmark) => landmark.groups.includes(activeTab)),
    [activeTab],
  );

  const scrollToPlan = () => {
    document.getElementById("plan")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const makeItinerary = () => {
    setItinerary(generateItinerary(emirate, interest, duration));
  };

  return (
    <div className="voyage-page">
      <header className="topbar">
        <div className="shell topbar-inner">
          <a className="brand-lockup" href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="Voyage UAE home">
            <img
              className="brand-mark"
              src="/manus-storage/voyage-uae-logo_8262b330.png"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getImageUrl("/manus-storage/voyage-uae-logo_8262b330.png");
              }}
              alt=""
            />
            <span className="brand-copy">
              <span className="brand-name">Voyage UAE</span>
              <span className="brand-kicker">Travel guide project</span>
            </span>
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#about">About AI</a>
            <a href="#solution">AI solution</a>
            <a href="#impact">UAE impact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <img
            className="hero-media"
            src="/manus-storage/voyage-uae-hero-placeholder_7bdb7c31.jpg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = getImageUrl("/manus-storage/voyage-uae-hero-placeholder_7bdb7c31.jpg");
            }}
            alt="Desert dunes, modern UAE architecture, city skyline, and distant mountains"
          />
          <div className="hero-overlay" />
          <div className="shell hero-inner">
            <div className="hero-content">
              <span className="eyebrow">AI Tourism Assistant</span>
              <h1>
                Voyage <span>UAE</span>
              </h1>
              <p className="hero-tagline">
                Explore landmarks, culture, and nature across all seven Emirates.
              </p>
              <div className="hero-actions">
                <SpecularButton
                  onClick={scrollToPlan}
                  size="lg"
                  baseColor="#064E3B"
                  lineColor="#F8E7C9"
                  textColor="#F8E7C9"
                  radius={999}
                >
                  Start Exploring
                  <ArrowDownRight size={17} strokeWidth={2.2} className="ml-2 inline-block" />
                </SpecularButton>
              </div>
              <div className="hero-badges" aria-label="Project tags">
                <span className="tag-badge">#Travel</span>
                <span className="tag-badge">#UAE</span>
                <span className="tag-badge">#Vision2071</span>
              </div>
            </div>

            <aside className="student-card" aria-label="Student project information">
              <span className="route-kicker">Project profile</span>
              <h2>Student details</h2>
              <dl className="student-list">
                <div>
                  <dt>Student name</dt>
                  <dd>Samprit Halder</dd>
                </div>
                <div>
                  <dt>Grade &amp; section</dt>
                  <dd>Grade 9 - C</dd>
                </div>
                <div>
                  <dt>Roll number</dt>
                  <dd>23</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <div className="route-story">
          <section className="shell route-section" id="about" data-route="24.4539° N · 54.3773° E">
            <RouteRail index="01" title="About AI" />
            <div className="section-content">
              <div className="section-heading">
                <span className="eyebrow">A simple helping hand</span>
                <h2>A clearer way to feel at home in a new place.</h2>
                <p>
                  This project uses simple AI ideas to help visitors understand places, find their way, and spend more time enjoying the UAE.
                </p>
              </div>
              <div className="overview-layout">
                <BorderGlow
                  className="spotlight-card-glow"
                  backgroundColor="#064E3B"
                  glowColor="40 80 80"
                  colors={["#F8E7C9", "#d4af8f", "#064E3B"]}
                  borderRadius={16}
                >
                  <div className="p-8">
                    <span className="route-kicker text-[#F8E7C9]">Plain-language explanation</span>
                    <h3 className="text-[#F8E7C9] text-4xl font-serif mt-2 mb-4 font-medium">A travel guide for the small things that matter.</h3>
                    <p className="text-[#fffaf0] leading-relaxed text-base font-medium">
                      It does not replace a guide or a good plan. It gives visitors useful information in a clear, quick way when they are finding their bearings.
                    </p>
                  </div>
                </BorderGlow>
                <div className="ai-points">
                  {["Language Translation", "Location Suggestions", "Photo Identification"].map((title, i) => (
                    <BorderGlow
                      key={title}
                      className="ai-point-glow"
                      backgroundColor="rgba(255, 252, 248, 0.75)"
                      glowColor="40 80 80"
                      colors={["#d4af8f", "#064E3B", "#F8E7C9"]}
                      borderRadius={14}
                    >
                      <div className="p-5">
                        <strong className="block text-[#064E3B] font-black text-base">{title}</strong>
                        <p className="text-[#4a5a52] text-sm mt-2 font-medium">
                          {i === 0 && "Translates signs and guide text into different languages."}
                          {i === 1 && "Recommends nearby places based on what a visitor likes to see."}
                          {i === 2 && "Recognizes famous landmarks when a visitor takes a picture."}
                        </p>
                      </div>
                    </BorderGlow>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="shell route-section" aria-labelledby="landmark-heading" data-route="25.2048° N · 55.2708° E">
            <RouteRail index="02" title="Landmarks" />
            <div className="section-content">
              <div className="section-heading">
                <span className="eyebrow">A route through the country</span>
                <h2 id="landmark-heading">From old neighbourhoods to mountain roads, every stop has a story.</h2>
              </div>
              <div className="topic-tabs" role="tablist" aria-label="Filter landmarks by topic">
                {tabs.map((tab) => (
                  <button
                    className="tab-button"
                    data-active={activeTab === tab.id}
                    key={tab.id}
                    role="tab"
                    type="button"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="landmark-grid" role="tabpanel">
                {visibleLandmarks.map((landmark, index) => (
                  <BorderGlow
                    key={landmark.name}
                    className="landmark-card-glow"
                    backgroundColor="#fffcf8"
                    glowColor="40 80 80"
                    colors={["#d4af8f", "#064E3B", "#F8E7C9"]}
                    borderRadius={16}
                  >
                    <article className="landmark-card h-full border-0 shadow-none">
                      <span className="image-ordinal">Route stop {String(index + 1).padStart(2, "0")}</span>
                      <img
                        className="landmark-image"
                        src={landmark.image}
                        alt={landmark.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = getImageUrl(landmark.image);
                        }}
                      />
                      <div className="landmark-caption">
                        <span className="tiny-note">{landmark.emirate}</span>
                        <strong>{landmark.name}</strong>
                      </div>
                    </article>
                  </BorderGlow>
                ))}
              </div>
            </div>
          </section>

          <section className="shell route-section" id="problem" data-route="25.3573° N · 55.4033° E">
            <RouteRail index="03" title="The problem" />
            <div className="section-content">
              <div className="section-heading">
                <span className="eyebrow">Travel can be difficult at first</span>
                <h2>A visitor should spend the day seeing places, not searching for the way.</h2>
              </div>
              <div className="problem-grid">
                {[
                  { num: "01", title: "Unfamiliar transit routes", desc: "Getting confused by unfamiliar transit routes can take time away from sightseeing." },
                  { num: "02", title: "Busy attractions", desc: "Long lines during busy hours can make popular places less enjoyable for visitors." },
                  { num: "03", title: "Hidden cultural places", desc: "Historic cultural spots outside the main city hubs can be easy to miss without a guide." }
                ].map((item) => (
                  <BorderGlow
                    key={item.num}
                    className="problem-card-glow"
                    backgroundColor="rgba(255, 252, 248, 0.85)"
                    glowColor="40 80 80"
                    colors={["#d4af8f", "#064E3B", "#F8E7C9"]}
                    borderRadius={16}
                  >
                    <article className="content-card problem-card border-0 shadow-none h-full">
                      <span className="problem-number">{item.num}</span>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </article>
                  </BorderGlow>
                ))}
              </div>
            </div>
          </section>

          <section className="shell route-section" id="solution" data-route="25.7895° N · 55.9432° E">
            <RouteRail index="04" title="AI solution" />
            <div className="section-content">
              <div className="section-heading">
                <span className="eyebrow">A thoughtful travel plan</span>
                <h2>A calm guide for the small decisions along the way.</h2>
              </div>
              <div className="solution-grid">
                <article className="solution-card" data-note="Guide tool">
                  <Volume2 size={21} strokeWidth={1.8} aria-hidden="true" />
                  <span className="solution-number">01</span>
                  <h3>Live Audio Translator</h3>
                  <p>Helps visitors understand signs and listen to guides in a language that feels familiar.</p>
                </article>
                <article className="solution-card" data-note="Guide tool">
                  <ScanLine size={21} strokeWidth={1.8} aria-hidden="true" />
                  <span className="solution-number">02</span>
                  <h3>Best-Time Visitor Tracker</h3>
                  <p>Suggests quieter times to visit popular spots and helps travellers plan around busy hours.</p>
                </article>
              </div>

              <div className="itinerary-shell" id="plan">
                <div className="itinerary-inner">
                  <div className="itinerary-form-area">
                    <span className="route-kicker">Interactive feature</span>
                    <h3>UAE Itinerary Generator</h3>
                    <p>Pick a place and a travel mood, then sketch a day that makes sense.</p>
                    <div className="itinerary-form">
                      <label>
                        <span className="field-label">1. Emirate</span>
                        <select
                          className="select-control"
                          value={emirate}
                          onChange={(event) => setEmirate(event.target.value as Emirate)}
                        >
                          {emirateOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span className="field-label">2. Interest</span>
                        <select
                          className="select-control"
                          value={interest}
                          onChange={(event) => setInterest(event.target.value as Interest)}
                        >
                          {interestOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span className="field-label">3. Trip duration</span>
                        <select
                          className="select-control"
                          value={duration}
                          onChange={(event) => setDuration(event.target.value as Duration)}
                        >
                          {durationOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </label>
                      <SpecularButton
                        onClick={makeItinerary}
                        size="md"
                        baseColor="#064E3B"
                        lineColor="#F8E7C9"
                        textColor="#F8E7C9"
                        radius={999}
                        className="w-full mt-4"
                      >
                        Generate Itinerary
                        <ArrowRight size={16} strokeWidth={2.2} className="ml-2 inline-block" />
                      </SpecularButton>
                    </div>
                  </div>

                  <div className="itinerary-result" aria-live="polite">
                    <span className="route-kicker">Suggested route</span>
                    <h3>{itinerary.title}</h3>
                    <p>{itinerary.summary}</p>
                    <div className="itinerary-list">
                      {itinerary.stops.map((stop, index) => (
                        <article className="itinerary-stop" key={`${stop.name}-${index}`}>
                          <span className="stop-time">Day {stop.day} · {stop.timing}</span>
                          <div className="stop-info">
                            <strong>{stop.name}</strong>
                            <span>{stop.emirate}</span>
                            <p>{stop.note}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="shell route-section" id="impact" data-route="25.1288° N · 56.3265° E">
            <RouteRail index="05" title="UAE impact" />
            <div className="section-content">
              <div className="section-heading">
                <span className="eyebrow">Why this project matters</span>
                <h2>Good journeys help visitors understand the country with care.</h2>
              </div>
              <div className="impact-grid">
                {[
                  { icon: <Leaf size={18} strokeWidth={1.8} />, title: "Responsible travel", desc: "Encourages visitors to choose thoughtful routes and appreciate natural and cultural places with care." },
                  { icon: <MapPinned size={18} strokeWidth={1.8} />, title: "Local culture", desc: "Helps tourists learn about traditional UAE culture and history beyond the main city attractions." },
                  { icon: <Compass size={18} strokeWidth={1.8} />, title: "Smart services", desc: "Supports the national goal of building smart digital services for Vision 2071." }
                ].map((item, i) => (
                  <BorderGlow
                    key={i}
                    className="impact-card-glow"
                    backgroundColor="rgba(255, 252, 248, 0.85)"
                    glowColor="40 80 80"
                    colors={["#d4af8f", "#064E3B", "#F8E7C9"]}
                    borderRadius={16}
                  >
                    <article className="impact-card border-0 shadow-none h-full">
                      <span className="impact-symbol">{item.icon}</span>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </article>
                  </BorderGlow>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="closing-section" id="conclusion">
          <div className="shell closing-inner">
            <div className="closing-copy">
              <span className="eyebrow">Conclusion</span>
              <h2>Voyage UAE turns “Where do we go next?” into a simple, thoughtful route.</h2>
              <p>
                By bringing translation, helpful suggestions, and a clear travel plan into one place, the project helps visitors spend less time feeling lost and more time learning about the UAE.
              </p>
            </div>
            <img
              className="closing-mark"
              src="/manus-storage/voyage-uae-logo_8262b330.png"
              onError={(e) => {
                (e.target as HTMLImageElement).src = getImageUrl("/manus-storage/voyage-uae-logo_8262b330.png");
              }}
              alt=""
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <p className="footer-label">Voyage UAE · Grade 9 AI Project</p>
          <p>A simple travel app helping visitors explore landmarks across the UAE.</p>
        </div>
      </footer>
    </div>
  );
}
