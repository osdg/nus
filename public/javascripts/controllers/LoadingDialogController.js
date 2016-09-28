/**
 * Created by plter on 9/28/16.
 */


window.nus = window.nus || {};

(function () {

    const ViewController = lf.ViewController;

    class LoadingDialogController extends ViewController {

        constructor(view) {
            super(view);

            view.append(`
<div id="loading-dialog" style="z-index: 10000" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title title-label">Modal title</h4>
      </div>
      <div class="modal-body">
      </div>
    </div>
  </div>
</div>
`);
            this._preventClose = true;
            this._loadingDialog = $("#loading-dialog");
            this._loadingDialog.on("hide.bs.modal", e=> {
                if (this._preventClose) {
                    e.preventDefault();
                }
            });

            this._titleLabel = this._loadingDialog.find(".title-label");
            this._bodyDiv = this._loadingDialog.find(".modal-body");
        }


        handle(command) {
            switch (command.type) {
                case nus.Commands.SHOW_LOADING_DIALOG:
                    this._titleLabel.html(command.data.title);
                    this._bodyDiv.html(command.data.body);
                    this._loadingDialog.modal("show");
                    break;
                case nus.Commands.HIDE_LOADING_DIALOG:
                    this._preventClose = false;
                    this._loadingDialog.modal("hide");
                    this._preventClose = true;
                    break;
            }
        }
    }

    nus.LoadingDialogController = LoadingDialogController;
})();