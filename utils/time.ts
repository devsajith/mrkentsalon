export function addMinutes(
  time: string,
  minutes: number
): string {

  const [hours, mins] =
    time.split(":").map(Number);

  const date = new Date();

  date.setHours(hours);
  date.setMinutes(mins);
  date.setSeconds(0);
  date.setMilliseconds(0);

  date.setMinutes(
    date.getMinutes() + minutes
  );

  return date
    .toTimeString()
    .slice(0, 5);
}

export function timeToMinutes(
  time: string
): number {

  const [hours, mins] =
    time.split(":").map(Number);

  return (
    hours * 60 + mins
  );
}

export function minutesToTime(
  minutes: number
): string {

  const hours =
    Math.floor(minutes / 60);

  const mins =
    minutes % 60;

  return `${String(hours).padStart(
    2,
    "0"
  )}:${String(mins).padStart(
    2,
    "0"
  )}`;
}

export function overlaps(
  startA: string,
  endA: string,
  startB: string,
  endB: string
): boolean {

  const startAMin =
    timeToMinutes(startA);

  const endAMin =
    timeToMinutes(endA);

  const startBMin =
    timeToMinutes(startB);

  const endBMin =
    timeToMinutes(endB);

  return (
    startAMin < endBMin &&
    endAMin > startBMin
  );
}

export function generateTimeSlots(
  openingTime: string,
  closingTime: string,
  interval: number
): string[] {

  const slots: string[] = [];

  let current =
    timeToMinutes(
      openingTime
    );

  const end =
    timeToMinutes(
      closingTime
    );

  while (current < end) {

    slots.push(
      minutesToTime(
        current
      )
    );

    current += interval;
  }

  return slots;
}

export function formatTime12Hour(
  time: string
): string {

  const [hours, mins] =
    time.split(":").map(Number);

  const period =
    hours >= 12
      ? "PM"
      : "AM";

  const displayHour =
    hours % 12 || 12;

  return `${displayHour}:${String(
    mins
  ).padStart(
    2,
    "0"
  )} ${period}`;
}