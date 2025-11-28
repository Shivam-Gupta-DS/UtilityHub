import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  const generalFaqs = [
    {
      question: "What is UtilityHub?",
      answer:
        "UtilityHub is an on-demand service marketplace that connects customers with verified service providers for various home and personal needs, including cleaning, plumbing, electrical work, beauty services, and more.",
    },
    {
      question: "How does UtilityHub work?",
      answer:
        "UtilityHub works in three simple steps: 1) Browse and select a service you need, 2) Choose a service provider or let us match you with the best available professional, 3) Book an appointment and get the service done at your doorstep.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "Currently, we serve major cities across India including Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, and Lucknow. We're continuously expanding to new locations.",
    },
    {
      question: "Are the service providers verified?",
      answer:
        "Yes, all service providers on UtilityHub undergo a thorough verification process including identity verification, background checks, and skill assessment to ensure quality and safety.",
    },
    {
      question: "What are your operating hours?",
      answer:
        "Our customer support is available from 9:00 AM to 7:00 PM, Monday to Saturday. However, service bookings can be made 24/7 through our website or app, and emergency services are available round the clock.",
    },
  ]

  const bookingFaqs = [
    {
      question: "How do I book a service?",
      answer:
        "You can book a service by browsing our service categories, selecting a service, choosing a service provider, selecting your preferred date and time, and confirming your booking with payment details.",
    },
    {
      question: "Can I reschedule my booking?",
      answer:
        "Yes, you can reschedule your booking up to 4 hours before the scheduled time without any charges. You can do this from your dashboard or by contacting our customer support.",
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "You can cancel a booking up to 4 hours before the scheduled time without any charges. Cancellations made within 4 hours of the scheduled time may incur a cancellation fee of 25% of the service cost.",
    },
    {
      question: "How do I pay for services?",
      answer:
        "We accept various payment methods including credit/debit cards, UPI payments, and cash on delivery for certain services. All online payments are secure and encrypted.",
    },
    {
      question: "What is dynamic pricing?",
      answer:
        "Dynamic pricing adjusts service prices based on demand, similar to ride-sharing services. During high-demand periods, prices may increase slightly, while during low-demand periods, you might get services at lower rates.",
    },
  ]

  const providerFaqs = [
    {
      question: "How do I become a service provider on UtilityHub?",
      answer:
        "To become a service provider, visit our 'Become a Provider' page and complete the registration process. You'll need to provide your personal details, professional information, and undergo our verification process.",
    },
    {
      question: "How much does it cost to register as a service provider?",
      answer:
        "Registration as a service provider is free. UtilityHub operates on a commission-based model, where we charge a small percentage of each completed service booking.",
    },
    {
      question: "How do I receive payments for my services?",
      answer:
        "Payments are processed within 24-48 hours after service completion and customer confirmation. The amount is directly transferred to your registered bank account after deducting the platform commission.",
    },
    {
      question: "Can I set my own prices and availability?",
      answer:
        "Yes, you have control over your pricing within a recommended range based on market standards. You can also set your availability hours and manage your calendar through the provider dashboard.",
    },
    {
      question: "What support does UtilityHub provide to service providers?",
      answer:
        "UtilityHub provides marketing support, customer acquisition, payment processing, and dispute resolution. We also offer training resources and opportunities to enhance your skills and service quality.",
    },
  ]

  const subscriptionFaqs = [
    {
      question: "What are the benefits of a subscription plan?",
      answer:
        "Subscription plans offer benefits like discounted service rates (10-20% off), priority booking, free emergency service calls, and additional perks like monthly home inspections depending on your plan.",
    },
    {
      question: "How do I subscribe to a plan?",
      answer:
        "You can subscribe by visiting the Subscription page, selecting a plan that suits your needs, and completing the payment process. Your subscription will be activated immediately.",
    },
    {
      question: "Can I upgrade or downgrade my subscription?",
      answer:
        "Yes, you can upgrade your subscription at any time. The price difference will be prorated for the remaining period. Downgrades will take effect from the next billing cycle.",
    },
    {
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription from your dashboard at any time. Refunds are provided on a prorated basis for the unused portion of your subscription period.",
    },
    {
      question: "Are there any long-term commitments?",
      answer:
        "No, all our subscription plans are billed monthly and you can cancel anytime. We don't have any long-term contracts or cancellation fees.",
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about UtilityHub services, bookings, and more.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">General Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {generalFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`general-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Booking & Services</h2>
          <Accordion type="single" collapsible className="w-full">
            {bookingFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`booking-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">For Service Providers</h2>
          <Accordion type="single" collapsible className="w-full">
            {providerFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`provider-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
          <Accordion type="single" collapsible className="w-full">
            {subscriptionFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`subscription-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12 bg-slate-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            If you couldn't find the answer to your question, please contact our customer support team.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
