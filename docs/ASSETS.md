# Generated visual assets — where they live and how to install them

All hero/finish visuals were generated in the business's Higgsfield account
on 2026-08-26 (they also appear under **Generations** at higgsfield.ai).
Direct download links:

| Asset | Destination in repo | Download |
|---|---|---|
| Hero video (12s, 1080p) | `assets-source/hero.mp4` | [hero.mp4](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052108_9e6ccfff-9105-47c1-9b44-a48c5ea4bdd0.mp4) |
| Tuxedo finish | `assets-source/finishes/tuxedo.jpg` | [tuxedo](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052051_d123e8cf-204b-4342-bd71-1e9693011f01.png) |
| Gravel finish | `assets-source/finishes/gravel.jpg` | [gravel](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052051_e88b6a59-bbbc-4602-befc-1da3347dbb8c.png) |
| Saddle finish | `assets-source/finishes/saddle.jpg` | [saddle](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052051_58d1e9fc-68ee-4cc4-8004-b975627640d0.png) |
| Outback finish | `assets-source/finishes/outback.jpg` | [outback](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052051_5187fed4-330f-4bfd-ac63-5caeac325419.png) |
| Slate Metallic finish | `assets-source/finishes/slate-metallic.jpg` | [slate-metallic](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_052051_188eda5d-b0f5-42d9-9b3c-9bd3fc69c304.png) |
| Base floor (reference) | not used on site | [base](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_051259_ff1f527a-f372-4d5f-87b8-13de4b76dbec.png) |
| Exploded layers (reference) | not used on site | [exploded](https://d8j0ntlcm91z4.cloudfront.net/user_3Bk0VmEE1F1oHhl3J1J9LrV5LNO/hf_20260826_051754_be408811-addb-4d00-aad6-baf9e08cfd06.png) |

## Installing them

Once the files are in `assets-source/` (and `assets-source/finishes/`), run:

```
node scripts/ingest-assets.mjs
```

That extracts the hero frames into `public/frames/`, copies
`public/hero.mp4` and `public/finishes/`, updates `FRAME_COUNT`, and
regenerates `content/finishes.json`. Then commit `public/` and the two
updated files. (Convert the finish PNGs to JPG first if you want smaller
pages — `ffmpeg -i in.png -q:v 3 out.jpg` — or just keep `.png` filenames
and the script will use those.)

**Note for Claude Code sessions:** this repo's cloud environment blocked
`d8j0ntlcm91z4.cloudfront.net` at the network policy level. Either run the
download in an environment that allows that host, or have the files
committed via the GitHub web UI, then run the ingest script.

The logo is intentionally NOT generated — use the client's real, approved
logo file only.
