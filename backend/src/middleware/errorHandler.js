export const handleDuplicateError = (error) => {
    if (error?.name === "MongoServerError" && error.code === 11000) {
        const field = Object.keys(error.keyPattern || {})[0] || "field";
        return { status: 409, message: `${field} already exists` };
    }
    return null;
};

export const handleValidationError = (error, res) => {
    if (error.name === "ValidationError") {
        return res.status(400).json({ success: false, message: error.message });
    }
    return null;
};
