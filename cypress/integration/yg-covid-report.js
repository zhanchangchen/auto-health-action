/// <reference types="cypress" />

const URL =
  "https://ygtj.ismartwork.cn/ecs/mapp/disaster/index.html#/ygsoft/epidemicSituationUserMainPage/";
const STORAGE_KEY = "inimateVersonTypeTemplate_";
const COMPLETE_MSG = "健康打卡";
const STORAGE_VALUE = window.decodeURI(
    window.atob('JTdCJTIycmVwb3J0aW5nRGF0ZSUyMjolMjIyMDIwLTA4LTE5JTIyLCUyMm5hbWUlMjI6JTIyJUU4JUE5JUI5JUU2JTk4JUI2JUU2JTk5JUE4JTIyLCUyMmRlcHROYW1lJTIyOiUyMiVFNCVCQSU5MSVFNiU5QyU4RCVFNSU4QSVBMSVFNCVCQSU4QiVFNCVCOCU5QSVFOSU4MyVBOCUyMiwlMjJjb250YWN0SW5mbyUyMjolN0IlMjJpc0VuY3J5cHQlMjI6dHJ1ZSwlMjJ2YWx1ZSUyMjolMjJQdTVrMnlmYkMxZkcxK1F4M0hFOGdBPT0lMjIlN0QsJTIyY3VyckFkZHJlc3MlMjI6JTdCJTIyaWRzJTIyOiU1QiUyMjQ0MDAwMCUyMiwlMjI0NDA0MDAlMjIlNUQsJTIybmFtZXMlMjI6JTVCJTIyJUU1JUI5JUJGJUU0JUI4JTlDJUU3JTlDJTgxJTIyLCUyMiVFNyU4RiVBMCVFNiVCNSVCNyVFNSVCOCU4MiUyMiU1RCU3RCU3RA==')
);

const STORAGE_ARRAY = Cypress.env("STORAGE_ARRAY");

STORAGE_ARRAY.forEach(item => {

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


