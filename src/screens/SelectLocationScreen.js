import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ZONES = ['HaNoi', 'PhuTho', 'SocSon', 'HoaBinh', 'HaiPhong', 'ThanhHoa'];
const AREAS = {
  HaNoi: ['Quận A', 'Quận B', 'Quận C', 'Quận D'],
  PhuTho: ['Quận A', 'Quận B', 'Quận C', 'Quận D'],
  SocSon: ['Quận A', 'Quận B', 'Quận C', 'Quận D'],
  HoaBinh: ['Quận A', 'Quận B', 'Quận C', 'Quận D'],
  HaiPhong: ['Quận A', 'Quận B', 'Quận C', 'Quận D'],
  ThanhHoa: ['Quận A', 'Quận B', 'Quận C', 'Quận D'],
};

export default function SelectLocationScreen({ navigation }) {
  const [zone, setZone] = useState('');
  const [area, setArea] = useState('');
  const [showZonePicker, setShowZonePicker] = useState(false);
  const [showAreaPicker, setShowAreaPicker] = useState(false);

  const handleSubmit = () => {
    if (zone && area) {
      navigation.navigate('Main');
    }
  };

  const Picker = ({ visible, data, onSelect, onClose, title }) => (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
      <View style={styles.pickerSheet}>
        <Text style={styles.pickerTitle}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.pickerItem}
              onPress={() => { onSelect(item); onClose(); }}
            >
              <Text style={styles.pickerItemText}>{item}</Text>
              <Ionicons name="checkmark" size={18} color={item === zone || item === area ? '#4CAF50' : 'transparent'} />
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.mapIllustration}>
         <Image source={require('../../assets/map.png')} />
          <View style={styles.pinContainer}>
            <Ionicons name="location" size={48} color="#5C6BC0" />
          </View>
        </View>

        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>
          Switch on your location to stay in tune with{'\n'}what's happening in your area
        </Text>

        {/* Zone Dropdown */}
        <Text style={styles.label}>Your Zone</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowZonePicker(true)}>
          <Text style={[styles.dropdownText, !zone && styles.placeholder]}>
            {zone || 'Select your zone'}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#999" />
        </TouchableOpacity>

        {/* Area Dropdown */}
        <Text style={styles.label}>Your Area</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => zone && setShowAreaPicker(true)}
        >
          <Text style={[styles.dropdownText, !area && styles.placeholder]}>
            {area || 'Types of your area'}
          </Text>
          <Ionicons name="chevron-down" size={18} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitBtn, (!zone || !area) && styles.submitDisabled]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Picker
        visible={showZonePicker}
        data={ZONES}
        title="Select Zone"
        onSelect={(val) => { setZone(val); setArea(''); }}
        onClose={() => setShowZonePicker(false)}
      />
      <Picker
        visible={showAreaPicker}
        data={AREAS[zone] || []}
        title="Select Area"
        onSelect={setArea}
        onClose={() => setShowAreaPicker(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  back: { padding: 16, paddingBottom: 4 },
  content: { paddingHorizontal: 24, flex: 1 },
  mapIllustration: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    marginBottom: 24,
  },
  mapBg: {
    width: 200,
    height: 160,
    backgroundColor: '#e8f4ea',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  mapRoad1: {
    position: 'absolute',
    left: 0, right: 0, top: '45%',
    height: 16,
    backgroundColor: '#d4edda',
  },
  mapRoad2: {
    position: 'absolute',
    top: 0, bottom: 0, left: '45%',
    width: 16,
    backgroundColor: '#d4edda',
  },
  mapBlock1: {
    position: 'absolute',
    top: 20, left: 20,
    width: 70, height: 50,
    backgroundColor: '#c8e6c9',
    borderRadius: 8,
  },
  mapBlock2: {
    position: 'absolute',
    bottom: 20, right: 20,
    width: 55, height: 55,
    backgroundColor: '#a5d6a7',
    borderRadius: 8,
  },
  pinContainer: {
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  label: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 20,
    backgroundColor: '#fafafa',
  },
  dropdownText: { fontSize: 15, color: '#1a1a1a' },
  placeholder: { color: '#aaa' },
  submitBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitDisabled: { backgroundColor: '#a5d6a7' },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  // Picker
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  pickerSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '50%',
  },
  pickerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  pickerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  pickerItemText: { fontSize: 15, color: '#333' },
});
