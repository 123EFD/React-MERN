import { useUser } from '../../hooks/useUser';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import ThemeLoader from '../ThemeLoader';

const UserOnly = ({ children }) => {
    const { user, authChecked } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (authChecked && user === null) {
            router.replace('/login'); //redirect logic (not login = user === null), 
            // replace() method to prevent going back to the protected page)
        }
    }, [user, authChecked]);

    if (!authChecked || !user) {
        return (
            <ThemeLoader></ThemeLoader>
        )
    }

    return children; //once authenticated, render the children components
};

export default UserOnly;

//UserOnly safeguard component to protect routes that require authentication