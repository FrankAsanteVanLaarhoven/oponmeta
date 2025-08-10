import FeatureGrid from "./FeatureGrid";

interface FeatureShowcaseProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const FeatureShowcase = ({ 
  title = "Why Choose Our Platform?",
  subtitle = "Our platform is your gateway to innovative, inclusive, and future-ready global learning.",
  className = ""
}: FeatureShowcaseProps) => {
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-xl text-slate-800 font-bold max-w-3xl mx-auto drop-shadow-lg">
            {subtitle}
          </p>
        </div>

        <FeatureGrid />
      </div>
    </section>
  );
};

export default FeatureShowcase;