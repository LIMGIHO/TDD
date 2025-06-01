it("two plus two is four", () => {
        expect(2+2).toBe(4);
    })



const request = require("supertest");
const app = require("../../server");
const newProduct = require("../data/new-product.json")

it("POST /product", async () => {
    const response = await request(app)
                .post("/product")
                .send(newProduct);
    
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description)
});

it("should return 500 on POST /product", async () => {
    const response = await request(app)
    .post("/product")
    .send({name:"lim"});

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
        message: "Product validation failed: description: Path `description` is required."
    });
})