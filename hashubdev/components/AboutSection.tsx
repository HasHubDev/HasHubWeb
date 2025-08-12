import { Bot, Send, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export function AboutSection() {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/chat');
  };

  const handleSynapseClick = () => {
    navigate('/synapse');
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Personal Info */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="relative inline-block mb-8 lg:-ml-4 ">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/40 p-1">
                  <img 
                    src="/hasan-profile.png" 
                    alt="Hasan - AI Solution Architect"
                    className="w-full h-full rounded-full object-cover border-2 border-primary/30"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-foreground">Meet </span>
                <span className="text-primary">Hasan</span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm <strong className="text-foreground">Hasan</strong>. Through projects like 
                  <strong className="text-primary"> soorgla.com</strong>, which I founded, I've specialized in 
                  transforming complex data problems into simple and effective solutions.
                </p>
                <p>
                  Using artificial intelligence technologies, I help businesses turn their massive data piles 
                  into meaningful insights. I'm here to guide you on your journey of transforming your documents 
                  into an intelligent knowledge system with <strong className="text-primary">Hashub Synapse</strong>.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                onClick={handleChatClick}
              >
                💬 Start Chat with Hasan
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="px-8 group"
                onClick={handleSynapseClick}
              >
                Learn about Synapse
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Column - AI Assistant Preview */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-semibold mb-2">
                <span className="text-primary">Hashub AI</span>
                <span className="text-foreground"> Assistant</span>
              </h3>
              <p className="text-muted-foreground">
                Ready to answer your questions 24/7
              </p>
            </div>

            {/* Chat Interface Preview */}
            <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-xl">
              {/* Chat Header */}
              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-border/50">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Hasan AI Assistant</div>
                  <div className="text-sm text-primary">● Online</div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-foreground">
                      Hello! I'm Hasan's digital assistant. Feel free to ask me anything about Hashub Synapse. 🚀
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-muted/30 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-foreground">
                      What file formats do you support?
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-foreground/60"></div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 max-w-xs">
                    <p className="text-sm text-foreground">
                      PDF, PNG, JPG, DOCX and many more formats! We can process them in 80+ languages with OCR technology. 📄✨
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex items-center space-x-2 pt-4 border-t border-border/50">
                <div className="flex-1 bg-muted/20 rounded-lg px-4 py-2">
                  <p className="text-sm text-muted-foreground">Start a conversation with Hasan...</p>
                </div>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleChatClick}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Start Chat Button */}
            
          </div>
        </div>
      </div>
    </section>
  );
}