'use client'
import {CalendarProps, DateValue, useCalendar, useLocale} from "react-aria"
import {useCalendarState} from 'react-stately';
import {createCalendar} from '@internationalized/date';
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";

export function Calendar(props : CalendarProps<DateValue>){
    const {locale} = useLocale();
    let state = useCalendarState({
        ...props,
        visibleDuration : {months : 1},
        locale,
        createCalendar
      });
      let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
        props,
        state
      );
    
    return (
        <div {...calendarProps} className="inline-block">
        <CalendarHeader 
        calendarProps={calendarProps} 
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
        state={state}
        />
        <div className="flex gap-8">
        <CalendarGrid state={state}/>
        </div>
        </div>
    )
}