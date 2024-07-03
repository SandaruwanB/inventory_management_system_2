import React from 'react';
import { Document, Page, Text, View } from '@react-pdf/renderer';

const PaymentPDF = ({amount, slipcode, status, note, date, paymentmethod, accountno, accountholder, bank, customer, suplier, paymenttype, company}) => (
    <Document>
        <Page size={"A4"}>
            <View>
                <Text>{status}</Text>
                <Text>{}</Text>
            </View>
        </Page>
    </Document>
)

export default PaymentPDF
