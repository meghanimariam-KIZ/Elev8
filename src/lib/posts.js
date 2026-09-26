/** Map posts → { dayOfMonth: status } for one month, for the calendar dots. */
export function eventsForMonth(posts, month) {
  const prefix = `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}-`;
  const out = {};
  for (const p of posts) {
    if (!p.date.startsWith(prefix)) continue;
    const d = Number(p.date.slice(8));
    // scheduled beats draft beats published when a day has several posts
    const rank = { scheduled: 3, draft: 2, published: 1 };
    if (!out[d] || rank[p.status] > rank[out[d]]) out[d] = p.status;
  }
  return out;
}

export const PLATFORM_LABEL = { instagram: "Instagram", facebook: "Facebook", whatsapp: "WhatsApp", website: "Website" };
