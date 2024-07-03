import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

const PaymentPDF = () => (
    <Document>
        <Page size={"A4"}>
            <View>
                <Text>hello world</Text>
            </View>
        </Page>
    </Document>
)

export default PaymentPDF
