// src/data/skillData.js
// `where` is evidence, not a rating. A self-assigned level ("Advanced") is a
// claim a reviewer cannot check; the project it was used on is one they can.
// Same discipline as the diff in a case study: cite, don't assert.
//
// An empty `where` renders as just the name. That is deliberate — a skill with
// nothing on this site to point at should look quieter than one with three
// projects behind it.
export const skills = [
  {
    id: 1,
    category: "Languages",
    items: [
      { name: "Java", where: "Webcam Painter" },
      { name: "C", where: "Nugget Game" },
      { name: "JavaScript", where: "DartBid, TripPlan, Harmonize, this site" },
      { name: "Python", where: "Skinfluence, DartBid" },
      { name: "SQL", where: "DartBid (MySQL), ZebraMD (Postgres)" },
      { name: "VHDL", where: "VGA Pet Rock" },
      { name: "Kotlin", where: "OnCue" },
      { name: "HTML", where: "this site, DartBid, Harmonize" },
      { name: "CSS", where: "this site, DartBid, Harmonize" },
      { name: "R", where: "" },
    ],
  },
  {
    id: 2,
    category: "Frameworks & Tools",
    items: [
      { name: "React", where: "DartBid, TripPlan, Harmonize, this site" },
      { name: "Vivado", where: "VGA Pet Rock" },
      { name: "MongoDB", where: "Harmonize" },
      { name: "Git", where: "" },
      { name: "PyTorch", where: "" },
      { name: "Flutter", where: "" },
    ],
  },
  {
    id: 3,
    category: "General",
    items: [
      { name: "Artificial Intelligence", where: "Fuse AI, ZebraMD, Ask-in-Context" },
      { name: "Full-Stack Development", where: "ZebraMD, DartBid, TripPlan, Harmonize" },
      { name: "Machine Learning", where: "Skinfluence" },
      { name: "Computer-Aided Design", where: "Walking Dino" },
      { name: "VGA Development", where: "VGA Pet Rock" },
      { name: "Graphic Design", where: "" },
    ],
  },
  {
    id: 4,
    category: "Other",
    items: [
      { name: "Dance", where: "11+ years performing" },
      { name: "Piano", where: "ABRSM Grade 8" },
      { name: "Running", where: "varsity in high school" },
      { name: "Ceramics", where: "" },
    ],
  },
];
