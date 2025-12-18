import { cn } from '@/lib/utils';
import logo from '../../images/dilg-main-logo.png';

interface Props {
    className?: string;
}

export default function AppLogoIcon({ className }: Props) {
    return (
        <>
            <img
                src={logo}
                alt="dilgLogo"
                className={cn('h-12 w-12', className)}
            />
        </>
    );
}
