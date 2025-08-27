"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  BarChart3,
  Calculator,
  TrendingUp,
  Brain,
  Code2,
  Download,
  Menu,
  Sun,
} from "lucide-react"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="font-bold text-xl font-mono">Elaine Hong</div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors font-mono">
              Projects
            </a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors font-mono">
              About
            </a>
            <a href="#skills" className="text-sm font-medium hover:text-primary transition-colors font-mono">
              Skills
            </a>
            <a href="#resume" className="text-sm font-medium hover:text-primary transition-colors font-mono">
              Resume
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors font-mono">
              Contact
            </a>
            <Button variant="ghost" size="sm">
              <Sun className="h-4 w-4" />
            </Button>
          </nav>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <section className="min-h-[90vh] flex items-center justify-center px-6 bg-gradient-tech circuit-pattern relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-lg animate-float circuit-pattern"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/10 rounded-lg animate-float animate-delay-300 data-grid"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/10 rounded-lg animate-float animate-delay-600"></div>
          <div className="absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-data-stream"></div>
          <div className="absolute top-2/3 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-data-stream animate-delay-400"></div>
        </div>

        <div className="text-center max-w-4xl mx-auto relative z-10">
          <div className="opacity-0 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 text-center font-serif">Elaine Hong</h1>
            <p className="text-xl md:text-2xl text-primary font-medium mb-8 font-mono">
              Cornell ORIE student & Division I athlete — Turning data, code, and probability into actionable insights
            </p>
          </div>
          <div className="opacity-0 animate-fade-in-up animate-delay-400 flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 group hover-lift hover-neon animate-pulse-glow bg-primary text-primary-foreground font-mono shadow-xs"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              ./view_projects.sh
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 hover-lift neon-border hover-neon bg-transparent font-mono"
            >
              <Download className="mr-2 h-5 w-5" />
              download_resume.pdf
            </Button>
          </div>
          <div className="opacity-0 animate-fade-in-up animate-delay-600 flex justify-center gap-3.5 items-center flex-row leading-7">
            <Badge
              variant="secondary"
              className="text-sm px-4 py-2 bg-gradient-to-r from-secondary to-accent text-white font-mono neon-border"
            >
              Cornell.edu
            </Badge>
            <Badge
              variant="secondary"
              className="text-sm px-4 py-2 bg-gradient-to-r from-accent to-primary text-white font-mono neon-border"
            >
              D1_Fencing.athlete
            </Badge>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-6 bg-gradient-subtle data-grid">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4 bg-gradient-circuit bg-clip-text text-transparent">
              Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
              // Key algorithms demonstrating measurable business impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Supply Chain Optimization",
                result: "Reduced logistics costs by 23% ($2.1M savings)",
                tags: ["Linear Programming", "Cost Reduction", "Python"],
                gradient: "from-primary/20 to-secondary/20",
                accentColor: "primary",
                code: "optimize_supply_chain()",
              },
              {
                title: "Inventory Management System",
                result: "18% holding cost reduction, 99.2% service level",
                tags: ["Stochastic Models", "Inventory Control", "R"],
                gradient: "from-secondary/20 to-accent/20",
                accentColor: "secondary",
                code: "manage_inventory()",
              },
              {
                title: "Production Scheduling",
                result: "15% efficiency gain, 30% overtime reduction",
                tags: ["MIP", "Production Planning", "CPLEX"],
                gradient: "from-accent/20 to-primary/20",
                accentColor: "accent",
                code: "schedule_production()",
              },
              {
                title: "Demand Forecasting Model",
                result: "25% improvement in prediction accuracy",
                tags: ["Machine Learning", "Forecasting", "Scikit-learn"],
                gradient: "from-primary/20 to-accent/20",
                accentColor: "primary",
                code: "forecast_demand()",
              },
              {
                title: "Route Optimization",
                result: "20% fuel savings, 12% faster deliveries",
                tags: ["VRP", "Algorithms", "Optimization"],
                gradient: "from-secondary/20 to-primary/20",
                accentColor: "secondary",
                code: "optimize_routes()",
              },
              {
                title: "Risk Assessment Framework",
                result: "Portfolio analysis for $50M+ investments",
                tags: ["Monte Carlo", "Risk Management", "Finance"],
                gradient: "from-accent/20 to-secondary/20",
                accentColor: "accent",
                code: "assess_risk()",
              },
            ].map((project, index) => (
              <div key={index} className={`opacity-0 animate-scale-in animate-delay-${(index % 3) * 100 + 200}`}>
                <Card
                  className={`group hover-lift hover-neon transition-all-smooth h-full cursor-pointer bg-gradient-to-br ${project.gradient} neon-border`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg font-sans">
                      <span className="font-mono text-accent">{project.code}</span>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary" />
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-primary font-mono">
                      {project.result}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="text-xs border-primary/30 hover:bg-primary/10 font-mono"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary-foreground hover:bg-primary font-mono"
                    >
                      read_more() →
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2 opacity-0 animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                About
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a Cornell ORIE student passionate about solving complex optimization problems with real-world
                impact. My experience spans supply chain analytics, machine learning, and operations research, with a
                track record of delivering measurable results for Fortune 500 companies. When I'm not optimizing
                algorithms, you'll find me competing in D1 fencing or exploring the latest developments in AI and data
                science. I thrive on turning complex data into actionable insights that drive business decisions.
              </p>
            </div>
            <div className="opacity-0 animate-slide-in-right">
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg overflow-hidden hover-lift p-2">
                <div className="w-full h-full bg-gradient-to-br from-card to-background rounded-lg overflow-hidden">
                  <img src="/elaine-headshot.jpg" alt="Elaine Hong headshot" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-6 bg-gradient-subtle circuit-pattern">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-4 bg-gradient-matrix bg-clip-text text-transparent">
              TechnicalSkills
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="opacity-0 animate-slide-in-left">
              <Card className="hover-lift hover-neon transition-all-smooth text-center p-6 h-full bg-gradient-to-br from-primary/10 to-primary/5 neon-border">
                <Calculator className="h-8 w-8 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg mb-4 font-mono text-primary">optimization</CardTitle>
                <div className="space-y-2 text-sm text-muted-foreground font-mono">
                  <div>linear_programming()</div>
                  <div>cplex.solve()</div>
                  <div>mixed_integer_prog()</div>
                  <div>network_optimization()</div>
                </div>
                <div className="text-accent font-mono mt-4">end</div>
              </Card>
            </div>

            <div className="opacity-0 animate-fade-in-up animate-delay-200">
              <Card className="hover-lift hover-neon transition-all-smooth text-center p-6 h-full bg-gradient-to-br from-secondary/10 to-secondary/5 neon-border">
                <Brain className="h-8 w-8 text-secondary mx-auto mb-4" />
                <CardTitle className="text-lg mb-4 font-mono text-secondary">machine_learning</CardTitle>
                <div className="space-y-2 text-sm text-muted-foreground font-mono">
                  <div>sklearn.fit()</div>
                  <div>statistical_analysis()</div>
                  <div>predictive_modeling()</div>
                  <div>data_visualization()</div>
                </div>
                <div className="text-accent font-mono mt-4">end</div>
              </Card>
            </div>

            <div className="opacity-0 animate-fade-in-up animate-delay-400">
              <Card className="hover-lift hover-neon transition-all-smooth text-center p-6 h-full bg-gradient-to-br from-accent/10 to-accent/5 neon-border">
                <Code2 className="h-8 w-8 text-accent mx-auto mb-4" />
                <CardTitle className="text-lg mb-4 font-mono text-accent">development_stack</CardTitle>
                <div className="space-y-2 text-sm text-muted-foreground font-mono">
                  <div>python | r | sql</div>
                  <div>tableau | power_bi</div>
                  <div>git | docker</div>
                  <div>aws | gcp</div>
                </div>
                <div className="text-accent font-mono mt-4">end</div>
              </Card>
            </div>

            <div className="opacity-0 animate-slide-in-right animate-delay-600">
              <Card className="hover-lift hover-neon transition-all-smooth text-center p-6 h-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 neon-border">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg mb-4 font-mono text-primary">soft_skills</CardTitle>
                <div className="space-y-2 text-sm text-muted-foreground font-mono">
                  <div>problem_solving()</div>
                  <div>project_management()</div>
                  <div>client_communication()</div>
                  <div>team_leadership()</div>
                </div>
                <div className="text-accent font-mono mt-4">end</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience & Projects Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Professional Experience & Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Key projects and achievements demonstrating measurable business impact through operations research
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Supply Chain Cost Optimization",
                description:
                  "Reduced logistics costs by 23% through multi-modal transportation optimization model, saving $2.1M annually for Fortune 500 client",
                image: "/supply-chain-network.png",
                tags: ["Cost Reduction", "Linear Programming", "ROI: 340%"],
                impact: "$2.1M Annual Savings",
              },
              {
                title: "Inventory Management System",
                description:
                  "Implemented dynamic inventory control reducing holding costs by 18% while maintaining 99.2% service level across 50+ locations",
                image: "/analytics-dashboard.png",
                tags: ["Inventory Control", "Stochastic Models", "Service Level: 99.2%"],
                impact: "18% Cost Reduction",
              },
              {
                title: "Production Scheduling Optimization",
                description:
                  "Developed mixed-integer programming model increasing production efficiency by 15% and reducing overtime costs by 30%",
                image: "/optimization-model-visualization.png",
                tags: ["MIP", "Production Planning", "Efficiency +15%"],
                impact: "30% Overtime Reduction",
              },
              {
                title: "Demand Forecasting Model",
                description:
                  "Built ML-powered forecasting system improving prediction accuracy by 25%, enabling better resource allocation and planning",
                image: "/placeholder-nd9nj.png",
                tags: ["Machine Learning", "Forecasting", "Accuracy +25%"],
                impact: "25% Better Accuracy",
              },
              {
                title: "Route Optimization Algorithm",
                description:
                  "Designed vehicle routing solution reducing fuel consumption by 20% and improving delivery times by 12% for logistics company",
                image: "/fitness-app-ui.png",
                tags: ["VRP", "Fuel Efficiency", "Time Savings"],
                impact: "20% Fuel Savings",
              },
              {
                title: "Risk Assessment Framework",
                description:
                  "Created Monte Carlo simulation model for portfolio risk analysis, enabling data-driven investment decisions worth $50M+",
                image: "/web-app-interface.png",
                tags: ["Monte Carlo", "Risk Management", "Portfolio: $50M+"],
                impact: "$50M+ Portfolio",
              },
            ].map((project, index) => (
              <div key={index} className={`opacity-0 animate-scale-in animate-delay-${(index % 3) * 200 + 200}`}>
                <Card className="group hover-lift transition-all-smooth h-full">
                  <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/10 overflow-hidden rounded-t-lg">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      {project.title}
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
                    <div className="mt-2">
                      <Badge variant="default" className="text-xs font-semibold bg-accent text-accent-foreground">
                        {project.impact}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="text-xs border-primary/30 hover:bg-primary/10"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">Technical Expertise</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry-standard tools and methodologies for delivering optimization solutions
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="opacity-0 animate-slide-in-left">
              <Card className="hover-lift transition-all-smooth text-center p-6">
                <Calculator className="h-8 w-8 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg mb-3">Optimization</CardTitle>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    CPLEX
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Gurobi
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    AMPL
                  </Badge>
                </div>
              </Card>
            </div>

            <div className="opacity-0 animate-fade-in-up animate-delay-200">
              <Card className="hover-lift transition-all-smooth text-center p-6">
                <Code2 className="h-8 w-8 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg mb-3">Programming</CardTitle>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs font-mono">
                    Python
                  </Badge>
                  <Badge variant="outline" className="text-xs font-mono">
                    R
                  </Badge>
                  <Badge variant="outline" className="text-xs font-mono">
                    SQL
                  </Badge>
                </div>
              </Card>
            </div>

            <div className="opacity-0 animate-fade-in-up animate-delay-400">
              <Card className="hover-lift transition-all-smooth text-center p-6">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg mb-3">Analytics</CardTitle>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    Tableau
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Power BI
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Excel
                  </Badge>
                </div>
              </Card>
            </div>

            <div className="opacity-0 animate-slide-in-right animate-delay-600">
              <Card className="hover-lift transition-all-smooth text-center p-6">
                <Brain className="h-8 w-8 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg mb-3">Machine Learning</CardTitle>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    Scikit-learn
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    TensorFlow
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Pandas
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Recommendations */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="opacity-0 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-foreground mb-16">Professional Recommendations</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Delivered exceptional results on our supply chain optimization project. The 23% cost reduction exceeded our expectations and demonstrated strong analytical and problem-solving capabilities.",
                author: "Sarah Chen, MBA",
                role: "Director of Operations, LogiCorp",
                company: "Fortune 500 Logistics Company",
              },
              {
                quote:
                  "Outstanding technical skills combined with business acumen. The inventory management system implementation was flawless and delivered immediate ROI. Highly recommend for complex optimization challenges.",
                author: "Dr. Michael Rodriguez",
                role: "VP of Supply Chain Analytics",
                company: "Global Manufacturing Inc.",
              },
            ].map((testimonial, index) => (
              <div key={index} className={`opacity-0 animate-scale-in animate-delay-${index * 200 + 200}`}>
                <Card className="p-6 hover-lift transition-all-smooth h-full">
                  <CardContent className="pt-6">
                    <blockquote className="text-lg text-muted-foreground mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="text-sm">
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-primary font-medium">{testimonial.role}</div>
                      <div className="text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-20 px-6 bg-gradient-circuit text-primary-foreground relative overflow-hidden circuit-pattern"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-lg animate-float circuit-pattern"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-lg animate-float animate-delay-400 data-grid"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-lg animate-float animate-delay-200"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="opacity-0 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-sans font-bold mb-6 animate-neon-flicker">function contact</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed font-mono">
              // Ready to discuss optimization opportunities? Let's connect.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up animate-delay-200">
            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 hover-lift hover-neon bg-white text-primary hover:bg-white/90 font-mono"
            >
              <Mail className="h-5 w-5 mr-2" />
              elaine.hong@cornell.edu
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary bg-transparent hover-lift hover-neon font-mono"
            >
              <Linkedin className="h-5 w-5 mr-2" />
              ./linkedin
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary bg-transparent hover-lift hover-neon font-mono"
            >
              <Github className="h-5 w-5 mr-2" />
              ./github
            </Button>
          </div>
          <div className="mt-8 opacity-0 animate-fade-in-up animate-delay-400">
            <p className="font-mono text-accent text-lg">end</p>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="py-8 px-6 bg-card border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-card-foreground mb-4 md:mb-0">
            © 2024 Operations Research Professional Portfolio. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="hover-lift">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover-lift">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hover-lift">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
