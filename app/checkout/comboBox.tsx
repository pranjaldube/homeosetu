import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import React, { useState } from "react"

interface ComboBoxProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
}

export const ComboBox = ({ label, options, value, onChange }: ComboBoxProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-1">
  {/* Label above the combobox trigger */}
  <label className="text-sm font-medium text-gray-700">{label}</label>

  <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        className="w-full justify-between text-left"
      >
        {value || `Select ${label}`}
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>

    {/* Force dropdown below the button (which is already below the label) */}
    <PopoverContent
      align="start"
      className="w-full p-0 mt-1 z-50"
      style={{height:"250px"}}
    >
      <Command>
        <CommandInput placeholder={`Search ${label}...`} />
        <CommandEmpty>No result found.</CommandEmpty>
        <CommandGroup style={{overflowY:"scroll"}}>
          {options.map((option) => (
            <CommandItem
              key={option}
              value={option}
              onSelect={() => {
                onChange(option)
                setOpen(false)
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === option ? "opacity-100" : "opacity-0"
                )}
              />
              {option}
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
</div>

  )
}
