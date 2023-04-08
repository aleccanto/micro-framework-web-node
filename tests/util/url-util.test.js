const urlUtil = require('../../src/util/url-util');

describe("Teste classe url-util.js", () => {
    describe("urlVerify", () => {
        it("Deve retonar um objeto com propriedade id", () => {
            const expected = true;
            const url = "/20";
            const path = "/:id"
            const atual = urlUtil.urlVerify(path, url);
            expect(atual).toEqual(expected);
        });

        it("Deve retonar um objeto com as propriedades id e postId", () => {
            const expected = true;
            const url = "/20/posts/1";
            const path = "/:id/posts/:postId"
            const atual = urlUtil.urlVerify(path, url);
            expect(atual).toEqual(expected);
        });

        it("Deve retornar verdadeiro se a URL corresponder ao caminho /posts/:postId/comments/:commentId", () => {
            const expected = true;
            const url = "/posts/1/comments/10";
            const path = "/posts/:postId/comments/:commentId";
            const atual = urlUtil.urlVerify(path, url);
            expect(atual).toEqual(expected);
        });

        it("Deve retornar falso se a URL não corresponder ao caminho /users/:id/posts/:postId", () => {
            const expected = false;
            const url = "/users/20";
            const path = "/users/:id/posts/:postId";
            const atual = urlUtil.urlVerify(path, url);
            expect(atual).toEqual(expected);
        });

        it("urlVerify falha com urls diferentes", () => {
            const expected = false;
            const url = "/20";
            const path = "/:id/posts/:postId"
            const atual = urlUtil.urlVerify(path, url);
            expect(atual).toEqual(expected);
        });
        it("urlVerify falha com caminhos diferentes", () => {
            const expected = false;
            const url = "/20/posts/1";
            const path = "/:id/posts"
            const atual = urlUtil.urlVerify(path, url);
            expect(atual).toEqual(expected);
        });
        it("urlVerify falha com comprimentos de caminhos diferentes", () => {
            const expected = false;
            const url = "/20/posts/1";
            const path = "/:id/posts/:postId/comments"
            const atual = urlUtil.urlVerify(path, url);
            expect(atual).toEqual(expected);
        });
    })

    it("extractParams", () => {
        const expected = { id: 1 };
        const url = '/1';
        const path = '/:id';
        const atual = urlUtil.extractParams(path, url);
        expect(atual).toEqual(expected);
    })

    it("extractParamsFromURL", () => {
        const expected = { id: 1, nome: 'nome' }
        const url = 'post?id=1&nome=nome';
        const atual = urlUtil.extractParamsFromURL(url);
        expect(atual).toEqual(expected);
    })
});