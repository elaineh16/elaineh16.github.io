"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Github,
  LinkedinIcon,
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
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors font-mono">
              Contact
            </a>
            <a href="#resume" className="text-sm font-medium hover:text-primary transition-colors font-mono">
              Resume
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

      <section className="min-h-[90vh] flex items-center justify-center px-6 bg-background relative overflow-hidden">
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
              asChild
            >
              <a href="/elainehong_resume.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                download_resume.pdf
              </a>
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
              Engineering
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

      <section id="projects" className="py-20 px-6 bg-background">
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
                title: "Trading Strategy Backtester",
                result: "A full-stack tool for simulating and analyzing trading strategies with real market data",
                tags: ["Python", "Pandas", "NumPy", "Next.js", "TypeScript"],
                gradient: "from-secondary/20 to-accent/20",
                accentColor: "secondary",
                code: "backtest_strategy()",
              },
              {
                title: "AI-Powered Image Generation Automation Website",
                result: "A web app that automates AI-powered game asset creation with Stable Diffusion",
                tags: ["Python", "Next.js", "Forge UI", "Stable Diffusion API"],
                gradient: "from-primary/20 to-secondary/20",
                accentColor: "primary",
                code: "generate_ai_images()",
              },
              {
                title: "Opponent Intel Database",
                result: "A centralized scouting platform for storing, searching, and annotating fencing opponent data",
                tags: ["Python","Next.js", "Firebase", "Google Cloud"],
                gradient: "from-accent/20 to-primary/20",
                accentColor: "accent",
                code: "opponents_db()",
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
                      onClick={() => document.getElementById("professional-experience")?.scrollIntoView({ behavior: "smooth" })}
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

      <section id="about" className="py-20 px-6 bg-background relative overflow-hidden">
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
                Hi, I’m Elaine — a Cornell ORIE student who loves solving puzzles, whether that’s through 
                optimization models, coding projects, or figuring out the best way to automate creative workflows.
                When I’m not building tools or experimenting with data, you’ll probably find me fencing as part of Cornell’s
                Division I team, exploring new ideas, or tinkering with side projects. I enjoy mixing logic with creativity 
                and turning wild ideas into things that actually work.
              </p>
            </div>
                          <div className="opacity-0 animate-slide-in-right">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg overflow-hidden hover-lift p-2">
                  <div className="w-full h-full bg-gradient-to-br from-card to-background rounded-lg overflow-hidden">
                    <img src="/IMG_9116.jpg" alt="Elaine Hong headshot" className="w-full h-full object-cover" />
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
      <section id="professional-experience" className="py-12 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Professional Experience & Projects</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Trading Strategy Backtester",
                description:
                  "Designed and implemented a production-grade platform that integrates Stable Diffusion with a Python backend to automate the generation of creative assets, including symbols, icons, and bonus art. Built an intuitive Next.js + Forge UI interface that enabled non-technical users to design and manage content workflows seamlessly. The solution streamlined asset production pipelines and improved output efficiency, increasing content generation speed by 40% while reducing dependency on manual design processes.",
                image: "/analytics-dashboard.png",
                tags: ["Next.js", "TypeScript", "Python", "Pandas", "NumPy", "Sharpe Ratio 1.8"],
                impact: "12% Higher Returns",
              },
              {
                title: "AI-Powered Image Generation Automation Website",
                description:
                  "Developed a comprehensive backtesting platform integrating a Python backend for trade execution and portfolio performance computation with a Next.js + TypeScript frontend for visualization and parameter control. The system enabled efficient evaluation of strategies on historical data, supporting key metrics such as portfolio value, returns, and drawdowns. Demonstrated practical impact by achieving a Sharpe ratio of 1.8 and 12% higher returns compared to a buy-and-hold benchmark, providing a reliable framework for data-driven investment research.",
                image: "/web-app-interface.png",
                tags: ["Python", "Next.js", "Forge UI", "Production +40%"],
                impact: "40% Production Increase",
              },
              {
                title: "Opponent Intel Database",
                description:
                  "Engineered a full-stack web application with Next.js, Firebase, and Google Cloud to consolidate and streamline scouting operations for competitive fencing. The platform provided structured opponent profiles, tactical notes, and annotated bout videos, supported by a Firestore schema and RESTful API enabling sub-second search and automated summaries. Achieved 100% adoption within the training squad, with 12+ athletes leveraging the system to track over 50 opponents and improve preparation efficiency by 30%.",
                image: "/web-app-interface.png",
                tags: ["Next.js", "Firebase", "Google Cloud", "100% Adoption", "30% Efficiency"],
                impact: "30% Prep Efficiency",
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



      <section
        id="contact"
        className="py-20 px-6 bg-background text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-lg animate-float circuit-pattern"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-lg animate-float animate-delay-400 data-grid"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-lg animate-float animate-delay-200"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="opacity-0 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6 animate-neon-flicker">Contact Information</h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed font-mono text-red-500">
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
              eh698@cornell.edu
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 hover-lift hover-neon bg-white text-primary hover:bg-white/90 font-mono"
              asChild
            >
              <a href="https://www.linkedin.com/in/elaine-hong-cornell" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="h-5 w-5 mr-2" />
                ./linkedin
              </a>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="text-lg px-8 hover-lift hover-neon bg-white text-primary hover:bg-white/90 font-mono"
            >
              <Github className="h-5 w-5 mr-2" />
              ./github
            </Button>
          </div>
          <div className="mt-8 opacity-0 animate-fade-in-up animate-delay-400">
            <p className="font-mono text-accent text-lg"></p>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="py-6 px-6 bg-card border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-card-foreground mb-4 md:mb-0">
            © Elaine Hong 2025. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" size="sm" className="hover-lift" asChild>
              <a href="https://www.linkedin.com/in/elaine-hong-cornell" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="secondary" size="sm" className="hover-lift">
              <Github className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" className="hover-lift">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
