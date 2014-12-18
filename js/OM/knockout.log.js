function Log(l) {
    var self = this;
    self.log = ko.observable(l);
}
function KO_GlobalConsole() {
    var self = this;
    self.logs = ko.observableArray([]);

    self.appendLog = function (l) {
        self.logs.push(new Log(l));
    };
}
