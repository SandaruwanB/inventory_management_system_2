import React from 'react';
import { Document, Page, Text, View, StyleSheet  } from '@react-pdf/renderer';

const style = StyleSheet.create({
    page : {
        border : '1px solid black',
        padding : 30,
    },
    topContent : {
        width : '100%',
        height : '100%',
        backgroundColor : 'red',
    },
    header : {
        width : '100%',
        textAlign : 'center',
        textTransform : 'uppercase',
    },
    rightContent : {
        display : 'flex',
        alignSelf : 'flex-end',
    },
    textLeft : {
        textAlign : 'left',
    },
    companyDetails : {
        fontSize : 12,
        fontWeight : 'semibold',     
    },
    tableContainer : {
        position : 'relative', 
        marginTop : 10
    },
    absolute : {
        position : 'absolute',
    },
    smallFont : {
        fontSize : 10
    },
    midFont : {
        fontSize : 12
    },
    line : {
        width : '100%',
        padding : 0.5,
        backgroundColor : 'gray',
        position : 'absolute',
        top : 16,
    }
})

const PaymentPDF = ({payment,company, suplier, customer}) => (
    <Document>
        <Page size={"A4"} style={style.page}>
            <View style={style.header}>
                <Text>payment receipt</Text>
            </View>
            <View>
                <View style={[style.rightContent, {marginTop : 30}]}>
                    <View style={style.textLeft}>
                        <Text style={style.companyDetails}>{company.companyname}</Text>
                        <Text style={style.companyDetails}>{company.addressline1},</Text>
                        <Text style={style.companyDetails}>{company.addressline2},</Text>
                        <Text style={style.companyDetails}>{company.city},</Text>
                        <Text style={style.companyDetails}>{company.country}.</Text>
                        <Text style={style.companyDetails}>{company.email}</Text>
                        <Text style={style.companyDetails}>{company.contactnumber}</Text>
                        <Text style={style.companyDetails}>{company.web}</Text>
                    </View>
                </View>
                <View style={{marginTop : 10}}>
                    <View>
                        <Text style={style.companyDetails}>{suplier ? suplier.firstname + " " + suplier.lastname : customer.firstname + " " + customer.lastname}</Text>
                        <Text style={style.companyDetails}>{suplier ? suplier.companyname : customer.companyname}</Text>
                        <Text style={style.companyDetails}>{suplier ? suplier.addressline1 : customer.addressline1},</Text>
                        <Text style={style.companyDetails}>{suplier ? suplier.addressline2 : customer.addressline2},</Text>
                        <Text style={style.companyDetails}>{suplier ? suplier.city : customer.city},</Text>
                        <Text style={style.companyDetails}>{suplier ? suplier.postalcode : customer.postalcode}.</Text>
                    </View>
                </View>
                <View style={{marginTop : 20, width : '100%', backgroundColor : 'gray', padding : 5, textAlign : 'center'}}>
                    <Text style={{color : 'white', fontSize : 12}}>Payment Details</Text>
                </View>
                <View style={style.tableContainer}>
                    <View style={[ style.absolute, {left : 2}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Payslip No</Text>
                    </View>
                    <View style={[ style.absolute, {left : '25%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Description</Text>
                    </View>
                    <View style={[ style.absolute, {left : '50%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Paid With</Text>
                    </View>
                    <View style={[ style.absolute, {left : '70%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Date</Text>
                    </View>
                    <View style={[ style.absolute, {left : '85%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Amount</Text>
                    </View>

                    <View style={style.line}></View>

                    <View style={[ style.absolute, {left : 2,top : 20}]}>
                        <Text style={[style.smallFont, {marginTop : 3}]}>{payment.payslipcode}</Text>
                    </View>
                    <View style={[ style.absolute, {left : '25%', top : 20}]}>
                        <Text style={[style.smallFont, {marginTop : 3}]}>{payment.paymenttype + " payment"}</Text>
                    </View>
                    <View style={[ style.absolute, {left : '50%', top : 20}]}>
                        <Text style={[style.smallFont, {marginTop : 3}]}>{payment.paymentmethod}</Text>
                    </View>
                    <View style={[ style.absolute, {left : '70%', top : 20}]}>
                        <Text style={[style.smallFont, {marginTop : 3}]}>{payment.date}</Text>
                    </View>
                    <View style={[ style.absolute, {left : '85%', top : 20}]}>
                        <Text style={[style.smallFont, {marginTop : 3, textAlign : 'right'}]}>Rs.{parseFloat(payment.amount)}</Text>
                    </View>
                </View>
                <View style={{marginTop : 40}}>
                    {
                        payment.note ? <Text style={[style.smallFont, {marginTop : 10}]}>Note : {payment.note}</Text> : <Text></Text>
                    }
                    <Text style={[style.midFont, {marginTop : 10}]}>Payment Details</Text>
                    {
                        payment.paymentmethod === "bank" ? <Text style={[style.smallFont, {marginTop : 5}]}>Bank : {payment.bank}</Text>  : <Text style={[style.smallFont, {marginTop : 5}]}>Paid with {payment.paymentmethod}</Text>
                    }
                    {
                        payment.paymentmethod === "bank" ? <Text style={style.smallFont}>Account Holder : {payment.accountholder}</Text>  : <Text />
                    }
                    {
                        payment.paymentmethod === "bank" ? <Text style={style.smallFont}>Account Number : {payment.accountnumber}</Text>  : <Text />
                    }
                    <Text></Text>
                </View>
            </View>
        </Page>
    </Document>
)

export default PaymentPDF
