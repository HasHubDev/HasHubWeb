import { Upload, Activity, MessageCircle } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload & Define',
      description: 'Introduce your scattered PDFs, images, and texts to the system.'
    },
    {
      icon: Activity,
      title: 'Process with Hashub Synapse',
      description: 'Your data is structured, vectorized, and transformed into an intelligent knowledge base.'
    },
    {
      icon: MessageCircle,
      title: 'Ask & Get Answers',
      description: 'Now you can converse with your own data and get instant, accurate responses.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="text-foreground">How It </span>
            <span className="text-primary">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your complex data into an intelligent system in 3 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-4"></div>
              )}
              
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="absolute inset-2 rounded-full bg-primary/10 backdrop-blur-sm"></div>
                  <step.icon className="relative z-10 w-10 h-10 text-primary" />
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}