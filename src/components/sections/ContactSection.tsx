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
import { Send } from 'lucide-react';

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
    
    // For a real app, you'd send this data to a backend/serverless function
    console.log('Form data submitted:', formData);

    // Simulate success/error
    const success = Math.random() > 0.2; // 80% success rate for demo
    if (success) {
      toast({
        title: "Signal Received",
        description: t('contact.success'),
        variant: 'default',
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
       toast({
        title: "Transmission Failed",
        description: t('contact.error'),
        variant: 'destructive',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="container">
      <ScrollAppear>
        <h2 className="text-4xl md:text-5xl font-headline mb-12 text-center">
          <GlitchText text={t('contact.title')} className="text-primary" />
        </h2>
      </ScrollAppear>
      <ScrollAppear delay="delay-200">
        <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm flicker-border-accent">
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
                  rows={5}
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
    </section>
  );
};

export default ContactSection;
