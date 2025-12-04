// app/quick-start/page.js
import CodeSnippet from '@/components/CodeSnippet';
import CopyButton from '@/components/CopyButton/CopyButton';
import styles from '@/styles/DocPage.module.scss';

export const metadata = {
  title: 'Quick Start Guide | EZLinks Documentation',
  description: 'Get started with EZLinks in minutes',
};

export default function QuickStartPage() {
  return (
    <div className={styles.docPage}>
      <h1 id="quick-start-guide">Quick Start Guide</h1>
      <p className={styles.introduction}>
        This guide will help you integrate EZLinks into your application in just a few minutes. 
        Follow these simple steps to get up and running quickly.
      </p>

      <h2 id="installation">Installation</h2>
      <p>Choose your platform below and follow the installation instructions:</p>

      <h3 id="ios-installation">iOS</h3>
      <p>Add EZLinks to your iOS project using CocoaPods:</p>
      <pre><code>
{`// Podfile
pod 'EZLinks', '~> 1.0.0'`}
      </code>
      <CopyButton codeToCopy={`pod 'EZLinks', '~> 1.0.0'`} />
      </pre>
      <p>Then run:</p>
      <pre><code>pod install</code> <CopyButton codeToCopy="pod install" /></pre>

      <h3 id="android-installation">Android</h3>
      <p>Add the following to your app-level build.gradle:</p>
      <pre>
        <code>
{`dependencies {
    implementation 'io.ezlinks:ezlinks-android:1.0.0'
}`}
        </code>
        <CopyButton codeToCopy={`implementation 'io.ezlinks:ezlinks-android:1.0.0'`} /> 
      
      </pre>

      <h3 id="web-installation">Web</h3>
      <p>Install EZLinks via npm:</p>
      <pre><code>npm install ezlinks-web --save</code><CopyButton codeToCopy="npm install ezlinks-web --save" /></pre>
      <p>Or using yarn:</p>
      <pre>
        <code>
          yarn add ezlinks-web
        </code>
        <CopyButton codeToCopy="yarn add ezlinks-web" />
      </pre>

      <h2 id="initialization">Initialization</h2>
      <p>Initialize EZLinks in your application:</p>

      <h3 id="ios-initialization">iOS</h3>
      <CodeSnippet
      language='swift'
      codeString={`import EZLinks

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        EZLinks.initialize(apiKey: "YOUR_API_KEY")
        return true
    }
}`}
      />

      <h3 id="android-initialization">Android</h3>
      <CodeSnippet
      language='java'
      codeString={`import io.ezlinks.EZLinks;

public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        EZLinks.initialize(this, "YOUR_API_KEY");
    }
}`}
      />

      <h3 id="web-initialization">Web</h3>
      <CodeSnippet
      language='javascript'
      codeString={`import EZLinks from 'ezlinks-web';
EZLinks.initialize({
  apiKey: 'YOUR_API_KEY',
  domain: 'links.yourdomain.com'
});`}
      />

      <h2 id="creating-links">Creating Links</h2>
      <p>Create deep links programmatically:</p>

      <h3 id="ios-creating-links">iOS</h3>
      <CodeSnippet
      language='swift'
      codeString={`let linkProperties = EZLinkProperties()
linkProperties.feature = "sharing"
linkProperties.channel = "facebook"
linkProperties.addControlParam("$desktop_url", value: "https://example.com/desktop")

EZLinks.createLink(properties: linkProperties) { (link, error) in
    if let link = link {
        // Use the link
        print("Created link: \(link)")
    }
}`}
/>

      <h3 id="android-creating-links">Android</h3>
      <CodeSnippet
      language='java'
      codeString={`LinkProperties linkProperties = new LinkProperties()
    .setFeature("sharing")
    .setChannel("facebook")
    .addControlParameter("$desktop_url", "https://example.com/desktop");

EZLinks.createLink(this, linkProperties, new EZLinkCreateListener() {
    @Override
    public void onLinkCreate(String url, EZError error) {
        if (error == null) {
            // Use the link
            Log.i("EZLinks", "Created link: " + url);
        }
    }
});`}
      />

      <h3 id="web-creating-links">Web</h3>
      <CodeSnippet
      language='javascript'
      codeString={`const linkProperties = {
  feature: 'sharing',
  channel: 'website',
  data: {
    '$desktop_url': 'https://example.com/desktop'
  }
};

EZLinks.createLink(linkProperties).then(link => {
  // Use the link
  console.log('Created link:', link);
});`}
      />

      <h2 id="handling-links">Handling Deep Links</h2>
      <p>Set up deep link handling in your application:</p>

      <h3 id="ios-handling-links">iOS</h3>
      <CodeSnippet
      language='swift'
      codeString={`func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    return EZLinks.handleDeepLink(url)
}

// Add a listener for deep link data
EZLinks.registerDeepLinkHandler { params, error, linkProperties in
    if let params = params as? [String: AnyObject] {
        // Handle deep link data
        if let productId = params["product_id"] as? String {
            // Navigate to product page
        }
    }
}`}
      />

      <h3 id="android-handling-links">Android</h3>
      <CodeSnippet
      language='java'
      codeString={`@Override
protected void onStart() {
    super.onStart();
    // Initialize Branch session
    EZLinks.initSession(new EZLinkReferralInitListener() {
        @Override
        public void onInitFinished(JSONObject referringParams, EZError error) {
            if (error == null) {
                // Handle deep link data
                try {
                    if (referringParams.has("product_id")) {
                        String productId = referringParams.getString("product_id");
                        // Navigate to product page
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }})
    }, this.getIntent().getData(), this);
}`}
      />

      <h3 id="web-handling-links">Web</h3>
      <CodeSnippet
      language='javascript'
      codeString={`// Initialize and handle deep links
EZLinks.init({
  apiKey: 'YOUR_API_KEY',
  domain: 'links.yourdomain.com',
  onDeepLinkReceived: (deepLinkData) => {
    if (deepLinkData) {
      // Handle deep link data
      if (deepLinkData.product_id) {
        // Navigate to product page
      }
    }
  }
});`}
      />

      <h2 id="next-steps">Next Steps</h2>
      <p>Now that you have EZLinks integrated into your application, you can:</p>
      <ul>
        <li>Check out the <a href="/implementation-examples">Implementation Examples</a> for common use cases</li>
        <li>Explore the <a href="/sdk">SDK Reference</a> for detailed API documentation</li>
        {/* <li>Learn about <a href="/docs/analytics">Analytics and Attribution</a> to track user journeys</li> */}
      </ul>
    </div>
  );
}