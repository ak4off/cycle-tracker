function syncToGoogleCalendar() {
  alert("Google Calendar sync would be triggered here.");
  // OAuth → create events → store event IDs
}
const CLIENT_ID = "YOUR_CLIENT_ID";
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