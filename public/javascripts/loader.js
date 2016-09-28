/**
 * Created by plter on 9/27/16.
 */


//define the namespace
window.nus = {};

nus.loadScript = function (src) {
    return new Promise(function (resolve, reject) {
        $.getScript(src).done(resolve).fail(reject);
    });
};

nus.Config = {SRC: "javascripts", LIB_DIR: "libs"};

(function () {

    function boot() {
        let loadingDiv = document.createElement("div");
        loadingDiv.innerHTML = "Loading...";
        document.body.appendChild(loadingDiv);

        Promise.all([
            nus.loadScript(`${nus.Config.LIB_DIR}/lf.js`),
            nus.loadScript(`${nus.Config.SRC}/Constants.js`),
            nus.loadScript(`${nus.Config.SRC}/Commands.js`),
            nus.loadScript(`${nus.Config.SRC}/controllers/HeaderController.js`),
            nus.loadScript(`${nus.Config.SRC}/controllers/LoadingDialogController.js`),
            nus.loadScript(`${nus.Config.SRC}/controllers/LoginDialogController.js`),
            nus.loadScript(`${nus.Config.SRC}/controllers/RegisterDialogController.js`),
            nus.loadScript(`${nus.Config.SRC}/main.js`)
        ]).then(function (result) {
            if (loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
            }
        });
    }

    boot();
})();