import React, { ReactNode } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"

const PolicySection = ({ title, children }: { title: string; children: ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{children}</Text>
  </View>
)

interface MarketingPolicyBottomsheetProps {
  // You can add props here if needed, such as a callback for closing the bottom sheet
  onClose?: () => void
}
export default function MarketingPolicyBottomsheet({ onClose }: MarketingPolicyBottomsheetProps) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Marketing Messages Policy</Text>

      <PolicySection title="1. User Consent (Opt-In)">
        We only send marketing messages to users who have explicitly opted in. You can withdraw
        consent at any time in your app settings.
      </PolicySection>

      <PolicySection title="2. Types of Messages">
        We may send promotions, discounts, product updates, and reminders. Transactional messages
        like order confirmations are always allowed.
      </PolicySection>

      <PolicySection title="3. Frequency & Timing">
        We limit marketing messages to avoid spam and do not send messages during late hours.
      </PolicySection>

      <PolicySection title="4. Clear Identification">
        All messages clearly identify our brand and purpose.
      </PolicySection>

      <PolicySection title="5. Honest Content">
        We do not use misleading or false information in our messages.
      </PolicySection>

      <PolicySection title="6. Opt-Out">
        You can unsubscribe from marketing messages anytime via app settings or SMS instructions.
      </PolicySection>

      <PolicySection title="7. Personalization">
        Messages may be personalized based on your activity, while respecting your privacy.
      </PolicySection>

      <PolicySection title="8. Push Notifications">
        Notifications are designed to provide value and relevant updates only.
      </PolicySection>

      <PolicySection title="9. SMS & In-App Messaging">
        SMS messages include sender identification and opt-out instructions.
      </PolicySection>

      <PolicySection title="10. Third-Party Promotions">
        Any third-party promotions will be clearly disclosed.
      </PolicySection>

      <PolicySection title="11. Compliance">
        We comply with app store and data protection regulations.
      </PolicySection>

      <Text style={styles.footer}>Last updated: April 2026</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
})
