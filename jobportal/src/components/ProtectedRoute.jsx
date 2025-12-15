// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Simple, dependency-free JWT expiry check:
 * - does not validate signature (can't without secret) — only checks payload 'exp' for expiry.
 * - works with standard JWTs: header.payload.signature (base64url)
 */
const isTokenValid = (token) => {
    if (!token) return false;

    try {
        // split token, get payload (second part)
        const parts = token.split(".");
        if (parts.length !== 3) return false;

        const payload = parts[1];

        // base64url -> base64
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        // atob expects padded string length; add padding if necessary
        const padLength = (4 - (base64.length % 4)) % 4;
        const padded = base64 + "=".repeat(padLength);

        // decode
        const jsonPayload = decodeURIComponent(
            atob(padded)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        const data = JSON.parse(jsonPayload);

        // exp is in seconds (standard). Check expiration.
        if (!data.exp) return true; // if no exp field, treat as valid (optional)
        return data.exp * 1000 > Date.now();
    } catch (e) {
        console.error("Token decode error:", e);
        return false;
    }
};

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!isTokenValid(token)) {
        // clear stale auth and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return <Navigate to="/Login" replace />;
    }
    return children;
};

export default ProtectedRoute;
