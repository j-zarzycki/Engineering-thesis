import React, { useState, useEffect } from "react";

import emergencyService from "@Services/emergency.service";
import Emergency from "./Emergency.component";

const EmergencyContainer: React.FC = () => {
  const [emergencyAdviceData, setEmergencyAdviceData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onNewAdviceClickHandler = async () => {
    setIsLoading(true);
    await emergencyService().then(({ data: { res } }) => {
      setEmergencyAdviceData(res);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    emergencyService().then(({ data: { res } }) => {
      setEmergencyAdviceData(res);
    });
  }, []);

  return (
    <Emergency
      emergencyAdviceData={emergencyAdviceData}
      isLoading={isLoading}
      onNewAdviceClickHandler={onNewAdviceClickHandler}
    />
  );
};

export default React.memo(EmergencyContainer);
