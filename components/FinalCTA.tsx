import { Button } from './ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Background Glow */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full blur-3xl"></div>
          
          <div className="relative bg-secondary/30 backdrop-blur-sm border border-border rounded-2xl p-12 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                <span className="text-foreground">Ready to Take Your Project </span>
                <br />
                <span className="text-foreground">to the </span>
                <span className="text-primary">Next Level?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Let's schedule a <strong className="text-primary">30-minute free</strong> strategy 
                session to discuss your ideas and needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 group"
              >
                <Calendar className="w-6 h-6 mr-3" />
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-border/50">
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>30 minutes free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>No commitment evaluation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Instant response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}