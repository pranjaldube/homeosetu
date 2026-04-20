import React from "react"

interface Stat {
  value: string
  label: string
  icon?: React.ReactNode
}

interface StatsSectionProps {
  title: string
  subtitle?: string
  stats: Stat[]
  className?: string
}

export const StatsSection = ({
  title,
  subtitle,
  stats,
  className,
}: StatsSectionProps) => {
  return (
    <section className={`py-20 bg-brand-primary-surface ${className || ""}`}>
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-card rounded-lg border border-border hover:shadow-sm transition-shadow duration-200"
            >
              {stat.icon && (
                <div className="mb-3">{stat.icon}</div>
              )}
              <div className="text-4xl font-bold text-brand-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
