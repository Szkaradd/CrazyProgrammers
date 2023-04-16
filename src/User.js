export const Gender = {
  MALE: "Male",
  FEMALE: "Female",
};

export const WorkPreference = {
  SMALL_FAR_PACKAGES: "Small far packages",
  BIG_CLOSE_PACKAGES: "Big close packages",
};

const clockedIn = new Date();
clockedIn.setHours(4);
clockedIn.setMinutes(3);
clockedIn.setSeconds(41);

export const user = {
  id: 1,
  name: "John",
  email: "john@warehouse.com",
  phone: "123-456-7890",
  gender: Gender.MALE,
  maxWeightToCarry: 30,
  packagesDelivered: 43,
  clockedIn: clockedIn,
  clockedOut: null,
  shiftLength: 12,
  workPreference: WorkPreference.BIG_CLOSE_PACKAGES,
  lastBreakEnd: null,
};
