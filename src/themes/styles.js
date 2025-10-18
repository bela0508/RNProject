// styles.js
import { Platform, StyleSheet } from "react-native";

const colors = {
  primary: "#4A90E2",
  secondary: "#50E3C2",
  background: "#fff",
  surface: "#FFFFFF",
  text: "#333333",
  subtext: "#7B8D93",
  border: "#E0E6ED",
  danger: "#FF5A5F",
  warning: "#F5A623",
  success: "#4CAF50",
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const radius = {
  sm: 6,
  md: 12,
  lg: 20,
  round: 50,
  circle: 9999,
};

const typography = {
  title: {
    fontSize: 24,
    marginBottom: spacing.lg,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: spacing.md,
    fontWeight: "600",
    color: colors.subtext,
  },
  subtitle2: {
    fontSize: 16,
    marginBottom: spacing.md,
    fontWeight: "600",
    color: colors.subtext,
  },
  body: {
    fontSize: 14,
    marginBottom: spacing.md,
    fontWeight: "400",
    color: colors.text,
  },
  small: {
    fontSize: 12,
    marginBottom: spacing.sm,
    fontWeight: "400",
    color: colors.subtext,
  },
};

const components = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "600",
    width: "fit-content",
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  outlineButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },

  verticalImage: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    height: 200,
    width: 150,
  },
  horizontalImage: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    padding: 0,
    width: 400,
    height: 120,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    padding: spacing.md,
    backgroundColor: colors.surface,
    fontSize: 16,
    color: colors.text,
  },

  // Cards
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },

  // Containers
  screen: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    flex: 1,
    height: "100",
    backgroundColor: colors.background,
  },
  list: {
    flexDirection: "column",
    paddingBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  listItem: {
    paddingHorizontal: spacing.xl,
    justifyContent: "space-between",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.background,
    minHeight: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  simpleContainer: {
    flex: 1,
    padding: spacing.md,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  titleContainer: {
    flexDirection: "column",
    gap: spacing.sm,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  swipeableButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: spacing.md,
    alignContent: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: spacing.xl,
    right: spacing.xl,
    backgroundColor: colors.primary,
    padding: spacing.xs,
    borderRadius: radius.circle,
  },
  deleteButton: {
    backgroundColor: colors.danger,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const theme = {
  colors,
  spacing,
  radius,
  typography,
  components,
};

export default theme;
