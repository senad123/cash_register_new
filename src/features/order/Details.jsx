/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import useOrderStore from "../../globalState/orderStore";
import { format } from "date-fns";

import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { NumericFormat } from "react-number-format";
import styles from "./Details.module.css"; // Importing the CSS module

// Helper function for formatting numbers in the PDF
const formatCurrency = (value) => {
  const numericValue = Number(value); // Ensure the value is converted to a number
  if (isNaN(numericValue)) return "€0.00"; // Handle cases where value cannot be converted to a number
  return `€${numericValue.toFixed(2)}`;
};

function PDFDocument({ order }) {
  const { orderId, customerInfo, orderItems, startDate, tip, totalPrice } =
    order;
  const formatedDate = format(startDate, "dd/MM/yyyy");
  console.log("start", startDate);
  // Convert CSS module styles for PDF as react-pdf does not support CSS modules directly
  const pdfStyles = StyleSheet.create({
    page: {
      padding: 40,
      fontSize: 12,
      fontFamily: "Helvetica",
    },
    header: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: "center",
      textTransform: "uppercase",
      fontWeight: "bold",
    },
    section: {
      marginBottom: 20,
    },
    customerInfo: {
      marginBottom: 10,
    },
    table: {
      display: "table",
      // display: "grid",
      width: "auto",
      borderStyle: "solid",
      borderWidth: 1,
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: "1px solid #eee",
    },
    tableHeader: {
      backgroundColor: "#f2f2f2",
      fontWeight: "bold",
    },
    tableCell: {
      padding: 8,
      flexGrow: 1,
    },
    totals: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    totalsLabel: {
      fontWeight: "bold",
    },
    footer: {
      marginTop: 40,
      textAlign: "center",
      fontSize: 10,
      color: "gray",
    },
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header */}
        <Text style={pdfStyles.header}>Invoice</Text>

        {/* Customer Info */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.customerInfo}>Customer: {customerInfo}</Text>
          <Text>Invoice No: {orderId}</Text>
          <Text>Date: {formatedDate}</Text>
        </View>

        {/* Order Items Table */}
        <View style={pdfStyles.table}>
          <View style={[pdfStyles.tableRow, pdfStyles.tableHeader]}>
            <Text style={pdfStyles.tableCell}>Item</Text>
            <Text style={pdfStyles.tableCell}>Quantity</Text>
            <Text style={pdfStyles.tableCell}>Unit Price (€)</Text>
            <Text style={pdfStyles.tableCell}>Subtotal (€)</Text>
          </View>
          {orderItems.map((item) => (
            <View key={item.id} style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCell}>{item.itemName}</Text>
              <Text style={pdfStyles.tableCell}>{item.quantity}</Text>
              <Text style={pdfStyles.tableCell}>
                {formatCurrency(item.unitPrice)}
              </Text>
              <Text style={pdfStyles.tableCell}>
                {formatCurrency(item.quantity * item.unitPrice)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals Section */}
        <View style={pdfStyles.totals}>
          <Text style={pdfStyles.totalsLabel}>Tip:</Text>
          <Text>{formatCurrency(tip)}</Text>
        </View>
        <View style={pdfStyles.totals}>
          <Text style={pdfStyles.totalsLabel}>Total Price:</Text>
          <Text>{formatCurrency(totalPrice)}</Text>
        </View>

        {/* Footer */}
        <View style={pdfStyles.footer}>
          <Text>Thank you for your business!</Text>
          <Text>Status: PAID</Text>
        </View>
      </Page>
    </Document>
  );
}

function Details() {
  const { orderId: selectedOrderId } = useParams();
  const listOfAllOrders = useOrderStore((state) => state.orders);

  const [filteredId] = listOfAllOrders.filter(
    (order) => order.orderId === selectedOrderId,
  );

  if (!filteredId) {
    return <p>Select an item</p>;
  }

  const { startDate, orderId, customerInfo, orderItems, tip, totalPrice } =
    filteredId;

  const formatedDate = format(startDate, "dd/MM/yyyy");

  return (
    <>
      <main className={styles.main}>
        <div className={styles.customerInfo}>Customer Info: {customerInfo}</div>

        <div className={styles.invoiceHeader}>
          <p>
            Rechnung Nr. {orderId} Zeitraum {formatedDate}
          </p>
          <p>Speisen und Getranke</p>
        </div>

        <div>
          {orderItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <span>{item.itemName}</span>
              <span>{item.quantity}</span>
              <span>
                <NumericFormat
                  value={item.unitPrice}
                  displayType="text"
                  thousandSeparator={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  prefix="€"
                />
              </span>
            </div>
          ))}
        </div>
        <div>
          Tip:
          <NumericFormat
            value={tip}
            displayType="text"
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix="€"
          />
        </div>
        <div className={styles.totalPrice}>
          Total Price:
          <NumericFormat
            value={totalPrice}
            displayType="text"
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix="€"
          />
        </div>
        <div>
          Status: <span>PAID</span>
        </div>
      </main>

      {/* PDF Export Button */}
      <PDFDownloadLink
        document={<PDFDocument order={filteredId} />}
        fileName={`invoice_${orderId}.pdf`}
      >
        {({ loading }) => (
          <button className={styles.button}>
            {loading ? "Generating PDF..." : "Export PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </>
  );
}

export default Details;
