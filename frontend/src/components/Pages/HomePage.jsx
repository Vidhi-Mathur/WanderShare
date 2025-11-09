import { ExperienceFlowSection } from "../UI/others/ExperienceFlowSection";
import { GallerySection } from "../UI/others/GallerySection";
import { HeroSection } from "../UI/others/HeroSection";
import { JoinNowSection } from "../UI/others/JoinNowSection";

export const HomePage = () => {
    return (
        <main className="min-h-screen relative">
            <div className="fixed inset-0 -z-40">
                <div className="absolute top-20 left-0 w-80 h-80 bg-linear-to-br from-emerald-100/40 to-teal-100/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-linear-to-tl from-green-100/40 to-emerald-100/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-linear-to-tr from-teal-100/30 to-green-100/20 rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
                <HeroSection />
                <div id="gallery"><GallerySection /></div>
                <div id="experience"><ExperienceFlowSection /></div>
                <div id="join"><JoinNowSection /></div>
            </div>
        </main>
    )
}