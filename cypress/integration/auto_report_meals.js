let userAccountStr = '04721b8d9fc186c14b0ffc30f2121faa096b2fed525644d7cf4cfebb5b0af6305e840ebdc43764e12eed23991fd980a982c821a390ae6905919b8887844483ec42578ed5662a74f8f31e9a013d66b3b8c40d38bd262908b8e4d9a19b03533e4fe196405522ff46f6aa367d5c628c542affc2ba4c431b2f,04ba024b471d006ca514a00fbaa70c3b74cac10d79a1d0c20ffedee6d8a32778fa5c40bfc0c8e14cdb12cca64af62e2396b15d4f1e466f5319e456304fa4d652f5e922368039813bb9db3a39f760ecfd512b196f12603dff3469cab944847a908b6bec0cbb5053c669247d76aa27ceab292e38eb3a94bfe1c1';

let passwordStr01 = Cypress.env("ZCC_PASS_WORD");
let passwordStr02 = Cypress.env("ZWP_PASS_WORD");
let userAccount_array = userAccountStr.split(',');

userAccount_array.forEach((item, index) => {
  describe('auto_report_meal_' + index, () => {
    let accessToken = '';
    it('login yg-home', () => {
      let password;
      if(index===0){
        password = passwordStr01;
      } else {
        password = passwordStr02;
      }
      cy.request({
        url:
          'https://ygjy.ismartwork.cn/ecs/mapp/restful/auth/backstageLoginValidate',
        method: 'POST',
        form: false, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        headers: {},
        body: {
          userAccount: item,
          password: password
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
});


