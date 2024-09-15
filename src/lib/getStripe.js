import {loadStripe} from '@stripe/stripe-js';


let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
}

export default getStripe;