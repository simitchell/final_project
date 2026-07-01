# TO-DO

> Status: this project is currently a proof of concept. The core marketplace
> (auth, listings, search, cart, image uploads, admin) works. The items below
> are not built yet.

## Transactional email (Resend)

> `RESEND_API_KEY` already lives in `backend/.env`. These hook into
> `RegisterView` in `backend/backend_project/backend_app/views.py`.

- [ ] Welcome email: on registration, send from `noreply@foxbodyswapmeet.com`
      (or similar) to the new user's email address.
- [ ] Admin notification email: on registration, send to
      `sam@foxbodyswapmeet.com` announcing the new account (username + email).
- [ ] Verify `foxbodyswapmeet.com` as a sending domain in Resend (SPF/DKIM)
      so mail doesn't land in spam.
- [ ] Move slow external calls off the request path: send email asynchronously,
      and do the same for the synchronous AWS Rekognition moderation call in
      `check_image_moderation` (views.py) so a slow/failing third party can't
      break registration or listing uploads. Handle send/scan failures gracefully.

## Make it demoable

- [ ] `.env.example` documenting every required env var (no real secrets).
- [ ] README quickstart that actually works from a clean clone.
- [ ] Seed-data script so the site has listings to browse on first run.
- [ ] Basic smoke tests (registration, create listing, add to cart) —
      `tests.py` is currently empty.

## Hardening & correctness (near-term)

> Concrete issues in the current code, not future features.

- [x] Registration bypasses password validation: `RegisterView` calls
      `make_password()` directly without running `AUTH_PASSWORD_VALIDATORS`, so
      weak passwords are accepted. Run `validate_password` in `UserSerializer`.
- [ ] Make `SECRET_KEY` and `DEBUG` env-driven and fail loudly in production.
      `SECRET_KEY` currently falls back to the literal `"your secret key"` and
      there is no explicit `DEBUG` setting in `settings.py`.
- [ ] Add DRF throttling (e.g. `AnonRateThrottle`) on `token/` and `register/` —
      they are currently brute-forceable (no `DEFAULT_THROTTLE_CLASSES`).
- [ ] Refresh token is stored in `localStorage` (set in `LoginForm.jsx`), which
      is XSS-exposed. Consider httpOnly cookies, or document as a known risk.
- [ ] Add pagination to `listing/` (no `DEFAULT_PAGINATION_CLASS` today) — the
      home page fetches every listing in one request.
- [ ] Extend search beyond title: `search_fields = ["title"]` only, so the
      "search by keywords" goal is half-built. Include description/keywords.

## Data model

> Schema changes that will get harder to make once there's real data.

- [ ] Prices are `IntegerField` on both `Listing` and `Cart` — no cents
      (`$19.99` is not representable). Move to `DecimalField(decimal_places=2)`
      or commit to storing integer cents everywhere.
- [ ] Cart items are denormalized copies (`cart_item`/`image_url`/`price` as
      plain fields) instead of an FK to `Listing` + a quantity. Carts go stale
      when a listing changes or is deleted, and there's no quantity or real
      order/transaction record. Model the cart as `FK(Listing)` + quantity.
- [ ] `Listing` is missing fields the product vision calls for: `condition`,
      `keywords`, and a category. (README lists these; the model has only
      `title`, `price`, `description`, `image_url`.)

## Ops

- [ ] Health-check endpoint for Railway.
- [ ] Error monitoring (e.g. Sentry) — there's no `LOGGING` config today and no
      visibility into production failures.

## Back burner

- [ ] Stripe payment integration / real checkout flow

## Not started

- [ ] Dispute / ticket system
- [ ] Seller ratings & feedback
- [ ] Transaction & shipping tracking
- [ ] Add field for email address on profiles
- [ ] Fix EditListing.jsx useEffect loop (dependency array should be [] not [listingDetail])
