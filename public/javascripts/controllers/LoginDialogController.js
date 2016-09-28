/**
 * Created by plter on 9/27/16.
 */
window.nus = window.nus || {};

(function () {

    const ViewController = lf.ViewController;

    class LoginDialogController extends ViewController {


        constructor(view) {
            super(view);

            view.append(`
<style type="text/css">
    #login-dialog table{
        border-collapse: separate;
        border-spacing: 10px;
    }
    
    #login-dialog input[type="text"]{
        width: 280px;
    }
</style>
<div id="login-dialog" class="modal fade" tabindex="-1" role="dialog">
    <form>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">用户登陆</h4>
          </div>
          <div class="modal-body">
            <table>
                <tbody>
                    <tr><td>用户名：</td><td><input class="form-control" type="text" placeholder="请输入用户名" required="required" name="user"></td></tr>
                    <tr><td>密码：</td><td><input class="form-control" type="password" placeholder="请输入密码" required="required" name="password"></td></tr>
                </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <span style="float: left"><a href="#" class="btn-go-register-dialog">没有帐号？需要注册</a></span>
            <input type="submit" class="btn btn-primary" value="登陆">
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </form>
</div><!-- /.modal -->`);

            this._preventClose = true;
            this._loginDialog = $("#login-dialog");
            this._loginDialog.on("hide.bs.modal", e=> {
                if (this._preventClose) {
                    e.preventDefault();
                }
            });

            this._btnGoRegisterDialog = this._loginDialog.find(".btn-go-register-dialog");
            this._btnGoRegisterDialog.on("click", event=> {
                event.preventDefault();

                this._preventClose = false;
                this._loginDialog.modal("hide");
                this._preventClose = true;

                this.commandHandler.sendCommand2(nus.Commands.SHOW_REGISTER_DIALOG);
            });
        }


        handle(command) {
            switch (command.type) {
                case nus.Commands.SHOW_LOGIN_DIALOG:
                    this._loginDialog.modal("show");
                    break;
            }
        }
    }

    nus.LoginDialogController = LoginDialogController;
})();