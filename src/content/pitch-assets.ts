// Public presentation assets only. Add the actual 1–5 minute recording before submission.
// For YouTube use its embed URL with kind: "embed"; for an MP4 use kind: "file".
type DemoVideo = { kind: "embed" | "file"; src: string; watchUrl?: string };

export const PITCH_ASSETS = {
  deck: "https://something-claude.my.canva.site/mytor-pitch",
  video: null as DemoVideo | null,
  prototype: "", // Optional external working product; the local UI walkthrough is separate.
};
