

export default function AppLogoIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/fmc_logo.jpeg"
            alt="FMC Logo"
            className="h-full w-full object-contain"
            {...props}
        />
    );
}
