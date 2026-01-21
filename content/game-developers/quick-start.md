# Quick Start: Gaming Attribution in 10 Minutes

Get EZLinks running in your mobile game in one sitting. No complex setup, no weeks of configuration.

---

## What You'll Build

By the end of this guide, your game will have:
- ✅ Install attribution by channel (know which ads work)
- ✅ Referral/invite link tracking (measure K-factor)
- ✅ Gaming event tracking (tutorial, levels, purchases, retention)
- ✅ Deep link handling (join friend's clan, view shared item, etc.)
- ✅ Fraud detection (automatically flag suspicious installs)

**Time required: 10 minutes**

---

## Prerequisites

- iOS app in Xcode (Android SDK coming soon)
- CocoaPods installed
- EZLinks account ([sign up free](https://ezlinks.dev/signup))

---

## Step 1: Install the SDK (2 minutes)

Add EZLinks to your `Podfile`:
```ruby
# Podfile
platform :ios, '12.0'

target 'YourGame' do
  use_frameworks!
  
  pod 'EZLinks'
end
```

Install:
```bash
pod install
```

Open your `.xcworkspace` file (not `.xcodeproj`).

---

## Step 2: Initialize EZLinks (1 minute)

In your `AppDelegate.swift`:
```swift
import UIKit
import EZLinks

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // Initialize EZLinks
        EZLinks.shared.initialize(apiKey: "YOUR_API_KEY") // Get from dashboard
        
        // Enable gaming mode (pre-built events + fraud detection)
        EZLinks.shared.config.mode = .gaming
        
        return true
    }
}
```

**Get your API key:** Log into [dashboard.ezlinks.dev](https://dashboard.ezlinks.dev) → Settings → API Keys

---

## Step 3: Track Your First Gaming Event (2 minutes)

EZLinks has **pre-built gaming events**—no need to define custom events. Just call them when they happen:
```swift
import EZLinks

class GameViewController: UIViewController {
    
    func playerCompletedTutorial() {
        // Track tutorial completion
        EZLinks.shared.trackEvent("tutorial_completed")
        
        // Show main game
        showMainGame()
    }
    
    func playerCompletedLevel(number: Int, score: Int, timeTaken: TimeInterval) {
        // Track level completion with details
        EZLinks.shared.trackEvent("level_completed", properties: [
            "level_number": number,
            "score": score,
            "time_seconds": Int(timeTaken),
            "stars": calculateStars(score: score)
        ])
    }
    
    func playerMadePurchase(itemId: String, price: Double) {
        // Track in-app purchase
        EZLinks.shared.trackEvent("purchase_completed", properties: [
            "item_id": itemId,
            "revenue": price,
            "currency": "USD"
        ])
    }
}
```

**That's it!** Your dashboard now auto-calculates:
- D1/D7/D30 retention (from session events)
- Tutorial completion rate
- Level progression
- Revenue by acquisition channel
- Time to first purchase

[See all pre-built gaming events →](/game-developers/event-taxonomy)

---

## Step 4: Create Referral Links (2 minutes)

Let players invite friends:
```swift
import EZLinks

class InviteViewController: UIViewController {
    
    func shareInviteLink() {
        let currentPlayer = getCurrentPlayer()
        
        // Create referral link
        EZLinks.shared.createLink(
            path: "invite",
            parameters: [
                "inviter_id": currentPlayer.id,
                "inviter_name": currentPlayer.username,
                "clan_id": currentPlayer.clanId,
                "reward": "500_gems"
            ]
        ) { link in
            // Share via system share sheet
            let shareText = "\(currentPlayer.username) invited you to join their clan! Get 500 free gems:"
            let activityVC = UIActivityViewController(
                activityItems: [shareText, link],
                applicationActivities: nil
            )
            self.present(activityVC, animated: true)
        }
    }
}
```

**What happens:**
1. Friend clicks link → Opens App Store (if not installed)
2. Friend installs game → EZLinks remembers the referral
3. Friend completes tutorial → Both players get 500 gems
4. Dashboard tracks: invite click → install → retention → LTV

---

## Step 5: Handle Incoming Deep Links (3 minutes)

When someone clicks a referral link or shared content:
```swift
import EZLinks

class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication,
                     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        EZLinks.shared.initialize(apiKey: "YOUR_API_KEY")
        
        // Handle deep links
        EZLinks.shared.onDeepLink { link in
            self.handleDeepLink(link)
        }
        
        return true
    }
    
    private func handleDeepLink(_ link: EZLinkData) {
        // Check what type of link it is
        switch link.path {
        case "invite":
            handleInviteLink(link)
        case "event":
            handleEventLink(link)
        case "item":
            handleItemLink(link)
        default:
            print("Unknown link type: \(link.path)")
        }
    }
    
    private func handleInviteLink(_ link: EZLinkData) {
        guard let inviterId = link.parameters["inviter_id"],
              let clanId = link.parameters["clan_id"],
              let reward = link.parameters["reward"] else {
            return
        }
        
        // Show invite flow
        let inviteFlow = InviteFlowViewController(
            inviterId: inviterId,
            clanId: clanId,
            reward: reward
        )
        showModal(inviteFlow)
        
        // Track that user accepted invite
        EZLinks.shared.trackEvent("invite_accepted", properties: [
            "inviter_id": inviterId,
            "clan_id": clanId
        ])
    }
    
    private func handleEventLink(_ link: EZLinkData) {
        // Handle tournament/event deep links
        if let eventId = link.parameters["event_id"] {
            showTournament(eventId: eventId)
        }
    }
    
    private func handleItemLink(_ link: EZLinkData) {
        // Handle marketplace item sharing
        if let itemId = link.parameters["item_id"] {
            showMarketplaceItem(itemId: itemId)
        }
    }
}
```

### For SceneDelegate (iOS 13+)

If using SceneDelegate, add this:
```swift
import EZLinks

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    
    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        // Handle Universal Links
        EZLinks.shared.handleUserActivity(userActivity)
    }
    
    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        // Handle custom URL schemes
        if let url = URLContexts.first?.url {
            EZLinks.shared.handleURL(url)
        }
    }
}
```

---

## Step 6: Enable Universal Links (iOS Only)

Universal Links let your deep links work from social apps (WhatsApp, Discord, Instagram).

### 6a. Add Associated Domains in Xcode

1. Select your project in Xcode
2. Go to **Signing & Capabilities**
3. Click **+ Capability** → **Associated Domains**
4. Add: `applinks:yourgame.ezlinks.dev`

### 6b. Upload AASA File

EZLinks automatically hosts your Apple App Site Association file at:
```
https://yourgame.ezlinks.dev/.well-known/apple-app-site-association
```

**No manual file upload needed!** Just enable Associated Domains in Xcode.

[Troubleshooting Universal Links →](/ios-sdk/universal-links)

---

## Done! 🎉

You now have:
- ✅ **Attribution tracking** - Know which ads/influencers drive installs
- ✅ **Gaming events** - Auto-tracking tutorial, levels, purchases, retention
- ✅ **Referral system** - Track K-factor and viral growth
- ✅ **Deep links** - Handle invites, events, shared items
- ✅ **Fraud detection** - Automatically flag suspicious installs

---

## View Your Dashboard

Go to [dashboard.ezlinks.dev](https://dashboard.ezlinks.dev) to see:

### Attribution Report
```
Last 30 Days:
├─ Facebook Ads: 5,000 installs, $10 CPI, D7 LTV $6.20
├─ TikTok Ads: 3,000 installs, $12 CPI, D7 LTV $18.30
├─ Referrals: 2,000 installs, $0 CPI, D7 LTV $14.50
└─ Organic: 1,000 installs
```

### Retention Curves
```
January 2025 Cohort:
├─ D1 retention: 45% (above benchmark!)
├─ D7 retention: 28%
└─ D30 retention: 12%
```

### Top Referrers
```
Player "CoolGamer123":
├─ Invites sent: 25
├─ Installs: 18 (72% conversion)
├─ D7 retention: 15 players (83%)
└─ D7 LTV: $108 total ($6/player)
```

### Fraud Alerts
```
⚠️ Suspicious Activity Detected:
TikTok campaign "winter_promo" has 32% suspected bot installs
Estimated waste: $3,200 this week
[View Details]
```

---

## Next Steps

### Add More Gaming Events

Track everything that matters:
```swift
// Daily login tracking
EZLinks.shared.trackEvent("daily_login", properties: [
    "consecutive_days": 7
])

// Achievement unlocks
EZLinks.shared.trackEvent("achievement_unlocked", properties: [
    "achievement_id": "first_victory",
    "rarity": "rare"
])

// Ad watching (for rewarded videos)
EZLinks.shared.trackEvent("ad_watched", properties: [
    "ad_network": "unity",
    "placement": "rewarded_video",
    "reward": "50_coins"
])

// Social sharing
EZLinks.shared.trackEvent("content_shared", properties: [
    "content_type": "victory_clip",
    "platform": "tiktok"
])
```

[See all 30+ pre-built gaming events →](/docs/game-developers/event-taxonomy)

### Implement Specific Use Cases

- [Referral Systems](/docs/game-developers/use-cases/referral-systems) - Track K-factor, reward both players
- [Influencer Campaigns](/docs/game-developers/use-cases/influencer-campaigns) - Measure ROI per creator
- [Tournament Links](/docs/game-developers/use-cases/tournament-links) - Re-engage churned players
- [Cross-Game Promotion](/docs/game-developers/use-cases/cross-promotion) - Track player LTV across games

### Optimize for Better Metrics

- [Improve D7 Retention](/docs/game-developers/best-practices#retention) - From 25% → 40%
- [Increase K-Factor](/docs/game-developers/best-practices#virality) - From 0.3 → 0.8
- [Reduce Fraud](/docs/game-developers/fraud-detection) - Save 30-40% on UA spend
- [Optimize ROAS](/docs/game-developers/metrics#roas) - Know which creatives drive LTV

---

## Need Help?

- 📧 Email: gaming@ezlinks.dev
- 💬 Gaming Dev Slack: [Join here](#)
- 📚 Full docs: [docs.ezlinks.dev](/docs)
- 🎥 Video tutorials: [youtube.com/ezlinks](#)

---

## Troubleshooting

### "Events not showing in dashboard"

Make sure you called `EZLinks.shared.initialize()` before tracking events.
```swift
// In AppDelegate, didFinishLaunchingWithOptions
EZLinks.shared.initialize(apiKey: "YOUR_API_KEY")
```

### "Deep links not working"

1. Check Universal Links setup: [iOS Universal Links Guide](/docs/ios-sdk/universal-links)
2. Test in WhatsApp/Discord (not just Safari)
3. Use the debug tool:
```swift
// Enable debug logging
EZLinks.shared.config.debugMode = true
```

### "Retention metrics showing 0%"

Retention requires at least 24 hours of data. Check back tomorrow!

### "Fraud score always shows 0"

Fraud detection requires:
- At least 100 installs
- Attribution data (click timestamp + install timestamp)
- Enable with: `EZLinks.shared.config.fraudDetection = true`

Still stuck? Email gaming@ezlinks.dev with your logs.