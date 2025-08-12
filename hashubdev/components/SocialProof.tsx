export function SocialProof() {
  const technologies = [
    { name: "OpenAI", icon: "🤖" },
    { name: "Google Cloud", icon: "☁️" },
    { name: "AWS", icon: "📡" },
    { name: "Elasticsearch", icon: "🔍" },
    { name: "soorgla.com", icon: "🚀" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-muted-foreground mb-8">
          Built with trusted industry-standard technologies
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-lg font-medium">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}