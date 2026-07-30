# BrandMeister → QRZ.COM

A Safari userscript that redirects clicks on callsigns in the BrandMeister
dashboard straight to the matching QRZ.COM profile.

## Background

In amateur radio, the digital mode DMR — and the BrandMeister network in
particular — is very popular. It offers the very convenient BrandMeister
dashboard [https://brandmeister.network](https://brandmeister.network),
which lets you filter for specific talkgroups (e.g. 91, 262) and see the
most recently active hams. Their callsigns are shown, and the server also
provides a link for each one. However, few hams fill in any information
behind that link, so it very often leads to a blank page with no content.
Here's a typical example of such a page:
![Empty content of link](images/Image_empty.png)

On the other hand, a lot of hams do maintain information about their
equipment, interests, and setup on [QRZ.COM](https://qrz.com). It would
therefore be handy if a click in the BrandMeister dashboard took you
straight to that ham's page on [QRZ.COM](https://qrz.com) instead.

This is possible with the [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
app, which redirects the call's link from the BrandMeister dashboard to
[QRZ.COM](https://qrz.com). This script provides exactly that solution,
using the Userscripts app.

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

## Platform: tested on macOS/Safari, untested on Windows/Linux

The workflow described here — Safari, macOS, the Userscripts app — is the
only one the author has actually tested. There's no equivalent guide for
Windows or Linux, because the author has no test environment for those
platforms.

In principle, the redirect should work there too, since
`brandmeister-qrz.user.js` is plain vanilla JavaScript with no macOS- or
Safari-specific APIs. The obvious route would be a userscript extension for
the respective browser, e.g.:

- **Windows/Linux with Chrome, Edge, or Firefox:** install
  [Tampermonkey](https://www.tampermonkey.net/) or
  [Violentmonkey](https://violentmonkey.github.io/) and add
  `brandmeister-qrz.user.js` there as a new userscript.

One thing that would likely need adjusting: `@inject-into content` is a
quirk of the Safari Userscripts app (quoid), which uses it to distinguish
between the page context and the extension context. Tampermonkey/
Violentmonkey don't recognize this metadata field and control the execution
environment through their own mechanisms (among others, `@grant`/sandbox
settings). Since brandmeister.network enforces a CSP that blocks injection
into the page context (see "Known pitfalls"), it would need to be carefully
checked whether the script automatically runs in the right context there, or
whether an additional setting is required.

Since the author has no way to verify this personally, this section is
speculation based on the respective extensions' documentation — feedback or
pull requests from Windows/Linux users are welcome.

## License

MIT
