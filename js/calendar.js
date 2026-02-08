function renderCalendar() {
  const container = document.getElementById("calendar");

  if (!appState.lastPeriodStart) {
    container.innerHTML =
      "<p style='color:#6b7280'>No cycle data yet. Go back and add your details.</p>";
    return;
  }

//   const start = new Date(appState.lastPeriodStart);
  const start = normalizeDate(new Date(appState.lastPeriodStart));

  const nextPeriod = predictNextPeriod(start, appState.cycleLength);
  const ovulation = predictOvulation(nextPeriod);
  const fertile = fertileWindow(ovulation);

  const year = nextPeriod.getFullYear();
  const month = nextPeriod.getMonth();

  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  // ✅ Build HTML first
  let html = `<h3>${monthName}</h3>`;
  html += "<table><tr>";

  // Empty cells before day 1
  for (let i = 0; i < firstDay.getDay(); i++) {
    html += "<td></td>";
  }

  for (let d = 1; d <= daysInMonth; d++) {
    // const date = new Date(year, month, d);
    const date = normalizeDate(new Date(year, month, d));

    let cls = "";

    if (date >= start && date < addDays(start, appState.periodLength)) {
      cls = "period";
    } else if (date.toDateString() === ovulation.toDateString()) {
      cls = "ovulation";
    } else if (date >= fertile.start && date <= fertile.end) {
      cls = "fertile";
    }


    html += `<td class="${cls}">${d}</td>`;

    if ((firstDay.getDay() + d) % 7 === 0) {
      html += "</tr><tr>";
    }
  }

  html += "</tr></table>";

  // ✅ Inject once
  container.innerHTML = html;
}

renderCalendar();
