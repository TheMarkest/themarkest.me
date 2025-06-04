// src/components/sections/ContactSection.tsx
"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ScrollAppear from '@/components/ui/ScrollAppear';
import GlitchText from '@/components/ui/GlitchText';
import { Send, MessageSquare, Instagram, Mail, GitMerge } from 'lucide-react'; // GitMerge for VK (placeholder)

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form data submitted:', formData);

    const success = Math.random() > 0.2;
    if (success) {
      toast({
        title: t('contact.success'),
        description: "I'll get back to you soon.",
        variant: 'default',
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
       toast({
        title: t('contact.error'),
        description: "Please try again or use one of the direct links.",
        variant: 'destructive',
      });
    }
    setIsSubmitting(false);
  };

  const socialLinks = [
    { name: 'Telegram', href: 'https://t.me/themarkest', icon: MessageSquare },
    { name: 'Instagram', href: 'https://www.instagram.com/themarkest', icon: Instagram },
    { name: 'Email', href: 'mailto:themarkest@itis.team', icon: Mail },
    { name: 'VK', href: 'https://vk.me/themarkest', icon: GitMerge }, // Placeholder icon
    // { name: 'WhatsApp', href: 'https://wa.me/79992106983', icon: MessageSquare }, // Needs a WhatsApp icon
    // { name: 'Messenger', href: 'https://m.me/themarkest.me', icon: MessageSquare }, // Needs a Messenger icon
  ];

  return (
    <section id="contact" className="container">
      <ScrollAppear>
        <h2 className="text-4xl md:text-5xl font-headline mb-4 text-center">
          <GlitchText text={t('contact.title')} className="text-primary" />
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-8 max-w-xl mx-auto">
          {t('contact.intro')}
        </p>
      </ScrollAppear>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <ScrollAppear delay="delay-200">
          <Card className="bg-card/80 backdrop-blur-sm flicker-border-accent">
            <CardHeader>
              <CardTitle className="font-code text-2xl text-accent">
                {'>'} Direct_Access_Protocols();
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialLinks.map(link => (
                <Button key={link.name} variant="outline" className="w-full justify-start border-primary/50 hover:border-accent group" asChild>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <link.icon className="mr-3 h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                    <span className="font-code text-foreground group-hover:text-accent transition-colors">{link.name}</span>
                  </a>
                </Button>
              ))}
               <Button variant="default" className="w-full font-code text-lg group bg-primary hover:bg-primary/90" asChild>
                  <a href="https://themarkest.me/emergency" target="_blank" rel="noopener noreferrer">
                    {t('contact.emergencyButton')}
                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
            </CardContent>
          </Card>
        </ScrollAppear>

        <ScrollAppear delay="delay-400">
          <Card className="bg-card/80 backdrop-blur-sm flicker-border-primary">
            <CardHeader>
              <CardTitle className="font-code text-2xl text-accent">
                {'>'} SecureChannel.transmit();
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1 font-code">
                    {t('contact.form.name')}
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="font-code bg-input border-primary/50 focus:border-accent focus:ring-accent"
                    placeholder="[YOUR_IDENTIFIER]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1 font-code">
                    {t('contact.form.email')}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="font-code bg-input border-primary/50 focus:border-accent focus:ring-accent"
                    placeholder="[YOUR_ADDRESS@DOMAIN.NET]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1 font-code">
                    {t('contact.form.message')}
                  </label>
                  <Textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="font-code bg-input border-primary/50 focus:border-accent focus:ring-accent"
                    placeholder="[BEGIN_TRANSMISSION...]"
                  />
                </div>
                <div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-code text-lg group"
                  >
                    {isSubmitting ? 'Transmitting...' : t('contact.form.send')}
                    {!isSubmitting && <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </ScrollAppear>
      </div>
    </section>
  );
};

export default ContactSection;
