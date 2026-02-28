const team = [
  { name: "Peter Myung", role: "Engineering", bio: "Full-stack engineer focused on building reliable detection pipelines and scalable infrastructure." },
  { name: "Elia", role: "ML", bio: "Machine learning researcher specializing in synthetic media detection and adversarial robustness." },
  { name: "Michael", role: "Product", bio: "Product strategist shaping the user experience and ensuring responsible deployment of detection tools." },
  { name: "Yash", role: "Design", bio: "Designer crafting intuitive interfaces that make complex AI results easy to understand." },
];

const WhoWeAreSection = () => {
  return (
    <section
      id="who-we-are"
      className="py-24 sm:py-32 px-4"
      aria-labelledby="who-we-are-heading"
    >
      <div className="container max-w-5xl">
        <h2 id="who-we-are-heading" className="text-3xl sm:text-4xl font-bold mb-12 gradient-text inline-block">
          Who we are
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="glass rounded-lg p-6 hover:border-primary/30 transition-colors group"
            >
              {/* Avatar placeholder */}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold text-lg group-hover:bg-primary/20 transition-colors">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-xs text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
