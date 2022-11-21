import { Device } from "@capacitor/device";

const getDeviceId = async () => {
  let deviceUuid;
  await Device.getId().then((info) => {
    deviceUuid = info.uuid;
  });

  return deviceUuid;
};

export default { getDeviceId };
