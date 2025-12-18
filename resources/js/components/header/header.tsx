import AppLogoIcon from "../app-logo-icon";


const header = () => {
    return (
        <>
            <header className="flex items-center gap-2 px-20 py-4">
                {/* <img
                        src="/Logo/DILG-logo.png"
                        alt="DILG Logo"
                        className="h-10"
                    /> */}
                <AppLogoIcon className="" />
                <p className="text-lg font-bold">DILG RSR</p>
            </header>
        </>
    );
};

export default header;
