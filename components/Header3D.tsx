"use client";

import { useEffect, useRef } from "react";

export default function Header3D() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const rotateY = ((clientX / innerWidth) - 0.5) * 40;
      const rotateX = ((clientY / innerHeight) - 0.5) * -40;
      scene.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #faf6f1 0%, #f5ebe0 50%, #efe6d5 100%)" }}>
      
      {/* Texte */}
      <div className="relative z-10 max-w-xl text-center lg:text-left mb-12 lg:mb-0">
        <h1 className="text-5xl lg:text-7xl font-light text-[#2c1810] leading-[1.1] mb-6">
          Ton glow,<br />
          <span className="italic text-[#c9a96e]">sans compromis</span>
        </h1>
        <p className="text-lg text-[#6b5b4f] mb-8 leading-relaxed">
          La beauté naturelle, sublimée par la science. Des soins qui révèlent ton éclat intérieur.
        </p>
        <button className="px-8 py-4 bg-[#2c1810] text-[#faf6f1] rounded-full text-base font-medium
          transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(44,24,16,0.25)]">
          Découvrir la collection
        </button>
      </div>

      {/* Scène 3D */}
      <div className="relative w-[350px] h-[350px] lg:w-[500px] lg:h-[500px] flex items-center justify-center"
        style={{ perspective: "1200px" }}>
        <div ref={sceneRef} className="relative w-full h-full" style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out" }}>
          
          {/* Anneaux orbitaux */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute top-1/2 left-1/2 rounded-full border border-[rgba(201,169,110,0.25)] shadow-[0_0_30px_rgba(201,169,110,0.1),inset_0_0_30px_rgba(201,169,110,0.05)]"
              style={{
                width: `${140 + i * 55}px`,
                height: `${140 + i * 55}px`,
                transform: "translate(-50%, -50%)",
                animation: `orbit${i % 2 === 0 ? 'X' : 'Y'} ${12 + i * 3}s linear infinite`,
              }}
            />
          ))}

          {/* Noyau central */}
          <div className="absolute top-1/2 left-1/2 w-24 h-24 lg:w-32 lg:h-32 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, #fff5e6, #f5e6d3 30%, #e8d5c4 60%, transparent 85%)",
              transform: "translate(-50%, -50%) translateZ(60px)",
              boxShadow: "0 0 80px rgba(201,169,110,0.5), 0 0 160px rgba(201,169,110,0.2), inset 0 0 40px rgba(255,255,255,0.6)",
              animation: "pulse 5s ease-in-out infinite",
            }}
          />

          {/* Particules dorées */}
          {[...Array(15)].map((_, i) => {
            const angle = (i / 15) * Math.PI * 2;
            const radius = 120 + Math.random() * 80;
            return (
              <div key={`p-${i}`} className="absolute w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#c9a96e]"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                  top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                  boxShadow: "0 0 12px rgba(201,169,110,0.9)",
                  animation: `float ${4 + Math.random() * 4}s ease-in-out infinite alternate`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Styles globaux pour les keyframes */}
      <style jsx global>{`
        @keyframes orbitX {
          0% { transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg); }
          100% { transform: translate(-50%, -50%) rotateX(360deg) rotateY(180deg); }
        }
        @keyframes orbitY {
          0% { transform: translate(-50%, -50%) rotateX(0deg) rotateY(0deg); }
          100% { transform: translate(-50%, -50%) rotateX(180deg) rotateY(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) translateZ(60px) scale(1); opacity: 0.9; }
          50% { transform: translate(-50%, -50%) translateZ(60px) scale(1.15); opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateZ(0px) scale(1); opacity: 0.4; }
          100% { transform: translateZ(40px) scale(1.3); opacity: 0.9; }
        }
      `}</style>
    </section>
  );
}