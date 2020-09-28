let userAccountStr = Cypress.env("MEALS_USER_ACCOUNT");
let passwordStr = Cypress.env("MEALS_PASS_WORD");

userAccountStr = userAccountStr + '';
passwordStr = passwordStr + '';
let userAccount_array = userAccountStr.split(',');
let password_array = passwordStr.split(',');

userAccount_array.forEach((item, index) => {
  describe('auto_report_meal_' + index, () => {
    let accessToken = '';
    it('login yg-home', () => {
      cy.request({
        url:
          'https://ygjy.ismartwork.cn/ecs/mapp/restful/auth/backstageLoginValidate',
        method: 'POST',
        form: false, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        headers: {},
        body: {
          userAccount: item,
          password: password_array[index]
        }
      }).then(resp => {
        expect(resp.status).to.eq(200);
        accessToken = resp.body.body.ecpToken || '';
      });
    });

    it('jump to passpark and submit', () => {
      const origin_url =
        'https://ygjy.ismartwork.cn/ecs/mapp/passpark/h5/index.html#/';
      let url = origin_url + '?accessToken=' + accessToken;
      cy.visit(url);
      cy.get('.entry-top-right').click();
      cy.get('.bottom_button').click();
      cy.get('uni-button[type="primary"]').click();
      cy.get('.uni-toast__content').should('contain.text', '提交成功');
    });
  });
});


