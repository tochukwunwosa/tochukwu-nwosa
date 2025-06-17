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
import { CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import emailjs from '@emailjs/browser';

type WaitlistValues = z.infer<typeof contactFormSchema>

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<WaitlistValues>({
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

  const onSubmit = async (data: WaitlistValues) => {
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

      // Send both emails in parallel
      await Promise.all([
        emailjs.send(serviceId, tochiTemplateId, templateParams, { publicKey }), //send me to me
        emailjs.send(serviceId, clientTemplateId, clientTemplateParams, { publicKey }) //send acknowledgment to client
      ]);

      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };



  return (
    <AnimatePresence mode="wait">
      <div className='relative max-w-md mx-auto '>
      {isSuccess ? (
        <motion.div
          key="success"
          className="p-6 bg-background rounded-lg shadow-md border border-foreground/20 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <CheckCircle2 className="h-12 w-12 text-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {`Message sent!`}
          </h3>
          <p className="text-foreground mb-5">
            {`Thanks for contacting me, I typically reply within 24hrs.`}
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            variant="outline"
            className="cursor-pointer border-[#203F30] hover:text-foreground text-foreground hover:scale-[1.02]"
          >
            Send another message
          </Button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6 border border-foreground/20 rounded-lg shadow-sm">

              {/* Name + Email */}
              <div className="grid gap-4">
                {[
                  { name: "name", label: "Full Name", placeholder: "Tochukwu Nwosa" },
                  { name: "email", label: "Email Address", placeholder: "john@example.com" },
                ].map(({ name, label, placeholder }) => (
                  <FormField
                    key={name}
                    control={control}
                    name={name as "name" | "email"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label} <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            placeholder={placeholder}
                            className="border-foreground/30 focus:ring-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              {/* Message */}
              <FormField
                control={control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What would you like us to build or collaborate on? <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="E.g., I want you to bring my design to live..."
                        className="border-foreground/30 focus:ring-background"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  type="submit"
                  className="cursor-pointer w-full bg-foreground text-background"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send a message"}
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      )}
      </div>
    </AnimatePresence>
  )
}