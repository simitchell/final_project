# Responsive Design Audit — Fox Body Swap Meet Frontend

**Date:** 2026-06-29  
**Scope:** All `.jsx` files under `final_project_frontend/src/`  
**Files audited:** 50  
**Files with issues:** 10  
**Total issues found:** 18

---

## Summary

| Severity | Count | Description |
|----------|-------|-------------|
| Critical | 3 | Will visually break / overflow on any screen narrower than ~650px |
| High | 9 | Layout collapses or clips content on mobile; significant usability impact |
| Medium | 6 | Degrades gracefully but still problematic on small screens |

No issues were found in the route wrapper files (they are thin delegates) or in purely logic/context files.

---

## Findings

### `src/components/GlobalStyles/StyleCard.jsx`

| # | Line(s) | Issue Type | Current Value | Suggested Fix |
|---|---------|------------|---------------|---------------|
| 1 | 23 | **[Critical] Hardcoded px width** | `.card { width: 400px }` | `width: clamp(280px, 90%, 400px)` or use `flex: 1 1 320px` |
| 2 | 24 | **[High] Fixed height clips content** | `.card { height: 400px }` | Remove fixed height; let content determine height |
| 3 | 39 | **[High] Fixed height inside card** | `.cardInfo { height: 400px }` | Remove or use `min-height` |
| 4 | 46–47 | **[High] Fixed-px image container** | `.cardImage { width: 400px; height: 325px }` | `width: 100%; height: auto; aspect-ratio: 4/3` |

**Context:** The `CardContainer` wraps cards in `flex-wrap: wrap`, which is good, but individual `.card` elements are fixed at `400×400px`. On any viewport narrower than ~450px a single card overflows. The image container duplicates the 400px constraint.

---

### `src/components/GlobalStyles/StyleCart.jsx`

| # | Line(s) | Issue Type | Current Value | Suggested Fix |
|---|---------|------------|---------------|---------------|
| 5 | 16–21 | **[High] Flex row without wrap** | `CartOuterContainer { display: flex; width: 65% }` | Add `flex-wrap: wrap`; on mobile the cart list and checkout summary squash side-by-side |
| 6 | 59 | **[Medium] Fixed height row** | `CartItem { height: 120px }` | Remove fixed height; use `min-height: 80px; align-items: center` |
| 7 | 44–45 | **[Medium] Fixed image container** | `CartImg { width: 125px; height: 125px }` | Fine for desktop; add `flex-shrink: 0` and a media-query reduction for narrow screens |

**Context:** `CartOuterContainer` places cart items and the checkout total (`CartTotal`) in a row with no flex-wrap. On narrow viewports (<600px) the checkout panel will be crushed to `25%` of `65%` of viewport width — approximately 4–5 rem — making it unreadable.

---

### `src/components/GlobalStyles/StyleCreateListing.jsx`

| # | Line(s) | Issue Type | Current Value | Suggested Fix |
|---|---------|------------|---------------|---------------|
| 8 | 10 | **[High] Fixed 50% flex column, no wrap** | `.createListingIntro { width: 50% }` | Use `flex: 1 1 300px` and add `flex-wrap: wrap` to parent |
| 9 | 13 | **[High] Fixed 50% flex column, no wrap** | `.createListingForm { width: 50% }` | Same as above |

**Context:** `.createListingWrapper` is `display: flex` with no `flex-wrap`. The two 50/50 columns never collapse to a single column on mobile. On screens narrower than ~600px both columns are squished to ~240px each, cutting off the intro text and form.

---

### `src/components/GlobalStyles/StyleHome.jsx`

| # | Line(s) | Issue Type | Current Value | Suggested Fix |
|---|---------|------------|---------------|---------------|
| 10 | 11–13 | **[High] Flex row with no wrap** | `HomeWrapper { display: flex; margin: 0 10% }` | Add `flex-wrap: wrap` to the styled component |
| 11 | 27 | **[High] Fixed 25% login panel** | `HomeLogin { width: 25% }` | `flex: 0 0 280px; max-width: 100%` so it wraps below welcome text on mobile |

**Context:** The homepage splits into a welcome block and a login form side-by-side. The `HomeLogin` panel at `25%` of viewport − margins becomes very narrow (~17vw at 10% margins) on a phone.

---

### `src/components/GlobalStyles/StyleListingDetail.jsx`

| # | Line(s) | Issue Type | Current Value | Suggested Fix |
|---|---------|------------|---------------|---------------|
| 12 | 32–36 | **[Critical] Hardcoded 600×600px image** | `DetailImage img { width: 600px; height: 600px }` | `max-width: 100%; height: auto` — let aspect ratio scale it |
| 13 | 9–11 | **[High] Flex row with no wrap** | `DetailWrapper { display: flex; flex-direction: row }` | Add `flex-wrap: wrap` |
| 14 | 15 | **[High] Fixed 70% left panel** | `DetailLeft { width: 70% }` | `flex: 1 1 400px` so it expands to full width when wrapped |
| 15 | 40 | **[High] Fixed 30% right panel** | `DetailRight { width: 30% }` | `flex: 1 1 240px` |

**Context:** The listing detail image is unconditionally 600×600px. On any screen narrower than ~650px (accounting for padding/margins) it will overflow the viewport horizontally. The 70/30 split has no media query to collapse to a single column.

---

### `src/components/GlobalStyles/StyleProfile.jsx`

| # | Line(s) | Issue Type | Current Value | Suggested Fix |
|---|---------|------------|---------------|---------------|
| 16 | 18–20 | **[High] Flex row with no wrap** | `.profileWrapper { display: flex; margin: 0 10% }` | Add `flex-wrap: wrap` |
| 17 | 22 | **[High] Fixed 65% intro panel** | `.profileIntro { width: 65% }` | `flex: 1 1 300px` |
| 18 | 26 | **[Medium] Fixed 25% update panel** | `.profileUpdate { width: 25% }` | `flex: 1 1 240px` |

**Context:** Same two-column non-wrapping pattern as `StyleHome` and `StyleCreateListing`. Profile info and the update form are locked side-by-side with no breakpoint.

---

### `src/components/GlobalStyles/StyleRoot.jsx`

| # | Line(s) | Issue Type | Current Value | Suggested Fix |
|---|---------|------------|---------------|---------------|
| 19 | 5 | **[Medium] Hardcoded 500px width** | `StyleRoot { width: 500px; max-width: 80% }` | `max-width: 80%` already caps it; remove the `width: 500px` and rely on `max-width` alone |
| 20 | 15 | **[Critical] Hardcoded 600px logo** | `Logo { width: 600px }` | `Logo { width: 100%; max-width: 600px }` so it scales down on narrow screens |

**Context:** The `Logo` div wraps the SVG tagline logo rendered on every page via `root.jsx`. At 600px with no max-width constraint, it overflows on any phone.

---

### `src/components/NavBar/StyleNav.jsx`

| # | Line(s) | Issue Type | Current Value | Suggested Fix |
|---|---------|------------|---------------|---------------|
| 21 | 10 | **[Medium] Fixed nav height** | `Nav { height: 50px }` | `min-height: 50px` so wrapping content doesn't clip |
| 22 | 56–62 | **[High] No mobile nav / hamburger** | `NavLeft { width: 60% }` + `NavRight { width: 40% }` with no wrap | Add a breakpoint-driven hamburger menu or collapse links behind a menu icon on small screens |

**Context:** The navbar is a fixed-height `display: flex` row. The left side contains the logo + search input + search button; the right side contains up to 5 nav links. On screens narrower than ~768px all elements compress into the 50px bar with no wrapping or hidden menu — the search input and links will overflow or truncate with no user access.

---

### `src/components/Footer/Styles.Footer.jsx`

| # | Line(s) | Issue Type | Current Value | Suggested Fix |
|---|---------|------------|---------------|---------------|
| 23 | 8 | **[Medium] `min-width: 100vw` causes horizontal scroll** | `StyleFooter { min-width: 100vw }` | Use `width: 100%` — `100vw` includes the scrollbar width and causes a horizontal overflow strip |

---

### `src/components/EditListing.jsx`

| # | Line(s) | Issue Type | Current Value | Suggested Fix |
|---|---------|------------|---------------|---------------|
| 24 | 118 | **[Medium] Hardcoded MUI button width** | `sx={{ width: 200, padding: 1, margin: 3 }}` | Remove `width: 200`; MUI buttons size to content by default |
| 25 | 137 | **[Medium] Hardcoded MUI button width** | `sx={{ width: 200, padding: 1, margin: 3 }}` | Same |

**Context:** The two action buttons (Update Listing, Delete Listing) are both pinned to 200px. On very narrow screens inside the `ButtonContainer` flex row they may overlap or clip.

---

## Files with No Issues

The following files contain no hardcoded pixel widths, fixed layouts, overflow risks, or missing responsive units that require remediation:

- `src/AuthContext.jsx`
- `src/main.jsx`
- `src/components/AboutUs.jsx`
- `src/components/CartDetail.jsx` *(inherits cart layout from StyleCart.jsx)*
- `src/components/DisplayListings.jsx`
- `src/components/DisplayUserListings.jsx`
- `src/components/HowItWorks.jsx`
- `src/components/ListingDetail.jsx` *(inherits layout from StyleListingDetail.jsx)*
- `src/components/ListingForm.jsx`
- `src/components/LoginForm.jsx`
- `src/components/LogOut.jsx`
- `src/components/NavBar/NavBar.jsx` *(logic only; layout issues in StyleNav.jsx)*
- `src/components/Profile.jsx`
- `src/components/ProfileForm.jsx`
- `src/components/RegisterForm.jsx`
- `src/components/Root.jsx`
- `src/components/SearchFail.jsx`
- `src/components/SearchFeature.jsx`
- `src/components/Footer/Footer.jsx` *(layout in Styles.Footer.jsx)*
- `src/components/GlobalStyles/Colors.jsx`
- `src/components/GlobalStyles/StyleDisplayListing.jsx`
- `src/components/GlobalStyles/StyleEditListing.jsx`
- `src/components/GlobalStyles/StyleMain.jsx`
- `src/components/GlobalStyles/StyleRoute.jsx`
- `src/components/GlobalStyles/StyleSearch.jsx`
- `src/components/GlobalStyles/StyleText.jsx`
- `src/components/GlobalStyles/StyleUtility.jsx`
- `src/routes/aboutus.jsx`
- `src/routes/cart.jsx`
- `src/routes/createlisting.jsx`
- `src/routes/editlisting.jsx`
- `src/routes/home.jsx`
- `src/routes/howitworks.jsx`
- `src/routes/listingdetail.jsx`
- `src/routes/login.jsx`
- `src/routes/logout.jsx`
- `src/routes/profile.jsx`
- `src/routes/register.jsx`
- `src/routes/root.jsx`
- `src/routes/searchfail.jsx`

---

## Recommended Fix Order

1. **StyleListingDetail.jsx** — the 600×600 image is the highest-visibility overflow; one-line fix
2. **StyleRoot.jsx** — logo at 600px hard width affects every page
3. **StyleCard.jsx** — cards are the primary content unit; making them fluid improves the whole marketplace grid
4. **StyleNav.jsx** — hamburger/collapse pattern needed for mobile usability
5. **StyleCreateListing.jsx / StyleHome.jsx / StyleProfile.jsx** — share the same two-column non-wrapping flex pattern; one media-query approach can fix all three
6. **StyleCart.jsx** — wrap the cart/checkout layout
7. **Styles.Footer.jsx** — trivial one-line swap (`min-width: 100vw` → `width: 100%`)
8. **EditListing.jsx** — remove hardcoded MUI button widths
