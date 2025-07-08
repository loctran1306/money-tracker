import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../data/firebase";
import { setAuthUser, clearAuthUser, setAuthLoading } from "../store/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthLoading(true));

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(
                    setAuthUser({
                        userId: user.uid,
                        email: user.email ?? "",
                        userName: user.displayName ?? "",
                    })
                );
            } else {
                dispatch(clearAuthUser());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);
};
