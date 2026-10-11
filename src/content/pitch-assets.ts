// Public presentation assets shared by the homepage and demo page.
// For YouTube use its embed URL with kind: "embed"; for an MP4 use kind: "file".
type DemoVideo = { kind: "embed" | "file"; src: string; poster?: string; watchUrl?: string };

export const PITCH_ASSETS = {
  deck: "https://something-claude.my.canva.site/mytor-pitch",
  video: {
    kind: "file",
    src: "/assets/demo/mytor-demo.mp4",
    poster: "/assets/demo/mytor-demo-poster.jpg",
  } as DemoVideo | null,
  prototype: "", // Optional external working product; the local UI walkthrough is separate.
};
