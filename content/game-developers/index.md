# Attribution & Deep Linking for Game Developers

If you've used Branch.io or AppsFlyer for your mobile game, you've probably felt like something was missing. Generic attribution tools weren't built with gaming in mind—they're designed for e-commerce apps where the user journey is simple: click → install → purchase.

**Gaming is fundamentally different.**

## Why Gaming Attribution Is Different

### 1. Longer, More Complex Funnels

**E-commerce app:**
```
User clicks ad → Installs → Makes purchase
(2 steps, happens in minutes)
```

**Mobile game:**
```
User sees ad → Installs → Completes tutorial → 
Reaches level 5 → Makes first purchase
(5+ steps, happens over days/weeks)
```

You need to track every step to understand where users drop off and which acquisition channels bring engaged players vs. quick churners.

### 2. Retention Matters More Than Conversion

A game with **1M installs and 10% D30 retention** is healthier than one with **2M installs and 5% D30 retention**.

Traditional attribution tools obsess over install counts. Gaming attribution needs to track:
- **D1/D7/D30 retention** by acquisition channel
- **Time to first purchase** by source
- **LTV curves** by cohort
- **Session frequency** and engagement depth

### 3. Virality Is a Core Feature

In e-commerce, referrals are a nice-to-have. In gaming, referrals can be 20-40% of your installs:
- Player invites friends to join their clan
- Player shares victory clip on TikTok
- Player sends "challenge accepted" link

You need attribution that tracks:
- **K-factor** (how many new users each player brings)
- **Multi-touch attribution** (player clicked 5 friend invites before installing—who gets credit?)
- **Referral quality** (do referred players stick around and spend money?)

### 4. Fraud Is 3-4x Higher

Gaming has the highest fraud rate of any mobile vertical:
- **30-40% of installs can be bots** (vs. 10% in e-commerce)
- Click injection attacks steal attribution credit
- Install farms game referral reward systems
- Emulators bypass device restrictions

Without fraud detection, you're wasting 30-40% of your UA budget on fake users.

### 5. Attribution Windows Are Longer

| App Type | Typical Decision Time |
|----------|----------------------|
| E-commerce | See ad → Install within hours |
| Ride-sharing | Need ride → Install immediately |
| Dating | See ad → Install within 1-2 days |
| **Hyper-casual game** | **See ad → Install within 1-3 days** |
| **Mid-core game** | **Research → Install within 7 days** |
| **Hardcore game** | **Watch streams → Read reviews → Install within 14-30 days** |

If your attribution window is too short (Branch.io defaults to 7 days), you're missing installs that came from earlier touchpoints.

---

## Why EZLinks for Gaming

### Pre-Built Gaming Events
Stop wasting time defining custom events. We have battle-tested taxonomy for:
- Tutorial progression
- Level completion
- In-game purchases
- Ad watching
- Social sharing
- Daily logins
- Achievement unlocks

**Setup time: 5 minutes** (vs. 2-3 weeks with Branch)

[View full event taxonomy →](/game-developers/event-taxonomy)

### Gaming-Specific Metrics
Your dashboard shows what actually matters:
- D1/D7/D30 retention by channel
- Time to first purchase
- ARPDAU (average revenue per daily active user)
- K-factor and viral coefficient
- LTV curves by cohort
- ROAS (return on ad spend) by creative

No spreadsheet exports. No manual calculations. It just works.

### Built-In Fraud Detection
Every install gets a fraud confidence score:
- ✅ **High confidence (90%+):** Real user, count for ROAS
- 🟡 **Medium confidence (60-90%):** Probably real, monitor
- 🔴 **Low confidence (<60%):** Likely bot, exclude from metrics

Automatically flags:
- Click injection (click-to-install < 2 seconds)
- Install farms (same IP, recycled device fingerprints)
- Bot behavior (impossible scores, no variance)

**Average savings: 30-40% of UA budget** in the first month.

[Learn more about fraud detection →](/game-developers/fraud-detection)

### 60-70% Cost Savings

| Feature | Branch.io | AppsFlyer | EZLinks |
|---------|-----------|-----------|---------|
| **Base price** | $299/mo | $1,200/mo | $99/mo |
| **MAU overages** | $0.002/user | Enterprise only | Unlimited |
| **Fraud detection** | ❌ Not included | ❌ Add-on ($$$) | ✅ Included |
| **Gaming events** | ❌ Manual setup | ❌ Manual setup | ✅ Pre-built |
| **Support** | Email only | Enterprise only | Gaming-specific help |

**Example cost for 200K MAU game:**
- Branch: $299 + ($0.002 × 200K) = **$699/month = $8,388/year**
- EZLinks: **$199/month = $2,388/year**
- **Annual savings: $6,000**

Plus the fraud detection saves you ~$15K/month in wasted UA spend.

[See migration guide →](/game-developers/migration-from-branch)

---

## Common Gaming Use Cases

EZLinks handles all the deep linking scenarios gaming studios need:

### 🎮 Referral & Invite Systems
Player invites friends to join their clan/team. Track which players are your best viral amplifiers.

[Implementation guide →](/game-developers/use-cases/referral-systems)

### 📱 Social Sharing
Player shares victory clip or rare achievement to TikTok/Instagram. Track which moments drive the most viral installs.

[Implementation guide →](/game-developers/use-cases/social-sharing)

### 🎥 Influencer Campaigns
Pay streamers to play your game. Know which creators drive high-LTV players vs. freeloaders.

[Implementation guide →](/game-developers/use-cases/influencer-campaigns)

### 🔄 Cross-Game Promotion
Promote your other games to existing players. Track cross-sell performance and player LTV across your portfolio.

[Implementation guide →](/game-developers/use-cases/cross-promotion)

### 🏆 Tournament & Event Links
Drive re-engagement with limited-time events. Track which events bring back churned players.

[Implementation guide →](/game-developers/use-cases/tournament-links)

### 💰 Rewarded Ad Attribution
Track installs from Unity Ads, ironSource, AdMob. Know which ad placements drive quality users.

[Implementation guide →](/game-developers/use-cases/rewarded-ads)

### 🛍️ Marketplace Sharing
Player shares rare item/skin. Track viral coefficient of your virtual economy.

[Implementation guide →](/game-developers/use-cases/marketplace-sharing)

---

## Quick Start

Get gaming attribution running in 10 minutes:
```swift
// 1. Install SDK (iOS)
pod 'EZLinks'

// 2. Initialize
import EZLinks

func application(_ application: UIApplication, 
                 didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    EZLinks.shared.initialize(apiKey: "YOUR_API_KEY")
    return true
}

// 3. Track gaming events (pre-built!)
EZLinks.shared.trackEvent("tutorial_completed")
EZLinks.shared.trackEvent("level_completed", properties: [
    "level_number": 5,
    "score": 2500
])
EZLinks.shared.trackEvent("purchase_completed", properties: [
    "revenue": 4.99,
    "item_id": "starter_pack"
])

// 4. Create referral links
EZLinks.shared.createLink(
    path: "invite",
    parameters: ["inviter_id": currentPlayer.id]
) { link in
    shareToFriends(link)
}

// 5. Handle incoming links
EZLinks.shared.onDeepLink { link in
    if link.path == "invite" {
        let inviterId = link.parameters["inviter_id"]
        joinFriendsClan(inviterId: inviterId)
    }
}
```

**That's it.** Your dashboard now shows:
- D1/D7/D30 retention by channel
- Referral conversion rates
- Time to first purchase
- Revenue by acquisition source
- Fraud detection alerts

[Full quick start guide →](/game-developers/quick-start)

---

## Gaming Metrics Explained

### D1/D7/D30 Retention
Percentage of players who return 1, 7, or 30 days after install. The most important gaming metric.

**Benchmarks:**
- Hyper-casual: D1 25-35%, D7 10-15%, D30 3-5%
- Casual: D1 35-50%, D7 15-25%, D30 5-10%
- Mid-core: D1 45-60%, D7 25-35%, D30 10-15%
- Hardcore: D1 50-70%, D7 35-50%, D30 15-25%

### LTV (Lifetime Value)
Total revenue per player over their lifetime. Track by cohort and acquisition channel to know which sources bring high-value players.

### K-Factor
How many new users each existing user brings through referrals/sharing.
- K-factor < 1: Need paid UA to grow
- K-factor = 1: Self-sustaining
- K-factor > 1: Viral growth 🚀

### ARPDAU
Average Revenue Per Daily Active User = Daily revenue ÷ Daily active users

**Benchmarks:**
- Hyper-casual (ad-heavy): $0.02-0.05
- Casual (ads + IAP): $0.05-0.15
- Mid-core (IAP focus): $0.15-0.50
- Hardcore (whale-driven): $0.50-2.00+

[Deep dive on gaming metrics →](/game-developers/metrics)

---

## What Game Developers Say

> "Branch.io was costing us $700/month and we still couldn't tell which TikTok creators drove purchases vs. just installs. EZLinks showed us in week one—cut 7 low-performing influencers, saved $35K, scaled the top 3."
> 
> **— Lead UA Manager, Multiplayer Mobile Game**

> "30% of our Facebook installs were bots. We were literally paying Facebook $15K/month for fake users. EZLinks fraud detection caught it immediately."
> 
> **— Indie Developer, Puzzle Game**

> "The pre-built gaming events saved us 3 weeks of setup. We went from 'thinking about attribution' to 'tracking everything' in one afternoon."
> 
> **— Solo Dev, Hyper-Casual Game**

---

## Next Steps

1. **Read the quick start** → Get set up in 10 minutes
2. **Explore use cases** → Find the scenarios relevant to your game
3. **Check the event taxonomy** → See all pre-built gaming events
4. **Migrate from Branch** → Switch without breaking existing links

Questions? Email us at gaming@ezlinks.dev or join our [Gaming Dev Slack](#).

---

## Resources

- [Quick Start Guide](/game-developers/quick-start)
- [Gaming Event Taxonomy](/game-developers/event-taxonomy)
- [All Use Cases](/game-developers/use-cases)
- [Gaming Metrics Deep Dive](/game-developers/metrics)
- [Fraud Detection Guide](/game-developers/fraud-detection)
- [Migration from Branch.io](/game-developers/migration-from-branch)
- [Best Practices](/game-developers/best-practices)