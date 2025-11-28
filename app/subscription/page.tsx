import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SubscriptionPage() {
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 499,
      description: "Perfect for occasional service needs",
      features: [
        "10% discount on all services",
        "Priority customer support",
        "Free cancellation",
        "1 free emergency service call",
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: 999,
      description: "Ideal for regular service requirements",
      features: [
        "15% discount on all services",
        "Priority booking",
        "24/7 customer support",
        "3 free emergency service calls",
        "Free monthly home inspection",
      ],
      popular: true,
    },
    {
      id: "family",
      name: "Family",
      price: 1499,
      description: "Complete coverage for your entire family",
      features: [
        "20% discount on all services",
        "VIP booking priority",
        "24/7 dedicated support line",
        "Unlimited emergency service calls",
        "Quarterly home maintenance check",
        "Extended service warranty",
      ],
      popular: false,
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Subscription Plans</h1>
        <p className="text-xl text-muted-foreground">
          Choose a plan that works for you and enjoy exclusive benefits and discounts on all our services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
            {plan.popular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-3xl font-bold">₹{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className={`w-full ${plan.popular ? "bg-primary" : ""}`} asChild>
                <Link href={`/subscription/${plan.id}`}>Subscribe Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6 text-left">
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I cancel my subscription anytime?</h3>
            <p className="text-muted-foreground">
              Yes, you can cancel your subscription at any time. However, refunds are provided on a prorated basis.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">How do I use my emergency service calls?</h3>
            <p className="text-muted-foreground">
              Simply use the emergency button in the app when you need urgent assistance, and your free calls will be
              automatically applied.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I upgrade my plan later?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade your subscription plan at any time. The price difference will be prorated for the
              remaining period.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
