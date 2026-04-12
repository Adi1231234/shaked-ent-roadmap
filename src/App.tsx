import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { TierNav } from './components/TierNav';
import { TierSection } from './components/TierSection';
import { Footer } from './components/Footer';
import { tiers } from './data/roadmap';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <StatsBar />
      <div className="h-8 sm:h-12" />
      <TierNav tiers={tiers} />
      <main>
        {tiers.map((tier) => (
          <TierSection key={tier.id} tier={tier} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;
