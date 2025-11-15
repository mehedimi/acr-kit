=== Cartnail ===
Contributors: cartnail
Donate link: https://example.com/cartnail
Tags: woocommerce, abandoned cart, cart recovery, email, sms, reminders, marketing automation
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 0.1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Recover abandoned carts in WooCommerce with automated reminders, smart recovery links, and detailed tracking.

== Description ==

Cartnail helps you win back lost sales by automatically detecting abandoned carts and sending timely reminders to customers. Use email (and optionally SMS/WhatsApp via addons or custom integrations) with unique recovery links that restore the shopper’s cart in a single click.

Features:

- Automated abandoned cart detection and scheduling
- Email reminders with customizable templates and dynamic merge tags
- One‑click cart recovery links
- Recovery analytics: recovered orders, revenue, and conversion rate
- GDPR‑friendly consent and opt‑out handling
- Works seamlessly with WooCommerce checkout

Requirements:

- WooCommerce active
- WordPress Cron enabled for scheduling (most hosts enable it by default)
- A working email setup (native `wp_mail()` or an SMTP/email service plugin)

== Installation ==

1. Make sure WooCommerce is installed and active.
2. Upload the plugin folder `cartnail-wp` to `/wp-content/plugins/` or install it via the WordPress Plugins screen.
3. Activate “Cartnail”.
4. Go to Admin → Cartnail to configure reminder timings, email sender, and template.

Developer setup (optional):

- This plugin uses a modern build toolchain for its admin UI. For local development:
  - `npm install`
  - `npm run dev` to start the Vite dev server
  - `npm run build` to generate production assets into `dist/`

== Frequently Asked Questions ==

= Does Cartnail work without WooCommerce? =
No. Cartnail is designed specifically for WooCommerce carts and checkout.

= How are abandoned carts detected? =
When a logged‑in user or a guest provides an email and does not complete checkout within your configured time window, the cart is marked as abandoned and scheduled for reminders.

= Can I customize the reminder emails? =
Yes. Go to Admin → Cartnail → Emails to edit the subject, content, logo, and button styles. You can use merge tags like {customer_name}, {cart_items}, and {recovery_link}.

= Do you send SMS/WhatsApp? =
Out of the box, Cartnail focuses on email. You can integrate SMS/WhatsApp via third‑party gateways or custom code using WordPress hooks and the public API.

= Is this GDPR compliant? =
Cartnail includes opt‑out links and respects WooCommerce/WordPress privacy settings. You are responsible for configuring consent according to your region.

== Screenshots ==

1. Cartnail dashboard with recovery metrics
2. Email template editor
3. Reminder schedule settings

== Changelog ==

= 0.1.0 =
Initial release of Cartnail (abandoned cart recovery for WooCommerce).

== Upgrade Notice ==

= 0.1.0 =
Initial public release with automated reminders, recovery links, and basic analytics.

== Privacy ==

Cartnail stores minimal cart and contact data required to send reminders and track recoveries. The plugin does not transmit data to third‑party servers by default. If you enable external email/SMS services, ensure you comply with applicable laws and update your privacy policy accordingly.
