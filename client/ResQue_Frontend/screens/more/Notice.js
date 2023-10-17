import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';


const noticeData = [
  {
    id: 1,
    title: 'How to cancel a queue',
    date: '07-09-2023',
    content: "Managing your queue reservations is easy with our platform. If, for any reason, you find yourself unable to attend your queued appointment, we provide a seamless cancellation process. Simply navigate to the queue detail page, where you have two convenient options to access it. Firstly, you can click on the current queue card located at the center of the Home tab. Alternatively, you may visit the My Profile tab, access your Queue History, and select the specific queue card you wish to cancel. Once on the queue detail page, you'll find the 'Cancel Queue' button thoughtfully placed at the bottom-left corner of your screen. A quick click on this button and your queue reservation will be effortlessly canceled, freeing up your spot for others while relieving you of any concern about missing the appointment",
  },
  {
    id: 2,
    title: 'How to join a queue',
    date: '07-14-2023',
    content: "Join your queue reservations is easy with our platform. If, for any reason, you find yourself unable to attend your queued appointment, we provide a seamless cancellation process. Simply navigate to the queue detail page, where you have two convenient options to access it. Firstly, you can click on the current queue card located at the center of the Home tab. Alternatively, you may visit the My Profile tab, access your Queue History, and select the specific queue card you wish to cancel. Once on the queue detail page, you'll find the 'Cancel Queue' button thoughtfully placed at the bottom-left corner of your screen. A quick click on this button and your queue reservation will be effortlessly canceled, freeing up your spot for others while relieving you of any concern about missing the appointment",
  },
];

const sharedStyles = StyleSheet.create({
  titleFont: {
    fontSize: 17,
  },
  dateFont: {
    fontSize: 16,
    color: 'grey',
  },
  fontContent: {
    fontSize: 18,
  },
});

const Notice = () => {
  const [showContentArray, setShowContentArray] = useState(noticeData.map(() => false));

  const toggleShowContent = (index) => {
    const newShowContentArray = [...showContentArray];
    newShowContentArray[index] = !newShowContentArray[index];
    setShowContentArray(newShowContentArray);
  };

  return (
    <ScrollView style={styles.container}>
      {noticeData.map((data, index) => (
        <NoticeCard
          key={data.id} // Use a unique identifier as the key
          {...data}
          index={index}
          toggleShowContent={toggleShowContent}
          showContent={showContentArray[index]}
        />
      ))}
    </ScrollView>
  );
};

const NoticeCard = ({ title, date, content, index, toggleShowContent, showContent }) => {
  return (
    <TouchableOpacity onPress={() => toggleShowContent(index)}>
      <View style={styles.titleBox}>
        <Text style={sharedStyles.titleFont}>{title}</Text>
        <Text style={sharedStyles.dateFont}>{date}</Text>
      </View>
      {showContent && (
        <View style={styles.containerContent}>
          <Text style={sharedStyles.fontContent}>{content}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerContent: {
    padding: 20,
    backgroundColor: '#FEEEEF',
  },
  titleBox: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default Notice;
