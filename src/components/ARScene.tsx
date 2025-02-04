"use client";

import { useEffect, useRef } from "react";

export default function ARScene() {
  const sceneInitialized = useRef(false);

  useEffect(() => {
    if (sceneInitialized.current) return;
    sceneInitialized.current = true;

    const loadAR = async () => {
      try {
        // Remover scripts existentes primeiro
        const existingScripts = document.querySelectorAll(
          "script[data-ar-script]"
        );
        existingScripts.forEach((script) => script.remove());

        // Carregar A-Frame primeiro
        const aframe = document.createElement("script");
        aframe.src = "https://aframe.io/releases/1.3.0/aframe.min.js";
        aframe.dataset.arScript = "aframe";
        document.head.appendChild(aframe);

        await new Promise((resolve) => {
          aframe.onload = resolve;
        });

        await new Promise((resolve) => setTimeout(resolve, 100));

        // Então carregar AR.js
        const arjs = document.createElement("script");
        arjs.src =
          "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js";
        arjs.dataset.arScript = "arjs";
        document.head.appendChild(arjs);

        await new Promise((resolve) => {
          arjs.onload = resolve;
        });

        await new Promise((resolve) => setTimeout(resolve, 100));

        const container = document.getElementById("ar-container");
        if (container) {
          container.innerHTML = `
            <a-scene
              embedded
              arjs='sourceType: webcam; debugUIEnabled: true; detectionMode: mono_and_matrix; matrixCodeType: 3x3; sourceWidth: 1280; sourceHeight: 960; displayWidth: 1280; displayHeight: 960;'
              renderer='antialias: true; alpha: true;'
              vr-mode-ui='enabled: false'
            >
              <a-marker
                preset='hiro'
                smooth='true'
                smoothCount='5'
                smoothTolerance='0.01'
                smoothThreshold='2'
              >
                <a-box
                  position='0 0.5 0'
                  scale='1 1 1'
                  material='color: red; opacity: 0.9;'
                  animation='property: rotation; to: 0 360 0; dur: 2000; easing: linear; loop: true'
                ></a-box>
              </a-marker>
              <a-entity camera></a-entity>
            </a-scene>
          `;

          // Ajustar o tamanho do vídeo para mobile
          const adjustVideoSize = () => {
            const video = container.querySelector("video");
            if (video) {
              const isMobile = /iPhone|iPad|iPod|Android/i.test(
                navigator.userAgent
              );
              if (isMobile) {
                video.style.objectFit = "cover";
                video.style.width = "100vw";
                video.style.height = "100vh";
                video.style.transform = "none";
              }
            }
          };

          // Debug listeners
          const scene = container.querySelector("a-scene");
          scene?.addEventListener("loaded", () => {
            console.log("Scene loaded");
            adjustVideoSize();
          });

          const marker = container.querySelector("a-marker");
          marker?.addEventListener("markerFound", () =>
            console.log("Marker found")
          );
          marker?.addEventListener("markerLost", () =>
            console.log("Marker lost")
          );

          // Ajustar quando a orientação mudar
          window.addEventListener("orientationchange", adjustVideoSize);
        }
      } catch (error) {
        console.error("Error initializing AR:", error);
      }
    };

    loadAR();

    return () => {
      window.removeEventListener("orientationchange", () => {});
      const scripts = document.querySelectorAll("script[data-ar-script]");
      scripts.forEach((script) => script.remove());

      const container = document.getElementById("ar-container");
      if (container) container.innerHTML = "";
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
        zIndex: 1000,
        overflow: "hidden",
      }}
    />
  );
}
