import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, BarChart, Zap, Settings, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header"; 

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header /> 

            {/* Hero Section */}
            <section className="container py-20 md:py-32 flex flex-col md:flex-row items-center gap-8 mt-16">
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
                        src="https://placehold.co/600x400/742ecc/white?text=OptiMate+Dashboard"
                        alt="OptiMate Dashboard Preview"
                        className="rounded-lg w-full object-cover shadow-md"
                    />
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-card py-16" id="features">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Powerful Features</h2>
                        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">Discover how OptiMate can transform your workflow with these powerful tools.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Feature 1 */}
                        <Card className="bg-card border-border/50">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <MessageSquare className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>Smart Conversations</CardTitle>
                                <CardDescription>Engage with an AI that understands context and remembers previous interactions.</CardDescription>
                            </CardHeader>
                        </Card>
                        
                        {/* Feature 2 */}
                        <Card className="bg-card border-border/50">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <BarChart className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>Data Analysis</CardTitle>
                                <CardDescription>Turn complex data into actionable insights with powerful visualization tools.</CardDescription>
                            </CardHeader>
                        </Card>
                        
                        {/* Feature 3 */}
                        <Card className="bg-card border-border/50">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>Automation</CardTitle>
                                <CardDescription>Automate repetitive tasks and save hours of manual work every week.</CardDescription>
                            </CardHeader>
                        </Card>
                        
                        {/* Feature 4 */}
                        <Card className="bg-card border-border/50">
                            <CardHeader>
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Settings className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>Customization</CardTitle>
                                <CardDescription>Tailor OptiMate to your specific needs with extensive personalization options.</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>
            
            {/* CTA Section */}
            <section className="container py-16">
                <Card className="bg-secondary border-0 overflow-hidden w-full">
                    <div className="relative p-8 md:p-12">
                        <div className="relative z-10 max-w-2xl">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to optimize your workflow?</h2>
                            <p className="text-muted-foreground mb-6">Join thousands of professionals who have transformed their productivity with OptiMate.</p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" asChild>
                                    <Link to="/signup">Get Started for Free</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link to="/contact">Contact Sales</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 opacity-30 pointer-events-none">
                            <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M45,-56.1C58.4,-46.1,69.7,-32,73.9,-15.9C78,0.2,74.9,18.3,66.5,33.4C58.1,48.5,44.3,60.7,28.4,67.9C12.5,75.2,-5.5,77.5,-23.9,73.3C-42.2,69.1,-60.8,58.4,-70.8,42.1C-80.8,25.8,-82.2,3.9,-75.5,-13.2C-68.9,-30.3,-54.2,-42.6,-39.3,-52C-24.3,-61.4,-9.1,-68,5.6,-74.9C20.3,-81.7,31.5,-66.1,45,-56.1Z" transform="translate(100 100)" />
                            </svg>
                        </div>
                    </div>
                </Card>
            </section>
            
            {/* Footer */}
            <footer className="bg-card border-t border-border/50 py-12">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a></li>
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
