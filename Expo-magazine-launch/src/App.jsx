import React, { useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: -Math.random() * 0.3 - 0.1,
      alpha: Math.random() * 0.5 + 0.1,
      gold: Math.random() > 0.7,
    });

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < 90; i++) particles.push(createParticle());
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(209,169,58,${p.alpha})`
          : `rgba(255,255,255,${p.alpha * 0.5})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.y < -4) {
          const np = createParticle();
          p.x = np.x;
          p.y = canvas.height + 4;
          p.r = np.r;
          p.dx = np.dx;
          p.dy = np.dy;
          p.alpha = np.alpha;
          p.gold = np.gold;
        }
      }

      rafId = requestAnimationFrame(drawParticles);
    };

    init();
    drawParticles();

    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Particle canvas */}
      <canvas id="particles" ref={canvasRef} />

      <div className="bg-glow" />

      {/* Dim backdrop for transition */}
      <div className="backdrop" id="backdrop" />

      {/* ═══ PRE-LAUNCH SCREEN ═══ */}
      <div className="stage" id="preLaunch">
        <div className="logo">
          <img className="logo-img" src="EXPO LOGO 21.png" alt="Exposition Logo" />
          <span className="logo-sub">
            The Magazine that Bridges Management &amp; IT
          </span>
          <div className="logo-divider" />
        </div>

        {/* ✅ MAGAZINE ANIMATION (same feel as mic) */}
        <div className="mag-wrapper">
          {/* Left waves */}
          <div className="side-waves left" aria-hidden="true">
            <div className="s-bar" />
            <div className="s-bar" />
            <div className="s-bar" />
            <div className="s-bar" />
            <div className="s-bar" />
          </div>

          {/* Magazine icon */}
          <div className="mag-icon" aria-hidden="true">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* open magazine */}
              <path d="M12 20c-2.2-1.5-4.9-2.2-8-2.2V6.8c3.1 0 5.8.7 8 2.2" />
              <path d="M12 20c2.2-1.5 4.9-2.2 8-2.2V6.8c-3.1 0-5.8.7-8 2.2" />
              <path d="M12 9v11" />

              {/* small magazine lines */}
              <path d="M6.8 10.4h2.6" />
              <path d="M6.8 13h2.6" />
              <path d="M14.6 10.4h2.6" />
              <path d="M14.6 13h2.6" />
            </svg>
          </div>

          {/* Right waves */}
          <div className="side-waves right" aria-hidden="true">
            <div className="s-bar" />
            <div className="s-bar" />
            <div className="s-bar" />
            <div className="s-bar" />
            <div className="s-bar" />
          </div>
        </div>

        <h1 className="headline">
          The Official <em>E-Magazine</em> is here.
        </h1>

        <p className="tagline">
          Conversations that bridge Management IT expert insights, inspiring
          stories, and ideas that matter.
        </p>

        <button
          className="launch-btn"
          id="launchBtn"
          onClick={() => {
            const btn = document.getElementById("launchBtn");
            const pre = document.getElementById("preLaunch");
            const bd = document.getElementById("backdrop");
            const success = document.getElementById("successScreen");

            if (!btn || !pre || !bd || !success) return;

            btn.disabled = true;

            // fade out pre-launch
            pre.style.opacity = "0";
            pre.style.transform = "scale(0.96)";
            bd.classList.add("dim");

            // confetti burst (same logic)
            const fireConfetti = () => {
              const colors = [
                "#f1b759",
                "#d1a93a",
                "#fff",
                "#aa7d39",
                "#fde68a",
                "#fbbf24",
              ];
              for (let i = 0; i < 50; i++) {
                const dot = document.createElement("div");
                dot.className = "confetti-dot";
                dot.style.cssText = `
                  left: ${Math.random() * 100}vw;
                  top: ${Math.random() * 60}vh;
                  background: ${colors[Math.floor(Math.random() * colors.length)]};
                  animation-duration: ${0.9 + Math.random() * 0.8}s;
                  animation-delay: ${Math.random() * 0.5}s;
                  width: ${4 + Math.random() * 8}px;
                  height: ${4 + Math.random() * 8}px;
                  border-radius: ${Math.random() > 0.5 ? "50%" : "2px"};
                `;
                document.body.appendChild(dot);
                setTimeout(() => dot.remove(), 2000);
              }
            };

            setTimeout(() => {
              pre.style.display = "none";
              fireConfetti();
              success.classList.add("visible");
            }, 450);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          <span id="btnText">Launch Now</span>
          <div className="btn-ring" id="btnRing" />
        </button>

        {/* Partner logos */}
        <div className="footer-bar">
          <img src="IMSSA.png" alt="MIT IT · imssa · University of Kelaniya" />
        </div>
      </div>

      {/* ═══ SUCCESS SCREEN ═══ */}
      <div id="successScreen">




        <h2 className="success-title">The Official</h2>
        <div className="success-sub">
          <span className="gold">E-Magazine</span>
        </div>

        <h2
          className="success-title"
          style={{
            fontSize: "clamp(2.2rem,5vw,4rem)",
            marginBottom: "32px",
          }}
        >
          Launched <span className="gold">Successfully</span>
        </h2>

        <div className="wave-row">
          <div className="w-bar" />
          <div className="w-bar" />
          <div className="w-bar" />
          <div className="w-bar" />
          <div className="w-bar" />
          <div className="w-bar" />
          <div className="w-bar" />
          <div className="w-bar" />
          <div className="w-bar" />
        </div>

        <p className="success-desc">
          Exposition E Magazine is now live
          bridging Management &amp; IT through compelling conversations and expert insights.
        </p>

        {/* QR Code + URL */}
        <div className="qr-block">
          <img
            src="/qr-code.png"
            alt="QR Code for emagazine.exposition.lk"
            className="qr-img"
          />
          <p className="qr-label">Scan to read the magazine</p>
          <a
            href="https://emagazine.exposition.lk"
            className="qr-url"
            target="_blank"
            rel="noopener noreferrer"
          >
            emagazine.exposition.lk
          </a>
        </div>
      </div>

      <div className="footer-note">
        Exposition E-Magazine — Official Launch
      </div>
    </>
  );
}