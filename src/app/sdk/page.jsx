// app/docs/sdk/page.js
import styles from '@/styles/DocPage.module.scss';
import CodeSnippet from '@/components/CodeSnippet';

export const metadata = {
  title: 'SDK Reference | EZLinks Documentation',
  description: 'Complete API reference for EZLinks',
};

export default function SDKReferencePage() {
  return (
    <div className={styles.docPage}>
      <h1 id="api-reference">SDK Reference</h1>
      <p className={styles.introduction}>
        This page documents all the methods available in the EZLinks API across platforms.
        Use this as your comprehensive reference when implementing EZLinks in your applications.
      </p>

      <h2 id="core-methods">Core Methods</h2>
      
      <h3 id="initialize">initialize</h3>
      <p>Initializes the EZLinks SDK. This should be called as early as possible in your app&apos;s lifecycle.</p>
      
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Syntax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>iOS</td>
            <td><code>EZLinks.initialize(apiKey: String)</code></td>
          </tr>
          <tr>
            <td>Android</td>
            <td><code>EZLinks.initialize(context: Context, apiKey: String)</code></td>
          </tr>
          <tr>
            <td>Web</td>
            {/* <td><code>EZLinks.initialize({ apiKey: string, domain: string })</code></td> */}
          </tr>
        </tbody>
      </table>
      
      <h4 id="parameters-initialize">Parameters</h4>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>apiKey</td>
            <td>String</td>
            <td>Your EZLinks project API key from the dashboard</td>
          </tr>
          <tr>
            <td>context</td>
            <td>Context (Android only)</td>
            <td>Application context</td>
          </tr>
          <tr>
            <td>domain</td>
            <td>String (Web only)</td>
            <td>Your custom domain for EZLinks (e.g., links.yourdomain.com)</td>
          </tr>
        </tbody>
      </table>

      <h3 id="create-link">createLink</h3>
      <p>Creates a deep link with the specified parameters.</p>
      
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Syntax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>iOS</td>
            {/* <td><code>EZLinks.createLink(properties: EZLinkProperties, completion: @escaping (String?, Error?) -> Void)</code></td> */}
          </tr>
          <tr>
            <td>Android</td>
            <td><code>EZLinks.createLink(context: Context, linkProperties: LinkProperties, callback: EZLinkCreateListener)</code></td>
          </tr>
          <tr>
            <td>Web</td>
            <td><code>EZLinks.createLink(properties: object): Promise&lt;string&gt;</code></td>
          </tr>
        </tbody>
      </table>
      
      <h4 id="parameters-create-link">Parameters</h4>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>properties</td>
            <td>Object</td>
            <td>Link properties including feature, channel, and custom data</td>
          </tr>
          <tr>
            <td>completion/callback</td>
            <td>Function</td>
            <td>Callback function that receives the created link or an error</td>
          </tr>
        </tbody>
      </table>

      <h3 id="handle-deep-link">handleDeepLink</h3>
      <p>Processes incoming deep link URLs.</p>
      
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Syntax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>iOS</td>
            {/* <td><code>EZLinks.handleDeepLink(_ url: URL) -> Bool</code></td> */}
          </tr>
          <tr>
            <td>Android</td>
            {/* <td><code>// Automatically handled in initSession</code></td> */}
          </tr>
          <tr>
            <td>Web</td>
            {/* <td><code>// Automatically handled in init</code></td> */}
          </tr>
        </tbody>
      </table>
      
      <h4 id="parameters-handle-deep-link">Parameters</h4>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>url</td>
            <td>URL</td>
            <td>The URL that was used to open the app</td>
          </tr>
        </tbody>
      </table>

      <h3 id="register-deep-link-handler">registerDeepLinkHandler</h3>
      <p>Registers a callback to be invoked when a deep link is processed.</p>
      
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Syntax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>iOS</td>
            {/* <td><code>EZLinks.registerDeepLinkHandler(handler: @escaping ([String: Any]?, Error?, LinkProperties?) -> Void)</code></td> */}
          </tr>
          <tr>
            <td>Android</td>
            {/* <td><code>// Use initSession with EZLinkReferralInitListener</code></td> */}
          </tr>
          <tr>
            <td>Web</td>
            {/* <td><code>// Use onDeepLinkReceived option in init</code></td> */}
          </tr>
        </tbody>
      </table>
      
      <h4 id="parameters-register-deep-link-handler">Parameters</h4>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>handler</td>
            <td>Function</td>
            <td>Callback function to be called when a deep link is processed</td>
          </tr>
        </tbody>
      </table>

      <h2 id="link-properties">Link Properties</h2>
      <p>The LinkProperties object lets you customize the behavior of your deep links.</p>
      
      <h3 id="linkproperties-ios">iOS</h3>
      <CodeSnippet
        language="swift"
        codeString={`let linkProperties = EZLinkProperties()
linkProperties.feature = "sharing"              // The feature being used
linkProperties.channel = "facebook"             // The channel being used
linkProperties.campaign = "summer_promotion"    // The campaign this link is part of
linkProperties.stage = "new_user"               // The stage in the user journey
linkProperties.tags = ["tag1", "tag2"]          // List of tags

// Add custom control parameters
linkProperties.addControlParam("$desktop_url", value: "https://example.com/desktop")
linkProperties.addControlParam("$ios_url", value: "https://itunes.apple.com/app/id123456789")
linkProperties.addControlParam("custom_data", value: "any_value")`}
      />
{/* 
      <h3 id="link-properties-swift">Swift</h3>
      <pre><code>
{`let linkProperties = EZLinkProperties()
linkProperties.feature = "sharing"              // The feature being used
linkProperties.channel = "facebook"             // The channel being used
linkProperties.campaign = "summer_promotion"    // The campaign this link is part of
linkProperties.stage = "new_user"               // The stage in the user journey
linkProperties.tags = ["tag1", "tag2"]          // List of tags

// Add custom control parameters
linkProperties.addControlParam("$desktop_url", value: "https://example.com/desktop")
linkProperties.addControlParam("$ios_url", value: "https://itunes.apple.com/app/id123456789")
linkProperties.addControlParam("custom_data", value: "any_value")`}
      </code></pre> */}
      
      <h3 id="link-properties-android">Android</h3>
      <CodeSnippet
        language="java"
        codeString={`LinkProperties linkProperties = new LinkProperties()
    .setFeature("sharing")                      // The feature being used
    .setChannel("facebook")                     // The channel being used
    .setCampaign("summer_promotion")            // The campaign this link is part of
    .setStage("new_user")                       // The stage in the user journey
    .addTag("tag1")                             // Add a tag
    .addTag("tag2")                             // Add another tag
    
    // Add custom control parameters
    .addControlParameter("$desktop_url", "https://example.com/desktop")
    .addControlParameter("$ios_url", "https://itunes.apple.com/app/id123456789")
    .addControlParameter("custom_data", "any_value");`}
      />
      
      <h3 id="link-properties-web">Web</h3>
      <CodeSnippet
        language="javascript"
        codeString={`const linkProperties = {
  feature: "sharing",               // The feature being used
  channel: "website",               // The channel being used
  campaign: "summer_promotion",     // The campaign this link is part of
  stage: "new_user",                // The stage in the user journey
  tags: ["tag1", "tag2"],           // List of tags
  
  // Custom data and control parameters
  data: {
    "$desktop_url": "https://example.com/desktop",
    "$ios_url": "https://itunes.apple.com/app/id123456789",
    "custom_data": "any_value"
  }
};`}
      />

      <h2 id="standard-events">Standard Events</h2>
      <p>EZLinks provides a set of standard events that you can track to measure user engagement.</p>
      
      <h3 id="log-event">logEvent</h3>
      <p>Logs a standard or custom event.</p>
      
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Syntax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>iOS</td>
            <td><code>EZLinks.logEvent(name: String, params: [String: Any]?)</code></td>
          </tr>
          <tr>
            <td>Android</td>
            <td><code>EZLinks.logEvent(context: Context, eventName: String, params: JSONObject?)</code></td>
          </tr>
          <tr>
            <td>Web</td>
            <td><code>EZLinks.logEvent(eventName: string, params?: object)</code></td>
          </tr>
        </tbody>
      </table>
      
      <h3 id="standard-event-names">Standard Event Names</h3>
      <p>Use these predefined event names for consistent tracking:</p>
      
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PURCHASE</td>
            <td>User completed a purchase</td>
          </tr>
          <tr>
            <td>ADD_TO_CART</td>
            <td>User added an item to their cart</td>
          </tr>
          <tr>
            <td>START_TRIAL</td>
            <td>User started a free trial</td>
          </tr>
          <tr>
            <td>SUBSCRIBE</td>
            <td>User subscribed to a service</td>
          </tr>
          <tr>
            <td>COMPLETE_REGISTRATION</td>
            <td>User completed registration</td>
          </tr>
          <tr>
            <td>COMPLETE_TUTORIAL</td>
            <td>User completed a tutorial</td>
          </tr>
          <tr>
            <td>ACHIEVE_LEVEL</td>
            <td>User reached a new level (games)</td>
          </tr>
          <tr>
            <td>UNLOCK_ACHIEVEMENT</td>
            <td>User unlocked an achievement (games)</td>
          </tr>
          <tr>
            <td>SHARE</td>
            <td>User shared content</td>
          </tr>
          <tr>
            <td>RATE</td>
            <td>User rated content</td>
          </tr>
        </tbody>
      </table>
      
      <h3 id="event-examples">Event Logging Examples</h3>
      
      <h4>iOS</h4>
      <CodeSnippet
        language="swift"
        codeString={`let params: [String: Any] = [
    "transaction_id": "1234567890",
    "currency": "USD",
    "revenue": 9.99,
    "product_id": "premium_subscription"
]
EZLinks.logEvent(name: "PURCHASE", params: params)`}
      />
      <h4>Android</h4>
      <CodeSnippet
        language="java"
        codeString={`JSONObject params = new JSONObject();
try {
    params.put("transaction_id", "1234567890");
    params.put("currency", "USD");
    params.put("revenue", 9.99);
    params.put("product_id", "premium_subscription");
} catch (JSONException e) {
    e.printStackTrace();
}
EZLinks.logEvent(context, "PURCHASE", params);`}
      />
      <h4>Web</h4>
      <CodeSnippet
        language="javascript"
        codeString={`const params = {
  transaction_id: "1234567890",
  currency: "USD",
  revenue: 9.99,
  product_id: "premium_subscription"
};
EZLinks.logEvent("PURCHASE", params);`}
      />

      <h2 id="advanced-features">Advanced Features</h2>
      <p>These advanced features provide more control over deep link behavior.</p>
      
      <h3 id="set-identity">setIdentity</h3>
      <p>Associate a user identity with the current session for cross-platform tracking.</p>
      
      <pre><code>
{`// iOS
EZLinks.setIdentity(userId: "user-123")`}
      </code></pre>
      
      <pre><code>
{`// Android
EZLinks.setIdentity(context, "user-123");`}
      </code></pre>
      
      <pre><code>
{`// Web
EZLinks.setIdentity("user-123");`}
      </code></pre>
      
      <h3 id="logout">logout</h3>
      <p>Clear the current user identity from the session.</p>
      
      <pre><code>
{`// iOS
EZLinks.logout()`}
      </code></pre>
      
      <pre><code>
{`// Android
EZLinks.logout(context);`}
      </code></pre>
      
      <pre><code>
{`// Web
EZLinks.logout();`}
      </code></pre>
      
      <h3 id="tracking-control">disableTracking</h3>
      <p>Disable tracking for privacy compliance (e.g., GDPR).</p>
      
      <pre><code>
{`// iOS
EZLinks.disableTracking(true)`}
      </code></pre>
      
      <pre><code>
{`// Android
EZLinks.disableTracking(context, true);`}
      </code></pre>
      
      <pre><code>
{`// Web
EZLinks.disableTracking(true);`}
      </code></pre>

      <h2 id="error-handling">Error Handling</h2>
      <p>Common errors and how to handle them:</p>
      
      <table>
        <thead>
          <tr>
            <th>Error Code</th>
            <th>Description</th>
            <th>Solution</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1001</td>
            <td>Invalid API Key</td>
            <td>Check that your API key is correct</td>
          </tr>
          <tr>
            <td>1002</td>
            <td>Network Error</td>
            <td>Check internet connectivity</td>
          </tr>
          <tr>
            <td>1003</td>
            <td>Server Error</td>
            <td>Retry the operation later</td>
          </tr>
          <tr>
            <td>1004</td>
            <td>SDK Not Initialized</td>
            <td>Call initialize() before using other methods</td>
          </tr>
          <tr>
            <td>1005</td>
            <td>Invalid Parameters</td>
            <td>Check the parameters passed to the method</td>
          </tr>
        </tbody>
      </table>

      <h2 id="platform-specific">Platform-Specific Configurations</h2>
      
      <h3 id="ios-config">iOS Configuration</h3>
      <p>Add these configurations to your Info.plist file:</p>
      
      <pre><code>
{`<key>EZLinksAPIKey</key>
<string>YOUR_API_KEY</string>

<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>ezlinks-YOUR_APP_KEY</string>
    </array>
  </dict>
</array>

<key>LSApplicationQueriesSchemes</key>
<array>
  <string>ezlinks</string>
</array>`}
      </code></pre>
      
      <h3 id="android-config">Android Configuration</h3>
      <p>Add these configurations to your AndroidManifest.xml:</p>
      
      <pre><code>
{`<manifest>
  <application>
    <!-- EZLinks API Key -->
    <meta-data android:name="io.ezlinks.ApiKey" android:value="YOUR_API_KEY" />
    
    <!-- EZLinks URI Scheme -->
    <meta-data android:name="io.ezlinks.UriScheme" android:value="ezlinks-YOUR_APP_KEY" />
    
    <!-- Intent Filter for Deep Links -->
    <activity android:name=".MainActivity">
      <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="ezlinks-YOUR_APP_KEY" />
      </intent-filter>
    </activity>
  </application>
</manifest>`}
      </code></pre>
      
      <h3 id="web-config">Web Configuration</h3>
      <p>Add this script to your HTML:</p>
      
      <pre><code>
{`<script>
  // Initialize EZLinks as early as possible
  (function(e,z,l,i,n,k,s) {
    s = z.getElementsByTagName('script')[0];
    k = z.createElement('script');
    k.async = 1;
    k.src = 'https://cdn.ezlinks.io/sdk/ezlinks-web.min.js';
    k.onload = function() {
      EZLinks.init({
        apiKey: 'YOUR_API_KEY',
        domain: 'links.yourdomain.com'
      });
    };
    s.parentNode.insertBefore(k, s);
  })(window, document);
</script>`}
      </code></pre>
    </div>
  );
}