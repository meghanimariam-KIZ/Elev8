/**
 * Config for the n8n content-generation/publishing automation. Both
 * webhooks are open (no auth) per how the n8n workflows are set up.
 */
export const N8N_GENERATE_CONTENT_URL = "https://itrat1.app.n8n.cloud/webhook/elev8/generate-content";
export const N8N_PUBLISH_CONTENT_URL = "https://itrat1.app.n8n.cloud/webhook/elev8/publish-content";

/** Platforms to generate content for. No picker exists before generation yet — defaults to both. */
export const DEFAULT_PLATFORMS = { instagram: true, facebook: true };

/** Supabase Storage bucket that holds uploaded product photos (see supabase/migrations). */
export const PRODUCT_PHOTOS_BUCKET = "product-photos";
