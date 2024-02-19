import React from "react";
import { Document, Page, Text, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    padding: "20px",
  },
  text: {
    fontSize: "12px",
    fontWeight: 400,
  },
});

export const PDFFile = ({ data }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text>General Information</Text>
        <Text style={styles.text}>Client {data.client}</Text>
        <Text style={styles.text}>Email: {data.email}</Text>
        <Text style={styles.text}>Address: {data.address}</Text>
        <Text style={styles.text}>Phone: {data.phoneNumber}</Text>
        <Text style={styles.text}>Date: {data.generalDate}</Text>
        
        <Text style={{ marginTop: 10 }}>Transporter Information</Text>
        <Text style={styles.text}>Company: {data.companyName}</Text>
        <Text style={styles.text}>Items Collected: {data.representative}</Text>
        <Text style={styles.text}>Name: {data.transporterName}</Text>
        <Text style={styles.text}>Address: {data.transporterAddress}</Text>
        <Text style={styles.text}>Phone: {data.transporterPhoneNumber}</Text>
        <Text style={styles.text}>Date: {data.transporterDate}</Text>
        <Image src={data.sign} />
      </Page>
    </Document>
  );
};
