import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const style = StyleSheet.create({
    page: {
        border: '1px solid black',
        padding: 30,
    },
    header: {
        width: '100%',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    companyDetails: {
        fontSize: 12,
        fontWeight: 'semibold',
        marginBottom: 10
    },
    tableContainer: {
        position: 'relative',
        marginTop: 10
    },
    line: {
        width: '100%',
        padding: 0.5,
        backgroundColor: 'gray',
        position: 'absolute',
        top: 16,
    }
});

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
                <View style={style.tableContainer}>
                    <View style={[ style.absolute, {left : 2}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>No.</Text>
                    </View>
                    <View style={[ style.absolute, {left : '15%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Customer</Text>
                    </View>
                    <View style={[ style.absolute, {left : '50%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Date</Text>
                    </View>
                    <View style={[ style.absolute, {left : '65%'}]}>
                        <Text style={[style.midFont, {fontWeight : 'extrabold'}]}>Price</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default SalesReportComponent;
