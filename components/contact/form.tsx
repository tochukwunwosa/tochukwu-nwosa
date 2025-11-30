"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { z } from "zod"
import { contactFormSchema } from "@/lib/validation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { CheckCircle2, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import emailjs from '@emailjs/browser';

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = form

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const templateParams = {
        name: data.name,
        email: data.email,
        message: data.message,
        year: new Date().getFullYear(),
      };

      const clientTemplateParams = {
        name: data.name,
        email: data.email,
      };

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const tochiTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_TOCHI;
      const clientTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CLIENT;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !tochiTemplateId || !clientTemplateId || !publicKey) {
        console.error('Missing EmailJS environment variables');
        return;
      }

      await Promise.all([
        emailjs.send(serviceId, tochiTemplateId, templateParams, { publicKey }),
        emailjs.send(serviceId, clientTemplateId, clientTemplateParams, { publicKey })
      ]);

      setIsSuccess(true);
      reset();

      // Auto-reset after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          className="p-8 bg-foreground/5 border border-foreground/10 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <CheckCircle2 className="h-16 w-16 text-foreground mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
          <p className="text-foreground/70 mb-6">
            Thanks for reaching out. I typically respond within 24 hours.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            variant="outline"
            className="hover:scale-105 transition-transform"
          >
            Send Another Message
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8 border border-foreground/10 rounded-lg bg-card shadow-sm">

              <div className="space-y-4">
                {/* Name */}
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Your Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          className="border-foreground/20 focus-visible:ring-foreground/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          className="border-foreground/20 focus-visible:ring-foreground/20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Message <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project, role, or opportunity. Include details like tech stack, timeline, and budget/compensation range if applicable."
                          className="border-foreground/20 focus-visible:ring-foreground/20 min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                      <p className="text-xs text-foreground/50 mt-1">
                        Please include: project scope, tech stack, timeline, and budget/compensation
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}