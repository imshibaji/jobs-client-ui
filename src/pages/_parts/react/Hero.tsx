
export interface Button{
    text?: string;
    link?: string;
}
export interface HeroProps {
    btn1?: Button;
    btn2?: Button;
}


export default function Hero({btn1, btn2}: HeroProps) {
    return(
        <section className="relative overflow-hidden text-center py-24 md:py-32 px-6 bg-lavender leading-relaxed">
            <div className="relative z-10 max-w-3xl mx-auto">
                <span className="inline-block font-semibold mb-3 text-primary">Empowering Women</span>
                <h2 className="text-primary font-headline text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-wider">Jobs That Fit Her Life.<br/> A Platform Built Just for Women.</h2>
                <p className="text-muted text-lg mb-6 tracking-wide">From confidence to career—we’re here to walk with you every step of the way.</p>
                <div className="flex gap-4 justify-center flex-wrap">
                <a href={btn1?.link!} className="border-0 rounded-full py-3 px-6 font-semibold cursor-pointer text-base bg-gradient-to-r from-purple-700 to-purple-500 text-white shadow-xl shadow-purple-700/10 transition duration-150 ease-in-out hover:-translate-y-0.5">
                    {btn1?.text || "Explore Jobs"}
                </a>
                <a href={btn2?.link!} className="bg-transparent text-primary border border-primary rounded-full py-3 px-6 font-semibold cursor-pointer hover:text-white hover:bg-purple-800">
                    {btn2?.text || "Join the Community"}
                </a>
                </div>
            </div>
        </section>
    );
}