describe('My First Test', () => {
  let userAccount = Cypress.env("ZCC_USER_ACCOUNT");
  let password = Cypress.env("ZCC_PASS_WORD");
  let accessToken = '';
  it('login yg-home', function() {
    cy.request({
      url:
        'https://ygjy.ismartwork.cn/ecs/mapp/restful/auth/backstageLoginValidate',
      method: 'POST',
      form: false, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      headers: {},
      body: {
        userAccount: userAccount,
        password:password
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
  });
});
