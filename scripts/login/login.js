import { setLoginButtonEvent } from "./login_request.js";
import { registerLoginFieldsEvent } from "./login_fields_validation.js";

export function showLogin(id) {
    setLoginButtonEvent();
    registerLoginFieldsEvent();
}