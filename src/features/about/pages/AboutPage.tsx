import AboutHero from "../components/AboutHero";
import AboutStory from "../components/AboutStory";
import AboutValues from "../components/AboutValues";
import TeamSection from "../components/TeamSection";


export default function AboutPage(){
    return(
        <main className="bg-brand-bg-primary text-brand-bg">
            <AboutHero />
            <AboutStory />
            <AboutValues />
            <TeamSection />

        </main>
    ); 
}