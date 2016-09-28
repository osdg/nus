/**
 * Created by plter on 9/27/16.
 */

window.nus = window.nus || {};

(function () {

    const ViewController = lf.ViewController;

    class RegisterDialogController extends ViewController {

        constructor(view) {
            super(view);

            view.append(`
<style type="text/css">
    #register-dialog table{
        border-collapse: separate;
        border-spacing: 10px;
    }
    
    #register-dialog input[type="text"]{
        width: 230px;
    }
</style>
<div id="register-dialog" class="modal fade" tabindex="-1" role="dialog">
    <form>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">用户注册</h4>
          </div>
          <div class="modal-body">
            <div class="main-alert-div" style="color: red"></div>
            <table>
                <tbody>
                    <tr><td>用户名：</td><td><input class="form-control" type="text" placeholder="请输入用户名" required="required" name="user"></td></tr>
                    <tr><td>密码：</td><td><input class="form-control" type="password" placeholder="请输入密码" required="required" name="password"></td></tr>
                    <tr>
                        <td>密码确认：</td>
                        <td>
                            <input class="form-control" type="password" placeholder="请再次输入密码" required="required" name="password_confirm">
                        </td>
                        <td>
                            <span style="color: red" class="password-confirm-alert"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <span style="float: left"><a href="#" class="btn-go-login-dialog">已有帐号？点此登陆</a></span>
            <input type="submit" class="btn btn-primary" value="注册">
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </form>
</div><!-- /.modal -->`);

            this._preventClose = true;
            this._registerDialog = $("#register-dialog");
            this._registerDialog.on("hide.bs.modal", e=> {
                if (this._preventClose) {
                    e.preventDefault();
                }
            });
            this._btnGoLoginDialog = this._registerDialog.find(".btn-go-login-dialog");
            this._btnGoLoginDialog.on("click", event=> {
                event.preventDefault();

                this.hide();

                this.commandHandler.sendCommand2(nus.Commands.SHOW_LOGIN_DIALOG);
            });

            this._btnSubmit = this._registerDialog.find("input[type='submit']");


            this._mainAlertDiv = this._registerDialog.find(".main-alert-div");
            this._passwordConfirmAlert = this._registerDialog.find(".password-confirm-alert");

            this._form = this._registerDialog.find("form");
            this.addListeners();
        }

        addListeners() {
            let self = this;

            this._form.on("submit", function (e) {
                e.preventDefault();

                if (!self.connecting) {
                    if (this["password"].value != this["password_confirm"].value) {
                        self._passwordConfirmAlert.html("两次输入的密码不一样");
                        return;
                    }
                    self._passwordConfirmAlert.empty();

                    self._mainAlertDiv.html("正在连接服务器...");
                    self.connecting = true;
                    $.post(nus.Constants.userRegisterUrl,
                        {user: this["user"].value, password: this["password"].value}
                    ).done(data=> {
                        // console.log(data);

                        self.connecting = false;

                        switch (data.code) {
                            case 1:
                                self._mainAlertDiv.empty();
                                self.hide();

                                //TODO get access key
                                break;
                            case 1062:
                                self._mainAlertDiv.html("该用户名已存在");
                                break;
                            default:
                                self._mainAlertDiv.html("未知错误，请稍候再试");
                                break;
                        }
                    }).fail(error=> {
                        self._mainAlertDiv.html("无法连接服务器");

                        self.connecting = false;
                    });
                }
            });
        }

        show() {
            this._registerDialog.modal("show");
        }

        hide() {
            this._preventClose = false;
            this._registerDialog.modal("hide");
            this._preventClose = true;
        }

        handle(command) {
            switch (command.type) {
                case nus.Commands.SHOW_REGISTER_DIALOG:
                    this.show();
                    break;
            }
        }

        set connecting(value) {
            this._connecting = value;
            this._btnSubmit.prop("disabled", value);
        }

        get connecting() {
            return this._connecting;
        }
    }

    nus.RegisterDialogController = RegisterDialogController;
})();