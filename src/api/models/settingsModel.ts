import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema(
  {
    theme: {
      type: String,
      default: 'light',
    },
    size: {
      type: String,
      default: 'normal',
    },
    daysToShow: {
      type: String,
      default: '1month',
    },
    hoursToShow: {
      type: [Number],
      default: [0, 23],
    },
    isHomepage: {
      type: Boolean,
      default: false,
    },
    showGridLines: {
      type: Boolean,
      default: true,
    },
    showHourMarkers: {
      type: Boolean,
      default: true,
    },
    shouldScrollColumns: {
      type: Boolean,
      default: false,
    },
    hideCalendarInactive: {
      type: Boolean,
      default: false,
    },
    hideCalendarStartup: {
      type: Boolean,
      default: true,
    },
    shouldAutoLogout: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: String,
      required: [true, 'must belong to a user'],
    },
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.settingsId = ret._id;
        delete ret._id;
      },
    },
  }
);

const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
export default Settings;
