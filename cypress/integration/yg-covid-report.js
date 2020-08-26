/// <reference types="cypress" />

const URL =
  "https://ygtj.ismartwork.cn/ecs/mapp/disaster/index.html#/ygsoft/epidemicSituationUserMainPage/";
const STORAGE_KEY = "inimateVersonTypeTemplate_";
const COMPLETE_MSG = "健康打卡";

let array = Cypress.env("STORAGE_ARRAY");

console.log(array);

array.forEach(item => {

    describe("yg-covid-report-checkin", () => {
        it("Visits", () => {
            // 1. Navigate to Url
            cy.visit(URL + item.org_gid);
            console.log(cy)
            // 2. Set LocalStorage
            cy.setLocalStorage(STORAGE_KEY + item.org_gid, window.decodeURI(window.atob(item.storage_value)));

            // 3. Manipulating UI
            cy.get(
                ".main-content .content-panel .multi-type-fill-button-component:nth-child(1)"
            ).click();
            cy.get(
                "body > div:nth-child(10) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > a:nth-child(2)"
            ).click();
            cy.get(".submit-button").click();

            // assertion
            cy.get(
                ".vux-alert > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)"
            ).should("contain.text", COMPLETE_MSG);

        });
    });
});


