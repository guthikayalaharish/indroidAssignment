// src/components/QrCode.js
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QrCode = ({ value }) => {
    return (
        <div>
            <QRCodeCanvas value={value} size={256} />
        </div>
    );
};

export default QrCode;
