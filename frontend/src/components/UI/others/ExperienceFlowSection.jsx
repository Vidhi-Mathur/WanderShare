import { Upload, Users, Star } from "lucide-react"

const steps = [{
    step: "1",
    title: "Share Your Adventure",
    description:
      "Upload stunning travel photos with locations and personal stories. Help other travelers discover hidden gems and inspire their next journey.",
    icon: Upload,
    color: "from-primary to-primary-light",
  }, {
    step: "2",
    title: "Engage & Review",
    description:
      "Explore fellow travelers' journeys, leave thoughtful reviews, rate photos, and provide helpful travel tips. Help others learn from your experiences.",
    icon: Users,
    color: "from-accent to-primary",
  }, {
    step: "3",
    title: "Build Community Legacy",
    description:
      "Connect with like-minded explorers, grow your influence in the travel community, and collectively shape the future of travel discovery.",
    icon: Star,
    color: "from-primary to-accent",
}]

export const ExperienceFlowSection = () => {
    return (
        <section className=" bg-linear-to-b from-background via-primary-light/10 to-background relative overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-50" />
            <div className="absolute bottom-32 right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl opacity-50" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center space-y-6 mb-20">
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent-light/20 border border-accent/40 rounded-full">
                        <span className="text-sm font-bold text-accent uppercase tracking-widest font-poppins">How It Works</span>
                    </div>
                    <h2 className="font-playfair text-6xl sm:text-7xl font-bold text-foreground">
                        Make it Your Journey in{" "}
                        <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">3 Steps</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed font-poppins">
                        Get started with WanderShare and become part of our global travel community
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute top-24 left-8 right-8 h-1 bg-linear-to-r from-primary via-accent to-primary opacity-20 hidden lg:block" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.map((item, idx) => {
                            const Icon = item.icon
                            return (
                                <div key={idx} className="relative group">
                                    <div className="h-full relative z-10 p-8 rounded-2xl border border-border/50 bg-card hover:border-accent/50 hover:shadow-2xl transition-all hover:bg-linear-to-br hover:from-primary/5 hover:to-accent/5">
                                        <div className="space-y-6">
                                            <div className={`relative inline-block w-16 h-16 rounded-2xl bg-linear-to-br ${item.color} p-1`}>
                                                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                                                    <span className="text-2xl font-black bg-linear-to-br ${item.color} bg-clip-text text-transparent font-playfair">
                                                        <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                                                  </span>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-playfair text-2xl font-bold text-foreground mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed font-poppins">  {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
