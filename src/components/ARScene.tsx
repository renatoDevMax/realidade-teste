const container = document.getElementById("ar-container");
if (container) {
  // Atualiza o CSS para melhor alinhamento horizontal
  const style = document.createElement("style");
  style.textContent = `
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
    }
    .a-canvas {
      width: 100vw !important;
      height: 100vh !important;
    }
    .arjs-video {
      position: fixed !important;
      top: 0 !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      height: 100vh !important;
      width: 100vw !important;
      max-width: none !important;
      object-fit: cover !important;
    }
  `;
  document.head.appendChild(style);

  // ... rest of the container code ...

  // Ajustar vídeo após carregar
  const scene = container.querySelector("a-scene");
  scene?.addEventListener("loaded", () => {
    console.log("Scene loaded");
    const video = document.querySelector(".arjs-video");
    if (video instanceof HTMLVideoElement) {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const videoWidth = window.innerHeight * aspectRatio;
      video.style.width = `${videoWidth}px`;
      video.style.height = `${window.innerHeight}px`;
    }
  });

  // Ajustar quando a orientação mudar
  window.addEventListener("resize", () => {
    const video = document.querySelector(".arjs-video");
    if (video instanceof HTMLVideoElement) {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const videoWidth = window.innerHeight * aspectRatio;
      video.style.width = `${videoWidth}px`;
      video.style.height = `${window.innerHeight}px`;
    }
  });
}
