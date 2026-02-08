function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function predictNextPeriod(startDate, cycleLength) {
  return addDays(startDate, cycleLength);
}

function predictOvulation(nextPeriodDate) {
  return addDays(nextPeriodDate, -14);
}

function fertileWindow(ovulationDate) {
  return {
    start: addDays(ovulationDate, -5),
    end: addDays(ovulationDate, 1)
  };
}
function normalizeDate(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
