import AboutHero from "../components/AboutHero";
import AboutStory from "../components/AboutStory";
import AboutValues from "../components/AboutValues";
import TeamSection from "../components/TeamSection";
import SEO from '../../../shared/components/SEO';


export default function AboutPage(){
    return(
        <main className="bg-brand-bg-primary text-brand-bg">
            <SEO
                title="Om Sveabilar och Däck"
                description="Lär känna Sveabilar och Däck och våra smidiga biltjänster direkt hos kunden."
                path="/about"
            />

            <AboutHero />
            <AboutStory />
            <AboutValues />
            <TeamSection />

        </main>
    ); 
}