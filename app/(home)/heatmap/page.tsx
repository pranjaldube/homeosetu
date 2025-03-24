"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for the heatmap
const generateHeatmapData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  
  const data = []
  for (let i = 0; i < months.length; i++) {
    for (let j = 0; j < days.length; j++) {
      // Random value between 0 and 100
      const value = Math.floor(Math.random() * 100)
      data.push({
        month: months[i],
        day: days[j],
        value: value
      })
    }
  }
  return data
}

// Function to determine the color based on value
const getColor = (value: number) => {
  if (value < 20) return 'bg-purple-100'
  if (value < 40) return 'bg-purple-200'
  if (value < 60) return 'bg-purple-300'
  if (value < 80) return 'bg-purple-400'
  return 'bg-purple-500'
}

const HeatmapPage = () => {
  const [data] = useState(generateHeatmapData())
  const [metric, setMetric] = useState('engagement')
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-5xl mx-auto">
        <Card className="border shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">Course Activity Heatmap</CardTitle>
                <CardDescription>
                  Visual representation of course activity patterns throughout the year
                </CardDescription>
              </div>
              <Select value={metric} onValueChange={setMetric}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engagement">Student Engagement</SelectItem>
                  <SelectItem value="completion">Course Completions</SelectItem>
                  <SelectItem value="enrollment">New Enrollments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4">
              {/* Legend */}
              <div className="flex items-center justify-end mb-4">
                <div className="text-xs text-gray-500 mr-2">Less</div>
                <div className="flex">
                  <div className="w-5 h-5 bg-purple-100"></div>
                  <div className="w-5 h-5 bg-purple-200"></div>
                  <div className="w-5 h-5 bg-purple-300"></div>
                  <div className="w-5 h-5 bg-purple-400"></div>
                  <div className="w-5 h-5 bg-purple-500"></div>
                </div>
                <div className="text-xs text-gray-500 ml-2">More</div>
              </div>
              
              {/* Heatmap Grid */}
              <div className="overflow-x-auto">
                <div className="min-w-[900px]">
                  {/* Month headers */}
                  <div className="flex">
                    <div className="w-16"></div> {/* Empty corner space */}
                    {months.map(month => (
                      <div key={month} className="flex-1 text-center text-sm font-medium text-gray-600">
                        {month}
                      </div>
                    ))}
                  </div>
                  
                  {/* Day rows with cells */}
                  {days.map(day => (
                    <div key={day} className="flex mt-1">
                      <div className="w-16 text-sm font-medium text-gray-600 flex items-center">
                        {day}
                      </div>
                      {months.map(month => {
                        const cellData = data.find(d => d.month === month && d.day === day)
                        return (
                          <div 
                            key={`${month}-${day}`} 
                            className={`flex-1 aspect-square m-0.5 rounded ${getColor(cellData?.value || 0)} hover:ring-2 hover:ring-purple-800 transition-all duration-200 cursor-pointer group relative`}
                          >
                            <div className="absolute invisible group-hover:visible -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                              {day}, {month}: {cellData?.value || 0}%
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8 text-sm text-gray-500">
                <p>This heatmap visualizes {metric === 'engagement' ? 'student engagement' : metric === 'completion' ? 'course completions' : 'new enrollments'} patterns across days and months.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle>Insights</CardTitle>
              <CardDescription>
                Key observations from the heatmap data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h3 className="font-medium text-purple-900">Peak Activity Periods</h3>
                  <p className="text-gray-600 mt-1">The highest activity is observed during mid-week (Tuesday-Thursday) and in the months of February, June, and September.</p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-900">Seasonal Patterns</h3>
                  <p className="text-gray-600 mt-1">There's a noticeable increase in activity at the beginning of each quarter, suggesting correlation with academic calendars.</p>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h3 className="font-medium text-amber-900">Recommended Actions</h3>
                  <p className="text-gray-600 mt-1">Consider scheduling new course releases and promotions during high-engagement periods to maximize impact.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default HeatmapPage 