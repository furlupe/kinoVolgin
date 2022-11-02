import { registerRegisterButtonEvent } from "./registration_event.js";
import { registerRegisterFieldsEvent } from "./registration_fields.js";

export function showRegistartion() {
    registerRegisterButtonEvent();
    registerRegisterFieldsEvent();
}