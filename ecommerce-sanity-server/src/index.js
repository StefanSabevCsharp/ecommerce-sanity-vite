
const { expressConfing } = require("./config/expressConfig");
const { getAllProducts, getProductById } = require("./dataService/dataService");

require('dotenv').config();
const app = require("express")();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
expressConfing(app);

const YOUR_DOMAIN = 'http://localhost:5173';

app.post("/create-checkout-session", async (req, res) => {
    const { cartItems } = req.body;
    const lineItems = await Promise.all(cartItems.map(async (item) => {
        const product = await getProductById(item._id); 
        if (!product) {
            throw new Error(`Product with id ${item._id} not found`);
        }
        return {
            price_data: {
                currency: 'chf',
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100, 
            },
            quantity: item.quantity,
        };
    }));



    try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: "shr_1PzGrHRoOpoenWm2vNO4Ot3A" },
                { shipping_rate: "shr_1PzGrtRoOpoenWm2oszezJua" }
            ],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}?success=true`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        }
        const session = await stripe.checkout.sessions.create(params);
        res.json({ id: session.id });
    } catch (err) {
        console.error('Error creating checkout session:', err);
        return res.status(500).json({ error: err.message });
    }


});

async function start() {
    app.listen(3000, () => console.log("Server is listening on port 3000"));
}

start();