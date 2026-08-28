import CarsHero from "../components/CarsHero";
import SEO from '../../../shared/components/SEO';


export default function(){
    return(
        <main className="bg-brand-bg-rimary">
            <SEO
                title="Bilar"
                description="Upptäck vårt utbud och få hjälp med biltjänster hos Sveabilar och Däck."
                path="/cars"
            />

            <CarsHero />

        </main>
    );
}