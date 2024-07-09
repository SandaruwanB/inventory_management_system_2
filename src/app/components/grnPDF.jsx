import { Document, View, Page, Text, StyleSheet } from '@react-pdf/renderer'
import React from 'react'

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

const GrnPDF = ({suplier, company, selected, grn }) => (
    <Document>
        <Page size={'A4'} style={style.page}>
            <View style={style.header}>
                <Text>Goods Recieve Note</Text>
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
                        <Text style={style.companyDetails}>{suplier.firstname + " " + suplier.lastname}</Text>
                        <Text style={style.companyDetails}>{suplier.companyname}</Text>
                        <Text style={style.companyDetails}>{suplier.addressline1},</Text>
                        <Text style={style.companyDetails}>{suplier.addressline2},</Text>
                        <Text style={style.companyDetails}>{suplier.city},</Text>
                        <Text style={style.companyDetails}>{suplier.postalcode}.</Text>
                    </View>
                </View>
                <View style={{marginTop : 15}}>
                    <Text style={{fontSize : 12}}>Date : {grn.date}</Text>
                </View>
                <View style={{marginTop : 20, width : '100%', backgroundColor : 'gray', padding : 5, textAlign : 'center'}}>
                    <Text style={{color : 'white', fontSize : 12}}>{grn.grncode}</Text>
                </View>
                <View style={style.tableContainer}>
                    <View style={[ style.absolute, {left : 2}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>No.</Text>
                    </View>
                    <View style={[ style.absolute, {left : '25%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Product</Text>
                    </View>
                    <View style={[ style.absolute, {left : '85%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Quantity</Text>
                    </View>

                    <View style={style.line}></View>
                </View>
            </View>
        </Page>
    </Document>
)

export default GrnPDF
