import html2canvas from 'html2canvas';
import { mysticAudio } from './mysticAudio';

// Injects the SVG filters into the DOM if they don't exist
const injectSVGFilters = () => {
  if (document.getElementById('reality-warp-filters')) return;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, 'svg');
  svg.id = 'reality-warp-filters';
  svg.style.position = 'absolute';
  svg.style.width = '0';
  svg.style.height = '0';
  
  // Shatter / Glass Fracture filter
  svg.innerHTML = `
    <defs>
      <filter id="shatter-glass" x="-20%" y="-20%" width="140%" height="140%">
        <!-- Generate cellular/fractal noise for glass shards -->
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise" />
        
        <!-- Animate the noise scale over time to 'shatter' -->
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -10" in="noise" result="highContrastNoise" />
        <feDisplacementMap in="SourceGraphic" in2="highContrastNoise" scale="0" xChannelSelector="R" yChannelSelector="G" result="displaced">
          <animate attributeName="scale" values="0;200;500" dur="1s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
        </feDisplacementMap>
        <feGaussianBlur in="displaced" stdDeviation="0" result="blurred">
          <animate attributeName="stdDeviation" values="0;20;50" dur="1s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
        </feGaussianBlur>
      </filter>
    </defs>
  `;
  document.body.appendChild(svg);
};

export const triggerRealityWarp = async (toggleCallback) => {
  injectSVGFilters();
  mysticAudio.playShatter(); // Play high-pitch glass breaking sound

  // 1. Take snapshot of current UI
  const canvas = await html2canvas(document.body, {
    useCORS: true,
    scale: 1, // keep it low-res for performance, we are shattering it anyway
    logging: false,
    ignoreElements: (element) => element.classList.contains('sentient-fab') // don't capture things that move too fast
  });

  // 2. Style canvas to cover screen
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '999999';
  canvas.style.pointerEvents = 'none';
  canvas.style.transition = 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1)';
  
  // Apply the SVG shatter filter
  canvas.style.filter = 'url(#shatter-glass)';
  
  // 3. Mount overlay
  document.body.appendChild(canvas);

  // 4. Toggle the actual theme in the background
  toggleCallback();

  // 5. Trigger animation
  requestAnimationFrame(() => {
    // We need to re-trigger the animate tag in the SVG
    const animateTags = document.querySelectorAll('#reality-warp-filters animate');
    animateTags.forEach(tag => tag.beginElement());
    
    // Fade out canvas
    canvas.style.opacity = '0';
    
    // 6. Cleanup
    setTimeout(() => {
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }, 1100);
  });
};
