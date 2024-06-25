import NextAuth from 'next-auth'
import { authOptions } from './auth.config';

const authProvider = NextAuth(authOptions);

export const { auth, signIn, signOut } = authProvider;
export default authProvider;
