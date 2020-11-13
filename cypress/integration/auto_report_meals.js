let zccPasswordStr =
  '04281739551a4a21b497fccc38a59d15a4923427f176aa34545dfae05dad2bb89033783740f7a37a1019e225312c3ea20772cbe08e43ff47db2b6e191714724aea3d76d87aec2ea8e6956898d130847a83b8274821ce74b4fd58f4f14ccb66e56213215f423a174bdb77';
let zwpPasswordStr =
  '04721b8d9fc186c14b0ffc30f2121faa096b2fed525644d7cf4cfebb5b0af6305e840ebdc43764e12eed23991fd980a982c821a390ae6905919b8887844483ec421bd3806c2362aeaf5fde0de298f2efae0d51ee66117885cc46afb2de99a4402e80e118e86d68dd29dcaf';
let zccUserAccount =
  '04281739551a4a21b497fccc38a59d15a4923427f176aa34545dfae05dad2bb89033783740f7a37a1019e225312c3ea20772cbe08e43ff47db2b6e191714724aea3669dc66be74faa6c2d4b11d95ecab2806f785c6547a462293e8ae73c06befcebb83885858964fcdbdfeed63552f87a3bc528df2bf897488';
let zwpUserAccount =
  '04ba024b471d006ca514a00fbaa70c3b74cac10d79a1d0c20ffedee6d8a32778fa5c40bfc0c8e14cdb12cca64af62e2396b15d4f1e466f5319e456304fa4d652f5e92236803d9e3fb9cc3c38d277cbf7593e02270521331274d1079050b7a76daadf6158cb58ac8f69d40c9f93c06ccdc92f479a94a58d';

describe('auto_report_meal_zcc', () => {
  let accessToken = '';
  let body = '';
  it('login yg-home', () => {
    cy.request({
      url:
        'https://ygjy.ismartwork.cn/ecs/mapp/restful/auth/backstageLoginValidate',
      method: 'POST',
      form: false, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      headers: {},
      body: {
        userAccount: zccUserAccount,
        password: zccPasswordStr
      }
    }).then(resp => {
      expect(resp.status).to.eq(200);
      body = resp.body.body;
      accessToken = resp.body.body.ecpToken || '';
    });
  });

  it('jump to passpark and submit', () => {
    const origin_url =
      'https://ygjy.ismartwork.cn/ecs/mapp/passpark/h5/index.html#/src/dinner/dinnerStatic';
    let url = origin_url + '?accessToken=' + accessToken;
    cy.visit(url);
    cy.get('.borderGray').click();
    cy.get('.checkLabel').click();
    cy.get('uni-button[type="primary"]').click();
  });
});

describe('auto_report_meal_zwp', () => {
  let accessToken = '';
  it('login yg-home', () => {
    cy.request({
      url:
        'https://ygjy.ismartwork.cn/ecs/mapp/restful/auth/backstageLoginValidate',
      method: 'POST',
      form: false, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      headers: {},
      body: {
        userAccount: zwpUserAccount,
        password: zwpPasswordStr
      }
    }).then(resp => {
      expect(resp.status).to.eq(200);
      accessToken = resp.body.body.ecpToken || '';
    });
  });

  it('jump to passpark and submit', () => {
    const origin_url =
      'https://ygjy.ismartwork.cn/ecs/mapp/passpark/h5/index.html#/src/dinner/dinnerStatic';
    let url = origin_url + '?accessToken=' + accessToken;
    console.log(url);
    cy.visit(url);
    cy.get('.borderGray').click();
    cy.get('.checkLabel').click();
    cy.get('uni-button[type="primary"]').click();
  });
});
