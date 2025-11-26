import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Subscribe - StreamFlix",
  description: "Choose your subscription plan and start watching unlimited content",
}

const plans = [
  {
    id: 1,
    name: "1 Day",
    price: "3,000",
    duration: "UGX",
    description: "Perfect for trying out",
    features: ["HD Streaming", "Watch on 1 device", "Cancel anytime", "Access all content"],
  },
  {
    id: 2,
    name: "4 Days",
    price: "5,000",
    duration: "UGX",
    description: "Great for a weekend",
    features: ["HD Streaming", "Watch on 2 devices", "Cancel anytime", "Access all content", "Save favorites"],
    popular: true,
  },
  {
    id: 3,
    name: "1 Week",
    price: "10,000",
    duration: "UGX",
    description: "Best for regular viewers",
    features: [
      "Full HD Streaming",
      "Watch on 3 devices",
      "Cancel anytime",
      "Access all content",
      "Save favorites",
      "Offline downloads",
    ],
  },
  {
    id: 4,
    name: "2 Weeks",
    price: "15,000",
    duration: "UGX",
    description: "Extended viewing",
    features: [
      "Full HD Streaming",
      "Watch on 4 devices",
      "Cancel anytime",
      "Access all content",
      "Save favorites",
      "Offline downloads",
      "Ad-free experience",
    ],
  },
  {
    id: 5,
    name: "1 Month",
    price: "25,000",
    duration: "UGX",
    description: "Best value",
    features: [
      "4K Ultra HD Streaming",
      "Watch on 5 devices",
      "Cancel anytime",
      "Access all content",
      "Save favorites",
      "Offline downloads",
      "Ad-free experience",
      "Priority support",
    ],
  },
]

export default function Subscribe() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground text-balance">
            Select the perfect subscription plan to enjoy unlimited streaming of movies, series, and more
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-xl border transition-all duration-300 ${
                plan.popular
                  ? "border-primary bg-card/50 shadow-lg shadow-primary/20 md:scale-105"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6 flex flex-col h-full">
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.duration}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground"
                  }`}
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 md:px-8 lg:px-12 py-12 md:py-20 bg-card/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Can I change my plan anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, mobile money, and local payment methods.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Do you offer a free trial?</h3>
              <p className="text-muted-foreground">
                Subscribe to our 1-day plan for just 3,000 UGX to try all features risk-free.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Is my subscription auto-renewing?</h3>
              <p className="text-muted-foreground">
                No, our plans are one-time purchases. You will need to renew manually when your plan expires.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
