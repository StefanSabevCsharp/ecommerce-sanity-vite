
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
        console.log("product", product);
        const img = product.image[0].asset._ref;
        const newImage = img.replace('image-', "https://cdn.sanity.io/images/69060ayt/production/").replace('-webp', '.webp');
        return {
            price_data: {
                currency: 'chf',
                product_data: {
                    name: product.name,
                    images: [newImage],
                },
                unit_amount: product.price * 100,
            },
            adjustable_quantity: {
                enabled: true,
                minimum: 1,

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
            success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/canceled`,
            //TODO: add cancel url
        }
        const session = await stripe.checkout.sessions.create(params);
        res.status(200).json(session);
    } catch (err) {
        console.error('Error creating checkout session:', err);
        return res.status(500).json({ error: err.message });
    }
});

app.get("/verify-session", async (req, res) => {
    const { session_id } = req.query;
    console.log("session_id", session_id);

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (!session || session.payment_status !== 'paid') {
            return res.status(400).json({ error: 'Invalid session' });
        }
        
        res.status(200).json({ success: true, session });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

async function start() {
    app.listen(3000, () => console.log("Server is listening on port 3000"));
}

start();