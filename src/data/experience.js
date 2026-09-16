// src/data/experience.js
// Roles, newest first. Imported by WorkTimeline and by the landing card count.
export const ITEMS = [
  { id:1, range:"Jun 2026 – Aug 2026",   company:"Visa",              role:"SWE Intern", location:"Foster City, CA",
    bullets:["Shipped Ask-in-Context: a CI pipeline that regenerates developer docs from live code",
             "Built a code knowledge graph that cut inference tokens 12% across 11 repositories"] },
  { id:2, range:"Mar 2026 – Present",   company:"DALI Lab",          role:"Fullstack Developer", location:"Hanover, NH",
    bullets:["Built ZebraMD's clinical assistant on hybrid pgvector + lexical retrieval",
             "Interviewed ~10 patients, then shipped a voice layer for users who can't type"] },
  { id:3, range:"Jan 2026 – Apr 2026",   company:"Siemens EDA",       role:"Engineering Intern", location:"Santa Clara, CA",
    bullets:["Cut irrelevant tool calls 20% across a 500+ tool toolchain in the Fuse API",
             "Wrote CUDA C++ kernels for fuzzy name matching — 3x faster than the CPU baseline"] },
  { id:4, range:"May 2025 – Present",   company:"Harold Edward Cable Makerspace", role:"Trainee", location:"Hanover, NH",
    bullets:["CAD, 3D printing, and laser cutting for mechanical fabrication projects"] },
  { id:5, range:"Jan 2024 – Jan 2025",  company:"Lynch Rocket Lab",   role:"Data Analytics Intern", location:"Hanover, NH",
    bullets:["Regridded sparse ESA Swarm tracks into the continuous maps a 3D ionosphere model needs",
             "Sized nonuniform grids to a 64-CPU run on NASA's Pleiades — 60% less compute time"] },
  { id:6, range:"Jun 2024 – Aug 2024",  company:"INTSIG",             role:"Returning Data Analytics Intern", location:"Shanghai, China",
    bullets:["Benchmarked the product against competitors over 3,000+ cases — 80% less eval time",
             "Turned 10,000+ data points into dashboards that drove leadership's prioritization"] },
  { id:7, range:"Jun 2023 – Aug 2023",  company:"INTSIG",             role:"Data Analytics Intern", location:"Shanghai, China",
    bullets:["First summer on the analytics team: Python and SQL reporting on product usage"] },
];
