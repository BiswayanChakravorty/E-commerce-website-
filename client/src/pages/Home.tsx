import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  MoveUpRight,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";

const ASSETS = {
  sketch: "/manus-storage/craft-process-1_dea3d763.png",
  hands: "/manus-storage/craft-process-2_d1bb2ce9.png",
  board: "/manus-storage/craft-process-3_5141f7a7.png",
  detail: "/manus-storage/craft-process-4_a61f230a.png",
  finished: "/manus-storage/craft-process-5_c2fe8b58.png",
};

const WHATSAPP_NUMBER = "919876543210";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const collection = [
  {
    number: "01",
    name: "Wildflower No. 01",
    story: "A study in abundance — petals, curls and the unhurried rhythm of a garden in bloom.",
    image: ASSETS.finished,
    position: "center 48%",
    className: "collection-card--tall",
  },
  {
    number: "02",
    name: "Quiet Tangle",
    story: "Fine lines find each other in the dark, then disappear into a single glint of gold.",
    image: ASSETS.detail,
    position: "center 46%",
    className: "collection-card--offset",
  },
  {
    number: "03",
    name: "The First Line",
    story: "The moment a blank surface becomes a promise: every mark is placed by hand.",
    image: ASSETS.sketch,
    position: "center 44%",
    className: "collection-card--small",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function ProcessVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useSpring(useTransform(scrollYProgress, [0.1, 0.78], [0, 1]), {
    stiffness: 80,
    damping: 22,
    mass: 0.8,
  });
  const handsY = useTransform(progress, [0, 0.45, 1], [46, 0, -36]);
  const handsOpacity = useTransform(progress, [0, 0.18, 0.42, 0.78, 1], [0, 1, 1, 0.35, 0]);
  const detailOpacity = useTransform(progress, [0.28, 0.52, 0.88], [0, 1, 1]);
  const detailScale = useTransform(progress, [0.25, 0.8], [0.88, 1]);
  const boardScale = useTransform(progress, [0, 0.85], [0.88, 1]);
  const lineProgress = useTransform(progress, [0.05, 0.93], [0, 1]);

  return (
    <div className="process-visual" ref={ref}>
      <div className="process-visual__eyebrow">
        <span>Scroll to reveal</span>
        <span className="process-visual__line" />
        <span>01—18</span>
      </div>
      <motion.div className="process-board" style={{ scale: boardScale }}>
        <div className="process-board__halo" />
        <img className="process-board__base" src={ASSETS.board} alt="Black circular art board with a floral engraving" />
        <svg className="process-board__wire" viewBox="0 0 600 600" aria-hidden="true">
          <defs>
            <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <motion.path
            d="M145 218 C192 143 260 132 284 177 C304 214 266 240 225 220 C186 201 163 228 169 272 C177 333 251 347 270 290 C290 230 350 190 399 223 C447 256 421 310 384 325 C345 342 311 310 325 277 C341 238 392 238 437 276 C485 318 466 397 408 431 C354 463 294 443 266 408 C231 363 188 391 181 427"
            fill="none"
            stroke="#d6aa63"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#goldGlow)"
            style={{ pathLength: lineProgress }}
          />
          <motion.path
            d="M116 308 C140 342 142 387 175 408 C208 429 245 420 251 386 C257 352 229 332 201 341"
            fill="none"
            stroke="#f1d69c"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: lineProgress }}
          />
        </svg>
        <motion.div className="process-hand process-hand--left" style={{ y: handsY, opacity: handsOpacity }}>
          <img src={ASSETS.hands} alt="Hands guiding wire across the engraved board" />
        </motion.div>
        <motion.div className="process-detail" style={{ opacity: detailOpacity, scale: detailScale }}>
          <img src={ASSETS.detail} alt="Close detail of wire and hand tools" />
        </motion.div>
        <div className="process-board__caption">
          <span>Hand-finishing</span>
          <span>One surface / one story</span>
        </div>
      </motion.div>
      <motion.div className="process-progress" style={{ scaleX: lineProgress }} />
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = `Hello Golden Wire Studio, I'm ${name || "interested in a bespoke piece"}. My WhatsApp number is ${phone || "not provided"}. I'd love to create something unique.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <main className="site-shell">
      <header className={`site-header ${menuOpen ? "site-header--open" : ""}`}>
        <button className="brand-mark" onClick={() => scrollToId("top")} aria-label="Back to top">
          <span className="brand-mark__symbol">G</span>
          <span className="brand-mark__word">Golden Wire<br /><em>Studio</em></span>
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <button onClick={() => scrollToId("process")}>The process</button>
          <button onClick={() => scrollToId("collection")}>The collection</button>
          <button onClick={() => scrollToId("inquiry")}>Commission</button>
        </nav>
        <button className="header-cta" onClick={() => scrollToId("inquiry")}>
          <span>Book your piece</span><ArrowUpRight size={15} />
        </button>
        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <button onClick={() => { scrollToId("process"); setMenuOpen(false); }}>The process <ArrowDownRight size={16} /></button>
            <button onClick={() => { scrollToId("collection"); setMenuOpen(false); }}>The collection <ArrowDownRight size={16} /></button>
            <button onClick={() => { scrollToId("inquiry"); setMenuOpen(false); }}>Commission <ArrowDownRight size={16} /></button>
          </nav>
        )}
      </header>

      <section className="hero-section" id="top">
        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="hero-copy">
          <motion.p className="kicker" initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.6, delay: 0.15 }}>
            Handcrafted wall art / New Delhi
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.8, delay: 0.25 }}>
            18 hours.<br /><i>One piece.</i><br />Never again.
          </motion.h1>
          <motion.p className="hero-description" initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.7, delay: 0.45 }}>
            Precision hand-engraved wall art with golden wire accents. Each one is a bespoke creation — never replicated.
          </motion.p>
          <motion.div className="hero-actions" initial="hidden" animate="visible" variants={reveal} transition={{ duration: 0.7, delay: 0.58 }}>
            <button className="button button--gold" onClick={() => scrollToId("inquiry")}>
              Book your piece <ArrowUpRight size={17} />
            </button>
            <button className="text-link" onClick={() => scrollToId("process")}>
              See the making <span className="text-link__circle"><ChevronDown size={14} /></span>
            </button>
          </motion.div>
          <motion.div className="hero-footnote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.7 }}>
            <span>01</span><span className="hero-footnote__rule" /><span>Limited by hand, not by edition</span>
          </motion.div>
        </div>
        <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
          <div className="hero-art__frame">
            <img src={ASSETS.finished} alt="Finished black floral wall art with golden wire" />
            <div className="hero-art__veil" />
            <div className="hero-art__label hero-art__label--top">No. 01 / 1 of 1</div>
            <div className="hero-art__label hero-art__label--bottom">Wildflower Study<br /><span>black board / brass wire</span></div>
          </div>
          <div className="hero-art__orbit hero-art__orbit--one" />
          <div className="hero-art__orbit hero-art__orbit--two" />
          <span className="hero-art__side-note">The finished gesture</span>
        </motion.div>
        <div className="hero-scroll-note"><span>Scroll</span><span className="hero-scroll-note__line" /></div>
      </section>

      <section className="manifesto-section">
        <div className="section-index">/ 00</div>
        <motion.p className="manifesto-copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={reveal} transition={{ duration: 0.8 }}>
          <span>Every piece</span> begins with a quiet surface and a single line. What follows is a slow conversation between the hand, the tool and the wire.
        </motion.p>
        <div className="manifesto-aside">
          <span className="manifesto-aside__dot" />
          <p>Objects for rooms<br />with a point of view.</p>
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="section-heading section-heading--process">
          <div className="section-index">/ 01</div>
          <div>
            <p className="kicker">The making</p>
            <h2>A line, held<br /><i>for 18 hours.</i></h2>
          </div>
          <p className="heading-note">There is no shortcut to a surface that feels alive. Follow the slow work behind every piece.</p>
        </div>
        <div className="process-layout">
          <div className="process-sticky-copy">
            <div className="process-sticky-copy__top">
              <span className="process-number">01—18</span>
              <span className="process-status"><span /> In progress</span>
            </div>
            <h3>Trace.<br />Shape.<br /><em>Finish.</em></h3>
            <p>From the first engraving to the last glint of brass, nothing is rushed and nothing is repeated.</p>
            <div className="process-stats">
              <div><strong>18</strong><span>hours of hand-work</span></div>
              <div><strong>1/1</strong><span>never made twice</span></div>
            </div>
          </div>
          <ProcessVisual />
        </div>
        <div className="process-milestones">
          <div><span>01</span><strong>Hour 1—6</strong><p>Hand-engraving the design into a quiet, black surface.</p></div>
          <div><span>02</span><strong>Hour 7—18</strong><p>Golden wire finds every line, following the original gesture.</p></div>
          <div><span>03</span><strong>Final frame</strong><p>One piece. Never repeated. Ready to find its wall.</p></div>
        </div>
      </section>

      <section className="collection-section" id="collection">
        <div className="collection-topline"><span>/ 02</span><span>Selected works / 2024—25</span><span>View all <ArrowUpRight size={14} /></span></div>
        <div className="collection-intro">
          <div><p className="kicker">The collection</p><h2>Limited<br /><i>by hand.</i></h2></div>
          <p>Small, singular studies made for the in-between spaces — the corners you return to, the walls you remember.</p>
        </div>
        <div className="collection-grid">
          {collection.map((item, index) => (
            <motion.article className={`collection-card ${item.className}`} key={item.number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.22 }} variants={reveal} transition={{ duration: 0.7, delay: index * 0.1 }}>
              <div className="collection-card__image-wrap"><img src={item.image} alt={item.name} style={{ objectPosition: item.position }} /><div className="collection-card__veil" /><span className="collection-card__tag">Bespoke creation</span><span className="collection-card__arrow"><ArrowUpRight size={18} /></span></div>
              <div className="collection-card__meta"><span>{item.number} / 1 of 1</span><span>₹ 4,990</span></div>
              <h3>{item.name}</h3><p>{item.story}</p>
            </motion.article>
          ))}
        </div>
        <div className="collection-footer"><span>More pieces are made quietly.</span><button className="text-link" onClick={() => scrollToId("inquiry")}>Ask about a commission <span className="text-link__circle"><ArrowUpRight size={14} /></span></button></div>
      </section>

      <section className="works-section">
        <div className="works-image"><img src={ASSETS.hands} alt="Maker hands working on the art board" /><div className="works-image__stamp">Made slowly<br /><span>in India</span></div></div>
        <div className="works-copy"><p className="kicker">The philosophy</p><h2>Made for the<br /><i>long look.</i></h2><p className="works-copy__body">A Golden Wire piece does not ask to be understood all at once. It catches the light differently in the morning. It reveals another small decision as you pass by.</p><div className="works-signature">G / <span>Golden Wire Studio</span></div></div>
      </section>

      <section className="steps-section">
        <div className="section-index">/ 03</div>
        <div className="steps-heading"><p className="kicker">How it works</p><h2>From first note<br /><i>to final wall.</i></h2></div>
        <div className="steps-grid">
          <div className="step-card"><span className="step-card__number">01</span><MessageCircle size={21} strokeWidth={1.5} /><h3>Inquiry</h3><p>Tell us what you’re imagining over WhatsApp. A wall, a feeling, a story — start anywhere.</p><span className="step-card__foot">Message first</span></div>
          <div className="step-card"><span className="step-card__number">02</span><Sparkles size={21} strokeWidth={1.5} /><h3>Booking</h3><p>Once the direction is right, reserve your one-of-one piece with a simple payment link.</p><span className="step-card__foot">₹ 459 / ₹ 499 booking</span></div>
          <div className="step-card"><span className="step-card__number">03</span><Clock3 size={21} strokeWidth={1.5} /><h3>Handcrafted</h3><p>Allow 5–7 working days for the making, then we’ll send it carefully toward its new home.</p><span className="step-card__foot">Made to order</span></div>
        </div>
      </section>

      <section className="inquiry-section" id="inquiry">
        <div className="inquiry-noise" />
        <div className="inquiry-heading"><p className="kicker">The next piece</p><h2>Make room for<br /><i>something singular.</i></h2><p>Every piece is made-to-order. Let’s create something unique for your wall.</p></div>
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <label><span>Your name</span><input name="name" placeholder="How should we call you?" required /></label>
          <label><span>WhatsApp number</span><input name="phone" type="tel" placeholder="+91 00000 00000" required /></label>
          <button className="button button--gold button--wide" type="submit"><MessageCircle size={17} /> {submitted ? "Message ready — open WhatsApp" : "Start the conversation"} <ArrowUpRight size={17} /></button>
          <div className="form-note"><Check size={13} /> No catalogue. No repeats. Just a thoughtful first conversation.</div>
        </form>
        <div className="inquiry-contact"><span>Prefer email?</span><a href="mailto:hello@goldenwire.studio"><Mail size={14} /> hello@goldenwire.studio <ArrowUpRight size={13} /></a></div>
      </section>

      <footer className="site-footer">
        <div className="footer-brand"><span className="brand-mark__symbol">G</span><p>Golden Wire<br /><em>Studio</em></p></div>
        <p className="footer-note">One piece. Forever unique.<br />New Delhi, India</p>
        <div className="footer-links"><a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram</a><button onClick={() => scrollToId("top")}>Back to top <ArrowUpRight size={14} /></button></div>
        <p className="footer-copyright">© 2025 Golden Wire Studio</p>
      </footer>
    </main>
  );
}
