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

        let scripts = [
            `${nus.Config.LIB_DIR}/lf.js`,
            `${nus.Config.SRC}/Constants.js`,
            `${nus.Config.SRC}/Commands.js`,
            `${nus.Config.SRC}/controllers/HeaderController.js`,
            `${nus.Config.SRC}/controllers/LoadingDialogController.js`,
            `${nus.Config.SRC}/controllers/LoginDialogController.js`,
            `${nus.Config.SRC}/controllers/RegisterDialogController.js`,
            `${nus.Config.SRC}/main.js`
        ];

        let chain = nus.loadScript(scripts[0]);
        for (var i = 1; i < scripts.length; i++) {
            (function (index) {
                chain = chain.then(function () {
                    return nus.loadScript(scripts[index]);
                });
            })(i);
        }
        chain.then(function (result) {
            if (loadingDiv.parentNode) {
                loadingDiv.parentNode.removeChild(loadingDiv);
            }
        });
    }

    boot();
})();