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
- [ ] Send email asynchronously / handle send failures so a mail-server hiccup
      can't break the registration request.

## Make it demoable
- [ ] `.env.example` documenting every required env var (no real secrets).
- [ ] README quickstart that actually works from a clean clone.
- [ ] Seed-data script so the site has listings to browse on first run.
- [ ] Basic smoke tests (registration, create listing, add to cart) —
      `tests.py` is currently empty.

## Back burner
- [ ] Stripe payment integration / real checkout flow

## Not started
- [ ] Dispute / ticket system
- [ ] Seller ratings & feedback
- [ ] Transaction & shipping tracking
- [ ] Add field for email address on profiles

