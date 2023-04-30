"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = function (data) {
    ApiConnector.login(data, response => {
        if (!response.success) {
            userForm.setLoginErrorMessage(response.error);
        } else {
            location.reload();
        }
    });
}

userForm.registerFormCallback = function (data) {
    ApiConnector.register(data, response => {
        if (!response.success) {
            userForm.setRegisterErrorMessage(response.error);
        } else {
            location.reload();
        }
    })
}