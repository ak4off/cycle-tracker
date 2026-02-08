/* =======================
   Google OAuth config
======================= */

const CLIENT_ID = "[clientID].apps.googleusercontent.com";
const REDIRECT_URI = "http://127.0.0.1:5500/settings.html";
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

function connectGoogleCalendar() {
  const authUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=" + CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
    "&response_type=token" +
    "&scope=" + encodeURIComponent(SCOPES);

  window.location.href = authUrl;
}

/* =======================
   Calendar API helpers
======================= */

async function createEvent(summary, startDate, endDate) {
  const token = localStorage.getItem("google_access_token");

  if (!token) {
    alert("Google Calendar not connected.");
    return;
  }

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        summary,
        start: { date: startDate },
        end: { date: endDate }
      })
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("Calendar error:", data);
    alert("Calendar sync failed. Check console.");
    return;
  }

  return data;
}

/* =======================
   MAIN SYNC FUNCTION
   (PERIOD ONLY)
======================= */
async function syncToGoogleCalendar() {
  if (!appState.lastPeriodStart) {
    alert("Please enter cycle data first.");
    return;
  }

  const token = localStorage.getItem("google_access_token");
  if (!token) {
    alert("Please connect Google Calendar first.");
    return;
  }

  const start = new Date(appState.lastPeriodStart);
  const nextPeriod = predictNextPeriod(start, appState.cycleLength);
  const ovulation = predictOvulation(nextPeriod);
  const fertile = fertileWindow(ovulation);

  let didSync = false;

  if (document.getElementById("syncPeriod")?.checked) {
    await createEvent(
      "🩸 Period (Predicted)",
      nextPeriod.toISOString().slice(0, 10),
      addDays(nextPeriod, appState.periodLength).toISOString().slice(0, 10)
    );
    didSync = true;
  }

  if (document.getElementById("syncFertile")?.checked) {
    await createEvent(
      "🌱 Fertile Window",
      fertile.start.toISOString().slice(0, 10),
      addDays(fertile.end, 1).toISOString().slice(0, 10)
    );
    didSync = true;
  }

  if (document.getElementById("syncOvulation")?.checked) {
    await createEvent(
      "✨ Ovulation (Estimated)",
      ovulation.toISOString().slice(0, 10),
      addDays(ovulation, 1).toISOString().slice(0, 10)
    );
    didSync = true;
  }

  if (!didSync) {
    alert("Please select at least one item to sync.");
    return;
  }

  alert("Selected events added to Google Calendar!");
}

// async function syncToGoogleCalendar() {
//   if (!appState.lastPeriodStart) {
//     alert("Please enter cycle data first.");
//     return;
//   }

//   const syncPeriodCheckbox = document.getElementById("syncPeriod");

//   if (!syncPeriodCheckbox || !syncPeriodCheckbox.checked) {
//     alert("Period sync is disabled.");
//     return;
//   }

//   const start = new Date(appState.lastPeriodStart);
//   const nextPeriod = predictNextPeriod(start, appState.cycleLength);

//   await createEvent(
//     "🩸 Period (Predicted)",
//     nextPeriod.toISOString().slice(0, 10),
//     addDays(nextPeriod, appState.periodLength).toISOString().slice(0, 10)
//   );

//   alert("Period prediction added to Google Calendar!");
// }

// function syncToGoogleCalendar() {
//   alert("Google Calendar sync would be triggered here.");
//   if (document.getElementById("syncPeriod").checked) {
//     await createEvent(
//       "🩸 Period (Predicted)",
//       nextPeriod.toISOString().slice(0, 10),
//       addDays(nextPeriod, appState.periodLength).toISOString().slice(0, 10)
//     );
//   }

//   // OAuth → create events → store event IDs
// }
// // const CLIENT_ID = "297330410452-7o5rtp3li3sm7gdn8rqp12vrroikgg9b.apps.googleusercontent.com";
// // const REDIRECT_URI = "http://127.0.0.1:5500/settings.html";
// // const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// // function connectGoogleCalendar() {
// //   const authUrl =
// //     "https://accounts.google.com/o/oauth2/v2/auth" +
// //     "?client_id=" + CLIENT_ID +
// //     "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
// //     "&response_type=token" +
// //     "&scope=" + encodeURIComponent(SCOPES);

// //   window.location.href = authUrl;
// // }
// // ------------------
// const CLIENT_ID = "297330410452-7o5rtp3li3sm7gdn8rqp12vrroikgg9b.apps.googleusercontent.com";
// const REDIRECT_URI = "http://127.0.0.1:5500/settings.html";
// const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// function connectGoogleCalendar() {
//   const authUrl =
//     "https://accounts.google.com/o/oauth2/v2/auth" +
//     "?client_id=" + CLIENT_ID +
//     "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
//     "&response_type=token" +
//     "&scope=" + encodeURIComponent(SCOPES);

//   window.location.href = authUrl;
// }

// async function createEvent(summary, startDate, endDate) {
//   const token = localStorage.getItem("google_access_token");

//   if (!token) {
//     alert("Google Calendar not connected.");
//     return;
//   }

//   const res = await fetch(
//     "https://www.googleapis.com/calendar/v3/calendars/primary/events",
//     {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + token,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         summary,
//         start: { date: startDate },
//         end: { date: endDate }
//       })
//     }
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     console.error("Calendar error:", data);
//     alert("Calendar sync failed. Check console.");
//   }

//   return data;
// }

// async function syncToGoogleCalendar() {
//   if (!appState.lastPeriodStart) {
//     alert("Please enter cycle data first.");
//     return;
//   }

//   const start = new Date(appState.lastPeriodStart);
//   const nextPeriod = predictNextPeriod(start, appState.cycleLength);
//   const ovulation = predictOvulation(nextPeriod);
//   const fertile = fertileWindow(ovulation);

//   await createEvent(
//     "🩸 Period (Predicted)",
//     nextPeriod.toISOString().slice(0, 10),
//     addDays(nextPeriod, appState.periodLength).toISOString().slice(0, 10)
//   );

//   await createEvent(
//     "🌱 Fertile Window",
//     fertile.start.toISOString().slice(0, 10),
//     addDays(fertile.end, 1).toISOString().slice(0, 10)
//   );

//   await createEvent(
//     "✨ Ovulation (Estimated)",
//     ovulation.toISOString().slice(0, 10),
//     addDays(ovulation, 1).toISOString().slice(0, 10)
//   );

//   alert("Events successfully added to Google Calendar!");
// }
