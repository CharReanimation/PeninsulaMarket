/**
 * Converts a file to a Base64 encoded string.
 * @param {File} file - The file to convert.
 * @returns {Promise<string>} - A promise that resolves with the Base64 string.
 */
export const ConvertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // When the file is successfully read
        reader.onloadend = () => {
            resolve(reader.result); // Base64 string is in `reader.result`
        };

        // Error in Reading File
        reader.onerror = (error) => {
            reject(new Error("Failed to read file as Base64: " + error.message));
        };

        // Start reading the file as a Base64-encoded data URL
        reader.readAsDataURL(file);
    });
};
