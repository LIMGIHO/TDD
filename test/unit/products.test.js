// //여러 관련 테스트를 그룹화
// describe("Calculation", () => {

//     it("two plus two is four", () => {
//         expect(2+2).toBe(4);
//     })

//     it("two plus two is not five", () => {
//         expect(2+2).not.toBe(4);
//     })
// });

const productController = require("../../controller/product");
const productModel = require("../../models/Product");
const httpMocks = require("node-mocks-http");
const newProduct = require("./data/new-product.json")

describe("Product Controller Create", () => {
    let req, res, next;

    beforeEach(() => {
        productModel.create = jest.fn();
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = null;
    });

    it("should have a createProduct function", () => {
        expect(typeof productController.createProduct)
            .toBe("function");
    });

    it("should call ProductModel.create", () => {
        req.body = newProduct;
        productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    });

    it("should return 201 response code", () => {
        productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should return json body in response", () => {
        productModel.create.mockReturnValue(newProduct);
        productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    })
});