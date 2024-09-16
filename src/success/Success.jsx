import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BsBagCheckFill } from "react-icons/bs";
import { AppContext } from "../context/StateContext";
import { runFireworks } from "../lib/utils";

export default function Success() {
    const { clearCartItems } = useContext(AppContext);
    const [sessionValid, setSessionValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const navigate = useNavigate();

    useEffect(() => {
        const verifySession = async () => {
            if (!sessionId) {
              
                navigate("/");
                return;
            }

            try {
                
                const response = await fetch(`http://localhost:3000/verify-session?session_id=${sessionId}`);
                const data = await response.json();

                if (data.success) {
                    setSessionValid(true);
                    clearCartItems();
                    runFireworks();
                } else {
                    
                    navigate("/");
                }
            } catch (error) {
                console.error("Error verifying session:", error);
                navigate("/");
            } finally {
                setIsLoading(false);
            }
        };

        verifySession();
    }, [sessionId, navigate]);

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (!sessionValid) {
        return null; 
    }

    return (
        <div className="success-wrapper">
            <div className="success">
                <p className="icon">
                    <BsBagCheckFill />
                </p>
                <h2>Thank you for your order!</h2>
                <p className="email-msg">Check your email inbox for the receipt.</p>
                <p className="description">
                    If you have any questions, please email: 
                    <a className="email" href="mailto:order@example.com">order@example.com</a>
                </p>
                <Link to="/">
                    <button className="btn">Continue Shopping</button>
                </Link>
            </div>
        </div>
    );
}
