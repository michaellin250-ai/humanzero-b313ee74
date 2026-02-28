import michaelImg from "@/assets/team-michael.png";
import ScrollIndicator from "./ScrollIndicator";
import yashImg from "@/assets/team-yash.png";
import eliaImg from "@/assets/team-elia.png";
import peterImg from "@/assets/team-peter.png";
const team = [
  { name: "Peter", role: "Front-End Engineer", bio: "Front-end engineer focused on building polished, accessible interfaces for detection tools.", image: peterImg },
  { name: "Elia", role: "Product Strategist", bio: "Product strategist shaping the vision and ensuring responsible deployment of detection tools.", image: eliaImg },
  { name: "Michael", role: "Front-End Engineer", bio: "Front-end engineer crafting seamless user experiences and interactive result visualizations.", image: michaelImg },
  { name: "Yash", role: "Back-End Engineer", bio: "Back-end engineer building reliable detection pipelines and scalable infrastructure.", image: yashImg },
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
          Meet the Team
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="glass rounded-lg p-6 hover:border-primary/30 transition-all group hover-lift"
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover mb-4 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary font-bold text-lg group-hover:bg-primary/20 transition-colors">
                  {member.name.charAt(0)}
                </div>
              )}
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-xs text-primary mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
        <ScrollIndicator targetId="try-cta" />
      </div>
    </section>
  );
};

export default WhoWeAreSection;
