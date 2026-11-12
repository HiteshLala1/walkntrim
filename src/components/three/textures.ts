import * as THREE from "three";

export function createBrushedSteelRoughnessMap(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#525252";
    ctx.fillRect(0, 0, 256, 256);

    for (let y = 0; y < 256; y++) {
      const shade = 60 + ((y * 17) % 44);
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(0, y, 256, 1);
    }

    for (let i = 0; i < 420; i++) {
      const x = (i * 73) % 256;
      const y = (i * 31) % 256;
      const w = 18 + ((i * 11) % 64);
      const alpha = 0.04 + ((i % 5) * 0.015);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillRect(x, y, w, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;
  return texture;
}

export function createObsidianGrainMap(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#888888";
    ctx.fillRect(0, 0, 128, 128);

    for (let y = 0; y < 128; y += 2) {
      for (let x = 0; x < 128; x += 2) {
        const offset = ((x + y) % 4 === 0 ? 115 : 70);
        ctx.fillStyle = `rgb(${offset},${offset},${offset})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  return texture;
}
