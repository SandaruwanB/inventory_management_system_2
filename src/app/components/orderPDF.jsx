import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'

const style = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
    },
    header: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 30,
        paddingBottom: 20,
        borderBottom: '3px solid #2563eb',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1e40af',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#6b7280',
        fontStyle: 'italic',
    },
    companySection: {
        backgroundColor: '#f8fafc',
        padding: 15,
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        marginBottom: 20,
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e40af',
        marginBottom: 8,
    },
    companyDetails: {
        fontSize: 10,
        color: '#374151',
        marginBottom: 2,
        lineHeight: 1.4,
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    customerSection: {
        width: '48%',
    },
    orderInfoSection: {
        width: '48%',
        textAlign: 'right',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    customerInfo: {
        fontSize: 10,
        color: '#374151',
        marginBottom: 2,
        lineHeight: 1.3,
    },
    orderBanner: {
        backgroundColor: '#2563eb',
        padding: 12,
        textAlign: 'center',
        marginBottom: 25,
        borderRadius: 6,
    },
    orderBannerText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    table: {
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        padding: 10,
        borderBottom: '2px solid #cbd5e1',
        borderTop: '1px solid #cbd5e1',
    },
    tableHeaderCell: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1e293b',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        padding: 8,
        borderBottom: '1px solid #e2e8f0',
        minHeight: 30,
        alignItems: 'center',
    },
    tableRowAlt: {
        backgroundColor: '#f8fafc',
    },
    tableCell: {
        fontSize: 10,
        color: '#374151',
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    tableCellLeft: {
        textAlign: 'left',
    },
    tableCellRight: {
        textAlign: 'right',
    },
    col1: { width: '8%' },
    col2: { width: '40%' },
    col3: { width: '17%' },
    col4: { width: '15%' },
    col5: { width: '20%' },
    totalSection: {
        marginTop: 20,
        paddingTop: 15,
        borderTop: '2px solid #cbd5e1',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 12,
        color: '#374151',
        width: 100,
        textAlign: 'right',
        marginRight: 20,
    },
    totalValue: {
        fontSize: 12,
        color: '#374151',
        width: 80,
        textAlign: 'right',
    },
    grandTotalRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#2563eb',
        padding: 10,
        borderRadius: 4,
        marginTop: 10,
    },
    grandTotalLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
        width: 100,
        textAlign: 'right',
        marginRight: 20,
    },
    grandTotalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
        width: 80,
        textAlign: 'right',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 40,
        right: 40,
        textAlign: 'center',
        paddingTop: 20,
        borderTop: '1px solid #e2e8f0',
    },
    footerText: {
        fontSize: 9,
        color: '#9ca3af',
        marginBottom: 2,
    },
});

const OrderPDF = ({ customer, company, orderlines, order, total }) => {
    const formatCurrency = (amount) => {
        return parseFloat(amount).toFixed(2);
    };

    const subtotal = total;
    const tax = subtotal * 0.1; // 10% tax
    const grandTotal = subtotal + tax;

    return (
        <Document>
            <Page size={'A4'} style={style.page}>
                {/* Header */}
                <View style={style.header}>
                    <Text style={style.headerTitle}>Order Receipt</Text>
                    <Text style={style.headerSubtitle}>Professional Order Documentation</Text>
                </View>

                {/* Company Information */}
                <View style={style.companySection}>
                    <Text style={style.companyName}>{company.companyname}</Text>
                    <Text style={style.companyDetails}>{company.addressline1}, {company.addressline2}</Text>
                    <Text style={style.companyDetails}>{company.city}, {company.country}</Text>
                    <Text style={style.companyDetails}>Email: {company.email} | Phone: {company.contactnumber}</Text>
                    <Text style={style.companyDetails}>Website: {company.web}</Text>
                </View>

                {/* Customer and Order Info */}
                <View style={style.flexRow}>
                    <View style={style.customerSection}>
                        <Text style={style.sectionTitle}>Bill To:</Text>
                        <Text style={style.customerInfo}>{customer.firstname} {customer.lastname}</Text>
                        <Text style={style.customerInfo}>{customer.companyname}</Text>
                        <Text style={style.customerInfo}>{customer.addressline1}</Text>
                        <Text style={style.customerInfo}>{customer.addressline2}</Text>
                        <Text style={style.customerInfo}>{customer.city}, {customer.postalcode}</Text>
                    </View>
                    <View style={style.orderInfoSection}>
                        <Text style={style.sectionTitle}>Order Details:</Text>
                        <Text style={style.customerInfo}>Date: {order.date}</Text>
                        <Text style={style.customerInfo}>Order Status: Active</Text>
                        <Text style={style.customerInfo}>Payment Terms: Net 30</Text>
                    </View>
                </View>

                {/* Order Banner */}
                <View style={style.orderBanner}>
                    <Text style={style.orderBannerText}>{order.ordername}</Text>
                </View>

                {/* Items Table */}
                <View style={style.table}>
                    {/* Table Header */}
                    <View style={style.tableHeader}>
                        <Text style={[style.tableHeaderCell, style.col1]}>#</Text>
                        <Text style={[style.tableHeaderCell, style.col2, style.tableCellLeft]}>Product Description</Text>
                        <Text style={[style.tableHeaderCell, style.col3]}>Unit Price</Text>
                        <Text style={[style.tableHeaderCell, style.col4]}>Quantity</Text>
                        <Text style={[style.tableHeaderCell, style.col5]}>Amount</Text>
                    </View>

                    {/* Table Rows */}
                    {orderlines.map((value, index) => (
                        <View key={index} style={[style.tableRow, index % 2 === 1 && style.tableRowAlt]}>
                            <Text style={[style.tableCell, style.col1]}>{index + 1}</Text>
                            <Text style={[style.tableCell, style.col2, style.tableCellLeft]}>{value.product.prodctname}</Text>
                            <Text style={[style.tableCell, style.col3]}>Rs. {formatCurrency(value.product.unitprice)}</Text>
                            <Text style={[style.tableCell, style.col4]}>{value.itemcount}</Text>
                            <Text style={[style.tableCell, style.col5, style.tableCellRight]}>Rs. {formatCurrency(value.itemcount * value.product.unitprice)}</Text>
                        </View>
                    ))}
                </View>

                {/* Totals Section */}
                <View style={style.totalSection}>
                    <View style={style.totalRow}>
                        <Text style={style.totalLabel}>Subtotal:</Text>
                        <Text style={style.totalValue}>Rs. {formatCurrency(subtotal)}</Text>
                    </View>
                    <View style={style.totalRow}>
                        <Text style={style.totalLabel}>Tax (10%):</Text>
                        <Text style={style.totalValue}>Rs. {formatCurrency(tax)}</Text>
                    </View>
                    <View style={style.grandTotalRow}>
                        <Text style={style.grandTotalLabel}>TOTAL:</Text>
                        <Text style={style.grandTotalValue}>Rs. {formatCurrency(grandTotal)}</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={style.footer}>
                    <Text style={style.footerText}>Thank you for your business!</Text>
                    <Text style={style.footerText}>This is a computer-generated document. No signature required.</Text>
                    <Text style={style.footerText}>Generated on {new Date().toLocaleDateString()}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default OrderPDF;
