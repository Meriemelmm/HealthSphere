import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#6366F1';

const SettingsScreen = () => {
  const [notifications, setNotifications] = React.useState(true);

  const SettingItem = ({ icon, label, value, type = 'chevron', color = '#1E293B' }) => (
    <TouchableOpacity style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconWrapper, { backgroundColor: color + '10' }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {type === 'chevron' && <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />}
      {type === 'switch' && (
        <Switch
          value={notifications}
          onValueChange={setNotifications}
          trackColor={{ false: '#E2E8F0', true: PRIMARY_COLOR }}
          thumbColor="#FFFFFF"
        />
      )}
      {type === 'text' && <Text style={styles.settingValue}>{value}</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={PRIMARY_COLOR} />
            <TouchableOpacity style={styles.editAvatar}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userEmail}>alex.johnson@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>ACCOUNT</Text>
          <View style={styles.card}>
            <SettingItem icon="person-outline" label="Personal Information" color="#6366F1" />
            <SettingItem icon="notifications-outline" label="Notifications" type="switch" color="#F59E0B" />
            <SettingItem icon="shield-checkmark-outline" label="Privacy & Security" color="#10B981" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PREFERENCES</Text>
          <View style={styles.card}>
            <SettingItem icon="language-outline" label="Language" type="text" value="English" color="#8B5CF6" />
            <SettingItem icon="moon-outline" label="Dark Mode" type="switch" value={false} color="#1E293B" />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 36,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  editAvatar: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: PRIMARY_COLOR,
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F8FAFC',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  settingValue: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    marginTop: 8,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  }
});

export default SettingsScreen;
