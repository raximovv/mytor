# Mytor demo video

The user reviewed the local 90-second English demo and approved adding it to the website after removing the "English demo / first draft" label. That label is absent from all ten scenes and the poster.

- Video: `public/assets/demo/mytor-demo.mp4`, 90 seconds, 1280 x 720, 24 fps, H.264 video and AAC audio.
- Poster: `public/assets/demo/mytor-demo-poster.jpg`.
- Shared player: homepage and `/demo/`, in Uzbek and Russian. Playback uses native controls and starts on user interaction.
- English captions are rendered into the video.

The story covers the oil-change shop's problem, the current interactive prototype, a draft service record, quantity correction and confirmation, the proposed MVP, planned AI features, the six week pilot and the four team roles. Real storage, AI calls and Telegram integrations are described as planned rather than running services. No pilot results or customer counts are invented.

Narration was generated locally with [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M), using its American English `af_heart` voice. The model is distributed under Apache-2.0. The production follows the [Kokoro ONNX runtime example](https://github.com/thewh1teagle/kokoro-onnx/blob/main/examples/with_voice.py).

Prototype imagery comes from actual local Mytor screenshots. The team photos are existing supplied deck assets. Problem photographs retain the credits in `docs/problem-photo-sources.md`. The video has no background music.

Editable scene text, narration segments and the renderer remain locally in `lab/demo-video/`; local tooling and model downloads are not shipped with the website.

## Verification

- Fresh `npm run check`: passed the production build, TypeScript and static checks across 8 HTML pages and 49 files. A stale font build cache was preserved locally before the successful fresh build; font source code is unchanged.
- The full MP4 decodes without audio or video errors. The removed header area is blank in one sample from each of the ten scenes.
- All four exported homepage/demo variants reference the same video and poster. The exported MP4 hash matches the source asset.
- Browser playback loads 90 seconds of media with no player error. Russian demo checks at 320, 768, 1024 and 1440 pixels show no horizontal overflow.
