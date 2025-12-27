import { Auth } from '@/types';
import { usePage } from '@inertiajs/react';

import { PageProps } from '@inertiajs/core';

interface AuthPageProps extends PageProps {
    auth: Auth;
}

export default function useAuth() {
    const auth = usePage<AuthPageProps>().props.auth;

    return {
        auth,
        user: auth?.user,
    };
}
