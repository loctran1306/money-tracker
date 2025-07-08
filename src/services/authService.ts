import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../data/firebase";

export class AuthService {
    static async loginWithGoogle() {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return {
                success: true,
                user: result.user,
                error: null,
            };
        } catch (error) {
            console.error("Google login error:", error);
            return {
                success: false,
                user: null,
                error: error as Error,
            };
        }
    }

    static async logout() {
        try {
            await signOut(auth);
            return { success: true, error: null };
        } catch (error) {
            console.error("Logout error:", error);
            return { success: false, error: error as Error };
        }
    }
}
