"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Shield, Clock, Settings, DollarSign } from "lucide-react";

export function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      icon: Shield,
      question: "How is my data security and privacy protected?",
      answer: "Your data security is our top priority. We use enterprise-grade encryption (AES-256) for data at rest and in transit. All data is stored in SOC 2 Type II compliant data centers with strict access controls. We offer on-premises deployment options for maximum security, and we never use your data to train our models or share it with third parties. We're GDPR compliant and can provide detailed security documentation."
    },
    {
      icon: Clock,
      question: "How long does the setup and implementation take?",
      answer: "Implementation timeline depends on your package and requirements. Starter packages can be deployed within 2-3 weeks, Business packages typically take 4-6 weeks, and Enterprise implementations range from 6-12 weeks depending on customization needs. We provide a detailed project timeline during your strategy session and assign a dedicated implementation manager to ensure smooth deployment."
    },
    {
      icon: Settings,
      question: "Can Synapse integrate with our existing CRM and software systems?",
      answer: "Absolutely! Synapse is designed for seamless integration. We provide APIs and pre-built connectors for popular systems like Salesforce, HubSpot, Microsoft 365, Google Workspace, Slack, and many others. Our Enterprise package includes unlimited custom integrations. During your strategy session, we'll audit your current tech stack and design the optimal integration approach."
    },
    {
      icon: DollarSign,
      question: "What's included in the monthly fees? Are there hidden costs?",
      answer: "Our pricing is transparent with no hidden fees. Monthly costs include: AI processing, cloud hosting, security features, regular updates, and support (level varies by package). The only additional costs might be: custom integrations beyond package limits, premium data migration services, or on-site training (Enterprise only). We provide detailed cost breakdowns during consultations."
    },
    {
      icon: HelpCircle,
      question: "What happens to my data if I decide to cancel?",
      answer: "You own your data completely. Upon cancellation, we provide a full data export in standard formats (JSON, CSV, PDF) within 30 days. We can also facilitate migration to another system if needed. After export, all your data is securely deleted from our systems within 90 days (or immediately upon request). We provide certification of data destruction for compliance purposes."
    },
    {
      icon: Settings,
      question: "How accurate is the AI, and what if it makes mistakes?",
      answer: "Our AI achieves 95%+ accuracy in most use cases, with confidence scoring for each response. The system is designed to indicate uncertainty when it's not confident. You can always verify sources and provide feedback to improve accuracy. We also offer human-in-the-loop options for critical applications and can fine-tune models for your specific domain to achieve even higher accuracy."
    },
    {
      icon: Clock,
      question: "Do you offer training and onboarding support?",
      answer: "Yes! All packages include comprehensive onboarding. Starter includes video tutorials and email support. Business adds live training sessions and dedicated onboarding specialist. Enterprise includes on-site training, change management support, and ongoing success management. We ensure your team is fully comfortable with the system before go-live."
    },
    {
      icon: Shield,
      question: "Can I try Synapse before committing to a full implementation?",
      answer: "Absolutely! We offer a 30-day free trial for all packages, plus we can set up a demo environment with your actual data (under NDA) so you can see real results. We also provide proof-of-concept implementations for Enterprise clients. Our goal is to ensure Synapse delivers measurable value before you make a long-term commitment."
    }
  ];

  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary/90 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">FAQ</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            <span className="text-foreground">Frequently Asked</span>
            <br />
            <span className="text-primary">Questions</span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Get answers to common questions about Hashub Synapse implementation, 
            security, and features.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-background border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/20 transition-colors"
                onClick={() => setOpenItem(openItem === index ? null : index)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <faq.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                </div>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openItem === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {openItem === index && (
                <div className="px-6 pb-6">
                  <div className="pl-14">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8">
            <h4 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h4>
            <p className="text-muted-foreground mb-6">
              Every business is unique. Schedule a personalized consultation to discuss 
              your specific needs and get detailed answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors">
                Schedule Free Consultation
              </button>
              <button className="border border-border hover:bg-secondary/20 text-foreground px-6 py-3 rounded-lg font-semibold transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
