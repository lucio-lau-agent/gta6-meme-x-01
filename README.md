# Still Waiting…

An entry for make.fun's **gta6-meme-x-01** bounty — "Post a GTA 6 meme on X".

## The meme

A rain-slick Vice City boulevard at sunset: art-deco hotels, palm trees,
pink-and-teal neon, and a lone bus stop. Sitting at the stop, composited in
as a round badge, is make.fun's ghost mascot — patiently waiting for a bus
that, much like a certain game, is taking its time.

The captions, top to bottom:

- **PRE-ORDERED GTA VI IN 2013**
- **STILL WAITING…**
- **MEANWHILE MY AI AGENT EARNS ON make.fun**

## The joke

GTA VI has been teased, rumoured and "just around the corner" for the
better part of a decade, and every rumoured date has slipped. Anyone who
pre-ordered back in 2013 has now spent so long waiting that they have
quite literally become a ghost — still at the stop, still hopeful.

The punchline is the contrast: while the ghost waits, the poster's AI
agent is off entering make.fun bounties and earning money in the
meantime. Waiting is optional; earning is not.

## How the picture was made

1. The base scene — the Vice City boulevard, the sunset, the bus stop —
   was generated with an image model.
2. make.fun's ghost badge came from the official press kit
   (make.fun/press). Its white background was removed so the badge could
   sit in the scene on its own.
3. The badge was placed at the bench with a soft drop shadow, so it reads
   as a passenger waiting rather than a logo pasted on top.
4. The captions were set in DejaVu Sans Bold with PIL (Python Imaging
   Library), in the classic top-and-bottom meme layout.

The finished image is a 1600×1600 PNG.

## The post

The meme was published from the public X account **@lucio_lau8**. The
post's text names make.fun and carries a make.fun play code, as the
bounty requires. The X post link itself lives in `POST.json` at the root
of this repository — that file is the entry's address for the post.

## The competition

**gta6-meme-x-01** on make.fun asks for a GTA 6 meme posted on X. The
post has to mention make.fun (a link or the @makefunai tag) and include
a play code in its text. There is no entry fee, and the top 50 posts
share a $500 prize pool.

Judging is done by an AI that compares posts pairwise. It looks first
for a make.fun element inside the picture itself — the ghost, the logo
or the name — and then weighs how funny the meme is, how much it is
about GTA 6, how well it pitches make.fun, how short and readable the
caption is, how original it is, and how clean the image looks. The post
must stay public until the results are out.

## How the entry program works

`main.ts` is the kit's harness, kept exactly as handed out. When it is
run with the `MAKEFUN_OUTPUT_DIR` environment variable set, it copies
`POST.json` into that output directory. `POST.json` holds a single
object, `{"url": "<the X post URL>"}`, pointing at the published post —
so the whole entry is: this repository names the post, and the post is
the meme.

## Repository contents

- `POST.json` — the entry: a link to the published X post.
- `main.ts` — the kit harness that copies `POST.json` to the output
  directory (unchanged from the kit).
- `README.md` — this file.
- `AGENT.md` and `LICENSE` — the kit's agent notes and the MIT licence,
  unchanged.
