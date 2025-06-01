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
const newProduct = require("../data/new-product.json");
const allProduct = require("../data/all-products.json")

let req, res, next;

describe("Product Controller Create", () => {
    beforeEach(() => {
        productModel.create = jest.fn();
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    it("should have a createProduct function", () => {
        expect(typeof productController.createProduct)
            .toBe("function");
    });

    it("should call ProductModel.create", async () => {
        req.body = newProduct;
        await productController.createProduct(req, res, next);
        expect(productModel.create).toBeCalledWith(newProduct);
    });

    it("should return 201 response code", async () => {
        await productController.createProduct(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should return json body in response", async () => {
        productModel.create.mockReturnValue(newProduct);
        await productController.createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct);
    })

    it("should handle errors", async () => {
        const errorMessage = { message : "description is missing"};
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.create.mockReturnValue(rejectedPromise);
        await productController.createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage);

    })
});

describe("Product Controller Get", () => {
    beforeEach(() => {
        productModel.find = jest.fn();
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    })

    it("should have a getProducts function", () => {
        expect(typeof productController.getProducts).toBe("function");
    });

    it("should call ProductModel.find({})", async () => {
        await productController.getProducts(req, res, next);
        expect(productModel.find).toHaveBeenCalledWith({});
    });

    it("should return 200 response", async () => {
        await productController.getProducts(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled).toBeTruthy();
    });

    it("should return json body in response", async () => {
        productModel.find.mockReturnValue(allProduct);
        await productController.getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProduct);
    });

    it("should handle errors", async () => {
        const errorMessage = { message: "Error finding product data" };
        const rejectedPromise = Promise.reject(errorMessage);
        productModel.find.mockReturnValue(rejectedPromise);
        await productController.getProducts(req,res,next);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
})