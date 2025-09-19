// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import AppleProvider from 'next-auth/providers/apple';
// import LinkedInProvider from 'next-auth/providers/linkedin';

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET || '',
//       authorization: { params: { prompt: "select_account" } },
//     }),
//     LinkedInProvider({
//       clientId: process.env.NEXTAUTH_LINKEDIN_CLIENT_ID || '',
//       clientSecret: process.env.NEXTAUTH_LINKEDIN_CLIENT_SECRET || '',
//     }),
//     AppleProvider({
//       clientId: process.env.NEXTAUTH_APPLE_CLIENT_ID || '',
//       clientSecret: process.env.NEXTAUTH_APPLE_CLIENT_SECRET || '',
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     // Use JWT/session callbacks to map provider profile to your backend if needed
//     async signIn() {
//       // Allow sign in always — we'll let client call backend login/register endpoints
//       return true;
//     },
//     async jwt(args) {
//       // Attach provider account id and provider name so client can use it
//       const { token, account } = args as unknown as {
//         token: Record<string, unknown>;
//         account?: Record<string, unknown>;
//       };

//       if (account) {
//         // Extract common fields (id_token may be present for OIDC providers)
//         const a = account as Record<string, unknown>;
//         const idToken = (a['id_token'] || a['idToken'] || a['idtoken']) as string | undefined;
//         return { ...token, provider: a.provider, providerAccountId: a.providerAccountId, idToken };
//       }

//       return token;
//     },
//     async session(args) {
//       // Make provider info available in session while preserving session shape
//       const { session, token } = args as unknown as {
//         session: { user?: Record<string, unknown>; expires: string } & Record<string, unknown>;
//         token: Record<string, unknown> & { idToken?: string };
//       };

//       // Include provider info and idToken (when present) so client can forward the
//       // provider-issued id_token to your backend. Preserve the original session shape.
//       // We add non-standard fields to the session for client-side use (idToken, providerAccountId).
//       // Cast to `any`/`Session` to satisfy NextAuth's type signature while preserving runtime shape.
//       const enhanced = {
//         ...session,
//         provider: token.provider as string | undefined,
//         providerAccountId: token.providerAccountId as string | undefined,
//         idToken: token.idToken as string | undefined,
//         user: {
//           ...(session.user || {}),
//           id: (token.providerAccountId as string) || (session.user && (session.user as Record<string, unknown>).id),
//         },
//         expires: session.expires,
//       };

//       return enhanced as unknown as typeof session;
//     },
//   },
//   debug: process.env.NODE_ENV !== 'production',
// });

// export { handler as GET, handler as POST };


// Health check endpoint

export async function GET() {
  return new Response('OK', { status: 200 });
}
