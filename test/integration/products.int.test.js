it("two plus two is four", () => {
        expect(2+2).toBe(4);
    })



const request = require("supertest");
const app = require("../../server");
const newProduct = require("../data/new-product.json");

let firstProduct;

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
});

it("Get /product", async () => {
    const response = await request(app).get("/product");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    console.log(response.body)
    firstProduct = response.body[0];
});

it("GET /product/:productId", async() => {
    const response = await request(app).get(`/product/${firstProduct._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);

});

it("GET id doenst exist /product/:productId", async () => {
    const response = await request(app).get("/product/683bb0cef450fbe87a8cddc4");
    expect(response.statusCode).toBe(404);

});

it("PUT /product", async () => {
    const res = await request(app).put("/product/683bb0cef450fbe87a8cddc3")
                    .send({name: "updated name", description: "updated desc"});

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("updated name");
    expect(res.body.description).toBe("updated desc");
});

it("PUT /product not exists", async () => {
    const res = await request(app).put("/product/683bb0cef450fbe87a8cddc4")
                    .send({name: "updated name", description: "updated desc"});

    expect(res.statusCode).toBe(404);
});

it("DELETE /product", async () => {
    const delRes = await request(app).get("/product/683bb0cef450fbe87a8cddc3");
    const deletedData = delRes.body;
    const res = await request(app).delete("/product/683bb0cef450fbe87a8cddc3")
        .send();

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(deletedData._id);
    expect(res.body.name).toBe(deletedData.name);
});

it("DELETE /product not exists", async () => {
    const res = (await request(app).delete("/product/683bb0cef450fbe87a8cddc3"))
        .send();

    expect(res.status).toBe(404);
    expect(res.body).toBe(null);
})