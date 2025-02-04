"use client";

import { useEffect, useRef } from "react";

export default function ARScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carrega os scripts necessários dinamicamente
    const loadScripts = async () => {
      const aframeScript = document.createElement("script");
      aframeScript.src = "https://aframe.io/releases/1.4.0/aframe.min.js";
      document.head.appendChild(aframeScript);

      await new Promise((resolve) => (aframeScript.onload = resolve));

      const arjsScript = document.createElement("script");
      arjsScript.src =
        "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js";
      document.head.appendChild(arjsScript);

      await new Promise((resolve) => (arjsScript.onload = resolve));

      // Cria a cena AR após os scripts carregarem
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
            <a-marker preset="hiro">
              <a-box position="0 0.5 0" material="color: red;"></a-box>
            </a-marker>
            <a-entity camera></a-entity>
          </a-scene>
        `;
      }
    };

    loadScripts();

    return () => {
      // Cleanup dos scripts quando o componente for desmontado
      const scripts = document.querySelectorAll("script");
      scripts.forEach((script) => {
        if (script.src.includes("aframe") || script.src.includes("ar.js")) {
          script.remove();
        }
      });

      // Limpa o conteúdo do container
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
