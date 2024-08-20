/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/7R7Um4Gztme
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Luv() {
  const [startDate, setStartDate] = useState(new Date())
  const [partner1Birthday, setPartner1Birthday] = useState(new Date())
  const [partner2Birthday, setPartner2Birthday] = useState(new Date())
  const [daysCounter, setDaysCounter] = useState(0)
  const [anniversary, setAnniversary] = useState(new Date())
  const [showInfo, setShowInfo] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setDaysCounter((prevDays) => prevDays + 1)
    }, 86400000)
    return () => clearInterval(interval)
  }, [])
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }
  const getDaysSince = () => {
    const diffInDays = Math.floor(
      (new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    return diffInDays
  }
  const isUpcomingBirthday = (birthday) => {
    const today = new Date()
    const birthdayThisYear = new Date(
      today.getFullYear(),
      birthday.getMonth(),
      birthday.getDate()
    )
    return (
      birthdayThisYear > today &&
      birthdayThisYear <
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
    )
  }
  const isUpcomingAnniversary = () => {
    const today = new Date()
    const anniversaryThisYear = new Date(
      today.getFullYear(),
      anniversary.getMonth(),
      anniversary.getDate()
    )
    return (
      anniversaryThisYear > today &&
      anniversaryThisYear <
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
    )
  }
  const getUpcomingDays = () => {
    const today = new Date()
    const partner1BirthdayThisYear = new Date(
      today.getFullYear(),
      partner1Birthday.getMonth(),
      partner1Birthday.getDate()
    )
    const partner2BirthdayThisYear = new Date(
      today.getFullYear(),
      partner2Birthday.getMonth(),
      partner2Birthday.getDate()
    )
    const anniversaryThisYear = new Date(
      today.getFullYear(),
      anniversary.getMonth(),
      anniversary.getDate()
    )
    const next100thDay = Math.ceil(getDaysSince() / 100) * 100
    const upcomingDays = [
      { label: 'Current D+ Date', value: getDaysSince() },
      {
        label: 'D day until Partner 1 Birthday',
        value: Math.ceil(
          (partner1BirthdayThisYear.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      },
      {
        label: 'D day until Partner 2 Birthday',
        value: Math.ceil(
          (partner2BirthdayThisYear.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      },
      {
        label: 'D day until next Anniversary',
        value: Math.ceil(
          (anniversaryThisYear.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        ),
      },
      {
        label: `D day until next 100th (${next100thDay})`,
        value: next100thDay - getDaysSince(),
      },
    ]
    return upcomingDays.sort((a, b) => a.value - b.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowInfo(true)
  }
  return (
    <div className="bg-background text-foreground mx-auto max-w-md rounded-lg p-6 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Date Counter for Lovers</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="mb-1 block text-sm font-medium"
            >
              Start Date
            </label>
            <Input
              id="startDate"
              type="date"
              value={startDate.toISOString().split('T')[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="partner1Birthday"
              className="mb-1 block text-sm font-medium"
            >
              Partner 1 Birthday
            </label>
            <Input
              id="partner1Birthday"
              type="date"
              value={partner1Birthday.toISOString().split('T')[0]}
              onChange={(e) => setPartner1Birthday(new Date(e.target.value))}
            />
          </div>
          <div>
            <label
              htmlFor="partner2Birthday"
              className="mb-1 block text-sm font-medium"
            >
              Partner 2 Birthday
            </label>
            <Input
              id="partner2Birthday"
              type="date"
              value={partner2Birthday.toISOString().split('T')[0]}
              onChange={(e) => setPartner2Birthday(new Date(e.target.value))}
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
      {showInfo && (
        <div className="mt-6">
          <h2 className="mb-4 text-xl font-semibold">Upcoming Dates</h2>
          <ul>
            {getUpcomingDays().map((day, index) => (
              <li key={index} className="mb-2 flex justify-between">
                <span>{day.label}</span>
                <span className="font-semibold">{day.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}