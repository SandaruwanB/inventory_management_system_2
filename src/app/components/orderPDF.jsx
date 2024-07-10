import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'

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
});

const OrderPDF = ({customer, company, orderlines, order, total }) => (
    <Document>
        <Page size={'A4'} style={style.page}>
            <View style={style.header}>
                <Text>Order receipt</Text>
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
                        <Text style={style.companyDetails}>{customer.firstname + " " + customer.lastname}</Text>
                        <Text style={style.companyDetails}>{customer.companyname}</Text>
                        <Text style={style.companyDetails}>{customer.addressline1},</Text>
                        <Text style={style.companyDetails}>{customer.addressline2},</Text>
                        <Text style={style.companyDetails}>{customer.city},</Text>
                        <Text style={style.companyDetails}>{customer.postalcode}.</Text>
                    </View>
                </View>
                <View style={{marginTop : 15}}>
                    <Text style={{fontSize : 12}}>Date : {order.date}</Text>
                </View>
                <View style={{marginTop : 20, width : '100%', backgroundColor : 'gray', padding : 5, textAlign : 'center'}}>
                    <Text style={{color : 'white', fontSize : 12}}>{order.ordername}</Text>
                </View>
                <View style={style.tableContainer}>
                    <View style={[ style.absolute, {left : 2}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>No.</Text>
                    </View>
                    <View style={[ style.absolute, {left : '15%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Product</Text>
                    </View>
                    <View style={[ style.absolute, {left : '50%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Unit Price</Text>
                    </View>
                    <View style={[ style.absolute, {left : '65%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Quantity</Text>
                    </View>
                    <View style={[ style.absolute, {left : '85%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Price</Text>
                    </View>

                    <View style={style.line}></View>

                    {
                        orderlines.map((value,index)=>(
                            <>
                                <View style={[ style.absolute, {left : 2,top : index === 0 ? 20 : (index + 1) * 17}]}>
                                    <Text style={[style.smallFont, {marginTop : 3}]}>{index + 1}</Text>
                                </View>
                                <View style={[ style.absolute, {left : '15%',top : index === 0 ? 20 : (index + 1) * 17}]}>
                                    <Text style={[style.smallFont, {marginTop : 3}]}>{value.product.prodctname}</Text>
                                </View>
                                <View style={[ style.absolute, {left : '50%',top : index === 0 ? 20 : (index + 1) * 17}]}>
                                    <Text style={[style.smallFont, {marginTop : 3}]}>Rs.{value.product.unitprice}</Text>
                                </View>
                                <View style={[ style.absolute, {left : '65%',top : index === 0 ? 20 : (index + 1) * 17}]}>
                                    <Text style={[style.smallFont, {marginTop : 3}]}>Rs.{value.itemcount}</Text>
                                </View>
                                <View style={[ style.absolute, {left : '85%',top : index === 0 ? 20 : (index + 1) * 17}]}>
                                    <Text style={[style.smallFont, {marginTop : 3}]}>Rs.{value.itemcount * value.product.unitprice}</Text>
                                </View>
                            </>
                        ))
                    }
                    <View style={[style.absolute, style.midFont, {left : '85%', top : (orderlines.length * 20) + 10, fontWeight : 'bold'}]} >
                        <Text>--------------------</Text>
                    </View>
                    <View style={[style.absolute, style.midFont, {left : '75%', top : (orderlines.length * 20) + 20, fontWeight : 'bold'}]} >
                        <Text>Total</Text>
                    </View>
                    <View style={[style.absolute, style.smallFont, {left : '85%', top : (orderlines.length * 20) + 20, fontWeight : 'bold'}]} >
                        <Text>Rs.{total}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
)

export default OrderPDF
