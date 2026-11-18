"use client";

import { useEffect, useRef, useState } from "react";
import type { ContributionCalendar, ContributionDay } from "../server/github-contributions";

const profile = "https://github.com/huwanwanwan";
const dateOf = (day: ContributionDay) => new Date(`${day.date}T12:00:00Z`);
const describe = (day: ContributionDay) => `${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${dateOf(day).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}`;

export default function GitHubContributions() {
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [failed, setFailed] = useState(false);
  const [selected, setSelected] = useState<ContributionDay | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github-contributions", { signal: controller.signal, cache: "no-store" })
      .then(async response => {
        if (!response.ok) throw new Error("Unavailable");
        const data: ContributionCalendar = await response.json();
        if (!Array.isArray(data.days) || data.days.length < 300) throw new Error("Invalid calendar");
        setCalendar(data);
      })
      .catch(error => { if (error.name !== "AbortError") setFailed(true); });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!calendar || !scroller) return;
    const showLatest = () => { scroller.scrollLeft = scroller.scrollWidth; };
    const observer = new ResizeObserver(showLatest);
    observer.observe(scroller);
    const stopAutoScroll = () => observer.disconnect();
    scroller.addEventListener("pointerdown", stopAutoScroll, { once: true });
    scroller.addEventListener("keydown", stopAutoScroll, { once: true });
    showLatest();
    return () => {
      observer.disconnect();
      scroller.removeEventListener("pointerdown", stopAutoScroll);
      scroller.removeEventListener("keydown", stopAutoScroll);
    };
  }, [calendar]);

  const slots: (ContributionDay | null)[] = calendar
    ? [...Array<null>(dateOf(calendar.days[0]).getUTCDay()).fill(null), ...calendar.days]
    : [];
  const weeks = Math.ceil(slots.length / 7);
  const activeDays = calendar?.days.filter(day => day.count > 0).length ?? 0;
  const months: { index: number; label: string }[] = [];
  let previousMonth = -1;
  for (let index = 0; index < weeks; index++) {
    const day = slots.slice(index * 7, index * 7 + 7).find(Boolean);
    if (!day) continue;
    const month = dateOf(day).getUTCMonth();
    if (month !== previousMonth) {
      months.push({ index, label: dateOf(day).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) });
      previousMonth = month;
    }
  }

  return (
    <section className="section-block content-section github-activity" id="github-activity" aria-labelledby="github-heading" data-scroll-reveal>
      <div className="github-activity-heading">
        <div>
          <p className="editorial-eyebrow"><span className="editorial-eyebrow-dot" aria-hidden="true" />GITHUB CONTRIBUTIONS</p>
          <h2 id="github-heading">My work, one contribution at a time.</h2>
        </div>
        <a className="github-profile-link" href={profile} target="_blank" rel="noopener noreferrer">@huwanwanwan <span aria-hidden="true">↗</span></a>
      </div>
      <div className="github-calendar-card" aria-busy={!calendar && !failed}>
        {calendar ? (
          <>
            <div className="github-calendar-summary">
              <p><strong>{calendar.total.toLocaleString()}</strong> contributions in the last year</p>
              <span>{activeDays} active {activeDays === 1 ? "day" : "days"}</span>
            </div>
            <div className="github-calendar-scroll" ref={scrollRef} tabIndex={0} aria-label="GitHub contribution calendar. Scroll horizontally to explore the full year.">
              <div className="github-calendar-layout">
                <div className="github-weekdays" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
                <div className="github-calendar-year">
                  <div className="github-months" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }} aria-hidden="true">
                    {months.map(month => <span key={month.index} style={{ gridColumn: `${month.index + 1} / span 1` }}>{month.label}</span>)}
                  </div>
                  <div className="github-days" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}>
                    {Array.from({ length: weeks * 7 }, (_, index) => {
                      const day = slots[index];
                      return day ? <button type="button" className={`github-day github-level-${day.level}`} key={day.date}
                        style={{ gridColumn: Math.floor(index / 7) + 1, gridRow: index % 7 + 1 }}
                        title={describe(day)} aria-label={describe(day)} tabIndex={day.count > 0 ? 0 : -1}
                        onMouseEnter={() => setSelected(day)} onFocus={() => setSelected(day)} onClick={() => setSelected(day)} />
                        : <span key={`empty-${index}`} style={{ gridColumn: Math.floor(index / 7) + 1, gridRow: index % 7 + 1 }} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="github-calendar-footer">
              <p aria-live="polite">{selected ? describe(selected) : "Activity from my GitHub contribution calendar."}</p>
              <div className="github-legend" aria-label="Contribution intensity: less to more"><span>Less</span>{[0, 1, 2, 3, 4].map(level => <i key={level} className={`github-level-${level}`} aria-hidden="true" />)}<span>More</span></div>
            </div>
          </>
        ) : failed ? (
          <p className="github-calendar-status">GitHub activity is temporarily unavailable. <a href={profile} target="_blank" rel="noopener noreferrer">View my contributions on GitHub ↗</a></p>
        ) : <p className="github-calendar-status" role="status">Loading GitHub contributions…</p>}
      </div>
    </section>
  );
}
