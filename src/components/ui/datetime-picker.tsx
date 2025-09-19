"use client";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder = "MM/DD/YYYY hh:mm aa",
  disabled = false,
  className
}: DateTimePickerProps) {

  function handleDateSelect(date: Date | undefined) {
    if (date && onChange) {
      // Preserve existing time if there is one
      if (value) {
        const newDate = new Date(date);
        newDate.setHours(value.getHours());
        newDate.setMinutes(value.getMinutes());
        onChange(newDate);
      } else {
        onChange(date);
      }
    }
  }

  function handleTimeChange(type: "hour" | "minute" | "ampm", timeValue: string) {
    const currentDate = value || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(timeValue, 10);
      const isCurrentlyPM = newDate.getHours() >= 12;
      newDate.setHours(isCurrentlyPM ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(timeValue, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (timeValue === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (timeValue === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    if (onChange) {
      onChange(newDate);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          disabled={disabled}
          className={cn(
            " w-full pl-20 h-15 border-[#e5e7eb] rounded-4xl focus:border-[#8898f0] focus:ring-[#8898f0] border-1 text-lg font-normal justify-start",
            !value && "text-muted-foreground",
            className
          )}
        >
          {value ? (
            format(value, "MM/dd/yyyy hh:mm aa")
          ) : (
            <span className="text-lg">{placeholder}</span>
          )}
          <CalendarIcon className="h-10 w-10 text-[#8898f0] ml-auto"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i + 1)
                  .reverse()
                  .map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        value &&
                        value.getHours() % 12 === hour % 12
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange("hour", hour.toString())
                      }
                    >
                      {hour}
                    </Button>
                  ))}
              </div>
              <ScrollBar
                orientation="horizontal"
                className="sm:hidden"
              />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map(
                  (minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        value &&
                        value.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange("minute", minute.toString())
                      }
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  )
                )}
              </div>
              <ScrollBar
                orientation="horizontal"
                className="sm:hidden"
              />
            </ScrollArea>
            <ScrollArea className="">
              <div className="flex sm:flex-col p-2">
                {["AM", "PM"].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      value &&
                      ((ampm === "AM" &&
                        value.getHours() < 12) ||
                        (ampm === "PM" &&
                          value.getHours() >= 12))
                        ? "default"
                        : "ghost"
                    }
                    className="sm:w-full shrink-0 aspect-square"
                    onClick={() => handleTimeChange("ampm", ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
