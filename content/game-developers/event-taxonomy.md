
# Pre-Built Gaming Events

Stop wasting weeks defining custom events. EZLinks comes with **30+ pre-configured gaming events** based on industry best practices from thousands of mobile games.

Just call the events when they happen—your dashboard auto-populates with the metrics that matter.

---

## Installation & Onboarding

Track how players progress through your tutorial and first session.

### `app_installed`
**When to fire:** Automatically tracked on first app launch

**Properties:** None (all handled automatically)

**Used for:**
- Attribution (which channel drove this install)
- Cohort analysis (group players by install date)
- Fraud detection (click-to-install time)

---

### `tutorial_started`
**When to fire:** Player begins tutorial/onboarding
```swift
EZLinks.shared.trackEvent("tutorial_started")
```

**Properties:** None required

**Used for:**
- Tutorial start rate (% of installs who start tutorial)
- Benchmark: Should be >95% (if lower, your splash screen is confusing)

---

### `tutorial_step_completed`
**When to fire:** Player completes each tutorial step
```swift
EZLinks.shared.trackEvent("tutorial_step_completed", properties: [
    "step_number": 1,
    "step_name": "basic_controls",
    "time_seconds": 15
])
```

**Properties:**
- `step_number` (Int, required) - Which step (1, 2, 3...)
- `step_name` (String, optional) - Description ("basic_controls", "first_battle", etc.)
- `time_seconds` (Int, optional) - How long this step took

**Used for:**
- Funnel analysis (where do players drop off?)
- Tutorial optimization (which steps are too slow/confusing?)

**Dashboard view:**
```
Tutorial Funnel:
Step 1 "Basic Controls": 95% completion (5% drop-off)
Step 2 "First Battle": 88% completion (7% drop-off) ⚠️
Step 3 "Upgrade System": 82% completion (6% drop-off)
Step 4 "Social Features": 78% completion (4% drop-off)

Insight: Step 2 has highest drop-off. Consider simplifying first battle.
```

---

### `tutorial_completed`
**When to fire:** Player finishes entire tutorial
```swift
EZLinks.shared.trackEvent("tutorial_completed", properties: [
    "total_time_seconds": 180,
    "skip_used": false
])
```

**Properties:**
- `total_time_seconds` (Int, optional) - Total tutorial duration
- `skip_used` (Bool, optional) - Did player skip any parts?

**Used for:**
- Tutorial completion rate by channel (do TikTok installs finish tutorial?)
- Activation metric (tutorial completion = activated user)

**Benchmarks:**
- Hyper-casual: 70-80% completion
- Casual: 75-85% completion
- Mid-core/Hardcore: 80-90% completion

---

### `first_session_end`
**When to fire:** Player closes app after first session
```swift
EZLinks.shared.trackEvent("first_session_end", properties: [
    "duration_seconds": 420,
    "levels_completed": 3,
    "tutorial_completed": true
])
```

**Properties:**
- `duration_seconds` (Int, optional) - Session length
- `levels_completed` (Int, optional) - Progress in first session
- `tutorial_completed` (Bool, optional) - Did they finish tutorial?

**Used for:**
- First session length by channel (longer = more engaged)
- Predict D1 retention (players with >5 min session have 3x higher D1)

---

## Core Gameplay Events

Track how players progress through your game.

### `level_started`
**When to fire:** Player begins a level
```swift
EZLinks.shared.trackEvent("level_started", properties: [
    "level_number": 5,
    "difficulty": "hard",
    "chapter": "forest_zone"
])
```

**Properties:**
- `level_number` (Int, required) - Level 1, 2, 3...
- `difficulty` (String, optional) - "easy", "normal", "hard", "expert"
- `chapter` (String, optional) - For games with chapters/worlds

---

### `level_completed`
**When to fire:** Player successfully completes a level
```swift
EZLinks.shared.trackEvent("level_completed", properties: [
    "level_number": 5,
    "score": 2500,
    "time_seconds": 180,
    "stars": 3,
    "attempts": 2,
    "powerups_used": 1
])
```

**Properties:**
- `level_number` (Int, required)
- `score` (Int, optional) - Final score
- `time_seconds` (Int, optional) - Time to complete
- `stars` (Int, optional) - Rating (1-3 stars common)
- `attempts` (Int, optional) - How many tries?
- `powerups_used` (Int, optional) - Items consumed

**Used for:**
- Level difficulty analysis (if avg attempts > 5, level is too hard)
- Progression pacing (are players breezing through or getting stuck?)
- Monetization triggers (players who use powerups are more likely to purchase)

---

### `level_failed`
**When to fire:** Player fails a level (runs out of lives, time, etc.)
```swift
EZLinks.shared.trackEvent("level_failed", properties: [
    "level_number": 5,
    "quit_point": "75%",
    "reason": "ran_out_of_moves",
    "attempts": 8
])
```

**Properties:**
- `level_number` (Int, required)
- `quit_point` (String, optional) - "25%", "50%", "75%", "boss_fight"
- `reason` (String, optional) - Why they failed
- `attempts` (Int, optional) - How many times they've tried

**Used for:**
- Identify difficulty spikes (Level 12 has 80% failure rate—too hard!)
- Monetization opportunities (offer powerup after 3 failures)
- Churn prevention (players who fail 10+ times often quit the game)

---

## Monetization Events

Track purchases and ad watching.

### `store_viewed`
**When to fire:** Player opens in-app store

```swift
EZLinks.shared.trackEvent("store_viewed", properties: [
    "store_type": "main_shop"  // or "sale", "featured", etc.
])
```

**Used for:**
- Store visit rate (% of DAU who check store)
- Compare channels (do TikTok users browse store more than Facebook users?)

---

### `item_viewed`
**When to fire:** Player clicks on an item in store

```swift
EZLinks.shared.trackEvent("item_viewed", properties: [
    "item_id": "legendary_sword",
    "item_name": "Flame Sword of Destiny",
    "price": 4.99,
    "currency": "USD",
    "item_type": "weapon"
])
```

**Properties:**
- `item_id` (String, required) - Unique identifier
- `item_name` (String, optional) - Display name
- `price` (Double, required) - Price in real currency
- `currency` (String, required) - "USD", "EUR", etc.
- `item_type` (String, optional) - "weapon", "skin", "boost", etc.

**Used for:**
- Which items get the most interest?
- Browse-to-purchase conversion rate

---

### `purchase_initiated`
**When to fire:** Player taps "Buy" button (before payment processing)

```swift
EZLinks.shared.trackEvent("purchase_initiated", properties: [
    "item_id": "legendary_sword",
    "price": 4.99,
    "currency": "USD"
])
```

**Used for:**
- Purchase abandonment rate (initiated but not completed)
- If high abandonment, check payment UX or pricing

---

### `purchase_completed`
**When to fire:** Payment successfully processed

```swift
EZLinks.shared.trackEvent("purchase_completed", properties: [
    "item_id": "legendary_sword",
    "revenue": 4.99,
    "currency": "USD",
    "transaction_id": "tx_abc123",
    "is_first_purchase": true,
    "days_since_install": 3
])
```

**Properties:**
- `item_id` (String, required)
- `revenue` (Double, required) - **Critical for LTV calculation**
- `currency` (String, required)
- `transaction_id` (String, optional) - From App Store/Play Store
- `is_first_purchase` (Bool, optional) - Is this their first ever purchase?
- `days_since_install` (Int, optional) - Time to first purchase

**Used for:**
- LTV calculation
- ARPDAU (average revenue per daily active user)
- Time to first purchase by channel
- Revenue attribution (which ad drove this purchase?)

**Most important event for monetization tracking!**

---

### `ad_watched`
**When to fire:** Player watches a video ad (rewarded or interstitial)

```swift
EZLinks.shared.trackEvent("ad_watched", properties: [
    "ad_network": "unity",
    "ad_type": "rewarded_video",
    "placement": "level_failed_retry",
    "reward": "extra_lives_3",
    "completed": true
])
```

**Properties:**
- `ad_network` (String, optional) - "unity", "admob", "ironsource"
- `ad_type` (String, required) - "rewarded_video", "interstitial", "banner"
- `placement` (String, optional) - Where in game was ad shown?
- `reward` (String, optional) - What did player get?
- `completed` (Bool, optional) - Did they watch the full ad?

**Used for:**
- Ad revenue estimation (rewarded video ads pay more than interstitials)
- Placement optimization (which ad placements get highest completion rate?)
- User experience (are you showing too many ads and hurting retention?)

---

## Social & Retention Events

Track virality and engagement.

### `invite_sent`
**When to fire:** Player sends an invite/referral link

```swift
EZLinks.shared.trackEvent("invite_sent", properties: [
    "invite_type": "clan_join",
    "channel": "whatsapp",
    "recipients": 3
])
```

**Properties:**
- `invite_type` (String, optional) - "clan_join", "friend_request", "challenge"
- `channel` (String, optional) - "whatsapp", "messenger", "instagram", "clipboard"
- `recipients` (Int, optional) - How many people invited?

**Used for:**
- Invitation rate (% of players who send invites)
- Channel effectiveness (WhatsApp converts better than Instagram)
- K-factor calculation

---

### `content_shared`
**When to fire:** Player shares clip/screenshot to social media

```swift
EZLinks.shared.trackEvent("content_shared", properties: [
    "content_type": "victory_clip",
    "platform": "tiktok",
    "level_number": 50
])
```

**Properties:**
- `content_type` (String, optional) - "victory_clip", "screenshot", "achievement"
- `platform` (String, optional) - "tiktok", "instagram", "twitter"
- `level_number` (Int, optional) - Context of what was shared

**Used for:**
- Viral coefficient (shares → installs)
- Which game moments drive most sharing? (boss victories, rare drops, etc.)

---

### `achievement_unlocked`
**When to fire:** Player earns an achievement

```swift
EZLinks.shared.trackEvent("achievement_unlocked", properties: [
    "achievement_id": "speedrun_master",
    "achievement_name": "Complete 10 levels in under 5 minutes",
    "rarity": "epic",
    "reward": "exclusive_skin"
])
```

**Properties:**
- `achievement_id` (String, required)
- `achievement_name` (String, optional)
- `rarity` (String, optional) - "common", "rare", "epic", "legendary"
- `reward` (String, optional) - What did they get?

**Used for:**
- Achievement completion rates (are they too easy/hard?)
- Rare achievement unlocks often drive social sharing

---

### `daily_login`
**When to fire:** Player logs in (once per day)

```swift
EZLinks.shared.trackEvent("daily_login", properties: [
    "consecutive_days": 7,
    "total_days": 45,
    "login_streak_reward": "premium_currency_100"
])
```

**Properties:**
- `consecutive_days` (Int, optional) - Current streak
- `total_days` (Int, optional) - Lifetime login days
- `login_streak_reward` (String, optional) - Did they get a streak bonus?

**Used for:**
- Retention tracking (7-day streak = sticky user)
- Reward effectiveness (do login bonuses improve retention?)

---

## Session Tracking (Automatic)

These are tracked automatically—no code needed.

### `session_started`
Fired when app opens.

**Properties (auto-populated):**
- `session_id` - Unique session identifier
- `days_since_install` - Player age
- `days_since_last_session` - Indicates returning vs. churned user

**Used for:**
- DAU (Daily Active Users)
- Session frequency
- D1/D7/D30 retention (automatic calculation)

---

### `session_ended`
Fired when app closes or goes to background.

**Properties (auto-populated):**
- `session_duration_seconds` - How long was session?
- `levels_completed` - Progress in this session
- `purchases_made` - Revenue in this session

**Used for:**
- Average session length (longer = more engaged)
- Session-to-purchase rate

---

## Using Events in Your Dashboard

Once you implement these events, your EZLinks dashboard automatically shows:

### Funnel Analysis
```
Install Funnel:
1,000 installs
├─ 950 started tutorial (95%)
├─ 760 completed tutorial (80% of starters)
├─ 450 reached level 5 (59% of completers)
├─ 120 made first purchase (27% of level 5 players)
└─ Conversion: 12% (install → purchase)
```

### Retention Curves
```
January 2025 Cohort:
├─ D1: 450/1000 = 45%
├─ D7: 280/1000 = 28%
└─ D30: 120/1000 = 12%
```

### Revenue Attribution
```
TikTok Ads (Jan 2025):
├─ Spend: $10,000
├─ Installs: 1,000
├─ D7 Revenue: $18,300
├─ D7 ROAS: 183%
└─ Estimated D30 ROAS: 450% (profitable!)
```

### Top Monetization Moments
```
When do players make first purchase?

After level_failed (3+ attempts): 35% of purchases
After achievement_unlocked (rare): 25% of purchases
After ad_watched (rewarded video): 20% of purchases
Spontaneous (browsing store): 20% of purchases
```

---

## Custom Events (If Needed)

If your game has unique mechanics not covered by pre-built events:

```swift
EZLinks.shared.trackEvent("custom_event_name", properties: [
    "property1": "value1",
    "property2": 123
])
```

But **try to use pre-built events first**—they integrate with dashboard analytics automatically.

---

## Best Practices

### 1. Fire events at the right time
❌ **Wrong:** Fire `purchase_completed` when payment is initiated
✅ **Right:** Fire `purchase_completed` only after App Store confirms transaction

### 2. Include context in properties
❌ **Wrong:**
```swift
EZLinks.shared.trackEvent("level_completed")
```

✅ **Right:**
```swift
EZLinks.shared.trackEvent("level_completed", properties: [
    "level_number": 5,
    "score": 2500,
    "time_seconds": 180
])
```

More context = better insights.

### 3. Don't over-track
Track **outcomes**, not every button tap.

❌ **Don't track:** "settings_button_tapped", "pause_menu_opened"
✅ **Do track:** "tutorial_completed", "level_completed", "purchase_completed"

### 4. Consistent naming
Use the pre-built event names exactly as shown. Don't create your own variations:

❌ `tutorial_complete`, `tutorialCompleted`, `onboarding_finished`
✅ `tutorial_completed` (matches pre-built taxonomy)

---

## Next Steps

- [Quick Start Guide](/game-developers/quick-start) - Implement events in 10 minutes
- [Gaming Metrics](/game-developers/metrics) - Understand D1/D7/D30, LTV, K-factor
- [Best Practices](/game-developers/best-practices) - Optimize your implementation

Questions? Email gaming@ezlinks.dev