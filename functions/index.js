const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: [
        "https://ac1dst4r.github.io",
        "http://localhost:5000",
        "http://127.0.0.1:5000"
    ]
}));

app.use(express.json());

const timezones = Intl.supportedValuesOf("timeZone");

function getTimezoneData(timezone) {
    const now = new Date();

    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
    }).formatToParts(now);

    const values = {};

    parts.forEach(part => {
        values[part.type] = part.value;
    });

    const localDateTime =
        `${values.year}-${values.month}-${values.day}` +
        `T${values.hour}:${values.minute}:${values.second}`;

    const offsetParts = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        timeZoneName: "longOffset"
    }).formatToParts(now);

    const offset =
        offsetParts.find(part => part.type === "timeZoneName")?.value
        || "GMT";

    const isDST = (() => {
        const jan = new Date(now.getFullYear(), 0, 1);
        const jul = new Date(now.getFullYear(), 6, 1);

        const janOffset = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            timeZoneName: "longOffset"
        }).formatToParts(jan)
          .find(part => part.type === "timeZoneName")?.value;

        const julOffset = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            timeZoneName: "longOffset"
        }).formatToParts(jul)
          .find(part => part.type === "timeZoneName")?.value;

        return offset !== (janOffset === julOffset
            ? offset
            : janOffset);
    })();

    return {
        success: true,
        timezone,
        datetime: localDateTime,
        unix: Math.floor(now.getTime() / 1000),
        utc_offset: offset.replace("GMT", "UTC"),
        is_dst: isDST
    };
}

app.get("/", (req, res) => {
    res.json({
        name: "AC1DST4R World Clock API",
        version: "1.0.0",
        status: "online",
        endpoints: [
            "/api/time",
            "/api/time?zone=America/New_York",
            "/api/timezones",
            "/api/search?city=Tokyo"
        ]
    });
});

app.get("/api/time", (req, res) => {
    const timezone = req.query.zone || "UTC";

    if (!timezones.includes(timezone) && timezone !== "UTC") {
        return res.status(400).json({
            success: false,
            error: "Invalid timezone",
            message: "Provide a valid IANA timezone."
        });
    }

    res.json(getTimezoneData(timezone));
});

app.get("/api/timezones", (req, res) => {
    res.json({
        success: true,
        count: timezones.length,
        timezones
    });
});

app.get("/api/search", (req, res) => {
    const city = String(req.query.city || "").trim();

    if (!city) {
        return res.status(400).json({
            success: false,
            error: "Missing city parameter"
        });
    }

    res.json({
        success: true,
        city,
        message: "Use the website's geocoding service to resolve city names.",
        suggestion: "/api/time?zone=America/New_York"
    });
});

exports.api = onRequest({
    region: "us-central1",
    cors: true
}, app);
