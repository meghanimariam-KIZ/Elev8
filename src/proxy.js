import { updateSession } from "@/utils/supabase/middleware";

// Next.js 16 renamed `middleware.js` to `proxy.js` (same behavior, new name/export).
export async function proxy(request) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
