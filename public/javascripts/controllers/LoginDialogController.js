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
            <div class="main-alert-div" style="color: red;"></div>
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

            this._form = this._loginDialog.find("form");
            this._mainAlertDiv = this._loginDialog.find(".main-alert-div");
            this._btnSubmit = this._loginDialog.find("input[type='submit']");

            this._btnGoRegisterDialog = this._loginDialog.find(".btn-go-register-dialog");

            this.addListeners();
        }

        addListeners() {
            this._btnGoRegisterDialog.on("click", event=> {
                event.preventDefault();

                this._preventClose = false;
                this._loginDialog.modal("hide");
                this._preventClose = true;

                this.commandHandler.sendCommand2(nus.Commands.SHOW_REGISTER_DIALOG);
            });

            let self = this;
            this._form.on("submit", function (e) {

                e.preventDefault();

                if (!self.connecting) {
                    self.connecting = true;
                    self._mainAlertDiv.html("正在连接服务器...");

                    $.post(nus.Constants.userLoginUrl, {
                        user: this["user"].value,
                        password: this["password"].value
                    }).done(data=> {
                        console.log(data);
                        self.connecting = false;

                        switch (data.code) {
                            case 1:
                                self._mainAlertDiv.empty();
                                //TODO handle login success
                                break;
                            case 10001:
                            case 10002:
                            case 10003:
                            case 10004:
                                self._mainAlertDiv.html("用户名或密码错误");
                                break;
                            default:
                                self._mainAlertDiv.html("未知错误，请联系开发人员");
                                break;
                        }

                    }).fail(error=> {
                        self.connecting = false;

                        self._mainAlertDiv.html("无法连接服务器，请稍候重试");
                    });
                }
            });
        }


        handle(command) {
            switch (command.type) {
                case nus.Commands.SHOW_LOGIN_DIALOG:
                    this._loginDialog.modal("show");
                    break;
            }
        }

        set connecting(value) {
            this._connecting = value;

            this._btnSubmit.disabled = value;
        }

        get connecting() {
            return this._connecting;
        }
    }

    nus.LoginDialogController = LoginDialogController;
})();