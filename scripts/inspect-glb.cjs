const fs = require("fs");
const P = "C:/Users/kofic/Desktop/oarts/public/wheel.glb";
const buf = fs.readFileSync(P);

const magic = buf.toString("ascii", 0, 4);
const version = buf.readUInt32LE(4);
const total = buf.readUInt32LE(8);
const chunk0Len = buf.readUInt32LE(12);
const jsonStr = buf.toString("utf8", 20, 20 + chunk0Len);
const gltf = JSON.parse(jsonStr);

let min = [Infinity, Infinity, Infinity];
let max = [-Infinity, -Infinity, -Infinity];
let posAccessors = 0;
(gltf.meshes || []).forEach((m) =>
  (m.primitives || []).forEach((p) => {
    const ai = p.attributes && p.attributes.POSITION;
    if (ai == null) return;
    const acc = gltf.accessors[ai];
    if (acc && acc.min && acc.max) {
      posAccessors++;
      for (let i = 0; i < 3; i++) {
        min[i] = Math.min(min[i], acc.min[i]);
        max[i] = Math.max(max[i], acc.max[i]);
      }
    }
  }),
);
const size = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];

let transformed = 0;
(gltf.nodes || []).forEach((n) => {
  if (n.matrix || n.rotation || (n.scale && (n.scale[0] !== 1 || n.scale[1] !== 1 || n.scale[2] !== 1)))
    transformed++;
});

const mats = (gltf.materials || []).map((m) => {
  const pbr = m.pbrMetallicRoughness || {};
  const b = pbr.baseColorFactor || [1, 1, 1, 1];
  return {
    name: m.name,
    base: b.slice(0, 3).map((x) => +Number(x).toFixed(2)),
    alpha: +Number(b[3] ?? 1).toFixed(2),
    metal: pbr.metallicFactor,
    rough: pbr.roughnessFactor,
    baseTex: !!pbr.baseColorTexture,
  };
});

console.log(
  JSON.stringify(
    {
      magic,
      version,
      totalKB: Math.round(total / 1024),
      meshes: (gltf.meshes || []).length,
      nodes: (gltf.nodes || []).length,
      images: (gltf.images || []).length,
      posAccessors,
      rawSize: size.map((x) => +x.toFixed(3)),
      thinnestAxis: ["X", "Y", "Z"][size.indexOf(Math.min(...size))],
      ratio: size.map((x) => +(x / Math.max(...size)).toFixed(2)),
      nodesWithTransform: transformed,
      materials: mats,
    },
    null,
    2,
  ),
);
