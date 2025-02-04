"use client";

import { useEffect } from "react";

export default function ARScene() {
  useEffect(() => {
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

      // Criar a cena AR programaticamente
      const container = document.getElementById("ar-container");
      if (container) {
        container.innerHTML = `
          <a-scene
            embedded
            arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; patternRatio: 0.75;"
            renderer="logarithmicDepthBuffer: true;"
            vr-mode-ui="enabled: false"
          >
            <a-marker preset="hiro" smooth="true" smoothCount="5">
              <a-box
                position="0 0.5 0"
                material="color: red; opacity: 0.9;"
                animation="property: rotation; to: 0 360 0; loop: true; dur: 5000"
              ></a-box>
            </a-marker>
            <a-entity camera></a-entity>
          </a-scene>
        `;
      }
    };

    loadScripts();

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll("script");
      scripts.forEach((script) => {
        if (script.src.includes("aframe") || script.src.includes("ar.js")) {
          script.remove();
        }
      });

      // Limpar o container
      const container = document.getElementById("ar-container");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      id="ar-container"
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
