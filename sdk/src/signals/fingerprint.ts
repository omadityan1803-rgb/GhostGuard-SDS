export interface FingerprintFeatures {
  canvasHash: string;       // Unique rendering fingerprint
  webglRenderer: string;    // GPU info
  screenResolution: string;
  timezone: string;
  language: string;
  hardwareConcurrency: number; // CPU cores
  deviceMemory: number;
  touchPoints: number;
  pluginCount: number;
  fontCount: number;        // Estimated via canvas text
}

export async function getFingerprint(): Promise<FingerprintFeatures> {
  // Canvas fingerprint
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.textBaseline = 'alphabetic';
  ctx.font = '14px Arial';
  ctx.fillStyle = '#f60';
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = '#069';
  ctx.fillText('GhostGuard🔒', 2, 15);
  ctx.fillStyle = 'rgba(102,204,0,0.7)';
  ctx.fillText('GhostGuard🔒', 4, 17);
  const canvasHash = canvas.toDataURL().slice(-50); // Last 50 chars as hash

  // WebGL renderer
  let webglRenderer = 'unknown';
  try {
    const gl = document.createElement('canvas').getContext('webgl') as WebGLRenderingContext;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) webglRenderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
  } catch(e) {}

  return {
    canvasHash,
    webglRenderer,
    screenResolution: `${screen.width}x${screen.height}x${window.devicePixelRatio}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: (navigator as any).deviceMemory || 0,
    touchPoints: navigator.maxTouchPoints || 0,
    pluginCount: navigator.plugins?.length || 0,
    fontCount: estimateFontCount(),
  };
}

function estimateFontCount(): number {
  const fonts = ['Arial','Courier','Georgia','Times New Roman','Verdana',
                 'Comic Sans MS','Impact','Trebuchet MS','Palatino'];
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = '72px monospace';
  const baseWidth = ctx.measureText('mmmmmmmmmmlli').width;
  let count = 0;
  for (const font of fonts) {
    ctx.font = `72px '${font}', monospace`;
    if (ctx.measureText('mmmmmmmmmmlli').width !== baseWidth) count++;
  }
  return count;
}
