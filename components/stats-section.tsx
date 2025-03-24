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
    <section className={`py-20 bg-purple-50 relative overflow-hidden ${className || ""}`}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-200 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full opacity-20 transform translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-purple-300 rounded-full opacity-10"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-2xl mx-auto mb-20 text-center">
          <h2 className="text-4xl font-bold text-purple-900 mb-6 leading-tight">{title}</h2>
          {subtitle && (
            <p className="text-lg text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center gap-10">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center w-full sm:w-72 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Top corner decoration */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300 -rotate-12 transform origin-top-right"></div>
              </div>
              
              <div className="relative z-10">
                {stat.icon && (
                  <div className="mb-4 mx-auto">{stat.icon}</div>
                )}
                <div className="text-5xl font-extrabold text-purple-700 group-hover:text-purple-800 transition-colors duration-300 mb-3 transform group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="w-12 h-1 bg-purple-200 group-hover:bg-purple-400 transition-colors duration-300 mx-auto mb-3"></div>
                <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-lg">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 