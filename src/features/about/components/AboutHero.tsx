import heroImage from "../../../assets/heroImage.webp";
export default function AboutHero() {
    return (
        <section className="relative isolate overflow-hidden bg-brand-bg bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            <div className="absolute inset-0 -z-10 bg-brand-bg/80" />

            <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-20 sm:px-6 md: min-h-[600px]">

                <div className="max-w-3xl">

                    <div className="mb-6 flex items-center gap-4">

                        <span className="h-1 w-14 bg-brand-gold" />

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
                            Om Sveabilar
                        </p>

                    </div>

                    <h1 className="text-brand-text font-serif text-5xl text-brand-text sm:text-6xl md:text-7xl leading-1[1.05]">
                        Ett tryggare val för din bil
                    </h1>

                    <p className="text-brand-text-muted mt-7 max-w-2xl text-base leading-8 sm:text-lg">
                        Vi hjälper bilägare med professionell service, däck och reparationer. Vårt mål är att göra det enkelt at ta hand om bilen.
                    </p>

                </div>
            </div>

        </section>
    );
}