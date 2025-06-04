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
const newProduct2 = require("../data/new-product2.json");
const allProduct = require("../data/all-products.json")

const productId = "123";

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});

describe("Product Controller Create", () => {

    beforeEach(() => {
        productModel.create = jest.fn();
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
    });

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
});

describe("Product Controller GetById", () => {

    beforeEach(() => {
        productModel.findById = jest.fn();
    })

    it("should have a getProductById", () => {
        expect(typeof productController.getProductById).toBe("function");
    });

    it("shold call productMode.findById", async () => {
        const productId = "1234";
        req.params.productId = productId;
        await productController.getProductById(req, res, next);
        expect(productModel.findById).toBeCalledWith(productId)
    });

    it("should return json body and response 200", async () => {
        productModel.findById.mockReturnValue(newProduct);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(newProduct);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should return 404 when item doesnt exist", async () => {
        productModel.findById.mockReturnValue(null);
        await productController.getProductById(req, res, next);
        expect(res.statusCode).toBe(404);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should handle error", async () => {
        const errorMessage = { message: "error" }
        rejectPromise = Promise.reject(errorMessage);
        productModel.findById.mockReturnValue(rejectPromise);
        await productController.getProductById(req, res, next);

        expect(next).toHaveBeenCalledWith(errorMessage);
    })

});


describe("Product Controller Update", () => {
    const body = {name:"", desc:""};
        
    beforeEach(() => {
        productModel.findByIdAndUpdate = jest.fn();
        req.params.productId = productId;
        req.body = body;
    })

    it("should have an updateProduct function", () => {
        expect(typeof productController.updateProduct).toBe("function");
    });

    it("should call prodcutModel.findByIdUpdate", async () => {
        await productController.findByIdAndUpdate(req, res, next);
        
        expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
            productId, 
            body,
            {new : true}
        )
    });

    it("should return json body and response code 200", async () => {
        
        productModel.findByIdAndUpdate.mockReturnValue(body);
        await productController.findByIdAndUpdate(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(body);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should handle 404 when item doesnt exist", async () => {
        productModel.findByIdAndUpdate.mockReturnValue(null);
        await productController.findByIdAndUpdate(req, res, next);

        expect(res.statusCode).toBe(404);
    });

    it("should handle error", async () => {
        const errorMessage = { message: "Error"};
        const rejectPromise = Promise.reject(errorMessage);
        productModel.findByIdAndUpdate.mockReturnValue(rejectPromise);

        await productController.findByIdAndUpdate(req, res, next);

        expect(res.statusCode).toBe(500);
        expect(next).toHaveBeenCalledWith(errorMessage);
    })
});

describe("Product Controller Delete", () => {
    beforeEach(() => {
        productModel.findByIdAndDelete = jest.fn();
        req.params.productId = productId;
    });

    it("Should hava a delete function", () => {
        expect(typeof productController.findByIdAndDelete).toBe("function");
    });

    it("should call ProductModel.findByIdAndDelete", async () => {
        await productController.deleteProduct(req, res, next);
        expect(productModel.findByIdAndDelete).toHaveBeenCalledWith(productId)
    });

    it("should return 200 response and deleted data", async () => {
        const deletedProduct = {
            name : "123", description: "234"
        };
        productModel.findByIdAndDelete.mockReturnValue(deletedProduct);
        await productController.deleteProduct(req, res, next);

        expect(res.statusCode).toBe(200);
        expect(res._getJSONData()).toStrictEqual(deletedProduct);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it("should handle 404 id doesnt exist", async () => {

        productModel.findByIdAndDelete.mockReturnValue(null);
        await productController.deleteProduct(req, res, next);

        expect(res.statusCode).toBe(404);
        expect(res._getJSONData()).toBe(null);
    });

    it("should handle error", async () => {
        const errorMessage = { message: "Error" };
        const rejectPromise = Promise.reject(errorMessage);

        productModel.findByIdAndDelete.mockReturnValue(rejectPromise);
        await productController.deleteProduct(req, res, next);

        expect(res.statusCode).toBe(500);
        expect(next).toHaveBeenLastCalledWith(errorMessage);

    })
})