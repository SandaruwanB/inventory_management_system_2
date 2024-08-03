import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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

const formatDate = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
};

const SalesReportComponent = ({ lines, start_date, end_date }) => {
    const formattedStartDate = formatDate(start_date);
    const formattedEndDate = formatDate(end_date);

    return (
        <Document>
            <Page size={'A4'} style={style.page}>
                <View style={style.header}>
                    <Text>Sales Details Report</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={style.companyDetails}>Date: {formattedStartDate} - {formattedEndDate}</Text>
                </View>
                <View style={[style.tableContainer, {marginTop : 30, backgroundColor : 'gray'}]}>
                    <View style={[ style.absolute, {left : 2}]}>
                        <Text style={[style.midFont, {fontWeight : 'bold'}]}>No.</Text>
                    </View>
                    <View style={[ style.absolute, {left : '15%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'bold'}]}>Customer</Text>
                    </View>
                    <View style={[ style.absolute, {left : '60%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'bold'}]}>Date</Text>
                    </View>
                    <View style={[ style.absolute, {left : '85%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'bold'}]}>Price</Text>
                    </View>

                    <View style={style.line}></View>

                    {
                        lines.map((value,index)=>(
                            <>
                                <View style={[ style.absolute, {left : 2,top : index === 0 ? 20 : (index + 1) * 17}]}>
                                    <Text style={[style.smallFont, {marginTop : 3}]}>{index + 1}</Text>
                                </View>
                                <View style={[ style.absolute, {left : '15%',top : index === 0 ? 20 : (index + 1) * 17}]}>
                                    <Text style={[style.smallFont, {marginTop : 3}]}>{value.customer.firstname + " " + value.customer.lastname}</Text>
                                </View>
                                <View style={[ style.absolute, {left : '60%',top : index === 0 ? 20 : (index + 1) * 17}]}>
                                    <Text style={[style.smallFont, {marginTop : 3}]}>Rs.{value.date}</Text>
                                </View>
                                <View style={[ style.absolute, {left : '85%',top : index === 0 ? 20 : (index + 1) * 17}]}>
                                    {value.ordermove.map((line, lineIndex) => (
                                        <Text key={lineIndex} style={[style.smallFont, {marginTop : 3}]}>
                                            Rs.{line.itemcount * line.product.unitprice}
                                        </Text>
                                    ))}
                                </View>
                            </>
                        ))
                    }
                </View>
            </Page>
        </Document>
    );
}

export default SalesReportComponent;
