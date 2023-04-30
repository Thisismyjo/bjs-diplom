"use strict";

const logout = new LogoutButton();
const rates = new RatesBoard();
const money = new MoneyManager();
const fav = new FavoritesWidget();


/* Выход из личного кабинета */

logout.action = function () {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

/* Получение информации о пользователе */

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

/* Получение текущих курсов валюты */

function board () {
    ApiConnector.getStocks(response => {
        if (response.success) {
            rates.clearTable();
            rates.fillTable(response.data);
        }
    })
}

board();

setInterval(board, 60000);

/* Операции с деньгами */

money.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Пополнен");
        } else {
            money.setMessage(response.success, response.error);
        }
    });
}

money.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Конвертация проведена успешно");
        } else {
            money.setMessage(response.success, response.error);
        }
    });
}

money.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(response.success, "Перевод валюты проведен успешно");
        } else {
            money.setMessage(response.success, response.error);
        }
    })
}

/* Работа с избранным */

ApiConnector.getFavorites(response => {
    if(response.success === true) {
        fav.clearTable();
        fav.fillTable(response.data);
        money.updateUsersList(response.data);
    }
})

fav.addUserCallback = function (data) {
    ApiConnector.addUserToFavorites(data, response => {
        FavoritesWidget.addUserCallback(data);
        if (response.success) {
            fav.clearTable();
            fav.fillTable(response.data);
            money.updateUsersList(response.data);
            fav.setMessage(response.success, "Добавлен");
        } else {
            fav.setMessage(response.success, response.error);
        }
    })
}

fav.removeUserCallback = function (data) {
    ApiConnector.removeUserCallback(data, response => {
        if (response.success) {
            fav.clearTable();
            fav.fillTable(response.data);
            money.updateUsersList(response.data);
            fav.setMessage(response.success, "Добавлен");
        } else {
            fav.setMessage(response.success, response.error);
        }
    })
}
