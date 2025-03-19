import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, BarChart, Zap, Settings, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header"; // Import Header

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header /> {/* Use the Header component */}

            {/* Hero Section */}
            <section className="container py-20 md:py-32 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        Optimize your workflow with <span className="text-primary">OptiMate</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-[600px]">
                        The intelligent assistant designed to help you work smarter, not harder.
                        Streamline tasks, analyze data, and get personalized recommendations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link to="/signup">
                            <Button size="lg" className="gap-2">
                                Get Started <ChevronRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link to="#demo">
                            <Button size="lg" variant="outline">
                                View Demo
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex-1 glass-card p-6 rounded-2xl">
                    <img
                        src="https://placehold.co/600x400/2563eb/white?text=OptiMate+Dashboard"
                        alt="OptiMate Dashboard Preview"
                        className="rounded-lg w-full object-cover shadow-md"
                    />
                </div>
            </section>

            {/* Features Section */}
            {/* <section id="features" className="bg-muted/50 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to boost productivity and make data-driven decisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Data Analysis",
                description: "Gain insights from your data with powerful analysis tools",
                icon: <BarChart className="h-12 w-12 text-primary" />
              },
              {
                title: "Smart Automation",
                description: "Automate routine tasks and save valuable time",
                icon: <Zap className="h-12 w-12 text-primary" />
              },
              {
                title: "Custom Workflows",
                description: "Build personalized workflows tailored to your needs",
                icon: <Settings className="h-12 w-12 text-primary" />
              },
              {
                title: "AI Assistant",
                description: "Get intelligent recommendations and answers to questions",
                icon: <MessageSquare className="h-12 w-12 text-primary" />
              }
            ].map((feature, index) => (
              <Card key={index} className="border-border/40 hover:shadow-md transition-all">
                <CardHeader>
                  <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

            {/* Testimonials */}
            {/* <section className="container py-20">
        <h2 className="text-3xl font-bold mb-16 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "OptiMate has transformed how our team analyzes data. We've cut our reporting time in half!",
              author: "Sarah J.",
              role: "Data Analyst"
            },
            {
              quote: "The AI assistant understands exactly what I need and provides accurate recommendations every time.",
              author: "Michael T.",
              role: "Product Manager"
            },
            {
              quote: "Setting up custom workflows was incredibly easy. This tool has boosted our team's productivity by 35%.",
              author: "Alex R.",
              role: "Operations Director"
            }
          ].map((testimonial, index) => (
            <div key={index} className="glass-card p-8 flex flex-col">
              <p className="text-lg mb-6 flex-1">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

            {/* CTA Section */}
            {/* <section id="pricing" className="bg-primary text-primary-foreground py-16">
        <div className="container text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to optimize your workflow?</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Join thousands of professionals who are working smarter with OptiMate
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="gap-2">
                Start Free Trial <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="border-primary-foreground/20 hover:bg-primary-foreground/10">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

            {/* Footer */}
            <footer className="border-t border-border/40 py-12 bg-background">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-semibold text-lg mb-4">OptiMate</h3>
                            <p className="text-muted-foreground">
                                Your intelligent assistant for optimized workflows and data-driven decisions.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Updates</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Tutorials</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-border/40 text-center text-muted-foreground">
                        <p>© {new Date().getFullYear()} OptiMate. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
