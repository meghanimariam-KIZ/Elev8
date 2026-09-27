/**
 * Config for the n8n content-generation/publishing automation. Both
 * webhooks are open (no auth) per how the n8n workflows are set up.
 */
export const N8N_GENERATE_CONTENT_URL = "https://itrat1.app.n8n.cloud/webhook/elev8/generate-content";
export const N8N_PUBLISH_CONTENT_URL = "https://itrat1.app.n8n.cloud/webhook/elev8/publish-content";

/** Platforms to generate content for. No picker exists before generation yet — defaults to both. */
export const DEFAULT_PLATFORMS = { instagram: true, facebook: true };

/**
 * TODO(config): the connected Meta account IDs. There is no settings screen
 * yet where a merchant connects/stores their Instagram Business Account and
 * Facebook Page, so these are read from env vars (unset by default) instead
 * of a hardcoded/fake value. Set INSTAGRAM_BUSINESS_ACCOUNT_ID and
 * FACEBOOK_PAGE_ID once that connection flow exists, or wire this up to
 * read from wherever those IDs end up being stored.
 */
export const META_ACCOUNT_IDS = {
  instagramBusinessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || "",
  facebookPageId: process.env.FACEBOOK_PAGE_ID || "",
};
