module.exports = function(app)
{
    require('./categoryRoute')(app);
    require('./autoRoute')(app);
    require('./categoryWorkRoute')(app);
    require('./expenseRoute')(app);
    require('./markRoute')(app);
    require('./modelRoute')(app);
    require('./notificationAutoRoute')(app);
    require('./technicalWorkRoute')(app);
    require('./technicalWork_categoryWorkRoute')(app);
    require('./userRoute')(app);
    require('./recognizeRoute')(app)
    require('./roleRoute')(app)
}