const crypto = require('crypto');

function base64enconder(obj){
    const jsonString = JSON.stringify(obj);
    return Buffer.from(jsonString).toString('base64url')
}

function generateManualToken(payload, key){
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    }

    const encodeHeader = base64enconder(header)
    const encodePayload = base64enconder(payload)

    const unsignedToken = `${encodeHeader}.${encodePayload}`;
    
    const signedToken = crypto.createHmac('sha256', key).update(unsignedToken).digest('base64url');

    return `${unsignedToken}.${signedToken}`
}

function verifyToken(token, key){
    const parts = token.split('.');
    if (parts.length !== 3){
        return{ valid: false, error: "Malformed token"}
    }

    const [encodedHeader, encodedPayload, providedSigtanure];
    const unsignedToken = `${encodeHeader}.${encodedPayload}`

    const singnature = crypto.createHmac('sha256', key).update(unsignedToken).digest('base64url')

    if (singnature != providedSigtanure){
        return { valid: false, error: "Invalid signature" };
    }
 
    const payloadString = Buffer.from(encodedPayload, 'base64url').toString('utf8')
    const payload = JSON.parse(payloadString);

    return {valid: true, payload: payload}
}

module.exports = { generateManualToken, verifyToken };