// app/implementation-examples/page.js
import styles from '@/styles/DocPage.module.scss';
import CodeSnippet from '@/components/CodeSnippet';

export const metadata = {
  title: 'Implementation Examples | EZLinks Documentation',
  description: 'Real-world examples of EZLinks implementations',
};


export default function ImplementationExamplesPage() {
  return (
    <div className={styles.docPage}>
      <h1 id="implementation-examples">Implementation Examples</h1>
      <p className={styles.introduction}>
        These examples demonstrate common use cases for EZLinks in real-world applications.
        Each example includes code snippets and explanations to help you implement similar features in your own projects.
      </p>

      <h2 id="user-referral-program">User Referral Program</h2>
      <p>
        Implementing a user referral program is one of the most popular use cases for deep linking.
        This example shows how to create and handle referral links.
      </p>

      <h3 id="creating-referral-links">Creating Referral Links</h3>
      <p>When a user wants to refer friends to your app:</p>

      <h4>iOS</h4>
    <CodeSnippet
        language='swift'
        codeString={`func generateReferralLink(for userId: String) {
    let linkProperties = EZLinkProperties()
    linkProperties.feature = "referral"
    linkProperties.channel = "user_share"
    
    // Add referral data
    linkProperties.addControlParam("referring_user_id", value: userId)
    
    // Create the link
    EZLinks.createLink(properties: linkProperties) { (link, error) in
        if let link = link {
            // Share the link
            let activityVC = UIActivityViewController(
                activityItems: [
                    "Join me on AppName!",
                    link
                ],
                applicationActivities: nil
            )
            self.present(activityVC, animated: true)
        }
    }`}
    />

    <h4>Android</h4>
    <CodeSnippet
      language='java'
      codeString={`void generateReferralLink(String userId) {
    LinkProperties linkProperties = new LinkProperties()
        .setFeature("referral")
        .setChannel("user_share")
        .addControlParameter("referring_user_id", userId);
    
    EZLinks.createLink(this, linkProperties, new EZLinkCreateListener() {
        @Override
        public void onLinkCreate(String url, EZError error) {
            if (error == null) {
                // Share the link
                Intent shareIntent = new Intent(Intent.ACTION_SEND);
                shareIntent.setType("text/plain");
                shareIntent.putExtra(Intent.EXTRA_SUBJECT, "Join me on AppName!");
                shareIntent.putExtra(Intent.EXTRA_TEXT, "Join me on AppName! " + url);
                startActivity(Intent.createChooser(shareIntent, "Share using"));
            }
        }
    });
}`}
      />

      <h3 id="handling-referral-links">Handling Referral Links</h3>
      <p>When a new user installs your app via a referral link:</p>

      <h4>iOS</h4>        
      <CodeSnippet
        language='swift'
        codeString={`EZLinks.registerDeepLinkHandler { params, error, linkProperties in
    if let params = params as? [String: AnyObject] {
        // Check if this is a referral
        if let referringUserId = params["referring_user_id"] as? String {
            // Credit the referrer
            RewardService.creditReferrer(userId: referringUserId)
            
            // Show welcome message
            self.showReferralWelcome(referringUserId: referringUserId)
        }
    }
}`}
          />
        <h4>Android</h4>    
      <CodeSnippet
        language='java'
        codeString={`@Override
protected void onStart() {
    super.onStart();
    
    EZLinks.initSession(new EZLinkReferralInitListener() {
        @Override
        public void onInitFinished(JSONObject referringParams, EZError error) {
            if (error == null) {
                try {
                    // Check if this is a referral
                    if (referringParams.has("referring_user_id")) {
                        String referringUserId = referringParams.getString("referring_user_id");
                        
                        // Credit the referrer
                        RewardService.creditReferrer(referringUserId);
                        
                        // Show welcome message
                        showReferralWelcome(referringUserId);
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    }, this.getIntent().getData(), this);
}`}
          />
          
      <h2 id="content-sharing">Content Sharing</h2>
      <p>
        Allow users to share specific content (products, articles, videos, etc.) with deep links
        that open directly to that content.
      </p>

      <h3 id="sharing-product-details">Sharing Product Details</h3>
      <p>When a user wants to share a product:</p>

    <h4>iOS</h4>        
      <CodeSnippet
        language='swift'
        codeString={`func shareProduct(productId: String, productName: String, productImage: String) {
    let linkProperties = EZLinkProperties()
    linkProperties.feature = "sharing"
    linkProperties.channel = "user_share"
    
    // Add product data
    linkProperties.addControlParam("$og_title", value: "Check out this product!")
    linkProperties.addControlParam("$og_description", value: productName)
    linkProperties.addControlParam("$og_image_url", value: productImage)
    linkProperties.addControlParam("product_id", value: productId)
    
    // Create the link
    EZLinks.createLink(properties: linkProperties) { (link, error) in
        if let link = link {
            // Share the link
            let activityVC = UIActivityViewController(
                activityItems: [
                    "Check out this amazing product!",
                    link
                ],
                applicationActivities: nil
            )
            self.present(activityVC, animated: true)
        }
    }
}`}
      />

      <h3 id="deep-linking-to-content">Handling Content Deep Links</h3>
      <p>When a user opens the app via a shared content link:</p>

    <h4>iOS</h4>
      <CodeSnippet
        language='swift'
        codeString={`EZLinks.registerDeepLinkHandler { params, error, linkProperties in
    if let params = params as? [String: AnyObject] {
        // Check if this is a product link
        if let productId = params["product_id"] as? String {
            // Navigate to product details
            DispatchQueue.main.async {
                self.navigateToProduct(productId: productId)
            }
        }
    }
}`}
      />

    <h4>Android</h4>
      <CodeSnippet
        language='java'
        codeString={`private void navigateBasedOnDeepLinkData(JSONObject params) {
    try {
        // Check if this is a product link
        if (params.has("product_id")) {
            String productId = params.getString("product_id");
            
            // Navigate to product details
            Intent productIntent = new Intent(this, ProductDetailActivity.class);
            productIntent.putExtra("PRODUCT_ID", productId);
            startActivity(productIntent);
        }
    } catch (JSONException e) {
        e.printStackTrace();
    }
}`}
      />

      <h2 id="marketing-campaigns">Marketing Campaign Tracking</h2>
      <p>
        Track the performance of marketing campaigns by creating unique links for each campaign
        and analyzing user acquisition and engagement.
      </p>

      <h3 id="creating-campaign-links">Creating Campaign Links</h3>
      <p>Create unique links for different marketing channels:</p>

    <h4>Web - Creating a campaign link</h4>
      <CodeSnippet
      language='javascript'
      codeString={`const campaignData = {
  campaign: "summer_promo",
  channel: "facebook_ads",
  feature: "new_user_discount",
  data: {
    coupon_code: "SUMMER25",
    expiration_date: "2023-08-31",
    discount_amount: "25%"
  }
};

EZLinks.createLink(campaignData).then(link => {
  console.log('Campaign link created:', link);
  // Use this link in your Facebook ad campaign
});`}
      />

      <h3 id="tracking-campaign-performance">Tracking Campaign Performance</h3>
      <p>When users arrive via campaign links, handle the data:</p>

    <h4>iOS - Handling campaign data</h4>
      <CodeSnippet
        language='swift'
        codeString={`EZLinks.registerDeepLinkHandler { params, error, linkProperties in
    if let params = params as? [String: AnyObject] {
        // Track campaign data
        if let campaign = params["~campaign"] as? String,
           let channel = params["~channel"] as? String {
            
            // Log campaign info to your analytics
            AnalyticsService.logCampaignOpen(
                campaign: campaign,
                channel: channel
            )
            
            // Check for coupon code
            if let couponCode = params["coupon_code"] as? String {
                // Apply the coupon automatically
                CartService.applyCoupon(code: couponCode)
                
                // Show a notification to the user
                self.showCouponAppliedToast(coupon: couponCode)
            }
        }
    }
}`}/>

      <h2 id="app-to-app-linking">App-to-App Linking</h2>
      <p>
        If you have multiple apps, you can use deep linking to create a seamless experience
        when navigating between them.
      </p>

      <CodeSnippet
        language='swift'
        codeString={`func openAppB(withProductId productId: String) {
    let linkProperties = EZLinkProperties()
    linkProperties.feature = "app_to_app"
    linkProperties.channel = "internal"
    
    // Add data for App B
    linkProperties.addControlParam("product_id", value: productId)
    
    // Create the link
    EZLinks.createLink(properties: linkProperties) { (link, error) in
        if let link = link {
            // Open App B with the link
            if let url = URL(string: link) {
                UIApplication.shared.open(url)
            }
        }
    }
}`}
      />

      <h2 id="next-steps">Next Steps</h2>
      <p>
        These examples cover some of the most common use cases for EZLinks. For more specific implementations,
        check out the detailed <a href="/docs/sdk">SDK Reference</a> or our specialized guides for
        <a href="/docs/game-developers">Game Developers</a> and <a href="/docs/indie-developers">Indie Developers</a>.
      </p>
      
      <p>
        If you have questions or need help with a specific implementation, feel free to
        <a href="mailto:support@ezlinks.io">contact our support team</a>.
      </p>
    </div>
  );
}