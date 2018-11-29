const format = require('date-fns/format');
const parse = require('date-fns/parse');
const getTime = require('date-fns/get_time');
const getMilliseconds = require('date-fns/get_milliseconds');
const getSeconds = require('date-fns/get_seconds');
const getMinutes = require('date-fns/get_minutes');
const getHours = require('date-fns/get_hours');
const getDate = require('date-fns/get_date');
const endOfYesterday = require('date-fns/end_of_yesterday');
const endOfTomorrow = require('date-fns/end_of_tomorrow');
const endOfToday = require('date-fns/end_of_today');
const endOfDay = require('date-fns/end_of_day');
const getDay = require('date-fns/get_day');
const getISODay = require('date-fns/get_iso_day');
const endOfMonth = require('date-fns/end_of_month');
const getDaysInMonth = require('date-fns/get_days_in_month');
const getMonth = require('date-fns/get_month');
const getQuarter = require('date-fns/get_quarter');
const getDaysInYear = require('date-fns/get_days_in_year');
const getYear = require('date-fns/get_year');
module.exports = {
    format,
    parse,
    getDate,
    getTime,
    getMilliseconds,
    getSeconds,
    getMinutes,
    getHours,
    endOfDay,
    endOfYesterday,
    endOfMonth,
    endOfTomorrow,
    endOfToday,
    getDay,
    getISODay,
    getDaysInMonth,
    getMonth,
    getQuarter,
    getDaysInYear,
    getYear,
};
