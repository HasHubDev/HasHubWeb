"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, ArrowLeft, Paperclip, Mic } from "lucide-react";
import { Button } from "./ui/button";
import { Navbar } from "./Navbar";
import logoImg from '../public/logo.png';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Hasan's AI assistant. I can communicate in any language - feel free to write in Turkish, English, Spanish, French, German, or any other language you prefer! I'm here to help you with questions about Hashub Synapse, my projects, or AI solutions. What would you like to know? 🚀\n\nMerhaba! Ben Hasan'ın AI asistanıyım. İstediğiniz dilde konuşabilirsiniz - Türkçe, İngilizce veya başka herhangi bir dilde yazabilirsiniz! 🌍",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Detect language and respond accordingly
    const isTurkish = /[çğıöşüÇĞIİÖŞÜ]/.test(userInput) || 
                     input.includes("merhaba") || input.includes("nasıl") || 
                     input.includes("nedir") || input.includes("hakkında");
    
    const isSpanish = input.includes("hola") || input.includes("qué") || 
                     input.includes("cómo") || input.includes("gracias");
    
    const isFrench = input.includes("bonjour") || input.includes("salut") || 
                    input.includes("comment") || input.includes("merci");
    
    const isGerman = input.includes("hallo") || input.includes("wie") || 
                    input.includes("was") || input.includes("danke");
    
    if (input.includes("hashub") || input.includes("synapse")) {
      if (isTurkish) {
        return "Hashub Synapse, belgeleri akıllı ve aranabilir sistemlere dönüştüren yapay zeka platformumdur. Gelişmiş OCR, vektör gömme ve doğal dil işleme teknolojilerini kullanarak verilerinizden içgörüler çıkarır. Özel özellikleri hakkında daha fazla bilgi almak ister misiniz?";
      } else if (isSpanish) {
        return "Hashub Synapse es mi plataforma de IA insignia que transforma documentos en sistemas inteligentes y buscables. Utiliza OCR avanzado, embeddings vectoriales y procesamiento de lenguaje natural para extraer insights de tus datos. ¿Te gustaría saber más sobre sus características específicas?";
      } else if (isFrench) {
        return "Hashub Synapse est ma plateforme d'IA phare qui transforme les documents en systèmes intelligents et consultables. Elle utilise l'OCR avancé, les embeddings vectoriels et le traitement du langage naturel pour extraire des insights de vos données. Souhaiteriez-vous en savoir plus sur ses fonctionnalités spécifiques ?";
      } else if (isGerman) {
        return "Hashub Synapse ist meine Flaggschiff-KI-Plattform, die Dokumente in intelligente, durchsuchbare Systeme verwandelt. Sie nutzt fortschrittliche OCR, Vektor-Embeddings und natürliche Sprachverarbeitung, um Erkenntnisse aus Ihren Daten zu extrahieren. Möchten Sie mehr über die spezifischen Features erfahren?";
      }
      return "Hashub Synapse is my flagship AI platform that transforms documents into intelligent, searchable systems. It uses advanced OCR, vector embeddings, and natural language processing to extract insights from your data. Would you like to know more about its specific features?";
    }
    
    if (input.includes("project") || input.includes("soorgla") || input.includes("proje")) {
      if (isTurkish) {
        return "Kurduğum soorgla.com dahil olmak üzere birçok AI projesi üzerinde çalıştım. Akıllı veri işleme ve arama çözümlerine odaklanıyor. Deneyimim belge işleme, makine öğrenmesi ve ölçeklenebilir AI sistemleri geliştirmeyi kapsıyor. Hangi konuyla ilgileniyorsunuz?";
      } else if (isSpanish) {
        return "He trabajado en varios proyectos de IA, incluyendo soorgla.com que fundé. Se enfoca en procesamiento inteligente de datos y soluciones de búsqueda. Mi experiencia abarca procesamiento de documentos, machine learning y construcción de sistemas de IA escalables. ¿Qué aspecto específico te interesa?";
      }
      return "I've worked on several AI projects, including soorgla.com which I founded. It focuses on intelligent data processing and search solutions. My experience spans document processing, machine learning, and building scalable AI systems. What specific aspect interests you?";
    }
    
    if (input.includes("contact") || input.includes("work") || input.includes("hire") || 
        input.includes("iletişim") || input.includes("çalışma") || input.includes("işbirliği")) {
      if (isTurkish) {
        return "Birlikte nasıl çalışabileceğimizi konuşmayı çok isterim! Bana hasan@hashub.dev adresinden veya ana sayfadaki iletişim formundan ulaşabilirsiniz. AI çözümleri, belge işleme ve özel geliştirme projelerinde uzmanım.";
      } else if (isSpanish) {
        return "¡Me encantaría discutir cómo podemos trabajar juntos! Puedes contactarme en hasan@hashub.dev o a través del formulario de contacto en la página principal. Me especializo en soluciones de IA, procesamiento de documentos y proyectos de desarrollo personalizado.";
      }
      return "I'd love to discuss how we can work together! You can reach me at hasan@hashub.dev or through the contact form on the main page. I specialize in AI solutions, document processing, and custom development projects.";
    }
    
    if (input.includes("technology") || input.includes("tech") || input.includes("stack") || 
        input.includes("teknoloji") || input.includes("teknik")) {
      if (isTurkish) {
        return "Python, TypeScript, React, vektör veritabanları ve çeşitli ML frameworkleri dahil olmak üzere modern AI teknolojileri ile çalışıyorum. Odağım gerçek iş problemlerini çözen pratik AI çözümleridir. Hangi teknoloji zorluğuyla karşılaşıyorsunuz?";
      }
      return "I work with modern AI technologies including Python, TypeScript, React, vector databases, and various ML frameworks. My focus is on practical AI solutions that solve real business problems. What technology challenge are you facing?";
    }
    
    // Language-specific default responses
    if (isTurkish) {
      return "Bu ilginç bir soru! Hashub Synapse, AI çözümleri, projelerim veya nasıl birlikte çalışabileceğimizle ilgili her konuda yardımcı olmak için buradayım. Aradığınız şey hakkında bana daha fazla bilgi verebilir misiniz?";
    } else if (isSpanish) {
      return "¡Esa es una pregunta interesante! Estoy aquí para ayudar con cualquier cosa relacionada con Hashub Synapse, soluciones de IA, mis proyectos, o cómo podríamos trabajar juntos. ¿Podrías contarme más sobre lo que estás buscando?";
    } else if (isFrench) {
      return "C'est une question intéressante ! Je suis là pour aider avec tout ce qui concerne Hashub Synapse, les solutions d'IA, mes projets, ou comment nous pourrions travailler ensemble. Pourriez-vous me dire plus sur ce que vous recherchez ?";
    } else if (isGerman) {
      return "Das ist eine interessante Frage! Ich bin hier, um bei allem zu helfen, was mit Hashub Synapse, KI-Lösungen, meinen Projekten oder unserer möglichen Zusammenarbeit zu tun hat. Könnten Sie mir mehr darüber erzählen, wonach Sie suchen?";
    }
    
    return "That's an interesting question! I'm here to help with anything related to Hashub Synapse, AI solutions, my projects, or how we might work together. Could you tell me more about what you're looking for?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Header */}
      <div className="sticky top-16 z-50 bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30">
                <img 
                  src={logoImg} 
                  alt="Hashub Logo" 
                  className="w-6 h-6"
                />
              </div>
              <div>
                <div className="font-semibold text-foreground">Chat with Hasan</div>
                <div className="text-sm text-primary flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-1 animate-pulse"></div>
                  AI Assistant Active • Multilingual 🌍
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 pt-24">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs sm:max-w-md lg:max-w-lg ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {message.isUser ? (
                      <div className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-foreground/60"></div>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className="flex flex-col">
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-sm ${
                        message.isUser
                          ? "bg-primary text-primary-foreground rounded-tr-md"
                          : "bg-secondary/80 text-foreground border border-border/50 rounded-tl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <div className={`text-xs text-muted-foreground mt-1 px-2 ${message.isUser ? "text-right" : "text-left"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-xs">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-secondary/60 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <div className="relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything in any language - Türkçe, English, Español, Français, Deutsch... | Hashub Synapse, projelerim veya AI çözümleri hakkında her şeyi sorabilirsiniz..."
                  className="w-full bg-secondary/60 border border-border/30 rounded-2xl px-4 py-4 pr-16 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors scrollbar-hide overflow-y-auto"
                  rows={3}
                  style={{ minHeight: "64px", maxHeight: "150px" }}
                />
                <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground transition-colors">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground transition-colors">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-12 h-12 rounded-2xl flex-shrink-0 self-end mb-1"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
