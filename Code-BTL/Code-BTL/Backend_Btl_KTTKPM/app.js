require("dotenv").config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");

const companyStructLevelRouter = require("./routes/companyStructLevel");
const company = require("./routes/company");
const timeCompanyKpi = require("./routes/timeCompanyKpi");
const target = require("./routes/target");
const targetType = require("./routes/targetType");
const targetByTime = require("./routes/targetByTime");

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/company-struct-levels", companyStructLevelRouter);
app.use("/api/time-company-kpis", timeCompanyKpi);
app.use("/api/companys/", company);
app.use("/api/targets", target);
app.use("/api/target-types", targetType);
app.use("/api/target-by-times",targetByTime);

module.exports = app;
