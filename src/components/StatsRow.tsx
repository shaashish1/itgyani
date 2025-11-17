import { Users, GraduationCap, Workflow, Clock, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  icon: React.ReactNode;
  number: string;
  label: string;
  color: "green" | "blue";
}

const StatCard = ({ icon, number, label, color }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const targetNumber = parseInt(number.replace(/[^0-9]/g, "")) || 0;
  const suffix = number.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = targetNumber / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= targetNumber) {
              setCount(targetNumber);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className="glass-card p-8 rounded-2xl border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:shadow-neon-green/10"
    >
      <div className={`w-16 h-16 rounded-xl bg-${color === "green" ? "neon-green" : "electric-blue"}/20 flex items-center justify-center mb-4 mx-auto`}>
        {icon}
      </div>
      <div className={`text-5xl font-display font-bold mb-2 ${color === "green" ? "text-neon-green" : "text-electric-blue"}`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-base font-body text-muted-foreground">{label}</div>
    </div>
  );
};

const StatsRow = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <StatCard
            icon={<Users className="h-8 w-8 text-neon-green" />}
            number="10000+"
            label="Active Users"
            color="green"
          />
          <StatCard
            icon={<GraduationCap className="h-8 w-8 text-electric-blue" />}
            number="50+"
            label="Expert-Led Courses"
            color="blue"
          />
          <StatCard
            icon={<Workflow className="h-8 w-8 text-neon-green" />}
            number="300+"
            label="Ready-to-Use Workflows"
            color="green"
          />
          <StatCard
            icon={<Clock className="h-8 w-8 text-electric-blue" />}
            number="24/7"
            label="Always Available"
            color="blue"
          />
          <StatCard
            icon={<FileText className="h-8 w-8 text-neon-green" />}
            number="5000+"
            label="Content Created"
            color="green"
          />
        </div>
      </div>
    </section>
  );
};

export default StatsRow;
