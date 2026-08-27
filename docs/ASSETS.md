# Generated visual assets — where they live and how to install them

All visuals were generated in the business's Higgsfield account (they also
appear under **Generations** at higgsfield.ai). The current, brand-matched
set (chrome/blue, generated 2026-08-27) is below. The hero video download
link is added once rendering finishes — check the latest commit of this file
or the Higgsfield Generations page.

| Asset | Destination in repo | Download |
|---|---|---|
| Hero video v2 (12s, 1080p, blue blend + logo ending) | `assets-source/hero.mp4` | [hero.mp4](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260827_051342_81ba9817-0753-441f-8260-1ec7bd201602.mp4) |
| Social banner with logo | `assets-source/og.png` | [og](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260827_051201_63f9749c-fa5a-47dd-99e4-66573d561b54.png) |
| Patio space | `assets-source/spaces/patio.png` | [patio](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260827_051201_067a4dbf-8057-4a46-a6e2-59a15d5b8153.png) |
| Showroom space | `assets-source/spaces/showroom.png` | [showroom](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260827_051201_25ac0455-4331-4ef4-8133-64d9fbe8f9ef.png) |
| Basement space | `assets-source/spaces/basement.png` | [basement](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260827_051201_e455e505-3023-4a15-a527-18453583451b.png) |
| Base floor v2 (reference) | not used on site | [base v2](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260827_050933_69dd55dc-338d-48e4-89ee-e0156e94540d.png) |
| Exploded layers v2 (reference) | not used on site | [exploded v2](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260827_051201_7c1b1e7b-29f8-4ad3-bbd9-d02bf63e17dd.png) |

Finish-selector variants (from the first generation round — the garage
environment differs slightly from base v2 but is internally consistent
across all five, which is what the selector needs):

| Finish | Destination | Download |
|---|---|---|
| Tuxedo | `assets-source/finishes/tuxedo.png` | [tuxedo](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052051_d123e8cf-204b-4342-bd71-1e9693011f01.png) |
| Gravel | `assets-source/finishes/gravel.png` | [gravel](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052051_e88b6a59-bbbc-4602-befc-1da3347dbb8c.png) |
| Saddle | `assets-source/finishes/saddle.png` | [saddle](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052051_58d1e9fc-68ee-4cc4-8004-b975627640d0.png) |
| Outback | `assets-source/finishes/outback.png` | [outback](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052051_5187fed4-330f-4bfd-ac63-5caeac325419.png) |
| Slate Metallic | `assets-source/finishes/slate-metallic.png` | [slate-metallic](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052051_188eda5d-b0f5-42d9-9b3c-9bd3fc69c304.png) |

Superseded (copper-era, kept for reference): the 2026-08-26 hero video and
base/exploded stills in the Higgsfield Generations history.

## Installing them

Put the files at the destinations above (create `assets-source/`,
`assets-source/finishes/`, `assets-source/spaces/`), then run:

```
node scripts/ingest-assets.mjs
```

That extracts `public/frames/frame_XXXX.jpg` (24fps, 1920px, JPEG q3) from
hero.mp4, copies `public/hero.mp4`, `public/finishes/`, `public/spaces/`,
and `public/og.jpg`, updates `FRAME_COUNT` in `lib/heroFrames.ts`, and
regenerates `content/finishes.json` + `content/spaces.json`. Commit the
result.

**Note for Claude Code sessions:** this repo's cloud environment blocked
`d8j0ntlcm91z4.cloudfront.net` at the network policy level. Either run the
download in an environment that allows that host, or have the files
committed via the GitHub web UI, then run the ingest script.

The logo is the client's real mark (committed at `public/logo.png`,
`public/logo-mark.png`, `app/icon.png`) — never replace it with an
AI-generated one.
