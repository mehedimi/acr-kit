=== Abandoned Cart Recover ===
Contributors: mehedimi
Donate link: https://abandonedcartrecover.com
Tags: woocommerce, abandoned cart, cart recovery, email marketing, sales recovery
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Requires Plugins: woocommerce
Stable tag: 0.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Recover lost sales with automated email sequences, drag-and-drop builder, one-click recovery links, and smart browser tab notifications for WooCommerce.

== Description ==

**Recover Lost Revenue Automatically**

Over 70% of online shopping carts are abandoned - that's potential revenue slipping away every day. **Abandoned Cart Recover** helps you capture and convert those lost sales effortlessly with powerful automation and smart recovery strategies.

**How It Works:**

Our plugin intelligently tracks abandoned carts (including guest checkout attempts) and automatically sends personalized recovery emails with secure one-click restoration links. Combined with subtle browser tab notifications, you can gently remind shoppers to complete their purchase without being intrusive.

All cart data is securely transmitted to our central cloud application for advanced processing, providing you with real-time monitoring, detailed analytics, and actionable insights into your recovery performance and revenue metrics.

**🎯 Key Features:**

* **Drag-and-Drop Email Builder** - Create beautiful, branded recovery emails with zero coding required. Add images, text, buttons, and dynamic content with ease.
* **Professional Templates** - Get started instantly with pre-designed, conversion-optimized email templates.
* **Automated Email Sequences** - Build intelligent timed reminder campaigns (1 hour, 24 hours, 3 days, etc.) with personalized content including customer names, cart items, and unique discount codes.
* **One-Click Cart Recovery** - Secure recovery links that instantly restore the customer's exact cart for seamless checkout completion.
* **Smart Tab Notifications** - Dynamic browser tab reminders (e.g., "Don't forget your cart! 🛒") with customizable messages, item counts, and attention-grabbing alerts.
* **Real-Time Dashboard** - Monitor abandoned carts, track recovery rates, view cart contents, and measure recovered revenue with comprehensive analytics.
* **Guest Cart Capture** - Recover sales from non-logged-in users who provide their email during checkout.
* **Performance Analytics** - Track email open rates, click-through rates, conversion rates, and total revenue recovered.
* **Customizable Timing** - Set your own abandonment thresholds and email send schedules to match your business needs.
* **GDPR Ready** - Built-in compliance features including opt-out links and privacy controls.

**📊 Track Your Success:**

* View real-time abandoned cart statistics
* Monitor recovery rates and performance trends
* Track potential revenue vs. recovered revenue
* Identify most abandoned products
* Analyze email campaign effectiveness

**🛡️ Secure & Reliable:**

* Secure one-click recovery links with token validation
* Anonymous cart detection and handling
* Cloud-based processing for optimal performance
* Enterprise-grade security standards

**💼 Perfect For:**

* WooCommerce store owners looking to boost revenue
* E-commerce businesses with high cart abandonment rates
* Online retailers wanting automated recovery solutions
* Marketing teams seeking data-driven insights

**Requirements:**

* Active WooCommerce installation
* WordPress Cron enabled (enabled by default on most hosting)
* Working email configuration (wp_mail() or SMTP plugin)
* PHP 7.4 or higher
* WordPress 6.0 or higher

== Installation ==

**Automatic Installation:**

1. Navigate to Plugins > Add New in your WordPress admin
2. Search for "Abandoned Cart Recover"
3. Click "Install Now" and then "Activate"
4. Go to Abandoned Cart Recover in your admin menu to configure

**Manual Installation:**

1. Ensure WooCommerce is installed and activated
2. Download the plugin ZIP file
3. Upload to `/wp-content/plugins/` directory or use Plugins > Add New > Upload Plugin
4. Activate "Abandoned Cart Recover" from the Plugins page
5. Navigate to Abandoned Cart Recover > Settings to configure your preferences

**Initial Setup:**

1. Configure your abandonment threshold (default: 30 minutes)
2. Set up your email sender name and address
3. Customize your email templates or use our pre-designed options
4. Configure your recovery email schedule
5. Enable browser tab notifications (optional)
6. Save settings and start recovering sales!

**Pro Tip:** Test your configuration by abandoning a test cart to ensure emails are sending correctly.

== Frequently Asked Questions ==

= Does this plugin work without WooCommerce? =

No. Abandoned Cart Recover is specifically designed for WooCommerce stores and requires WooCommerce to be active.

= How are abandoned carts detected? =

A cart is marked as abandoned when:
* A logged-in user adds items to their cart but doesn't complete checkout
* A guest user provides their email address during checkout but doesn't complete purchase
* The configured time threshold passes (default: 30 minutes of inactivity)

Anonymous carts (without email addresses) are tracked but cannot be recovered via email.

= Can I customize the recovery emails? =

Absolutely! You can:
* Use the email builder to create custom templates
* Edit pre-designed templates
* Customize email subject lines, content, colors, and buttons
* Add your logo and branding
* Create multiple email sequences with different messaging

= Is this GDPR-compliant? =

Yes. The plugin includes:
* Automatic opt-out/unsubscribe links in all emails
* Respect for WooCommerce and WordPress privacy settings
* Data retention controls
* Privacy policy integration

However, you are responsible for configuring consent mechanisms according to your region's specific requirements.

= How does the one-click recovery link work? =

When a customer clicks the recovery link in their email:
1. They're securely authenticated using a unique token
2. Their exact cart is instantly restored (products, quantities, variations)
3. They're redirected directly to the checkout page
4. They can complete their purchase immediately

No login required - it's completely seamless!

= Can I see which emails were opened? =

Yes! The dashboard shows:
* Email delivery status
* Open rates
* Click-through rates
* Time to conversion
* Recovery success metrics

= Does this work with variable products and subscriptions? =

Yes, Abandoned Cart Recover fully supports:
* Simple products
* Variable products with selected variations
* Grouped products
* Product bundles

= Will this slow down my site? =

No. The plugin is optimized for performance:
* Cart tracking uses minimal resources
* Processing happens asynchronously
* Cloud-based analytics prevent server load
* Efficient database queries
* No impact on customer-facing pages

== Screenshots ==


== Changelog ==

= 0.1.0 =
* Initial release

== Upgrade Notice ==

= 0.1.0 =
Initial release of Abandoned Cart Recover. Start recovering lost sales today!

== Privacy ==

**Data Collection & Storage:**

Abandoned Cart Recover collects and stores only the essential data needed to recover abandoned carts:
* Customer email address (if provided)
* Cart contents (products, quantities, variations)
* Cart abandonment timestamp
* Recovery email interaction data (opens, clicks)

**Data Transmission:**

Cart data is securely transmitted to our cloud application using encrypted HTTPS connections for:
* Advanced processing and analytics
* Real-time monitoring and reporting
* Performance optimization

== Support ==

Need help? We're here for you!

* **Support Forum:** WordPress.org support forums
