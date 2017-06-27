module.exports = function(app) {

    app.get("/route", function(req, res) {
        res.send("Anothe Router");
    });
}