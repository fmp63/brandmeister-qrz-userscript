# BrandMeister → QRZ.com

A Safari userscript that redirects clicks on callsigns in the BrandMeister
dashboard straight to the matching QRZ.com profile.

## Background

In amateur radio, the digital mode DMR — and the BrandMeister network in
particular — is very popular. The BrandMeister dashboard lets you filter for
specific talkgroups (e.g. 91, 262) and see the most recently active hams.
Their callsigns are shown, and the server also provides a link for each one.
However, few hams fill in any information behind that link, so it very often
leads to a blank page.

On the other hand, a lot of hams do maintain information about their
equipment, interests, and setup on QRZ.com. It would therefore be handy if a
click in the BrandMeister dashboard took you straight to that ham's QRZ.com
page instead — saving the trouble of looking it up manually on QRZ.com.

This is possible with the Userscripts app: it redirects the call from the
BrandMeister dashboard to QRZ.com. This script provides exactly that
solution, using the Userscripts app.

## Installation

1. Install [Userscripts](https://apps.apple.com/app/userscripts/id1463298887) for Safari
2. In the app, pick a local directory under *Settings → Directory*
3. Place `brandmeister-qrz.user.js` in that directory
4. In Safari, go to *Settings → Extensions → Userscripts* and set the permission
   for `brandmeister.network` to **Allow** (not "Allow for One Day")

## How it works

The script identifies callsigns in three stages:

1. Hash route in the link (`#/profile/DO2BX`) — the current scheme
2. Query parameter `?call=` — legacy
3. Link text matching a callsign pattern — fallback

## Known pitfalls

- **CSP:** brandmeister.network blocks injection into the page context,
  hence `@inject-into content` in the metadata block.
- **iCloud:** If the script directory lives in iCloud Drive, macOS may evict
  the file and the extension can no longer read it.
- **Console logs** from the script only appear in the extension context;
  switch contexts in the bottom right of the Safari console.

## License

MIT
