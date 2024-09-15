const { createClient } = require("@sanity/client"); 
const { response } = require("express");

const client = createClient({
    projectId: "69060ayt",
    dataset: "production",
    apiVersion: "2021-10-21",
    token: process.env.SANITY_TOKEN,
    useCdn: true,
});

 const getAllProducts = async () => {
    const products = await client.fetch("*[_type == 'product']");
    return products;
}

const getProductById = async (id) => {
    const product = await client.fetch(`*[_type == 'product' && _id == $id]`, { id });
    return product[0]; // Assuming _id is unique and returns a single product
};


module.exports = { getAllProducts, getProductById };

