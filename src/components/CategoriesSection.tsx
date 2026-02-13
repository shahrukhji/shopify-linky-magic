import { Link } from "react-router-dom";

const categories = [
  {
    title: "Small Earrings",
    description: "Delicate & everyday wear",
    emoji: "✦",
    query: "small",
    gradient: "from-primary/10 to-accent/10",
  },
  {
    title: "Medium Earrings",
    description: "Perfect for occasions",
    emoji: "✧",
    query: "medium",
    gradient: "from-accent/10 to-secondary",
  },
  {
    title: "Large Earrings",
    description: "Bold & statement pieces",
    emoji: "❖",
    query: "large",
    gradient: "from-secondary to-primary/10",
  },
  {
    title: "Jewellery Box",
    description: "Travel cases & organisers",
    emoji: "💎",
    query: "jewellery box",
    gradient: "from-primary/10 to-secondary",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-display font-bold text-center mb-2">Shop by Size</h2>
        <p className="text-muted-foreground text-center mb-8">Find the perfect pair for every occasion</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.query}
              to={`/shop/${cat.query === 'jewellery box' ? 'jewellery-box' : cat.query}`}
              className={`group relative rounded-xl border bg-gradient-to-br ${cat.gradient} p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <span className="text-5xl block mb-4">{cat.emoji}</span>
              <h3 className="text-xl font-display font-bold mb-1">{cat.title}</h3>
              <p className="text-sm text-muted-foreground">{cat.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
