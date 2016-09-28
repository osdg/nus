/**
 * Created by plter on 9/27/16.
 */

(function () {

    const Gate = lf.Gate;

    class Main extends Gate {

        constructor() {
            super();

            this.buildUI();
            this.registerCommands();
            this.startApp();
        }

        createDivInBody() {
            let n = document.createElement("div");
            document.body.appendChild(n);
            return n;
        }

        buildUI() {
            this.headerC = $(this.createDivInBody());
            this.headerViewController = this.createHandler(nus.HeaderController, this.headerC);

            this.mainContentC = $(this.createDivInBody());
            this.footerC = $(this.createDivInBody());

            this._loadingDialogController = this.createHandler(nus.LoadingDialogController, $(document.body));
            this._loginDialogController = this.createHandler(nus.LoginDialogController, $(document.body));
            this._registerDialogController = this.createHandler(nus.RegisterDialogController, $(document.body));
        }

        registerCommands() {
            this.registerCommand(nus.Commands.SHOW_LOADING_DIALOG, this._loadingDialogController);
            this.registerCommand(nus.Commands.HIDE_LOADING_DIALOG, this._loadingDialogController);
            this.registerCommand(nus.Commands.SHOW_LOGIN_DIALOG, this._loginDialogController);
            this.registerCommand(nus.Commands.SHOW_REGISTER_DIALOG, this._registerDialogController);
        }

        showLoadingDialog(body, title = "") {
            this.sendCommand(new lf.Command(nus.Commands.SHOW_LOADING_DIALOG, {body: body, title: title}));
        }

        hideLoadingDialog() {
            this.sendCommand(new lf.Command(nus.Commands.HIDE_LOADING_DIALOG));
        }

        startApp() {
            this.sendCommand(new lf.Command(nus.Commands.SHOW_REGISTER_DIALOG));
        }
    }

    new Main();
})();