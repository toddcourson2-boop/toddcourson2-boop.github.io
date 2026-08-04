# Eduardo Caride Sato — Portfolio Website V2

A complete static portfolio website for a Senior NetSuite Developer. It is built with plain HTML, CSS, and JavaScript, so there is no framework installation or build step.

## Essential features included

- Modern responsive design for desktop, tablet, and mobile
- Home photo slider
- Personal information directly beneath the hero photo
- Resume image preview modal and PDF download
- Bento-style capabilities section
- Six filterable portfolio case studies with detail modals
- Experience timeline
- Three complete blog articles
- Direct contact-form submission to `eduardo.caride0121@gmail.com`
- Direct-email fallback if the form service is unavailable
- Google Analytics 4 visitor tracking with measurement ID `G-8Z9V5S9VSJ`
- Custom event tracking for resume views/downloads, case studies, filters, contact leads, and booking clicks
- Custom-domain and Netlify-ready files
- Privacy page, 404 page, robots file, sitemap template, and security headers

## 1. Preview locally

From the project folder, run:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## 2. Activate direct contact emails — required once

The contact form uses FormSubmit and is already addressed to:

```text
eduardo.caride0121@gmail.com
```

FormSubmit requires one activation step for a new email address:

1. Publish the website or open it locally.
2. Submit one test message through the contact form.
3. Open `eduardo.caride0121@gmail.com`.
4. Find the activation email from FormSubmit and click the confirmation button.
5. Submit another test message and confirm that it arrives.

Until this one-time confirmation is completed, FormSubmit sends activation requests rather than normal inquiry emails.

## 3. Visitor analytics

The Google Analytics tag is installed on the home page, all blog articles, and the privacy page using:

```text
G-8Z9V5S9VSJ
```

After deployment:

1. Open Google Analytics.
2. Select the property containing this measurement ID.
3. Open **Reports → Realtime**.
4. Visit the published website in a separate browser tab.
5. Realtime activity should appear after the tag loads.

Tracked custom events include:

- `resume_view`
- `resume_download`
- `case_study_view`
- `portfolio_filter`
- `generate_lead`
- `booking_click`
- `contact_form_error`

## 4. Publish so everyone can see it

### Recommended: Netlify

1. Create or sign in to a Netlify account.
2. Choose **Add new project → Deploy manually**.
3. Drag the complete extracted project folder into Netlify.
4. Netlify gives the site a public `netlify.app` address immediately.
5. Test the contact form and analytics on that public address.

The included `netlify.toml` adds common security headers and publishes the current folder without a build command.

## 5. Connect your own domain

A domain must be purchased or already owned. The project cannot purchase a domain automatically.

In Netlify:

1. Open the deployed site.
2. Go to **Domain management**.
3. Choose **Add a domain**.
4. Enter the domain you own.
5. Follow Netlify's DNS instructions at the domain registrar.
6. Wait for DNS verification and HTTPS activation.

After the domain works, replace every `https://YOUR-DOMAIN.com` value in `sitemap.xml` with the real domain. Add the sitemap address to `robots.txt`.

Possible brand-style domain ideas to check with a registrar:

- `eduardocaridesato.com`
- `eduardocaridesato.dev`
- `eduardocaride.com`
- `ecsnetsuite.com`

Domain availability and price must be checked at the time of purchase.

## 6. Required personal updates

### Replace the photo placeholders

Replace:

```text
assets/profile-1.svg
assets/profile-2.svg
assets/profile-3.svg
```

Recommended photo size: **1000 × 1250 pixels**, portrait orientation. JPG, PNG, or WebP files can be used by updating the image paths in `index.html`.

### Replace the booking link

Search `index.html` for:

```text
https://calendly.com/your-profile/30min
```

Replace it with the real Calendly or Google Calendar appointment-schedule URL.

### Confirm the phone number

The website displays `056 1122` exactly as provided. Replace it with a complete international number when available.

## Main files

```text
index.html                  Main portfolio
styles.css                 Complete responsive styling
script.js                  Slider, modals, filters, analytics events, contact form
privacy.html               Privacy information
404.html                   Custom not-found page
netlify.toml               Netlify deployment and security configuration
sitemap.xml                Domain placeholder sitemap
robots.txt                 Search-engine instructions
blog/                      Three complete article pages
assets/                    Resume, preview, portraits, and project artwork
```
