import dayjs from "dayjs";

const navButton = document.getElementById("nav-button");
const navLinks = document.getElementById("nav-links");

navButton.addEventListener("click", () => {
  navButton.classList.toggle("nav-button-close");
  navLinks.classList.toggle("nav-links-active");
});

const today = dayjs().format("YYYY-MM-DD");
const currentMonthDays = createDaysForCurrentMonth(2020, 10);
const previousMonthDays = createDaysForPreviousMonth(2020, 10);
const nextMonthDays = createDaysForNextMonth(2020, 10);
const calendarDays = [
  ...previousMonthDays,
  ...currentMonthDays,
  ...nextMonthDays,
];
const calendarContent = document.getElementById("calendar-content");

calendarDays.forEach((day) => {
  appendDay(day, calendarContent);
});

function getNumberOfDaysInMonth(year, month) {
  return dayjs(`${year}-${month}-01`).daysInMonth();
}

function createDaysForCurrentMonth(year, month) {
  const numberOfDaysInMonth = getNumberOfDaysInMonth(year, month);
  const dayObjects = [];

  for (let index = 0; index < numberOfDaysInMonth; index++) {
    dayObjects.push({
      date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
      weekday: dayjs(`${year}-${month}-${index + 1}`).format("dd"),
      dayOfMonth: index + 1,
      isCurrentMonth: true,
    });
  }
  return dayObjects;
}

function createDaysForPreviousMonth(year, month) {
  const firstDayOfTheMonthWeekday = dayjs(currentMonthDays[0].date).format("d");
  const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

  const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
    ? parseInt(firstDayOfTheMonthWeekday)
    : 0;

  const previousMonthLastSundayDayOfMonth = dayjs(currentMonthDays[0].date)
    .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
    .date();

  const dayObjects = [];
  for (
    let index = previousMonthLastSundayDayOfMonth;
    index <
    previousMonthLastSundayDayOfMonth + visibleNumberOfDaysFromPreviousMonth;
    index++
  ) {
    dayObjects.push({
      date: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${index}`
      ).format("YYYY-MM-DD"),
      weekday: dayjs(
        `${previousMonth.year()}-${previousMonth.month() + 1}-${index}`
      ).format("dd"),
      dayOfMonth: index,
      isCurrentMonth: false,
    });
  }
  return dayObjects;
}

function createDaysForNextMonth(year, month) {
  const lastDayOfTheMonthWeekday = dayjs(
    `${year}-${month}-${currentMonthDays.length}`
  ).format("d");
  const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");

  const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
    ? 6 - lastDayOfTheMonthWeekday
    : 6;

  return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
    return {
      date: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("YYYY-MM-DD"),
      weekday: dayjs(
        `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
      ).format("dd"),
      dayOfMonth: index + 1,
      isCurrentMonth: false,
    };
  });
}

function appendDay(day, calendarContent) {
  const dayElement = document.createElement("button");
  dayElement.innerText = day.dayOfMonth;
  dayElement.classList.add("calendar-day");
  dayElement.tabIndex = -1;

  if (!day.isCurrentMonth) {
    dayElement.classList.add("calendar-day-not-current");
  } else {
    if (day.weekday === "Fr" || day.weekday === "Sa" || day.weekday === "Su") {
      if (dayjs(day.date).isBefore(today)) {
        dayElement.classList.add("calendar-day-highlight-past");
      } else {
        dayElement.classList.add("calendar-day-highlight");
        dayElement.tabIndex = 0;
      }
    }

    if (day.date === today) {
      dayElement.classList.add("calendar-day-today");
    }
  }

  dayElement.addEventListener("click", () => {
    Array.from(
      calendarContent.getElementsByClassName("calendar-day-selected")
    ).forEach((el) => {
      if (el !== dayElement) {
        el.classList.remove("calendar-day-selected");
      }
    });
    dayElement.classList.toggle("calendar-day-selected");
  });

  calendarContent.appendChild(dayElement);
}
